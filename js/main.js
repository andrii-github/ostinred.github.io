"use strict";

var tablet;
var laptop;
tablet = window.innerWidth >= 767;
laptop = window.innerWidth >= 1140;
$(document).ready(function () {
  var $header = $('.is-header');
  var $body = $('body');
  var $navBtn = $('#navBtn');
  var $main = $('.is-main');
  var footer = $('#footer'); // change logo colors

  if ($(document).scrollTop() > $main.height() - $header.height()) {
    $header.addClass('is-scrolled');
  }

  $(window).scroll(function () {
    if ($(document).scrollTop() > $(window).height() / 5 - $header.height()) {
      $header.addClass('is-scrolled');
    } else {
      $header.removeClass('is-scrolled');
    }
  }); // navigation

  $navBtn.click(function () {
    if ($header.hasClass('is-closing') && !$header.hasClass('is-active')) {
      return;
    }

    if ($header.hasClass('is-active')) {
      closeNavigation();
    } else {
      $header.addClass('is-active');
      $header.addClass('is-closing');
      $body.addClass('is-nav-opened');
    }
  });
  $('.navigation-link__footer').click(function () {
    closeNavigation();
  });

  function closeNavigation() {
    $header.removeClass('is-active');
    $body.removeClass('is-nav-opened');
    clearTimeout(s);
    var s = setTimeout(function () {
      $header.removeClass('is-closing');
    }, 1000);
  } // video playing on hover


  var figure = $('.with-video-bg ');
  var vid = figure.find('video');
  [].forEach.call(figure, function (item, index) {
    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
    item.addEventListener('mouseout', hideVideo.bind(item, index), false);
  });

  function hoverVideo(index, e) {
    // todo
    if (!vid[index].currentTime > 0) {
      vid[index].play();
    }
  }

  function hideVideo(index, e) {
    vid[index].pause();
    vid[index].currentTime = 0;
  } // animations in viewport


  var catalogProjects = $('.is-catalog__project');
  var zebras = $('.is-zebra');
  $(window).scroll(function () {
    inViewport(zebras);
    inViewport(catalogProjects);
  });
  $(window).resize(function () {
    inViewport(zebras);
    inViewport(catalogProjects);
  });
  inViewport(zebras);
  inViewport(catalogProjects);

  function inViewport(el) {
    el.each(function () {
      var divPos = $(this).offset().top,
          topOfWindow = $(window).scrollTop();

      if (tablet) {
        if (divPos < topOfWindow + window.innerHeight + 50) {
          $(this).addClass('is-visible');
        }
      }

      return;
    });
  } // expand text


  var aboutTextDescription = $('.is-block__expanded-description');
  var aboutExpandToggler = $('.is-block__expanded-toggler');

  function expandText() {
    if ($('.is-block__expanded-description > *').length <= 1) {
      aboutExpandToggler.hide();
    } else {
      var aboutFirstHeight = $('.is-block__expanded-description p:nth-child(1)').outerHeight();
      var aboutExpandedHeight = aboutFirstHeight;
      aboutTextDescription.css('maxHeight', aboutExpandedHeight);
      var totalHeight = 0;
      aboutTextDescription.children().each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
      });
      aboutExpandToggler.click(function () {
        if (aboutTextDescription.hasClass('is-expanded')) {
          aboutTextDescription.css('maxHeight', aboutExpandedHeight);
        } else {
          aboutTextDescription.css('maxHeight', totalHeight);
        }

        aboutTextDescription.toggleClass('is-expanded');
      });
    }
  }

  expandText(); // expand credits

  var creditWrapper = $('.is-credit');
  var creditToggler = $('.is-credit__toggler');
  creditToggler.click(function () {
    creditWrapper.toggleClass('is-expanded');
  }); // gallery view of images in post page

  var blockImages = $('.is-block__image');
  blockImages.click(function () {
    if (laptop) {
      $(this).addClass('is-active');
      $(body).addClass('overflow-hidden');
    }
  });
  var blockImageGallery = $('.is-block__image-copied');
  blockImageGallery.click(function (e) {
    e.stopPropagation();

    var _this = $(this).parent('.is-active');

    _this.removeClass('is-active');

    $(body).removeClass('overflow-hidden');
  }); // video in modal

  var videoModal = $('.is-block__video');
  var videoIframe = $('.is-block__video iframe');
  videoModal.click(function () {
    $(this).addClass('is-active');
    $(body).addClass('overflow-hidden');
  });
  var videoOverlay = $('.is-block__video-overlay');
  var buttonModalClose = $('.close-modal-btn');

  function closeModal(e) {
    e.stopPropagation();
    videoModal.removeClass('is-active');
    $(body).removeClass('overflow-hidden');
    videoIframe.each(function () {
      var el_src = $(this).attr('src');
      $(this).attr('src', el_src);
    });
  }

  videoOverlay.click(function (e) {
    closeModal(e);
  });
  buttonModalClose.click(function (e) {
    closeModal(e);
  }); // carousel

  var slider = $('.is-slider');

  if (slider.length) {
    slider.slick({
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: $('.slider-prev'),
      nextArrow: $('.slider-next')
    });
  } // add copyright year


  $('.is-copyright span').text(new Date().getFullYear()); // add header transparent to specific pages

  var pagesHeader = [$('.is-homepage'), $('.is-director__page'), $('.is-creative__page'), $('.is-post__page')];

  for (var i = 0; i < pagesHeader.length; i++) {
    if (pagesHeader[i].length) {
      $header.addClass('header-transparent');
    }
  } // disable logo title for specific pages


  var pagesLogo = [$('.is-about__page'), $('.is-post__page'), $('.is-project__page')];
  var logoIcon = $('.is-logo__icon');
  var logoName = $('.is-logo__name');

  for (var i = 0; i < pagesLogo.length; i++) {
    if (pagesLogo[i].length) {
      logoName.addClass('is-hidden');
      logoIcon.addClass('is-white');
    }
  } // main link animation


  var mainPage = $('#mainPage');
  var creativeLink = $('#creativeLink');
  var directorLink = $('#directorLink');
  var homepageLinkFromCreative = $('#homepageLinkFromCreative');
  var homepageLinkFromDirector = $('#homepageLinkFromDirector');
  var creativeLinkBottom = $('#creativeLinkBottom');
  var directorLinkBottom = $('#directorLinkBottom');
  var homepageLinkFromCreativeBottom = $('homepageLinkFromCreativeBottom');
  var homepageLinkFromDirectorBottom = $('homepageLinkFromDirectorBottom'); // hover homepage main links

  function mainLinksHover(el, className) {
    if (laptop) {
      el.hover(function () {
        mainPage.addClass('main-hovered ' + className);
      }, function () {
        mainPage.removeClass('main-hovered');
        mainPage.removeClass(className);
      });
    }
  }

  mainLinksHover(directorLink, 'dir-hovered');
  mainLinksHover(creativeLink, 'creative-hovered');
  mainLinksHover(homepageLinkFromCreative, 'dir-hovered');
  mainLinksHover(homepageLinkFromDirector, 'creative-hovered');
  var logoName = $('.is-logo__name');

  if (laptop) {
    $(window).scroll(function () {
      if ($(document).scrollTop() > $(window).height() / 2) {
        $('.is-mainpage__content').addClass('unblocked');
      } else {
        $('.is-mainpage__content').removeClass('unblocked');
      }
    });
  }

  $('.is-creative__content').hide();
  $('.is-director__content').hide();
  $('.is-homepage__content').hide();

  if (mainPage.length && mainPage.not('.is-director__page.is-creative__page')) {
    $('.is-homepage__content').show();
  }

  function creativeAnimation() {
    mainPage.addClass('is-creative__page');
    mainPage.removeClass('is-homepage-from-creative');
    logoName.addClass('without-opacity');
    mainPage.addClass('is-animating');
    footer.addClass('is-footer__white');
    clearTimeout(cc);
    var cc = setTimeout(function () {
      $('.is-homepage__content').hide();
      $('.is-creative__content').show();
      $('.is-director__content').hide();
    }, 500);
    clearTimeout(c);
    var c = setTimeout(function () {
      mainPage.removeClass('is-animating');
    }, 1600);
  }

  function directorAnimation() {
    mainPage.addClass('is-director__page');
    mainPage.removeClass('is-homepage-from-creative');
    logoName.addClass('without-opacity');
    mainPage.addClass('is-animating');
    footer.addClass('is-footer__black');
    clearTimeout(dc);
    var dc = setTimeout(function () {
      $('.is-homepage__content').hide();
      $('.is-creative__content').hide();
      $('.is-director__content').show();
    }, 500);
    clearTimeout(d);
    var d = setTimeout(function () {
      mainPage.removeClass('is-animating');
    }, 1600);
  }

  function fromCreativeAnimation() {
    mainPage.removeClass('is-creative__page');
    mainPage.addClass('is-homepage-from-creative');
    mainPage.addClass('is-animating');
    footer.removeClass('is-footer__white');
    clearTimeout(chc);
    var chc = setTimeout(function () {
      $('.is-homepage__content').show();
      $('.is-creative__content').hide();
      $('.is-director__content').show();
    }, 500);
    clearTimeout(ch1);
    var ch1 = setTimeout(function () {
      mainPage.removeClass('is-animating');
    }, 1600);
    clearTimeout(ch2);
    var ch2 = setTimeout(function () {
      mainPage.removeClass('is-homepage-from-creative');
    }, 2000);
  }

  function fromDirectorAnimation() {
    mainPage.removeClass('is-director__page');
    mainPage.addClass('is-homepage-from-director');
    mainPage.addClass('is-animating');
    footer.removeClass('is-footer__black');
    clearTimeout(dhc);
    var dhc = setTimeout(function () {
      $('.is-homepage__content').show();
      $('.is-creative__content').hide();
      $('.is-director__content').show();
    }, 500);
    clearTimeout(dh1);
    var dh1 = setTimeout(function () {
      mainPage.removeClass('is-animating');
    }, 1600);
    clearTimeout(dh2);
    var dh2 = setTimeout(function () {
      mainPage.removeClass('is-homepage-from-director');
    }, 2000);
  }

  if (mainPage.length) {
    footer.addClass('is-translated');
    creativeLink.click(function () {
      creativeAnimation();
    });
    directorLink.click(function () {
      directorAnimation();
    });
    homepageLinkFromCreative.click(function () {
      fromCreativeAnimation();
    });
    homepageLinkFromDirector.click(function () {
      fromDirectorAnimation();
    });

    if (!laptop) {
      $main.touchwipe({
        wipeLeft: function wipeLeft() {
          if ($('.is-creative__page').length) {
            return;
          }

          if ($('.is-director__page').length) {
            fromDirectorAnimation();
          } else {
            creativeAnimation();
          }
        },
        wipeRight: function wipeRight() {
          if ($('.is-director__page').length) {
            return;
          }

          if ($('.is-creative__page').length) {
            fromCreativeAnimation();
          } else {
            directorAnimation();
          }
        },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
      });
    }
  }
}); // smooth scrolling to anchors

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 1500);
}); // prevent instantaneous hover

var body = document.body;
var timer;
window.addEventListener('scroll', function () {
  clearTimeout(timer);

  if (laptop && !body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover');
  }

  timer = setTimeout(function () {
    body.classList.remove('disable-hover');
  }, 50);
}, false);