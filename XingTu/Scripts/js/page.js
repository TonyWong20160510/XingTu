/*
* The new version of zyjb'details page 
* author: zhangxuemei
* 2014-6-23
* last-modify: 2014-7-2
 */
(function($) {

    //消息弹出框
    $.fn.alertMsg = function (message, winObj) {
        var winCover = true;
        var cover = {
            width: $(window).width(),
            height: $(window).height(),
            cont: "<div class='cover'></div>"
        };
        return this.each(function () {
            var target = $(this);
            var coverObj = $(".cover");
            var msgObj = winObj.find(".message");
            target.click(function () {
                if (winCover) {
                    $("html").append(cover.cont);
                    $('.cover').css({'width': cover.width, 'height': cover.height});
                }
                if (coverObj.length == 0) {
                    winObj.show();
                }
                msgObj.html(message);
            })
            $('.close').live('click', function () {
                $(".alertMsgDialog").hide();
                $(".cover").remove();
            })
        })
    };

    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)   
             */
            CurTime: function(){
                return Date.parse(new Date())/1000;
            },
            /**               
             * 日期 转换为 Unix时间戳 
             * @param <string> 2014-01-01 20:20:20  日期格式               
             * @return <int>        unix时间戳(秒)               
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                        )).getTime() / 1000;
            },
            /**               
             * 时间戳转换日期               
             * @param <int> unixTime    待时间戳(秒)               
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)               
             * @param <int>  timeZone   时区               
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth()+1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true)
                {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            }
        }
    });
})(jQuery);
function alertMsg(message, winObj) {
    var winCover = true;
    var cover = {
        width: $(window).width(),
        height: $(window).height(),
        cont: "<div class='cover'></div>"
    };
    var target = $(this);
    var coverObj = $(".cover");
    var msgObj = winObj.find(".message");

    if (winCover) {
        $("html").append(cover.cont);
        $('.cover').css({'width': cover.width, 'height': cover.height});
    }
    if (coverObj.length == 0) {
        winObj.show();
    }
    msgObj.html(message);
}

function closeAlertMsg() {
    $(".alertMsgDialog").hide();
    $(".cover").remove();
}
//导航部分js
$(document).ready(function($) {
    ga('send', 'event', 'category', 'action', 'huodong');
	//搜索类型下拉
	 $(".searchtype").hover(function() {
        $('.searchdrop').show();
    }, function() {
        $('.searchdrop').hide();
    })
	//搜索类型
	$("#search_bar").find("li").click(function() {
        var s = $(this);
        if (s.data('searchtype')) {
            $("#indexSearchTypeValue").val(s.attr("data-searchtype"));
            $("#searchselect").text(s.text());
            if(s.data('searchtype') == "lvxing") {
                $("#commonSearchForm").attr("action","${comsite}search")
            }else{
                $("#commonSearchForm").attr("action","${website}/huodong/search")
            }
        }
        $('.searchdrop').hide();
    });
	// 导航下拉菜单
    $('#newnavi li').hover(function() {
        $(this).addClass('lihover');
        $(this).find('.navdropBox').show();
    }, function() {
        $(this).removeClass('lihover');
        $(this).find('.navdropBox').hide();
    });
	
})

$(function(){
	var $nb = $(".title-bar-wrap");
	var	navbar = $nb.offset().top;
	var $cmt_area = null;
	var $cmt_btn = null
	var	string = null;
	var flag = false;
	var isLoading = false;
	var leader = $("input[name='leader']").val();
    var lid = $("input[name='leaderid']").val();
    var uid = $("input[name='user_id']").val();
	var depart_at = $("input[name='depart_at']").val();
    var tid = $("input[name='tid']").val();
	var leaderHdTpl;
	//报名按钮状态
	$.ajax({
		type: "get",
		url: "/event/apply_status/?tid="+tid+"",
        dataType: "json",
        success: function(data) {
        	if(data.code == 0) {
        		if(data.status == 1) {
        			$('#hdOpBtn').addClass('grayed');
        			$('#hdOpBtn').html(data.msg);
        			$('#hdOpBtn')[0].disabled = true;

        			$('#hdOpBtn2').addClass('grayed');
        			$('#hdOpBtn2').html(data.msg);
        			$('#hdOpBtn2')[0].disabled = true;
        			$('#timer').hide();
                    if(data.msg=='副领队未就绪' && uid==lid){
                        $('#reTell').show();
                    }
        		}else {
					$('#hdOpBtn').removeClass('grayed');
					$('#hdOpBtn').html("我要报名");
        			$('#hdOpBtn')[0].disabled = false;

					$('#hdOpBtn2').removeClass('grayed');
					$('#hdOpBtn2').html("我要报名");
        			$('#hdOpBtn2')[0].disabled = false;
					$('#timer').show();
        		}
        	}else {
        		$('#hdOpBtn').removeClass('grayed');
				$('#hdOpBtn').html("我要报名");
                $('#hdOpBtn')[0].disabled = false;

        		$('#hdOpBtn2').removeClass('grayed');
				$('#hdOpBtn2').html("我要报名");
                $('#hdOpBtn2')[0].disabled = false;
				$('#timer').show();
        	}
        },
        error: function(){
        }  
	})


	//领队的其他活动 默认加载
    var depart_at = $("input[name='depart_at']").val();
    var tid = $("input[name='tid']").val();
    var lid = $("input[name='leaderid']").val();
	$.ajax({
		type: "get",
		url: "/event/recommend/?tid="+tid+"&leader=" + lid + "&depart_at=" + depart_at,
        dataType: "json",
        success: function(data) {
        	if(data.code == 0) {
        		var dataList = data.data;
        		for(var i = 0;i < dataList.length;i++) {
        			leaderHdTpl = "<dl class='clearfix'>"+
                        	"<dt><a href='"+dataList[i].url+"'><img src='"+dataList[i].img+"' width='77' height='71'></a></dt>"+
                        	"<a href='"+dataList[i].url+"'><span>"+dataList[i].subject+"</span></a>"+
							"</dl>";
        			$('.hd_detail_r_top').append(leaderHdTpl);
        		}
        	}else {
        		
        	}
        },
        error: function(){
        }  
	})

	$('#reTell').live('click', function () {
        $.ajax({
            type: "get",
            url: '/ajax/leader/open/viceleader/reinvite.jhtml?eventTid='+tid,
            dataType: "json",
            success: function(data) {
                if(data.code == 0) {
                   $('.tanchuang_a').show();
                }else {
                    alert(data['message']);
                    return false;
                }
            },
            error: function(){
            }  
        })
    });

    $('.btn_tanchuan_a').click( function () {
        $('.tanchuang_a').hide();
     });

    if($('.h_intro').offset().top > 230){
		$('.h_m_rside_box').css('margin-top','75px');
	}else {
		$('.h_m_rside_box').css('margin-top','40px');
	}
	//字数控制
	//wlenLimit($('.zyjb_title h2'), 64);
	wlenLimit($('.h_r_i_main p'), 100);
    $('.hd_detail_r_top dl').each(function(){
		var dlH = $(this).find('img').height() + 1;
		var $span = $('span',$(this)).eq(0);
		while($span.outerHeight() > dlH){
			$span.text($span.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
		}
	})
	
	// 导航定位控制
	$(window).scroll(function(){
		var scroH = $(this).scrollTop();
		var h_d_top = $('#hd_intro').offset().top;
		var s_l_top = $('#sign_list').offset().top;
		var c_d_top = $('#cost_detail').offset().top;
		var p_s_top = $('#pay_style').offset().top;
		var s_f_top = $('#sign_flow').offset().top;
		var z_q_top = $('#zx_qa').offset().top;
		var xl = $('#xl').offset().top;
		var xc = $('#xc').offset().top;
		var zb = $('#zb').offset().top;
		var bm = $('#bm').offset().top;
        if(scroH >= 1210) {
            $('.side_qrcode').show();
            $('#backtop').show();
        }else {
            $('.side_qrcode').hide();
            $('#backtop').hide();
        }
		
		//顶部导航fixed
		if(scroH >= navbar - 180) {
			$nb.addClass('tb-fixed');
			$('.s_f_btn').css('display','block');
		}else {
			$nb.removeClass('tb-fixed');
			$('.s_f_btn').css('display','none');
		}

		//顶部导航 自动定位
		if(scroH >= h_d_top - 100) {
			getAnchor($('.title-bar li'),'hd_intro');
		}
		if(scroH >= c_d_top - 100) {
			getAnchor($('.title-bar li'),'cost_detail');
		}
		if(scroH >= s_l_top - 100) {
			getAnchor($('.title-bar li'),'sign_list');
		}
		if(scroH >= p_s_top - 100) {
			getAnchor($('.title-bar li'),'pay_style');
		}
		if(scroH >= s_f_top - 100) {
			getAnchor($('.title-bar li'),'sign_flow');
		}
		if(scroH >= z_q_top - 100 || $(document).scrollTop() >= $(document).height() - $(window).height()) {
			getAnchor($('.title-bar li'),'zx_qa');
		}

	
		//活动介绍导航定位
		if(scroH >= navbar - 100 && scroH <= c_d_top - 250) {
			$('#myaffix').addClass('affixed');
			$('.intro-info_box').addClass('i_i_box');
			//自动定位
			if(scroH >= xl - 100) {
				getAnchor($('.barlist li'),'xl');
			}
			if(scroH >= xc -100) {
				getAnchor($('.barlist li'),'xc');
			}
			if(scroH >= zb -100) {
				getAnchor($('.barlist li'),'zb');
			}
			if(scroH >= bm -100) {
				getAnchor($('.barlist li'),'bm');
			}
		}else {
			$('#myaffix').removeClass('affixed');
			$('.intro-info_box').removeClass('i_i_box');
		}

		//获取锚点位置
		function getAnchor(obj,item){
			obj.each(function(){
				var anchor = $(this).find('a').attr('class');
				if(anchor == item) {
					$(this).addClass('active').siblings().removeClass('active');
				}
			})
		}
	})

	//倒计时
    var expirate = $('input[name=expirate]').val();
	countDown(expirate,"#timer");

	//导航选中效果
	$('.title-bar li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

	//咨询内容
	//---领队回复
	$(document).on('click','.deploy',function(e){
		e.preventDefault();
		//添加回复
		var $user_name = $(this).parents('.qa_list').find('.qname');
		var rbox = '<dl class="responseBox replyBox clearfix">'+
						'<dt>回复咨询：</dt>'+
						'<dd>'+
							'<textarea class="reply" placeholder="回复&nbsp;'+ $user_name.text() +'&nbsp;的提问"></textarea>'+
						'</dd>'+
						'<div class="sub">'+
							'<div class="sub-r flr">'+
								'<span class="count fn-ib flr"><b>0</b>/140</span>'+
								'<a class="subBtn">提交</a>'+
							'</div>'+
						'</div>'+
					'</dl>';

		//同时只能开一个回复窗口
		if($('.replyBox').length == 0) {   //当前只有一个窗口
			$(this).parents('.qa_list').append(rbox);
			$cmt_area = $(this).parent().find('.reply');		
			$(this).text('');
			if($(this).parent('.op').find('.sanchu').length > 0){
				$(this).parent('.op').find('.sanchu').text('');
			}
			if($(this).parent('.op').find('.edit_qa').length > 0){
				$(this).parent('.op').find('.edit_qa').text('');
			}
			//$(this).removeClass('deploy').addClass('retract');
			$cmt_area.focus();
		}else {   //多个，则关闭其他回复窗口
			$(this).parents('.qa_list').siblings('.qa_list').find('.replyBox').remove();
			$(this).parents('.qa_list').append(rbox);
			$(this).text('');
			if($(this).parent('.op').find('.sanchu').length > 0){
				$(this).parent('.op').find('.sanchu').text('');
			}
			if($(this).parent('.op').find('.edit_qa').length > 0){
				$(this).parent('.op').find('.edit_qa').text('');
			}
			$(this).parents('.qa_list').siblings('.qa_list').find('.replyBtn').text('回复');		
			//$(this).removeClass('retract').addClass('deploy');
			$cmt_area.focus();
		}
		
	})

	//---回复字数提示
	$(document).on('keypress','.reply', function(e){
		var $textarea = $(this).parents(".qa_list").find('.reply');
		setInterval(function(){checkWord($textarea);},100);
	})

	//---提问字数提示
	$('.zxBox').on('keypress','.comment', function(e){
		var $textarea = $(this).parents(".zxBox").find('.comment');
		setInterval(function(){checkWord($textarea);},100);
	})

	//--编辑提问字数提示
	$(document).on('keypress','.edit', function(e){
		var $textarea = $(this).parents(".qa_list").find('.edit');
		setInterval(function(){checkWord($textarea);},100);
	});
	//取消报名
	$('.btn_cancle').live('click', function () {
        $("#bm-cancel-form input[name='orderSn']").val($(this).attr("order_sn"));
        alertMsg("确定取消？", $("#bm-cancel-box"));
    });
	//确认报名
	$('.btn_cz').live('click', function () {
        //$.get('http://thuodong.lvye.com/ajax/leader/enter/entSure/'+$(this).attr("order_sn"));
        //$.get('http://tleader.lvye.com/enter/entSure/'+$(this).attr("order_sn"));
        $.ajax({
            type: "get",
            url: '/ajax/leader/enter/entSure/'+$(this).attr("order_sn"),
            dataType: "json",
            success: function(data) {
                if(data.code == 0) {
                    loadBmList(bm_page);
                }else {
                    alert(data['message']);
                    return false;
                }
            },
            error: function(){
            }  
        })
    });

    $('.close').live('click', function () {
        closeAlertMsg();
    });
    //弹窗 取消原因
    $(document).on('click', '.cancelBtn .cancelOk', function(){
        var reason = $(".cancelDiv").val();
        var cnt_size = reason.length;
        var order_sn = $("#bm-cancel-form input[name='orderSn']")[0].value;
		//alert(cnt_size);
		if(cnt_size > 0 && cnt_size <= 50){
    		$.post('/ajax/leader/enter/entCancle?orderSn='+order_sn+'&note='+reason,
                {}, 
                function(json) {
                    if(json['code']=="0") {
                        closeAlertMsg();
                        loadBmList(bm_page);
                    }
                    else{
                        alert(json['message']);
                        return false;
                    }
			});
		}else{
			alert('文字请控制在1-50字之间');
			return false;
		}
    })
    $(document).on('click', '.cancelBtn .cancelFail', function(){
        closeAlertMsg();
    })

	//---监听文本区域的字符数和是否满足要求
	function checkWord(obj){ 
		var minNum = 6;
		var maxNum = 140;
		var $comment_b = obj.parent().parent().find('.count').find('b');
		string = obj.val();
		var charNum = string.replace(/[^\x00-\xff]/g, "*").length;
		
		if(string.length <= 0){
			$comment_b.text(0);
			$comment_b.removeClass('red');
		}else {
			obj.siblings('span').text('');
			$comment_b.text(charNum);
			if(string.length > maxNum || string.length < minNum){  //限制字数6-140
				$comment_b.addClass('red');
			}else {
				$comment_b.removeClass('red');
			}
		}
	}

	//---提交回复
	$(document).on('click', '.replyBox .subBtn', function(){
		var _parent = $(this).parents(".qa_list");
		var $textarea = _parent.find('.reply');
		var reply_cont = $textarea.val();
		var reply_author = $('input[name=user_name]').val();
		var sys_time = $('input[name=sys_time]').val();
		var user_img = $('input[name=user_img]').val();
		var leader_reply = '<div class="hd_box">'+
							'<dl>'+
								'<dd>'+
									'<div class="hd_user">'+
										'<span class="hname fn-ib">'+ reply_author +'</span>的回答'+
										'<span class="time fn-ib">'+ sys_time +'</span>'+
									'</div>'+
									'<div class="hd_cont">'+
										'<p>'+ reply_cont +'</p>'+
									'</div>'+
								'</dd>'+
								'<dt><img src="'+user_img+'" width="48" height="48" alt="" title=""></dt>'+
							'</dl>'+
							'<div class="clear"></div>'+
						'</div>';
		//console.log($textarea.val());
		var cnt_size = $(this).parents('.replyBox').find('.reply').val().length;
		//alert(cnt_size);
		if(cnt_size > 5 && cnt_size <= 140){
            var uid = $("input[name='user_id']").val();
            var tid = $("input[name='tid']").val();
            var qid = $(this).parents('.qa_list').attr('id');
            var remove_reply = $(this).parents('.replyBox');
            var title = $('input[name=title_title]').val();
            var touid = $(this).parents('.qa_list').attr('data-uid');
            var currentPage = $("input[name='current_page']").val();
            var _this = $(this);
            var _qa_list = _this.parents('.qa_list');
            var _op = _qa_list.find('.op');
			$.post('/event/ques_ans/',
                {'tid':tid,
                 'uid':uid,
                 'qid':qid,
                 'touid':touid,
                 'title':title,
                 'content':reply_cont,
                 'current_page':currentPage,
                 'uname':reply_author}, 
                function(json) {
                    if(json['status']) {
                        remove_reply.remove();
                        _parent.append(leader_reply);
                        if(_op.attr('data-huifu')){
                            _qa_list.find('.deploy').text('回复');
                        }
                        if(_op.attr('data-sanchu')){
                            _qa_list.find('.sanchu').text('删除');
                        }
                    }
                    else{
                        if(json['error']=='id wrong')
                            alert('您回复的问题已失效');
                        else
                            alert(json['error']);
                    }
			});
		}else{
			alert('文字请控制在6-140字之间');
			return false;
		}
	})

	//---提交提问
	$(document).on('click', '.zx_box .subBtn', function(){
		var _parent = $(this).parents(".zx_box");
		var $textarea = _parent.find('.comment');
		var q_cont = $textarea.val();
		var q_author = $('input[name=user_name]').val();
		var user_img = $('input[name=user_img]').val();
		var sys_time = $('input[name=sys_time]').val();

		var cnt_size = $(this).parents('.zxBox').find('.comment').val().length;
		if(cnt_size > 5 && cnt_size <= 140){
			//alert('可以提交');
            var uid = $("input[name='user_id']").val();
            var tid = $("input[name='tid']").val();
            var title = $('input[name=title_title]').val();
            var touid = $('input[name=leaderid]').val();
            var currentPage = $("input[name='current_page']").val();
			$.post('/event/ques_add/',
                {'tid':tid,
                 'uid':uid,
                 'content':$textarea.val(),
                 'touid':touid,
                 'title':title,
                 'current_page':currentPage,
                 'uname':q_author}, 
                function(json) {
                    if(json['status']) {
                        var q_cnt = '<div class="qa_list clearfix" id="'+json['pk']+'">'+
                            '<div class="tw_box">'+
                                '<dl>'+
                                    '<dt><img src="'+user_img+'" width="48" height="48" alt="" title=""></dt>'+
                                    '<dd>'+
                                        '<div class="qa_user">'+
                                            '<span class="qname fn-ib">'+ q_author +'</span>的提问'+
                                            '<span class="time fn-ib">' +sys_time +'</span>'+
                                        '</div>'+
                                        '<div class="qa_cont">'+
                                            '<p>'+ q_cont +'</p>'+
                                        '</div>'+
                                    '</dd>'+
                                '</dl>'+
                                '<div class="op">'+
                                '<a class="replyBtn edit_qa">编辑</a></div>'+
                                //'<a class="delete">删除</a>'+    /* 运营删除 */
                                '<div class="clear"></div>'+
                            '</div>'+
                        '</div>';
                        $('#zx_qa').find('.zx_qa_top').after(q_cnt);
                        $textarea.val('');
                    }
                    else{
                        alert(json['error']);
                    }
			});
		}else{
			alert('文字请控制在6-140字之间');
			return false;
		}
	})

	//---编辑提问
	$(document).on('click', '.edit_qa', function(e){
		e.preventDefault();
		var $user_name = $(this).parent().find('.qname');
		var old_cnt = $(this).parents('.qa_list').find('.qa_cont p').text();
		var ed_box = '<dl class="responseBox editBox clearfix">'+
					 	'<dt>编辑问题：</dt>'+
					 	'<dd>'+
					 		'<textarea class="edit" placeholder="">'+ old_cnt +'</textarea>'+
					 	'</dd>'+
					 	'<div class="clear"></div>'+
					 	'<div class="sub clearfix">'+
					 		'<div class="sub-r flr">'+
					 			'<span class="count fn-ib flr"><b>0</b>/140</span>'+
					 			'<a class="subBtn_edit">提交</a>'+
					 		'</div>'+
					 	'</div>'+
					 '</dl>';

		//同时只能开一个编辑窗口
        if($('.editBox').length == 0) {   //当前只有一个窗口
			$(this).parents('.qa_list').append(ed_box);
			$cmt_area = $(this).parent().find('.edit');		
			$(this).text('');
			if($(this).parent('.op').find('.sanchu').length > 0){
				$(this).parent('.op').find('.sanchu').text('');
			}
			if($(this).parent('.op').find('.deploy').length > 0){
				$(this).parent('.op').find('.deploy').text('');
			}
			//$(this).removeClass('deploy').addClass('retract');
			$cmt_area.focus();
		}else {   //多个，则关闭其他编辑窗口
			$(this).parents('.qa_list').siblings('.qa_list').find('.editBox').remove();
			$(this).parents('.qa_list').append(ed_box);
			$(this).text('');
			if($(this).parent('.op').find('.deploy') > 0){
				$(this).parent('.op').find('.deploy').text('');
			}
			if($(this).parent('.op').find('.sanchu').length > 0){
				$(this).parent('.op').find('.sanchu').text('');
			}
			$(this).parents('.qa_list').siblings('.qa_list').find('.edit_qa').text('编辑');		
			//$(this).removeClass('retract').addClass('deploy');
			$cmt_area.focus();
		}
	})


	//提交编辑
	$(document).on('click','.subBtn_edit',function(){
		var cnt_size = $(this).parents('.responseBox').find('.edit').val().length;
		if(cnt_size > 5 && cnt_size <= 140){
			var _parent = $(this).parents('.editBox');
			var new_cnt = _parent.find('.edit').val();
            var id = $(this).parents('.qa_list').attr('id');
            var _this = $(this);
            var _qa_list = _this.parents('.qa_list');
            var _op = _qa_list.find('.op');
			$.post('/event/ques_edit/',
                {'id':id,
                 'content':new_cnt}, 
                function(json) {
                    if(json['status']) {
                        _parent.hide();
                        _qa_list.find('.qa_cont').find('p').html(new_cnt);
                        if(_op.attr('data-bianji')){
                            _qa_list.find('.edit_qa').text('编辑');
                        }
                        if(_op.attr('data-huifu')){
                            _qa_list.find('.deploy').text('回复');
                        }
                        if(_op.attr('data-sanchu')){
                            _qa_list.find('.sanchu').text('删除');
                        }
                    }
                    else{
                        alert(json['error']);
                    }
			});
		}else{
			alert('文字请控制在6-140字之间');
			return false;
		}
	})

	//---删除留言
	$(document).on('click','.sanchu',function(){
		var $delNode = $(this).parents('.qa_list');
		if(confirm('确定要删除吗？')){
            var id = $(this).parents('.qa_list').attr('id');
			$.post('/event/ques_del/',
                {'id':id}, 
                function(json) {
                    if(json['status']) {
                        $delNode.remove();	
                    }
                    else{
                        alert(json['error']);
                    }
			});
		}
	})

	//返回顶部
	$('#nav_backtop').mouseover(function(){
		$(this).addClass('backhover');
	}).mouseout(function(){
		$(this).removeClass('backhover');
	}).click(function() {
        $('html,body').animate({
        scrollTop: 0
        }, 500);
    });

    //领队信息接口
    var tid = $("input[name='tid']").val();
    var lid = $("input[name='leaderid']").val();
    var uid = $("input[name='user_id']").val();
    var leader_pic = 'http://www.lvye.cn/uc_server/avatar.php?uid='+lid+'&amp;size=small';
    $.ajax({
		type: "get",
		//url: "http://www.lvye.cn/plugin.php?id=event:newevent_leaderinfo&tid="+tid+"&callback=?",
		url: "/event/leaders/?tid="+tid+"",
        dataType: "json",
        success: function(json) {
        	var data = json['data'];
        	for (index in data) {
        		//删除领队
        		if(data[index].uid == lid){
    				//输出领队信息
	        		var leader = data.splice(index, 1);
				    var lname = leader[0].username;
	        		var lp = leader[0].goodpecent;
	        		var ledPeopleNum = leader[0].ledPeopleNum;
	        		var led_time = leader[0].led_time;
	        		var luid = leader[0].uid;
	        		var leader_pic = 'http://www.lvye.cn/uc_server/avatar.php?uid='+luid+'&amp;size=small';
                    var leader_url = '/store/'+luid+'/';
                    //var leader_url = 'http://sns.lvye.cn/plugin.php?id=event:leaderinfo&uid='+luid;
                    var a_lname = '<a href="'+leader_url+'">'+lname+'</a>'
                    var lpn = leader[0].ngoodmarks;
                    var hphtml = lp + '% <cite>' + '(共'+ lpn + '人评论)' + '</cite>'; 
	        		$('.leader').find('.na').html(a_lname);
	        		$('.leader').find('.goodpecent').find('cite').html(hphtml);
	        		$('.leader').find('.ledPeopleNum').find('cite').html(ledPeopleNum);
	        		$('.leader').find('.ledtime').find('cite').html(led_time);
	        		$('.leader').find('.leaderPic').attr("src",leader_pic);
	        		$('.leader').find('.p').attr("href",leader_url);
                    if(leader[0].leadermedal == 13)
                        $('.ic').addClass('show_peixun');
    			}
			}
			//输出副领队信息
			for(var i = 0;i < data.length;i++){
				var fname = data[i].username;
				var fuid = data[i].uid;
				var lpic = 'http://www.lvye.cn/uc_server/avatar.php?uid='+fuid+'&amp;size=small';
				//var lurl = 'http://sns.lvye.cn/plugin.php?id=event:leaderinfo&uid='+fuid;
                var lurl = '/store/'+fuid+'/';
				var fllist = "<dl>"+
								"<dt>"+"<a href='"+lurl+"'>"+"<img src='"+lpic+"' width='32' height='32' alt=''>"+"</a>"+"</dt>"+
								"<dd>"+
									"<p>"+"<a href='"+lurl+"'>"+fname+"</a>"+"</p>"+
									"<img src='/static/details/images/vice-b.png' width='16' height='16' alt=''>"+"<span>备案领队</span>"+
								"</dd>"+
							"</dl>";
				$('.fleader_list').append(fllist);
			}
			//副领队展开全部
			if(data.length > 3) {
				$('.fl_arrow').show();
				//隐藏更多副领队
				$('.fleader_list dl:gt(2)').hide();

				$('.fl_arrow').click(function(){
					if($(this).hasClass('fl_deploy')) {
						$('.fleader_list dl:gt(2)').show();
						$(this).addClass('fl_retract').removeClass('fl_deploy');
						$(this).text('收起');
					}else {
						$('.fleader_list dl:gt(2)').hide();
						$(this).addClass('fl_deploy').removeClass('fl_retract');
						$(this).text('展开全部');
					}
				})
			}
            if(data.length == 0){
                $('.fleader_list').append('<p class="nofleader">暂时还没有副领队加入哦</p>');
            }
        },
        error: function(){
        }  
	});

	//报名列表接口
	var bm_page = 1;
    if(lid==uid){
        $('.down_load').show();
    }
	loadBmList(bm_page);

	//报名列表 下一页
	$(document).on('click','.bm_next',function(){
		var pageSum = $('input[name=bm_page_num]').val();
		//alert(pageSum);
		if(bm_page > pageSum - 1) {
			alert('已经到最后一页了');
		}else {
			bm_page++;
			loadBmList(bm_page);
			
		}
	})

	//报名列表 上一页
	$(document).on('click','.bm_prev',function(){
		if(bm_page <= 1) {
			alert('已经是第一页了');
		}else {
			bm_page--;
			loadBmList(bm_page);
		}
	})

	//报名列表 指定分页
	$(document).on('click','#sign_list .pbox li',function(){
		var cur_page_num = $(this).find('a').html();
		//alert(cur_page_num);
		bm_page = cur_page_num;
		loadBmList(bm_page);
	})


	//咨询问答 显示默认列表
	var current_page = $("input[name='current_page']").val();
	var current_qid = $("input[name='current_qid']").val();
    loadZxList(current_page,false,current_qid);
    var zx_page = current_page;

	//查看已回复问题
	$('.filter').click(function(){
		if($(this).find('input').attr('checked')){
			filterAnswerd('True');
		}else {
			filterAnswerd('false');
		}	
	})

	//咨询问答 下一页
	var pageSum = $('input[name=zx_page_num]').val();
	$(document).on('click','.zx_next',function(){
		var pageSum = $('input[name=zx_page_num]').val();
		//alert(pageSum);
		if(zx_page > pageSum - 1) {
			alert('已经到最后一页了');
		}else {
			zx_page++;
			loadZxList(zx_page,false);
		}
	})

	//咨询问答 上一页
	$(document).on('click','.zx_prev',function(){
		if(zx_page <= 1) {
			alert('已经是第一页了');
		}else {
			zx_page--;
			loadZxList(zx_page,false);
		}
	})

	//咨询问答 指定分页
	$(document).on('click','#zx_qa .pbox li',function(){
		var cur_page_num = $(this).find('a').html();
		//alert(cur_page_num);
		zx_page = cur_page_num;
		loadZxList(zx_page,false,0);
	})

	//判断是否收藏
	getCollect(uid,1);

	//收藏
	$('.collectBtn').click(function(e){	
        e.preventDefault();
		 getCollect(uid,2);
	});
	$('#jiaosha').click(function(e){	
        e.preventDefault();
        var dialog = new lyDialog({content: '登陆后才可以收藏哦'});
        dialog.show();
});

	//tab定位
	$('.sign_list').click(function(){
		scrollTab($(this),47);
	})
	$('.hd_intro').click(function(){
		scrollTab($(this),47);
	})
	$('.cost_detail').click(function(){
		scrollTab($(this),47);
	})
	$('.pay_style').click(function(){
		scrollTab($(this),47);
	})
	$('.sign_flow').click(function(){
		scrollTab($(this),47);
	})
	$('.zx_qa').click(function(){
		scrollTab($(this),47);
	})

	//活动介绍锚点定位
	$('.xl').click(function(){
		scrollTab($(this),60);
	})
	$('.xc').click(function(){
		scrollTab($(this),60);
	})
	$('.zb').click(function(){
		scrollTab($(this),60);
	})
	$('.bm').click(function(){
		scrollTab($(this),60);
	})

});

