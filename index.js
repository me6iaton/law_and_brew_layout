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

  // slider
  var sliderActiveClasses = {
    slide: 'beer__slide--active',
    nav: 'beer__small-glass--active'
  };
  var sliderSelectors = {
    slideContainer: '.beer__container',
    slide: '.beer__slide',
    slideActive: '.beer__slide--active',
    navContainer: '.beer__rack',
    nav: '.beer__small-glass',
    navActive: '.beer__small-glass--active'
  };
  $('.beer__arrow').click(function(e){
    var activeClass = sliderActiveClasses;
    var slct = sliderSelectors;
    var $this = $(this);
    var $activeSlide = $(slct.slideContainer).find(slct.slideActive).first();
    var $activeNav = $(slct.navContainer).find(slct.navActive).first();

    if ($this.hasClass('beer__arrow--left')) {
      showPrev($activeSlide, slct.slide, activeClass.slide)
      showPrev($activeNav, slct.nav, activeClass.nav)
    } else if ($this.hasClass('beer__arrow--right')) {
      showNext($activeSlide, slct.slide, activeClass.slide)
      showNext($activeNav, slct.nav, activeClass.nav)
    }
  })
  $('.beer__rack .beer__small-glass').click(function(e){
    var $this = $(this);
    showSlide($this, sliderSelectors,  sliderActiveClasses);
  });
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
  function showSlide($nav, selectors, activeClasses){
    if(!$nav.hasClass(activeClasses.nav)){
      var index = $nav.index();
      //nav
      $nav.parent().children(selectors.nav).removeClass(activeClasses.nav);
      $nav.addClass(activeClasses.nav);
      //slide
      $sliderContainer = $(selectors.slideContainer);
      var $slide = $sliderContainer.find(selectors.slide).eq(index);
      $sliderContainer.children(selectors.slide).removeClass(activeClasses.slide)
      $slide.addClass(activeClasses.slide);
    }
  }

  var photo = $('.about__photo').get(0);
  photo.onload = function(){
    var $fixed = $('.about__fixed').first();
    var $photo = $(photo);
    var top = $photo.offset().top - document.documentElement.clientHeight + photo.scrollHeight;
    $fixed.affix({
      offset: {
        top: top,
        bottom: 0
      }
    })
  };

  $('#our_beers').click(function(e){
    e.preventDefault()
    var toScroll = $('#ancor_beer').offset().top - 210 + 'px';
    console.log(toScroll);
    $('html, body').stop().animate({
      scrollTop: toScroll
    }, {
      duration: 350,
      easing: 'swing'
    });
  })

  // order form
  $('.process .border-box').eq(0).click(function(e){
    var toScroll = $('.about__order .about__order-form').offset().top - 590 + 'px';
    console.log(toScroll);
    $('html, body').stop().animate({
      scrollTop: toScroll
    }, {
      duration: 350,
      easing: 'swing'
    });
    $('.about__order .about__order-form').addClass('about__order-form--active')
  });

  $('.about__order').eq(0).click(function(e){
    $this = $(this);
    $this.find('.about__order-form').addClass('about__order-form--active')
  });

  var $formContainer = $('.about__order .about__order-form');
  var $inputName =  $formContainer.find("input[name='name']");
  var $inputPhone = $formContainer.find("input[name='phone']");
  var $gotcha = $formContainer.find("input[name='_gotcha']");

  $('.about__order form').submit(function(e){
    e.preventDefault()
    $this = $(this);
    var valid = true;
    if($inputName.val().length == 0){
      $inputName.addClass('form__text--invalid')
      valid = false
    }
    if($inputPhone.val().length == 0){
      $inputPhone.addClass('form__text--invalid')
      valid = false
    }
    if(valid) {
      $.ajax({
          url: "https://formspree.io/lawandbrew@gmail.com",
          method: "POST",
          data: {
            name: $inputName.val(),
            phone: $inputPhone.val(),
            _subject: "Новая заявка с лендинга",
            _gotcha: $gotcha.val()
          },
          dataType: "json"
      }).done(function() {
        $formContainer.removeClass('about__order-form--active')
        $inputName.removeClass('form__text--invalid').val('')
        $inputPhone.removeClass('form__text--invalid').val('')
      });
    }
  })
  function checkEmptyInputValue(){
    $this = $(this);
    if($(this).val().length !== 0){
      $this.removeClass('form__text--invalid')
    }
  }
  $inputName.keydown(checkEmptyInputValue)
  $inputPhone.keydown(checkEmptyInputValue)

  var $agePopup = $("#age-popup");
  if (document.cookie.indexOf("age18=1") === -1) {
    $agePopup
      .on("click", ".age-popup__answer--yes", function() {
        document.cookie = "age18=1; path=/";
        console.log(document.cookie);
        $agePopup.detach();
      })
      .show();

  } else {
    $agePopup.detach();
  }

});
