// JavaScript Document
(function($){
	$.fn.Slide=function(options){
		var opts = $.extend({},$.fn.Slide.deflunt,options);
		var index=1;
		var targetLi = $("." + opts.claNav + " b", $(this));//鐩爣瀵硅薄
		var ConTxt = $("." + opts.claTxt, $(this));//姣忕瘒棰濆鍐呭瀵硅薄
		var clickNext = $("." + opts.claNav + " .next", $(this));//鐐瑰嚮涓嬩竴涓寜閽�
		var clickPrev = $("." + opts.claNav + " .prev", $(this));//鐐瑰嚮涓婁竴涓寜閽�
		var ContentBox = $("." + opts.claCon , $(this));//婊氬姩鐨勫璞�
		var ContentBoxNum=ContentBox.children().size();//婊氬姩瀵硅薄鐨勫瓙鍏冪礌涓暟
		var slideH=ContentBox.children().first().height();//婊氬姩瀵硅薄鐨勫瓙鍏冪礌涓暟楂樺害锛岀浉褰撲簬婊氬姩鐨勯珮搴�
		var slideW=ContentBox.children().first().width();//婊氬姩瀵硅薄鐨勫瓙鍏冪礌瀹藉害锛岀浉褰撲簬婊氬姩鐨勫搴�
		var autoPlay;
		var slideWH;
		if(opts.effect=="scroolY"||opts.effect=="scroolTxt"){
			slideWH=slideH;
		}else if(opts.effect=="scroolX"||opts.effect=="scroolLoop"){
			ContentBox.css("width",ContentBoxNum*slideW);
			slideWH=slideW;
		}else if(opts.effect=="fade"){
			ContentBox.children().css({'opacity':'0'});
			ContentBox.children().first().css({'opacity':'1',"z-index":"1"});
		}//閫氳繃鍒ゆ柇鍔ㄧ敾鏍峰紡璁剧疆鍒濆鍊�
		
		return this.each(function() {
			var $this=$(this);
			//婊氬姩鍑芥暟
			var doPlay=function(){
				$.fn.Slide.effect[opts.effect](ContentBox, targetLi, ConTxt, index, slideWH, opts);
				index++;
				if (index*opts.steps >= ContentBoxNum) {
					index = 0;
				}
			};
			//涓嬩竴涓�
			clickNext.click(function(event){
				if(opts.effect=="fade"){
					if (index*opts.steps >= ContentBoxNum) {
						index = 0;
					}
					$.fn.Slide.effect[opts.effect](ContentBox, targetLi, ConTxt, index, slideWH, opts);
					index++;
					return false
				}
				$.fn.Slide.effectLoop.scroolLeft(ContentBox, targetLi, index, slideWH, opts,function(){
					for(var i=0;i<opts.steps;i++){
	                    ContentBox.find("li:first",$this).appendTo(ContentBox);
	                }
	                ContentBox.css({"left":"0"});
				});
				event.preventDefault();
			}).hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
			//涓婁竴涓�
			clickPrev.click(function(event){
				if(opts.effect=="fade"){
					if (index*opts.steps <= 0) {
						index = ContentBoxNum;
					}
					$.fn.Slide.effect[opts.effect](ContentBox, targetLi, ConTxt, index-2, slideWH, opts);
					index--;
					return false
				}
				for(var i=0;i<opts.steps;i++){
	                ContentBox.find("li:last").prependTo(ContentBox);
	            }
	          	ContentBox.css({"left":-index*opts.steps*slideW});
				$.fn.Slide.effectLoop.scroolRight(ContentBox, targetLi, index, slideWH, opts);
				event.preventDefault();
			}).hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
			//鍙栨秷璁℃椂
			ConTxt.hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			})
			//鑷姩鎾斁
			if (opts.autoPlay) {
				autoPlay = setInterval(doPlay, opts.timer);
				ContentBox.hover(function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}//榧犳爣绉诲叆鍥剧墖涓嶈嚜鍔ㄦ挱鏀�
				},function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}
					autoPlay=setInterval(doPlay, opts.timer);
				});
			}
			//鐩爣浜嬩欢
			targetLi.hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				index=targetLi.index(this)+1;
				window.setTimeout(function(){$.fn.Slide.effect[opts.effect](ContentBox, targetLi, ConTxt, index-1, slideWH, opts);},200);
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
    	});
	};
	$.fn.Slide.deflunt={
		effect : "scroolY",
		autoPlay:true,
		speed : "normal",
		timer : 1000,
		defIndex : 0,
		claNav:"bdSlideNav",//鍒囨崲鎸夐挳
		claCon:"bdSlideCon",//鍒囨崲鍐呭
		claTxt:"bdName",//鍒囨崲鍐呭闄勫姞鐨剆th.
		steps:1
	};
	$.fn.Slide.effectLoop={
		scroolLeft:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		
		scroolRight:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":0},opts.speed,callback);
		}
	}
	$.fn.Slide.effect={
		fade:function(contentObj,navObj,txtObj,i,slideW,opts){
			contentObj.children().eq(i).stop().animate({opacity:1},opts.speed,function(){if(txtObj.length>1){txtObj.addClass('sphl').eq(i).removeClass('sphl')}}).css({"z-index": "1"}).siblings().stop().animate({opacity: 0},opts.speed).css({"z-index":"0"});
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		},
		scroolTxt:function(contentObj,undefined,i,slideH,opts){
			//alert(i*opts.steps*slideH);
			contentObj.animate({"margin-top":-opts.steps*slideH},opts.speed,function(){
                for( var j=0;j<opts.steps;j++){
                	contentObj.find("li:first").appendTo(contentObj);
                }
                contentObj.css({"margin-top":"0"});
            });
		},
		scroolX:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		scroolY:function(contentObj,navObj,i,slideH,opts){
			contentObj.stop().animate({"top":-i*opts.steps*slideH},opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		}
	};
})(jQuery);