//tab锚点定位
function scrollTab(_this,shifting) {
	var id = _this.attr('class');
	$(document).scrollTop($('#' + id).offset().top - shifting);
}

//收藏接口
function getCollect(uid,type){
	var tid = $("input[name='tid']").val();
    if(uid){
        $.ajax({
            type: "post",
            url: "http://www.lvye.cn/plugin.php?id=event:newevent_favorite&tid="+tid+"&uid="+uid+"&type="+type+"&description=&callback=?",
            dataType: "jsonp",
            success: function(json) {
                var data = json;
                if(data[0].exist == 1) {    //已收藏
                    $('.collectBtn').addClass('ysc');
                    //$('.collectBtn').unbind("click");
                }else {
                    if(data[0].Error_code == 3) {
                        $('.collectBtn').addClass('ysc');
                        var dialog = new lyDialog({content: '您已收藏过了哦'});
                        dialog.show();
                    }
                    if(data[0].Error_code == 0 && data[0].exist == undefined) {
                        $('.collectBtn').addClass('ysc');
                        var dialog = new lyDialog({content: '收藏成功！请在“论坛-我的收藏”中查看'});
                        dialog.show();
                    }
                    if(data[0].Error_code == 1 || data[0].Error_code == 2){
                        var dialog = new lyDialog({content: '收藏失败!'});
                        dialog.show();
                    }
                }
            },
            error: function(){
            } 
        })
    }
}

