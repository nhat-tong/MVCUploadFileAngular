using System.Web.Http;

namespace MVCUploadFileAngular
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { controller = "Upload", id = RouteParameter.Optional }
            );
        }
    }
}
