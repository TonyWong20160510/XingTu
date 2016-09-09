using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(XingTu.Startup))]
namespace XingTu
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
