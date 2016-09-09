using System.Web;
using System.Web.Optimization;

namespace XingTu
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //行途css
            bundles.Add(new ScriptBundle("~/Content/xtCss").Include("~/Content/css/commond.css", "~/Content/css/page.css", "~/Content/css/page2.css", "~/Content/css/style.css"));
            //行途js
            bundles.Add(new ScriptBundle("~/bundles/xtjs").Include("~/Scripts/js/jquery-1.8.3.min.js", 
                     "~/Scripts/js/bdSlide.js", 
                     "~/Scripts/js/ck.js", 
                     "~/Scripts/js/common.js", 
                     "~/Scripts/js/hm.js", 
                     "~/Scripts/js/home.js",
                     "~/Scripts/js/activity.js",
                     "~/Scripts/js/kalendar.js",
                     "~/Scripts/js/page.js",
                     "~/Scripts/js/responsiveslides.min.js",
                     "~/Scripts/js/slider/js"
                     ));

        }
    }
}