//查看已回复问题
function filterAnswerd(awStatus) {
	var zx_page = 1;
	loadZxList(zx_page, awStatus,0);
}

function loadZxList(zx_page, answd,current_qid){
	var adlist = '';
	var tid = $("input[name='tid']").val();
	var total = $('.statistics').find('.total').text();
	$('.zx_qa_top').nextUntil('.zx_box').remove();
	$.ajax({
		type: "get",
		url: "/event/ques_show/?tid="+tid+"&page="+zx_page+"&answered="+ answd +"&len="+ total +"&callback=?",
		dataType: "jsonp",
		success: function(json) {
			//记录总页数
			var pageTotal = json['pages']['p_count'];
			$('input[name=zx_page_num]').val(pageTotal);

			if(pageTotal <= 1) {
				$('.zx_next').addClass('no-nextpage');
				$('.zx_prev').addClass('no-prevpage');
			}else {
				$('.zx_next').removeClass('no-nextpage');
				$('.zx_prev').removeClass('no-prevpage');
			}

			for(var i = 0;i < json['ques'].length;i++) {
				//alert(json['ques'][i]['uname']);
				adlist = adlist + "<div class='qa_list clearfix' id='"+json['ques'][i]['pk']+"' data-uid='"+json['ques'][i]['uid']+"'>"+
				"<div class='tw_box'>"+
					"<dl>"+
						"<dt><img src='http://www.lvye.cn/uc_server/avatar.php?uid="+ json['ques'][i]['uid'] +"&amp;size=small' width='48' height='48' alt='' title=''></dt>"+
						"<dd>"+
							"<div class='qa_user'>"+
								"<span class='qname fn-ib'>"+ json['ques'][i]['uname'] +"</span>的提问"+
								"<span class='time fn-ib'>"+ json['ques'][i]['change_time'] +"</span>"+
							"</div>"+
							"<div class='qa_cont'>"+
								"<p>"+ json['ques'][i]['content'] +"</p>"+
							"</div>"+
						"</dd>"+
					"</dl>";
                 adlist += "<div class='op' ";
                 adlist += "data-bianji="+"'"+json['ques'][i]['bianji']+"' ";
                 adlist += "data-huifu="+"'"+json['ques'][i]['huifu']+"' ";
                 adlist += "data-sanchu="+"'"+json['ques'][i]['sanchu']+"' ";
                 adlist += ">";
                 if(json['ques'][i]['bianji'])
                    adlist += "<a class='replyBtn edit_qa'>编辑</a>";
                 if(json['ques'][i]['huifu'])
					adlist += "<a class='replyBtn deploy'>回复</a>";
                 if(json['ques'][i]['sanchu'])
					adlist += "<div class='replyBtn sanchu'>删除</div>";

				adlist += "</div></div>";
				for(var j = 0;j < json['ques'][i]['answer'].length; j++) {
					adlist = adlist + "<div class='hd_box'>"+
						"<dl>"+
							"<dd>"+
								"<div class='hd_user'>"+
									"<span class='hname fn-ib'>"+ json['ques'][i]['answer'][j]['uname'] +"</span>的回答"+
									"<span class='time fn-ib'>"+ json['ques'][i]['answer'][j]['change_time'] +"</span>"+
								"</div>"+
								"<div class='hd_cont'>"+
									"<p>"+ json['ques'][i]['answer'][j]['content'] +"</p>"+
								"</div>"+
							"</dd>"+
							"<dt><img src='http://www.lvye.cn/uc_server/avatar.php?uid="+ json['ques'][i]['answer'][j]['uid'] +"&amp;size=small' width='48' height='48' alt='' title=''></dt>"+
						"</dl>"+
						"<div class='clear'></div>"+
					"</div>";
				}
				adlist = adlist + "</div>";
			}
			$('.zx_qa_top').after(adlist);

			//页码显示
            $('#zx_qa').find('.pbox').find('ul').html(''); 
            var $li = '';
            var totlePage = json['pages']['p_count'];
        	var currentPage = json['pages']['p'];
            $("input[name='current_page']").attr('value',currentPage);
            $('#zx_qa').find('.totlePage').find('cite').html(totlePage);
            if(json['pages']['p_pre'])
                $li = "<a class='zx_prev fll'></a>";
            if(json['pages']['p_list'] && json['pages']['p_list'].length > 1)
                for(var i = 0;i < json['pages']['p_list'].length;i++){
                    if(json['pages']['p_list'][i] == currentPage)
                        $li = $li + "<li class='current'><a href='javascript:void(0);'>"+ json['pages']['p_list'][i] +"</a></li>";
                    else
                        $li = $li + "<li><a href='javascript:void(0);'>"+ json['pages']['p_list'][i] +"</a></li>";
                }
            if(json['pages']['p_next'])
                $li = $li + "<a class='zx_next fll'></a>"
            $('#zx_qa').find('.pbox').find('ul').append($li);

            if(current_qid){
               $(document).scrollTop($('#'+current_qid).offset().top);
            }
        },
        error: function(){     	
        }
	});
}

