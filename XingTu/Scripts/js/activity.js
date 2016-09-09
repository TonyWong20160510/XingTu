$(function() {
  $('.flexslider').flexslider({
    animation : "slide",
    start : function(slider) {
      $('body').removeClass('loading');
    }
  });

  // 导航下拉菜单
  $('#newnavi li').hover(function() {
    $(this).addClass('lihover');
    $(this).find('.navdropBox').show();
  }, function() {
    $(this).removeClass('lihover');
    $(this).find('.navdropBox').hide();
  });
  $(".searchtype").hover(function() {
    $('.searchdrop').show();
  }, function() {
    $('.searchdrop').hide();
  })
  $("#search_bar").find("li").click(
      function() {
        var s = $(this);
        if (s.data('searchtype')) {
          $("#indexSearchTypeValue").val(s.attr("data-searchtype"));
          $("#searchselect").text(s.text());
          if (s.data('searchtype') == "lvxing") {
            $("#commonSearchForm").attr("action",
                "${comsite}search")
          } else {
            $("#commonSearchForm").attr("action",
                "${website}/huodong/search")
          }
        }
        $('.searchdrop').hide();
      });
  topDropdown();
  
  getCkDeal();

 /* $('.fresult a').live('click', function() {
    var cid = $(this).attr('data-cid');
    var val = "{'cid': " + cid + ",'cname':'" + $(this).text() + "'}";
    setCookie('_LY_SEARCH_CITY', val, '', '/', 'lvye.com', '');
    getCkDeal();
    $("#eventSearchForm input[name='departCity']").val(cid);
    $('.fresult').hide();
  });*/

  $("#eventSearchForm input[name='searchType']").val(0);
  //hotword
  $.ajax({
    type : "get",
    url : "http://search.lvye.com/event/search/hotword.jhtml",
    dataType : 'jsonp',
    jsonp : 'callback',
    success : function(data) {
      var redata = data.data;
      var $tmp;
      var $box = $('.hotkeywords ul');
      for (var i = 0; i < redata.length; i++) {
        //alert(redata[i].hotWord);
        $tmp = "<li><a href='http://search.lvye.com/event/search.jhtml?keyword=" + redata[i].hotWord + "'>" + redata[i].hotWord + "</a></li>";
        if (data.code == 0) {
          $box.append($tmp);
        } else {
        }
      }
    }
  });

  /*$('.ac_tab li').live('click', function() {
    tabs($(this));
  });*/

  $('.flexslider').flexslider({
    animation : "slide",
    start : function(slider) {
      $('body').removeClass('loading');
    }
  });

  /*$('.sfliter .arrow').live('click', function() {
    //$('.fresult').html('');
    var $parent = $(this).parents('.sfliter');
    var $sibselect = $parent.siblings('.sfliter').find('.fresult');
    if ($sibselect.css('display') == 'block') {
      $sibselect.css('display', 'none');
    }
    $parent.find('.fresult').slideToggle();

  });*/

  /*$('.s_place .arrow').live('click', function() {
    $.ajax({
      type : "GET",
      url : "",
      dataType : 'jsonp',
      jsonp : 'callback',
      success : function(data) {
        var $pbox = $('.fresult');
        var $data = data.data;
        var $allCityTab = $('.allCity .ac_tab ul');
        var $allCityBox = $('.ac_box');
        var $letter = $data.firstWords;
        var hotli = htab = htab_G1 = htab_G2 = htab_G3 = htab_G4 = htab_all = '';
        //all
        if (data.code == 0
            && $('.hotul').html() == '') {
          hotli = "<li><a href='javascript:void(0);' data-city='全国'>全国</a></li>";
          for (var i = 0; i < $data.hotCities.length; i++) {
            hotli += "<li><a href='javascript:void(0);' data-cid='"
                + $data.hotCities[i].regionId
                + "' data-city='"
                + $data.hotCities[i].showName
                + "'>"
                + $data.hotCities[i].showName
                + "</a></li>"
          }
          $('.hotul').append(hotli);
        }
        //tab
        htab_G1 = "<li data-panel='#A' class='on'>"
            + $data.firstWords[0]
                .toUpperCase()
            + "</li>";
        htab_G2 = "<li data-panel='#H'>"
            + $data.firstWords[1]
                .toUpperCase()
            + "</li>";
        htab_G3 = "<li data-panel='#O'>"
            + $data.firstWords[2]
                .toUpperCase()
            + "</li>";
        htab_G4 = "<li data-panel='#W'>"
            + $data.firstWords[3]
                .toUpperCase()
            + "</li>";
        htab_all = htab_G1 + htab_G2
            + htab_G3 + htab_G4;
        if (data.code == 0
            && $allCityBox.html() == '') {
          $allCityTab.append(htab_all);
        }
        //box
        if ($('.allCity .ac_box').html() == '') {

          for (var i = 0; i < $data.mapRegions.length; i++) {
            var pre = "<div class='hb1 tab-panel fn-none'>";
            for ( var key in $data.mapRegions[i]) {
              pre += "<dl>";
              pre += "<dt>" + key
                  + "</dt><dd>";
              for (var j = 0; j < $data.mapRegions[i][key].length; j++) {
                pre += "<a href='javascript:void(0);' data-cid='"
                    + $data.mapRegions[i][key][j].regionId
                    + "' data-city='"
                    + $data.mapRegions[i][key][j].showName
                    + "'>"
                    + $data.mapRegions[i][key][j].showName
                    + "</a>"
              }
              pre += "</dd></dl>";
            }
            pre += "</div>";
            $('.allCity .ac_box')
                .append(pre);
          }
          $('.ac_box .hb1').eq(0).show();
        }
      }
    })
  });*/

  $('.r-ad').hover(function() {
    $(this).find('.info').stop().animate({
      'bottom' : '0px'
    });
  }, function() {
    $(this).find('.info').stop().animate({
      'bottom' : '-133px'
    });
  });

  $(document).click(function(e) {
    var target = $(e.target);
    if (!target.is('.fresult')
        && !target.parents().is('.fresult')
        && !target.is('.arrow')) {
      $('.fresult').hide();
    }
  });

  $('.mega-list li').mouseenter(function() {
    $(this).addClass('active');
    $(this).find('s').show();
    $(this).find('.sub-menu').show();
  }).mouseleave(function() {
    $(this).removeClass('active');
    $(this).find('s').hide();
    $(this).find('.sub-menu').hide();
  });

  $(document).on("click", "#search-leader-type .fresult p", function() {
    var type = $(this).attr('type');
    if (type == 0) {
      $("#search-leader-type .f .p").attr("type", "0").html("按活动搜索");
      $(this).attr("type", "1").html("按领队搜索");
      $("#eventSearchForm input[name='searchType']").val(0);
    }
    if (type == 1) {
      $("#search-leader-type .f .p").attr("type", "1").html("按领队搜索");
      $(this).attr("type", "1").attr("type", "0").html("按活动搜索");
      $("#eventSearchForm input[name='searchType']").val(1);
    }
    $("#search-leader-type .fresult").slideToggle();
  });

 /* $('.fresult a').live('click', function() {
    var cid = $(this).attr('data-cid');
    var val = "{'cid': " + cid + ",'cname':'" + $(this).text() + "'}";
    setCookie('_LY_SEARCH_CITY', val, '', '/', '', '');
    getCkDeal();
    $('.fresult').hide();
  });*/
});
function topDropdown() {
  if (jQuery('.topnavul li').length > 0) {
    jQuery('.topnavul').delegate("li", "hover", function() {
      jQuery(this).toggleClass('topnavhover')
    })
  }
}
function getCkDeal() {
  /*var ck = getCookie('_LY_SEARCH_CITY');*/
 /* var ckJson = eval('(' + ck + ')');*/
 /* if (ckJson)*/ {
   /* $('.s_place .p').html(ckJson.cname);*/
  }
}