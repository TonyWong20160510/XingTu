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
            bundles.Add(new StyleBundle("~/Content/xtCss").Include("~/Content/css/commond.css",  "~/Content/css/page2.css", "~/Content/css/style.css"));            
            //行途js
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/js/jquery-1.8.3.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/bdSlide").Include("~/Scripts/js/bdSlide.js"));
            bundles.Add(new ScriptBundle("~/bundles/ck").Include("~/Scripts/js/ck.js"));
            bundles.Add(new ScriptBundle("~/bundles/common").Include("~/Scripts/js/common.js"));
            bundles.Add(new ScriptBundle("~/bundles/hm").Include("~/Scripts/js/hm.js"));
            bundles.Add(new ScriptBundle("~/bundles/home").Include("~/Scripts/js/home.js"));
            bundles.Add(new ScriptBundle("~/bundles/ck").Include("~/Scripts/js/ck.js"));
            bundles.Add(new ScriptBundle("~/bundles/active").Include("~/Scripts/js/activity.js"));
            bundles.Add(new ScriptBundle("~/bundles/active2").Include("~/Scripts/js/activity_02.js"));
            bundles.Add(new ScriptBundle("~/bundles/page").Include("~/Scripts/js/page.js"));
            bundles.Add(new ScriptBundle("~/bundles/kalendar").Include("~/Scripts/js/kalendar.js"));
            bundles.Add(new ScriptBundle("~/bundles/responsiveslides.min").Include("~/Scripts/js/responsiveslides.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/slider").Include("~/Scripts/js/slider.js"));
        

        }
    }
}
