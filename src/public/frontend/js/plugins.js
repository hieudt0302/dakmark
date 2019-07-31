/*!
 * Dropdownhover v1.0.0 (http://bs-dropdownhover.kybarg.com)
 */
+function ($) {
  'use strict';

  // DROPDOWNHOVER CLASS DEFINITION
  // =========================

  var Dropdownhover = function (element, options) {
    this.options    = options    
    this.$element   = $(element)

    var that = this

    // Defining if navigation tree or single dropdown
    this.dropdowns = this.$element.hasClass('dropdown-toggle') ? this.$element.parent().find('.dropdown-menu').parent('.dropdown') : this.$element.find('.dropdown')

    this.dropdowns.each(function(){
        $(this).on('mouseenter.bs.dropdownhover', function(e) {
          that.show($(this).children('a, button'))
        })
    })
    this.dropdowns.each(function(){
        $(this).on('mouseleave.bs.dropdownhover', function(e) {
          that.hide($(this).children('a, button'))
        })
    })

  }

  Dropdownhover.TRANSITION_DURATION = 300
  Dropdownhover.DELAY = 150
  Dropdownhover.TIMEOUT

  Dropdownhover.DEFAULTS = {
    animations : ['', '', '', ''],
  }

  // Opens dropdown menu when mouse is over the trigger element
  Dropdownhover.prototype.show = function (_dropdownLink) {
    var $this = $(_dropdownLink)

    window.clearTimeout(Dropdownhover.TIMEOUT)
    // Close all dropdowns
    $('.dropdown').not($this.parents()).each(function(){
         $(this).removeClass('open');
     });

    var effect = this.options.animations[0]

    if ($this.is('.disabled, :disabled')) return

    var $parent  = $this.parent()
    var isActive = $parent.hasClass('open')

    if (!isActive) {

      var $dropdown = $this.next('.dropdown-menu')
      var relatedTarget = { relatedTarget: this }

      $parent
        .addClass('open')

      var side = this.position($dropdown)
      side == 'top' ? effect = this.options.animations[2] :
      side == 'right' ? effect = this.options.animations[3] :
      side == 'left' ? effect = this.options.animations[1] :
      effect = this.options.animations[0]

      $dropdown.addClass('animated ' + effect)

      var transition = $.support.transition && $dropdown.hasClass('animated')

      transition ?
        $dropdown
          .one('bsTransitionEnd', function () {
            $dropdown.removeClass('animated ' + effect)
          })
          .emulateTransitionEnd(Dropdownhover.TRANSITION_DURATION) :
        $dropdown.removeClass('animated ' + effect)
    }

    return false
  }

  // Closes dropdown menu when moise is out of it
  Dropdownhover.prototype.hide = function (_dropdownLink) {

    var that = this
    var $this = $(_dropdownLink)
    var $parent  = $this.parent()
    Dropdownhover.TIMEOUT = window.setTimeout(function () {
      $parent.removeClass('open')
    }, Dropdownhover.DELAY)
  }

  // Calculating position of dropdown menu
  Dropdownhover.prototype.position = function (dropdown) {

    var win = $(window);

    // Reset css to prevent incorrect position
    dropdown.css({ bottom: '', left: '', top: '', right: '' }).removeClass('dropdownhover-top')
  
    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = dropdown.offset();
      bounds.right = bounds.left + dropdown.outerWidth();
      bounds.bottom = bounds.top + dropdown.outerHeight();
    var position = dropdown.position();
      position.right = bounds.left + dropdown.outerWidth();
      position.bottom = bounds.top + dropdown.outerHeight();
  
    var side = ''
   
    var isSubnow = dropdown.parents('.dropdown-menu').length

    if(isSubnow) {

      if (position.left < 0) {
        side = 'left'
        dropdown.removeClass('dropdownhover-right').addClass('dropdownhover-left')
      } else {
        side = 'right'
        dropdown.addClass('dropdownhover-right').removeClass('dropdownhover-left')
      }

      if (bounds.left < viewport.left) {
        side = 'right'
        dropdown.css({ left: '100%', right: 'auto' }).addClass('dropdownhover-right').removeClass('dropdownhover-left')
      } else if (bounds.right > viewport.right) {
        side = 'left'
        dropdown.css({ left: 'auto', right: '100%' }).removeClass('dropdownhover-right').addClass('dropdownhover-left')
      }

      if (bounds.bottom > viewport.bottom) {
        dropdown.css({ bottom: 'auto', top: -(bounds.bottom-viewport.bottom) })
      } else if (bounds.top < viewport.top) {
        dropdown.css({ bottom: -(viewport.top-bounds.top), top: 'auto' })
      }

    } else { // Defines special position styles for root dropdown menu

      var parentLi = dropdown.parent('.dropdown')
      var pBounds = parentLi.offset()
        pBounds.right = pBounds.left + parentLi.outerWidth()
        pBounds.bottom = pBounds.top + parentLi.outerHeight()

      if (bounds.right > viewport.right) {
        dropdown.css({ left: -(bounds.right-viewport.right), right: 'auto' })
      }

      if (bounds.bottom > viewport.bottom && (pBounds.top - viewport.top) > (viewport.bottom - pBounds.bottom) || dropdown.position().top < 0) {
        side = 'top'
        dropdown.css({ bottom: '100%', top: 'auto' }).addClass('dropdownhover-top').removeClass('dropdownhover-bottom')
      } else {
        side = 'bottom'
        dropdown.addClass('dropdownhover-bottom')
      }
    }

    return side;

  }


  // DROPDOWNHOVER PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdownhover')
      var settings = $this.data()
      if($this.data('animations') !== undefined && $this.data('animations') !== null)
         settings.animations =  $.isArray(settings.animations) ? settings.animations : settings.animations.split(' ')

      var options = $.extend({}, Dropdownhover.DEFAULTS, settings, typeof option == 'object' && option)

      if (!data) $this.data('bs.dropdownhover', (data = new Dropdownhover(this, options)))

    })
  }

  var old = $.fn.dropdownhover

  $.fn.dropdownhover             = Plugin
  $.fn.dropdownhover.Constructor = Dropdownhover


  // DROPDOWNHOVER NO CONFLICT
  // ====================

  $.fn.dropdownhover.noConflict = function () {
    $.fn.dropdownhover = old
    return this
  }


  // APPLY TO STANDARD DROPDOWNHOVER ELEMENTS
  // ===================================

  var resizeTimer;
  $(document).ready(function () {
    if($(window).width() >= 768) { // Breakpoin plugin is activated (768px)
      $('[data-hover="dropdown"]').each(function () {
        var $target = $(this)
        Plugin.call($target, $target.data())
      })
    }
  })
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      if($(window).width() >= 768) // Breakpoin plugin is activated (768px)
        $('[data-hover="dropdown"]').each(function () {
          var $target = $(this)
          Plugin.call($target, $target.data())
        })
      else  // Disabling and clearing plugin data if screen is less 768px
        $('[data-hover="dropdown"]').each(function () {
          $(this).removeData('bs.dropdownhover')
          if($(this).hasClass('dropdown-toggle'))
            $(this).parent('.dropdown').find('.dropdown').andSelf().off('mouseenter.bs.dropdownhover mouseleave.bs.dropdownhover')
          else
            $(this).find('.dropdown').off('mouseenter.bs.dropdownhover mouseleave.bs.dropdownhover')
        })
    }, 200)
  })

}(jQuery);


/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.9
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/



(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.9",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipetp=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipetp")}}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}return G};f.fn.swipetp.version=y;f.fn.swipetp.defaults=n;f.fn.swipetp.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipetp.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipetp.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipetp.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipetp.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,aw){var aA=(a||d||!aw.fallbackToMouseEvents),K=aA?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",az=aA?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=aA?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=aA?null:"mouseleave",aE=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ah=0,aQ=null,ac=0,a2=0,a0=0,H=1,ar=0,aK=0,N=null;var aS=f(a5);var aa="start";var X=0;var aR=null;var U=0,a3=0,a6=0,ae=0,O=0;var aX=null,ag=null;try{aS.bind(K,aO);aS.bind(aE,ba)}catch(al){f.error("events not supported "+K+","+aE+" on jQuery.swipetp")}this.enable=function(){aS.bind(K,aO);aS.bind(aE,ba);return aS};this.disable=function(){aL();return aS};this.destroy=function(){aL();aS.data(C,null);aS=null};this.option=function(bd,bc){if(aw[bd]!==undefined){if(bc===undefined){return aw[bd]}else{aw[bd]=bc}}else{f.error("Option "+bd+" does not exist on jQuery.swipetp.options")}return null};function aO(be){if(aC()){return}if(f(be.target).closest(aw.excludedElements,aS).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{be.preventDefault()}ah=0;aQ=null;aK=null;ac=0;a2=0;a0=0;H=1;ar=0;aR=ak();N=ab();S();if(!bg||(X===aw.fingers||aw.fingers===i)||aY()){aj(0,bc);U=au();if(X==2){aj(1,bg[1]);a2=a0=av(aR[0].start,aR[1].start)}if(aw.swipeStatus||aw.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(aw.hold){ag=setTimeout(f.proxy(function(){aS.trigger("hold",[bf.target]);if(aw.hold){bd=aw.hold.call(aS,bf,bf.target)}},this),aw.longTapThreshold)}ap(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||an()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aI(bd);a3=au();if(bj){X=bj.length}if(aw.hold){clearTimeout(ag)}aa=k;if(X==2){if(a2==0){aj(1,bj[1]);a2=a0=av(aR[0].start,aR[1].start)}else{aI(bj[1]);a0=av(aR[0].end,aR[1].end);aK=at(aR[0].end,aR[1].end)}H=a8(a2,a0);ar=Math.abs(a2-a0)}if((X===aw.fingers||aw.fingers===i)||!bj||aY()){aQ=aM(bg.start,bg.end);am(bf,aQ);ah=aT(bg.start,bg.end);ac=aN();aJ(aQ,ah);if(aw.swipeStatus||aw.pinchStatus){be=P(bi,aa)}if(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave){var bc=true;if(aw.triggerOnTouchLeave){var bh=aZ(this);bc=F(bg.end,bh)}if(!aw.triggerOnTouchEnd&&bc){aa=aD(k)}else{if(aw.triggerOnTouchLeave&&!bc){aa=aD(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length){G();return true}}if(an()){X=ae}a3=au();ac=aN();if(bb()||!ao()){aa=q;P(bd,aa)}else{if(aw.triggerOnTouchEnd||(aw.triggerOnTouchEnd==false&&aa===k)){bc.preventDefault();aa=h;P(bd,aa)}else{if(!aw.triggerOnTouchEnd&&a7()){aa=h;aG(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}ap(false);return null}function ba(){X=0;a3=0;U=0;a2=0;a0=0;H=1;S();ap(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(aw.triggerOnTouchLeave){aa=aD(h);P(bd,aa)}}function aL(){aS.unbind(K,aO);aS.unbind(aE,ba);aS.unbind(az,a4);aS.unbind(V,M);if(T){aS.unbind(T,L)}ap(false)}function aD(bg){var bf=bg;var be=aB();var bd=ao();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&aw.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if((J()||W())||(Q()||aY())){if(J()||W()){bd=aG(be,bc,l)}if((Q()||aY())&&bd!==false){bd=aG(be,bc,t)}}else{if(aH()&&bd!==false){bd=aG(be,bc,j)}else{if(aq()&&bd!==false){bd=aG(be,bc,b)}else{if(ai()&&bd!==false){bd=aG(be,bc,B)}}}}if(bc===q){ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aG(bf,bc,be){var bd;if(be==l){aS.trigger("swipeStatus",[bc,aQ||null,ah||0,ac||0,X,aR]);if(aw.swipeStatus){bd=aw.swipeStatus.call(aS,bf,bc,aQ||null,ah||0,ac||0,X,aR);if(bd===false){return false}}if(bc==h&&aW()){aS.trigger("swipe",[aQ,ah,ac,X,aR]);if(aw.swipe){bd=aw.swipe.call(aS,bf,aQ,ah,ac,X,aR);if(bd===false){return false}}switch(aQ){case p:aS.trigger("swipeLeft",[aQ,ah,ac,X,aR]);if(aw.swipeLeft){bd=aw.swipeLeft.call(aS,bf,aQ,ah,ac,X,aR)}break;case o:aS.trigger("swipeRight",[aQ,ah,ac,X,aR]);if(aw.swipeRight){bd=aw.swipeRight.call(aS,bf,aQ,ah,ac,X,aR)}break;case e:aS.trigger("swipeUp",[aQ,ah,ac,X,aR]);if(aw.swipeUp){bd=aw.swipeUp.call(aS,bf,aQ,ah,ac,X,aR)}break;case x:aS.trigger("swipeDown",[aQ,ah,ac,X,aR]);if(aw.swipeDown){bd=aw.swipeDown.call(aS,bf,aQ,ah,ac,X,aR)}break}}}if(be==t){aS.trigger("pinchStatus",[bc,aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchStatus){bd=aw.pinchStatus.call(aS,bf,bc,aK||null,ar||0,ac||0,X,H,aR);if(bd===false){return false}}if(bc==h&&a9()){switch(aK){case c:aS.trigger("pinchIn",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchIn){bd=aw.pinchIn.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break;case A:aS.trigger("pinchOut",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchOut){bd=aw.pinchOut.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aX);clearTimeout(ag);if(Z()&&!I()){O=au();aX=setTimeout(f.proxy(function(){O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}},this),aw.doubleTapThreshold)}else{O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("doubletap",[bf.target]);if(aw.doubleTap){bd=aw.doubleTap.call(aS,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("longtap",[bf.target]);if(aw.longTap){bd=aw.longTap.call(aS,bf,bf.target)}}}}}return bd}function ao(){var bc=true;if(aw.threshold!==null){bc=ah>=aw.threshold}return bc}function bb(){var bc=false;if(aw.cancelThreshold!==null&&aQ!==null){bc=(aU(aQ)-ah)>=aw.cancelThreshold}return bc}function af(){if(aw.pinchThreshold!==null){return ar>=aw.pinchThreshold}return true}function aB(){var bc;if(aw.maxTimeThreshold){if(ac>=aw.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function am(bc,bd){if(aw.preventDefaultEvents===false){return}if(aw.allowPageScroll===m){bc.preventDefault()}else{var be=aw.allowPageScroll===s;switch(bd){case p:if((aw.swipeLeft&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((aw.swipeRight&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((aw.swipeUp&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((aw.swipeDown&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aP();var bc=Y();var be=af();return bd&&bc&&be}function aY(){return !!(aw.pinchStatus||aw.pinchIn||aw.pinchOut)}function Q(){return !!(a9()&&aY())}function aW(){var bf=aB();var bh=ao();var be=aP();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return !!(aw.swipe||aw.swipeStatus||aw.swipeLeft||aw.swipeRight||aw.swipeUp||aw.swipeDown)}function J(){return !!(aW()&&W())}function aP(){return((X===aw.fingers||aw.fingers===i)||!a)}function Y(){return aR[0].end.x!==0}function a7(){return !!(aw.tap)}function Z(){return !!(aw.doubleTap)}function aV(){return !!(aw.longTap)}function R(){if(O==null){return false}var bc=au();return(Z()&&((bc-O)<=aw.doubleTapThreshold))}function I(){return R()}function ay(){return((X===1||!a)&&(isNaN(ah)||ah<aw.threshold))}function a1(){return((ac>aw.longTapThreshold)&&(ah<r))}function ai(){return !!(ay()&&a7())}function aH(){return !!(R()&&Z())}function aq(){return !!(a1()&&aV())}function G(){a6=au();ae=event.touches.length+1}function S(){a6=0;ae=0}function an(){var bc=false;if(a6){var bd=au()-a6;if(bd<=aw.fingerReleaseThreshold){bc=true}}return bc}function aC(){return !!(aS.data(C+"_intouch")===true)}function ap(bc){if(bc===true){aS.bind(az,a4);aS.bind(V,M);if(T){aS.bind(T,L)}}else{aS.unbind(az,a4,false);aS.unbind(V,M,false);if(T){aS.unbind(T,L,false)}}aS.data(C+"_intouch",bc===true)}function aj(bd,bc){var be=bc.identifier!==undefined?bc.identifier:0;aR[bd].identifier=be;aR[bd].start.x=aR[bd].end.x=bc.pageX||bc.clientX;aR[bd].start.y=aR[bd].end.y=bc.pageY||bc.clientY;return aR[bd]}function aI(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bd){for(var bc=0;bc<aR.length;bc++){if(aR[bc].identifier==bd){return aR[bc]}}}function ak(){var bc=[];for(var bd=0;bd<=5;bd++){bc.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bc}function aJ(bc,bd){bd=Math.max(bd,aU(bc));N[bc].distance=bd}function aU(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=ax(p);bc[o]=ax(o);bc[e]=ax(e);bc[x]=ax(x);return bc}function ax(bc){return{direction:bc,distance:0}}function aN(){return a3-U}function av(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function at(){if(H<1){return A}else{return c}}function aT(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aF(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aM(bd,bc){var be=aF(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function au(){var bc=new Date();return bc.getTime()}function aZ(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));

if(typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function() {};
}

if (window.tplogs==true)
	try {
		console.groupCollapsed("ThemePunch GreenSocks Logs");
	} catch(e) { }


var oldgs = window.GreenSockGlobals;
	oldgs_queue = window._gsQueue;
	
var punchgs = window.GreenSockGlobals = {};

if (window.tplogs==true)
	try {
		console.info("Build GreenSock SandBox for ThemePunch Plugins");
		console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
	} catch(e) {}


/* TWEEN LITE */
/*!
 * VERSION: 1.19.0
 * DATE: 2016-07-16
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
!function(a,b){"use strict";var c={},d=a.GreenSockGlobals=a.GreenSockGlobals||a;if(!d.TweenLite){var e,f,g,h,i,j=function(a){var b,c=a.split("."),e=d;for(b=0;b<c.length;b++)e[c[b]]=e=e[c[b]]||{};return e},k=j("com.greensock"),l=1e-10,m=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},n=function(){},o=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),p={},q=function(e,f,g,h){this.sc=p[e]?p[e].sc:[],p[e]=this,this.gsClass=null,this.func=g;var i=[];this.check=function(k){for(var l,m,n,o,r,s=f.length,t=s;--s>-1;)(l=p[f[s]]||new q(f[s],[])).gsClass?(i[s]=l.gsClass,t--):k&&l.sc.push(this);if(0===t&&g){if(m=("com.greensock."+e).split("."),n=m.pop(),o=j(m.join("."))[n]=this.gsClass=g.apply(g,i),h)if(d[n]=c[n]=o,r="undefined"!=typeof module&&module.exports,!r&&"function"==typeof define&&define.amd)define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+e.split(".").pop(),[],function(){return o});else if(r)if(e===b){module.exports=c[b]=o;for(s in c)o[s]=c[s]}else c[b]&&(c[b][n]=o);for(s=0;s<this.sc.length;s++)this.sc[s].check()}},this.check(!0)},r=a._gsDefine=function(a,b,c,d){return new q(a,b,c,d)},s=k._class=function(a,b,c){return b=b||function(){},r(a,[],function(){return b},c),b};r.globals=d;var t=[0,0,1,1],u=s("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?t.concat(b):t},!0),v=u.map={},w=u.register=function(a,b,c,d){for(var e,f,g,h,i=b.split(","),j=i.length,l=(c||"easeIn,easeOut,easeInOut").split(",");--j>-1;)for(f=i[j],e=d?s("easing."+f,null,!0):k.easing[f]||{},g=l.length;--g>-1;)h=l[g],v[f+"."+h]=v[h+f]=e[h]=a.getRatio?a:a[h]||new a};for(g=u.prototype,g._calcEnd=!1,g.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},e=["Linear","Quad","Cubic","Quart","Quint,Strong"],f=e.length;--f>-1;)g=e[f]+",Power"+f,w(new u(null,null,1,f),g,"easeOut",!0),w(new u(null,null,2,f),g,"easeIn"+(0===f?",easeNone":"")),w(new u(null,null,3,f),g,"easeInOut");v.linear=k.easing.Linear.easeIn,v.swing=k.easing.Quad.easeInOut;var x=s("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});g=x.prototype,g.addEventListener=function(a,b,c,d,e){e=e||0;var f,g,j=this._listeners[a],k=0;for(this!==h||i||h.wake(),null==j&&(this._listeners[a]=j=[]),g=j.length;--g>-1;)f=j[g],f.c===b&&f.s===c?j.splice(g,1):0===k&&f.pr<e&&(k=g+1);j.splice(k,0,{c:b,s:c,up:d,pr:e})},g.removeEventListener=function(a,b){var c,d=this._listeners[a];if(d)for(c=d.length;--c>-1;)if(d[c].c===b)return void d.splice(c,1)},g.dispatchEvent=function(a){var b,c,d,e=this._listeners[a];if(e)for(b=e.length,b>1&&(e=e.slice(0)),c=this._eventTarget;--b>-1;)d=e[b],d&&(d.up?d.c.call(d.s||c,{type:a,target:c}):d.c.call(d.s||c))};var y=a.requestAnimationFrame,z=a.cancelAnimationFrame,A=Date.now||function(){return(new Date).getTime()},B=A();for(e=["ms","moz","webkit","o"],f=e.length;--f>-1&&!y;)y=a[e[f]+"RequestAnimationFrame"],z=a[e[f]+"CancelAnimationFrame"]||a[e[f]+"CancelRequestAnimationFrame"];s("Ticker",function(a,b){var c,d,e,f,g,j=this,k=A(),m=b!==!1&&y?"auto":!1,o=500,p=33,q="tick",r=function(a){var b,h,i=A()-B;i>o&&(k+=i-p),B+=i,j.time=(B-k)/1e3,b=j.time-g,(!c||b>0||a===!0)&&(j.frame++,g+=b+(b>=f?.004:f-b),h=!0),a!==!0&&(e=d(r)),h&&j.dispatchEvent(q)};x.call(j),j.time=j.frame=0,j.tick=function(){r(!0)},j.lagSmoothing=function(a,b){o=a||1/l,p=Math.min(b,o,0)},j.sleep=function(){null!=e&&(m&&z?z(e):clearTimeout(e),d=n,e=null,j===h&&(i=!1))},j.wake=function(a){null!==e?j.sleep():a?k+=-B+(B=A()):j.frame>10&&(B=A()-o+5),d=0===c?n:m&&y?y:function(a){return setTimeout(a,1e3*(g-j.time)+1|0)},j===h&&(i=!0),r(2)},j.fps=function(a){return arguments.length?(c=a,f=1/(c||60),g=this.time+f,void j.wake()):c},j.useRAF=function(a){return arguments.length?(j.sleep(),m=a,void j.fps(c)):m},j.fps(a),setTimeout(function(){"auto"===m&&j.frame<5&&"hidden"!==document.visibilityState&&j.useRAF(!1)},1500)}),g=k.Ticker.prototype=new k.events.EventDispatcher,g.constructor=k.Ticker;var C=s("core.Animation",function(a,b){if(this.vars=b=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(b.delay)||0,this._timeScale=1,this._active=b.immediateRender===!0,this.data=b.data,this._reversed=b.reversed===!0,V){i||h.wake();var c=this.vars.useFrames?U:V;c.add(this,c._time),this.vars.paused&&this.paused(!0)}});h=C.ticker=new k.Ticker,g=C.prototype,g._dirty=g._gc=g._initted=g._paused=!1,g._totalTime=g._time=0,g._rawPrevTime=-1,g._next=g._last=g._onUpdate=g._timeline=g.timeline=null,g._paused=!1;var D=function(){i&&A()-B>2e3&&h.wake(),setTimeout(D,2e3)};D(),g.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},g.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},g.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},g.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},g.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},g.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},g.render=function(a,b,c){},g.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},g.isActive=function(){var a,b=this._timeline,c=this._startTime;return!b||!this._gc&&!this._paused&&b.isActive()&&(a=b.rawTime())>=c&&a<c+this.totalDuration()/this._timeScale},g._enabled=function(a,b){return i||h.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},g._kill=function(a,b){return this._enabled(!1,!1)},g.kill=function(a,b){return this._kill(a,b),this},g._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},g._swapSelfInParams=function(a){for(var b=a.length,c=a.concat();--b>-1;)"{self}"===a[b]&&(c[b]=this);return c},g._callback=function(a){var b=this.vars,c=b[a],d=b[a+"Params"],e=b[a+"Scope"]||b.callbackScope||this,f=d?d.length:0;switch(f){case 0:c.call(e);break;case 1:c.call(e,d[0]);break;case 2:c.call(e,d[0],d[1]);break;default:c.apply(e,d)}},g.eventCallback=function(a,b,c,d){if("on"===(a||"").substr(0,2)){var e=this.vars;if(1===arguments.length)return e[a];null==b?delete e[a]:(e[a]=b,e[a+"Params"]=o(c)&&-1!==c.join("").indexOf("{self}")?this._swapSelfInParams(c):c,e[a+"Scope"]=d),"onUpdate"===a&&(this._onUpdate=b)}return this},g.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},g.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},g.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},g.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},g.totalTime=function(a,b,c){if(i||h.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&!c&&(a+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var d=this._totalDuration,e=this._timeline;if(a>d&&!c&&(a=d),this._startTime=(this._paused?this._pauseTime:e._time)-(this._reversed?d-a:a)/this._timeScale,e._dirty||this._uncache(!1),e._timeline)for(;e._timeline;)e._timeline._time!==(e._startTime+e._totalTime)/e._timeScale&&e.totalTime(e._totalTime,!0),e=e._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==a||0===this._duration)&&(I.length&&X(),this.render(a,b,!1),I.length&&X())}return this},g.progress=g.totalProgress=function(a,b){var c=this.duration();return arguments.length?this.totalTime(c*a,b):c?this._time/c:this.ratio},g.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},g.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},g.timeScale=function(a){if(!arguments.length)return this._timeScale;if(a=a||l,this._timeline&&this._timeline.smoothChildTiming){var b=this._pauseTime,c=b||0===b?b:this._timeline.totalTime();this._startTime=c-(c-this._startTime)*this._timeScale/a}return this._timeScale=a,this._uncache(!1)},g.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},g.paused=function(a){if(!arguments.length)return this._paused;var b,c,d=this._timeline;return a!=this._paused&&d&&(i||a||h.wake(),b=d.rawTime(),c=b-this._pauseTime,!a&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=a?b:null,this._paused=a,this._active=this.isActive(),!a&&0!==c&&this._initted&&this.duration()&&(b=d.smoothChildTiming?this._totalTime:(b-this._startTime)/this._timeScale,this.render(b,b===this._totalTime,!0))),this._gc&&!a&&this._enabled(!0,!1),this};var E=s("core.SimpleTimeline",function(a){C.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});g=E.prototype=new C,g.constructor=E,g.kill()._gc=!1,g._first=g._last=g._recent=null,g._sortChildren=!1,g.add=g.insert=function(a,b,c,d){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._recent=a,this._timeline&&this._uncache(!0),this},g._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},g.render=function(a,b,c){var d,e=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;e;)d=e._next,(e._active||a>=e._startTime&&!e._paused)&&(e._reversed?e.render((e._dirty?e.totalDuration():e._totalDuration)-(a-e._startTime)*e._timeScale,b,c):e.render((a-e._startTime)*e._timeScale,b,c)),e=d},g.rawTime=function(){return i||h.wake(),this._totalTime};var F=s("TweenLite",function(b,c,d){if(C.call(this,c,d),this.render=F.prototype.render,null==b)throw"Cannot tween a null target.";this.target=b="string"!=typeof b?b:F.selector(b)||b;var e,f,g,h=b.jquery||b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType),i=this.vars.overwrite;if(this._overwrite=i=null==i?T[F.defaultOverwrite]:"number"==typeof i?i>>0:T[i],(h||b instanceof Array||b.push&&o(b))&&"number"!=typeof b[0])for(this._targets=g=m(b),this._propLookup=[],this._siblings=[],e=0;e<g.length;e++)f=g[e],f?"string"!=typeof f?f.length&&f!==a&&f[0]&&(f[0]===a||f[0].nodeType&&f[0].style&&!f.nodeType)?(g.splice(e--,1),this._targets=g=g.concat(m(f))):(this._siblings[e]=Y(f,this,!1),1===i&&this._siblings[e].length>1&&$(f,this,null,1,this._siblings[e])):(f=g[e--]=F.selector(f),"string"==typeof f&&g.splice(e+1,1)):g.splice(e--,1);else this._propLookup={},this._siblings=Y(b,this,!1),1===i&&this._siblings.length>1&&$(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-l,this.render(Math.min(0,-this._delay)))},!0),G=function(b){return b&&b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType)},H=function(a,b){var c,d={};for(c in a)S[c]||c in b&&"transform"!==c&&"x"!==c&&"y"!==c&&"width"!==c&&"height"!==c&&"className"!==c&&"border"!==c||!(!P[c]||P[c]&&P[c]._autoCSS)||(d[c]=a[c],delete a[c]);a.css=d};g=F.prototype=new C,g.constructor=F,g.kill()._gc=!1,g.ratio=0,g._firstPT=g._targets=g._overwrittenProps=g._startAt=null,g._notifyPluginsOfEnabled=g._lazy=!1,F.version="1.19.0",F.defaultEase=g._ease=new u(null,null,1,1),F.defaultOverwrite="auto",F.ticker=h,F.autoSleep=120,F.lagSmoothing=function(a,b){h.lagSmoothing(a,b)},F.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(F.selector=c,c(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)};var I=[],J={},K=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,L=function(a){for(var b,c=this._firstPT,d=1e-6;c;)b=c.blob?a?this.join(""):this.start:c.c*a+c.s,c.m?b=c.m(b,this._target||c.t):d>b&&b>-d&&(b=0),c.f?c.fp?c.t[c.p](c.fp,b):c.t[c.p](b):c.t[c.p]=b,c=c._next},M=function(a,b,c,d){var e,f,g,h,i,j,k,l=[a,b],m=0,n="",o=0;for(l.start=a,c&&(c(l),a=l[0],b=l[1]),l.length=0,e=a.match(K)||[],f=b.match(K)||[],d&&(d._next=null,d.blob=1,l._firstPT=l._applyPT=d),i=f.length,h=0;i>h;h++)k=f[h],j=b.substr(m,b.indexOf(k,m)-m),n+=j||!h?j:",",m+=j.length,o?o=(o+1)%5:"rgba("===j.substr(-5)&&(o=1),k===e[h]||e.length<=h?n+=k:(n&&(l.push(n),n=""),g=parseFloat(e[h]),l.push(g),l._firstPT={_next:l._firstPT,t:l,p:l.length-1,s:g,c:("="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*parseFloat(k.substr(2)):parseFloat(k)-g)||0,f:0,m:o&&4>o?Math.round:0}),m+=k.length;return n+=b.substr(m),n&&l.push(n),l.setRatio=L,l},N=function(a,b,c,d,e,f,g,h,i){"function"==typeof d&&(d=d(i||0,a));var j,k,l="get"===c?a[b]:c,m=typeof a[b],n="string"==typeof d&&"="===d.charAt(1),o={t:a,p:b,s:l,f:"function"===m,pg:0,n:e||b,m:f?"function"==typeof f?f:Math.round:0,pr:0,c:n?parseInt(d.charAt(0)+"1",10)*parseFloat(d.substr(2)):parseFloat(d)-l||0};return"number"!==m&&("function"===m&&"get"===c&&(k=b.indexOf("set")||"function"!=typeof a["get"+b.substr(3)]?b:"get"+b.substr(3),o.s=l=g?a[k](g):a[k]()),"string"==typeof l&&(g||isNaN(l))?(o.fp=g,j=M(l,d,h||F.defaultStringFilter,o),o={t:j,p:"setRatio",s:0,c:1,f:2,pg:0,n:e||b,pr:0,m:0}):n||(o.s=parseFloat(l),o.c=parseFloat(d)-o.s||0)),o.c?((o._next=this._firstPT)&&(o._next._prev=o),this._firstPT=o,o):void 0},O=F._internals={isArray:o,isSelector:G,lazyTweens:I,blobDif:M},P=F._plugins={},Q=O.tweenLookup={},R=0,S=O.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1},T={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},U=C._rootFramesTimeline=new E,V=C._rootTimeline=new E,W=30,X=O.lazyRender=function(){var a,b=I.length;for(J={};--b>-1;)a=I[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1);I.length=0};V._startTime=h.time,U._startTime=h.frame,V._active=U._active=!0,setTimeout(X,1),C._updateRoot=F.render=function(){var a,b,c;if(I.length&&X(),V.render((h.time-V._startTime)*V._timeScale,!1,!1),U.render((h.frame-U._startTime)*U._timeScale,!1,!1),I.length&&X(),h.frame>=W){W=h.frame+(parseInt(F.autoSleep,10)||120);for(c in Q){for(b=Q[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete Q[c]}if(c=V._first,(!c||c._paused)&&F.autoSleep&&!U._first&&1===h._listeners.tick.length){for(;c&&c._paused;)c=c._next;c||h.sleep()}}},h.addEventListener("tick",C._updateRoot);var Y=function(a,b,c){var d,e,f=a._gsTweenID;if(Q[f||(a._gsTweenID=f="t"+R++)]||(Q[f]={target:a,tweens:[]}),b&&(d=Q[f].tweens,d[e=d.length]=b,c))for(;--e>-1;)d[e]===b&&d.splice(e,1);return Q[f].tweens},Z=function(a,b,c,d){var e,f,g=a.vars.onOverwrite;return g&&(e=g(a,b,c,d)),g=F.onOverwrite,g&&(f=g(a,b,c,d)),e!==!1&&f!==!1},$=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._kill(null,a,b)&&(g=!0);else if(5===d)break;return g}var j,k=b._startTime+l,m=[],n=0,o=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(j=j||_(b,0,o),0===_(h,j,o)&&(m[n++]=h)):h._startTime<=k&&h._startTime+h.totalDuration()/h._timeScale>k&&((o||!h._initted)&&k-h._startTime<=2e-10||(m[n++]=h)));for(f=n;--f>-1;)if(h=m[f],2===d&&h._kill(c,a,b)&&(g=!0),2!==d||!h._firstPT&&h._initted){if(2!==d&&!Z(h,b))continue;h._enabled(!1,!1)&&(g=!0)}return g},_=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2*l>f-b?l:(f+=a.totalDuration()/a._timeScale/e)>b+l?0:f-b-l};g._init=function(){var a,b,c,d,e,f,g=this.vars,h=this._overwrittenProps,i=this._duration,j=!!g.immediateRender,k=g.ease;if(g.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),e={};for(d in g.startAt)e[d]=g.startAt[d];if(e.overwrite=!1,e.immediateRender=!0,e.lazy=j&&g.lazy!==!1,e.startAt=e.delay=null,this._startAt=F.to(this.target,0,e),j)if(this._time>0)this._startAt=null;else if(0!==i)return}else if(g.runBackwards&&0!==i)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(j=!1),c={};for(d in g)S[d]&&"autoCSS"!==d||(c[d]=g[d]);if(c.overwrite=0,c.data="isFromStart",c.lazy=j&&g.lazy!==!1,c.immediateRender=j,this._startAt=F.to(this.target,0,c),j){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=k=k?k instanceof u?k:"function"==typeof k?new u(k,g.easeParams):v[k]||F.defaultEase:F.defaultEase,g.easeParams instanceof Array&&k.config&&(this._ease=k.config.apply(k,g.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(f=this._targets.length,a=0;f>a;a++)this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],h?h[a]:null,a)&&(b=!0);else b=this._initProps(this.target,this._propLookup,this._siblings,h,0);if(b&&F._onPluginEvent("_onInitAllProps",this),h&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),g.runBackwards)for(c=this._firstPT;c;)c.s+=c.c,c.c=-c.c,c=c._next;this._onUpdate=g.onUpdate,this._initted=!0},g._initProps=function(b,c,d,e,f){var g,h,i,j,k,l;if(null==b)return!1;J[b._gsTweenID]&&X(),this.vars.css||b.style&&b!==a&&b.nodeType&&P.css&&this.vars.autoCSS!==!1&&H(this.vars,b);for(g in this.vars)if(l=this.vars[g],S[g])l&&(l instanceof Array||l.push&&o(l))&&-1!==l.join("").indexOf("{self}")&&(this.vars[g]=l=this._swapSelfInParams(l,this));else if(P[g]&&(j=new P[g])._onInitTween(b,this.vars[g],this,f)){for(this._firstPT=k={_next:this._firstPT,t:j,p:"setRatio",s:0,c:1,f:1,n:g,pg:1,pr:j._priority,m:0},h=j._overwriteProps.length;--h>-1;)c[j._overwriteProps[h]]=this._firstPT;(j._priority||j._onInitAllProps)&&(i=!0),(j._onDisable||j._onEnable)&&(this._notifyPluginsOfEnabled=!0),k._next&&(k._next._prev=k)}else c[g]=N.call(this,b,g,"get",l,g,0,null,this.vars.stringFilter,f);return e&&this._kill(e,b)?this._initProps(b,c,d,e,f):this._overwrite>1&&this._firstPT&&d.length>1&&$(b,this,c,this._overwrite,d)?(this._kill(c,b),this._initProps(b,c,d,e,f)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(J[b._gsTweenID]=!0),i)},g.render=function(a,b,c){var d,e,f,g,h=this._time,i=this._duration,j=this._rawPrevTime;if(a>=i-1e-7)this._totalTime=this._time=i,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===i&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>j||0>=a&&a>=-1e-7||j===l&&"isPause"!==this.data)&&j!==a&&(c=!0,j>l&&(e="onReverseComplete")),this._rawPrevTime=g=!b||a||j===a?a:l);else if(1e-7>a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==h||0===i&&j>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===i&&(this._initted||!this.vars.lazy||c)&&(j>=0&&(j!==l||"isPause"!==this.data)&&(c=!0),this._rawPrevTime=g=!b||a||j===a?a:l)),this._initted||(c=!0);else if(this._totalTime=this._time=a,this._easeType){var k=a/i,m=this._easeType,n=this._easePower;(1===m||3===m&&k>=.5)&&(k=1-k),3===m&&(k*=2),1===n?k*=k:2===n?k*=k*k:3===n?k*=k*k*k:4===n&&(k*=k*k*k*k),1===m?this.ratio=1-k:2===m?this.ratio=k:.5>a/i?this.ratio=k/2:this.ratio=1-k/2}else this.ratio=this._ease.getRatio(a/i);if(this._time!==h||c){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=h,this._rawPrevTime=j,I.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/i):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==h&&a>=0&&(this._active=!0),0===h&&(this._startAt&&(a>=0?this._startAt.render(a,b,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._time||0===i)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&a!==-1e-4&&this._startAt.render(a,b,c),b||(this._time!==h||d||c)&&this._callback("onUpdate")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&a!==-1e-4&&this._startAt.render(a,b,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===i&&this._rawPrevTime===l&&g!==l&&(this._rawPrevTime=0))}},g._kill=function(a,b,c){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._lazy=!1,this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:F.selector(b)||b;var d,e,f,g,h,i,j,k,l,m=c&&this._time&&c._startTime===this._startTime&&this._timeline===c._timeline;if((o(b)||G(b))&&"number"!=typeof b[0])for(d=b.length;--d>-1;)this._kill(a,b[d],c)&&(i=!0);else{if(this._targets){for(d=this._targets.length;--d>-1;)if(b===this._targets[d]){h=this._propLookup[d]||{},this._overwrittenProps=this._overwrittenProps||[],e=this._overwrittenProps[d]=a?this._overwrittenProps[d]||{}:"all";break}}else{if(b!==this.target)return!1;h=this._propLookup,e=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(h){if(j=a||h,k=a!==e&&"all"!==e&&a!==h&&("object"!=typeof a||!a._tempKill),c&&(F.onOverwrite||this.vars.onOverwrite)){for(f in j)h[f]&&(l||(l=[]),l.push(f));if((l||!a)&&!Z(this,c,b,l))return!1}for(f in j)(g=h[f])&&(m&&(g.f?g.t[g.p](g.s):g.t[g.p]=g.s,i=!0),g.pg&&g.t._kill(j)&&(i=!0),g.pg&&0!==g.t._overwriteProps.length||(g._prev?g._prev._next=g._next:g===this._firstPT&&(this._firstPT=g._next),g._next&&(g._next._prev=g._prev),g._next=g._prev=null),delete h[f]),k&&(e[f]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return i},g.invalidate=function(){return this._notifyPluginsOfEnabled&&F._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],C.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-l,this.render(Math.min(0,-this._delay))),this},g._enabled=function(a,b){if(i||h.wake(),a&&this._gc){var c,d=this._targets;if(d)for(c=d.length;--c>-1;)this._siblings[c]=Y(d[c],this,!0);else this._siblings=Y(this.target,this,!0)}return C.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?F._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},F.to=function(a,b,c){return new F(a,b,c)},F.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new F(a,b,c)},F.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new F(a,b,d)},F.delayedCall=function(a,b,c,d,e){return new F(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,lazy:!1,useFrames:e,overwrite:0})},F.set=function(a,b){return new F(a,0,b)},F.getTweensOf=function(a,b){if(null==a)return[];a="string"!=typeof a?a:F.selector(a)||a;var c,d,e,f;if((o(a)||G(a))&&"number"!=typeof a[0]){for(c=a.length,d=[];--c>-1;)d=d.concat(F.getTweensOf(a[c],b));for(c=d.length;--c>-1;)for(f=d[c],e=c;--e>-1;)f===d[e]&&d.splice(c,1)}else for(d=Y(a).concat(),c=d.length;--c>-1;)(d[c]._gc||b&&!d[c].isActive())&&d.splice(c,1);return d},F.killTweensOf=F.killDelayedCallsTo=function(a,b,c){"object"==typeof b&&(c=b,b=!1);for(var d=F.getTweensOf(a,b),e=d.length;--e>-1;)d[e]._kill(c,a)};var aa=s("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=aa.prototype},!0);if(g=aa.prototype,aa.version="1.19.0",aa.API=2,g._firstPT=null,g._addTween=N,g.setRatio=L,g._kill=function(a){var b,c=this._overwriteProps,d=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(b=c.length;--b>-1;)null!=a[c[b]]&&c.splice(b,1);for(;d;)null!=a[d.n]&&(d._next&&(d._next._prev=d._prev),d._prev?(d._prev._next=d._next,d._prev=null):this._firstPT===d&&(this._firstPT=d._next)),d=d._next;return!1},g._mod=g._roundProps=function(a){for(var b,c=this._firstPT;c;)b=a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")],b&&"function"==typeof b&&(2===c.f?c.t._applyPT.m=b:c.m=b),c=c._next},F._onPluginEvent=function(a,b){var c,d,e,f,g,h=b._firstPT;if("_onInitAllProps"===a){for(;h;){for(g=h._next,d=e;d&&d.pr>h.pr;)d=d._next;(h._prev=d?d._prev:f)?h._prev._next=h:e=h,(h._next=d)?d._prev=h:f=h,h=g}h=b._firstPT=e}for(;h;)h.pg&&"function"==typeof h.t[a]&&h.t[a]()&&(c=!0),h=h._next;return c},aa.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===aa.API&&(P[(new a[b])._propName]=a[b]);return!0},r.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var b,c=a.propName,d=a.priority||0,e=a.overwriteProps,f={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},g=s("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){aa.call(this,c,d),this._overwriteProps=e||[]},a.global===!0),h=g.prototype=new aa(c);h.constructor=g,g.API=a.API;for(b in f)"function"==typeof a[b]&&(h[f[b]]=a[b]);return g.version=a.version,aa.activate([g]),g},e=a._gsQueue){for(f=0;f<e.length;f++)e[f]();for(g in p)p[g].func||a.console.log("GSAP encountered missing dependency: "+g)}i=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");

/* TIME LINE LITE */
/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],h(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));h(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,h=n.isArray,l=n.lazyTweens,_=n.lazyRender,u=[],f=_gsScope._gsDefine.globals,c=function(t){var e,i={};for(e in t)i[e]=t[e];return i},p=a.pauseCallback=function(t,e,i,s){var n,a=t._timeline,o=a._totalTime,h=t._startTime,l=0>t._rawPrevTime||0===t._rawPrevTime&&a._reversed,_=l?0:r,f=l?r:0;if(e||!this._forcingPlayhead){for(a.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=f,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=_,n=n._next;e&&e.apply(s||a.vars.callbackScope||a,i||u),(this._forcingPlayhead||!a._paused)&&a.seek(o)}},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.17.0",d.constructor=s,d.kill()._gc=d._forcingPlayhead=!1,d.to=function(t,e,s,r){var n=s.repeat&&f.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&f.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&f.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,h,l,_){var u,f=new s({onComplete:h,onCompleteParams:l,callbackScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),u=0;t.length>u;u++)r.startAt&&(r.startAt=c(r.startAt)),f.to(t[u],e,c(r),u*n);return this.add(f,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var l,_,u,f,c,p;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&h(r)){for(a=a||"normal",o=o||0,l=n,_=r.length,u=0;_>u;u++)h(f=r[u])&&(f=new s({tweens:f})),this.add(f,l),"string"!=typeof f&&"function"!=typeof f&&("sequence"===a?l=f._startTime+f.totalDuration()/f._timeScale:"start"===a&&(f._startTime-=f.delay())),l+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(c=this,p=c.rawTime()>r._startTime;c._timeline;)p&&c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._gc&&c._enabled(!0,!1),c=c._timeline;return this},d.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,p,["{self}",e,s,r],this);return n.data="isPause",this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&h(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,h,u=this._dirty?this.totalDuration():this._totalDuration,f=this._time,c=this._startTime,p=this._timeScale,m=this._paused;if(t>=u)this._totalTime=this._time=u,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",h=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=u+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==f&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this._callback("onStart")),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||m);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||m);)(s._active||f>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(l.length&&_(),this._callback("onUpdate"))),o&&(this._gc||(c===this._startTime||p!==this._timeScale)&&(0===this._time||u>=this.totalDuration())&&(n&&(l.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this._callback(o)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}("TimelineLite");


/* EASING PLUGIN*/
/*!
 * VERSION: 1.15.5
 * DATE: 2016-07-08
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.Back",["easing.Ease"],function(a){var b,c,d,e=_gsScope.GreenSockGlobals||_gsScope,f=e.com.greensock,g=2*Math.PI,h=Math.PI/2,i=f._class,j=function(b,c){var d=i("easing."+b,function(){},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,d},k=a.register||function(){},l=function(a,b,c,d,e){var f=i("easing."+a,{easeOut:new b,easeIn:new c,easeInOut:new d},!0);return k(f,a),f},m=function(a,b,c){this.t=a,this.v=b,c&&(this.next=c,c.prev=this,this.c=c.v-b,this.gap=c.t-a)},n=function(b,c){var d=i("easing."+b,function(a){this._p1=a||0===a?a:1.70158,this._p2=1.525*this._p1},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,e.config=function(a){return new d(a)},d},o=l("Back",n("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),n("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),n("BackInOut",function(a){return(a*=2)<1?.5*a*a*((this._p2+1)*a-this._p2):.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),p=i("easing.SlowMo",function(a,b,c){b=b||0===b?b:.7,null==a?a=.7:a>1&&(a=1),this._p=1!==a?b:0,this._p1=(1-a)/2,this._p2=a,this._p3=this._p1+this._p2,this._calcEnd=c===!0},!0),q=p.prototype=new a;return q.constructor=p,q.getRatio=function(a){var b=a+(.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b},p.ease=new p(.7,.7),q.config=p.config=function(a,b,c){return new p(a,b,c)},b=i("easing.SteppedEase",function(a){a=a||1,this._p1=1/a,this._p2=a+1},!0),q=b.prototype=new a,q.constructor=b,q.getRatio=function(a){return 0>a?a=0:a>=1&&(a=.999999999),(this._p2*a>>0)*this._p1},q.config=b.config=function(a){return new b(a)},c=i("easing.RoughEase",function(b){b=b||{};for(var c,d,e,f,g,h,i=b.taper||"none",j=[],k=0,l=0|(b.points||20),n=l,o=b.randomize!==!1,p=b.clamp===!0,q=b.template instanceof a?b.template:null,r="number"==typeof b.strength?.4*b.strength:.4;--n>-1;)c=o?Math.random():1/l*n,d=q?q.getRatio(c):c,"none"===i?e=r:"out"===i?(f=1-c,e=f*f*r):"in"===i?e=c*c*r:.5>c?(f=2*c,e=f*f*.5*r):(f=2*(1-c),e=f*f*.5*r),o?d+=Math.random()*e-.5*e:n%2?d+=.5*e:d-=.5*e,p&&(d>1?d=1:0>d&&(d=0)),j[k++]={x:c,y:d};for(j.sort(function(a,b){return a.x-b.x}),h=new m(1,1,null),n=l;--n>-1;)g=j[n],h=new m(g.x,g.y,h);this._prev=new m(0,0,0!==h.t?h:h.next)},!0),q=c.prototype=new a,q.constructor=c,q.getRatio=function(a){var b=this._prev;if(a>b.t){for(;b.next&&a>=b.t;)b=b.next;b=b.prev}else for(;b.prev&&a<=b.t;)b=b.prev;return this._prev=b,b.v+(a-b.t)/b.gap*b.c},q.config=function(a){return new c(a)},c.ease=new c,l("Bounce",j("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}),j("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+.9375):1-(7.5625*(a-=2.625/2.75)*a+.984375)}),j("BounceInOut",function(a){var b=.5>a;return a=b?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375,b?.5*(1-a):.5*a+.5})),l("Circ",j("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),j("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),j("CircInOut",function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)})),d=function(b,c,d){var e=i("easing."+b,function(a,b){this._p1=a>=1?a:1,this._p2=(b||d)/(1>a?a:1),this._p3=this._p2/g*(Math.asin(1/this._p1)||0),this._p2=g/this._p2},!0),f=e.prototype=new a;return f.constructor=e,f.getRatio=c,f.config=function(a,b){return new e(a,b)},e},l("Elastic",d("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*this._p2)+1},.3),d("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2))},.3),d("ElasticInOut",function(a){return(a*=2)<1?-.5*(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*this._p2)*.5+1},.45)),l("Expo",j("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),j("ExpoIn",function(a){return Math.pow(2,10*(a-1))-.001}),j("ExpoInOut",function(a){return(a*=2)<1?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*(a-1)))})),l("Sine",j("SineOut",function(a){return Math.sin(a*h)}),j("SineIn",function(a){return-Math.cos(a*h)+1}),j("SineInOut",function(a){return-.5*(Math.cos(Math.PI*a)-1)})),i("easing.EaseLookup",{find:function(b){return a.map[b]}},!0),k(e.SlowMo,"SlowMo","ease,"),k(c,"RoughEase","ease,"),k(b,"SteppedEase","ease,"),o},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(){"use strict";var a=function(){return _gsScope.GreenSockGlobals||_gsScope};"function"==typeof define&&define.amd?define(["TweenLite"],a):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=a())}();


/* CSS PLUGIN */
/*!
 * VERSION: 1.19.0
 * DATE: 2016-07-14
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a,b){var c,d,e,f,g=function(){a.call(this,"css"),this._overwriteProps.length=0,this.setRatio=g.prototype.setRatio},h=_gsScope._gsDefine.globals,i={},j=g.prototype=new a("css");j.constructor=g,g.version="1.19.0",g.API=2,g.defaultTransformPerspective=0,g.defaultSkewType="compensated",g.defaultSmoothOrigin=!0,j="px",g.suffixMap={top:j,right:j,bottom:j,left:j,width:j,height:j,fontSize:j,padding:j,margin:j,perspective:j,lineHeight:""};var k,l,m,n,o,p,q,r,s=/(?:\-|\.|\b)(\d|\.|e\-)+/g,t=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,u=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,w=/(?:\d|\-|\+|=|#|\.)*/g,x=/opacity *= *([^)]*)/i,y=/opacity:([^;]*)/i,z=/alpha\(opacity *=.+?\)/i,A=/^(rgb|hsl)/,B=/([A-Z])/g,C=/-([a-z])/gi,D=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,E=function(a,b){return b.toUpperCase()},F=/(?:Left|Right|Width)/i,G=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,H=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,I=/,(?=[^\)]*(?:\(|$))/gi,J=/[\s,\(]/i,K=Math.PI/180,L=180/Math.PI,M={},N=document,O=function(a){return N.createElementNS?N.createElementNS("http://www.w3.org/1999/xhtml",a):N.createElement(a)},P=O("div"),Q=O("img"),R=g._internals={_specialProps:i},S=navigator.userAgent,T=function(){var a=S.indexOf("Android"),b=O("a");return m=-1!==S.indexOf("Safari")&&-1===S.indexOf("Chrome")&&(-1===a||Number(S.substr(a+8,1))>3),o=m&&Number(S.substr(S.indexOf("Version/")+8,1))<6,n=-1!==S.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(S)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(S))&&(p=parseFloat(RegExp.$1)),b?(b.style.cssText="top:1px;opacity:.55;",/^0.55/.test(b.style.opacity)):!1}(),U=function(a){return x.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},V=function(a){window.console&&console.log(a)},W="",X="",Y=function(a,b){b=b||P;var c,d,e=b.style;if(void 0!==e[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),c=["O","Moz","ms","Ms","Webkit"],d=5;--d>-1&&void 0===e[c[d]+a];);return d>=0?(X=3===d?"ms":c[d],W="-"+X.toLowerCase()+"-",X+a):null},Z=N.defaultView?N.defaultView.getComputedStyle:function(){},$=g.getStyle=function(a,b,c,d,e){var f;return T||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||Z(a))?f=c[b]||c.getPropertyValue(b)||c.getPropertyValue(b.replace(B,"-$1").toLowerCase()):a.currentStyle&&(f=a.currentStyle[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):U(a)},_=R.convertToPixels=function(a,c,d,e,f){if("px"===e||!e)return d;if("auto"===e||!d)return 0;var h,i,j,k=F.test(c),l=a,m=P.style,n=0>d,o=1===d;if(n&&(d=-d),o&&(d*=100),"%"===e&&-1!==c.indexOf("border"))h=d/100*(k?a.clientWidth:a.clientHeight);else{if(m.cssText="border:0 solid red;position:"+$(a,"position")+";line-height:0;","%"!==e&&l.appendChild&&"v"!==e.charAt(0)&&"rem"!==e)m[k?"borderLeftWidth":"borderTopWidth"]=d+e;else{if(l=a.parentNode||N.body,i=l._gsCache,j=b.ticker.frame,i&&k&&i.time===j)return i.width*d/100;m[k?"width":"height"]=d+e}l.appendChild(P),h=parseFloat(P[k?"offsetWidth":"offsetHeight"]),l.removeChild(P),k&&"%"===e&&g.cacheWidths!==!1&&(i=l._gsCache=l._gsCache||{},i.time=j,i.width=h/d*100),0!==h||f||(h=_(a,c,d,e,!0))}return o&&(h/=100),n?-h:h},aa=R.calculateOffset=function(a,b,c){if("absolute"!==$(a,"position",c))return 0;var d="left"===b?"Left":"Top",e=$(a,"margin"+d,c);return a["offset"+d]-(_(a,b,parseFloat(e),e.replace(w,""))||0)},ba=function(a,b){var c,d,e,f={};if(b=b||Z(a,null))if(c=b.length)for(;--c>-1;)e=b[c],(-1===e.indexOf("-transform")||Ca===e)&&(f[e.replace(C,E)]=b.getPropertyValue(e));else for(c in b)(-1===c.indexOf("Transform")||Ba===c)&&(f[c]=b[c]);else if(b=a.currentStyle||a.style)for(c in b)"string"==typeof c&&void 0===f[c]&&(f[c.replace(C,E)]=b[c]);return T||(f.opacity=U(a)),d=Pa(a,b,!1),f.rotation=d.rotation,f.skewX=d.skewX,f.scaleX=d.scaleX,f.scaleY=d.scaleY,f.x=d.x,f.y=d.y,Ea&&(f.z=d.z,f.rotationX=d.rotationX,f.rotationY=d.rotationY,f.scaleZ=d.scaleZ),f.filters&&delete f.filters,f},ca=function(a,b,c,d,e){var f,g,h,i={},j=a.style;for(g in c)"cssText"!==g&&"length"!==g&&isNaN(g)&&(b[g]!==(f=c[g])||e&&e[g])&&-1===g.indexOf("Origin")&&("number"==typeof f||"string"==typeof f)&&(i[g]="auto"!==f||"left"!==g&&"top"!==g?""!==f&&"auto"!==f&&"none"!==f||"string"!=typeof b[g]||""===b[g].replace(v,"")?f:0:aa(a,g),void 0!==j[g]&&(h=new ra(j,g,j[g],h)));if(d)for(g in d)"className"!==g&&(i[g]=d[g]);return{difs:i,firstMPT:h}},da={width:["Left","Right"],height:["Top","Bottom"]},ea=["marginLeft","marginRight","marginTop","marginBottom"],fa=function(a,b,c){if("svg"===(a.nodeName+"").toLowerCase())return(c||Z(a))[b]||0;if(a.getBBox&&Ma(a))return a.getBBox()[b]||0;var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=da[b],f=e.length;for(c=c||Z(a,null);--f>-1;)d-=parseFloat($(a,"padding"+e[f],c,!0))||0,d-=parseFloat($(a,"border"+e[f]+"Width",c,!0))||0;return d},ga=function(a,b){if("contain"===a||"auto"===a||"auto auto"===a)return a+" ";(null==a||""===a)&&(a="0 0");var c,d=a.split(" "),e=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":d[0],f=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":d[1];if(d.length>3&&!b){for(d=a.split(", ").join(",").split(","),a=[],c=0;c<d.length;c++)a.push(ga(d[c]));return a.join(",")}return null==f?f="center"===e?"50%":"0":"center"===f&&(f="50%"),("center"===e||isNaN(parseFloat(e))&&-1===(e+"").indexOf("="))&&(e="50%"),a=e+" "+f+(d.length>2?" "+d[2]:""),b&&(b.oxp=-1!==e.indexOf("%"),b.oyp=-1!==f.indexOf("%"),b.oxr="="===e.charAt(1),b.oyr="="===f.charAt(1),b.ox=parseFloat(e.replace(v,"")),b.oy=parseFloat(f.replace(v,"")),b.v=a),b||a},ha=function(a,b){return"function"==typeof a&&(a=a(r,q)),"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)||0},ia=function(a,b){return"function"==typeof a&&(a=a(r,q)),null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)||0},ja=function(a,b,c,d){var e,f,g,h,i,j=1e-6;return"function"==typeof a&&(a=a(r,q)),null==a?h=b:"number"==typeof a?h=a:(e=360,f=a.split("_"),i="="===a.charAt(1),g=(i?parseInt(a.charAt(0)+"1",10)*parseFloat(f[0].substr(2)):parseFloat(f[0]))*(-1===a.indexOf("rad")?1:L)-(i?0:b),f.length&&(d&&(d[c]=b+g),-1!==a.indexOf("short")&&(g%=e,g!==g%(e/2)&&(g=0>g?g+e:g-e)),-1!==a.indexOf("_cw")&&0>g?g=(g+9999999999*e)%e-(g/e|0)*e:-1!==a.indexOf("ccw")&&g>0&&(g=(g-9999999999*e)%e-(g/e|0)*e)),h=b+g),j>h&&h>-j&&(h=0),h},ka={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},la=function(a,b,c){return a=0>a?a+1:a>1?a-1:a,255*(1>6*a?b+(c-b)*a*6:.5>a?c:2>3*a?b+(c-b)*(2/3-a)*6:b)+.5|0},ma=g.parseColor=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;if(a)if("number"==typeof a)c=[a>>16,a>>8&255,255&a];else{if(","===a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),ka[a])c=ka[a];else if("#"===a.charAt(0))4===a.length&&(d=a.charAt(1),e=a.charAt(2),f=a.charAt(3),a="#"+d+d+e+e+f+f),a=parseInt(a.substr(1),16),c=[a>>16,a>>8&255,255&a];else if("hsl"===a.substr(0,3))if(c=m=a.match(s),b){if(-1!==a.indexOf("="))return a.match(t)}else g=Number(c[0])%360/360,h=Number(c[1])/100,i=Number(c[2])/100,e=.5>=i?i*(h+1):i+h-i*h,d=2*i-e,c.length>3&&(c[3]=Number(a[3])),c[0]=la(g+1/3,d,e),c[1]=la(g,d,e),c[2]=la(g-1/3,d,e);else c=a.match(s)||ka.transparent;c[0]=Number(c[0]),c[1]=Number(c[1]),c[2]=Number(c[2]),c.length>3&&(c[3]=Number(c[3]))}else c=ka.black;return b&&!m&&(d=c[0]/255,e=c[1]/255,f=c[2]/255,j=Math.max(d,e,f),k=Math.min(d,e,f),i=(j+k)/2,j===k?g=h=0:(l=j-k,h=i>.5?l/(2-j-k):l/(j+k),g=j===d?(e-f)/l+(f>e?6:0):j===e?(f-d)/l+2:(d-e)/l+4,g*=60),c[0]=g+.5|0,c[1]=100*h+.5|0,c[2]=100*i+.5|0),c},na=function(a,b){var c,d,e,f=a.match(oa)||[],g=0,h=f.length?"":a;for(c=0;c<f.length;c++)d=f[c],e=a.substr(g,a.indexOf(d,g)-g),g+=e.length+d.length,d=ma(d,b),3===d.length&&d.push(1),h+=e+(b?"hsla("+d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:"rgba("+d.join(","))+")";return h+a.substr(g)},oa="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(j in ka)oa+="|"+j+"\\b";oa=new RegExp(oa+")","gi"),g.colorStringFilter=function(a){var b,c=a[0]+a[1];oa.test(c)&&(b=-1!==c.indexOf("hsl(")||-1!==c.indexOf("hsla("),a[0]=na(a[0],b),a[1]=na(a[1],b)),oa.lastIndex=0},b.defaultStringFilter||(b.defaultStringFilter=g.colorStringFilter);var pa=function(a,b,c,d){if(null==a)return function(a){return a};var e,f=b?(a.match(oa)||[""])[0]:"",g=a.split(f).join("").match(u)||[],h=a.substr(0,a.indexOf(g[0])),i=")"===a.charAt(a.length-1)?")":"",j=-1!==a.indexOf(" ")?" ":",",k=g.length,l=k>0?g[0].replace(s,""):"";return k?e=b?function(a){var b,m,n,o;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(o=a.replace(I,"|").split("|"),n=0;n<o.length;n++)o[n]=e(o[n]);return o.join(",")}if(b=(a.match(oa)||[f])[0],m=a.split(b).join("").match(u)||[],n=m.length,k>n--)for(;++n<k;)m[n]=c?m[(n-1)/2|0]:g[n];return h+m.join(j)+j+b+i+(-1!==a.indexOf("inset")?" inset":"")}:function(a){var b,f,m;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(f=a.replace(I,"|").split("|"),m=0;m<f.length;m++)f[m]=e(f[m]);return f.join(",")}if(b=a.match(u)||[],m=b.length,k>m--)for(;++m<k;)b[m]=c?b[(m-1)/2|0]:g[m];return h+b.join(j)+i}:function(a){return a}},qa=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var i,j=(c+"").split(" ");for(h={},i=0;4>i;i++)h[a[i]]=j[i]=j[i]||j[(i-1)/2>>0];return e.parse(b,h,f,g)}},ra=(R._setPluginRatio=function(a){this.plugin.setRatio(a);for(var b,c,d,e,f,g=this.data,h=g.proxy,i=g.firstMPT,j=1e-6;i;)b=h[i.v],i.r?b=Math.round(b):j>b&&b>-j&&(b=0),i.t[i.p]=b,i=i._next;if(g.autoRotate&&(g.autoRotate.rotation=g.mod?g.mod(h.rotation,this.t):h.rotation),1===a||0===a)for(i=g.firstMPT,f=1===a?"e":"b";i;){if(c=i.t,c.type){if(1===c.type){for(e=c.xs0+c.s+c.xs1,d=1;d<c.l;d++)e+=c["xn"+d]+c["xs"+(d+1)];c[f]=e}}else c[f]=c.s+c.xs0;i=i._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),sa=(R._parseToProxy=function(a,b,c,d,e,f){var g,h,i,j,k,l=d,m={},n={},o=c._transform,p=M;for(c._transform=null,M=b,d=k=c.parse(a,b,d,e),M=p,f&&(c._transform=o,l&&(l._prev=null,l._prev&&(l._prev._next=null)));d&&d!==l;){if(d.type<=1&&(h=d.p,n[h]=d.s+d.c,m[h]=d.s,f||(j=new ra(d,"s",h,j,d.r),d.c=0),1===d.type))for(g=d.l;--g>0;)i="xn"+g,h=d.p+"_"+i,n[h]=d.data[i],m[h]=d[i],f||(j=new ra(d,i,h,j,d.rxp[i]));d=d._next}return{proxy:m,end:n,firstMPT:j,pt:k}},R.CSSPropTween=function(a,b,d,e,g,h,i,j,k,l,m){this.t=a,this.p=b,this.s=d,this.c=e,this.n=i||b,a instanceof sa||f.push(this.n),this.r=j,this.type=h||0,k&&(this.pr=k,c=!0),this.b=void 0===l?d:l,this.e=void 0===m?d+e:m,g&&(this._next=g,g._prev=this)}),ta=function(a,b,c,d,e,f){var g=new sa(a,b,c,d-c,e,-1,f);return g.b=c,g.e=g.xs0=d,g},ua=g.parseComplex=function(a,b,c,d,e,f,h,i,j,l){c=c||f||"","function"==typeof d&&(d=d(r,q)),h=new sa(a,b,0,0,h,l?2:1,null,!1,i,c,d),d+="",e&&oa.test(d+c)&&(d=[c,d],g.colorStringFilter(d),c=d[0],d=d[1]);var m,n,o,p,u,v,w,x,y,z,A,B,C,D=c.split(", ").join(",").split(" "),E=d.split(", ").join(",").split(" "),F=D.length,G=k!==!1;for((-1!==d.indexOf(",")||-1!==c.indexOf(","))&&(D=D.join(" ").replace(I,", ").split(" "),E=E.join(" ").replace(I,", ").split(" "),F=D.length),F!==E.length&&(D=(f||"").split(" "),F=D.length),h.plugin=j,h.setRatio=l,oa.lastIndex=0,m=0;F>m;m++)if(p=D[m],u=E[m],x=parseFloat(p),x||0===x)h.appendXtra("",x,ha(u,x),u.replace(t,""),G&&-1!==u.indexOf("px"),!0);else if(e&&oa.test(p))B=u.indexOf(")")+1,B=")"+(B?u.substr(B):""),C=-1!==u.indexOf("hsl")&&T,p=ma(p,C),u=ma(u,C),y=p.length+u.length>6,y&&!T&&0===u[3]?(h["xs"+h.l]+=h.l?" transparent":"transparent",h.e=h.e.split(E[m]).join("transparent")):(T||(y=!1),C?h.appendXtra(y?"hsla(":"hsl(",p[0],ha(u[0],p[0]),",",!1,!0).appendXtra("",p[1],ha(u[1],p[1]),"%,",!1).appendXtra("",p[2],ha(u[2],p[2]),y?"%,":"%"+B,!1):h.appendXtra(y?"rgba(":"rgb(",p[0],u[0]-p[0],",",!0,!0).appendXtra("",p[1],u[1]-p[1],",",!0).appendXtra("",p[2],u[2]-p[2],y?",":B,!0),y&&(p=p.length<4?1:p[3],h.appendXtra("",p,(u.length<4?1:u[3])-p,B,!1))),oa.lastIndex=0;else if(v=p.match(s)){if(w=u.match(t),!w||w.length!==v.length)return h;for(o=0,n=0;n<v.length;n++)A=v[n],z=p.indexOf(A,o),h.appendXtra(p.substr(o,z-o),Number(A),ha(w[n],A),"",G&&"px"===p.substr(z+A.length,2),0===n),o=z+A.length;h["xs"+h.l]+=p.substr(o)}else h["xs"+h.l]+=h.l||h["xs"+h.l]?" "+u:u;if(-1!==d.indexOf("=")&&h.data){for(B=h.xs0+h.data.s,m=1;m<h.l;m++)B+=h["xs"+m]+h.data["xn"+m];h.e=B+h["xs"+m]}return h.l||(h.type=-1,h.xs0=h.e),h.xfirst||h},va=9;for(j=sa.prototype,j.l=j.pr=0;--va>0;)j["xn"+va]=0,j["xs"+va]="";j.xs0="",j._next=j._prev=j.xfirst=j.data=j.plugin=j.setRatio=j.rxp=null,j.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&(h||g["xs"+h])?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new sa(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var wa=function(a,b){b=b||{},this.p=b.prefix?Y(a)||a:a,i[a]=i[this.p]=this,this.format=b.formatter||pa(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},xa=R._registerComplexSpecialProp=function(a,b,c){"object"!=typeof b&&(b={parser:c});var d,e,f=a.split(","),g=b.defaultValue;for(c=c||[g],d=0;d<f.length;d++)b.prefix=0===d&&b.prefix,b.defaultValue=c[d]||g,e=new wa(f[d],b)},ya=R._registerPluginProp=function(a){if(!i[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";xa(a,{parser:function(a,c,d,e,f,g,j){var k=h.com.greensock.plugins[b];return k?(k._cssRegister(),i[d].parse(a,c,d,e,f,g,j)):(V("Error: "+b+" js file not loaded."),f)}})}};j=wa.prototype,j.parseComplex=function(a,b,c,d,e,f){var g,h,i,j,k,l,m=this.keyword;if(this.multi&&(I.test(c)||I.test(b)?(h=b.replace(I,"|").split("|"),i=c.replace(I,"|").split("|")):m&&(h=[b],i=[c])),i){for(j=i.length>h.length?i.length:h.length,g=0;j>g;g++)b=h[g]=h[g]||this.dflt,c=i[g]=i[g]||this.dflt,m&&(k=b.indexOf(m),l=c.indexOf(m),k!==l&&(-1===l?h[g]=h[g].split(m).join(""):-1===k&&(h[g]+=" "+m)));b=h.join(", "),c=i.join(", ")}return ua(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},j.parse=function(a,b,c,d,f,g,h){return this.parseComplex(a.style,this.format($(a,this.p,e,!1,this.dflt)),this.format(b),f,g)},g.registerSpecialProp=function(a,b,c){xa(a,{parser:function(a,d,e,f,g,h,i){var j=new sa(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},priority:c})},g.useSVGTransformAttr=m||n;var za,Aa="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Ba=Y("transform"),Ca=W+"transform",Da=Y("transformOrigin"),Ea=null!==Y("perspective"),Fa=R.Transform=function(){this.perspective=parseFloat(g.defaultTransformPerspective)||0,this.force3D=g.defaultForce3D!==!1&&Ea?g.defaultForce3D||"auto":!1},Ga=window.SVGElement,Ha=function(a,b,c){var d,e=N.createElementNS("http://www.w3.org/2000/svg",a),f=/([a-z])([A-Z])/g;for(d in c)e.setAttributeNS(null,d.replace(f,"$1-$2").toLowerCase(),c[d]);return b.appendChild(e),e},Ia=N.documentElement,Ja=function(){var a,b,c,d=p||/Android/i.test(S)&&!window.chrome;return N.createElementNS&&!d&&(a=Ha("svg",Ia),b=Ha("rect",a,{width:100,height:50,x:100}),c=b.getBoundingClientRect().width,b.style[Da]="50% 50%",b.style[Ba]="scaleX(0.5)",d=c===b.getBoundingClientRect().width&&!(n&&Ea),Ia.removeChild(a)),d}(),Ka=function(a,b,c,d,e,f){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=a._gsTransform,w=Oa(a,!0);v&&(t=v.xOrigin,u=v.yOrigin),(!d||(h=d.split(" ")).length<2)&&(n=a.getBBox(),b=ga(b).split(" "),h=[(-1!==b[0].indexOf("%")?parseFloat(b[0])/100*n.width:parseFloat(b[0]))+n.x,(-1!==b[1].indexOf("%")?parseFloat(b[1])/100*n.height:parseFloat(b[1]))+n.y]),c.xOrigin=k=parseFloat(h[0]),c.yOrigin=l=parseFloat(h[1]),d&&w!==Na&&(m=w[0],n=w[1],o=w[2],p=w[3],q=w[4],r=w[5],s=m*p-n*o,i=k*(p/s)+l*(-o/s)+(o*r-p*q)/s,j=k*(-n/s)+l*(m/s)-(m*r-n*q)/s,k=c.xOrigin=h[0]=i,l=c.yOrigin=h[1]=j),v&&(f&&(c.xOffset=v.xOffset,c.yOffset=v.yOffset,v=c),e||e!==!1&&g.defaultSmoothOrigin!==!1?(i=k-t,j=l-u,v.xOffset+=i*w[0]+j*w[2]-i,v.yOffset+=i*w[1]+j*w[3]-j):v.xOffset=v.yOffset=0),f||a.setAttribute("data-svg-origin",h.join(" "))},La=function(a){try{return a.getBBox()}catch(a){}},Ma=function(a){return!!(Ga&&a.getBBox&&a.getCTM&&La(a)&&(!a.parentNode||a.parentNode.getBBox&&a.parentNode.getCTM))},Na=[1,0,0,1,0,0],Oa=function(a,b){var c,d,e,f,g,h,i=a._gsTransform||new Fa,j=1e5,k=a.style;if(Ba?d=$(a,Ca,null,!0):a.currentStyle&&(d=a.currentStyle.filter.match(G),d=d&&4===d.length?[d[0].substr(4),Number(d[2].substr(4)),Number(d[1].substr(4)),d[3].substr(4),i.x||0,i.y||0].join(","):""),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,c&&Ba&&((h="none"===Z(a).display)||!a.parentNode)&&(h&&(f=k.display,k.display="block"),a.parentNode||(g=1,Ia.appendChild(a)),d=$(a,Ca,null,!0),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,f?k.display=f:h&&Ta(k,"display"),g&&Ia.removeChild(a)),(i.svg||a.getBBox&&Ma(a))&&(c&&-1!==(k[Ba]+"").indexOf("matrix")&&(d=k[Ba],c=0),e=a.getAttribute("transform"),c&&e&&(-1!==e.indexOf("matrix")?(d=e,c=0):-1!==e.indexOf("translate")&&(d="matrix(1,0,0,1,"+e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",c=0))),c)return Na;for(e=(d||"").match(s)||[],va=e.length;--va>-1;)f=Number(e[va]),e[va]=(g=f-(f|=0))?(g*j+(0>g?-.5:.5)|0)/j+f:f;return b&&e.length>6?[e[0],e[1],e[4],e[5],e[12],e[13]]:e},Pa=R.getTransform=function(a,c,d,e){if(a._gsTransform&&d&&!e)return a._gsTransform;var f,h,i,j,k,l,m=d?a._gsTransform||new Fa:new Fa,n=m.scaleX<0,o=2e-5,p=1e5,q=Ea?parseFloat($(a,Da,c,!1,"0 0 0").split(" ")[2])||m.zOrigin||0:0,r=parseFloat(g.defaultTransformPerspective)||0;if(m.svg=!(!a.getBBox||!Ma(a)),m.svg&&(Ka(a,$(a,Da,c,!1,"50% 50%")+"",m,a.getAttribute("data-svg-origin")),za=g.useSVGTransformAttr||Ja),f=Oa(a),f!==Na){if(16===f.length){var s,t,u,v,w,x=f[0],y=f[1],z=f[2],A=f[3],B=f[4],C=f[5],D=f[6],E=f[7],F=f[8],G=f[9],H=f[10],I=f[12],J=f[13],K=f[14],M=f[11],N=Math.atan2(D,H);m.zOrigin&&(K=-m.zOrigin,I=F*K-f[12],J=G*K-f[13],K=H*K+m.zOrigin-f[14]),m.rotationX=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=B*v+F*w,t=C*v+G*w,u=D*v+H*w,F=B*-w+F*v,G=C*-w+G*v,H=D*-w+H*v,M=E*-w+M*v,B=s,C=t,D=u),N=Math.atan2(-z,H),m.rotationY=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=x*v-F*w,t=y*v-G*w,u=z*v-H*w,G=y*w+G*v,H=z*w+H*v,M=A*w+M*v,x=s,y=t,z=u),N=Math.atan2(y,x),m.rotation=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),x=x*v+B*w,t=y*v+C*w,C=y*-w+C*v,D=z*-w+D*v,y=t),m.rotationX&&Math.abs(m.rotationX)+Math.abs(m.rotation)>359.9&&(m.rotationX=m.rotation=0,m.rotationY=180-m.rotationY),m.scaleX=(Math.sqrt(x*x+y*y)*p+.5|0)/p,m.scaleY=(Math.sqrt(C*C+G*G)*p+.5|0)/p,m.scaleZ=(Math.sqrt(D*D+H*H)*p+.5|0)/p,m.rotationX||m.rotationY?m.skewX=0:(m.skewX=B||C?Math.atan2(B,C)*L+m.rotation:m.skewX||0,Math.abs(m.skewX)>90&&Math.abs(m.skewX)<270&&(n?(m.scaleX*=-1,m.skewX+=m.rotation<=0?180:-180,m.rotation+=m.rotation<=0?180:-180):(m.scaleY*=-1,m.skewX+=m.skewX<=0?180:-180))),m.perspective=M?1/(0>M?-M:M):0,m.x=I,m.y=J,m.z=K,m.svg&&(m.x-=m.xOrigin-(m.xOrigin*x-m.yOrigin*B),m.y-=m.yOrigin-(m.yOrigin*y-m.xOrigin*C))}else if(!Ea||e||!f.length||m.x!==f[4]||m.y!==f[5]||!m.rotationX&&!m.rotationY){var O=f.length>=6,P=O?f[0]:1,Q=f[1]||0,R=f[2]||0,S=O?f[3]:1;m.x=f[4]||0,m.y=f[5]||0,i=Math.sqrt(P*P+Q*Q),j=Math.sqrt(S*S+R*R),k=P||Q?Math.atan2(Q,P)*L:m.rotation||0,l=R||S?Math.atan2(R,S)*L+k:m.skewX||0,Math.abs(l)>90&&Math.abs(l)<270&&(n?(i*=-1,l+=0>=k?180:-180,k+=0>=k?180:-180):(j*=-1,l+=0>=l?180:-180)),m.scaleX=i,m.scaleY=j,m.rotation=k,m.skewX=l,Ea&&(m.rotationX=m.rotationY=m.z=0,m.perspective=r,m.scaleZ=1),m.svg&&(m.x-=m.xOrigin-(m.xOrigin*P+m.yOrigin*R),m.y-=m.yOrigin-(m.xOrigin*Q+m.yOrigin*S))}m.zOrigin=q;for(h in m)m[h]<o&&m[h]>-o&&(m[h]=0)}return d&&(a._gsTransform=m,m.svg&&(za&&a.style[Ba]?b.delayedCall(.001,function(){Ta(a.style,Ba)}):!za&&a.getAttribute("transform")&&b.delayedCall(.001,function(){a.removeAttribute("transform")}))),m},Qa=function(a){var b,c,d=this.data,e=-d.rotation*K,f=e+d.skewX*K,g=1e5,h=(Math.cos(e)*d.scaleX*g|0)/g,i=(Math.sin(e)*d.scaleX*g|0)/g,j=(Math.sin(f)*-d.scaleY*g|0)/g,k=(Math.cos(f)*d.scaleY*g|0)/g,l=this.t.style,m=this.t.currentStyle;if(m){c=i,i=-j,j=-c,b=m.filter,l.filter="";var n,o,q=this.t.offsetWidth,r=this.t.offsetHeight,s="absolute"!==m.position,t="progid:DXImageTransform.Microsoft.Matrix(M11="+h+", M12="+i+", M21="+j+", M22="+k,u=d.x+q*d.xPercent/100,v=d.y+r*d.yPercent/100;if(null!=d.ox&&(n=(d.oxp?q*d.ox*.01:d.ox)-q/2,o=(d.oyp?r*d.oy*.01:d.oy)-r/2,u+=n-(n*h+o*i),v+=o-(n*j+o*k)),s?(n=q/2,o=r/2,t+=", Dx="+(n-(n*h+o*i)+u)+", Dy="+(o-(n*j+o*k)+v)+")"):t+=", sizingMethod='auto expand')",-1!==b.indexOf("DXImageTransform.Microsoft.Matrix(")?l.filter=b.replace(H,t):l.filter=t+" "+b,(0===a||1===a)&&1===h&&0===i&&0===j&&1===k&&(s&&-1===t.indexOf("Dx=0, Dy=0")||x.test(b)&&100!==parseFloat(RegExp.$1)||-1===b.indexOf(b.indexOf("Alpha"))&&l.removeAttribute("filter")),!s){var y,z,A,B=8>p?1:-1;for(n=d.ieOffsetX||0,o=d.ieOffsetY||0,d.ieOffsetX=Math.round((q-((0>h?-h:h)*q+(0>i?-i:i)*r))/2+u),d.ieOffsetY=Math.round((r-((0>k?-k:k)*r+(0>j?-j:j)*q))/2+v),va=0;4>va;va++)z=ea[va],y=m[z],c=-1!==y.indexOf("px")?parseFloat(y):_(this.t,z,parseFloat(y),y.replace(w,""))||0,A=c!==d[z]?2>va?-d.ieOffsetX:-d.ieOffsetY:2>va?n-d.ieOffsetX:o-d.ieOffsetY,l[z]=(d[z]=Math.round(c-A*(0===va||2===va?1:B)))+"px"}}},Ra=R.set3DTransformRatio=R.setTransformRatio=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v,w,x,y,z=this.data,A=this.t.style,B=z.rotation,C=z.rotationX,D=z.rotationY,E=z.scaleX,F=z.scaleY,G=z.scaleZ,H=z.x,I=z.y,J=z.z,L=z.svg,M=z.perspective,N=z.force3D;if(((1===a||0===a)&&"auto"===N&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime)||!N)&&!J&&!M&&!D&&!C&&1===G||za&&L||!Ea)return void(B||z.skewX||L?(B*=K,x=z.skewX*K,y=1e5,b=Math.cos(B)*E,e=Math.sin(B)*E,c=Math.sin(B-x)*-F,f=Math.cos(B-x)*F,x&&"simple"===z.skewType&&(s=Math.tan(x-z.skewY*K),s=Math.sqrt(1+s*s),c*=s,f*=s,z.skewY&&(s=Math.tan(z.skewY*K),s=Math.sqrt(1+s*s),b*=s,e*=s)),L&&(H+=z.xOrigin-(z.xOrigin*b+z.yOrigin*c)+z.xOffset,I+=z.yOrigin-(z.xOrigin*e+z.yOrigin*f)+z.yOffset,za&&(z.xPercent||z.yPercent)&&(p=this.t.getBBox(),H+=.01*z.xPercent*p.width,I+=.01*z.yPercent*p.height),p=1e-6,p>H&&H>-p&&(H=0),p>I&&I>-p&&(I=0)),u=(b*y|0)/y+","+(e*y|0)/y+","+(c*y|0)/y+","+(f*y|0)/y+","+H+","+I+")",L&&za?this.t.setAttribute("transform","matrix("+u):A[Ba]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+u):A[Ba]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+E+",0,0,"+F+","+H+","+I+")");if(n&&(p=1e-4,p>E&&E>-p&&(E=G=2e-5),p>F&&F>-p&&(F=G=2e-5),!M||z.z||z.rotationX||z.rotationY||(M=0)),B||z.skewX)B*=K,q=b=Math.cos(B),r=e=Math.sin(B),z.skewX&&(B-=z.skewX*K,q=Math.cos(B),r=Math.sin(B),"simple"===z.skewType&&(s=Math.tan((z.skewX-z.skewY)*K),s=Math.sqrt(1+s*s),q*=s,r*=s,z.skewY&&(s=Math.tan(z.skewY*K),s=Math.sqrt(1+s*s),b*=s,e*=s))),c=-r,f=q;else{if(!(D||C||1!==G||M||L))return void(A[Ba]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) translate3d(":"translate3d(")+H+"px,"+I+"px,"+J+"px)"+(1!==E||1!==F?" scale("+E+","+F+")":""));b=f=1,c=e=0}j=1,d=g=h=i=k=l=0,m=M?-1/M:0,o=z.zOrigin,p=1e-6,v=",",w="0",B=D*K,B&&(q=Math.cos(B),r=Math.sin(B),h=-r,k=m*-r,d=b*r,g=e*r,j=q,m*=q,b*=q,e*=q),B=C*K,B&&(q=Math.cos(B),r=Math.sin(B),s=c*q+d*r,t=f*q+g*r,i=j*r,l=m*r,d=c*-r+d*q,g=f*-r+g*q,j*=q,m*=q,c=s,f=t),1!==G&&(d*=G,g*=G,j*=G,m*=G),1!==F&&(c*=F,f*=F,i*=F,l*=F),1!==E&&(b*=E,e*=E,h*=E,k*=E),(o||L)&&(o&&(H+=d*-o,I+=g*-o,J+=j*-o+o),L&&(H+=z.xOrigin-(z.xOrigin*b+z.yOrigin*c)+z.xOffset,I+=z.yOrigin-(z.xOrigin*e+z.yOrigin*f)+z.yOffset),p>H&&H>-p&&(H=w),p>I&&I>-p&&(I=w),p>J&&J>-p&&(J=0)),u=z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix3d(":"matrix3d(",u+=(p>b&&b>-p?w:b)+v+(p>e&&e>-p?w:e)+v+(p>h&&h>-p?w:h),u+=v+(p>k&&k>-p?w:k)+v+(p>c&&c>-p?w:c)+v+(p>f&&f>-p?w:f),C||D||1!==G?(u+=v+(p>i&&i>-p?w:i)+v+(p>l&&l>-p?w:l)+v+(p>d&&d>-p?w:d),u+=v+(p>g&&g>-p?w:g)+v+(p>j&&j>-p?w:j)+v+(p>m&&m>-p?w:m)+v):u+=",0,0,0,0,1,0,",u+=H+v+I+v+J+v+(M?1+-J/M:1)+")",A[Ba]=u};j=Fa.prototype,j.x=j.y=j.z=j.skewX=j.skewY=j.rotation=j.rotationX=j.rotationY=j.zOrigin=j.xPercent=j.yPercent=j.xOffset=j.yOffset=0,j.scaleX=j.scaleY=j.scaleZ=1,xa("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(a,b,c,d,f,h,i){if(d._lastParsedTransform===i)return f;d._lastParsedTransform=i;var j;"function"==typeof i[c]&&(j=i[c],i[c]=b);var k,l,m,n,o,p,s,t,u,v=a._gsTransform,w=a.style,x=1e-6,y=Aa.length,z=i,A={},B="transformOrigin",C=Pa(a,e,!0,z.parseTransform),D=z.transform&&("function"==typeof z.transform?z.transform(r,q):z.transform);if(d._transform=C,D&&"string"==typeof D&&Ba)l=P.style,l[Ba]=D,l.display="block",l.position="absolute",N.body.appendChild(P),k=Pa(P,null,!1),C.svg&&(p=C.xOrigin,s=C.yOrigin,k.x-=C.xOffset,k.y-=C.yOffset,(z.transformOrigin||z.svgOrigin)&&(D={},Ka(a,ga(z.transformOrigin),D,z.svgOrigin,z.smoothOrigin,!0),p=D.xOrigin,s=D.yOrigin,k.x-=D.xOffset-C.xOffset,k.y-=D.yOffset-C.yOffset),(p||s)&&(t=Oa(P,!0),k.x-=p-(p*t[0]+s*t[2]),k.y-=s-(p*t[1]+s*t[3]))),N.body.removeChild(P),k.perspective||(k.perspective=C.perspective),null!=z.xPercent&&(k.xPercent=ia(z.xPercent,C.xPercent)),null!=z.yPercent&&(k.yPercent=ia(z.yPercent,C.yPercent));else if("object"==typeof z){if(k={scaleX:ia(null!=z.scaleX?z.scaleX:z.scale,C.scaleX),scaleY:ia(null!=z.scaleY?z.scaleY:z.scale,C.scaleY),scaleZ:ia(z.scaleZ,C.scaleZ),x:ia(z.x,C.x),y:ia(z.y,C.y),z:ia(z.z,C.z),xPercent:ia(z.xPercent,C.xPercent),yPercent:ia(z.yPercent,C.yPercent),perspective:ia(z.transformPerspective,C.perspective)},o=z.directionalRotation,null!=o)if("object"==typeof o)for(l in o)z[l]=o[l];else z.rotation=o;"string"==typeof z.x&&-1!==z.x.indexOf("%")&&(k.x=0,k.xPercent=ia(z.x,C.xPercent)),"string"==typeof z.y&&-1!==z.y.indexOf("%")&&(k.y=0,k.yPercent=ia(z.y,C.yPercent)),k.rotation=ja("rotation"in z?z.rotation:"shortRotation"in z?z.shortRotation+"_short":"rotationZ"in z?z.rotationZ:C.rotation-C.skewY,C.rotation-C.skewY,"rotation",A),Ea&&(k.rotationX=ja("rotationX"in z?z.rotationX:"shortRotationX"in z?z.shortRotationX+"_short":C.rotationX||0,C.rotationX,"rotationX",A),k.rotationY=ja("rotationY"in z?z.rotationY:"shortRotationY"in z?z.shortRotationY+"_short":C.rotationY||0,C.rotationY,"rotationY",A)),k.skewX=ja(z.skewX,C.skewX-C.skewY),(k.skewY=ja(z.skewY,C.skewY))&&(k.skewX+=k.skewY,k.rotation+=k.skewY)}for(Ea&&null!=z.force3D&&(C.force3D=z.force3D,n=!0),C.skewType=z.skewType||C.skewType||g.defaultSkewType,m=C.force3D||C.z||C.rotationX||C.rotationY||k.z||k.rotationX||k.rotationY||k.perspective,m||null==z.scale||(k.scaleZ=1);--y>-1;)u=Aa[y],D=k[u]-C[u],(D>x||-x>D||null!=z[u]||null!=M[u])&&(n=!0,f=new sa(C,u,C[u],D,f),u in A&&(f.e=A[u]),f.xs0=0,f.plugin=h,d._overwriteProps.push(f.n));return D=z.transformOrigin,C.svg&&(D||z.svgOrigin)&&(p=C.xOffset,s=C.yOffset,Ka(a,ga(D),k,z.svgOrigin,z.smoothOrigin),f=ta(C,"xOrigin",(v?C:k).xOrigin,k.xOrigin,f,B),f=ta(C,"yOrigin",(v?C:k).yOrigin,k.yOrigin,f,B),(p!==C.xOffset||s!==C.yOffset)&&(f=ta(C,"xOffset",v?p:C.xOffset,C.xOffset,f,B),f=ta(C,"yOffset",v?s:C.yOffset,C.yOffset,f,B)),D=za?null:"0px 0px"),(D||Ea&&m&&C.zOrigin)&&(Ba?(n=!0,u=Da,D=(D||$(a,u,e,!1,"50% 50%"))+"",f=new sa(w,u,0,0,f,-1,B),f.b=w[u],f.plugin=h,Ea?(l=C.zOrigin,D=D.split(" "),C.zOrigin=(D.length>2&&(0===l||"0px"!==D[2])?parseFloat(D[2]):l)||0,f.xs0=f.e=D[0]+" "+(D[1]||"50%")+" 0px",f=new sa(C,"zOrigin",0,0,f,-1,f.n),f.b=l,f.xs0=f.e=C.zOrigin):f.xs0=f.e=D):ga(D+"",C)),n&&(d._transformType=C.svg&&za||!m&&3!==this._transformType?2:3),j&&(i[c]=j),f},prefix:!0}),xa("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),xa("borderRadius",{defaultValue:"0px",parser:function(a,b,c,f,g,h){b=this.format(b);var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],z=a.style;for(q=parseFloat(a.offsetWidth),r=parseFloat(a.offsetHeight),i=b.split(" "),j=0;j<y.length;j++)this.p.indexOf("border")&&(y[j]=Y(y[j])),m=l=$(a,y[j],e,!1,"0px"),-1!==m.indexOf(" ")&&(l=m.split(" "),m=l[0],l=l[1]),n=k=i[j],o=parseFloat(m),t=m.substr((o+"").length),u="="===n.charAt(1),u?(p=parseInt(n.charAt(0)+"1",10),n=n.substr(2),p*=parseFloat(n),s=n.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(n),s=n.substr((p+"").length)),""===s&&(s=d[c]||t),s!==t&&(v=_(a,"borderLeft",o,t),w=_(a,"borderTop",o,t),"%"===s?(m=v/q*100+"%",l=w/r*100+"%"):"em"===s?(x=_(a,"borderLeft",1,"em"),m=v/x+"em",l=w/x+"em"):(m=v+"px",l=w+"px"),u&&(n=parseFloat(m)+p+s,k=parseFloat(l)+p+s)),g=ua(z,y[j],m+" "+l,n+" "+k,!1,"0px",g);return g},prefix:!0,formatter:pa("0px 0px 0px 0px",!1,!0)}),xa("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(a,b,c,d,f,g){return ua(a.style,c,this.format($(a,c,e,!1,"0px 0px")),this.format(b),!1,"0px",f)},prefix:!0,formatter:pa("0px 0px",!1,!0)}),xa("backgroundPosition",{defaultValue:"0 0",parser:function(a,b,c,d,f,g){var h,i,j,k,l,m,n="background-position",o=e||Z(a,null),q=this.format((o?p?o.getPropertyValue(n+"-x")+" "+o.getPropertyValue(n+"-y"):o.getPropertyValue(n):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),r=this.format(b);if(-1!==q.indexOf("%")!=(-1!==r.indexOf("%"))&&r.split(",").length<2&&(m=$(a,"backgroundImage").replace(D,""),m&&"none"!==m)){for(h=q.split(" "),i=r.split(" "),Q.setAttribute("src",m),j=2;--j>-1;)q=h[j],k=-1!==q.indexOf("%"),k!==(-1!==i[j].indexOf("%"))&&(l=0===j?a.offsetWidth-Q.width:a.offsetHeight-Q.height,h[j]=k?parseFloat(q)/100*l+"px":parseFloat(q)/l*100+"%");q=h.join(" ")}return this.parseComplex(a.style,q,r,f,g)},formatter:ga}),xa("backgroundSize",{defaultValue:"0 0",formatter:function(a){return a+="",ga(-1===a.indexOf(" ")?a+" "+a:a)}}),xa("perspective",{defaultValue:"0px",prefix:!0}),xa("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),xa("transformStyle",{prefix:!0}),xa("backfaceVisibility",{prefix:!0}),xa("userSelect",{prefix:!0}),xa("margin",{parser:qa("marginTop,marginRight,marginBottom,marginLeft")}),xa("padding",{parser:qa("paddingTop,paddingRight,paddingBottom,paddingLeft")}),xa("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(a,b,c,d,f,g){var h,i,j;return 9>p?(i=a.currentStyle,j=8>p?" ":",",h="rect("+i.clipTop+j+i.clipRight+j+i.clipBottom+j+i.clipLeft+")",b=this.format(b).split(",").join(j)):(h=this.format($(a,this.p,e,!1,this.dflt)),b=this.format(b)),this.parseComplex(a.style,h,b,f,g)}}),xa("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),xa("autoRound,strictUnits",{parser:function(a,b,c,d,e){return e}}),xa("border",{defaultValue:"0px solid #000",parser:function(a,b,c,d,f,g){var h=$(a,"borderTopWidth",e,!1,"0px"),i=this.format(b).split(" "),j=i[0].replace(w,"");return"px"!==j&&(h=parseFloat(h)/_(a,"borderTopWidth",1,j)+j),this.parseComplex(a.style,this.format(h+" "+$(a,"borderTopStyle",e,!1,"solid")+" "+$(a,"borderTopColor",e,!1,"#000")),i.join(" "),f,g)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(oa)||["#000"])[0]}}),xa("borderWidth",{
parser:qa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),xa("float,cssFloat,styleFloat",{parser:function(a,b,c,d,e,f){var g=a.style,h="cssFloat"in g?"cssFloat":"styleFloat";return new sa(g,h,0,0,e,-1,c,!1,0,g[h],b)}});var Sa=function(a){var b,c=this.t,d=c.filter||$(this.data,"filter")||"",e=this.s+this.c*a|0;100===e&&(-1===d.indexOf("atrix(")&&-1===d.indexOf("radient(")&&-1===d.indexOf("oader(")?(c.removeAttribute("filter"),b=!$(this.data,"filter")):(c.filter=d.replace(z,""),b=!0)),b||(this.xn1&&(c.filter=d=d||"alpha(opacity="+e+")"),-1===d.indexOf("pacity")?0===e&&this.xn1||(c.filter=d+" alpha(opacity="+e+")"):c.filter=d.replace(x,"opacity="+e))};xa("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(a,b,c,d,f,g){var h=parseFloat($(a,"opacity",e,!1,"1")),i=a.style,j="autoAlpha"===c;return"string"==typeof b&&"="===b.charAt(1)&&(b=("-"===b.charAt(0)?-1:1)*parseFloat(b.substr(2))+h),j&&1===h&&"hidden"===$(a,"visibility",e)&&0!==b&&(h=0),T?f=new sa(i,"opacity",h,b-h,f):(f=new sa(i,"opacity",100*h,100*(b-h),f),f.xn1=j?1:0,i.zoom=1,f.type=2,f.b="alpha(opacity="+f.s+")",f.e="alpha(opacity="+(f.s+f.c)+")",f.data=a,f.plugin=g,f.setRatio=Sa),j&&(f=new sa(i,"visibility",0,0,f,-1,null,!1,0,0!==h?"inherit":"hidden",0===b?"hidden":"inherit"),f.xs0="inherit",d._overwriteProps.push(f.n),d._overwriteProps.push(c)),f}});var Ta=function(a,b){b&&(a.removeProperty?(("ms"===b.substr(0,2)||"webkit"===b.substr(0,6))&&(b="-"+b),a.removeProperty(b.replace(B,"-$1").toLowerCase())):a.removeAttribute(b))},Ua=function(a){if(this.t._gsClassPT=this,1===a||0===a){this.t.setAttribute("class",0===a?this.b:this.e);for(var b=this.data,c=this.t.style;b;)b.v?c[b.p]=b.v:Ta(c,b.p),b=b._next;1===a&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};xa("className",{parser:function(a,b,d,f,g,h,i){var j,k,l,m,n,o=a.getAttribute("class")||"",p=a.style.cssText;if(g=f._classNamePT=new sa(a,d,0,0,g,2),g.setRatio=Ua,g.pr=-11,c=!0,g.b=o,k=ba(a,e),l=a._gsClassPT){for(m={},n=l.data;n;)m[n.p]=1,n=n._next;l.setRatio(1)}return a._gsClassPT=g,g.e="="!==b.charAt(1)?b:o.replace(new RegExp("(?:\\s|^)"+b.substr(2)+"(?![\\w-])"),"")+("+"===b.charAt(0)?" "+b.substr(2):""),a.setAttribute("class",g.e),j=ca(a,k,ba(a),i,m),a.setAttribute("class",o),g.data=j.firstMPT,a.style.cssText=p,g=g.xfirst=f.parse(a,j.difs,g,h)}});var Va=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var b,c,d,e,f,g=this.t.style,h=i.transform.parse;if("all"===this.e)g.cssText="",e=!0;else for(b=this.e.split(" ").join("").split(","),d=b.length;--d>-1;)c=b[d],i[c]&&(i[c].parse===h?e=!0:c="transformOrigin"===c?Da:i[c].p),Ta(g,c);e&&(Ta(g,Ba),f=this.t._gsTransform,f&&(f.svg&&(this.t.removeAttribute("data-svg-origin"),this.t.removeAttribute("transform")),delete this.t._gsTransform))}};for(xa("clearProps",{parser:function(a,b,d,e,f){return f=new sa(a,d,0,0,f,2),f.setRatio=Va,f.e=b,f.pr=-10,f.data=e._tween,c=!0,f}}),j="bezier,throwProps,physicsProps,physics2D".split(","),va=j.length;va--;)ya(j[va]);j=g.prototype,j._firstPT=j._lastParsedTransform=j._transform=null,j._onInitTween=function(a,b,h,j){if(!a.nodeType)return!1;this._target=q=a,this._tween=h,this._vars=b,r=j,k=b.autoRound,c=!1,d=b.suffixMap||g.suffixMap,e=Z(a,""),f=this._overwriteProps;var n,p,s,t,u,v,w,x,z,A=a.style;if(l&&""===A.zIndex&&(n=$(a,"zIndex",e),("auto"===n||""===n)&&this._addLazySet(A,"zIndex",0)),"string"==typeof b&&(t=A.cssText,n=ba(a,e),A.cssText=t+";"+b,n=ca(a,n,ba(a)).difs,!T&&y.test(b)&&(n.opacity=parseFloat(RegExp.$1)),b=n,A.cssText=t),b.className?this._firstPT=p=i.className.parse(a,b.className,"className",this,null,null,b):this._firstPT=p=this.parse(a,b,null),this._transformType){for(z=3===this._transformType,Ba?m&&(l=!0,""===A.zIndex&&(w=$(a,"zIndex",e),("auto"===w||""===w)&&this._addLazySet(A,"zIndex",0)),o&&this._addLazySet(A,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(z?"visible":"hidden"))):A.zoom=1,s=p;s&&s._next;)s=s._next;x=new sa(a,"transform",0,0,null,2),this._linkCSSP(x,null,s),x.setRatio=Ba?Ra:Qa,x.data=this._transform||Pa(a,e,!0),x.tween=h,x.pr=-1,f.pop()}if(c){for(;p;){for(v=p._next,s=t;s&&s.pr>p.pr;)s=s._next;(p._prev=s?s._prev:u)?p._prev._next=p:t=p,(p._next=s)?s._prev=p:u=p,p=v}this._firstPT=t}return!0},j.parse=function(a,b,c,f){var g,h,j,l,m,n,o,p,s,t,u=a.style;for(g in b)n=b[g],"function"==typeof n&&(n=n(r,q)),h=i[g],h?c=h.parse(a,n,g,this,c,f,b):(m=$(a,g,e)+"",s="string"==typeof n,"color"===g||"fill"===g||"stroke"===g||-1!==g.indexOf("Color")||s&&A.test(n)?(s||(n=ma(n),n=(n.length>3?"rgba(":"rgb(")+n.join(",")+")"),c=ua(u,g,m,n,!0,"transparent",c,0,f)):s&&J.test(n)?c=ua(u,g,m,n,!0,null,c,0,f):(j=parseFloat(m),o=j||0===j?m.substr((j+"").length):"",(""===m||"auto"===m)&&("width"===g||"height"===g?(j=fa(a,g,e),o="px"):"left"===g||"top"===g?(j=aa(a,g,e),o="px"):(j="opacity"!==g?0:1,o="")),t=s&&"="===n.charAt(1),t?(l=parseInt(n.charAt(0)+"1",10),n=n.substr(2),l*=parseFloat(n),p=n.replace(w,"")):(l=parseFloat(n),p=s?n.replace(w,""):""),""===p&&(p=g in d?d[g]:o),n=l||0===l?(t?l+j:l)+p:b[g],o!==p&&""!==p&&(l||0===l)&&j&&(j=_(a,g,j,o),"%"===p?(j/=_(a,g,100,"%")/100,b.strictUnits!==!0&&(m=j+"%")):"em"===p||"rem"===p||"vw"===p||"vh"===p?j/=_(a,g,1,p):"px"!==p&&(l=_(a,g,l,p),p="px"),t&&(l||0===l)&&(n=l+j+p)),t&&(l+=j),!j&&0!==j||!l&&0!==l?void 0!==u[g]&&(n||n+""!="NaN"&&null!=n)?(c=new sa(u,g,l||j||0,0,c,-1,g,!1,0,m,n),c.xs0="none"!==n||"display"!==g&&-1===g.indexOf("Style")?n:m):V("invalid "+g+" tween value: "+b[g]):(c=new sa(u,g,j,l-j,c,0,g,k!==!1&&("px"===p||"zIndex"===g),0,m,n),c.xs0=p))),f&&c&&!c.plugin&&(c.plugin=f);return c},j.setRatio=function(a){var b,c,d,e=this._firstPT,f=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;e;){if(b=e.c*a+e.s,e.r?b=Math.round(b):f>b&&b>-f&&(b=0),e.type)if(1===e.type)if(d=e.l,2===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2;else if(3===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3;else if(4===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4;else if(5===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4+e.xn4+e.xs5;else{for(c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}else-1===e.type?e.t[e.p]=e.xs0:e.setRatio&&e.setRatio(a);else e.t[e.p]=b+e.xs0;e=e._next}else for(;e;)2!==e.type?e.t[e.p]=e.b:e.setRatio(a),e=e._next;else for(;e;){if(2!==e.type)if(e.r&&-1!==e.type)if(b=Math.round(e.s+e.c),e.type){if(1===e.type){for(d=e.l,c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}}else e.t[e.p]=b+e.xs0;else e.t[e.p]=e.e;else e.setRatio(a);e=e._next}},j._enableTransforms=function(a){this._transform=this._transform||Pa(this._target,e,!0),this._transformType=this._transform.svg&&za||!a&&3!==this._transformType?2:3};var Wa=function(a){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};j._addLazySet=function(a,b,c){var d=this._firstPT=new sa(a,b,0,0,this._firstPT,2);d.e=c,d.setRatio=Wa,d.data=this},j._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next,d=!0),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._next=b,a._prev=c),a},j._mod=function(a){for(var b=this._firstPT;b;)"function"==typeof a[b.p]&&a[b.p]===Math.round&&(b.r=1),b=b._next},j._kill=function(b){var c,d,e,f=b;if(b.autoAlpha||b.alpha){f={};for(d in b)f[d]=b[d];f.opacity=1,f.autoAlpha&&(f.visibility=1)}for(b.className&&(c=this._classNamePT)&&(e=c.xfirst,e&&e._prev?this._linkCSSP(e._prev,c._next,e._prev._prev):e===this._firstPT&&(this._firstPT=c._next),c._next&&this._linkCSSP(c._next,c._next._next,e._prev),this._classNamePT=null),c=this._firstPT;c;)c.plugin&&c.plugin!==d&&c.plugin._kill&&(c.plugin._kill(b),d=c.plugin),c=c._next;return a.prototype._kill.call(this,f)};var Xa=function(a,b,c){var d,e,f,g;if(a.slice)for(e=a.length;--e>-1;)Xa(a[e],b,c);else for(d=a.childNodes,e=d.length;--e>-1;)f=d[e],g=f.type,f.style&&(b.push(ba(f)),c&&c.push(f)),1!==g&&9!==g&&11!==g||!f.childNodes.length||Xa(f,b,c)};return g.cascadeTo=function(a,c,d){var e,f,g,h,i=b.to(a,c,d),j=[i],k=[],l=[],m=[],n=b._internals.reservedProps;for(a=i._targets||i.target,Xa(a,k,m),i.render(c,!0,!0),Xa(a,l),i.render(0,!0,!0),i._enabled(!0),e=m.length;--e>-1;)if(f=ca(m[e],k[e],l[e]),f.firstMPT){f=f.difs;for(g in d)n[g]&&(f[g]=d[g]);h={};for(g in f)h[g]=k[e][g];j.push(b.fromTo(m[e],c,h,f))}return j},a.activate([g]),g},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=b())}("CSSPlugin");

/* SPLIT TEXT UTIL */
/*!
 * VERSION: 0.4.0
 * DATE: 2016-07-09
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;!function(a){"use strict";var b=a.GreenSockGlobals||a,c=function(a){var c,d=a.split("."),e=b;for(c=0;c<d.length;c++)e[d[c]]=e=e[d[c]]||{};return e},d=c("com.greensock.utils"),e=function(a){var b=a.nodeType,c="";if(1===b||9===b||11===b){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===b||4===b)return a.nodeValue;return c},f=document,g=f.defaultView?f.defaultView.getComputedStyle:function(){},h=/([A-Z])/g,i=function(a,b,c,d){var e;return(c=c||g(a,null))?(a=c.getPropertyValue(b.replace(h,"-$1").toLowerCase()),e=a||c.length?a:c[b]):a.currentStyle&&(c=a.currentStyle,e=c[b]),d?e:parseInt(e,10)||0},j=function(a){return a.length&&a[0]&&(a[0].nodeType&&a[0].style&&!a.nodeType||a[0].length&&a[0][0])?!0:!1},k=function(a){var b,c,d,e=[],f=a.length;for(b=0;f>b;b++)if(c=a[b],j(c))for(d=c.length,d=0;d<c.length;d++)e.push(c[d]);else e.push(c);return e},l=/(?:\r|\n|\s\s|\t\t)/g,m=")eefec303079ad17405c",n=/(?:<br>|<br\/>|<br \/>)/gi,o=f.all&&!f.addEventListener,p=" style='position:relative;display:inline-block;"+(o?"*display:inline;*zoom:1;'":"'"),q=function(a,b){a=a||"";var c=-1!==a.indexOf("++"),d=1;return c&&(a=a.split("++").join("")),function(){return"<"+b+p+(a?" class='"+a+(c?d++:"")+"'>":">")}},r=d.SplitText=b.SplitText=function(a,b){if("string"==typeof a&&(a=r.selector(a)),!a)throw"cannot split a null element.";this.elements=j(a)?k(a):[a],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=b||{},this.split(b)},s=function(a,b,c){var d=a.nodeType;if(1===d||9===d||11===d)for(a=a.firstChild;a;a=a.nextSibling)s(a,b,c);else(3===d||4===d)&&(a.nodeValue=a.nodeValue.split(b).join(c))},t=function(a,b){for(var c=b.length;--c>-1;)a.push(b[c])},u=function(a,b,c,d,h){n.test(a.innerHTML)&&(a.innerHTML=a.innerHTML.replace(n,m));var j,k,o,p,r,u,v,w,x,y,z,A,B,C,D=e(a),E=b.span?"span":"div",F=b.type||b.split||"chars,words,lines",G=-1!==F.indexOf("lines")?[]:null,H=-1!==F.indexOf("words"),I=-1!==F.indexOf("chars"),J="absolute"===b.position||b.absolute===!0,K=b.wordDelimiter||" ",L=" "!==K?"":J?"&#173; ":" ",M=-999,N=g(a),O=i(a,"paddingLeft",N),P=i(a,"borderBottomWidth",N)+i(a,"borderTopWidth",N),Q=i(a,"borderLeftWidth",N)+i(a,"borderRightWidth",N),R=i(a,"paddingTop",N)+i(a,"paddingBottom",N),S=i(a,"paddingLeft",N)+i(a,"paddingRight",N),T=i(a,"textAlign",N,!0),U=.2*i(a,"fontSize"),V=a.clientHeight,W=a.clientWidth,X=b.span?"</span>":"</div>",Y=q(b.wordsClass,E),Z=q(b.charsClass,E),$=-1!==(b.linesClass||"").indexOf("++"),_=b.linesClass,aa=-1!==D.indexOf("<"),ba=!0,ca=[],da=[],ea=[];for(!b.reduceWhiteSpace!=!1&&(D=D.replace(l,"")),$&&(_=_.split("++").join("")),aa&&(D=D.split("<").join("{{LT}}")),j=D.length,p=Y(),r=0;j>r;r++)if(v=D.charAt(r),")"===v&&D.substr(r,20)===m)p+=(ba?X:"")+"<BR/>",ba=!1,r!==j-20&&D.substr(r+20,20)!==m&&(p+=" "+Y(),ba=!0),r+=19;else if(v===K&&D.charAt(r-1)!==K&&r!==j-1&&D.substr(r-20,20)!==m){for(p+=ba?X:"",ba=!1;D.charAt(r+1)===K;)p+=L,r++;(")"!==D.charAt(r+1)||D.substr(r+1,20)!==m)&&(p+=L+Y(),ba=!0)}else"{"===v&&"{{LT}}"===D.substr(r,6)?(p+=I?Z()+"{{LT}}</"+E+">":"{{LT}}",r+=5):p+=I&&" "!==v?Z()+v+"</"+E+">":v;for(a.innerHTML=p+(ba?X:""),aa&&s(a,"{{LT}}","<"),u=a.getElementsByTagName("*"),j=u.length,w=[],r=0;j>r;r++)w[r]=u[r];if(G||J)for(r=0;j>r;r++)x=w[r],o=x.parentNode===a,(o||J||I&&!H)&&(y=x.offsetTop,G&&o&&Math.abs(y-M)>U&&"BR"!==x.nodeName&&(k=[],G.push(k),M=y),J&&(x._x=x.offsetLeft,x._y=y,x._w=x.offsetWidth,x._h=x.offsetHeight),G&&(H!==o&&I||(k.push(x),x._x-=O),o&&r&&(w[r-1]._wordEnd=!0),"BR"===x.nodeName&&x.nextSibling&&"BR"===x.nextSibling.nodeName&&G.push([])));for(r=0;j>r;r++)x=w[r],o=x.parentNode===a,"BR"!==x.nodeName?(J&&(A=x.style,H||o||(x._x+=x.parentNode._x,x._y+=x.parentNode._y),A.left=x._x+"px",A.top=x._y+"px",A.position="absolute",A.display="block",A.width=x._w+1+"px",A.height=x._h+"px"),H?o&&""!==x.innerHTML?da.push(x):I&&ca.push(x):o?(a.removeChild(x),w.splice(r--,1),j--):!o&&I&&(y=!G&&!J&&x.nextSibling,a.appendChild(x),y||a.appendChild(f.createTextNode(" ")),ca.push(x))):G||J?(a.removeChild(x),w.splice(r--,1),j--):H||a.appendChild(x);if(G){for(J&&(z=f.createElement(E),a.appendChild(z),B=z.offsetWidth+"px",y=z.offsetParent===a?0:a.offsetLeft,a.removeChild(z)),A=a.style.cssText,a.style.cssText="display:none;";a.firstChild;)a.removeChild(a.firstChild);for(C=" "===K&&(!J||!H&&!I),r=0;r<G.length;r++){for(k=G[r],z=f.createElement(E),z.style.cssText="display:block;text-align:"+T+";position:"+(J?"absolute;":"relative;"),_&&(z.className=_+($?r+1:"")),ea.push(z),j=k.length,u=0;j>u;u++)"BR"!==k[u].nodeName&&(x=k[u],z.appendChild(x),C&&(x._wordEnd||H)&&z.appendChild(f.createTextNode(" ")),J&&(0===u&&(z.style.top=x._y+"px",z.style.left=O+y+"px"),x.style.top="0px",y&&(x.style.left=x._x-y+"px")));0===j&&(z.innerHTML="&nbsp;"),H||I||(z.innerHTML=e(z).split(String.fromCharCode(160)).join(" ")),J&&(z.style.width=B,z.style.height=x._h+"px"),a.appendChild(z)}a.style.cssText=A}J&&(V>a.clientHeight&&(a.style.height=V-R+"px",a.clientHeight<V&&(a.style.height=V+P+"px")),W>a.clientWidth&&(a.style.width=W-S+"px",a.clientWidth<W&&(a.style.width=W+Q+"px"))),t(c,ca),t(d,da),t(h,ea)},v=r.prototype;v.split=function(a){this.isSplit&&this.revert(),this.vars=a||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var b=this.elements.length;--b>-1;)this._originals[b]=this.elements[b].innerHTML,u(this.elements[b],this.vars,this.chars,this.words,this.lines);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},v.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var a=this._originals.length;--a>-1;)this.elements[a].innerHTML=this._originals[a];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},r.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(r.selector=c,c(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)},r.version="0.4.0"}(_gsScope),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define([],b):"undefined"!=typeof module&&module.exports&&(module.exports=b())}("SplitText");

try{
	window.GreenSockGlobals = null;
	window._gsQueue = null;
	window._gsDefine = null;

	delete(window.GreenSockGlobals);
	delete(window._gsQueue);
	delete(window._gsDefine);	
   } catch(e) {}

try{
	window.GreenSockGlobals = oldgs;
	window._gsQueue = oldgs_queue;
	} catch(e) {}

if (window.tplogs==true)
	try {
		console.groupEnd();
	} catch(e) {}

(function(e,t){
		e.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]};e.expr[":"].uncached=function(t){var n=document.createElement("img");n.src=t.src;return e(t).is('img[src!=""]')&&!n.complete};e.fn.waitForImages=function(t,n,r){if(e.isPlainObject(arguments[0])){n=t.each;r=t.waitForAll;t=t.finished}t=t||e.noop;n=n||e.noop;r=!!r;if(!e.isFunction(t)||!e.isFunction(n)){throw new TypeError("An invalid callback was supplied.")}return this.each(function(){var i=e(this),s=[];if(r){var o=e.waitForImages.hasImageProperties||[],u=/url\((['"]?)(.*?)\1\)/g;i.find("*").each(function(){var t=e(this);if(t.is("img:uncached")){s.push({src:t.attr("src"),element:t[0]})}e.each(o,function(e,n){var r=t.css(n);if(!r){return true}var i;while(i=u.exec(r)){s.push({src:i[2],element:t[0]})}})})}else{i.find("img:uncached").each(function(){s.push({src:this.src,element:this})})}var f=s.length,l=0;if(f==0){t.call(i[0])}e.each(s,function(r,s){var o=new Image;e(o).bind("load error",function(e){l++;n.call(s.element,l,f,e.type=="load");if(l==f){t.call(i[0]);return false}});o.src=s.src})})};		
})(jQuery)

/*!
 * Lightbox v2.8.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:500,fitImagesInViewport:!0,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){this.enable(),this.build()},b.prototype.enable=function(){var b=this;a("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){var b=this;a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")),this.$lightbox=a("#lightbox"),this.$overlay=a("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.containerTopPadding=parseInt(this.$container.css("padding-top"),10),this.containerRightPadding=parseInt(this.$container.css("padding-right"),10),this.containerBottomPadding=parseInt(this.$container.css("padding-bottom"),10),this.containerLeftPadding=parseInt(this.$container.css("padding-left"),10),this.$overlay.hide().on("click",function(){return b.end(),!1}),this.$lightbox.hide().on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$outerContainer.on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return b.end(),!1})},b.prototype.start=function(b){function c(a){d.album.push({link:a.attr("href"),title:a.attr("data-title")||a.attr("title")})}var d=this,e=a(window);e.on("resize",a.proxy(this.sizeOverlay,this)),a("select, object, embed").css({visibility:"hidden"}),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr("data-lightbox");if(h){f=a(b.prop("tagName")+'[data-lightbox="'+h+'"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if("lightbox"===b.attr("rel"))c(b);else{f=a(b.prop("tagName")+'[rel="'+b.attr("rel")+'"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+"px",left:l+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a("body").addClass("lb-disable-scrolling"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this;this.disableKeyboardNav();var d=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration),a(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var e=new Image;e.onload=function(){var f,g,h,i,j,k,l;d.attr("src",c.album[b].link),f=a(e),d.width(e.width),d.height(e.height),c.options.fitImagesInViewport&&(l=a(window).width(),k=a(window).height(),j=l-c.containerLeftPadding-c.containerRightPadding-20,i=k-c.containerTopPadding-c.containerBottomPadding-120,c.options.maxWidth&&c.options.maxWidth<j&&(j=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<j&&(i=c.options.maxHeight),(e.width>j||e.height>i)&&(e.width/j>e.height/i?(h=j,g=parseInt(e.height/(e.width/h),10),d.width(h),d.height(g)):(g=i,h=parseInt(e.width/(e.height/g),10),d.width(h),d.height(g)))),c.sizeContainer(d.width(),d.height())},e.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){this.$overlay.width(a(document).width()).height(a(document).height())},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(".lb-dataContainer").width(g),d.$lightbox.find(".lb-prevLink").height(h),d.$lightbox.find(".lb-nextLink").height(h),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerLeftPadding+this.containerRightPadding,h=b+this.containerTopPadding+this.containerBottomPadding;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,"swing",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn("slow"),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent("TouchEvent"),a=this.options.alwaysShowNavOnTouchDevices?!0:!1}catch(b){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),a&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),a&&this.$lightbox.find(".lb-next").css("opacity","1"))))},b.prototype.updateDetails=function(){var b=this;if("undefined"!=typeof this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title&&this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click",function(b){void 0!==a(this).attr("target")?window.open(a(this).attr("href"),a(this).attr("target")):location.href=a(this).attr("href")}),this.album.length>1&&this.options.showImageNumberLabel){var c=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(c).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return b.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){var a=new Image;a.src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){var b=new Image;b.src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){a(document).on("keyup.keyboard",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){a(document).off(".keyboard")},b.prototype.keyboardAction=function(a){var b=27,c=37,d=39,e=a.keyCode,f=String.fromCharCode(e).toLowerCase();e===b||f.match(/x|o|c/)?this.end():"p"===f||e===c?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):("n"===f||e===d)&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),a("select, object, embed").css({visibility:"visible"}),this.options.disableScrolling&&a("body").removeClass("lb-disable-scrolling")},new b});
/*!
 * Masonry PACKAGED v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',[],function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.1
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.2
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    callback();
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('layoutname')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/item',[
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  // convert percent to pixels
  var layoutSize = this.layout.size;
  var x = xValue.indexOf('%') != -1 ?
    ( parseFloat( xValue ) / 100 ) * layoutSize.width : parseInt( xValue, 10 );
  var y = yValue.indexOf('%') != -1 ?
    ( parseFloat( yValue ) / 100 ) * layoutSize.height : parseInt( yValue, 10 );

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

/*!
 * Outlayer v2.1.0
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'outlayer/outlayer',[
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

/*!
 * Masonry v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        'get-size/get-size'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}( window, function factory( Outlayer, getSize ) {



// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  Masonry.prototype._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
  };

  Masonry.prototype.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  Masonry.prototype.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  Masonry.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = colGroup.indexOf( minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  Masonry.prototype._getColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( i, i + colSpan );
      // and get the max value of the array
      colGroup[i] = Math.max.apply( Math, groupColYs );
    }
    return colGroup;
  };

  Masonry.prototype._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  Masonry.prototype._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  Masonry.prototype._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  Masonry.prototype.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));


!function(t,i,o,e){function n(i,o){this.el=i,this.$el=t(this.el),this.options=t.extend({},l,o),this._defaults=l,this._name=a,this.init()}var a="nivoLightbox",l={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(t){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(t){},onNext:function(t){},errorMessage:"The requested content cannot be loaded. Please try again later."};n.prototype={init:function(){var i=this;t("html").hasClass("nivo-lightbox-notouch")||t("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in o&&t("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(t){i.showLightbox(t)}),this.options.keyboardNav&&t("body").off("keyup").on("keyup",function(o){var e=o.keyCode?o.keyCode:o.which;27==e&&i.destructLightbox(),37==e&&t(".nivo-lightbox-prev").trigger("click"),39==e&&t(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(i){var o=this,e=this.$el,n=this.checkContent(e);if(n){i.preventDefault(),this.options.beforeShowLightbox.call(this);var a=this.constructLightbox();if(a){var l=a.find(".nivo-lightbox-content");if(l){if(t("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(l,e),this.$el.attr("data-lightbox-gallery")){var h=t('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');t(".nivo-lightbox-nav").show(),t(".nivo-lightbox-prev").off("click").on("click",function(i){i.preventDefault();var n=h.index(e);e=h.eq(n-1),t(e).length||(e=h.last()),o.processContent(l,e),o.options.onPrev.call(this,[e])}),t(".nivo-lightbox-next").off("click").on("click",function(i){i.preventDefault();var n=h.index(e);e=h.eq(n+1),t(e).length||(e=h.first()),o.processContent(l,e),o.options.onNext.call(this,[e])})}setTimeout(function(){a.addClass("nivo-lightbox-open"),o.options.afterShowLightbox.call(this,[a])},1)}}}},checkContent:function(t){var i=t.attr("href"),o=i.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==i.match(/\.(jpeg|jpg|gif|png)$/i)?!0:o?!0:"ajax"==t.attr("data-lightbox-type")?!0:"#"==i.substring(0,1)&&"inline"==t.attr("data-lightbox-type")?!0:"iframe"==t.attr("data-lightbox-type")?!0:!1},processContent:function(o,e){var n=this,a=e.attr("href"),l=a.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(o.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&e.attr("data-lightbox-hidpi")&&(a=e.attr("data-lightbox-hidpi")),null!==a.match(/\.(jpeg|jpg|gif|png)$/i)){var h=t("<img>",{src:a});h.one("load",function(){var e=t('<div class="nivo-lightbox-image" />');e.append(h),o.html(e).removeClass("nivo-lightbox-loading"),e.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"}),t(i).resize(function(){e.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&t(this).load()}),h.error(function(){var i=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(i).removeClass("nivo-lightbox-loading")})}else if(l){var s="",r="nivo-lightbox-video";if("youtube"==l[1]&&(s="http://www.youtube.com/embed/"+l[4],r="nivo-lightbox-youtube"),"youtu"==l[1]&&(s="http://www.youtube.com/embed/"+l[3],r="nivo-lightbox-youtube"),"vimeo"==l[1]&&(s="http://player.vimeo.com/video/"+l[3],r="nivo-lightbox-vimeo"),s){var c=t("<iframe>",{src:s,"class":r,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(c),c.load(function(){o.removeClass("nivo-lightbox-loading")})}}else if("ajax"==e.attr("data-lightbox-type"))t.ajax({url:a,cache:!1,success:function(e){var n=t('<div class="nivo-lightbox-ajax" />');n.append(e),o.html(n).removeClass("nivo-lightbox-loading"),n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"}),t(i).resize(function(){n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"})})},error:function(){var i=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(i).removeClass("nivo-lightbox-loading")}});else if("#"==a.substring(0,1)&&"inline"==e.attr("data-lightbox-type"))if(t(a).length){var v=t('<div class="nivo-lightbox-inline" />');v.append(t(a).clone().show()),o.html(v).removeClass("nivo-lightbox-loading"),v.outerHeight()<o.height()&&v.css({position:"relative",top:"50%","margin-top":-(v.outerHeight()/2)+"px"}),t(i).resize(function(){v.outerHeight()<o.height()&&v.css({position:"relative",top:"50%","margin-top":-(v.outerHeight()/2)+"px"})})}else{var g=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(g).removeClass("nivo-lightbox-loading")}else{if("iframe"!=e.attr("data-lightbox-type"))return!1;var b=t("<iframe>",{src:a,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(b),b.load(function(){o.removeClass("nivo-lightbox-loading")})}if(e.attr("title")){var x=t("<span>",{"class":"nivo-lightbox-title"});x.text(e.attr("title")),t(".nivo-lightbox-title-wrap").html(x)}else t(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(t(".nivo-lightbox-overlay").length)return t(".nivo-lightbox-overlay");var i=t("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),o=t("<div>",{"class":"nivo-lightbox-wrap"}),e=t("<div>",{"class":"nivo-lightbox-content"}),n=t('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),a=t('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),l=t("<div>",{"class":"nivo-lightbox-title-wrap"}),h=0;h&&i.addClass("nivo-lightbox-ie"),o.append(e),o.append(l),i.append(o),i.append(n),i.append(a),t("body").append(i);var s=this;return s.options.clickOverlayToClose&&i.on("click",function(i){(i.target===this||t(i.target).hasClass("nivo-lightbox-content")||t(i.target).hasClass("nivo-lightbox-image"))&&s.destructLightbox()}),a.on("click",function(t){t.preventDefault(),s.destructLightbox()}),i},destructLightbox:function(){var i=this;this.options.beforeHideLightbox.call(this),t(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),t(".nivo-lightbox-nav").hide(),t("body").removeClass("nivo-lightbox-body-effect-"+i.options.effect);var o=0;o&&(t(".nivo-lightbox-overlay iframe").attr("src"," "),t(".nivo-lightbox-overlay iframe").remove()),t(".nivo-lightbox-prev").off("click"),t(".nivo-lightbox-next").off("click"),t(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var t="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return i.devicePixelRatio>1?!0:i.matchMedia&&i.matchMedia(t).matches?!0:!1}},t.fn[a]=function(i){return this.each(function(){t.data(this,a)||t.data(this,a,new n(this,i))})}}(jQuery,window,document);
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems : function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$owlWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);
                }
            }
        },

        lazyPreload : function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle : function (item, classToRemove) {
            var base = this;
            item.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem
                .attr("style", base.$elem.data("owl-originalStyles") || "")
                .attr("class", base.$elem.data("owl-originalClasses"));
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
}(jQuery, window, document));

/*! Pushy - v1.0.0 - 2016-3-1
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

(function ($) {
	var pushy = $('.pushy'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		push = $('.push'), //css class to add pushy capability
		pushyLeft = 'pushy-left', //css class for left menu position
		pushyOpenLeft = 'pushy-open-left', //css class when menu is open (left position)
		pushyOpenRight = 'pushy-open-right', //css class when menu is open (right position)
		siteOverlay = $('.site-overlay'), //site overlay
		menuBtn = $('.menu-btn, .pushy-link'), //css classes to toggle the menu
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + 'px', //jQuery fallback menu width
		submenuClass = '.pushy-submenu',
		submenuOpenClass = 'pushy-submenu-open',
		submenuClosedClass = 'pushy-submenu-closed',
		submenu = $(submenuClass);
		submenu2Class = '.pushy-submenu2',
		submenu2OpenClass = 'pushy-submenu2-open',
		submenu2ClosedClass = 'pushy-submenu2-closed',
		submenu2 = $(submenu2Class);


	function togglePushy(){
		//add class to body based on menu position
		if( pushy.hasClass(pushyLeft) ){
			body.toggleClass(pushyOpenLeft);
		}else{
			body.toggleClass(pushyOpenRight);
		}
	}

	function openPushyFallback(){		

		//animate menu position based on CSS class
		if( pushy.hasClass(pushyLeft) ){
			body.addClass(pushyOpenLeft);
			pushy.animate({left: "0px"}, menuSpeed);
			container.animate({left: menuWidth}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: menuWidth}, menuSpeed);
		}else{
			body.addClass(pushyOpenRight);
			pushy.animate({right: '0px'}, menuSpeed);
			container.animate({right: menuWidth}, menuSpeed);
			push.animate({right: menuWidth}, menuSpeed);
		}

	}

	function closePushyFallback(){

		//animate menu position based on CSS class
		if( pushy.hasClass(pushyLeft) ){
			body.removeClass(pushyOpenLeft);
			pushy.animate({left: "-" + menuWidth}, menuSpeed);
			container.animate({left: "0px"}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: "0px"}, menuSpeed);
		}else{
			body.removeClass(pushyOpenRight);
			pushy.animate({right: "-" + menuWidth}, menuSpeed);
			container.animate({right: "0px"}, menuSpeed);
			push.animate({right: "0px"}, menuSpeed);
		}

	}

	function toggleSubmenu(){
		//hide submenu by default
		$(submenuClass).addClass(submenuClosedClass);
		$(submenu2Class).addClass(submenu2ClosedClass);

		$(submenuClass).on('click', function(){
	        var selected = $(this);

	        if( selected.hasClass(submenuClosedClass) ) {
	            //hide opened submenus
	            $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
	            //show submenu
	            selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
	        }else{
	            //hide submenu
	            selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
	        }
	    });
		$(submenu2Class).on('click', function(){
	        var selected = $(this);

	        if( selected.hasClass(submenu2ClosedClass) ) {
	            //hide opened submenus
	            $(submenu2Class).addClass(submenu2ClosedClass).removeClass(submenu2OpenClass);
	            //show submenu
	            selected.removeClass(submenu2ClosedClass).addClass(submenu2OpenClass);
	        }else{
	            //hide submenu
	            selected.addClass(submenu2ClosedClass).removeClass(submenu2OpenClass);
	        }
	    });
	}
	
    function toggleSubmenuFallback(){
    	//hide submenu by default
    	$(submenuClass).addClass(submenuClosedClass);
    	$(submenu2Class).addClass(submenu2ClosedClass);
    	
    	submenu.children('a').on('click', function(event){
    		event.preventDefault();
    		$(this).toggleClass(submenuOpenClass)
    			   .next('.pushy-submenu ul').slideToggle(200)
    			   .end().parent(submenuClass)
    			   .siblings(submenuClass).children('a')
    			   .removeClass(submenuOpenClass)
    			   .next('.pushy-submenu ul').slideUp(200);
    	});
    	submenu2.children('a').on('click', function(event){
    		event.preventDefault();
    		$(this).toggleClass(submenu2OpenClass)
    			   .next('.pushy-submenu2 ul').slideToggle(200)
    			   .end().parent(submenuClass)
    			   .siblings(submenuClass).children('a')
    			   .removeClass(submenuOpenClass)
    			   .next('.pushy-submenu2 ul').slideUp(200);
    	});
    }

	//checks if 3d transforms are supported removing the modernizr dependency
	var cssTransforms3d = (function csstransforms3d(){
		var el = document.createElement('p'),
		supported = false,
		transforms = {
		    'webkitTransform':'-webkit-transform',
		    'OTransform':'-o-transform',
		    'msTransform':'-ms-transform',
		    'MozTransform':'-moz-transform',
		    'transform':'transform'
		};

		// Add it to the body to get the computed style
		document.body.insertBefore(el, null);

		for(var t in transforms){
		    if( el.style[t] !== undefined ){
		        el.style[t] = 'translate3d(1px,1px,1px)';
		        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		    }
		}

		document.body.removeChild(el);

		return (supported !== undefined && supported.length > 0 && supported !== "none");
	})();

	if(cssTransforms3d){
		//make menu visible
		pushy.css({'visibility': 'visible'});

		//toggle submenu
		toggleSubmenu();

		//toggle menu
		menuBtn.on('click', function(){
			togglePushy();
		});
		//close menu when clicking site overlay
		siteOverlay.on('click', function(){
			togglePushy();
		});
	}else{
		//add css class to body
		body.addClass('no-csstransforms3d');

		//hide menu by default
		if( pushy.hasClass(pushyLeft) ){
			pushy.css({left: "-" + menuWidth});
		}else{
			pushy.css({right: "-" + menuWidth});
		}

		//make menu visible
		pushy.css({'visibility': 'visible'}); 
		//fixes IE scrollbar issue
		container.css({"overflow-x": "hidden"});

		//keep track of menu state (open/close)
		var opened = false;

		//toggle submenu
		toggleSubmenuFallback();

		//toggle menu
		menuBtn.on('click', function(){
			if (opened) {
				closePushyFallback();
				opened = false;
			} else {
				openPushyFallback();
				opened = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlay.on('click', function(){
			if (opened) {
				closePushyFallback();
				opened = false;
			} else {
				openPushyFallback();
				opened = true;
			}
		});
	}
}(jQuery));
/********************************************
 * REVOLUTION 5.3 EXTENSION - ACTIONS
 * @version: 2.0.5 (09.12.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function($){"use strict";var _R=jQuery.fn.revolution,_ISM=_R.is_mobile(),extension={alias:"Actions Min JS",name:"revolution.extensions.actions.min.js",min_core:"5.3",version:"2.0.5"};jQuery.extend(!0,_R,{checkActions:function(a,b,c){return"stop"!==_R.compare_version(extension).check&&void checkActions_intern(a,b,c)}});var checkActions_intern=function(a,b,c){c&&jQuery.each(c,function(c,d){d.delay=parseInt(d.delay,0)/1e3,a.addClass("tp-withaction"),b.fullscreen_esclistener||"exitfullscreen"!=d.action&&"togglefullscreen"!=d.action||(jQuery(document).keyup(function(b){27==b.keyCode&&jQuery("#rs-go-fullscreen").length>0&&a.trigger(d.event)}),b.fullscreen_esclistener=!0);var e="backgroundvideo"==d.layer?jQuery(".rs-background-video-layer"):"firstvideo"==d.layer?jQuery(".tp-revslider-slidesli").find(".tp-videolayer"):jQuery("#"+d.layer);switch(jQuery.inArray(d.action,["toggleslider","toggle_mute_video","toggle_global_mute_video","togglefullscreen"])!=-1&&a.data("togglelisteners",!0),d.action){case"togglevideo":jQuery.each(e,function(b,c){c=jQuery(c);var d=c.data("videotoggledby");void 0==d&&(d=new Array),d.push(a),c.data("videotoggledby",d)});break;case"togglelayer":jQuery.each(e,function(b,c){c=jQuery(c);var e=c.data("layertoggledby");void 0==e&&(e=new Array),e.push(a),c.data("layertoggledby",e),c.data("triggered_startstatus",d.layerstatus)});break;case"toggle_mute_video":jQuery.each(e,function(b,c){c=jQuery(c);var d=c.data("videomutetoggledby");void 0==d&&(d=new Array),d.push(a),c.data("videomutetoggledby",d)});break;case"toggle_global_mute_video":jQuery.each(e,function(b,c){c=jQuery(c);var d=c.data("videomutetoggledby");void 0==d&&(d=new Array),d.push(a),c.data("videomutetoggledby",d)});break;case"toggleslider":void 0==b.slidertoggledby&&(b.slidertoggledby=new Array),b.slidertoggledby.push(a);break;case"togglefullscreen":void 0==b.fullscreentoggledby&&(b.fullscreentoggledby=new Array),b.fullscreentoggledby.push(a)}switch(a.on(d.event,function(){if("click"===d.event&&a.hasClass("tp-temporarydisabled"))return!1;var c="backgroundvideo"==d.layer?jQuery(".active-revslide .slotholder .rs-background-video-layer"):"firstvideo"==d.layer?jQuery(".active-revslide .tp-videolayer").first():jQuery("#"+d.layer);if("stoplayer"==d.action||"togglelayer"==d.action||"startlayer"==d.action){if(c.length>0){var e=c.data();void 0!==e.clicked_time_stamp&&(new Date).getTime()-e.clicked_time_stamp>150&&(clearTimeout(e.triggerdelayIn),clearTimeout(e.triggerdelayOut)),e.clicked_time_stamp=(new Date).getTime(),"startlayer"==d.action||"togglelayer"==d.action&&"in"!=c.data("animdirection")?(e.animdirection="in",e.triggerstate="on",_R.toggleState(e.layertoggledby),_R.playAnimationFrame&&(clearTimeout(e.triggerdelayIn),e.triggerdelayIn=setTimeout(function(){_R.playAnimationFrame({caption:c,opt:b,frame:"frame_0",triggerdirection:"in",triggerframein:"frame_0",triggerframeout:"frame_999"})},1e3*d.delay))):("stoplayer"==d.action||"togglelayer"==d.action&&"out"!=c.data("animdirection"))&&(e.animdirection="out",e.triggered=!0,e.triggerstate="off",_R.stopVideo&&_R.stopVideo(c,b),_R.unToggleState(e.layertoggledby),_R.endMoveCaption&&(clearTimeout(e.triggerdelayOut),e.triggerdelayOut=setTimeout(function(){_R.playAnimationFrame({caption:c,opt:b,frame:"frame_999",triggerdirection:"out",triggerframein:"frame_0",triggerframeout:"frame_999"})},1e3*d.delay)))}}else!_ISM||"playvideo"!=d.action&&"stopvideo"!=d.action&&"togglevideo"!=d.action&&"mutevideo"!=d.action&&"unmutevideo"!=d.action&&"toggle_mute_video"!=d.action&&"toggle_global_mute_video"!=d.action?(d.delay="NaN"===d.delay||NaN===d.delay?0:d.delay,punchgs.TweenLite.delayedCall(d.delay,function(){actionSwitches(c,b,d,a)},[c,b,d,a])):actionSwitches(c,b,d,a)}),d.action){case"togglelayer":case"startlayer":case"playlayer":case"stoplayer":var e=jQuery("#"+d.layer),f=e.data();e.length>0&&void 0!==f&&(void 0!==f.frames&&"bytrigger"!=f.frames[0].delay||void 0===f.frames&&"bytrigger"!==f.start)&&(f.triggerstate="on")}})},actionSwitches=function(tnc,opt,a,_nc){switch(a.action){case"scrollbelow":_nc.addClass("tp-scrollbelowslider"),_nc.data("scrolloffset",a.offset),_nc.data("scrolldelay",a.delay);var off=getOffContH(opt.fullScreenOffsetContainer)||0,aof=parseInt(a.offset,0)||0;off=off-aof||0,jQuery("body,html").animate({scrollTop:opt.c.offset().top+jQuery(opt.li[0]).height()-off+"px"},{duration:400});break;case"callback":eval(a.callback);break;case"jumptoslide":switch(a.slide.toLowerCase()){case"+1":case"next":opt.sc_indicator="arrow",_R.callingNewSlide(opt.c,1);break;case"previous":case"prev":case"-1":opt.sc_indicator="arrow",_R.callingNewSlide(opt.c,-1);break;default:var ts=jQuery.isNumeric(a.slide)?parseInt(a.slide,0):a.slide;_R.callingNewSlide(opt.c,ts)}break;case"simplelink":window.open(a.url,a.target);break;case"toggleslider":opt.noloopanymore=0,"playing"==opt.sliderstatus?(opt.c.revpause(),opt.forcepause_viatoggle=!0,_R.unToggleState(opt.slidertoggledby)):(opt.forcepause_viatoggle=!1,opt.c.revresume(),_R.toggleState(opt.slidertoggledby));break;case"pauseslider":opt.c.revpause(),_R.unToggleState(opt.slidertoggledby);break;case"playslider":opt.noloopanymore=0,opt.c.revresume(),_R.toggleState(opt.slidertoggledby);break;case"playvideo":tnc.length>0&&_R.playVideo(tnc,opt);break;case"stopvideo":tnc.length>0&&_R.stopVideo&&_R.stopVideo(tnc,opt);break;case"togglevideo":tnc.length>0&&(_R.isVideoPlaying(tnc,opt)?_R.stopVideo&&_R.stopVideo(tnc,opt):_R.playVideo(tnc,opt));break;case"mutevideo":tnc.length>0&&_R.muteVideo(tnc,opt);break;case"unmutevideo":tnc.length>0&&_R.unMuteVideo&&_R.unMuteVideo(tnc,opt);break;case"toggle_mute_video":tnc.length>0&&(_R.isVideoMuted(tnc,opt)?_R.unMuteVideo(tnc,opt):_R.muteVideo&&_R.muteVideo(tnc,opt)),_nc.toggleClass("rs-toggle-content-active");break;case"toggle_global_mute_video":opt.globalmute===!0?(opt.globalmute=!1,void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(a,b){_R.unMuteVideo&&_R.unMuteVideo(b,opt)})):(opt.globalmute=!0,void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(a,b){_R.muteVideo&&_R.muteVideo(b,opt)})),_nc.toggleClass("rs-toggle-content-active");break;case"simulateclick":tnc.length>0&&tnc.click();break;case"toggleclass":tnc.length>0&&(tnc.hasClass(a.classname)?tnc.removeClass(a.classname):tnc.addClass(a.classname));break;case"gofullscreen":case"exitfullscreen":case"togglefullscreen":if(jQuery("#rs-go-fullscreen").length>0&&("togglefullscreen"==a.action||"exitfullscreen"==a.action)){jQuery("#rs-go-fullscreen").appendTo(jQuery("#rs-was-here"));var paw=opt.c.closest(".forcefullwidth_wrapper_tp_banner").length>0?opt.c.closest(".forcefullwidth_wrapper_tp_banner"):opt.c.closest(".rev_slider_wrapper");paw.unwrap(),paw.unwrap(),opt.minHeight=opt.oldminheight,opt.infullscreenmode=!1,opt.c.revredraw(),void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(a,b){_R.playVideo(b,opt)}),_R.unToggleState(opt.fullscreentoggledby)}else if(0==jQuery("#rs-go-fullscreen").length&&("togglefullscreen"==a.action||"gofullscreen"==a.action)){var paw=opt.c.closest(".forcefullwidth_wrapper_tp_banner").length>0?opt.c.closest(".forcefullwidth_wrapper_tp_banner"):opt.c.closest(".rev_slider_wrapper");paw.wrap('<div id="rs-was-here"><div id="rs-go-fullscreen"></div></div>');var gf=jQuery("#rs-go-fullscreen");gf.appendTo(jQuery("body")),gf.css({position:"fixed",width:"100%",height:"100%",top:"0px",left:"0px",zIndex:"9999999",background:"#ffffff"}),opt.oldminheight=opt.minHeight,opt.minHeight=jQuery(window).height(),opt.infullscreenmode=!0,opt.c.revredraw(),void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(a,b){_R.playVideo(b,opt)}),_R.toggleState(opt.fullscreentoggledby)}break;default:var obj={};obj.event=a,obj.layer=_nc,opt.c.trigger("layeraction",[obj])}},getOffContH=function(a){if(void 0==a)return 0;if(a.split(",").length>1){var b=a.split(","),c=0;return b&&jQuery.each(b,function(a,b){jQuery(b).length>0&&(c+=jQuery(b).outerHeight(!0))}),c}return jQuery(a).height()}}(jQuery);
/********************************************
 * REVOLUTION 5.0 EXTENSION - CAROUSEL
 * @version: 1.2.1 (18.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(a){"use strict";var b=jQuery.fn.revolution,c={alias:"Carousel Min JS",name:"revolution.extensions.carousel.min.js",min_core:"5.3.0",version:"1.2.1"};jQuery.extend(!0,b,{prepareCarousel:function(a,d,h,i){return"stop"!==b.compare_version(c).check&&(h=a.carousel.lastdirection=f(h,a.carousel.lastdirection),e(a),a.carousel.slide_offset_target=j(a),void(void 0!==i?g(a,h,!1,0):void 0==d?b.carouselToEvalPosition(a,h):g(a,h,!1)))},carouselToEvalPosition:function(a,c){var d=a.carousel;c=d.lastdirection=f(c,d.lastdirection);var e="center"===d.horizontal_align?(d.wrapwidth/2-d.slide_width/2-d.slide_globaloffset)/d.slide_width:(0-d.slide_globaloffset)/d.slide_width,h=b.simp(e,a.slideamount,!1),i=h-Math.floor(h),j=0,k=-1*(Math.ceil(h)-h),l=-1*(Math.floor(h)-h);j=i>=.3&&"left"===c||i>=.7&&"right"===c?k:i<.3&&"left"===c||i<.7&&"right"===c?l:j,j="off"===d.infinity?h<0?h:e>a.slideamount-1?e-(a.slideamount-1):j:j,d.slide_offset_target=j*d.slide_width,0!==Math.abs(d.slide_offset_target)?g(a,c,!0):b.organiseCarousel(a,c)},organiseCarousel:function(a,b,c,d){b=void 0===b||"down"==b||"up"==b||null===b||jQuery.isEmptyObject(b)?"left":b;for(var e=a.carousel,f=new Array,g=e.slides.length,i=("right"===e.horizontal_align?a.width:0,0);i<g;i++){var j=i*e.slide_width+e.slide_offset;"on"===e.infinity&&(j=j>e.wrapwidth-e.inneroffset&&"right"==b?e.slide_offset-(e.slides.length-i)*e.slide_width:j,j=j<0-e.inneroffset-e.slide_width&&"left"==b?j+e.maxwidth:j),f[i]=j}var k=999;e.slides&&jQuery.each(e.slides,function(d,h){var i=f[d];"on"===e.infinity&&(i=i>e.wrapwidth-e.inneroffset&&"left"===b?f[0]-(g-d)*e.slide_width:i,i=i<0-e.inneroffset-e.slide_width?"left"==b?i+e.maxwidth:"right"===b?f[g-1]+(d+1)*e.slide_width:i:i);var j=new Object;j.left=i+e.inneroffset;var l="center"===e.horizontal_align?(Math.abs(e.wrapwidth/2)-(j.left+e.slide_width/2))/e.slide_width:(e.inneroffset-j.left)/e.slide_width,n="center"===e.horizontal_align?2:1;if((c&&Math.abs(l)<k||0===l)&&(k=Math.abs(l),e.focused=d),j.width=e.slide_width,j.x=0,j.transformPerspective=1200,j.transformOrigin="50% "+e.vertical_align,"on"===e.fadeout)if("on"===e.vary_fade)j.autoAlpha=1-Math.abs(1/Math.ceil(e.maxVisibleItems/n)*l);else switch(e.horizontal_align){case"center":j.autoAlpha=Math.abs(l)<Math.ceil(e.maxVisibleItems/n-1)?1:1-(Math.abs(l)-Math.floor(Math.abs(l)));break;case"left":j.autoAlpha=l<1&&l>0?1-l:Math.abs(l)>e.maxVisibleItems-1?1-(Math.abs(l)-(e.maxVisibleItems-1)):1;break;case"right":j.autoAlpha=l>-1&&l<0?1-Math.abs(l):l>e.maxVisibleItems-1?1-(Math.abs(l)-(e.maxVisibleItems-1)):1}else j.autoAlpha=Math.abs(l)<Math.ceil(e.maxVisibleItems/n)?1:0;if(void 0!==e.minScale&&e.minScale>0)if("on"===e.vary_scale){j.scale=1-Math.abs(e.minScale/100/Math.ceil(e.maxVisibleItems/n)*l);var o=(e.slide_width-e.slide_width*j.scale)*Math.abs(l)}else{j.scale=l>=1||l<=-1?1-e.minScale/100:(100-e.minScale*Math.abs(l))/100;var o=(e.slide_width-e.slide_width*(1-e.minScale/100))*Math.abs(l)}void 0!==e.maxRotation&&0!=Math.abs(e.maxRotation)&&("on"===e.vary_rotation?(j.rotationY=Math.abs(e.maxRotation)-Math.abs((1-Math.abs(1/Math.ceil(e.maxVisibleItems/n)*l))*e.maxRotation),j.autoAlpha=Math.abs(j.rotationY)>90?0:j.autoAlpha):j.rotationY=l>=1||l<=-1?e.maxRotation:Math.abs(l)*e.maxRotation,j.rotationY=l<0?j.rotationY*-1:j.rotationY),j.x=-1*e.space*l,j.left=Math.floor(j.left),j.x=Math.floor(j.x),void 0!==j.scale?l<0?j.x-o:j.x+o:j.x,j.zIndex=Math.round(100-Math.abs(5*l)),j.transformStyle="3D"!=a.parallax.type&&"3d"!=a.parallax.type?"flat":"preserve-3d",punchgs.TweenLite.set(h,j)}),d&&(a.c.find(".next-revslide").removeClass("next-revslide"),jQuery(e.slides[e.focused]).addClass("next-revslide"),a.c.trigger("revolution.nextslide.waiting"));e.wrapwidth/2-e.slide_offset,e.maxwidth+e.slide_offset-e.wrapwidth/2}});var d=function(a){var b=a.carousel;b.infbackup=b.infinity,b.maxVisiblebackup=b.maxVisibleItems,b.slide_globaloffset="none",b.slide_offset=0,b.wrap=a.c.find(".tp-carousel-wrapper"),b.slides=a.c.find(".tp-revslider-slidesli"),0!==b.maxRotation&&("3D"!=a.parallax.type&&"3d"!=a.parallax.type?punchgs.TweenLite.set(b.wrap,{perspective:1200,transformStyle:"flat"}):punchgs.TweenLite.set(b.wrap,{perspective:1600,transformStyle:"preserve-3d"})),void 0!==b.border_radius&&parseInt(b.border_radius,0)>0&&punchgs.TweenLite.set(a.c.find(".tp-revslider-slidesli"),{borderRadius:b.border_radius})},e=function(a){void 0===a.bw&&b.setSize(a);var c=a.carousel,e=b.getHorizontalOffset(a.c,"left"),f=b.getHorizontalOffset(a.c,"right");void 0===c.wrap&&d(a),c.slide_width="on"!==c.stretch?a.gridwidth[a.curWinRange]*a.bw:a.c.width(),c.maxwidth=a.slideamount*c.slide_width,c.maxVisiblebackup>c.slides.length+1&&(c.maxVisibleItems=c.slides.length+2),c.wrapwidth=c.maxVisibleItems*c.slide_width+(c.maxVisibleItems-1)*c.space,c.wrapwidth="auto"!=a.sliderLayout?c.wrapwidth>a.c.closest(".tp-simpleresponsive").width()?a.c.closest(".tp-simpleresponsive").width():c.wrapwidth:c.wrapwidth>a.ul.width()?a.ul.width():c.wrapwidth,c.infinity=c.wrapwidth>=c.maxwidth?"off":c.infbackup,c.wrapoffset="center"===c.horizontal_align?(a.c.width()-f-e-c.wrapwidth)/2:0,c.wrapoffset="auto"!=a.sliderLayout&&a.outernav?0:c.wrapoffset<e?e:c.wrapoffset;var g="hidden";"3D"!=a.parallax.type&&"3d"!=a.parallax.type||(g="visible"),"right"===c.horizontal_align?punchgs.TweenLite.set(c.wrap,{left:"auto",right:c.wrapoffset+"px",width:c.wrapwidth,overflow:g}):punchgs.TweenLite.set(c.wrap,{right:"auto",left:c.wrapoffset+"px",width:c.wrapwidth,overflow:g}),c.inneroffset="right"===c.horizontal_align?c.wrapwidth-c.slide_width:0,c.realoffset=Math.abs(c.wrap.position().left),c.windhalf=jQuery(window).width()/2},f=function(a,b){return null===a||jQuery.isEmptyObject(a)?b:void 0===a?"right":a},g=function(a,c,d,e){var g=a.carousel;c=g.lastdirection=f(c,g.lastdirection);var h=new Object,i=d?punchgs.Power2.easeOut:g.easing;h.from=0,h.to=g.slide_offset_target,e=void 0===e?g.speed/1e3:e,e=d?.4:e,void 0!==g.positionanim&&g.positionanim.pause(),g.positionanim=punchgs.TweenLite.to(h,e,{from:h.to,onUpdate:function(){g.slide_offset=g.slide_globaloffset+h.from,g.slide_offset=b.simp(g.slide_offset,g.maxwidth),b.organiseCarousel(a,c,!1,!1)},onComplete:function(){g.slide_globaloffset="off"===g.infinity?g.slide_globaloffset+g.slide_offset_target:b.simp(g.slide_globaloffset+g.slide_offset_target,g.maxwidth),g.slide_offset=b.simp(g.slide_offset,g.maxwidth),b.organiseCarousel(a,c,!1,!0);var e=jQuery(a.li[g.focused]);a.c.find(".next-revslide").removeClass("next-revslide"),d&&b.callingNewSlide(a.c,e.data("index"))},ease:i})},h=function(a,b){return Math.abs(a)>Math.abs(b)?a>0?a-Math.abs(Math.floor(a/b)*b):a+Math.abs(Math.floor(a/b)*b):a},i=function(a,b,c){var c,c,d=b-a,e=b-c-a;return d=h(d,c),e=h(e,c),Math.abs(d)>Math.abs(e)?e:d},j=function(a){var c=0,d=a.carousel;if(void 0!==d.positionanim&&d.positionanim.kill(),"none"==d.slide_globaloffset)d.slide_globaloffset=c="center"===d.horizontal_align?d.wrapwidth/2-d.slide_width/2:0;else{d.slide_globaloffset=d.slide_offset,d.slide_offset=0;var e=a.c.find(".processing-revslide").index(),f="center"===d.horizontal_align?(d.wrapwidth/2-d.slide_width/2-d.slide_globaloffset)/d.slide_width:(0-d.slide_globaloffset)/d.slide_width;f=b.simp(f,a.slideamount,!1),e=e>=0?e:a.c.find(".active-revslide").index(),e=e>=0?e:0,c="off"===d.infinity?f-e:-i(f,e,a.slideamount),c*=d.slide_width}return c}}(jQuery);
/********************************************
 * REVOLUTION 5.0 EXTENSION - KEN BURN
 * @version: 1.2 (2.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(a){"use strict";var b=jQuery.fn.revolution,c={alias:"KenBurns Min JS",name:"revolution.extensions.kenburn.min.js",min_core:"5.0",version:"1.2.0"};jQuery.extend(!0,b,{stopKenBurn:function(a){return"stop"!==b.compare_version(c).check&&void(void 0!=a.data("kbtl")&&a.data("kbtl").pause())},startKenBurn:function(a,d,e){if("stop"===b.compare_version(c).check)return!1;var f=a.data(),g=a.find(".defaultimg"),h=g.data("lazyload")||g.data("src"),j=(f.owidth/f.oheight,"carousel"===d.sliderType?d.carousel.slide_width:d.ul.width()),k=d.ul.height();a.data("kbtl")&&a.data("kbtl").kill(),e=e||0,0==a.find(".tp-kbimg").length&&(a.append('<div class="tp-kbimg-wrap" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="'+h+'" style="position:absolute;" width="'+f.owidth+'" height="'+f.oheight+'"></div>'),a.data("kenburn",a.find(".tp-kbimg")));var m=function(a,b,c,d,e,f,g){var h=a*c,i=b*c,j=Math.abs(d-h),k=Math.abs(e-i),l=new Object;return l.l=(0-f)*j,l.r=l.l+h,l.t=(0-g)*k,l.b=l.t+i,l.h=f,l.v=g,l},n=function(a,b,c,d,e){var f=a.bgposition.split(" ")||"center center",g="center"==f[0]?"50%":"left"==f[0]||"left"==f[1]?"0%":"right"==f[0]||"right"==f[1]?"100%":f[0],h="center"==f[1]?"50%":"top"==f[0]||"top"==f[1]?"0%":"bottom"==f[0]||"bottom"==f[1]?"100%":f[1];g=parseInt(g,0)/100||0,h=parseInt(h,0)/100||0;var i=new Object;return i.start=m(e.start.width,e.start.height,e.start.scale,b,c,g,h),i.end=m(e.start.width,e.start.height,e.end.scale,b,c,g,h),i},o=function(a,b,c){var d=c.scalestart/100,e=c.scaleend/100,f=void 0!=c.offsetstart?c.offsetstart.split(" ")||[0,0]:[0,0],g=void 0!=c.offsetend?c.offsetend.split(" ")||[0,0]:[0,0];c.bgposition="center center"==c.bgposition?"50% 50%":c.bgposition;var h=new Object,i=a*d,k=(i/c.owidth*c.oheight,a*e);k/c.owidth*c.oheight;if(h.start=new Object,h.starto=new Object,h.end=new Object,h.endo=new Object,h.start.width=a,h.start.height=h.start.width/c.owidth*c.oheight,h.start.height<b){var m=b/h.start.height;h.start.height=b,h.start.width=h.start.width*m}h.start.transformOrigin=c.bgposition,h.start.scale=d,h.end.scale=e,c.rotatestart=0===c.rotatestart?.01:c.rotatestart,h.start.rotation=c.rotatestart+"deg",h.end.rotation=c.rotateend+"deg";var o=n(c,a,b,f,h);f[0]=parseFloat(f[0])+o.start.l,g[0]=parseFloat(g[0])+o.end.l,f[1]=parseFloat(f[1])+o.start.t,g[1]=parseFloat(g[1])+o.end.t;var p=o.start.r-o.start.l,q=o.start.b-o.start.t,r=o.end.r-o.end.l,s=o.end.b-o.end.t;return f[0]=f[0]>0?0:p+f[0]<a?a-p:f[0],g[0]=g[0]>0?0:r+g[0]<a?a-r:g[0],f[1]=f[1]>0?0:q+f[1]<b?b-q:f[1],g[1]=g[1]>0?0:s+g[1]<b?b-s:g[1],h.starto.x=f[0]+"px",h.starto.y=f[1]+"px",h.endo.x=g[0]+"px",h.endo.y=g[1]+"px",h.end.ease=h.endo.ease=c.ease,h.end.force3D=h.endo.force3D=!0,h};void 0!=a.data("kbtl")&&(a.data("kbtl").kill(),a.removeData("kbtl"));var p=a.data("kenburn"),q=p.parent(),r=o(j,k,f),s=new punchgs.TimelineLite;s.pause(),r.start.transformOrigin="0% 0%",r.starto.transformOrigin="0% 0%",s.add(punchgs.TweenLite.fromTo(p,f.duration/1e3,r.start,r.end),0),s.add(punchgs.TweenLite.fromTo(q,f.duration/1e3,r.starto,r.endo),0),s.progress(e),s.play(),a.data("kbtl",s)}})}(jQuery);
/************************************************
 * REVOLUTION 5.3 EXTENSION - LAYER ANIMATION
 * @version: 3.5.1 (09.12.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/
!function(a){"use strict";function p(a,b,c,d,e,f,g){var h=a.find(b);h.css("borderWidth",f+"px"),h.css(c,0-f+"px"),h.css(d,"0px solid transparent"),h.css(e,g)}var b=jQuery.fn.revolution,d=(b.is_mobile(),{alias:"LayerAnimation Min JS",name:"revolution.extensions.layeranimation.min.js",min_core:"5.3.1",version:"3.5.1"});jQuery.extend(!0,b,{updateMarkup:function(a,b){var c=jQuery(a).data();if(void 0!==c.start&&!c.frames_added&&void 0===c.frames){var d=new Array,e=m(f(),c.transform_in,void 0,!1),g=m(f(),c.transform_out,void 0,!1),h=m(f(),c.transform_hover,void 0,!1);jQuery.isNumeric(c.end)&&jQuery.isNumeric(c.start)&&jQuery.isNumeric(e.speed)&&(c.end=parseInt(c.end,0)-(parseInt(c.start,0)+parseFloat(e.speed,0))),d.push({frame:"0",delay:c.start,from:c.transform_in,to:c.transform_idle,split:c.splitin,speed:e.speed,ease:e.anim.ease,mask:c.mask_in,splitdelay:c.elementdelay}),d.push({frame:"5",delay:c.end,to:c.transform_out,split:c.splitout,speed:g.speed,ease:g.anim.ease,mask:c.mask_out,splitdelay:c.elementdelay}),c.transform_hover&&d.push({frame:"hover",to:c.transform_hover,style:c.style_hover,speed:h.speed,ease:h.anim.ease,splitdelay:c.elementdelay}),c.frames=d}if(!c.frames_added){if(c.inframeindex=0,c.outframeindex=-1,c.hoverframeindex=-1,void 0!==c.frames)for(var i=0;i<c.frames.length;i++)void 0===c.frames[0].from&&(c.frames[0].from="o:inherit"),0===c.frames[0].delay&&(c.frames[0].delay=20),"hover"===c.frames[i].frame?c.hoverframeindex=i:"frame_999"!==c.frames[i].frame&&"frame_out"!==c.frames[i].frame&&"last"!==c.frames[i].frame&&"end"!==c.frames[i].frame||(c.outframeindex=i),void 0!==c.frames[i].split&&c.frames[i].split.match(/chars|words|lines/g)&&(c.splittext=!0);c.outframeindex=c.outframeindex===-1?c.hoverframeindex===-1?c.frames.length-1:c.frames.length-2:c.outframeindex,c.frames_added=!0}},animcompleted:function(a,c){var d=a.data(),e=d.videotype,f=d.autoplay,g=d.autoplayonlyfirsttime;void 0!=e&&"none"!=e&&(1==f||"true"==f||"on"==f||"1sttime"==f||g?(("carousel"!==c.sliderType||"carousel"===c.sliderType&&"on"===c.carousel.showLayersAllTime&&a.closest("li").hasClass("active-revslide")||"carousel"===c.sliderType&&"on"!==c.carousel.showLayersAllTime&&a.closest("li").hasClass("active-revslide"))&&b.playVideo(a,c),b.toggleState(a.data("videotoggledby")),(g||"1sttime"==f)&&(d.autoplayonlyfirsttime=!1,d.autoplay="off")):("no1sttime"==f&&(d.datasetautoplay="on"),b.unToggleState(a.data("videotoggledby"))))},handleStaticLayers:function(a,b){var c=parseInt(a.data("startslide"),0),d=parseInt(a.data("endslide"),0);c<0&&(c=0),d<0&&(d=b.realslideamount),0===c&&d===b.realslideamount-1&&(d=b.realslideamount+1),a.data("startslide",c),a.data("endslide",d)},animateTheCaptions:function(a){if("stop"===b.compare_version(d).check)return!1;var c=a.opt,e=a.slide,f=a.recall,g=a.maintimeline,h=a.preset,i=a.startslideanimat,j="carousel"===c.sliderType?0:c.width/2-c.gridwidth[c.curWinRange]*c.bw/2,k=0,l=e.data("index");if(c.layers=c.layers||new Object,c.layers[l]=c.layers[l]||e.find(".tp-caption"),c.layers.static=c.layers.static||c.c.find(".tp-static-layers").find(".tp-caption"),void 0===c.timelines&&b.createTimelineStructure(c),c.conh=c.c.height(),c.conw=c.c.width(),c.ulw=c.ul.width(),c.ulh=c.ul.height(),c.debugMode){e.addClass("indebugmode"),e.find(".helpgrid").remove(),c.c.find(".hglayerinfo").remove(),e.append('<div class="helpgrid" style="width:'+c.gridwidth[c.curWinRange]*c.bw+"px;height:"+c.gridheight[c.curWinRange]*c.bw+'px;"></div>');var m=e.find(".helpgrid");m.append('<div class="hginfo">Zoom:'+Math.round(100*c.bw)+"% &nbsp;&nbsp;&nbsp; Device Level:"+c.curWinRange+"&nbsp;&nbsp;&nbsp; Grid Preset:"+c.gridwidth[c.curWinRange]+"x"+c.gridheight[c.curWinRange]+"</div>"),c.c.append('<div class="hglayerinfo"></div>'),m.append('<div class="tlhg"></div>')}void 0!==l&&c.layers[l]&&jQuery.each(c.layers[l],function(a,d){var e=jQuery(this);b.updateMarkup(this,c),b.prepareSingleCaption({caption:e,opt:c,offsetx:j,offsety:k,index:a,recall:f,preset:h}),h&&0!==i||b.buildFullTimeLine({caption:e,opt:c,offsetx:j,offsety:k,index:a,recall:f,preset:h,regenerate:0===i}),f&&"carousel"===c.sliderType&&"on"===c.carousel.showLayersAllTime&&b.animcompleted(e,c)}),c.layers.static&&jQuery.each(c.layers.static,function(a,d){var e=jQuery(this),g=e.data();g.hoveredstatus!==!0&&g.inhoveroutanimation!==!0?(b.updateMarkup(this,c),b.prepareSingleCaption({caption:e,opt:c,offsetx:j,offsety:k,index:a,recall:f,preset:h}),h&&0!==i||b.buildFullTimeLine({caption:e,opt:c,offsetx:j,offsety:k,index:a,recall:f,preset:h,regenerate:0===i}),f&&"carousel"===c.sliderType&&"on"===c.carousel.showLayersAllTime&&b.animcompleted(e,c)):b.prepareSingleCaption({caption:e,opt:c,offsetx:j,offsety:k,index:a,recall:f,preset:h})});var n=c.nextSlide===-1||void 0===c.nextSlide?0:c.nextSlide;n=n>c.rowzones.length?c.rowzones.length:n,void 0!=c.rowzones&&c.rowzones.length>0&&void 0!=c.rowzones[n]&&n>=0&&n<=c.rowzones.length&&c.rowzones[n].length>0&&b.setSize(c),h||void 0!==i&&(void 0!==l&&jQuery.each(c.timelines[l].layers,function(a,d){var e=d.layer.data();"none"!==d.wrapper&&void 0!==d.wrapper||("keep"==d.triggerstate&&"on"===e.triggerstate?b.playAnimationFrame({caption:d.layer,opt:c,frame:"frame_0",triggerdirection:"in",triggerframein:"frame_0",triggerframeout:"frame_999"}):d.timeline.restart(0))}),c.timelines.staticlayers&&jQuery.each(c.timelines.staticlayers.layers,function(a,d){var e=d.layer.data(),f=n>=d.firstslide&&n<=d.lastslide,g=n<d.firstslide||n>d.lastslide,h=d.timeline.getLabelTime("slide_"+d.firstslide),i=d.timeline.getLabelTime("slide_"+d.lastslide),j=e.static_layer_timeline_time,k="in"===e.animdirection||"out"!==e.animdirection&&void 0,l="bytrigger"===e.frames[0].delay,o=("bytrigger"===e.frames[e.frames.length-1].delay,e.triggered_startstatus),p=e.lasttriggerstate;e.hoveredstatus!==!0&&1!=e.inhoveroutanimation&&(void 0!==j&&k&&("keep"==p?(b.playAnimationFrame({caption:d.layer,opt:c,frame:"frame_0",triggerdirection:"in",triggerframein:"frame_0",triggerframeout:"frame_999"}),e.triggeredtimeline.time(j)):e.hoveredstatus!==!0&&d.timeline.time(j)),"reset"===p&&"hidden"===o&&(d.timeline.time(0),e.animdirection="out"),f?k?n===d.lastslide&&(d.timeline.play(i),e.animdirection="in"):(l||"in"===e.animdirection||d.timeline.play(h),("visible"==o&&"keep"!==p||"keep"===p&&k===!0||"visible"==o&&void 0===k)&&(d.timeline.play(h+.01),e.animdirection="in")):g&&k&&d.timeline.play("frame_999"))})),void 0!=g&&setTimeout(function(){g.resume()},30)},prepareSingleCaption:function(a){var c=a.caption,d=c.data(),e=a.opt,f=a.recall,g=a.recall,i=(a.preset,jQuery("body").hasClass("rtl"));if(d._pw=void 0===d._pw?c.closest(".tp-parallax-wrap"):d._pw,d._lw=void 0===d._lw?c.closest(".tp-loop-wrap"):d._lw,d._mw=void 0===d._mw?c.closest(".tp-mask-wrap"):d._mw,d._responsive=d.responsive||"on",d._respoffset=d.responsive_offset||"on",d._ba=d.basealign||"grid",d._gw="grid"===d._ba?e.width:e.ulw,d._gh="grid"===d._ba?e.height:e.ulh,d._lig=void 0===d._lig?c.hasClass("rev_layer_in_group")?c.closest(".rev_group"):c.hasClass("rev_layer_in_column")?c.closest(".rev_column_inner"):c.hasClass("rev_column_inner")?c.closest(".rev_row"):"none":d._lig,d._ingroup=void 0===d._ingroup?!(c.hasClass("rev_group")||!c.closest(".rev_group")):d._ingroup,d._isgroup=void 0===d._isgroup?!!c.hasClass("rev_group"):d._isgroup,d._nctype=d.type||"none",d._cbgc_auto=void 0===d._cbgc_auto?"column"===d._nctype&&d._pw.find(".rev_column_bg_auto_sized"):d._cbgc_auto,d._cbgc_man=void 0===d._cbgc_man?"column"===d._nctype&&d._pw.find(".rev_column_bg_man_sized"):d._cbgc_man,d._slideid=d._slideid||c.closest(".tp-revslider-slidesli").data("index"),d._id=void 0===d._id?c.data("id")||c.attr("id"):d._id,d._slidelink=void 0===d._slidelink?void 0!==c.hasClass("slidelink")&&c.hasClass("slidelink"):d._slidelink,void 0===d._li&&(c.hasClass("tp-static-layer")?(d._isstatic=!0,d._li=c.closest(".tp-static-layers"),d._slideid="staticlayers"):d._li=c.closest(".tp-revslider-slidesli")),d._row=void 0===d._row?"column"===d._nctype&&d._pw.closest(".rev_row"):d._row,void 0===d._togglelisteners&&c.find(".rs-toggled-content")?(d._togglelisteners=!0,void 0===d.actions&&c.click(function(){b.swaptoggleState(c)})):d._togglelisteners=!1,"fullscreen"==e.sliderLayout&&(a.offsety=d._gh/2-e.gridheight[e.curWinRange]*e.bh/2),("on"==e.autoHeight||void 0!=e.minHeight&&e.minHeight>0)&&(a.offsety=e.conh/2-e.gridheight[e.curWinRange]*e.bh/2),a.offsety<0&&(a.offsety=0),e.debugMode){c.closest("li").find(".helpgrid").css({top:a.offsety+"px",left:a.offsetx+"px"});var k=e.c.find(".hglayerinfo");c.on("hover, mouseenter",function(){var a="";c.data()&&jQuery.each(c.data(),function(b,c){"object"!=typeof c&&(a=a+'<span style="white-space:nowrap"><span style="color:#27ae60">'+b+":</span>"+c+"</span>&nbsp; &nbsp; ")}),k.html(a)})}var m=void 0===d.visibility?"oon":o(d.visibility,e)[e.forcedWinRange]||o(d.visibility,e)||"ooon";if("off"===m||d._gw<e.hideCaptionAtLimit&&"on"==d.captionhidden||d._gw<e.hideAllCaptionAtLimit?d._pw.addClass("tp-hidden-caption"):d._pw.removeClass("tp-hidden-caption"),d.layertype="html",a.offsetx<0&&(a.offsetx=0),void 0!=d.thumbimage&&void 0==d.videoposter&&(d.videoposter=d.thumbimage),c.find("img").length>0){var n=c.find("img");d.layertype="image",0==n.width()&&n.css({width:"auto"}),0==n.height()&&n.css({height:"auto"}),void 0==n.data("ww")&&n.width()>0&&n.data("ww",n.width()),void 0==n.data("hh")&&n.height()>0&&n.data("hh",n.height());var q=n.data("ww"),t=n.data("hh"),v="slide"==d._ba?e.ulw:e.gridwidth[e.curWinRange],w="slide"==d._ba?e.ulh:e.gridheight[e.curWinRange];q=o(n.data("ww"),e)[e.curWinRange]||o(n.data("ww"),e)||"auto",t=o(n.data("hh"),e)[e.curWinRange]||o(n.data("hh"),e)||"auto";var x="full"===q||"full-proportional"===q,y="full"===t||"full-proportional"===t;if("full-proportional"===q){var z=n.data("owidth"),A=n.data("oheight");z/v<A/w?(q=v,t=A*(v/z)):(t=w,q=z*(w/A))}else q=x?v:!jQuery.isNumeric(q)&&q.indexOf("%")>0?q:parseFloat(q),t=y?w:!jQuery.isNumeric(t)&&t.indexOf("%")>0?t:parseFloat(t);q=void 0===q?0:q,t=void 0===t?0:t,"off"!==d._responsive?("grid"!=d._ba&&x?jQuery.isNumeric(q)?n.css({width:q+"px"}):n.css({width:q}):jQuery.isNumeric(q)?n.css({width:q*e.bw+"px"}):n.css({width:q}),"grid"!=d._ba&&y?jQuery.isNumeric(t)?n.css({height:t+"px"}):n.css({height:t}):jQuery.isNumeric(t)?n.css({height:t*e.bh+"px"}):n.css({height:t})):n.css({width:q,height:t}),d._ingroup&&"row"!==d._nctype&&(void 0!==q&&!jQuery.isNumeric(q)&&q.indexOf("%")>0&&punchgs.TweenLite.set([d._lw,d._pw,d._mw],{minWidth:q}),void 0!==t&&!jQuery.isNumeric(t)&&t.indexOf("%")>0&&punchgs.TweenLite.set([d._lw,d._pw,d._mw],{minHeight:t}))}if("slide"===d._ba)a.offsetx=0,a.offsety=0;else if(d._isstatic&&void 0!==e.carousel&&void 0!==e.carousel.horizontal_align&&"carousel"===e.sliderType){switch(e.carousel.horizontal_align){case"center":a.offsetx=0+(e.ulw-e.gridwidth[e.curWinRange]*e.bw)/2;break;case"left":break;case"right":a.offsetx=e.ulw-e.gridwidth[e.curWinRange]*e.bw}a.offsetx=a.offsetx<0?0:a.offsetx}var B="html5"==d.audio?"audio":"video";if(c.hasClass("tp-videolayer")||c.hasClass("tp-audiolayer")||c.find("iframe").length>0||c.find(B).length>0){if(d.layertype="video",b.manageVideoLayer&&b.manageVideoLayer(c,e,f,g),!f&&!g){d.videotype;b.resetVideo&&b.resetVideo(c,e,a.preset)}var D=d.aspectratio;void 0!=D&&D.split(":").length>1&&b.prepareCoveredVideo(D,e,c);var n=c.find("iframe")?c.find("iframe"):n=c.find(B),E=!c.find("iframe"),F=c.hasClass("coverscreenvideo");n.css({display:"block"}),void 0==c.data("videowidth")&&(c.data("videowidth",n.width()),c.data("videoheight",n.height()));var q=o(c.data("videowidth"),e)[e.curWinRange]||o(c.data("videowidth"),e)||"auto",t=o(c.data("videoheight"),e)[e.curWinRange]||o(c.data("videoheight"),e)||"auto";!jQuery.isNumeric(q)&&q.indexOf("%")>0?t=parseFloat(t)*e.bh+"px":(q=parseFloat(q)*e.bw+"px",t=parseFloat(t)*e.bh+"px"),d.cssobj=void 0===d.cssobj?r(c,0):d.cssobj;var G=s(d.cssobj,e);if("auto"==G.lineHeight&&(G.lineHeight=G.fontSize+4),c.hasClass("fullscreenvideo")||F){a.offsetx=0,a.offsety=0,c.data("x",0),c.data("y",0);var H=d._gh;"on"==e.autoHeight&&(H=e.conh),c.css({width:d._gw,height:H})}else punchgs.TweenLite.set(c,{paddingTop:Math.round(G.paddingTop*e.bh)+"px",paddingBottom:Math.round(G.paddingBottom*e.bh)+"px",paddingLeft:Math.round(G.paddingLeft*e.bw)+"px",paddingRight:Math.round(G.paddingRight*e.bw)+"px",marginTop:G.marginTop*e.bh+"px",marginBottom:G.marginBottom*e.bh+"px",marginLeft:G.marginLeft*e.bw+"px",marginRight:G.marginRight*e.bw+"px",borderTopWidth:Math.round(G.borderTopWidth*e.bh)+"px",borderBottomWidth:Math.round(G.borderBottomWidth*e.bh)+"px",borderLeftWidth:Math.round(G.borderLeftWidth*e.bw)+"px",borderRightWidth:Math.round(G.borderRightWidth*e.bw)+"px",width:q,height:t});(0==E&&!F||1!=d.forcecover&&!c.hasClass("fullscreenvideo")&&!F)&&(n.width(q),n.height(t)),d._ingroup&&null!==d.videowidth&&void 0!==d.videowidth&&!jQuery.isNumeric(d.videowidth)&&d.videowidth.indexOf("%")>0&&punchgs.TweenLite.set([d._lw,d._pw,d._mw],{minWidth:d.videowidth})}u(c,e,0,d._responsive),c.hasClass("tp-resizeme")&&c.find("*").each(function(){u(jQuery(this),e,"rekursive",d._responsive)});var I=c.outerHeight(),J=c.css("backgroundColor");p(c,".frontcorner","left","borderRight","borderTopColor",I,J),p(c,".frontcornertop","left","borderRight","borderBottomColor",I,J),p(c,".backcorner","right","borderLeft","borderBottomColor",I,J),p(c,".backcornertop","right","borderLeft","borderTopColor",I,J),"on"==e.fullScreenAlignForce&&(a.offsetx=0,a.offsety=0),d.arrobj=new Object,d.arrobj.voa=o(d.voffset,e)[e.curWinRange]||o(d.voffset,e)[0],d.arrobj.hoa=o(d.hoffset,e)[e.curWinRange]||o(d.hoffset,e)[0],d.arrobj.elx=o(d.x,e)[e.curWinRange]||o(d.x,e)[0],d.arrobj.ely=o(d.y,e)[e.curWinRange]||o(d.y,e)[0];var K=0==d.arrobj.voa.length?0:d.arrobj.voa,L=0==d.arrobj.hoa.length?0:d.arrobj.hoa,M=0==d.arrobj.elx.length?0:d.arrobj.elx,N=0==d.arrobj.ely.length?0:d.arrobj.ely;d.eow=c.outerWidth(!0),d.eoh=c.outerHeight(!0),0==d.eow&&0==d.eoh&&(d.eow=e.ulw,d.eoh=e.ulh);var O="off"!==d._respoffset?parseInt(K,0)*e.bw:parseInt(K,0),P="off"!==d._respoffset?parseInt(L,0)*e.bw:parseInt(L,0),Q="grid"===d._ba?e.gridwidth[e.curWinRange]*e.bw:d._gw,R="grid"===d._ba?e.gridheight[e.curWinRange]*e.bw:d._gh;"on"==e.fullScreenAlignForce&&(Q=e.ulw,R=e.ulh),"none"!==d._lig&&void 0!=d._lig&&(Q=d._lig.width(),R=d._lig.height(),a.offsetx=0,a.offsety=0),M="center"===M||"middle"===M?Q/2-d.eow/2+P:"left"===M?P:"right"===M?Q-d.eow-P:"off"!==d._respoffset?M*e.bw:M,N="center"==N||"middle"==N?R/2-d.eoh/2+O:"top"==N?O:"bottom"==N?R-d.eoh-O:"off"!==d._respoffset?N*e.bw:N,i&&!d._slidelink&&(M+=d.eow),d._slidelink&&(M=0),d.calcx=parseInt(M,0)+a.offsetx,d.calcy=parseInt(N,0)+a.offsety;var S=c.css("z-Index");if("row"!==d._nctype&&"column"!==d._nctype)punchgs.TweenLite.set(d._pw,{zIndex:S,top:d.calcy,left:d.calcx,overwrite:"auto"});else if("row"!==d._nctype)punchgs.TweenLite.set(d._pw,{zIndex:S,width:d.columnwidth,top:0,left:0,overwrite:"auto"});else if("row"===d._nctype){var T="grid"===d._ba?Q+"px":"100%";punchgs.TweenLite.set(d._pw,{zIndex:S,width:T,top:0,left:a.offsetx,overwrite:"auto"})}void 0!==d.blendmode&&punchgs.TweenLite.set(d._pw,{mixBlendMode:d.blendmode}),"row"===d._nctype&&(d.columnbreak<=e.curWinRange?c.addClass("rev_break_columns"):c.removeClass("rev_break_columns")),"on"==d.loopanimation&&punchgs.TweenLite.set(d._lw,{minWidth:d.eow,minHeight:d.eoh}),d._ingroup&&"row"!==d._nctype&&(void 0!==d._groupw&&!jQuery.isNumeric(d._groupw)&&d._groupw.indexOf("%")>0&&punchgs.TweenLite.set([d._lw,d._pw,d._mw],{minWidth:d._groupw}),void 0!==d._grouph&&!jQuery.isNumeric(d._grouph)&&d._grouph.indexOf("%")>0&&punchgs.TweenLite.set([d._lw,d._pw,d._mw],{minHeight:d._grouph}))},createTimelineStructure:function(a){function b(a,b,c,d){var f,e=new punchgs.TimelineLite({paused:!0});c=c||new Object,c[a.attr("id")]=c[a.attr("id")]||new Object,"staticlayers"===d&&(c[a.attr("id")].firstslide=a.data("startslide"),c[a.attr("id")].lastslide=a.data("endslide")),a.data("slideid",d),c[a.attr("id")].defclasses=f=a[0].className,c[a.attr("id")].wrapper=f.indexOf("rev_layer_in_column")>=0?a.closest(".rev_column_inner"):f.indexOf("rev_column_inner")>=0?a.closest(".rev_row"):f.indexOf("rev_layer_in_group")>=0?a.closest(".rev_group"):"none",c[a.attr("id")].timeline=e,c[a.attr("id")].layer=a,c[a.attr("id")].triggerstate=a.data("lasttriggerstate"),c[a.attr("id")].dchildren=f.indexOf("rev_row")>=0?a[0].getElementsByClassName("rev_column_inner"):f.indexOf("rev_column_inner")>=0?a[0].getElementsByClassName("tp-caption"):f.indexOf("rev_group")>=0?a[0].getElementsByClassName("rev_layer_in_group"):"none",a.data("timeline",e)}a.timelines=a.timelines||new Object,a.c.find(".tp-revslider-slidesli, .tp-static-layers").each(function(){var c=jQuery(this),d=c.data("index");a.timelines[d]=a.timelines[d]||{},a.timelines[d].layers=a.timelines[d].layers||new Object,c.find(".tp-caption").each(function(c){b(jQuery(this),a,a.timelines[d].layers,d)})})},buildFullTimeLine:function(a){var k,l,c=a.caption,d=c.data(),f=a.opt,i={},n=j();if(k=f.timelines[d._slideid].layers[d._id],!k.generated||a.regenerate===!0){if(l=k.timeline,k.generated=!0,void 0!==d.current_timeline&&a.regenerate!==!0?(d.current_timeline_pause=d.current_timeline.paused(),d.current_timeline_time=d.current_timeline.time(),d.current_is_nc_timeline=l===d.current_timeline,d.static_layer_timeline_time=d.current_timeline_time):(d.static_layer_timeline_time=d.current_timeline_time,d.current_timeline_time=0,d.current_timeline&&d.current_timeline.clear()),l.clear(),i.svg=void 0!=d.svg_src&&c.find("svg"),i.svg&&(d.idlesvg=h(d.svg_idle,g())),d.hoverframeindex!==-1&&void 0!==d.hoverframeindex&&!c.hasClass("rs-hover-ready")){if(c.addClass("rs-hover-ready"),d.hovertimelines={},d.hoveranim=m(n,d.frames[d.hoverframeindex].to),d.hoveranim=q(d.hoveranim,d.frames[d.hoverframeindex].style),i.svg){var p=h(d.svg_hover,g());void 0!=d.hoveranim.anim.color&&(p.anim.fill=d.hoveranim.anim.color,d.idlesvg.anim.fill=i.svg.css("color")),d.hoversvg=p}c.hover(function(a){var b={caption:jQuery(a.currentTarget),opt:f,firstframe:"frame_0",lastframe:"frame_999"},d=(e(b),b.caption),g=d.data(),h=g.frames[g.hoverframeindex],j=!0;g.forcehover=h.force,j&&(g.hovertimelines.item=punchgs.TweenLite.to(d,h.speed/1e3,g.hoveranim.anim),(g.hoverzIndex||g.hoveranim.anim&&g.hoveranim.anim.zIndex)&&(g.basiczindex=void 0===g.basiczindex?g.cssobj.zIndex:g.basiczindex,g.hoverzIndex=void 0===g.hoverzIndex?g.hoveranim.anim.zIndex:g.hoverzIndex,g.inhoverinanimation=!0,0===h.speed&&(g.inhoverinanimation=!1),g.hovertimelines.pwhoveranim=punchgs.TweenLite.to(g._pw,h.speed/1e3,{overwrite:"auto",zIndex:g.hoverzIndex}),g.hovertimelines.pwhoveranim.eventCallback("onComplete",function(a){a.inhoverinanimation=!1},[g])),i.svg&&(g.hovertimelines.svghoveranim=punchgs.TweenLite.to([i.svg,i.svg.find("path")],h.speed/1e3,g.hoversvg.anim)),g.hoveredstatus=!0)},function(a){var b={caption:jQuery(a.currentTarget),opt:f,firstframe:"frame_0",lastframe:"frame_999"},d=(e(b),b.caption),g=d.data(),h=g.frames[g.hoverframeindex],j=!0;j&&(g.hoveredstatus=!1,g.inhoveroutanimation=!0,g.hovertimelines.item.pause(),g.hovertimelines.item=punchgs.TweenLite.to(d,h.speed/1e3,jQuery.extend(!0,{},g._gsTransformTo)),0==h.speed&&(g.inhoveroutanimation=!1),g.hovertimelines.item.eventCallback("onComplete",function(a){a.inhoveroutanimation=!1},[g]),void 0!==g.hovertimelines.pwhoveranim&&(g.hovertimelines.pwhoveranim=punchgs.TweenLite.to(g._pw,h.speed/1e3,{overwrite:"auto",zIndex:g.basiczindex})),i.svg&&punchgs.TweenLite.to([i.svg,i.svg.find("path")],h.speed/1e3,g.idlesvg.anim))})}for(var r=0;r<d.frames.length;r++)if(r!==d.hoverframeindex){var s=r===d.inframeindex?"frame_0":r===d.outframeindex||"frame_999"===d.frames[r].frame?"frame_999":"frame_"+r;d.frames[r].framename=s,k[s]={},k[s].timeline=new punchgs.TimelineLite({align:"normal"});var t=d.frames[r].delay,v=(d.triggered_startstatus,void 0!==t?jQuery.inArray(t,["slideenter","bytrigger","wait"])>=0?t:parseInt(t,0)/1e3:"wait");void 0!==k.firstslide&&"frame_0"===s&&(l.addLabel("slide_"+k.firstslide+"_pause",0),l.addPause("slide_"+k.firstslide+"_pause"),l.addLabel("slide_"+k.firstslide,"+=0.005")),void 0!==k.lastslide&&"frame_999"===s&&(l.addLabel("slide_"+k.lastslide+"_pause","+=0.01"),l.addPause("slide_"+k.lastslide+"_pause"),l.addLabel("slide_"+k.lastslide,"+=0.005")),jQuery.isNumeric(v)?l.addLabel(s,"+="+v):(l.addLabel("pause_"+r,"+=0.01"),l.addPause("pause_"+r),l.addLabel(s,"+=0.01")),l=b.createFrameOnTimeline({caption:a.caption,timeline:l,label:s,frameindex:r,opt:f})}a.regenerate||(d.current_is_nc_timeline&&(d.current_timeline=l),d.current_timeline_pause?l.pause(d.current_timeline_time):l.time(d.current_timeline_time))}},createFrameOnTimeline:function(a){var c=a.caption,d=c.data(),e=a.label,g=a.timeline,h=a.frameindex,j=a.opt,k=c,o={},p=j.timelines[d._slideid].layers[d._id],q=d.frames.length-1,r=d.frames[h].split;if(d.hoverframeindex!==-1&&d.hoverframeindex==q&&(q-=1),o.content=new punchgs.TimelineLite({align:"normal"}),o.mask=new punchgs.TimelineLite({align:"normal"}),void 0===g.vars.id&&(g.vars.id=Math.round(1e5*Math.random())),"column"===d._nctype&&(g.add(punchgs.TweenLite.set(d._cbgc_man,{display:"block"}),e),g.add(punchgs.TweenLite.set(d._cbgc_auto,{display:"none"}),e)),void 0===d.mySplitText&&d.splittext){var s=c.find("a").length>0?c.find("a"):c;d.mySplitText=new punchgs.SplitText(s,{type:"chars,words,lines",charsClass:"tp-splitted tp-charsplit",wordsClass:"tp-splitted tp-wordsplit",linesClass:"tp-splitted tp-linesplit"}),c.addClass("splitted")}void 0!==d.mySplitText&&r&&r.match(/chars|words|lines/g)&&(k=d.mySplitText[r]);var y,z,t=h!==d.outframeindex?m(f(),d.frames[h].to):void 0!==d.frames[h].to&&null===d.frames[h].to.match(/auto:auto/g)?m(i(),d.frames[h].to,1==j.sdir):m(i(),d.frames[d.inframeindex].from,0==j.sdir),u=void 0!==d.frames[h].from?m(t,d.frames[d.inframeindex].from,1==j.sdir):void 0,x=d.frames[h].splitdelay;if(0!==h||a.fromcurrentstate?z=n(d.frames[h].mask):y=n(d.frames[h].mask),t.anim.ease=void 0===d.frames[h].ease?punchgs.Power1.easeInOut:d.frames[h].ease,void 0!==u&&(u.anim.ease=void 0===d.frames[h].ease?punchgs.Power1.easeInOut:d.frames[h].ease,u.speed=void 0===d.frames[h].speed?u.speed:d.frames[h].speed,u.anim.x=u.anim.x*j.bw||l(u.anim.x,j,d.eow,d.eoh,d.calcy,d.calcx,"horizontal"),u.anim.y=u.anim.y*j.bw||l(u.anim.y,j,d.eow,d.eoh,d.calcy,d.calcx,"vertical")),void 0!==t&&(t.anim.ease=void 0===d.frames[h].ease?punchgs.Power1.easeInOut:d.frames[h].ease,t.speed=void 0===d.frames[h].speed?t.speed:d.frames[h].speed,t.anim.x=t.anim.x*j.bw||l(t.anim.x,j,d.eow,d.eoh,d.calcy,d.calcx,"horizontal"),t.anim.y=t.anim.y*j.bw||l(t.anim.y,j,d.eow,d.eoh,d.calcy,d.calcx,"vertical")),c.data("iframes")&&g.add(punchgs.TweenLite.set(c.find("iframe"),{autoAlpha:1}),e+"+=0.001"),h===d.outframeindex&&(d.frames[h].to&&d.frames[h].to.match(/auto:auto/g),t.speed=void 0===d.frames[h].speed||"inherit"===d.frames[h].speed?d.frames[d.inframeindex].speed:d.frames[h].speed,t.anim.ease=void 0===d.frames[h].ease||"inherit"===d.frames[h].ease?d.frames[d.inframeindex].ease:d.frames[h].ease,t.anim.overwrite="auto"),0!==h||a.fromcurrentstate)0===h&&a.fromcurrentstate&&(t.speed=u.speed);else{if(k!=c){var A=jQuery.extend({},t.anim,!0);g.add(punchgs.TweenLite.set(c,t.anim),e),t=f(),t.ease=A.ease,void 0!==A.filter&&(t.anim.filter=A.filter),void 0!==A["-webkit-filter"]&&(t.anim["-webkit-filter"]=A["-webkit-filter"])}u.anim.visibility="hidden",u.anim.immediateRender=!0,t.anim.visibility="visible"}return a.fromcurrentstate&&(t.anim.immediateRender=!0),0!==h||a.fromcurrentstate?g.add(o.content.staggerTo(k,t.speed/1e3,t.anim,x),e):g.add(o.content.staggerFromTo(k,u.speed/1e3,u.anim,t.anim,x),e),void 0===z||z===!1||0===h&&a.ignorefirstframe||(z.anim.ease=void 0===z.anim.ease||"inherit"===z.anim.ease?d.frames[0].ease:z.anim.ease,z.anim.overflow="hidden",z.anim.x=z.anim.x*j.bw||l(z.anim.x,j,d.eow,d.eoh,d.calcy,d.calcx,"horizontal"),z.anim.y=z.anim.y*j.bw||l(z.anim.y,j,d.eow,d.eoh,d.calcy,d.calcx,"vertical")),0===h&&y&&y!==!1&&!a.fromcurrentstate||0===h&&a.ignorefirstframe?(z=new Object,z.anim=new Object,z.anim.overwrite="auto",z.anim.ease=t.anim.ease,z.anim.x=z.anim.y=0,y&&y!==!1&&(y.anim.x=y.anim.x*j.bw||l(y.anim.x,j,d.eow,d.eoh,d.calcy,d.calcx,"horizontal"),y.anim.y=y.anim.y*j.bw||l(y.anim.y,j,d.eow,d.eoh,d.calcy,d.calcx,"vertical"),y.anim.overflow="hidden")):0===h&&g.add(o.mask.set(d._mw,{overflow:"visible"}),e),void 0!==y&&void 0!==z&&y!==!1&&z!==!1?g.add(o.mask.fromTo(d._mw,u.speed/1e3,y.anim,z.anim,x),e):void 0!==z&&z!==!1&&g.add(o.mask.to(d._mw,t.speed/1e3,z.anim,x),e),g.addLabel(e+"_end"),d._gsTransformTo&&h===q&&d.hoveredstatus&&(d.hovertimelines.item=punchgs.TweenLite.to(c,0,d._gsTransformTo)),d._gsTransformTo=!1,o.content.eventCallback("onStart",function(a,c,d,e,f,g,h,i){var k={};if(k.layer=h,k.eventtype=0===a?"enterstage":a===e.outframeindex?"leavestage":"framestarted",k.layertype=h.data("layertype"),e.active=!0,k.frame_index=a,k.layersettings=h.data(),j.c.trigger("revolution.layeraction",[k]),"on"==e.loopanimation&&w(e._lw,j.bw),"enterstage"===k.eventtype&&(e.animdirection="in",e.visibleelement=!0,b.toggleState(e.layertoggledby)),"none"!==c.dchildren&&void 0!==c.dchildren&&c.dchildren.length>0)if(0===a)for(var l=0;l<c.dchildren.length;l++)jQuery(c.dchildren[l]).data("timeline").play(0);else if(a===e.outframeindex)for(var l=0;l<c.dchildren.length;l++)b.endMoveCaption({caption:jQuery(c.dchildren[l]),opt:j,checkchildrens:!0});punchgs.TweenLite.set(d,{visibility:"visible"}),e.current_frame=a,e.current_timeline=f,e.current_timeline_time=f.time(),i&&(e.static_layer_timeline_time=e.current_timeline_time),e.last_frame_started=a},[h,p,d._pw,d,g,t.anim,c,a.updateStaticTimeline]),o.content.eventCallback("onUpdate",function(a,b,d,e,f,g,h,i){"column"===e._nctype&&v(c,j),punchgs.TweenLite.set(d,{visibility:"visible"}),e.current_frame=g,e.current_timeline=f,e.current_timeline_time=f.time(),i&&(e.static_layer_timeline_time=e.current_timeline_time),void 0!==e.hoveranim&&e._gsTransformTo===!1&&(e._gsTransformTo=h,e._gsTransformTo&&e._gsTransformTo.startAt&&delete e._gsTransformTo.startAt,void 0===e.cssobj.styleProps.css?e._gsTransformTo=jQuery.extend(!0,{},e.cssobj.styleProps,e._gsTransformTo):e._gsTransformTo=jQuery.extend(!0,{},e.cssobj.styleProps.css,e._gsTransformTo)),e.visibleelement=!0},[e,d._id,d._pw,d,g,h,jQuery.extend(!0,{},t.anim),a.updateStaticTimeline]),o.content.eventCallback("onComplete",function(a,d,e,f,g,h,i){var k={};k.layer=c,k.eventtype=0===a?"enteredstage":a===d-1||a===e?"leftstage":"frameended",k.layertype=c.data("layertype"),k.layersettings=c.data(),j.c.trigger("revolution.layeraction",[k]),"leftstage"!==k.eventtype&&b.animcompleted(c,j),"leftstage"===k.eventtype&&b.stopVideo&&b.stopVideo(c,j),"column"===g._nctype&&(punchgs.TweenLite.set(g._cbgc_man,{display:"none"}),punchgs.TweenLite.set(g._cbgc_auto,{display:"block"})),"leftstage"===k.eventtype&&(g.active=!1,punchgs.TweenLite.set(f,{visibility:"hidden",overwrite:"auto"}),g.animdirection="out",g.visibleelement=!1,b.unToggleState(g.layertoggledby)),g.current_frame=a,g.current_timeline=h,g.current_timeline_time=h.time(),i&&(g.static_layer_timeline_time=g.current_timeline_time)},[h,d.frames.length,q,d._pw,d,g,a.updateStaticTimeline]),g},endMoveCaption:function(a){a.firstframe="frame_0",a.lastframe="frame_999";var c=e(a),d=a.caption.data();if(void 0!==a.frame?c.timeline.play(a.frame):(!c.static||a.currentslide>=c.removeonslide||a.currentslide<c.showonslide)&&(c.outnow=new punchgs.TimelineLite,c.timeline.pause(),d.visibleelement===!0&&b.createFrameOnTimeline({caption:a.caption,timeline:c.outnow,label:"outnow",frameindex:a.caption.data("outframeindex"),opt:a.opt,fromcurrentstate:!0}).play()),a.checkchildrens&&c.timeline_obj&&c.timeline_obj.dchildren&&"none"!==c.timeline_obj.dchildren&&c.timeline_obj.dchildren.length>0)for(var f=0;f<c.timeline_obj.dchildren.length;f++)b.endMoveCaption({caption:jQuery(c.timeline_obj.dchildren[f]),opt:a.opt})},playAnimationFrame:function(a){a.firstframe=a.triggerframein,a.lastframe=a.triggerframeout;var f,c=e(a),d=a.caption.data(),g=0;for(var h in d.frames)d.frames[h].framename===a.frame&&(f=g),g++;void 0!==d.triggeredtimeline&&d.triggeredtimeline.pause(),d.triggeredtimeline=new punchgs.TimelineLite,c.timeline.pause();var i=d.visibleelement===!0;d.triggeredtimeline=b.createFrameOnTimeline({caption:a.caption,timeline:d.triggeredtimeline,label:"triggered",frameindex:f,updateStaticTimeline:!0,opt:a.opt,ignorefirstframe:!0,fromcurrentstate:i}).play()},removeTheCaptions:function(a,c){if("stop"===b.compare_version(d).check)return!1;var f=a.data("index"),g=new Array;c.layers[f]&&jQuery.each(c.layers[f],function(a,b){g.push(b)});var h=b.currentSlideIndex(c);g&&jQuery.each(g,function(a){var d=jQuery(this);"carousel"===c.sliderType&&"on"===c.carousel.showLayersAllTime?(clearTimeout(d.data("videoplaywait")),b.stopVideo&&b.stopVideo(d,c),b.removeMediaFromList&&b.removeMediaFromList(d,c),c.lastplayedvideos=[]):(x(d),clearTimeout(d.data("videoplaywait")),b.endMoveCaption({caption:d,opt:c,currentslide:h}),b.removeMediaFromList&&b.removeMediaFromList(d,c),c.lastplayedvideos=[])})}});var e=function(a){var b={};return a.firstframe=void 0===a.firstframe?"frame_0":a.firstframe,a.lastframe=void 0===a.lastframe?"frame_999":a.lastframe,b.id=a.caption.data("id")||a.caption.attr("id"),b.slideid=a.caption.data("slideid")||a.caption.closest(".tp-revslider-slidesli").data("index"),b.timeline_obj=a.opt.timelines[b.slideid].layers[b.id],b.timeline=b.timeline_obj.timeline,b.ffs=b.timeline.getLabelTime(a.firstframe),b.ffe=b.timeline.getLabelTime(a.firstframe+"_end"),b.lfs=b.timeline.getLabelTime(a.lastframe),b.lfe=b.timeline.getLabelTime(a.lastframe+"_end"),b.ct=b.timeline.time(),b.static=void 0!=b.timeline_obj.firstslide||void 0!=b.timeline_obj.lastslide,b.static&&(b.showonslide=b.timeline_obj.firstslide,b.removeonslide=b.timeline_obj.lastslide),b},f=function(a){return a=void 0===a?new Object:a,a.anim=void 0===a.anim?new Object:a.anim,a.anim.x=void 0===a.anim.x?0:a.anim.x,a.anim.y=void 0===a.anim.y?0:a.anim.y,a.anim.z=void 0===a.anim.z?0:a.anim.z,a.anim.rotationX=void 0===a.anim.rotationX?0:a.anim.rotationX,a.anim.rotationY=void 0===a.anim.rotationY?0:a.anim.rotationY,a.anim.rotationZ=void 0===a.anim.rotationZ?0:a.anim.rotationZ,a.anim.scaleX=void 0===a.anim.scaleX?1:a.anim.scaleX,a.anim.scaleY=void 0===a.anim.scaleY?1:a.anim.scaleY,a.anim.skewX=void 0===a.anim.skewX?0:a.anim.skewX,a.anim.skewY=void 0===a.anim.skewY?0:a.anim.skewY,a.anim.opacity=void 0===a.anim.opacity?1:a.anim.opacity,a.anim.transformOrigin=void 0===a.anim.transformOrigin?"50% 50%":a.anim.transformOrigin,a.anim.transformPerspective=void 0===a.anim.transformPerspective?600:a.anim.transformPerspective,a.anim.rotation=void 0===a.anim.rotation?0:a.anim.rotation,a.anim.force3D=void 0===a.anim.force3D?"auto":a.anim.force3D,a.anim.autoAlpha=void 0===a.anim.autoAlpha?1:a.anim.autoAlpha,a.anim.visibility=void 0===a.anim.visibility?"visible":a.anim.visibility,a.anim.overwrite=void 0===a.anim.overwrite?"auto":a.anim.overwrite,a.speed=void 0===a.speed?.3:a.speed,a.filter=void 0===a.filter?"blur(0px) grayscale(0px)":a.filter,a["-webkit-filter"]=void 0===a["-webkit-filter"]?"blur(0px) grayscale(0px)":a["-webkit-filter"],a},g=function(){var a=new Object;return a.anim=new Object,a.anim.stroke="none",a.anim.strokeWidth=0,a.anim.strokeDasharray="none",a.anim.strokeDashoffset="0",a},h=function(a,b){var c=a.split(";");return c&&jQuery.each(c,function(a,c){var d=c.split(":"),e=d[0],f=d[1];"sc"==e&&(b.anim.stroke=f),"sw"==e&&(b.anim.strokeWidth=f),"sda"==e&&(b.anim.strokeDasharray=f),"sdo"==e&&(b.anim.strokeDashoffset=f)}),b},i=function(){var a=new Object;return a.anim=new Object,a.anim.x=0,a.anim.y=0,a.anim.z=0,a},j=function(){var a=new Object;return a.anim=new Object,a.speed=.2,a},k=function(a,b){if(jQuery.isNumeric(parseFloat(a)))return parseFloat(a);if(void 0===a||"inherit"===a)return b;
if(a.split("{").length>1){var c=a.split(","),d=parseFloat(c[1].split("}")[0]);c=parseFloat(c[0].split("{")[1]),a=Math.random()*(d-c)+c}return a},l=function(a,b,c,d,e,f,g){return!jQuery.isNumeric(a)&&a.match(/%]/g)?(a=a.split("[")[1].split("]")[0],"horizontal"==g?a=(c+2)*parseInt(a,0)/100:"vertical"==g&&(a=(d+2)*parseInt(a,0)/100)):(a="layer_left"===a?0-c:"layer_right"===a?c:a,a="layer_top"===a?0-d:"layer_bottom"===a?d:a,a="left"===a||"stage_left"===a?0-c-f:"right"===a||"stage_right"===a?b.conw-f:"center"===a||"stage_center"===a?b.conw/2-c/2-f:a,a="top"===a||"stage_top"===a?0-d-e:"bottom"===a||"stage_bottom"===a?b.conh-e:"middle"===a||"stage_middle"===a?b.conh/2-d/2-e:a),a},m=function(a,b,c){var d=new Object;if(d=jQuery.extend(!0,{},d,a),void 0===b)return d;var e=b.split(";"),f="";return e&&jQuery.each(e,function(a,b){var e=b.split(":"),g=e[0],h=e[1];c&&void 0!=h&&h.length>0&&h.match(/\(R\)/)&&(h=h.replace("(R)",""),h="right"===h?"left":"left"===h?"right":"top"===h?"bottom":"bottom"===h?"top":h,"["===h[0]&&"-"===h[1]?h=h.replace("[-","["):"["===h[0]&&"-"!==h[1]?h=h.replace("[","[-"):"-"===h[0]?h=h.replace("-",""):h[0].match(/[1-9]/)&&(h="-"+h)),void 0!=h&&(h=h.replace(/\(R\)/,""),"rotationX"!=g&&"rX"!=g||(d.anim.rotationX=k(h,d.anim.rotationX)+"deg"),"rotationY"!=g&&"rY"!=g||(d.anim.rotationY=k(h,d.anim.rotationY)+"deg"),"rotationZ"!=g&&"rZ"!=g||(d.anim.rotation=k(h,d.anim.rotationZ)+"deg"),"scaleX"!=g&&"sX"!=g||(d.anim.scaleX=k(h,d.anim.scaleX)),"scaleY"!=g&&"sY"!=g||(d.anim.scaleY=k(h,d.anim.scaleY)),"opacity"!=g&&"o"!=g||(d.anim.opacity=k(h,d.anim.opacity)),"fb"==g&&(f=""===f?"blur("+parseInt(h,0)+"px)":f+" blur("+parseInt(h,0)+"px)"),"fg"==g&&(f=""===f?"grayscale("+parseInt(h,0)+"%)":f+" grayscale("+parseInt(h,0)+"%)"),0===d.anim.opacity&&(d.anim.autoAlpha=0),d.anim.opacity=0==d.anim.opacity?1e-4:d.anim.opacity,"skewX"!=g&&"skX"!=g||(d.anim.skewX=k(h,d.anim.skewX)),"skewY"!=g&&"skY"!=g||(d.anim.skewY=k(h,d.anim.skewY)),"x"==g&&(d.anim.x=k(h,d.anim.x)),"y"==g&&(d.anim.y=k(h,d.anim.y)),"z"==g&&(d.anim.z=k(h,d.anim.z)),"transformOrigin"!=g&&"tO"!=g||(d.anim.transformOrigin=h.toString()),"transformPerspective"!=g&&"tP"!=g||(d.anim.transformPerspective=parseInt(h,0)),"speed"!=g&&"s"!=g||(d.speed=parseFloat(h)))}),""!==f&&(d.anim["-webkit-filter"]=f,d.anim.filter=f),d},n=function(a){if(void 0===a)return!1;var b=new Object;b.anim=new Object;var c=a.split(";");return c&&jQuery.each(c,function(a,c){c=c.split(":");var d=c[0],e=c[1];"x"==d&&(b.anim.x=e),"y"==d&&(b.anim.y=e),"s"==d&&(b.speed=parseFloat(e)),"e"!=d&&"ease"!=d||(b.anim.ease=e)}),b},o=function(a,b,c){if(void 0==a&&(a=0),!jQuery.isArray(a)&&"string"===jQuery.type(a)&&(a.split(",").length>1||a.split("[").length>1)){a=a.replace("[",""),a=a.replace("]","");var d=a.match(/'/g)?a.split("',"):a.split(",");a=new Array,d&&jQuery.each(d,function(b,c){c=c.replace("'",""),c=c.replace("'",""),a.push(c)})}else{var e=a;jQuery.isArray(a)||(a=new Array,a.push(e))}var e=a[a.length-1];if(a.length<b.rle)for(var f=1;f<=b.curWinRange;f++)a.push(e);return a},q=function(a,b){if(void 0===b)return a;b=b.replace("c:","color:"),b=b.replace("bg:","background-color:"),b=b.replace("bw:","border-width:"),b=b.replace("bc:","border-color:"),b=b.replace("br:","borderRadius:"),b=b.replace("bs:","border-style:"),b=b.replace("td:","text-decoration:"),b=b.replace("zi:","zIndex:");var c=b.split(";");return c&&jQuery.each(c,function(b,c){var d=c.split(":");d[0].length>0&&(a.anim[d[0]]=d[1])}),a},r=function(a,b){var e,c=new Object,d=!1;if("rekursive"==b&&(e=a.closest(".tp-caption"),e&&a.css("fontSize")===e.css("fontSize")&&a.css("fontWeight")===e.css("fontWeight")&&a.css("lineHeight")===e.css("lineHeight")&&(d=!0)),c.basealign=a.data("basealign")||"grid",c.fontSize=d?void 0===e.data("fontsize")?parseInt(e.css("fontSize"),0)||0:e.data("fontsize"):void 0===a.data("fontsize")?parseInt(a.css("fontSize"),0)||0:a.data("fontsize"),c.fontWeight=d?void 0===e.data("fontweight")?parseInt(e.css("fontWeight"),0)||0:e.data("fontweight"):void 0===a.data("fontweight")?parseInt(a.css("fontWeight"),0)||0:a.data("fontweight"),c.whiteSpace=d?void 0===e.data("whitespace")?e.css("whitespace")||"normal":e.data("whitespace"):void 0===a.data("whitespace")?a.css("whitespace")||"normal":a.data("whitespace"),c.textAlign=d?void 0===e.data("textalign")?e.css("textalign")||"inherit":e.data("textalign"):void 0===a.data("textalign")?a.css("textalign")||"inherit":a.data("textalign"),c.zIndex=d?void 0===e.data("zIndex")?e.css("zIndex")||"inherit":e.data("zIndex"):void 0===a.data("zIndex")?a.css("zIndex")||"inherit":a.data("zIndex"),jQuery.inArray(a.data("layertype"),["video","image","audio"])!==-1||a.is("img")?c.lineHeight=0:c.lineHeight=d?void 0===e.data("lineheight")?parseInt(e.css("lineHeight"),0)||0:e.data("lineheight"):void 0===a.data("lineheight")?parseInt(a.css("lineHeight"),0)||0:a.data("lineheight"),c.letterSpacing=d?void 0===e.data("letterspacing")?parseFloat(e.css("letterSpacing"),0)||0:e.data("letterspacing"):void 0===a.data("letterspacing")?parseFloat(a.css("letterSpacing"))||0:a.data("letterspacing"),c.paddingTop=void 0===a.data("paddingtop")?parseInt(a.css("paddingTop"),0)||0:a.data("paddingtop"),c.paddingBottom=void 0===a.data("paddingbottom")?parseInt(a.css("paddingBottom"),0)||0:a.data("paddingbottom"),c.paddingLeft=void 0===a.data("paddingleft")?parseInt(a.css("paddingLeft"),0)||0:a.data("paddingleft"),c.paddingRight=void 0===a.data("paddingright")?parseInt(a.css("paddingRight"),0)||0:a.data("paddingright"),c.marginTop=void 0===a.data("margintop")?parseInt(a.css("marginTop"),0)||0:a.data("margintop"),c.marginBottom=void 0===a.data("marginbottom")?parseInt(a.css("marginBottom"),0)||0:a.data("marginbottom"),c.marginLeft=void 0===a.data("marginleft")?parseInt(a.css("marginLeft"),0)||0:a.data("marginleft"),c.marginRight=void 0===a.data("marginright")?parseInt(a.css("marginRight"),0)||0:a.data("marginright"),c.borderTopWidth=void 0===a.data("bordertopwidth")?parseInt(a.css("borderTopWidth"),0)||0:a.data("bordertopwidth"),c.borderBottomWidth=void 0===a.data("borderbottomwidth")?parseInt(a.css("borderBottomWidth"),0)||0:a.data("borderbottomwidth"),c.borderLeftWidth=void 0===a.data("borderleftwidth")?parseInt(a.css("borderLeftWidth"),0)||0:a.data("borderleftwidth"),c.borderRightWidth=void 0===a.data("borderrightwidth")?parseInt(a.css("borderRightWidth"),0)||0:a.data("borderrightwidth"),"rekursive"!=b){if(c.color=void 0===a.data("color")?"nopredefinedcolor":a.data("color"),c.whiteSpace=d?void 0===e.data("whitespace")?e.css("whiteSpace")||"nowrap":e.data("whitespace"):void 0===a.data("whitespace")?a.css("whiteSpace")||"nowrap":a.data("whitespace"),c.textAlign=d?void 0===e.data("textalign")?e.css("textalign")||"inherit":e.data("textalign"):void 0===a.data("textalign")?a.css("textalign")||"inherit":a.data("textalign"),c.fontWeight=d?void 0===e.data("fontweight")?parseInt(e.css("fontWeight"),0)||0:e.data("fontweight"):void 0===a.data("fontweight")?parseInt(a.css("fontWeight"),0)||0:a.data("fontweight"),c.minWidth=void 0===a.data("width")?parseInt(a.css("minWidth"),0)||0:a.data("width"),c.minHeight=void 0===a.data("height")?parseInt(a.css("minHeight"),0)||0:a.data("height"),void 0!=a.data("videowidth")&&void 0!=a.data("videoheight")){var f=a.data("videowidth"),g=a.data("videoheight");f="100%"===f?"none":f,g="100%"===g?"none":g,a.data("width",f),a.data("height",g)}c.maxWidth=void 0===a.data("width")?parseInt(a.css("maxWidth"),0)||"none":a.data("width"),c.maxHeight=void 0===a.data("height")?parseInt(a.css("maxHeight"),0)||"none":a.data("height"),c.wan=void 0===a.data("wan")?parseInt(a.css("-webkit-transition"),0)||"none":a.data("wan"),c.moan=void 0===a.data("moan")?parseInt(a.css("-moz-animation-transition"),0)||"none":a.data("moan"),c.man=void 0===a.data("man")?parseInt(a.css("-ms-animation-transition"),0)||"none":a.data("man"),c.ani=void 0===a.data("ani")?parseInt(a.css("transition"),0)||"none":a.data("ani")}return c.styleProps={borderTopLeftRadius:a[0].style.borderTopLeftRadius,borderTopRightRadius:a[0].style.borderTopRightRadius,borderBottomRightRadius:a[0].style.borderBottomRightRadius,borderBottomLeftRadius:a[0].style.borderBottomLeftRadius,"background-color":a[0].style["background-color"],"border-top-color":a[0].style["border-top-color"],"border-bottom-color":a[0].style["border-bottom-color"],"border-right-color":a[0].style["border-right-color"],"border-left-color":a[0].style["border-left-color"],"border-top-style":a[0].style["border-top-style"],"border-bottom-style":a[0].style["border-bottom-style"],"border-left-style":a[0].style["border-left-style"],"border-right-style":a[0].style["border-right-style"],"border-left-width":a[0].style["border-left-width"],"border-right-width":a[0].style["border-right-width"],"border-bottom-width":a[0].style["border-bottom-width"],"border-top-width":a[0].style["border-top-width"],color:a[0].style.color,"text-decoration":a[0].style["text-decoration"],"font-style":a[0].style["font-style"]},""==c.styleProps.color&&(c.styleProps.color=a.css("color")),c},s=function(a,b){var c=new Object;return a&&jQuery.each(a,function(d,e){var f=o(e,b)[b.curWinRange];c[d]=void 0!==f?f:a[d]}),c},t=function(a,b,c,d){return a=jQuery.isNumeric(a)?a*b+"px":a,a="full"===a?d:"auto"===a||"none"===a?c:a},u=function(a,b,c,d){var e=a.data();e=void 0===e?{}:e;try{if("BR"==a[0].nodeName||"br"==a[0].tagName)return!1}catch(a){}e.cssobj=void 0===e.cssobj?r(a,c):e.cssobj;var f=s(e.cssobj,b),g=b.bw,h=b.bh;if("off"===d&&(g=1,h=1),"auto"==f.lineHeight&&(f.lineHeight=f.fontSize+4),!a.hasClass("tp-splitted")){a.css("-webkit-transition","none"),a.css("-moz-transition","none"),a.css("-ms-transition","none"),a.css("transition","none");var i=void 0!==a.data("transform_hover")||void 0!==a.data("style_hover");if(i&&punchgs.TweenLite.set(a,f.styleProps),punchgs.TweenLite.set(a,{fontSize:Math.round(f.fontSize*g)+"px",fontWeight:f.fontWeight,letterSpacing:Math.floor(f.letterSpacing*g)+"px",paddingTop:Math.round(f.paddingTop*h)+"px",paddingBottom:Math.round(f.paddingBottom*h)+"px",paddingLeft:Math.round(f.paddingLeft*g)+"px",paddingRight:Math.round(f.paddingRight*g)+"px",marginTop:f.marginTop*h+"px",marginBottom:f.marginBottom*h+"px",marginLeft:f.marginLeft*g+"px",marginRight:f.marginRight*g+"px",borderTopWidth:Math.round(f.borderTopWidth*h)+"px",borderBottomWidth:Math.round(f.borderBottomWidth*h)+"px",borderLeftWidth:Math.round(f.borderLeftWidth*g)+"px",borderRightWidth:Math.round(f.borderRightWidth*g)+"px",lineHeight:Math.round(f.lineHeight*h)+"px",textAlign:f.textAlign,overwrite:"auto"}),"rekursive"!=c){var j="slide"==f.basealign?b.ulw:b.gridwidth[b.curWinRange],k="slide"==f.basealign?b.ulh:b.gridheight[b.curWinRange],l=t(f.maxWidth,g,"none",j),m=t(f.maxHeight,h,"none",k),n=t(f.minWidth,g,"0px",j),o=t(f.minHeight,h,"0px",k);if(n=void 0===n?0:n,o=void 0===o?0:o,l=void 0===l?"none":l,m=void 0===m?"none":m,e._isgroup&&("#1/1#"===n&&(n=l=j),"#1/2#"===n&&(n=l=j/2),"#1/3#"===n&&(n=l=j/3),"#1/4#"===n&&(n=l=j/4),"#1/5#"===n&&(n=l=j/5),"#1/6#"===n&&(n=l=j/6),"#2/3#"===n&&(n=l=j/3*2),"#3/4#"===n&&(n=l=j/4*3),"#2/5#"===n&&(n=l=j/5*2),"#3/5#"===n&&(n=l=j/5*3),"#4/5#"===n&&(n=l=j/5*4),"#3/6#"===n&&(n=l=j/6*3),"#4/6#"===n&&(n=l=j/6*4),"#5/6#"===n&&(n=l=j/6*5)),e._ingroup&&(e._groupw=n,e._grouph=o),punchgs.TweenLite.set(a,{maxWidth:l,maxHeight:m,minWidth:n,minHeight:o,whiteSpace:f.whiteSpace,textAlign:f.textAlign,overwrite:"auto"}),"nopredefinedcolor"!=f.color&&punchgs.TweenLite.set(a,{color:f.color,overwrite:"auto"}),void 0!=e.svg_src){var p="nopredefinedcolor"!=f.color&&void 0!=f.color?f.color:void 0!=f.css&&"nopredefinedcolor"!=f.css.color&&void 0!=f.css.color?f.css.color:void 0!=f.styleProps.color?f.styleProps.color:void 0!=f.styleProps.css&&void 0!=f.styleProps.css.color&&f.styleProps.css.color;0!=p&&(punchgs.TweenLite.set(a.find("svg"),{fill:p,overwrite:"auto"}),punchgs.TweenLite.set(a.find("svg path"),{fill:p,overwrite:"auto"}))}}"column"===e._nctype&&(void 0===e._column_bg_set&&(e._column_bg_set=a.css("backgroundColor"),e._column_bg_image=a.css("backgroundImage"),e._column_bg_image_repeat=a.css("backgroundRepeat"),e._column_bg_image_position=a.css("backgroundPosition"),e._column_bg_image_size=a.css("backgroundSize"),e._column_bg_opacity=a.data("bgopacity"),e._column_bg_opacity=void 0===e._column_bg_opacity?1:e._column_bg_opacity,punchgs.TweenLite.set(a,{backgroundColor:"transparent",backgroundImage:""})),setTimeout(function(){v(a,b)},1),e._cbgc_auto&&(e._cbgc_auto[0].style.backgroundSize=e._column_bg_image_size,jQuery.isArray(f.marginLeft)?punchgs.TweenLite.set(e._cbgc_auto,{borderTopWidth:f.marginTop[b.curWinRange]*h+"px",borderLeftWidth:f.marginLeft[b.curWinRange]*g+"px",borderRightWidth:f.marginRight[b.curWinRange]*g+"px",borderBottomWidth:f.marginBottom[b.curWinRange]*h+"px",backgroundColor:e._column_bg_set,backgroundImage:e._column_bg_image,backgroundRepeat:e._column_bg_image_repeat,backgroundPosition:e._column_bg_image_position,opacity:e._column_bg_opacity}):punchgs.TweenLite.set(e._cbgc_auto,{borderTopWidth:f.marginTop*h+"px",borderLeftWidth:f.marginLeft*g+"px",borderRightWidth:f.marginRight*g+"px",borderBottomWidth:f.marginBottom*h+"px",backgroundColor:e._column_bg_set,backgroundImage:e._column_bg_image,backgroundRepeat:e._column_bg_image_repeat,backgroundPosition:e._column_bg_image_position,opacity:e._column_bg_opacity}))),setTimeout(function(){a.css("-webkit-transition",a.data("wan")),a.css("-moz-transition",a.data("moan")),a.css("-ms-transition",a.data("man")),a.css("transition",a.data("ani"))},30)}},v=function(a,b){var c=a.data();if(c._cbgc_man){var d,e,f,g,h;jQuery.isArray(c.cssobj.marginLeft)?(d=c.cssobj.marginLeft[b.curWinRange]*b.bw,e=c.cssobj.marginTop[b.curWinRange]*b.bh,f=c.cssobj.marginBottom[b.curWinRange]*b.bh,g=c.cssobj.marginRight[b.curWinRange]*b.bw):(d=c.cssobj.marginLeft*b.bw,e=c.cssobj.marginTop*b.bh,f=c.cssobj.marginBottom*b.bh,g=c.cssobj.marginRight*b.bw),h=c._row.hasClass("rev_break_columns")?"100%":c._row.outerHeight()-(e+f)+"px",c._cbgc_man[0].style.backgroundSize=c._column_bg_image_size,punchgs.TweenLite.set(c._cbgc_man,{width:"100%",height:h,backgroundColor:c._column_bg_set,backgroundImage:c._column_bg_image,backgroundRepeat:c._column_bg_image_repeat,backgroundPosition:c._column_bg_image_position,overwrite:"auto",opacity:c._column_bg_opacity})}},w=function(a,b){var c=a.data();if(a.hasClass("rs-pendulum")&&void 0==c._loop_timeline){c._loop_timeline=new punchgs.TimelineLite;var d=void 0==a.data("startdeg")?-20:a.data("startdeg"),e=void 0==a.data("enddeg")?20:a.data("enddeg"),f=void 0==a.data("speed")?2:a.data("speed"),g=void 0==a.data("origin")?"50% 50%":a.data("origin"),h=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");d*=b,e*=b,c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",rotation:d,transformOrigin:g},{rotation:e,ease:h})),c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",rotation:e,transformOrigin:g},{rotation:d,ease:h,onComplete:function(){c._loop_timeline.restart()}}))}if(a.hasClass("rs-rotate")&&void 0==c._loop_timeline){c._loop_timeline=new punchgs.TimelineLite;var d=void 0==a.data("startdeg")?0:a.data("startdeg"),e=void 0==a.data("enddeg")?360:a.data("enddeg"),f=void 0==a.data("speed")?2:a.data("speed"),g=void 0==a.data("origin")?"50% 50%":a.data("origin"),h=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");d*=b,e*=b,c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",rotation:d,transformOrigin:g},{rotation:e,ease:h,onComplete:function(){c._loop_timeline.restart()}}))}if(a.hasClass("rs-slideloop")&&void 0==c._loop_timeline){c._loop_timeline=new punchgs.TimelineLite;var i=void 0==a.data("xs")?0:a.data("xs"),j=void 0==a.data("ys")?0:a.data("ys"),k=void 0==a.data("xe")?0:a.data("xe"),l=void 0==a.data("ye")?0:a.data("ye"),f=void 0==a.data("speed")?2:a.data("speed"),h=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");i*=b,j*=b,k*=b,l*=b,c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",x:i,y:j},{x:k,y:l,ease:h})),c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",x:k,y:l},{x:i,y:j,onComplete:function(){c._loop_timeline.restart()}}))}if(a.hasClass("rs-pulse")&&void 0==c._loop_timeline){c._loop_timeline=new punchgs.TimelineLite;var m=void 0==a.data("zoomstart")?0:a.data("zoomstart"),n=void 0==a.data("zoomend")?0:a.data("zoomend"),f=void 0==a.data("speed")?2:a.data("speed"),h=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",scale:m},{scale:n,ease:h})),c._loop_timeline.append(new punchgs.TweenLite.fromTo(a,f,{force3D:"auto",scale:n},{scale:m,onComplete:function(){c._loop_timeline.restart()}}))}if(a.hasClass("rs-wave")&&void 0==c._loop_timeline){c._loop_timeline=new punchgs.TimelineLite;var o=void 0==a.data("angle")?10:parseInt(a.data("angle"),0),p=void 0==a.data("radius")?10:parseInt(a.data("radius"),0),f=void 0==a.data("speed")?-20:a.data("speed"),g=void 0==a.data("origin")?"50% 50%":a.data("origin"),q=g.split(" "),r=new Object;q.length>=1?(r.x=q[0],r.y=q[1]):(r.x="50%",r.y="50%"),p*=b;var s=(parseInt(r.x,0)/100-.5)*a.width(),t=(parseInt(r.y,0)/100-.5)*a.height(),u=-1*p+t,v=0+s,w={a:0,ang:o,element:a,unit:p,xoffset:v,yoffset:u},x=parseInt(o,0),y=new punchgs.TweenLite.fromTo(w,f,{a:0+x},{a:360+x,force3D:"auto",ease:punchgs.Linear.easeNone});y.eventCallback("onUpdate",function(a){var b=a.a*(Math.PI/180),c=a.yoffset+a.unit*(1-Math.sin(b)),d=a.xoffset+Math.cos(b)*a.unit;punchgs.TweenLite.to(a.element,.1,{force3D:"auto",x:d,y:c})},[w]),y.eventCallback("onComplete",function(a){a._loop_timeline.restart()},[c]),c._loop_timeline.append(y)}},x=function(a){a.closest(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function(){var a=this;void 0!=a._loop_timeline&&(a._loop_timeline.pause(),a._loop_timeline=null)})}}(jQuery);
/*****************************************************************************************************
 * jquery.themepunch.revmigrate.js - jQuery Plugin for Revolution Slider Migration from 4.x to 5.0   
 * @version: 1.0.2 (20.01.2016)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
*****************************************************************************************************/
!function(t){var a=jQuery.fn.revolution;jQuery.extend(!0,a,{migration:function(t,a){return a=o(a),e(t,a),a}});var o=function(t){if(t.parallaxLevels||t.parallaxBgFreeze){var a=new Object;a.type=t.parallax,a.levels=t.parallaxLevels,a.bgparallax="on"==t.parallaxBgFreeze?"off":"on",a.disable_onmobile=t.parallaxDisableOnMobile,t.parallax=a}if(void 0===t.disableProgressBar&&(t.disableProgressBar=t.hideTimerBar||"off"),(t.startwidth||t.startheight)&&(t.gridwidth=t.startwidth,t.gridheight=t.startheight),void 0===t.sliderType&&(t.sliderType="standard"),"on"===t.fullScreen&&(t.sliderLayout="fullscreen"),"on"===t.fullWidth&&(t.sliderLayout="fullwidth"),void 0===t.sliderLayout&&(t.sliderLayout="auto"),void 0===t.navigation){var o=new Object;if("solo"==t.navigationArrows||"nextto"==t.navigationArrows){var e=new Object;e.enable=!0,e.style=t.navigationStyle||"",e.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,e.hide_onleave=t.hideThumbs>0?!0:!1,e.hide_delay=t.hideThumbs>0?t.hideThumbs:200,e.hide_delay_mobile=t.hideNavDelayOnMobile||1500,e.hide_under=0,e.tmp="",e.left={h_align:t.soloArrowLeftHalign,v_align:t.soloArrowLeftValign,h_offset:t.soloArrowLeftHOffset,v_offset:t.soloArrowLeftVOffset},e.right={h_align:t.soloArrowRightHalign,v_align:t.soloArrowRightValign,h_offset:t.soloArrowRightHOffset,v_offset:t.soloArrowRightVOffset},o.arrows=e}if("bullet"==t.navigationType){var r=new Object;r.style=t.navigationStyle||"",r.enable=!0,r.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,r.hide_onleave=t.hideThumbs>0?!0:!1,r.hide_delay=t.hideThumbs>0?t.hideThumbs:200,r.hide_delay_mobile=t.hideNavDelayOnMobile||1500,r.hide_under=0,r.direction="horizontal",r.h_align=t.navigationHAlign||"center",r.v_align=t.navigationVAlign||"bottom",r.space=5,r.h_offset=t.navigationHOffset||0,r.v_offset=t.navigationVOffset||20,r.tmp='<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',o.bullets=r}if("thumb"==t.navigationType){var i=new Object;i.style=t.navigationStyle||"",i.enable=!0,i.width=t.thumbWidth||100,i.height=t.thumbHeight||50,i.min_width=t.thumbWidth||100,i.wrapper_padding=2,i.wrapper_color="#f5f5f5",i.wrapper_opacity=1,i.visibleAmount=t.thumbAmount||3,i.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,i.hide_onleave=t.hideThumbs>0?!0:!1,i.hide_delay=t.hideThumbs>0?t.hideThumbs:200,i.hide_delay_mobile=t.hideNavDelayOnMobile||1500,i.hide_under=0,i.direction="horizontal",i.span=!1,i.position="inner",i.space=2,i.h_align=t.navigationHAlign||"center",i.v_align=t.navigationVAlign||"bottom",i.h_offset=t.navigationHOffset||0,i.v_offset=t.navigationVOffset||20,i.tmp='<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',o.thumbnails=i}t.navigation=o,t.navigation.keyboardNavigation=t.keyboardNavigation||"on",t.navigation.onHoverStop=t.onHoverStop||"on",t.navigation.touch={touchenabled:t.touchenabled||"on",swipe_treshold:t.swipe_treshold||75,swipe_min_touches:t.swipe_min_touches||1,drag_block_vertical:t.drag_block_vertical||!1}}return void 0==t.fallbacks&&(t.fallbacks={isJoomla:t.isJoomla||!1,panZoomDisableOnMobile:t.parallaxDisableOnMobile||"off",simplifyAll:t.simplifyAll||"on",nextSlideOnWindowFocus:t.nextSlideOnWindowFocus||"off",disableFocusListener:t.disableFocusListener||!0}),t},e=function(t,a){var o=new Object,e=t.width(),r=t.height();o.skewfromleftshort="x:-50;skX:85;o:0",o.skewfromrightshort="x:50;skX:-85;o:0",o.sfl="x:-50;o:0",o.sfr="x:50;o:0",o.sft="y:-50;o:0",o.sfb="y:50;o:0",o.skewfromleft="x:top;skX:85;o:0",o.skewfromright="x:bottom;skX:-85;o:0",o.lfl="x:top;o:0",o.lfr="x:bottom;o:0",o.lft="y:left;o:0",o.lfb="y:right;o:0",o.fade="o:0";720*Math.random()-360;t.find(".tp-caption").each(function(){var t=jQuery(this),a=(Math.random()*(2*e)-e,Math.random()*(2*r)-r,3*Math.random(),720*Math.random()-360,70*Math.random()-35,70*Math.random()-35,t.attr("class"));o.randomrotate="x:{-400,400};y:{-400,400};sX:{0,2};sY:{0,2};rZ:{-180,180};rX:{-180,180};rY:{-180,180};o:0;",a.match("randomrotate")?t.data("transform_in",o.randomrotate):a.match(/\blfl\b/)?t.data("transform_in",o.lfl):a.match(/\blfr\b/)?t.data("transform_in",o.lfr):a.match(/\blft\b/)?t.data("transform_in",o.lft):a.match(/\blfb\b/)?t.data("transform_in",o.lfb):a.match(/\bsfl\b/)?t.data("transform_in",o.sfl):a.match(/\bsfr\b/)?t.data("transform_in",o.sfr):a.match(/\bsft\b/)?t.data("transform_in",o.sft):a.match(/\bsfb\b/)?t.data("transform_in",o.sfb):a.match(/\bskewfromleftshort\b/)?t.data("transform_in",o.skewfromleftshort):a.match(/\bskewfromrightshort\b/)?t.data("transform_in",o.skewfromrightshort):a.match(/\bskewfromleft\b/)?t.data("transform_in",o.skewfromleft):a.match(/\bskewfromright\b/)?t.data("transform_in",o.skewfromright):a.match(/\bfade\b/)&&t.data("transform_in",o.fade),a.match(/\brandomrotateout\b/)?t.data("transform_out",o.randomrotate):a.match(/\bltl\b/)?t.data("transform_out",o.lfl):a.match(/\bltr\b/)?t.data("transform_out",o.lfr):a.match(/\bltt\b/)?t.data("transform_out",o.lft):a.match(/\bltb\b/)?t.data("transform_out",o.lfb):a.match(/\bstl\b/)?t.data("transform_out",o.sfl):a.match(/\bstr\b/)?t.data("transform_out",o.sfr):a.match(/\bstt\b/)?t.data("transform_out",o.sft):a.match(/\bstb\b/)?t.data("transform_out",o.sfb):a.match(/\bskewtoleftshortout\b/)?t.data("transform_out",o.skewfromleftshort):a.match(/\bskewtorightshortout\b/)?t.data("transform_out",o.skewfromrightshort):a.match(/\bskewtoleftout\b/)?t.data("transform_out",o.skewfromleft):a.match(/\bskewtorightout\b/)?t.data("transform_out",o.skewfromright):a.match(/\bfadeout\b/)&&t.data("transform_out",o.fade),void 0!=t.data("customin")&&t.data("transform_in",t.data("customin")),void 0!=t.data("customout")&&t.data("transform_out",t.data("customout"))})}}(jQuery);
/********************************************
 * REVOLUTION 5.2 EXTENSION - NAVIGATION
 * @version: 1.3.2 (25.10.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(a){"use strict";var b=jQuery.fn.revolution,c=b.is_mobile(),d={alias:"Navigation Min JS",name:"revolution.extensions.navigation.min.js",min_core:"5.3",version:"1.3.2"};jQuery.extend(!0,b,{hideUnHideNav:function(a){var b=a.c.width(),c=a.navigation.arrows,d=a.navigation.bullets,e=a.navigation.thumbnails,f=a.navigation.tabs;m(c)&&y(a.c.find(".tparrows"),c.hide_under,b,c.hide_over),m(d)&&y(a.c.find(".tp-bullets"),d.hide_under,b,d.hide_over),m(e)&&y(a.c.parent().find(".tp-thumbs"),e.hide_under,b,e.hide_over),m(f)&&y(a.c.parent().find(".tp-tabs"),f.hide_under,b,f.hide_over),x(a)},resizeThumbsTabs:function(a,b){if(a.navigation&&a.navigation.tabs.enable||a.navigation&&a.navigation.thumbnails.enable){var c=(jQuery(window).width()-480)/500,d=new punchgs.TimelineLite,e=a.navigation.tabs,g=a.navigation.thumbnails,h=a.navigation.bullets;if(d.pause(),c=c>1?1:c<0?0:c,m(e)&&(b||e.width>e.min_width)&&f(c,d,a.c,e,a.slideamount,"tab"),m(g)&&(b||g.width>g.min_width)&&f(c,d,a.c,g,a.slideamount,"thumb"),m(h)&&b){var i=a.c.find(".tp-bullets");i.find(".tp-bullet").each(function(a){var b=jQuery(this),c=a+1,d=b.outerWidth()+parseInt(void 0===h.space?0:h.space,0),e=b.outerHeight()+parseInt(void 0===h.space?0:h.space,0);"vertical"===h.direction?(b.css({top:(c-1)*e+"px",left:"0px"}),i.css({height:(c-1)*e+b.outerHeight(),width:b.outerWidth()})):(b.css({left:(c-1)*d+"px",top:"0px"}),i.css({width:(c-1)*d+b.outerWidth(),height:b.outerHeight()}))})}d.play(),x(a)}return!0},updateNavIndexes:function(a){function d(a){c.find(a).lenght>0&&c.find(a).each(function(a){jQuery(this).data("liindex",a)})}var c=a.c;d(".tp-tab"),d(".tp-bullet"),d(".tp-thumb"),b.resizeThumbsTabs(a,!0),b.manageNavigation(a)},manageNavigation:function(a){var c=b.getHorizontalOffset(a.c.parent(),"left"),d=b.getHorizontalOffset(a.c.parent(),"right");m(a.navigation.bullets)&&("fullscreen"!=a.sliderLayout&&"fullwidth"!=a.sliderLayout&&(a.navigation.bullets.h_offset_old=void 0===a.navigation.bullets.h_offset_old?a.navigation.bullets.h_offset:a.navigation.bullets.h_offset_old,a.navigation.bullets.h_offset="center"===a.navigation.bullets.h_align?a.navigation.bullets.h_offset_old+c/2-d/2:a.navigation.bullets.h_offset_old+c-d),t(a.c.find(".tp-bullets"),a.navigation.bullets,a)),m(a.navigation.thumbnails)&&t(a.c.parent().find(".tp-thumbs"),a.navigation.thumbnails,a),m(a.navigation.tabs)&&t(a.c.parent().find(".tp-tabs"),a.navigation.tabs,a),m(a.navigation.arrows)&&("fullscreen"!=a.sliderLayout&&"fullwidth"!=a.sliderLayout&&(a.navigation.arrows.left.h_offset_old=void 0===a.navigation.arrows.left.h_offset_old?a.navigation.arrows.left.h_offset:a.navigation.arrows.left.h_offset_old,a.navigation.arrows.left.h_offset="right"===a.navigation.arrows.left.h_align?a.navigation.arrows.left.h_offset_old+d:a.navigation.arrows.left.h_offset_old+c,a.navigation.arrows.right.h_offset_old=void 0===a.navigation.arrows.right.h_offset_old?a.navigation.arrows.right.h_offset:a.navigation.arrows.right.h_offset_old,a.navigation.arrows.right.h_offset="right"===a.navigation.arrows.right.h_align?a.navigation.arrows.right.h_offset_old+d:a.navigation.arrows.right.h_offset_old+c),t(a.c.find(".tp-leftarrow.tparrows"),a.navigation.arrows.left,a),t(a.c.find(".tp-rightarrow.tparrows"),a.navigation.arrows.right,a)),m(a.navigation.thumbnails)&&e(a.c.parent().find(".tp-thumbs"),a.navigation.thumbnails),m(a.navigation.tabs)&&e(a.c.parent().find(".tp-tabs"),a.navigation.tabs)},createNavigation:function(a,f){if("stop"===b.compare_version(d).check)return!1;var g=a.parent(),j=f.navigation.arrows,n=f.navigation.bullets,r=f.navigation.thumbnails,s=f.navigation.tabs,t=m(j),v=m(n),x=m(r),y=m(s);h(a,f),i(a,f),t&&q(a,j,f),f.li.each(function(b){var c=jQuery(f.li[f.li.length-1-b]),d=jQuery(this);v&&(f.navigation.bullets.rtl?u(a,n,c,f):u(a,n,d,f)),x&&(f.navigation.thumbnails.rtl?w(a,r,c,"tp-thumb",f):w(a,r,d,"tp-thumb",f)),y&&(f.navigation.tabs.rtl?w(a,s,c,"tp-tab",f):w(a,s,d,"tp-tab",f))}),a.bind("revolution.slide.onafterswap revolution.nextslide.waiting",function(){var b=0==a.find(".next-revslide").length?a.find(".active-revslide").data("index"):a.find(".next-revslide").data("index");a.find(".tp-bullet").each(function(){var a=jQuery(this);a.data("liref")===b?a.addClass("selected"):a.removeClass("selected")}),g.find(".tp-thumb, .tp-tab").each(function(){var a=jQuery(this);a.data("liref")===b?(a.addClass("selected"),a.hasClass("tp-tab")?e(g.find(".tp-tabs"),s):e(g.find(".tp-thumbs"),r)):a.removeClass("selected")});var c=0,d=!1;f.thumbs&&jQuery.each(f.thumbs,function(a,e){c=d===!1?a:c,d=e.id===b||a===b||d});var h=c>0?c-1:f.slideamount-1,i=c+1==f.slideamount?0:c+1;if(j.enable===!0){var k=j.tmp;if(void 0!=f.thumbs[h]&&jQuery.each(f.thumbs[h].params,function(a,b){k=k.replace(b.from,b.to)}),j.left.j.html(k),k=j.tmp,i>f.slideamount)return;jQuery.each(f.thumbs[i].params,function(a,b){k=k.replace(b.from,b.to)}),j.right.j.html(k),punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+f.thumbs[h].src+")"}),punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+f.thumbs[i].src+")"})}}),l(j),l(n),l(r),l(s),g.on("mouseenter mousemove",function(){g.hasClass("tp-mouseover")||(g.addClass("tp-mouseover"),punchgs.TweenLite.killDelayedCallsTo(p),t&&j.hide_onleave&&p(g.find(".tparrows"),j,"show"),v&&n.hide_onleave&&p(g.find(".tp-bullets"),n,"show"),x&&r.hide_onleave&&p(g.find(".tp-thumbs"),r,"show"),y&&s.hide_onleave&&p(g.find(".tp-tabs"),s,"show"),c&&(g.removeClass("tp-mouseover"),o(a,f)))}),g.on("mouseleave",function(){g.removeClass("tp-mouseover"),o(a,f)}),t&&j.hide_onleave&&p(g.find(".tparrows"),j,"hide",0),v&&n.hide_onleave&&p(g.find(".tp-bullets"),n,"hide",0),x&&r.hide_onleave&&p(g.find(".tp-thumbs"),r,"hide",0),y&&s.hide_onleave&&p(g.find(".tp-tabs"),s,"hide",0),x&&k(g.find(".tp-thumbs"),f),y&&k(g.find(".tp-tabs"),f),"carousel"===f.sliderType&&k(a,f,!0),"on"==f.navigation.touch.touchenabled&&k(a,f,"swipebased")}});var e=function(a,b){var d=(a.hasClass("tp-thumbs")?".tp-thumbs":".tp-tabs",a.hasClass("tp-thumbs")?".tp-thumb-mask":".tp-tab-mask"),e=a.hasClass("tp-thumbs")?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",f=a.hasClass("tp-thumbs")?".tp-thumb":".tp-tab",g=a.find(d),h=g.find(e),i=b.direction,j="vertical"===i?g.find(f).first().outerHeight(!0)+b.space:g.find(f).first().outerWidth(!0)+b.space,k="vertical"===i?g.height():g.width(),l=parseInt(g.find(f+".selected").data("liindex"),0),m=k/j,n="vertical"===i?g.height():g.width(),o=0-l*j,p="vertical"===i?h.height():h.width(),q=o<0-(p-n)?0-(p-n):q>0?0:o,r=h.data("offset");m>2&&(q=o-(r+j)<=0?o-(r+j)<0-j?r:q+j:q,q=o-j+r+k<j&&o+(Math.round(m)-2)*j<r?o+(Math.round(m)-2)*j:q),q=q<0-(p-n)?0-(p-n):q>0?0:q,"vertical"!==i&&g.width()>=h.width()&&(q=0),"vertical"===i&&g.height()>=h.height()&&(q=0),a.hasClass("dragged")||("vertical"===i?h.data("tmmove",punchgs.TweenLite.to(h,.5,{top:q+"px",ease:punchgs.Power3.easeInOut})):h.data("tmmove",punchgs.TweenLite.to(h,.5,{left:q+"px",ease:punchgs.Power3.easeInOut})),h.data("offset",q))},f=function(a,b,c,d,e,f){var g=c.parent().find(".tp-"+f+"s"),h=g.find(".tp-"+f+"s-inner-wrapper"),i=g.find(".tp-"+f+"-mask"),j=d.width*a<d.min_width?d.min_width:Math.round(d.width*a),k=Math.round(j/d.width*d.height),l="vertical"===d.direction?j:j*e+d.space*(e-1),m="vertical"===d.direction?k*e+d.space*(e-1):k,n="vertical"===d.direction?{width:j+"px"}:{height:k+"px"};b.add(punchgs.TweenLite.set(g,n)),b.add(punchgs.TweenLite.set(h,{width:l+"px",height:m+"px"})),b.add(punchgs.TweenLite.set(i,{width:l+"px",height:m+"px"}));var o=h.find(".tp-"+f);return o&&jQuery.each(o,function(a,c){"vertical"===d.direction?b.add(punchgs.TweenLite.set(c,{top:a*(k+parseInt(void 0===d.space?0:d.space,0)),width:j+"px",height:k+"px"})):"horizontal"===d.direction&&b.add(punchgs.TweenLite.set(c,{left:a*(j+parseInt(void 0===d.space?0:d.space,0)),width:j+"px",height:k+"px"}))}),b},g=function(a){var b=0,c=0,d=0,e=0,f=1,g=1,h=1;return"detail"in a&&(c=a.detail),"wheelDelta"in a&&(c=-a.wheelDelta/120),"wheelDeltaY"in a&&(c=-a.wheelDeltaY/120),"wheelDeltaX"in a&&(b=-a.wheelDeltaX/120),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(b=c,c=0),d=b*f,e=c*f,"deltaY"in a&&(e=a.deltaY),"deltaX"in a&&(d=a.deltaX),(d||e)&&a.deltaMode&&(1==a.deltaMode?(d*=g,e*=g):(d*=h,e*=h)),d&&!b&&(b=d<1?-1:1),e&&!c&&(c=e<1?-1:1),e=navigator.userAgent.match(/mozilla/i)?10*e:e,(e>300||e<-300)&&(e/=10),{spinX:b,spinY:c,pixelX:d,pixelY:e}},h=function(a,c){"on"===c.navigation.keyboardNavigation&&jQuery(document).keydown(function(d){("horizontal"==c.navigation.keyboard_direction&&39==d.keyCode||"vertical"==c.navigation.keyboard_direction&&40==d.keyCode)&&(c.sc_indicator="arrow",c.sc_indicator_dir=0,b.callingNewSlide(a,1)),("horizontal"==c.navigation.keyboard_direction&&37==d.keyCode||"vertical"==c.navigation.keyboard_direction&&38==d.keyCode)&&(c.sc_indicator="arrow",c.sc_indicator_dir=1,b.callingNewSlide(a,-1))})},i=function(a,c){if("on"===c.navigation.mouseScrollNavigation||"carousel"===c.navigation.mouseScrollNavigation){c.isIEEleven=!!navigator.userAgent.match(/Trident.*rv\:11\./),c.isSafari=!!navigator.userAgent.match(/safari/i),c.ischrome=!!navigator.userAgent.match(/chrome/i);var d=c.ischrome?-49:c.isIEEleven||c.isSafari?-9:navigator.userAgent.match(/mozilla/i)?-29:-49,e=c.ischrome?49:c.isIEEleven||c.isSafari?9:navigator.userAgent.match(/mozilla/i)?29:49;a.on("mousewheel DOMMouseScroll",function(f){var h=g(f.originalEvent),i=a.find(".tp-revslider-slidesli.active-revslide").index(),j=a.find(".tp-revslider-slidesli.processing-revslide").index(),k=i!=-1&&0==i||j!=-1&&0==j,l=i!=-1&&i==c.slideamount-1||1!=j&&j==c.slideamount-1,m=!0;"carousel"==c.navigation.mouseScrollNavigation&&(k=l=!1),j==-1?h.pixelY<d?(k||(c.sc_indicator="arrow","reverse"!==c.navigation.mouseScrollReverse&&(c.sc_indicator_dir=1,b.callingNewSlide(a,-1)),m=!1),l||(c.sc_indicator="arrow","reverse"===c.navigation.mouseScrollReverse&&(c.sc_indicator_dir=0,b.callingNewSlide(a,1)),m=!1)):h.pixelY>e&&(l||(c.sc_indicator="arrow","reverse"!==c.navigation.mouseScrollReverse&&(c.sc_indicator_dir=0,b.callingNewSlide(a,1)),m=!1),k||(c.sc_indicator="arrow","reverse"===c.navigation.mouseScrollReverse&&(c.sc_indicator_dir=1,b.callingNewSlide(a,-1)),m=!1)):m=!1;var n=c.c.offset().top-jQuery("body").scrollTop(),o=n+c.c.height();return"carousel"!=c.navigation.mouseScrollNavigation?("reverse"!==c.navigation.mouseScrollReverse&&(n>0&&h.pixelY>0||o<jQuery(window).height()&&h.pixelY<0)&&(m=!0),"reverse"===c.navigation.mouseScrollReverse&&(n<0&&h.pixelY<0||o>jQuery(window).height()&&h.pixelY>0)&&(m=!0)):m=!1,0==m?(f.preventDefault(f),!1):void 0})}},j=function(a,b,d){return a=c?jQuery(d.target).closest("."+a).length||jQuery(d.srcElement).closest("."+a).length:jQuery(d.toElement).closest("."+a).length||jQuery(d.originalTarget).closest("."+a).length,a===!0||1===a?1:0},k=function(a,d,e){var f=d.carousel;jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),f.Limit="endless";var h=(c||"Firefox"===b.get_browser(),a),i="vertical"===d.navigation.thumbnails.direction||"vertical"===d.navigation.tabs.direction?"none":"vertical",k=d.navigation.touch.swipe_direction||"horizontal";i="swipebased"==e&&"vertical"==k?"none":e?"vertical":i,jQuery.fn.swipetp||(jQuery.fn.swipetp=jQuery.fn.swipe),jQuery.fn.swipetp.defaults&&jQuery.fn.swipetp.defaults.excludedElements||jQuery.fn.swipetp.defaults||(jQuery.fn.swipetp.defaults=new Object),jQuery.fn.swipetp.defaults.excludedElements="label, button, input, select, textarea, .noSwipe",h.swipetp({allowPageScroll:i,triggerOnTouchLeave:!0,treshold:d.navigation.touch.swipe_treshold,fingers:d.navigation.touch.swipe_min_touches,excludeElements:jQuery.fn.swipetp.defaults.excludedElements,swipeStatus:function(c,e,g,h,i,l,m){var n=j("rev_slider_wrapper",a,c),o=j("tp-thumbs",a,c),p=j("tp-tabs",a,c),q=jQuery(this).attr("class"),r=!!q.match(/tp-tabs|tp-thumb/gi);if("carousel"===d.sliderType&&(("move"===e||"end"===e||"cancel"==e)&&d.dragStartedOverSlider&&!d.dragStartedOverThumbs&&!d.dragStartedOverTabs||"start"===e&&n>0&&0===o&&0===p))switch(d.dragStartedOverSlider=!0,h=g&&g.match(/left|up/g)?Math.round(h*-1):h=Math.round(1*h),e){case"start":void 0!==f.positionanim&&(f.positionanim.kill(),f.slide_globaloffset="off"===f.infinity?f.slide_offset:b.simp(f.slide_offset,f.maxwidth)),f.overpull="none",f.wrap.addClass("dragged");break;case"move":if(d.c.find(".tp-withaction").addClass("tp-temporarydisabled"),f.slide_offset="off"===f.infinity?f.slide_globaloffset+h:b.simp(f.slide_globaloffset+h,f.maxwidth),"off"===f.infinity){var s="center"===f.horizontal_align?(f.wrapwidth/2-f.slide_width/2-f.slide_offset)/f.slide_width:(0-f.slide_offset)/f.slide_width;"none"!==f.overpull&&0!==f.overpull||!(s<0||s>d.slideamount-1)?s>=0&&s<=d.slideamount-1&&(s>=0&&h>f.overpull||s<=d.slideamount-1&&h<f.overpull)&&(f.overpull=0):f.overpull=h,f.slide_offset=s<0?f.slide_offset+(f.overpull-h)/1.1+Math.sqrt(Math.abs((f.overpull-h)/1.1)):s>d.slideamount-1?f.slide_offset+(f.overpull-h)/1.1-Math.sqrt(Math.abs((f.overpull-h)/1.1)):f.slide_offset}b.organiseCarousel(d,g,!0,!0);break;case"end":case"cancel":f.slide_globaloffset=f.slide_offset,f.wrap.removeClass("dragged"),b.carouselToEvalPosition(d,g),d.dragStartedOverSlider=!1,d.dragStartedOverThumbs=!1,d.dragStartedOverTabs=!1,setTimeout(function(){d.c.find(".tp-withaction").removeClass("tp-temporarydisabled")},19)}else{if(("move"!==e&&"end"!==e&&"cancel"!=e||d.dragStartedOverSlider||!d.dragStartedOverThumbs&&!d.dragStartedOverTabs)&&!("start"===e&&n>0&&(o>0||p>0))){if("end"==e&&!r){if(d.sc_indicator="arrow","horizontal"==k&&"left"==g||"vertical"==k&&"up"==g)return d.sc_indicator_dir=0,b.callingNewSlide(d.c,1),!1;if("horizontal"==k&&"right"==g||"vertical"==k&&"down"==g)return d.sc_indicator_dir=1,b.callingNewSlide(d.c,-1),!1}return d.dragStartedOverSlider=!1,d.dragStartedOverThumbs=!1,d.dragStartedOverTabs=!1,!0}o>0&&(d.dragStartedOverThumbs=!0),p>0&&(d.dragStartedOverTabs=!0);var t=d.dragStartedOverThumbs?".tp-thumbs":".tp-tabs",u=d.dragStartedOverThumbs?".tp-thumb-mask":".tp-tab-mask",v=d.dragStartedOverThumbs?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",w=d.dragStartedOverThumbs?".tp-thumb":".tp-tab",x=d.dragStartedOverThumbs?d.navigation.thumbnails:d.navigation.tabs;h=g&&g.match(/left|up/g)?Math.round(h*-1):h=Math.round(1*h);var y=a.parent().find(u),z=y.find(v),A=x.direction,B="vertical"===A?z.height():z.width(),C="vertical"===A?y.height():y.width(),D="vertical"===A?y.find(w).first().outerHeight(!0)+x.space:y.find(w).first().outerWidth(!0)+x.space,E=void 0===z.data("offset")?0:parseInt(z.data("offset"),0),F=0;switch(e){case"start":a.parent().find(t).addClass("dragged"),E="vertical"===A?z.position().top:z.position().left,z.data("offset",E),z.data("tmmove")&&z.data("tmmove").pause();break;case"move":if(B<=C)return!1;F=E+h,F=F>0?"horizontal"===A?F-z.width()*(F/z.width()*F/z.width()):F-z.height()*(F/z.height()*F/z.height()):F;var G="vertical"===A?0-(z.height()-y.height()):0-(z.width()-y.width());F=F<G?"horizontal"===A?F+z.width()*(F-G)/z.width()*(F-G)/z.width():F+z.height()*(F-G)/z.height()*(F-G)/z.height():F,"vertical"===A?punchgs.TweenLite.set(z,{top:F+"px"}):punchgs.TweenLite.set(z,{left:F+"px"});break;case"end":case"cancel":if(r)return F=E+h,F="vertical"===A?F<0-(z.height()-y.height())?0-(z.height()-y.height()):F:F<0-(z.width()-y.width())?0-(z.width()-y.width()):F,F=F>0?0:F,F=Math.abs(h)>D/10?h<=0?Math.floor(F/D)*D:Math.ceil(F/D)*D:h<0?Math.ceil(F/D)*D:Math.floor(F/D)*D,F="vertical"===A?F<0-(z.height()-y.height())?0-(z.height()-y.height()):F:F<0-(z.width()-y.width())?0-(z.width()-y.width()):F,F=F>0?0:F,"vertical"===A?punchgs.TweenLite.to(z,.5,{top:F+"px",ease:punchgs.Power3.easeOut}):punchgs.TweenLite.to(z,.5,{left:F+"px",ease:punchgs.Power3.easeOut}),F=F?F:"vertical"===A?z.position().top:z.position().left,z.data("offset",F),z.data("distance",h),setTimeout(function(){d.dragStartedOverSlider=!1,d.dragStartedOverThumbs=!1,d.dragStartedOverTabs=!1},100),a.parent().find(t).removeClass("dragged"),!1}}}})},l=function(a){a.hide_delay=jQuery.isNumeric(parseInt(a.hide_delay,0))?a.hide_delay/1e3:.2,a.hide_delay_mobile=jQuery.isNumeric(parseInt(a.hide_delay_mobile,0))?a.hide_delay_mobile/1e3:.2},m=function(a){return a&&a.enable},n=function(a){return a&&a.enable&&a.hide_onleave===!0&&(void 0===a.position||!a.position.match(/outer/g))},o=function(a,b){var d=a.parent();n(b.navigation.arrows)&&punchgs.TweenLite.delayedCall(c?b.navigation.arrows.hide_delay_mobile:b.navigation.arrows.hide_delay,p,[d.find(".tparrows"),b.navigation.arrows,"hide"]),n(b.navigation.bullets)&&punchgs.TweenLite.delayedCall(c?b.navigation.bullets.hide_delay_mobile:b.navigation.bullets.hide_delay,p,[d.find(".tp-bullets"),b.navigation.bullets,"hide"]),n(b.navigation.thumbnails)&&punchgs.TweenLite.delayedCall(c?b.navigation.thumbnails.hide_delay_mobile:b.navigation.thumbnails.hide_delay,p,[d.find(".tp-thumbs"),b.navigation.thumbnails,"hide"]),n(b.navigation.tabs)&&punchgs.TweenLite.delayedCall(c?b.navigation.tabs.hide_delay_mobile:b.navigation.tabs.hide_delay,p,[d.find(".tp-tabs"),b.navigation.tabs,"hide"])},p=function(a,b,c,d){switch(d=void 0===d?.5:d,c){case"show":punchgs.TweenLite.to(a,d,{autoAlpha:1,ease:punchgs.Power3.easeInOut,overwrite:"auto"});break;case"hide":punchgs.TweenLite.to(a,d,{autoAlpha:0,ease:punchgs.Power3.easeInOu,overwrite:"auto"})}},q=function(a,b,c){b.style=void 0===b.style?"":b.style,b.left.style=void 0===b.left.style?"":b.left.style,b.right.style=void 0===b.right.style?"":b.right.style,0===a.find(".tp-leftarrow.tparrows").length&&a.append('<div class="tp-leftarrow tparrows '+b.style+" "+b.left.style+'">'+b.tmp+"</div>"),0===a.find(".tp-rightarrow.tparrows").length&&a.append('<div class="tp-rightarrow tparrows '+b.style+" "+b.right.style+'">'+b.tmp+"</div>");var d=a.find(".tp-leftarrow.tparrows"),e=a.find(".tp-rightarrow.tparrows");b.rtl?(d.click(function(){c.sc_indicator="arrow",c.sc_indicator_dir=0,a.revnext()}),e.click(function(){c.sc_indicator="arrow",c.sc_indicator_dir=1,a.revprev()})):(e.click(function(){c.sc_indicator="arrow",c.sc_indicator_dir=0,a.revnext()}),d.click(function(){c.sc_indicator="arrow",c.sc_indicator_dir=1,a.revprev()})),b.right.j=a.find(".tp-rightarrow.tparrows"),b.left.j=a.find(".tp-leftarrow.tparrows"),b.padding_top=parseInt(c.carousel.padding_top||0,0),b.padding_bottom=parseInt(c.carousel.padding_bottom||0,0),t(d,b.left,c),t(e,b.right,c),b.left.opt=c,b.right.opt=c,"outer-left"!=b.position&&"outer-right"!=b.position||(c.outernav=!0)},r=function(a,b,c){var d=a.outerHeight(!0),f=(a.outerWidth(!0),void 0==b.opt?0:0==c.conh?c.height:c.conh),g="layergrid"==b.container?"fullscreen"==c.sliderLayout?c.height/2-c.gridheight[c.curWinRange]*c.bh/2:"on"==c.autoHeight||void 0!=c.minHeight&&c.minHeight>0?f/2-c.gridheight[c.curWinRange]*c.bh/2:0:0,h="top"===b.v_align?{top:"0px",y:Math.round(b.v_offset+g)+"px"}:"center"===b.v_align?{top:"50%",y:Math.round(0-d/2+b.v_offset)+"px"}:{top:"100%",y:Math.round(0-(d+b.v_offset+g))+"px"};a.hasClass("outer-bottom")||punchgs.TweenLite.set(a,h)},s=function(a,b,c){var e=(a.outerHeight(!0),a.outerWidth(!0)),f="layergrid"==b.container?"carousel"===c.sliderType?0:c.width/2-c.gridwidth[c.curWinRange]*c.bw/2:0,g="left"===b.h_align?{left:"0px",x:Math.round(b.h_offset+f)+"px"}:"center"===b.h_align?{left:"50%",x:Math.round(0-e/2+b.h_offset)+"px"}:{left:"100%",x:Math.round(0-(e+b.h_offset+f))+"px"};punchgs.TweenLite.set(a,g)},t=function(a,b,c){var d=a.closest(".tp-simpleresponsive").length>0?a.closest(".tp-simpleresponsive"):a.closest(".tp-revslider-mainul").length>0?a.closest(".tp-revslider-mainul"):a.closest(".rev_slider_wrapper").length>0?a.closest(".rev_slider_wrapper"):a.parent().find(".tp-revslider-mainul"),e=d.width(),f=d.height();if(r(a,b,c),s(a,b,c),"outer-left"!==b.position||"fullwidth"!=b.sliderLayout&&"fullscreen"!=b.sliderLayout?"outer-right"!==b.position||"fullwidth"!=b.sliderLayout&&"fullscreen"!=b.sliderLayout||punchgs.TweenLite.set(a,{right:0-a.outerWidth()+"px",x:b.h_offset+"px"}):punchgs.TweenLite.set(a,{left:0-a.outerWidth()+"px",x:b.h_offset+"px"}),a.hasClass("tp-thumbs")||a.hasClass("tp-tabs")){var g=a.data("wr_padding"),h=a.data("maxw"),i=a.data("maxh"),j=a.hasClass("tp-thumbs")?a.find(".tp-thumb-mask"):a.find(".tp-tab-mask"),k=parseInt(b.padding_top||0,0),l=parseInt(b.padding_bottom||0,0);h>e&&"outer-left"!==b.position&&"outer-right"!==b.position?(punchgs.TweenLite.set(a,{left:"0px",x:0,maxWidth:e-2*g+"px"}),punchgs.TweenLite.set(j,{maxWidth:e-2*g+"px"})):(punchgs.TweenLite.set(a,{maxWidth:h+"px"}),punchgs.TweenLite.set(j,{maxWidth:h+"px"})),i+2*g>f&&"outer-bottom"!==b.position&&"outer-top"!==b.position?(punchgs.TweenLite.set(a,{top:"0px",y:0,maxHeight:k+l+(f-2*g)+"px"}),punchgs.TweenLite.set(j,{maxHeight:k+l+(f-2*g)+"px"})):(punchgs.TweenLite.set(a,{maxHeight:i+"px"}),punchgs.TweenLite.set(j,{maxHeight:i+"px"})),"outer-left"!==b.position&&"outer-right"!==b.position&&(k=0,l=0),b.span===!0&&"vertical"===b.direction?(punchgs.TweenLite.set(a,{maxHeight:k+l+(f-2*g)+"px",height:k+l+(f-2*g)+"px",top:0-k,y:0}),r(j,b,c)):b.span===!0&&"horizontal"===b.direction&&(punchgs.TweenLite.set(a,{maxWidth:"100%",width:e-2*g+"px",left:0,x:0}),s(j,b,c))}},u=function(a,b,c,d){0===a.find(".tp-bullets").length&&(b.style=void 0===b.style?"":b.style,a.append('<div class="tp-bullets '+b.style+" "+b.direction+'"></div>'));var e=a.find(".tp-bullets"),f=c.data("index"),g=b.tmp;jQuery.each(d.thumbs[c.index()].params,function(a,b){g=g.replace(b.from,b.to)}),e.append('<div class="justaddedbullet tp-bullet">'+g+"</div>");var h=a.find(".justaddedbullet"),i=a.find(".tp-bullet").length,j=h.outerWidth()+parseInt(void 0===b.space?0:b.space,0),k=h.outerHeight()+parseInt(void 0===b.space?0:b.space,0);"vertical"===b.direction?(h.css({top:(i-1)*k+"px",left:"0px"}),e.css({height:(i-1)*k+h.outerHeight(),width:h.outerWidth()})):(h.css({left:(i-1)*j+"px",top:"0px"}),e.css({width:(i-1)*j+h.outerWidth(),height:h.outerHeight()})),h.find(".tp-bullet-image").css({backgroundImage:"url("+d.thumbs[c.index()].src+")"}),h.data("liref",f),h.click(function(){d.sc_indicator="bullet",a.revcallslidewithid(f),a.find(".tp-bullet").removeClass("selected"),jQuery(this).addClass("selected")}),h.removeClass("justaddedbullet"),b.padding_top=parseInt(d.carousel.padding_top||0,0),b.padding_bottom=parseInt(d.carousel.padding_bottom||0,0),b.opt=d,"outer-left"!=b.position&&"outer-right"!=b.position||(d.outernav=!0),e.addClass("nav-pos-hor-"+b.h_align),e.addClass("nav-pos-ver-"+b.v_align),e.addClass("nav-dir-"+b.direction),t(e,b,d)},v=function(a,b){b=parseFloat(b),a=a.replace("#","");var c=parseInt(a.substring(0,2),16),d=parseInt(a.substring(2,4),16),e=parseInt(a.substring(4,6),16),f="rgba("+c+","+d+","+e+","+b+")";return f},w=function(a,b,c,d,e){var f="tp-thumb"===d?".tp-thumbs":".tp-tabs",g="tp-thumb"===d?".tp-thumb-mask":".tp-tab-mask",h="tp-thumb"===d?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",i="tp-thumb"===d?".tp-thumb":".tp-tab",j="tp-thumb"===d?".tp-thumb-image":".tp-tab-image";if(b.visibleAmount=b.visibleAmount>e.slideamount?e.slideamount:b.visibleAmount,b.sliderLayout=e.sliderLayout,0===a.parent().find(f).length){b.style=void 0===b.style?"":b.style;var k=b.span===!0?"tp-span-wrapper":"",l='<div class="'+d+"s "+k+" "+b.position+" "+b.style+'"><div class="'+d+'-mask"><div class="'+d+'s-inner-wrapper" style="position:relative;"></div></div></div>';"outer-top"===b.position?a.parent().prepend(l):"outer-bottom"===b.position?a.after(l):a.append(l),b.padding_top=parseInt(e.carousel.padding_top||0,0),b.padding_bottom=parseInt(e.carousel.padding_bottom||0,0),"outer-left"!=b.position&&"outer-right"!=b.position||(e.outernav=!0)}var m=c.data("index"),n=a.parent().find(f),o=n.find(g),p=o.find(h),q="horizontal"===b.direction?b.width*b.visibleAmount+b.space*(b.visibleAmount-1):b.width,r="horizontal"===b.direction?b.height:b.height*b.visibleAmount+b.space*(b.visibleAmount-1),s=b.tmp;jQuery.each(e.thumbs[c.index()].params,function(a,b){s=s.replace(b.from,b.to)}),p.append('<div data-liindex="'+c.index()+'" data-liref="'+m+'" class="justaddedthumb '+d+'" style="width:'+b.width+"px;height:"+b.height+'px;">'+s+"</div>");var u=n.find(".justaddedthumb"),w=n.find(i).length,x=u.outerWidth()+parseInt(void 0===b.space?0:b.space,0),y=u.outerHeight()+parseInt(void 0===b.space?0:b.space,0);u.find(j).css({backgroundImage:"url("+e.thumbs[c.index()].src+")"}),"vertical"===b.direction?(u.css({top:(w-1)*y+"px",left:"0px"}),p.css({height:(w-1)*y+u.outerHeight(),width:u.outerWidth()})):(u.css({left:(w-1)*x+"px",top:"0px"}),p.css({width:(w-1)*x+u.outerWidth(),height:u.outerHeight()})),n.data("maxw",q),n.data("maxh",r),n.data("wr_padding",b.wrapper_padding);var z="outer-top"===b.position||"outer-bottom"===b.position?"relative":"absolute";"outer-top"!==b.position&&"outer-bottom"!==b.position||"center"!==b.h_align?"0":"auto";o.css({maxWidth:q+"px",maxHeight:r+"px",overflow:"hidden",position:"relative"}),n.css({maxWidth:q+"px",maxHeight:r+"px",overflow:"visible",position:z,background:v(b.wrapper_color,b.wrapper_opacity),padding:b.wrapper_padding+"px",boxSizing:"contet-box"}),u.click(function(){e.sc_indicator="bullet";var b=a.parent().find(h).data("distance");b=void 0===b?0:b,Math.abs(b)<10&&(a.revcallslidewithid(m),a.parent().find(f).removeClass("selected"),jQuery(this).addClass("selected"))}),u.removeClass("justaddedthumb"),b.opt=e,n.addClass("nav-pos-hor-"+b.h_align),n.addClass("nav-pos-ver-"+b.v_align),n.addClass("nav-dir-"+b.direction),t(n,b,e)},x=function(a){var b=a.c.parent().find(".outer-top"),c=a.c.parent().find(".outer-bottom");a.top_outer=b.hasClass("tp-forcenotvisible")?0:b.outerHeight()||0,a.bottom_outer=c.hasClass("tp-forcenotvisible")?0:c.outerHeight()||0},y=function(a,b,c,d){b>c||c>d?a.addClass("tp-forcenotvisible"):a.removeClass("tp-forcenotvisible")}}(jQuery);
/********************************************
 * REVOLUTION 5.2.6 EXTENSION - PARALLAX
 * @version: 2.2.0 (16.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(a){"use strict";function e(a,b){a.lastscrolltop=b}var b=jQuery.fn.revolution,c=b.is_mobile(),d={alias:"Parallax Min JS",name:"revolution.extensions.parallax.min.js",min_core:"5.3",version:"2.2.0"};jQuery.extend(!0,b,{checkForParallax:function(a,e){function g(a){if("3D"==f.type||"3d"==f.type){a.find(".slotholder").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'),a.find(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:'+f.ddd_layer_overflow+';"></div>'),a.find(".rs-parallaxlevel-tobggroup").closest(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>');var b=a.find(".dddwrapper"),c=a.find(".dddwrapper-layer"),d=a.find(".dddwrapper-layertobggroup");d.appendTo(b),"carousel"==e.sliderType&&("on"==f.ddd_shadow&&b.addClass("dddwrappershadow"),punchgs.TweenLite.set(b,{borderRadius:e.carousel.border_radius})),punchgs.TweenLite.set(a,{overflow:"visible",transformStyle:"preserve-3d",perspective:1600}),punchgs.TweenLite.set(b,{force3D:"auto",transformOrigin:"50% 50%"}),punchgs.TweenLite.set(c,{force3D:"auto",transformOrigin:"50% 50%",zIndex:5}),punchgs.TweenLite.set(e.ul,{transformStyle:"preserve-3d",transformPerspective:1600})}}if("stop"===b.compare_version(d).check)return!1;var f=e.parallax;if(!f.done){if(f.done=!0,c&&"on"==f.disable_onmobile)return!1;"3D"!=f.type&&"3d"!=f.type||(punchgs.TweenLite.set(e.c,{overflow:f.ddd_overflow}),punchgs.TweenLite.set(e.ul,{overflow:f.ddd_overflow}),"carousel"!=e.sliderType&&"on"==f.ddd_shadow&&(e.c.prepend('<div class="dddwrappershadow"></div>'),punchgs.TweenLite.set(e.c.find(".dddwrappershadow"),{force3D:"auto",transformPerspective:1600,transformOrigin:"50% 50%",width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:0}))),e.li.each(function(){g(jQuery(this))}),("3D"==f.type||"3d"==f.type)&&e.c.find(".tp-static-layers").length>0&&(punchgs.TweenLite.set(e.c.find(".tp-static-layers"),{top:0,left:0,width:"100%",height:"100%"}),g(e.c.find(".tp-static-layers"))),f.pcontainers=new Array,f.pcontainer_depths=new Array,f.bgcontainers=new Array,f.bgcontainer_depths=new Array,e.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function(){var a=jQuery(this),b=a.data("bgparallax")||e.parallax.bgparallax;b="on"==b?1:b,void 0!==b&&"off"!==b&&(f.bgcontainers.push(a),f.bgcontainer_depths.push(e.parallax.levels[parseInt(b,0)-1]/100))});for(var h=1;h<=f.levels.length;h++)e.c.find(".rs-parallaxlevel-"+h).each(function(){var a=jQuery(this),b=a.closest(".tp-parallax-wrap");b.data("parallaxlevel",f.levels[h-1]),b.addClass("tp-parallax-container"),f.pcontainers.push(b),f.pcontainer_depths.push(f.levels[h-1])});"mouse"!=f.type&&"scroll+mouse"!=f.type&&"mouse+scroll"!=f.type&&"3D"!=f.type&&"3d"!=f.type||(a.mouseenter(function(b){var c=a.find(".active-revslide"),d=a.offset().top,e=a.offset().left,f=b.pageX-e,g=b.pageY-d;c.data("enterx",f),c.data("entery",g)}),a.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",function(b,c){var d=c&&c.li?c.li:a.find(".active-revslide");if("enterpoint"==f.origo){var g=a.offset().top,h=a.offset().left;void 0==d.data("enterx")&&d.data("enterx",b.pageX-h),void 0==d.data("entery")&&d.data("entery",b.pageY-g);var i=d.data("enterx")||b.pageX-h,j=d.data("entery")||b.pageY-g,k=i-(b.pageX-h),l=j-(b.pageY-g),m=f.speed/1e3||.4}else var g=a.offset().top,h=a.offset().left,k=e.conw/2-(b.pageX-h),l=e.conh/2-(b.pageY-g),m=f.speed/1e3||3;"mouseleave"==b.type&&(k=f.ddd_lasth||0,l=f.ddd_lastv||0,m=1.5);for(var n=0;n<f.pcontainers.length;n++){var o=f.pcontainers[n],p=f.pcontainer_depths[n],q="3D"==f.type||"3d"==f.type?p/200:p/100,r=k*q,s=l*q;"scroll+mouse"==f.type||"mouse+scroll"==f.type?punchgs.TweenLite.to(o,m,{force3D:"auto",x:r,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(o,m,{force3D:"auto",x:r,y:s,ease:punchgs.Power3.easeOut,overwrite:"all"})}if("3D"==f.type||"3d"==f.type){var t=".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";"carousel"===e.sliderType&&(t=".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),e.c.find(t).each(function(){var a=jQuery(this),c=f.levels[f.levels.length-1]/200,d=k*c,g=l*c,h=0==e.conw?0:Math.round(k/e.conw*c*100)||0,i=0==e.conh?0:Math.round(l/e.conh*c*100)||0,j=a.closest("li"),n=0,o=!1;a.hasClass("dddwrapper-layer")&&(n=f.ddd_z_correction||65,o=!0),a.hasClass("dddwrapper-layer")&&(d=0,g=0),j.hasClass("active-revslide")||"carousel"!=e.sliderType?"on"!=f.ddd_bgfreeze||o?punchgs.TweenLite.to(a,m,{rotationX:i,rotationY:-h,x:d,z:n,y:g,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(a,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(a,.5,{force3D:"auto",rotationY:0,x:0,y:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==b.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}}),c&&(window.ondeviceorientation=function(b){var c=Math.round(b.beta||0)-70,d=Math.round(b.gamma||0),g=a.find(".active-revslide");if(jQuery(window).width()>jQuery(window).height()){var h=d;d=c,c=h}var i=a.width(),j=a.height(),k=360/i*d,l=180/j*c,m=f.speed/1e3||3,n=[];if(g.find(".tp-parallax-container").each(function(a){n.push(jQuery(this))}),a.find(".tp-static-layers .tp-parallax-container").each(function(){n.push(jQuery(this))}),jQuery.each(n,function(){var a=jQuery(this),b=parseInt(a.data("parallaxlevel"),0),c=b/100,d=k*c*2,e=l*c*4;punchgs.TweenLite.to(a,m,{force3D:"auto",x:d,y:e,ease:punchgs.Power3.easeOut,overwrite:"all"})}),"3D"==f.type||"3d"==f.type){var o=".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";"carousel"===e.sliderType&&(o=".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),e.c.find(o).each(function(){var a=jQuery(this),c=f.levels[f.levels.length-1]/200,d=k*c,g=l*c*3,h=0==e.conw?0:Math.round(k/e.conw*c*500)||0,i=0==e.conh?0:Math.round(l/e.conh*c*700)||0,j=a.closest("li"),n=0,o=!1;a.hasClass("dddwrapper-layer")&&(n=f.ddd_z_correction||65,o=!0),a.hasClass("dddwrapper-layer")&&(d=0,g=0),j.hasClass("active-revslide")||"carousel"!=e.sliderType?"on"!=f.ddd_bgfreeze||o?punchgs.TweenLite.to(a,m,{rotationX:i,rotationY:-h,x:d,z:n,y:g,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(a,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(a,.5,{force3D:"auto",rotationY:0,z:0,x:0,y:0,rotationX:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==b.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}}));var i=e.scrolleffect;if(i.bgs=new Array,i.on){if("on"===i.on_slidebg)for(var h=0;h<e.allslotholder.length;h++)i.bgs.push(e.allslotholder[h]);i.multiplicator_layers=parseFloat(i.multiplicator_layers),i.multiplicator=parseFloat(i.multiplicator)}void 0!==i.layers&&0===i.layers.length&&(i.layers=!1),void 0!==i.bgs&&0===i.bgs.length&&(i.bgs=!1),b.scrollTicker(e,a)}},scrollTicker:function(a,d){1!=a.scrollTicker&&(a.scrollTicker=!0,c?(punchgs.TweenLite.ticker.fps(150),punchgs.TweenLite.ticker.addEventListener("tick",function(){b.scrollHandling(a)},d,!1,1)):document.addEventListener("scroll",function(c){b.scrollHandling(a,!0)},{passive:!0})),b.scrollHandling(a,!0)},scrollHandling:function(a,d){if(a.lastwindowheight=a.lastwindowheight||window.innerHeight,a.conh=0===a.conh||void 0===a.conh?a.infullscreenmode?a.minHeight:a.c.height():a.conh,a.lastscrolltop==window.scrollY&&!a.duringslidechange&&!d)return!1;punchgs.TweenLite.delayedCall(.2,e,[a,window.scrollY]);var f=a.c[0].getBoundingClientRect(),g=a.viewPort,h=a.parallax,i=f.top<0||f.height>a.lastwindowheight?f.top/f.height:f.bottom>a.lastwindowheight?(f.bottom-a.lastwindowheight)/f.height:0;if(a.scrollproc=i,b.callBackHandling&&b.callBackHandling(a,"parallax","start"),g.enable){var j=1-Math.abs(i);j=j<0?0:j,jQuery.isNumeric(g.visible_area)||g.visible_area.indexOf("%")!==-1&&(g.visible_area=parseInt(g.visible_area)/100),1-g.visible_area<=j?a.inviewport||(a.inviewport=!0,b.enterInViewPort(a)):a.inviewport&&(a.inviewport=!1,b.leaveViewPort(a))}if(c&&"on"==h.disable_onmobile)return!1;if("3d"!=h.type&&"3D"!=h.type){if(("scroll"==h.type||"scroll+mouse"==h.type||"mouse+scroll"==h.type)&&h.pcontainers)for(var k=0;k<h.pcontainers.length;k++)if(h.pcontainers[k].length>0){var l=h.pcontainers[k],m=h.pcontainer_depths[k]/100,n=Math.round(i*-(m*a.conh)*10)/10||0;l.data("parallaxoffset",n),punchgs.TweenLite.set(l,{overwrite:"auto",force3D:"auto",y:n})}if(h.bgcontainers)for(var k=0;k<h.bgcontainers.length;k++){var o=h.bgcontainers[k],p=h.bgcontainer_depths[k],n=i*-(p*a.conh)||0;punchgs.TweenLite.set(o,{position:"absolute",top:"0px",left:"0px",backfaceVisibility:"hidden",force3D:"true",y:n+"px"})}}var q=a.scrolleffect;if(q.on&&("on"!==q.disable_on_mobile||!c)){var r=Math.abs(i)-q.tilt/100;if(r=r<0?0:r,q.layers!==!1){var s=1-r*q.multiplicator_layers,t={backfaceVisibility:"hidden",force3D:"true"};if("top"==q.direction&&i>=0&&(s=1),"bottom"==q.direction&&i<=0&&(s=1),s=s>1?1:s<0?0:s,"on"===q.fade&&(t.opacity=s),"on"===q.blur){var u=(1-s)*q.maxblur;t["-webkit-filter"]="blur("+u+"px)",t.filter="blur("+u+"px)"}if("on"===q.grayscale){var v=100*(1-s),w="grayscale("+v+"%)";t["-webkit-filter"]=void 0===t["-webkit-filter"]?w:t["-webkit-filter"]+" "+w,t.filter=void 0===t.filter?w:t.filter+" "+w}punchgs.TweenLite.set(q.layers,t)}if(q.bgs!==!1){var s=1-r*q.multiplicator,t={backfaceVisibility:"hidden",force3D:"true"};if("top"==q.direction&&i>=0&&(s=1),"bottom"==q.direction&&i<=0&&(s=1),s=s>1?1:s<0?0:s,"on"===q.fade&&(t.opacity=s),"on"===q.blur){var u=(1-s)*q.maxblur;t["-webkit-filter"]="blur("+u+"px)",t.filter="blur("+u+"px)"}if("on"===q.grayscale){var v=100*(1-s),w="grayscale("+v+"%)";t["-webkit-filter"]=void 0===t["-webkit-filter"]?w:t["-webkit-filter"]+" "+w,t.filter=void 0===t.filter?w:t.filter+" "+w}punchgs.TweenLite.set(q.bgs,t)}}b.callBackHandling&&b.callBackHandling(a,"parallax","end")}})}(jQuery);
/************************************************
 * REVOLUTION 5.3 EXTENSION - SLIDE ANIMATIONS
 * @version: 1.6 (17.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/
!function(a){"use strict";var b=jQuery.fn.revolution,c={alias:"SlideAnimations Min JS",name:"revolution.extensions.slideanims.min.js",min_core:"5.0",version:"1.6"};jQuery.extend(!0,b,{animateSlide:function(a,d,e,f,h,i,j,k){return"stop"===b.compare_version(c).check?k:g(a,d,e,f,h,i,j,k)}});var d=function(a,c,d,e){var f=a,g=f.find(".defaultimg"),h=g.data("mediafilter"),i=f.data("zoomstart"),j=f.data("rotationstart");void 0!=g.data("currotate")&&(j=g.data("currotate")),void 0!=g.data("curscale")&&"box"==e?i=100*g.data("curscale"):void 0!=g.data("curscale")&&(i=g.data("curscale")),b.slotSize(g,c);var k=g.attr("src"),l=g.css("backgroundColor"),m=c.width,n=c.height,o=g.data("fxof"),p=0;"on"==c.autoHeight&&(n=c.c.height()),void 0==o&&(o=0);var q=0,r=g.data("bgfit"),s=g.data("bgrepeat"),t=g.data("bgposition");switch(void 0==r&&(r="cover"),void 0==s&&(s="no-repeat"),void 0==t&&(t="center center"),e){case"box":for(var u=0,v=0,w=0;w<c.slots;w++){v=0;for(var x=0;x<c.slots;x++)f.append('<div class="slot" style="position:absolute;top:'+(p+v)+"px;left:"+(o+u)+"px;width:"+c.slotw+"px;height:"+c.sloth+'px;overflow:hidden;"><div class="slotslide '+h+'" data-x="'+u+'" data-y="'+v+'" style="position:absolute;top:0px;left:0px;width:'+c.slotw+"px;height:"+c.sloth+'px;overflow:hidden;"><div style="position:absolute;top:'+(0-v)+"px;left:"+(0-u)+"px;width:"+m+"px;height:"+n+"px;background-color:"+l+";background-image:url("+k+");background-repeat:"+s+";background-size:"+r+";background-position:"+t+';"></div></div></div>'),v+=c.sloth,void 0!=i&&void 0!=j&&punchgs.TweenLite.set(f.find(".slot").last(),{rotationZ:j});u+=c.slotw}break;case"vertical":case"horizontal":if("horizontal"==e){if(!d)var q=0-c.slotw;for(var x=0;x<c.slots;x++)f.append('<div class="slot" style="position:absolute;top:'+(0+p)+"px;left:"+(o+x*c.slotw)+"px;overflow:hidden;width:"+(c.slotw+.3)+"px;height:"+n+'px"><div class="slotslide '+h+'" style="position:absolute;top:0px;left:'+q+"px;width:"+(c.slotw+.6)+"px;height:"+n+'px;overflow:hidden;"><div style="background-color:'+l+";position:absolute;top:0px;left:"+(0-x*c.slotw)+"px;width:"+m+"px;height:"+n+"px;background-image:url("+k+");background-repeat:"+s+";background-size:"+r+";background-position:"+t+';"></div></div></div>'),void 0!=i&&void 0!=j&&punchgs.TweenLite.set(f.find(".slot").last(),{rotationZ:j})}else{if(!d)var q=0-c.sloth;for(var x=0;x<c.slots+2;x++)f.append('<div class="slot" style="position:absolute;top:'+(p+x*c.sloth)+"px;left:"+o+"px;overflow:hidden;width:"+m+"px;height:"+c.sloth+'px"><div class="slotslide '+h+'" style="position:absolute;top:'+q+"px;left:0px;width:"+m+"px;height:"+c.sloth+'px;overflow:hidden;"><div style="background-color:'+l+";position:absolute;top:"+(0-x*c.sloth)+"px;left:0px;width:"+m+"px;height:"+n+"px;background-image:url("+k+");background-repeat:"+s+";background-size:"+r+";background-position:"+t+';"></div></div></div>'),void 0!=i&&void 0!=j&&punchgs.TweenLite.set(f.find(".slot").last(),{rotationZ:j})}}},e=function(a,b,c,d){function y(){jQuery.each(v,function(a,c){c[0]!=b&&c[8]!=b||(q=c[1],r=c[2],s=t),t+=1})}var e=a[0].opt,f=punchgs.Power1.easeIn,g=punchgs.Power1.easeOut,h=punchgs.Power1.easeInOut,i=punchgs.Power2.easeIn,j=punchgs.Power2.easeOut,k=punchgs.Power2.easeInOut,m=(punchgs.Power3.easeIn,punchgs.Power3.easeOut),n=punchgs.Power3.easeInOut,o=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],p=[16,17,18,19,20,21,22,23,24,25,27],q=0,r=1,s=0,t=0,v=(new Array,[["boxslide",0,1,10,0,"box",!1,null,0,g,g,500,6],["boxfade",1,0,10,0,"box",!1,null,1,h,h,700,5],["slotslide-horizontal",2,0,0,200,"horizontal",!0,!1,2,k,k,700,3],["slotslide-vertical",3,0,0,200,"vertical",!0,!1,3,k,k,700,3],["curtain-1",4,3,0,0,"horizontal",!0,!0,4,g,g,300,5],["curtain-2",5,3,0,0,"horizontal",!0,!0,5,g,g,300,5],["curtain-3",6,3,25,0,"horizontal",!0,!0,6,g,g,300,5],["slotzoom-horizontal",7,0,0,400,"horizontal",!0,!0,7,g,g,300,7],["slotzoom-vertical",8,0,0,0,"vertical",!0,!0,8,j,j,500,8],["slotfade-horizontal",9,0,0,1e3,"horizontal",!0,null,9,j,j,2e3,10],["slotfade-vertical",10,0,0,1e3,"vertical",!0,null,10,j,j,2e3,10],["fade",11,0,1,300,"horizontal",!0,null,11,k,k,1e3,1],["crossfade",11,1,1,300,"horizontal",!0,null,11,k,k,1e3,1],["fadethroughdark",11,2,1,300,"horizontal",!0,null,11,k,k,1e3,1],["fadethroughlight",11,3,1,300,"horizontal",!0,null,11,k,k,1e3,1],["fadethroughtransparent",11,4,1,300,"horizontal",!0,null,11,k,k,1e3,1],["slideleft",12,0,1,0,"horizontal",!0,!0,12,n,n,1e3,1],["slideup",13,0,1,0,"horizontal",!0,!0,13,n,n,1e3,1],["slidedown",14,0,1,0,"horizontal",!0,!0,14,n,n,1e3,1],["slideright",15,0,1,0,"horizontal",!0,!0,15,n,n,1e3,1],["slideoverleft",12,7,1,0,"horizontal",!0,!0,12,n,n,1e3,1],["slideoverup",13,7,1,0,"horizontal",!0,!0,13,n,n,1e3,1],["slideoverdown",14,7,1,0,"horizontal",!0,!0,14,n,n,1e3,1],["slideoverright",15,7,1,0,"horizontal",!0,!0,15,n,n,1e3,1],["slideremoveleft",12,8,1,0,"horizontal",!0,!0,12,n,n,1e3,1],["slideremoveup",13,8,1,0,"horizontal",!0,!0,13,n,n,1e3,1],["slideremovedown",14,8,1,0,"horizontal",!0,!0,14,n,n,1e3,1],["slideremoveright",15,8,1,0,"horizontal",!0,!0,15,n,n,1e3,1],["papercut",16,0,0,600,"",null,null,16,n,n,1e3,2],["3dcurtain-horizontal",17,0,20,100,"vertical",!1,!0,17,h,h,500,7],["3dcurtain-vertical",18,0,10,100,"horizontal",!1,!0,18,h,h,500,5],["cubic",19,0,20,600,"horizontal",!1,!0,19,n,n,500,1],["cube",19,0,20,600,"horizontal",!1,!0,20,n,n,500,1],["flyin",20,0,4,600,"vertical",!1,!0,21,m,n,500,1],["turnoff",21,0,1,500,"horizontal",!1,!0,22,n,n,500,1],["incube",22,0,20,200,"horizontal",!1,!0,23,k,k,500,1],["cubic-horizontal",23,0,20,500,"vertical",!1,!0,24,j,j,500,1],["cube-horizontal",23,0,20,500,"vertical",!1,!0,25,j,j,500,1],["incube-horizontal",24,0,20,500,"vertical",!1,!0,26,k,k,500,1],["turnoff-vertical",25,0,1,200,"horizontal",!1,!0,27,k,k,500,1],["fadefromright",14,1,1,0,"horizontal",!0,!0,28,k,k,1e3,1],["fadefromleft",15,1,1,0,"horizontal",!0,!0,29,k,k,1e3,1],["fadefromtop",14,1,1,0,"horizontal",!0,!0,30,k,k,1e3,1],["fadefrombottom",13,1,1,0,"horizontal",!0,!0,31,k,k,1e3,1],["fadetoleftfadefromright",12,2,1,0,"horizontal",!0,!0,32,k,k,1e3,1],["fadetorightfadefromleft",15,2,1,0,"horizontal",!0,!0,33,k,k,1e3,1],["fadetobottomfadefromtop",14,2,1,0,"horizontal",!0,!0,34,k,k,1e3,1],["fadetotopfadefrombottom",13,2,1,0,"horizontal",!0,!0,35,k,k,1e3,1],["parallaxtoright",15,3,1,0,"horizontal",!0,!0,36,k,i,1500,1],["parallaxtoleft",12,3,1,0,"horizontal",!0,!0,37,k,i,1500,1],["parallaxtotop",14,3,1,0,"horizontal",!0,!0,38,k,f,1500,1],["parallaxtobottom",13,3,1,0,"horizontal",!0,!0,39,k,f,1500,1],["scaledownfromright",12,4,1,0,"horizontal",!0,!0,40,k,i,1e3,1],["scaledownfromleft",15,4,1,0,"horizontal",!0,!0,41,k,i,1e3,1],["scaledownfromtop",14,4,1,0,"horizontal",!0,!0,42,k,i,1e3,1],["scaledownfrombottom",13,4,1,0,"horizontal",!0,!0,43,k,i,1e3,1],["zoomout",13,5,1,0,"horizontal",!0,!0,44,k,i,1e3,1],["zoomin",13,6,1,0,"horizontal",!0,!0,45,k,i,1e3,1],["slidingoverlayup",27,0,1,0,"horizontal",!0,!0,47,h,g,2e3,1],["slidingoverlaydown",28,0,1,0,"horizontal",!0,!0,48,h,g,2e3,1],["slidingoverlayright",30,0,1,0,"horizontal",!0,!0,49,h,g,2e3,1],["slidingoverlayleft",29,0,1,0,"horizontal",!0,!0,50,h,g,2e3,1],["parallaxcirclesup",31,0,1,0,"horizontal",!0,!0,51,k,f,1500,1],["parallaxcirclesdown",32,0,1,0,"horizontal",!0,!0,52,k,f,1500,1],["parallaxcirclesright",33,0,1,0,"horizontal",!0,!0,53,k,f,1500,1],["parallaxcirclesleft",34,0,1,0,"horizontal",!0,!0,54,k,f,1500,1],["notransition",26,0,1,0,"horizontal",!0,null,46,k,i,1e3,1],["parallaxright",15,3,1,0,"horizontal",!0,!0,55,k,i,1500,1],["parallaxleft",12,3,1,0,"horizontal",!0,!0,56,k,i,1500,1],["parallaxup",14,3,1,0,"horizontal",!0,!0,57,k,f,1500,1],["parallaxdown",13,3,1,0,"horizontal",!0,!0,58,k,f,1500,1]]);e.duringslidechange=!0,e.testanims=!1,1==e.testanims&&(e.nexttesttransform=void 0===e.nexttesttransform?34:e.nexttesttransform+1,e.nexttesttransform=e.nexttesttransform>70?0:e.nexttesttransform,b=v[e.nexttesttransform][0],console.log(b+"  "+e.nexttesttransform+"  "+v[e.nexttesttransform][1]+"  "+v[e.nexttesttransform][2])),jQuery.each(["parallaxcircles","slidingoverlay","slide","slideover","slideremove","parallax","parralaxto"],function(a,c){b==c+"horizontal"&&(b=1!=d?c+"left":c+"right"),b==c+"vertical"&&(b=1!=d?c+"up":c+"down")}),"random"==b&&(b=Math.round(Math.random()*v.length-1),b>v.length-1&&(b=v.length-1)),"random-static"==b&&(b=Math.round(Math.random()*o.length-1),b>o.length-1&&(b=o.length-1),b=o[b]),"random-premium"==b&&(b=Math.round(Math.random()*p.length-1),b>p.length-1&&(b=p.length-1),b=p[b]);var w=[12,13,14,15,16,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];if(1==e.isJoomla&&void 0!=window.MooTools&&w.indexOf(b)!=-1){var x=Math.round(Math.random()*(p.length-2))+1;x>p.length-1&&(x=p.length-1),0==x&&(x=1),b=p[x]}y(),q>30&&(q=30),q<0&&(q=0);var z=new Object;return z.nexttrans=q,z.STA=v[s],z.specials=r,z},f=function(a,b){return void 0==b||jQuery.isNumeric(a)?a:void 0==a?a:a.split(",")[b]},g=function(a,b,c,g,h,i,j,k){function V(a,b,c,d,e){var f=a.find(".slot"),g=6,h=[2,1.2,.9,.7,.55,.42],j=a.width(),l=a.height();f.wrap('<div class="slot-circle-wrapper" style="overflow:hidden;position:absolute;border:1px solid #fff"></div>');for(var n=0;n<g;n++)f.parent().clone(!1).appendTo(i);a.find(".slot-circle-wrapper").each(function(a){if(a<g){var d=jQuery(this),f=d.find(".slot"),i=j>l?h[a]*j:h[a]*l,m=i,n=0+(m/2-j/2),o=0+(i/2-l/2),p=0!=a?"50%":"0",q=31==c?l/2-i/2:32==c?l/2-i/2:l/2-i/2,r=33==c?j/2-m/2:34==c?j-m:j/2-m/2,s={scale:1,transformOrigo:"50% 50%",width:m+"px",height:i+"px",top:q+"px",left:r+"px",borderRadius:p},t={scale:1,top:l/2-i/2,left:j/2-m/2,ease:e},u=31==c?o:32==c?o:o,v=33==c?n:34==c?n+j/2:n,w={width:j,height:l,autoAlpha:1,top:u+"px",position:"absolute",left:v+"px"},x={top:o+"px",left:n+"px",ease:e},y=b,z=0;k.add(punchgs.TweenLite.fromTo(d,y,s,t),z),k.add(punchgs.TweenLite.fromTo(f,y,w,x),z),k.add(punchgs.TweenLite.fromTo(d,.001,{autoAlpha:0},{autoAlpha:1}),0)}})}var l=c[0].opt,m=h.index(),n=g.index(),o=n<m?1:0;"arrow"==l.sc_indicator&&(o=l.sc_indicator_dir);var p=e(c,b,i,o),q=p.STA,r=p.specials,a=p.nexttrans;"on"==i.data("kenburns")&&(a=11);var s=g.data("nexttransid")||0,t=f(g.data("masterspeed"),s);t="default"===t?q[11]:"random"===t?Math.round(1e3*Math.random()+300):void 0!=t?parseInt(t,0):q[11],t=t>l.delay?l.delay:t,t+=q[4],l.slots=f(g.data("slotamount"),s),l.slots=void 0==l.slots||"default"==l.slots?q[12]:"random"==l.slots?Math.round(12*Math.random()+4):l.slots,l.slots=l.slots<1?"boxslide"==b?Math.round(6*Math.random()+3):"flyin"==b?Math.round(4*Math.random()+1):l.slots:l.slots,l.slots=(4==a||5==a||6==a)&&l.slots<3?3:l.slots,l.slots=0!=q[3]?Math.min(l.slots,q[3]):l.slots,l.slots=9==a?l.width/l.slots:10==a?l.height/l.slots:l.slots,l.rotate=f(g.data("rotate"),s),l.rotate=void 0==l.rotate||"default"==l.rotate?0:999==l.rotate||"random"==l.rotate?Math.round(360*Math.random()):l.rotate,l.rotate=!jQuery.support.transition||l.ie||l.ie9?0:l.rotate,11!=a&&(null!=q[7]&&d(j,l,q[7],q[5]),null!=q[6]&&d(i,l,q[6],q[5])),k.add(punchgs.TweenLite.set(i.find(".defaultvid"),{y:0,x:0,top:0,left:0,scale:1}),0),k.add(punchgs.TweenLite.set(j.find(".defaultvid"),{y:0,x:0,top:0,left:0,scale:1}),0),k.add(punchgs.TweenLite.set(i.find(".defaultvid"),{y:"+0%",x:"+0%"}),0),k.add(punchgs.TweenLite.set(j.find(".defaultvid"),{y:"+0%",x:"+0%"}),0),k.add(punchgs.TweenLite.set(i,{autoAlpha:1,y:"+0%",x:"+0%"}),0),k.add(punchgs.TweenLite.set(j,{autoAlpha:1,y:"+0%",x:"+0%"}),0),k.add(punchgs.TweenLite.set(i.parent(),{backgroundColor:"transparent"}),0),k.add(punchgs.TweenLite.set(j.parent(),{backgroundColor:"transparent"}),0);var u=f(g.data("easein"),s),v=f(g.data("easeout"),s);if(u="default"===u?q[9]||punchgs.Power2.easeInOut:u||q[9]||punchgs.Power2.easeInOut,v="default"===v?q[10]||punchgs.Power2.easeInOut:v||q[10]||punchgs.Power2.easeInOut,0==a){var w=Math.ceil(l.height/l.sloth),x=0;i.find(".slotslide").each(function(a){var b=jQuery(this);x+=1,x==w&&(x=0),k.add(punchgs.TweenLite.from(b,t/600,{opacity:0,top:0-l.sloth,left:0-l.slotw,rotation:l.rotate,force3D:"auto",ease:u}),(15*a+30*x)/1500)})}if(1==a){var y,z=0;i.find(".slotslide").each(function(a){var b=jQuery(this),c=Math.random()*t+300,d=500*Math.random()+200;c+d>y&&(y=d+d,z=a),k.add(punchgs.TweenLite.from(b,c/1e3,{autoAlpha:0,force3D:"auto",rotation:l.rotate,ease:u}),d/1e3)})}if(2==a){var A=new punchgs.TimelineLite;j.find(".slotslide").each(function(){var a=jQuery(this);A.add(punchgs.TweenLite.to(a,t/1e3,{left:l.slotw,ease:u,force3D:"auto",rotation:0-l.rotate}),0),k.add(A,0)}),i.find(".slotslide").each(function(){var a=jQuery(this);A.add(punchgs.TweenLite.from(a,t/1e3,{left:0-l.slotw,ease:u,force3D:"auto",rotation:l.rotate}),0),k.add(A,0)})}if(3==a){var A=new punchgs.TimelineLite;j.find(".slotslide").each(function(){var a=jQuery(this);A.add(punchgs.TweenLite.to(a,t/1e3,{top:l.sloth,ease:u,rotation:l.rotate,force3D:"auto",transformPerspective:600}),0),k.add(A,0)}),i.find(".slotslide").each(function(){var a=jQuery(this);A.add(punchgs.TweenLite.from(a,t/1e3,{top:0-l.sloth,rotation:l.rotate,ease:v,force3D:"auto",transformPerspective:600}),0),k.add(A,0)})}if(4==a||5==a){setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100);var B=t/1e3,A=new punchgs.TimelineLite;j.find(".slotslide").each(function(b){var c=jQuery(this),d=b*B/l.slots;5==a&&(d=(l.slots-b-1)*B/l.slots/1.5),A.add(punchgs.TweenLite.to(c,3*B,{transformPerspective:600,force3D:"auto",top:0+l.height,opacity:.5,rotation:l.rotate,ease:u,delay:d}),0),k.add(A,0)}),i.find(".slotslide").each(function(b){var c=jQuery(this),d=b*B/l.slots;5==a&&(d=(l.slots-b-1)*B/l.slots/1.5),A.add(punchgs.TweenLite.from(c,3*B,{top:0-l.height,opacity:.5,rotation:l.rotate,force3D:"auto",ease:punchgs.eo,delay:d}),0),k.add(A,0)})}if(6==a){l.slots<2&&(l.slots=2),l.slots%2&&(l.slots=l.slots+1);var A=new punchgs.TimelineLite;setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100),j.find(".slotslide").each(function(a){var b=jQuery(this);if(a+1<l.slots/2)var c=90*(a+2);else var c=90*(2+l.slots-a);A.add(punchgs.TweenLite.to(b,(t+c)/1e3,{top:0+l.height,opacity:1,force3D:"auto",rotation:l.rotate,ease:u}),0),k.add(A,0)}),i.find(".slotslide").each(function(a){var b=jQuery(this);if(a+1<l.slots/2)var c=90*(a+2);else var c=90*(2+l.slots-a);A.add(punchgs.TweenLite.from(b,(t+c)/1e3,{top:0-l.height,opacity:1,force3D:"auto",rotation:l.rotate,ease:v}),0),k.add(A,0)})}if(7==a){t=2*t,t>l.delay&&(t=l.delay);var A=new punchgs.TimelineLite;setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100),j.find(".slotslide").each(function(){var a=jQuery(this).find("div");A.add(punchgs.TweenLite.to(a,t/1e3,{left:0-l.slotw/2+"px",top:0-l.height/2+"px",width:2*l.slotw+"px",height:2*l.height+"px",opacity:0,rotation:l.rotate,force3D:"auto",ease:u}),0),k.add(A,0)}),i.find(".slotslide").each(function(a){var b=jQuery(this).find("div");A.add(punchgs.TweenLite.fromTo(b,t/1e3,{left:0,top:0,opacity:0,transformPerspective:600},{left:0-a*l.slotw+"px",ease:v,force3D:"auto",top:"0px",width:l.width,height:l.height,opacity:1,rotation:0,delay:.1}),0),k.add(A,0)})}if(8==a){t=3*t,t>l.delay&&(t=l.delay);var A=new punchgs.TimelineLite;j.find(".slotslide").each(function(){var a=jQuery(this).find("div");A.add(punchgs.TweenLite.to(a,t/1e3,{left:0-l.width/2+"px",top:0-l.sloth/2+"px",width:2*l.width+"px",height:2*l.sloth+"px",force3D:"auto",ease:u,opacity:0,rotation:l.rotate}),0),k.add(A,0)}),i.find(".slotslide").each(function(a){var b=jQuery(this).find("div");A.add(punchgs.TweenLite.fromTo(b,t/1e3,{left:0,top:0,opacity:0,force3D:"auto"},{left:"0px",top:0-a*l.sloth+"px",width:i.find(".defaultimg").data("neww")+"px",height:i.find(".defaultimg").data("newh")+"px",opacity:1,ease:v,rotation:0}),0),k.add(A,0)})}if(9==a||10==a){var D=0;i.find(".slotslide").each(function(a){var b=jQuery(this);D++,k.add(punchgs.TweenLite.fromTo(b,t/2e3,{autoAlpha:0,force3D:"auto",transformPerspective:600},{autoAlpha:1,ease:u,delay:a*l.slots/100/2e3}),0)})}if(27==a||28==a||29==a||30==a){var E=i.find(".slot"),F=27==a||28==a?1:2,G=27==a||29==a?"-100%":"+100%",H=27==a||29==a?"+100%":"-100%",I=27==a||29==a?"-80%":"80%",J=27==a||29==a?"+80%":"-80%",K=27==a||29==a?"+10%":"-10%",L={overwrite:"all"},M={autoAlpha:0,zIndex:1,force3D:"auto",ease:u},N={position:"inherit",autoAlpha:0,overwrite:"all",zIndex:1},O={autoAlpha:1,force3D:"auto",ease:v},P={overwrite:"all",zIndex:2,opacity:1,autoAlpha:1},Q={autoAlpha:1,force3D:"auto",overwrite:"all",ease:u},R={overwrite:"all",zIndex:2,autoAlpha:1},S={autoAlpha:1,force3D:"auto",ease:u},T=1==F?"y":"x";L[T]="0px",M[T]=G,N[T]=K,O[T]="0%",P[T]=H,Q[T]=G,R[T]=I,S[T]=J,E.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'),k.add(punchgs.TweenLite.fromTo(j,t/1e3,L,M),0),k.add(punchgs.TweenLite.fromTo(i.find(".defaultimg"),t/2e3,N,O),t/2e3),k.add(punchgs.TweenLite.fromTo(E,t/1e3,P,Q),0),k.add(punchgs.TweenLite.fromTo(E.find(".slotslide div"),t/1e3,R,S),0)}if(31==a||32==a||33==a||34==a){t=6e3,u=punchgs.Power3.easeInOut;var U=t/1e3;mas=U-U/5,_nt=a,fy=31==_nt?"+100%":32==_nt?"-100%":"0%",fx=33==_nt?"+100%":34==_nt?"-100%":"0%",ty=31==_nt?"-100%":32==_nt?"+100%":"0%",tx=33==_nt?"-100%":34==_nt?"+100%":"0%",k.add(punchgs.TweenLite.fromTo(j,U-.2*U,{y:0,x:0},{y:ty,x:tx,ease:v}),.2*U),k.add(punchgs.TweenLite.fromTo(i,U,{y:fy,x:fx},{y:"0%",x:"0%",ease:u}),0),i.find(".slot").remove(),i.find(".defaultimg").clone().appendTo(i).addClass("slot"),V(i,U,_nt,"in",u)}if(11==a){r>4&&(r=0);var D=0,W=2==r?"#000000":3==r?"#ffffff":"transparent";switch(r){case 0:k.add(punchgs.TweenLite.fromTo(i,t/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0);break;case 1:k.add(punchgs.TweenLite.fromTo(i,t/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0),k.add(punchgs.TweenLite.fromTo(j,t/1e3,{autoAlpha:1},{autoAlpha:0,force3D:"auto",ease:u}),0);break;case 2:case 3:case 4:k.add(punchgs.TweenLite.set(j.parent(),{backgroundColor:W,force3D:"auto"}),0),k.add(punchgs.TweenLite.set(i.parent(),{backgroundColor:"transparent",force3D:"auto"}),0),k.add(punchgs.TweenLite.to(j,t/2e3,{autoAlpha:0,force3D:"auto",ease:u}),0),k.add(punchgs.TweenLite.fromTo(i,t/2e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),t/2e3)}k.add(punchgs.TweenLite.set(i.find(".defaultimg"),{autoAlpha:1}),0),k.add(punchgs.TweenLite.set(j.find("defaultimg"),{autoAlpha:1}),0)}if(26==a){var D=0;t=0,k.add(punchgs.TweenLite.fromTo(i,t/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:u}),0),k.add(punchgs.TweenLite.to(j,t/1e3,{autoAlpha:0,force3D:"auto",ease:u}),0),k.add(punchgs.TweenLite.set(i.find(".defaultimg"),{autoAlpha:1}),0),k.add(punchgs.TweenLite.set(j.find("defaultimg"),{autoAlpha:1}),0)}if(12==a||13==a||14==a||15==a){t=t,t>l.delay&&(t=l.delay),setTimeout(function(){punchgs.TweenLite.set(j.find(".defaultimg"),{autoAlpha:0})},100);var X=l.width,Y=l.height,Z=i.find(".slotslide, .defaultvid"),$=0,_=0,aa=1,ba=1,ca=1,da=t/1e3,ea=da;"fullwidth"!=l.sliderLayout&&"fullscreen"!=l.sliderLayout||(X=Z.width(),Y=Z.height()),12==a?$=X:15==a?$=0-X:13==a?_=Y:14==a&&(_=0-Y),1==r&&(aa=0),2==r&&(aa=0),3==r&&(da=t/1300),4!=r&&5!=r||(ba=.6),6==r&&(ba=1.4),5!=r&&6!=r||(ca=1.4,aa=0,X=0,Y=0,$=0,_=0),6==r&&(ca=.6);7==r&&(X=0,Y=0);var ga=i.find(".slotslide"),ha=j.find(".slotslide, .defaultvid");if(k.add(punchgs.TweenLite.set(h,{zIndex:15}),0),k.add(punchgs.TweenLite.set(g,{zIndex:20}),0),8==r?(k.add(punchgs.TweenLite.set(h,{zIndex:20}),0),k.add(punchgs.TweenLite.set(g,{zIndex:15}),0),k.add(punchgs.TweenLite.set(ga,{left:0,top:0,scale:1,opacity:1,rotation:0,ease:u,force3D:"auto"}),0)):k.add(punchgs.TweenLite.from(ga,da,{left:$,top:_,scale:ca,opacity:aa,rotation:l.rotate,ease:u,force3D:"auto"}),0),4!=r&&5!=r||(X=0,Y=0),1!=r)switch(a){case 12:k.add(punchgs.TweenLite.to(ha,ea,{left:0-X+"px",force3D:"auto",scale:ba,opacity:aa,rotation:l.rotate,ease:v}),0);break;case 15:k.add(punchgs.TweenLite.to(ha,ea,{left:X+"px",force3D:"auto",scale:ba,opacity:aa,rotation:l.rotate,ease:v}),0);break;case 13:k.add(punchgs.TweenLite.to(ha,ea,{top:0-Y+"px",force3D:"auto",scale:ba,opacity:aa,rotation:l.rotate,ease:v}),0);break;case 14:k.add(punchgs.TweenLite.to(ha,ea,{top:Y+"px",force3D:"auto",scale:ba,opacity:aa,rotation:l.rotate,ease:v}),0)}}if(16==a){var A=new punchgs.TimelineLite;k.add(punchgs.TweenLite.set(h,{position:"absolute","z-index":20}),0),k.add(punchgs.TweenLite.set(g,{position:"absolute","z-index":15}),0),h.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'),h.find(".tp-half-one").clone(!0).appendTo(h).addClass("tp-half-two"),h.find(".tp-half-two").removeClass("tp-half-one");var X=l.width,Y=l.height;"on"==l.autoHeight&&(Y=c.height()),h.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:'+X+"px;height:"+Y+'px;"></div>'),h.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:'+X+"px;height:"+Y+'px;"></div>'),h.find(".tp-half-two .defaultimg").css({position:"absolute",top:"-50%"}),h.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'),k.add(punchgs.TweenLite.set(h.find(".tp-half-two"),{width:X,height:Y,overflow:"hidden",zIndex:15,position:"absolute",top:Y/2,left:"0px",transformPerspective:600,transformOrigin:"center bottom"}),0),k.add(punchgs.TweenLite.set(h.find(".tp-half-one"),{width:X,height:Y/2,overflow:"visible",zIndex:10,position:"absolute",top:"0px",left:"0px",transformPerspective:600,transformOrigin:"center top"}),0);var ja=(h.find(".defaultimg"),Math.round(20*Math.random()-10)),ka=Math.round(20*Math.random()-10),la=Math.round(20*Math.random()-10),ma=.4*Math.random()-.2,na=.4*Math.random()-.2,oa=1*Math.random()+1,pa=1*Math.random()+1,qa=.3*Math.random()+.3;k.add(punchgs.TweenLite.set(h.find(".tp-half-one"),{overflow:"hidden"}),0),k.add(punchgs.TweenLite.fromTo(h.find(".tp-half-one"),t/800,{width:X,height:Y/2,position:"absolute",top:"0px",left:"0px",force3D:"auto",transformOrigin:"center top"},{scale:oa,rotation:ja,y:0-Y-Y/4,autoAlpha:0,ease:u}),0),k.add(punchgs.TweenLite.fromTo(h.find(".tp-half-two"),t/800,{width:X,height:Y,overflow:"hidden",position:"absolute",top:Y/2,left:"0px",force3D:"auto",transformOrigin:"center bottom"},{scale:pa,rotation:ka,y:Y+Y/4,ease:u,autoAlpha:0,onComplete:function(){punchgs.TweenLite.set(h,{position:"absolute","z-index":15}),punchgs.TweenLite.set(g,{position:"absolute","z-index":20}),h.find(".tp-half-one").length>0&&(h.find(".tp-half-one .defaultimg").unwrap(),h.find(".tp-half-one .slotholder").unwrap()),h.find(".tp-half-two").remove()}}),0),A.add(punchgs.TweenLite.set(i.find(".defaultimg"),{autoAlpha:1}),0),null!=h.html()&&k.add(punchgs.TweenLite.fromTo(g,(t-200)/1e3,{scale:qa,x:l.width/4*ma,y:Y/4*na,rotation:la,force3D:"auto",transformOrigin:"center center",ease:v},{autoAlpha:1,scale:1,x:0,y:0,rotation:0}),0),k.add(A,0)}if(17==a&&i.find(".slotslide").each(function(a){var b=jQuery(this);k.add(punchgs.TweenLite.fromTo(b,t/800,{opacity:0,rotationY:0,scale:.9,rotationX:-110,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{opacity:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:u,delay:.06*a}),0)}),18==a&&i.find(".slotslide").each(function(a){var b=jQuery(this);k.add(punchgs.TweenLite.fromTo(b,t/500,{autoAlpha:0,rotationY:110,scale:.9,rotationX:10,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{autoAlpha:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:u,delay:.06*a}),0)}),19==a||22==a){var A=new punchgs.TimelineLite;k.add(punchgs.TweenLite.set(h,{zIndex:20}),0),k.add(punchgs.TweenLite.set(g,{zIndex:20}),0),setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100);var ra=90,aa=1,sa="center center ";1==o&&(ra=-90),19==a?(sa=sa+"-"+l.height/2,aa=0):sa+=l.height/2,punchgs.TweenLite.set(c,{transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:600}),i.find(".slotslide").each(function(a){var b=jQuery(this);A.add(punchgs.TweenLite.fromTo(b,t/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",left:0,rotationY:l.rotate,z:10,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:sa,rotationX:ra},{left:0,rotationY:0,top:0,z:0,scale:1,force3D:"auto",rotationX:0,delay:50*a/1e3,ease:u}),0),A.add(punchgs.TweenLite.to(b,.1,{autoAlpha:1,delay:50*a/1e3}),0),k.add(A)}),j.find(".slotslide").each(function(a){var b=jQuery(this),c=-90;1==o&&(c=90),A.add(punchgs.TweenLite.fromTo(b,t/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",autoAlpha:1,rotationY:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:sa,rotationX:0},{autoAlpha:1,rotationY:l.rotate,top:0,z:10,scale:1,rotationX:c,delay:50*a/1e3,force3D:"auto",ease:v}),0),k.add(A)}),k.add(punchgs.TweenLite.set(h,{zIndex:18}),0)}if(20==a){if(setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100),1==o)var ta=-l.width,ra=80,sa="20% 70% -"+l.height/2;else var ta=l.width,ra=-80,sa="80% 70% -"+l.height/2;i.find(".slotslide").each(function(a){var b=jQuery(this),c=50*a/1e3;k.add(punchgs.TweenLite.fromTo(b,t/1e3,{left:ta,rotationX:40,z:-600,opacity:aa,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:sa,transformStyle:"flat",rotationY:ra},{left:0,rotationX:0,opacity:1,top:0,z:0,scale:1,rotationY:0,delay:c,ease:u}),0)}),j.find(".slotslide").each(function(a){var b=jQuery(this),c=50*a/1e3;if(c=a>0?c+t/9e3:0,1!=o)var d=-l.width/2,e=30,f="20% 70% -"+l.height/2;else var d=l.width/2,e=-30,f="80% 70% -"+l.height/2;v=punchgs.Power2.easeInOut,k.add(punchgs.TweenLite.fromTo(b,t/1e3,{opacity:1,rotationX:0,top:0,z:0,scale:1,left:0,force3D:"auto",transformPerspective:600,transformOrigin:f,transformStyle:"flat",rotationY:0},{opacity:1,rotationX:20,top:0,z:-600,left:d,force3D:"auto",rotationY:e,delay:c,ease:v}),0)})}if(21==a||25==a){setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100);var ra=90,ta=-l.width,ua=-ra;if(1==o)if(25==a){var sa="center top 0";ra=l.rotate}else{var sa="left center 0";ua=l.rotate}else if(ta=l.width,ra=-90,25==a){var sa="center bottom 0";ua=-ra,ra=l.rotate}else{var sa="right center 0";ua=l.rotate}i.find(".slotslide").each(function(a){var b=jQuery(this),c=t/1.5/3;k.add(punchgs.TweenLite.fromTo(b,2*c/1e3,{left:0,transformStyle:"flat",rotationX:ua,z:0,autoAlpha:0,top:0,scale:1,force3D:"auto",transformPerspective:1200,transformOrigin:sa,rotationY:ra},{left:0,rotationX:0,top:0,z:0,autoAlpha:1,scale:1,rotationY:0,force3D:"auto",delay:c/1e3,ease:u}),0)}),1!=o?(ta=-l.width,ra=90,25==a?(sa="center top 0",ua=-ra,ra=l.rotate):(sa="left center 0",ua=l.rotate)):(ta=l.width,ra=-90,25==a?(sa="center bottom 0",ua=-ra,ra=l.rotate):(sa="right center 0",ua=l.rotate)),j.find(".slotslide").each(function(a){var b=jQuery(this);k.add(punchgs.TweenLite.fromTo(b,t/1e3,{left:0,transformStyle:"flat",rotationX:0,z:0,autoAlpha:1,top:0,scale:1,force3D:"auto",transformPerspective:1200,transformOrigin:sa,rotationY:0},{left:0,rotationX:ua,top:0,z:0,autoAlpha:1,force3D:"auto",scale:1,rotationY:ra,ease:v}),0)})}if(23==a||24==a){setTimeout(function(){j.find(".defaultimg").css({opacity:0})},100);var ra=-90,aa=1,va=0;if(1==o&&(ra=90),23==a){var sa="center center -"+l.width/2;aa=0}else var sa="center center "+l.width/2;punchgs.TweenLite.set(c,{transformStyle:"preserve-3d",backfaceVisibility:"hidden",perspective:2500}),i.find(".slotslide").each(function(a){var b=jQuery(this);k.add(punchgs.TweenLite.fromTo(b,t/1e3,{left:va,rotationX:l.rotate,force3D:"auto",opacity:aa,top:0,scale:1,transformPerspective:1200,transformOrigin:sa,rotationY:ra},{left:0,rotationX:0,autoAlpha:1,top:0,z:0,scale:1,rotationY:0,delay:50*a/500,ease:u}),0)}),ra=90,1==o&&(ra=-90),j.find(".slotslide").each(function(b){var c=jQuery(this);k.add(punchgs.TweenLite.fromTo(c,t/1e3,{left:0,rotationX:0,top:0,z:0,scale:1,force3D:"auto",transformStyle:"flat",transformPerspective:1200,transformOrigin:sa,rotationY:0},{left:va,rotationX:l.rotate,top:0,scale:1,rotationY:ra,delay:50*b/500,ease:v}),0),23==a&&k.add(punchgs.TweenLite.fromTo(c,t/2e3,{autoAlpha:1},{autoAlpha:0,delay:50*b/500+t/3e3,ease:v}),0)})}return k}}(jQuery);
/********************************************
 * REVOLUTION 5.2.5.1 EXTENSION - VIDEO FUNCTIONS
 * @version: 2.0.2 (25.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(a){"use strict";function e(a){return void 0==a?-1:jQuery.isNumeric(a)?a:a.split(":").length>1?60*parseInt(a.split(":")[0],0)+parseInt(a.split(":")[1],0):a}var b=jQuery.fn.revolution,c=b.is_mobile(),d={alias:"Video Min JS",name:"revolution.extensions.video.min.js",min_core:"5.3",version:"2.0.2"};jQuery.extend(!0,b,{preLoadAudio:function(a,c){return"stop"!==b.compare_version(d).check&&void a.find(".tp-audiolayer").each(function(){var a=jQuery(this),d={};0===a.find("audio").length&&(d.src=void 0!=a.data("videomp4")?a.data("videomp4"):"",d.pre=a.data("videopreload")||"",void 0===a.attr("id")&&a.attr("audio-layer-"+Math.round(199999*Math.random())),d.id=a.attr("id"),d.status="prepared",d.start=jQuery.now(),d.waittime=1e3*a.data("videopreloadwait")||5e3,"auto"!=d.pre&&"canplaythrough"!=d.pre&&"canplay"!=d.pre&&"progress"!=d.pre||(void 0===c.audioqueue&&(c.audioqueue=[]),c.audioqueue.push(d),b.manageVideoLayer(a,c)))})},preLoadAudioDone:function(a,b,c){b.audioqueue&&b.audioqueue.length>0&&jQuery.each(b.audioqueue,function(b,d){a.data("videomp4")!==d.src||d.pre!==c&&"auto"!==d.pre||(d.status="loaded")})},resetVideo:function(a,d,f){var g=a.data();switch(g.videotype){case"youtube":g.player;try{if("on"==g.forcerewind){var i=e(a.data("videostartat")),j=i==-1,k=1===g.bgvideo||a.find(".tp-videoposter").length>0;i=i==-1?0:i,void 0!=g.player&&(0!==i&&!j||k)&&(g.player.seekTo(i),g.player.pauseVideo())}}catch(a){}0==a.find(".tp-videoposter").length&&1!==g.bgvideo&&f!==!0&&punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"vimeo":var l=$f(a.find("iframe").attr("id"));try{if("on"==g.forcerewind){var i=e(g.videostartat),j=i==-1,k=1===g.bgvideo||a.find(".tp-videoposter").length>0;i=i==-1?0:i,(0!==i&&!j||k)&&(l.api("seekTo",i),l.api("pause"))}}catch(a){}0==a.find(".tp-videoposter").length&&1!==g.bgvideo&&f!==!0&&punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"html5":if(c&&1==g.disablevideoonmobile)return!1;var n="html5"==g.audio?"audio":"video",o=a.find(n),p=o[0];if(punchgs.TweenLite.to(o,.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),"on"==g.forcerewind&&!a.hasClass("videoisplaying"))try{var i=e(g.videostartat);p.currentTime=i==-1?0:i}catch(a){}("mute"==g.volume||b.lastToggleState(a.videomutetoggledby)||d.globalmute===!0)&&(p.muted=!0)}},isVideoMuted:function(a,b){var c=!1,d=a.data();switch(d.videotype){case"youtube":try{var e=d.player;c=e.isMuted()}catch(a){}break;case"vimeo":try{$f(a.find("iframe").attr("id"));"mute"==d.volume&&(c=!0)}catch(a){}break;case"html5":var g="html5"==d.audio?"audio":"video",h=a.find(g),i=h[0];i.muted&&(c=!0)}return c},muteVideo:function(a,b){var c=a.data();switch(c.videotype){case"youtube":try{var d=c.player;d.mute()}catch(a){}break;case"vimeo":try{var e=$f(a.find("iframe").attr("id"));a.data("volume","mute"),e.api("setVolume",0)}catch(a){}break;case"html5":var f="html5"==c.audio?"audio":"video",g=a.find(f),h=g[0];h.muted=!0}},unMuteVideo:function(a,b){if(b.globalmute!==!0){var c=a.data();switch(c.videotype){case"youtube":try{var d=c.player;d.unMute()}catch(a){}break;case"vimeo":try{var e=$f(a.find("iframe").attr("id"));a.data("volume","1"),e.api("setVolume",1)}catch(a){}break;case"html5":var f="html5"==c.audio?"audio":"video",g=a.find(f),h=g[0];h.muted=!1}}},stopVideo:function(a,b){var c=a.data();switch(b.leaveViewPortBasedStop||(b.lastplayedvideos=[]),b.leaveViewPortBasedStop=!1,c.videotype){case"youtube":try{var d=c.player;if(2===d.getPlayerState()||5===d.getPlayerState())return;d.pauseVideo(),c.youtubepausecalled=!0,setTimeout(function(){c.youtubepausecalled=!1},80)}catch(a){console.log("Issue at YouTube Video Pause:"),console.log(a)}break;case"vimeo":try{var e=$f(a.find("iframe").attr("id"));e.api("pause"),c.vimeopausecalled=!0,setTimeout(function(){c.vimeopausecalled=!1},80)}catch(a){console.log("Issue at Vimeo Video Pause:"),console.log(a)}break;case"html5":var f="html5"==c.audio?"audio":"video",g=a.find(f),h=g[0];void 0!=g&&void 0!=h&&h.pause()}},playVideo:function(a,d){clearTimeout(a.data("videoplaywait"));var g=a.data();switch(g.videotype){case"youtube":if(0==a.find("iframe").length)a.append(a.data("videomarkup")),h(a,d,!0);else if(void 0!=g.player.playVideo){var i=e(a.data("videostartat")),j=g.player.getCurrentTime();1==a.data("nextslideatend-triggered")&&(j=-1,a.data("nextslideatend-triggered",0)),i!=-1&&i>j&&g.player.seekTo(i),g.youtubepausecalled!==!0&&g.player.playVideo()}else a.data("videoplaywait",setTimeout(function(){g.youtubepausecalled!==!0&&b.playVideo(a,d)},50));break;case"vimeo":if(0==a.find("iframe").length)a.append(a.data("videomarkup")),h(a,d,!0);else if(a.hasClass("rs-apiready")){var k=a.find("iframe").attr("id"),l=$f(k);void 0==l.api("play")?a.data("videoplaywait",setTimeout(function(){g.vimeopausecalled!==!0&&b.playVideo(a,d)},50)):setTimeout(function(){l.api("play");var b=e(a.data("videostartat")),c=a.data("currenttime");1==a.data("nextslideatend-triggered")&&(c=-1,a.data("nextslideatend-triggered",0)),b!=-1&&b>c&&l.api("seekTo",b)},510)}else a.data("videoplaywait",setTimeout(function(){g.vimeopausecalled!==!0&&b.playVideo(a,d)},50));break;case"html5":if(c&&1==a.data("disablevideoonmobile"))return!1;var m="html5"==g.audio?"audio":"video",n=a.find(m),o=n[0],p=n.parent();if(1!=p.data("metaloaded"))f(o,"loadedmetadata",function(a){b.resetVideo(a,d),o.play();var c=e(a.data("videostartat")),f=o.currentTime;1==a.data("nextslideatend-triggered")&&(f=-1,a.data("nextslideatend-triggered",0)),c!=-1&&c>f&&(o.currentTime=c)}(a));else{o.play();var i=e(a.data("videostartat")),j=o.currentTime;1==a.data("nextslideatend-triggered")&&(j=-1,a.data("nextslideatend-triggered",0)),i!=-1&&i>j&&(o.currentTime=i)}}},isVideoPlaying:function(a,b){var c=!1;return void 0!=b.playingvideos&&jQuery.each(b.playingvideos,function(b,d){a.attr("id")==d.attr("id")&&(c=!0)}),c},removeMediaFromList:function(a,b){m(a,b)},prepareCoveredVideo:function(a,c,d){var e=d.find("iframe, video"),f=a.split(":")[0],g=a.split(":")[1],h=d.closest(".tp-revslider-slidesli"),i=h.width()/h.height(),j=f/g,k=i/j*100,l=j/i*100;i>j?punchgs.TweenLite.to(e,.001,{height:k+"%",width:"100%",top:-(k-100)/2+"%",left:"0px",position:"absolute"}):punchgs.TweenLite.to(e,.001,{width:l+"%",height:"100%",left:-(l-100)/2+"%",top:"0px",position:"absolute"}),e.hasClass("resizelistener")||(e.addClass("resizelistener"),jQuery(window).resize(function(){clearTimeout(e.data("resizelistener")),e.data("resizelistener",setTimeout(function(){b.prepareCoveredVideo(a,c,d)},30))}))},checkVideoApis:function(a,b,c){"https:"===location.protocol?"https":"http";if((void 0!=a.data("ytid")||a.find("iframe").length>0&&a.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&(b.youtubeapineeded=!0),(void 0!=a.data("ytid")||a.find("iframe").length>0&&a.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&0==c.addedyt){b.youtubestarttime=jQuery.now(),c.addedyt=1;var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var f=document.getElementsByTagName("script")[0],g=!0;jQuery("head").find("*").each(function(){"https://www.youtube.com/iframe_api"==jQuery(this).attr("src")&&(g=!1)}),g&&f.parentNode.insertBefore(e,f)}if((void 0!=a.data("vimeoid")||a.find("iframe").length>0&&a.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&(b.vimeoapineeded=!0),(void 0!=a.data("vimeoid")||a.find("iframe").length>0&&a.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&0==c.addedvim){b.vimeostarttime=jQuery.now(),c.addedvim=1;var h=document.createElement("script"),f=document.getElementsByTagName("script")[0],g=!0;h.src="https://secure-a.vimeocdn.com/js/froogaloop2.min.js",jQuery("head").find("*").each(function(){"https://secure-a.vimeocdn.com/js/froogaloop2.min.js"==jQuery(this).attr("src")&&(g=!1)}),g&&f.parentNode.insertBefore(h,f)}return c},manageVideoLayer:function(a,g,i,j){if("stop"===b.compare_version(d).check)return!1;var l=a.data(),m=l.videoattributes,n=l.ytid,o=l.vimeoid,p="auto"===l.videopreload||"canplay"===l.videopreload||"canplaythrough"===l.videopreload||"progress"===l.videopreload?"auto":l.videopreload,q=l.videomp4,r=l.videowebm,s=l.videoogv,t=l.allowfullscreenvideo,u=l.videocontrols,v="http",w="loop"==l.videoloop?"loop":"loopandnoslidestop"==l.videoloop?"loop":"",x=void 0!=q||void 0!=r?"html5":void 0!=n&&String(n).length>1?"youtube":void 0!=o&&String(o).length>1?"vimeo":"none",y="html5"==l.audio?"audio":"video",z="html5"==x&&0==a.find(y).length?"html5":"youtube"==x&&0==a.find("iframe").length?"youtube":"vimeo"==x&&0==a.find("iframe").length?"vimeo":"none";switch(w=l.nextslideatend===!0?"":w,l.videotype=x,z){case"html5":"controls"!=u&&(u="");var y="video";"html5"==l.audio&&(y="audio",a.addClass("tp-audio-html5"));var A="<"+y+' style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" '+w+' preload="'+p+'">';"auto"==p&&(g.mediapreload=!0),void 0!=r&&"firefox"==b.get_browser().toLowerCase()&&(A=A+'<source src="'+r+'" type="video/webm" />'),void 0!=q&&(A=A+'<source src="'+q+'" type="video/mp4" />'),void 0!=s&&(A=A+'<source src="'+s+'" type="video/ogg" />'),A=A+"</"+y+">";var B="";"true"!==t&&t!==!0||(B='<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'),"controls"==u&&(A+='<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>'+B+"</div>"),a.data("videomarkup",A),a.append(A),(c&&1==a.data("disablevideoonmobile")||b.isIE(8))&&a.find(y).remove(),a.find(y).each(function(c){var d=this,e=jQuery(this);e.parent().hasClass("html5vid")||e.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>');var h=e.parent();1!=h.data("metaloaded")&&f(d,"loadedmetadata",function(a){k(a,g),b.resetVideo(a,g)}(a))});break;case"youtube":v="https","none"==u&&(m=m.replace("controls=1","controls=0"),m.toLowerCase().indexOf("controls")==-1&&(m+="&controls=0")),l.videoinline!==!0&&"true"!==l.videoinline&&1!==l.videoinline||(m+="&playsinline=1");var C=e(a.data("videostartat")),D=e(a.data("videoendat"));C!=-1&&(m=m+"&start="+C),D!=-1&&(m=m+"&end="+D);var E=m.split("origin="+v+"://"),F="";E.length>1?(F=E[0]+"origin="+v+"://",self.location.href.match(/www/gi)&&!E[1].match(/www/gi)&&(F+="www."),F+=E[1]):F=m;var G="true"===t||t===!0?"allowfullscreen":"";a.data("videomarkup",'<iframe type="text/html" src="'+v+"://www.youtube.com/embed/"+n+"?"+F+'" '+G+' width="100%" height="100%" style="opacity:0;visibility:hidden;width:100%;height:100%"></iframe>');break;case"vimeo":v="https",a.data("videomarkup",'<iframe src="'+v+"://player.vimeo.com/video/"+o+"?autoplay=0&"+m+'" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:hidden;100%;height:100%"></iframe>')}var H=c&&"on"==a.data("noposteronmobile");if(void 0!=l.videoposter&&l.videoposter.length>2&&!H)0==a.find(".tp-videoposter").length&&a.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url('+l.videoposter+'); background-size:cover;background-position:center center;"></div>'),0==a.find("iframe").length&&a.find(".tp-videoposter").click(function(){if(b.playVideo(a,g),c){if(1==a.data("disablevideoonmobile"))return!1;punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut})}});else{if(c&&1==a.data("disablevideoonmobile"))return!1;0!=a.find("iframe").length||"youtube"!=x&&"vimeo"!=x||(a.append(a.data("videomarkup")),h(a,g,!1))}"none"!=a.data("dottedoverlay")&&void 0!=a.data("dottedoverlay")&&1!=a.find(".tp-dottedoverlay").length&&a.append('<div class="tp-dottedoverlay '+a.data("dottedoverlay")+'"></div>'),a.addClass("HasListener"),1==a.data("bgvideo")&&punchgs.TweenLite.set(a.find("video, iframe"),{autoAlpha:0})}});var f=function(a,b,c){a.addEventListener?a.addEventListener(b,c,{capture:!1,passive:!0}):a.attachEvent(b,c,{capture:!1,passive:!0})},g=function(a,b,c){var d={};return d.video=a,d.videotype=b,d.settings=c,d},h=function(a,d,f){var h=a.data(),k=a.find("iframe"),n="iframe"+Math.round(1e5*Math.random()+1),o=h.videoloop,p="loopandnoslidestop"!=o;if(o="loop"==o||"loopandnoslidestop"==o,1==a.data("forcecover")){a.removeClass("fullscreenvideo").addClass("coverscreenvideo");var q=a.data("aspectratio");void 0!=q&&q.split(":").length>1&&b.prepareCoveredVideo(q,d,a)}if(1==a.data("bgvideo")){var q=a.data("aspectratio");void 0!=q&&q.split(":").length>1&&b.prepareCoveredVideo(q,d,a)}if(k.attr("id",n),f&&a.data("startvideonow",!0),1!==a.data("videolistenerexist"))switch(h.videotype){case"youtube":var r=new YT.Player(n,{events:{onStateChange:function(c){var f=a.closest(".tp-simpleresponsive"),q=(h.videorate,a.data("videostart"),j());if(c.data==YT.PlayerState.PLAYING)punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),"mute"==a.data("volume")||b.lastToggleState(a.data("videomutetoggledby"))||d.globalmute===!0?r.mute():(r.unMute(),r.setVolume(parseInt(a.data("volume"),0)||75)),d.videoplaying=!0,l(a,d),p?d.c.trigger("stoptimer"):d.videoplaying=!1,d.c.trigger("revolution.slide.onvideoplay",g(r,"youtube",a.data())),b.toggleState(h.videotoggledby);else{if(0==c.data&&o){var s=e(a.data("videostartat"));s!=-1&&r.seekTo(s),r.playVideo(),b.toggleState(h.videotoggledby)}!q&&(0==c.data||2==c.data)&&"on"==a.data("showcoveronpause")&&a.find(".tp-videoposter").length>0&&(punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),c.data!=-1&&3!=c.data&&(d.videoplaying=!1,d.tonpause=!1,m(a,d),f.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(r,"youtube",a.data())),void 0!=d.currentLayerVideoIsPlaying&&d.currentLayerVideoIsPlaying.attr("id")!=a.attr("id")||b.unToggleState(h.videotoggledby)),0==c.data&&1==a.data("nextslideatend")?(i(),a.data("nextslideatend-triggered",1),d.c.revnext(),m(a,d)):(m(a,d),d.videoplaying=!1,f.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(r,"youtube",a.data())),void 0!=d.currentLayerVideoIsPlaying&&d.currentLayerVideoIsPlaying.attr("id")!=a.attr("id")||b.unToggleState(h.videotoggledby))}},onReady:function(b){var d=h.videorate;a.data("videostart");if(a.addClass("rs-apiready"),void 0!=d&&b.target.setPlaybackRate(parseFloat(d)),a.find(".tp-videoposter").unbind("click"),a.find(".tp-videoposter").click(function(){c||r.playVideo()}),a.data("startvideonow")){h.player.playVideo();var g=e(a.data("videostartat"));g!=-1&&h.player.seekTo(g)}a.data("videolistenerexist",1)}}});a.data("player",r);break;case"vimeo":for(var w,s=k.attr("src"),t={},u=s,v=/([^&=]+)=([^&]*)/g;w=v.exec(u);)t[decodeURIComponent(w[1])]=decodeURIComponent(w[2]);s=void 0!=t.player_id?s.replace(t.player_id,n):s+"&player_id="+n;try{s=s.replace("api=0","api=1")}catch(a){}s+="&api=1",k.attr("src",s);var r=a.find("iframe")[0],y=(jQuery("#"+n),$f(n));y.addEvent("ready",function(){if(a.addClass("rs-apiready"),y.addEvent("play",function(c){a.data("nextslidecalled",0),punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),d.c.trigger("revolution.slide.onvideoplay",g(y,"vimeo",a.data())),d.videoplaying=!0,l(a,d),p?d.c.trigger("stoptimer"):d.videoplaying=!1,"mute"==a.data("volume")||b.lastToggleState(a.data("videomutetoggledby"))||d.globalmute===!0?y.api("setVolume","0"):y.api("setVolume",parseInt(a.data("volume"),0)/100||.75),b.toggleState(h.videotoggledby)}),y.addEvent("playProgress",function(b){var c=e(a.data("videoendat"));if(a.data("currenttime",b.seconds),0!=c&&Math.abs(c-b.seconds)<.3&&c>b.seconds&&1!=a.data("nextslidecalled"))if(o){y.api("play");var f=e(a.data("videostartat"));f!=-1&&y.api("seekTo",f)}else 1==a.data("nextslideatend")&&(a.data("nextslideatend-triggered",1),a.data("nextslidecalled",1),d.c.revnext()),y.api("pause")}),y.addEvent("finish",function(c){m(a,d),d.videoplaying=!1,d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(y,"vimeo",a.data())),1==a.data("nextslideatend")&&(a.data("nextslideatend-triggered",1),d.c.revnext()),void 0!=d.currentLayerVideoIsPlaying&&d.currentLayerVideoIsPlaying.attr("id")!=a.attr("id")||b.unToggleState(h.videotoggledby)}),y.addEvent("pause",function(c){a.find(".tp-videoposter").length>0&&"on"==a.data("showcoveronpause")&&(punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find("iframe"),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),d.videoplaying=!1,d.tonpause=!1,m(a,d),d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(y,"vimeo",a.data())),void 0!=d.currentLayerVideoIsPlaying&&d.currentLayerVideoIsPlaying.attr("id")!=a.attr("id")||b.unToggleState(h.videotoggledby)}),a.find(".tp-videoposter").unbind("click"),a.find(".tp-videoposter").click(function(){if(!c)return y.api("play"),!1}),a.data("startvideonow")){y.api("play");var f=e(a.data("videostartat"));f!=-1&&y.api("seekTo",f)}a.data("videolistenerexist",1)})}else{var z=e(a.data("videostartat"));switch(h.videotype){case"youtube":f&&(h.player.playVideo(),z!=-1&&h.player.seekTo());break;case"vimeo":if(f){var y=$f(a.find("iframe").attr("id"));y.api("play"),z!=-1&&y.api("seekTo",z)}}}},i=function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()},j=function(){try{if(void 0!==window.fullScreen)return window.fullScreen;var a=5;return jQuery.browser.webkit&&/Apple Computer/.test(navigator.vendor)&&(a=42),screen.width==window.innerWidth&&Math.abs(screen.height-window.innerHeight)<a}catch(a){}},k=function(a,d,h){if(c&&1==a.data("disablevideoonmobile"))return!1;var k=a.data(),n="html5"==k.audio?"audio":"video",o=a.find(n),p=o[0],q=o.parent(),r=k.videoloop,s="loopandnoslidestop"!=r;if(r="loop"==r||"loopandnoslidestop"==r,q.data("metaloaded",1),1!=a.data("bgvideo")||"none"!==k.videoloop&&k.videoloop!==!1||(s=!1),void 0==o.attr("control")&&(0!=a.find(".tp-video-play-button").length||c||a.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),a.find("video, .tp-poster, .tp-video-play-button").click(function(){a.hasClass("videoisplaying")?p.pause():p.play()})),1==a.data("forcecover")||a.hasClass("fullscreenvideo")||1==a.data("bgvideo"))if(1==a.data("forcecover")||1==a.data("bgvideo")){q.addClass("fullcoveredvideo");var t=a.data("aspectratio")||"4:3";b.prepareCoveredVideo(t,d,a)}else q.addClass("fullscreenvideo");var u=a.find(".tp-vid-play-pause")[0],v=a.find(".tp-vid-mute")[0],w=a.find(".tp-vid-full-screen")[0],x=a.find(".tp-seek-bar")[0],y=a.find(".tp-volume-bar")[0];void 0!=u&&f(u,"click",function(){1==p.paused?p.play():p.pause()}),void 0!=v&&f(v,"click",function(){0==p.muted?(p.muted=!0,v.innerHTML="Unmute"):(p.muted=!1,v.innerHTML="Mute")}),void 0!=w&&w&&f(w,"click",function(){p.requestFullscreen?p.requestFullscreen():p.mozRequestFullScreen?p.mozRequestFullScreen():p.webkitRequestFullscreen&&p.webkitRequestFullscreen()}),void 0!=x&&(f(x,"change",function(){var a=p.duration*(x.value/100);p.currentTime=a}),f(x,"mousedown",function(){a.addClass("seekbardragged"),p.pause()}),f(x,"mouseup",function(){a.removeClass("seekbardragged"),p.play()})),f(p,"canplaythrough",function(){b.preLoadAudioDone(a,d,"canplaythrough")}),f(p,"canplay",function(){b.preLoadAudioDone(a,d,"canplay")}),f(p,"progress",function(){b.preLoadAudioDone(a,d,"progress")}),f(p,"timeupdate",function(){var b=100/p.duration*p.currentTime,c=e(a.data("videoendat")),f=p.currentTime;if(void 0!=x&&(x.value=b),0!=c&&c!=-1&&Math.abs(c-f)<=.3&&c>f&&1!=a.data("nextslidecalled"))if(r){p.play();var g=e(a.data("videostartat"));g!=-1&&(p.currentTime=g)}else 1==a.data("nextslideatend")&&(a.data("nextslideatend-triggered",1),a.data("nextslidecalled",1),d.just_called_nextslide_at_htmltimer=!0,d.c.revnext(),setTimeout(function(){d.just_called_nextslide_at_htmltimer=!1},1e3)),p.pause()}),void 0!=y&&f(y,"change",function(){p.volume=y.value}),f(p,"play",function(){a.data("nextslidecalled",0);var c=a.data("volume");c=void 0!=c&&"mute"!=c?parseFloat(c)/100:c,d.globalmute===!0?p.muted=!0:p.muted=!1,c>1&&(c/=100),"mute"==c?p.muted=!0:void 0!=c&&(p.volume=c),a.addClass("videoisplaying");var e="html5"==k.audio?"audio":"video";l(a,d),s&&"audio"!=e?(d.videoplaying=!0,d.c.trigger("stoptimer"),d.c.trigger("revolution.slide.onvideoplay",g(p,"html5",k))):(d.videoplaying=!1,"audio"!=e&&d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(p,"html5",k))),punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find(e),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});var f=a.find(".tp-vid-play-pause")[0],h=a.find(".tp-vid-mute")[0];void 0!=f&&(f.innerHTML="Pause"),void 0!=h&&p.muted&&(h.innerHTML="Unmute"),b.toggleState(k.videotoggledby)}),f(p,"pause",function(){var c="html5"==k.audio?"audio":"video",e=j();!e&&a.find(".tp-videoposter").length>0&&"on"==a.data("showcoveronpause")&&!a.hasClass("seekbardragged")&&(punchgs.TweenLite.to(a.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(a.find(c),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),a.removeClass("videoisplaying"),d.videoplaying=!1,m(a,d),"audio"!=c&&d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(p,"html5",a.data()));var f=a.find(".tp-vid-play-pause")[0];void 0!=f&&(f.innerHTML="Play"),void 0!=d.currentLayerVideoIsPlaying&&d.currentLayerVideoIsPlaying.attr("id")!=a.attr("id")||b.unToggleState(k.videotoggledby)}),f(p,"ended",function(){i(),m(a,d),d.videoplaying=!1,m(a,d),"audio"!=n&&d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",g(p,"html5",a.data())),a.data("nextslideatend")===!0&&p.currentTime>0&&(1==!d.just_called_nextslide_at_htmltimer&&(a.data("nextslideatend-triggered",1),d.c.revnext(),d.just_called_nextslide_at_htmltimer=!0),setTimeout(function(){d.just_called_nextslide_at_htmltimer=!1},1500)),a.removeClass("videoisplaying")})},l=function(a,c){void 0==c.playingvideos&&(c.playingvideos=new Array),a.data("stopallvideos")&&void 0!=c.playingvideos&&c.playingvideos.length>0&&(c.lastplayedvideos=jQuery.extend(!0,[],c.playingvideos),jQuery.each(c.playingvideos,function(a,d){b.stopVideo(d,c)})),c.playingvideos.push(a),c.currentLayerVideoIsPlaying=a},m=function(a,b){void 0!=b.playingvideos&&jQuery.inArray(a,b.playingvideos)>=0&&b.playingvideos.splice(jQuery.inArray(a,b.playingvideos),1)}}(jQuery);
/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a,b){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),null!=a.scrollContainer&&(this.config.scrollContainer=document.querySelector(a.scrollContainer)),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(b){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);