//加载报名列表数据
function loadBmList(bm_page) {
	var tid = $("input[name='tid']").val();
    var gpic = null;
	var bxpic = null;
	var dv = null;
	var jy = null;
	var bz = null;
	var cz= null;
	//清空上一页
	$('.baoming_box').html('');

	//显示加载状态
	isLoading = true;
	$('#loader').show();

	if(isLoading){
		$.ajax({
			type: "get",
			//url: "http://www.lvye.cn/plugin.php?id=event:newevent_applylist&tid="+tid+"&page="+ bm_page +"&callback=?",
			url: "/event/apply_list/?tid="+tid+"&page="+ bm_page +"",
			//dataType: "jsonp",
			dataType: "json",
			success: function(json) {
                if(json['error_code'] == 2 || json['data'].length==0){
                    isLoading = false;
                    $('#loader').hide(); 
                    $('.baoming_box').append("这条线路可是极好的，期待您的加入哦！");
                }
                else{
                    //记录总页数
                    $('input[name=bm_page_num]').val(json['pages']['p_count']);
                    var lid = $("input[name='leaderid']").val();
                    var uid = $("input[name='user_id']").val();
                    var is_leader = lid==uid;
                    var tableCont = '';
                    if(is_leader){
                        tableCont = "<table><tbody>"+
                            "<tr class='cap'>"+
                                "<td class='t-l' width='140px'><strong>用户</strong></td>"+
                                "<td class='t-l' width='30px'><strong>人数</strong></td>"+
                                "<td width='80px'><strong>装备</strong></td>"+
                                "<td width='80px'><strong>户外经验</strong></td>"+
                                "<td width='120px'><strong>备注</strong></td>"+
                                "<td width='100px'><strong>已付金额</strong></td>"+
                                "<td width='80px'><strong>领队确认</strong></td>"+
                                "<td width='100px'><strong>操作</strong></td>"+
                                "<td><strong>报名时间</strong></td>"+
                            "</tr>";
                    }else{
                        tableCont = "<table><tbody>"+
                            "<tr class='cap'>"+
                                "<td class='t-l' width='140px'><strong>用户</strong></td>"+
                                "<td class='t-l' width='30px'><strong>人数</strong></td>"+
                                "<td width='100px'><strong>装备</strong></td>"+
                                "<td width='100px'><strong>户外经验</strong></td>"+
                                "<td width='120px'><strong>备注</strong></td>"+
                                "<td width='100px'><strong>领队确认</strong></td>"+
                                "<td><strong>报名时间</strong></td>"+
                            "</tr>";
                    }
                    for(var i = 0; i < json['data'].length;i++) {
                        dv = json['data'][i]['equipment']; 
                        jy = json['data'][i]['experience'];
                        bz = json['data'][i]['remark'];
                        //装备
                        if(dv) {
                            dv = json['data'][i]['equipment'];
                        }else {
                            dv = '无';
                        }
                        //户外经验
                        if(jy) {
                            jy = json['data'][i]['experience'];
                        }else {
                            jy = '无';
                        }
                        //备注
                        if(bz) {
                            bz = json['data'][i]['remark'];
                        }else {
                            bz = '无';
                        }
                        //确认
                        if(json['data'][i]['confirmed']) {
                            vz = "<td>已确认</td>"
                        }else {
                            vz = "<td class=\"red\">未确认</td>"
                        }
                        if (json['data'][i]['payedMoney']){
                            pay = json['data'][i]['payedMoney'];
                        }else{
                            pay = '0';
                        }
                        //操作
                        if(is_leader){
                            if(json['data'][i]['canCancel'] && json['data'][i]['canConfirm']){
                                cz="<td><span order_sn=\""+json['data'][i]['applyid']+"\" class=\"btn_cz\">确认报名</span><br/><span order_sn=\""+json['data'][i]['applyid']+"\" class=\"btn_cancle\">取消报名</span></td>";
                            }else if (json['data'][i]['canCancel']){
                                cz="<td><span order_sn=\""+json['data'][i]['applyid']+"\" class=\"btn_cancle\">取消报名</span></td>";
                            }else if(json['data'][i]['canConfirm']){
                                cz="<td><span order_sn=\""+json['data'][i]['applyid']+"\" class=\"btn_cz\">确认报名</span></td>";
                            }
                        }
                        //性别
                        if(json['data'][i]['gender'] == 1) {
                            gpic = '/static/details/images/man.png';
                        }else {
                            gpic = '/static/details/images/women.png';
                        }
                            tableCont = tableCont + "<tr>"+"<td class='t-l'>"+ json['data'][i]['username'] +"<img class='sex' src='"+ gpic +"' alt=''></td>"+"<td class='t-l bsicon'>"+"<span class='r'>"+ json['data'][i]['nusers'] +"</span>";
                            if(json['data'][i]['btstatus']=='1') {
                                tableCont += "<img class='attr' src='/static/details/images/bx.png' alt='保险'>";
                            }
                            if(json['data'][i]['client_platform']) {
                                tableCont += "<img class='attr' src='/static/details/images/pe.png' alt='手机'>";
                            }
                            tableCont += "</td>"+"<td>"+ dv +"</td>"+
                                "<td>"+ jy +"</td>"+
                                "<td>"+ bz +"</td>";
                            if(is_leader){
                                    tableCont += "<td>"+ pay +"</td>";
                                }
                                tableCont += vz;
                                if(is_leader){
                                    tableCont +=cz;
                                }
                                tableCont += "<td>"+ $.myTime.UnixToDate(json['data'][i]['dateline'],false,8) +"</td>"+
                            "</tr>";
                        
                    }
                    tableCont = tableCont + "</tbody></table>";
                    $('.baoming_box').append(tableCont);
                    

                    //页码显示
                    $('#sign_list').find('.pbox').find('ul').html('');
                    $('#sign_list').find('.pbox').find('ul').next().html('');

                    var $li = '';
                    var $tli = '';
                    var totlePage = json['pages']['p_count'];
                    var currentPage = json['pages']['p'];
                    if(json['pages']['p_pre'])
                        $li = "<a class='bm_prev fll'></a>";
                    if(json['pages']['p_list'] && json['pages']['p_list'].length > 1)
                        for(var i = 0;i < json['pages']['p_list'].length;i++){
                            if(currentPage == json['pages']['p_list'][i])
                                $li = $li + "<li class='current'><a href='javascript:void(0);'>"+ json['pages']['p_list'][i] +"</a></li>";
                            else
                                $li = $li + "<li><a href='javascript:void(0);'>"+ json['pages']['p_list'][i] +"</a></li>";
                        }
                    if(json['pages']['p_next'])
                        $li = $li + "<a class='bm_next fll'></a>";
                    $tli = "<span class='totlePage'>共<cite></cite>页</span>";
                    $('#sign_list').find('.pbox').find('ul').append($li);
                    $('#sign_list').find('.totlePage').find('cite').html(totlePage);

                    //关闭加载状态
                    isLoading = false;
                    $('#loader').hide(); 
                }
	        },
	        error: function(){}
	        
		});
	
	}
		
}

