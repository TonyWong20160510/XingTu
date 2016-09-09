(function($) {    
     $.fn.tabs = function(options){
        var opt = $.extend({},{
            active:"on"
        },options);

        return this.each(function(){
            var tab = $(this);
            var tabCtrs = tab.find($("[data-panel]"));
            var tabPanel = tab.find(".tab-panel")
            tabCtrs.eq(0).addClass(opt.active);
            tabPanel.hide().eq(0).show();
            tabCtrs.click(function(event) {
                var tabCtr = $(this);
                var name = tabCtr.data("panel");
                tabCtrs.removeClass(opt.active);
                tabCtr.addClass(opt.active);
                tabPanel.hide();
                $(name).show();
            });
        })
    }

})(jQuery); 

function tabs(obj){
    var _index = obj.index();
    obj.addClass('on').siblings().removeClass('on');
    $('.ac_box div').eq(_index).show().siblings().hide();
}