// Package apis implements the default PocketBase api services and middlewares.
package apis

import (
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/rest"
	"github.com/pocketbase/pocketbase/ui"
	"github.com/spf13/cast"
)

// InitApi creates a configured echo instance with registered
// system and app specific routes and middlewares.
func InitApi(app core.App) (*echo.Echo, error) {
	e := echo.New()
	e.Debug = app.IsDebug()

	// default middlewares
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(LoadAuthContext(app))

	// custom error handler
	e.HTTPErrorHandler = func(c echo.Context, err error) {
		if c.Response().Committed {
			return
		}

		var apiErr *rest.ApiError

		switch v := err.(type) {
		case *echo.HTTPError:
			if v.Internal != nil && app.IsDebug() {
				log.Println(v.Internal)
			}
			msg := fmt.Sprintf("%v", v.Message)
			apiErr = rest.NewApiError(v.Code, msg, v)
		case *rest.ApiError:
			if app.IsDebug() && v.RawData() != nil {
				log.Println(v.RawData())
			}
			apiErr = v
		default:
			if err != nil && app.IsDebug() {
				log.Println(err)
			}
			apiErr = rest.NewBadRequestError("", err)
		}

		// Send response
		var cErr error
		if c.Request().Method == http.MethodHead {
			// @see https://github.com/labstack/echo/issues/608
			cErr = c.NoContent(apiErr.Code)
		} else {
			cErr = c.JSON(apiErr.Code, apiErr)
		}

		// truly rare case; eg. client already disconnected
		if cErr != nil && app.IsDebug() {
			log.Println(err)
		}
	}

	// admin ui routes
	bindStaticAdminUI(app, e)

	// default routes
	api := e.Group("/api")
	BindSettingsApi(app, api)
	BindAdminApi(app, api)
	BindUserApi(app, api)
	BindCollectionApi(app, api)
	BindRecordApi(app, api)
	BindFileApi(app, api)
	BindRealtimeApi(app, api)
	BindLogsApi(app, api)

	// trigger the custom BeforeServe hook for the created api router
	// allowing users to further adjust its options or register new routes
	serveEvent := &core.ServeEvent{
		App:    app,
		Router: e,
	}
	if err := app.OnBeforeServe().Trigger(serveEvent); err != nil {
		return nil, err
	}

	// catch all any route
	api.Any("/*", func(c echo.Context) error {
		return echo.ErrNotFound
	}, ActivityLogger(app))

	return e, nil
}

// StaticDirectoryHandler is similar to `echo.StaticDirectoryHandler`
// but without the directory redirect which conflicts with RemoveTrailingSlash middleware.
//
// @see https://github.com/labstack/echo/issues/2211
func StaticDirectoryHandler(fileSystem fs.FS, disablePathUnescaping bool) echo.HandlerFunc {
	return func(c echo.Context) error {
		p := c.PathParam("*")
		if !disablePathUnescaping { // when router is already unescaping we do not want to do is twice
			tmpPath, err := url.PathUnescape(p)
			if err != nil {
				return fmt.Errorf("failed to unescape path variable: %w", err)
			}
			p = tmpPath
		}

		// fs.FS.Open() already assumes that file names are relative to FS root path and considers name with prefix `/` as invalid
		name := filepath.ToSlash(filepath.Clean(strings.TrimPrefix(p, "/")))

		return c.FileFS(name, fileSystem)
	}
}

// bindStaticAdminUI registers the endpoints that serves the static admin UI.
func bindStaticAdminUI(app core.App, e *echo.Echo) error {
	// serves /ui/dist/index.html file
	// (explicit route is used to avoid conflicts with `RemoveTrailingSlash` middleware)
	e.FileFS(
		"/_",
		"index.html",
		ui.DistIndexHTML,
		middleware.Gzip(),
		installerRedirect(app),
	)

	// serves static files from the /ui/dist directory
	// (similar to echo.StaticFS but with gzip middleware enabled)
	e.GET(
		"/_/*",
		StaticDirectoryHandler(ui.DistDirFS, false),
		middleware.Gzip(),
	)

	return nil
}

const totalAdminsCacheKey = "totalAdmins"

func updateTotalAdminsCache(app core.App) error {
	total, err := app.Dao().TotalAdmins()
	if err != nil {
		return err
	}

	app.Cache().Set(totalAdminsCacheKey, total)

	return nil
}

// installerRedirect redirects the user to the installer admin UI page
// when the application needs some preliminary configurations to be done.
func installerRedirect(app core.App) echo.MiddlewareFunc {
	// keep totalAdminsCacheKey value up-to-date
	app.OnAdminAfterCreateRequest().Add(func(data *core.AdminCreateEvent) error {
		return updateTotalAdminsCache(app)
	})
	app.OnAdminAfterDeleteRequest().Add(func(data *core.AdminDeleteEvent) error {
		return updateTotalAdminsCache(app)
	})

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// load into cache (if not already)
			if !app.Cache().Has(totalAdminsCacheKey) {
				if err := updateTotalAdminsCache(app); err != nil {
					return err
				}
			}

			totalAdmins := cast.ToInt(app.Cache().Get(totalAdminsCacheKey))

			_, hasInstallerParam := c.Request().URL.Query()["installer"]

			if totalAdmins == 0 && !hasInstallerParam {
				// redirect to the installer page
				return c.Redirect(http.StatusTemporaryRedirect, "/_/?installer#")
			}

			if totalAdmins != 0 && hasInstallerParam {
				// redirect to the home page
				return c.Redirect(http.StatusTemporaryRedirect, "/_/#/")
			}

			return next(c)
		}
	}
}