//倒计时
function countDown(time,id){
	var day_elem = $(id).find('.day');
	var hour_elem = $(id).find('.hour');
	var minute_elem = $(id).find('.minute');
	var second_elem = $(id).find('.second');
	var end_time = new Date(time).getTime(),
	sys_second = (end_time - new Date().getTime()) / 1000;
	var timer = setInterval(function(){
		if (sys_second > 1) {
			sys_second -= 1;
			var day = Math.floor((sys_second / 3600) / 24);
			var hour = Math.floor((sys_second / 3600) % 24);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			day_elem && $(day_elem).text(day);    //计算天
			$(hour_elem).text(hour < 10 ? "0" + hour:hour);    //计算小时
			$(minute_elem).text(minute < 10 ? "0" + minute:minute);    //计算分钟
			$(second_elem).text(second < 10 ? "0" + second:second);    //计算秒杀
		} else { 
			clearInterval(timer);
		}
	}, 1000);
}


//文字长度限制
function  wlenLimit(_this,num){
	    var cnt = _this.text();
	    var len = cnt.length;
	    var maxLen = num;
	    if(len > maxLen) {
		    _this.attr('title',cnt);
		    cnt = _this.text(cnt.substring(0, maxLen));
	    }
}

// dialog
function lyDialog (options) {
    var defaults = {
        title: "",
        content: "",
        esc: false,
        showHead: true,
        dialogMarkup: '<div class="ly-dialog">' +
                            '<div class="dialog-content">' +
                                '<div class="dialog-close"></div>' +
                                '<h3 class="head"><%head%></h3>' +
                                '<div class="body"><%body%></div>' +
                            '</div>' +
                            '<div class="dialog-underlay"></div>' +
                        '</div>'
    };

    this.settings = $.extend(defaults, options);
};

