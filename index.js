$(function () {
 $('.menu__fixed').stickyNavbar({
     activeClass: "menu__item--active", // Class to be added to highlight nav elements
     sectionSelector: "scrollto", // Class of the section that is interconnected with nav links
     animDuration: 350, // Duration of jQuery animation as well as jQuery scrolling duration
     startAt: 43, // Stick the menu at XXXpx from the top of the this() (nav container)
     easing: "swing", // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
     animateCSS: true, // AnimateCSS effect on/off
     animateCSSRepeat: false, // Repeat animation everytime user scrolls
     cssAnimation: "fadeInDown", // AnimateCSS class that will be added to selector
     jqueryEffects: false, // jQuery animation on/off
     jqueryAnim: "slideDown", // jQuery animation type: fadeIn, show or slideDown
     selector: "a", // Selector to which activeClass will be added, either "a" or "li"
     mobile: false, // If false, nav will not stick under viewport width of 480px (default) or user defined mobileWidth
     mobileWidth: 480, // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due user usability on mobile)
     zindex: 9999, // The zindex value to apply to the element: default 9999, other option is "auto"
     stickyModeClass: "menu__fixed--sticky", // Class that will be applied to 'this' in sticky mode
     parentStickyModeClass: "menu--sticky", // Class that will be applied to 'this' in sticky mode
     unstickyModeClass: "menu__fixed--unsticky" // Class that will be applied to 'this' in non-sticky mode
 });

 $('.beer__arrow').click(function(e){
    var $this = $(this);
    var activeClass = {
      slide: 'beer__slide--active',
      nav: 'beer__small-glass--active'
    };
    var $activeSlide = $('.beer__container').find('.'+activeClass.slide).first();
    var $activeNav = $('.beer__rack').find('.'+activeClass.nav).first();

    if ($this.hasClass('beer__arrow--left')) {
      showPrev($activeSlide, '.beer__slide', activeClass.slide)
      showPrev($activeNav, '.beer__small-glass', activeClass.nav)
    } else if ($this.hasClass('beer__arrow--right')) {
      showNext($activeSlide, '.beer__slide', activeClass.slide)
      showNext($activeNav, '.beer__small-glass', activeClass.nav)
    }
 })
 function showPrev($current, selector, activeClass) {
   if($current.prev(selector).length){
     $current.prev(selector).addClass(activeClass);
   }else{
     $current.parent().children(selector).last().addClass(activeClass);
   }
   $current.removeClass(activeClass);
 }
 function showNext($current, selector, activeClass) {
   if($current.next(selector).length){
     $current.next(selector).addClass(activeClass);
   }else{
     $current.parent().children(selector).first().addClass(activeClass);
   }
   $current.removeClass(activeClass);
 }

});