lyDialog.prototype.generateMarkup = function () {
    var settings = this.settings,
        domStr = settings.dialogMarkup.replace('<%head%>', settings.title).replace('<%body%>', settings.content);

        if (!settings.showHead) {
            domStr = domStr.replace(/<h3 class=\"head\">.*?<\/h3>/gi, "");
        }
    return domStr;
};

lyDialog.prototype.show = function (callback) {
    var self = this;
    this.markup = $(this.generateMarkup());
    this.mask = $("<\div>", {id: "ly-dialog-mask"});


    $('body').append(this.markup).append(this.mask);
    this.head = this.markup.find(".head");
    this.closeBtn = this.markup.find(".dialog-close");
    this.body = this.markup.find(".body");
    this.closeBtn.unbind().on('click', this.close);
    this.markup.show();
    this.mask.show();
    updatePosition();

    function updatePosition () {
        var w = $(window),
            viewportWidth = w.width(),
            viewportHeight = w.height(),
            pageHeight = $(document).height(),
            scrollTop = w.scrollTop(),
            width = self.markup.width(),
            height = self.markup.height();

        self.markup.css({left: (viewportWidth-width)/2,
            top: scrollTop + (viewportHeight - height) / 2});
        self.mask.css({height: pageHeight, width: viewportWidth, visibility: 'visible'});
    };

    function positionTimeout () {
        setTimeout(updatePosition, 16);
    }

    $(window).off('scroll resize', positionTimeout).on('scroll resize', positionTimeout);
    if (typeof callback == "function") {
        callback();
    };
};

lyDialog.prototype.close = function () {
    $(".ly-dialog").remove();
    $("#ly-dialog-mask").remove();
};

lyDialog.prototype.setHead = function (title) {
    $(".ly-dialog").find(".head").html(title);
};

lyDialog.prototype.setBody = function (markup) {
    $(".ly-dialog").find(".body").html(markup);
};
