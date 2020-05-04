"use strict";

$(document).ready(function () {
  var $header = $('.is-header');
  var $body = $('body');
  var $navBtn = $('#navBtn');
  var $main = $('.is-main'); // change logo colors

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
  } // hover homepage main links


  function mainLinksHover(el, className) {
    el.hover(function () {
      $('.is-main').addClass('main-hovered ' + className);
    }, function () {
      $('.is-main').removeClass('main-hovered');
      $('.is-main').removeClass(className);
    });
  }

  mainLinksHover($('.is-homepage .main-side__right a.main-link'), 'dir-hovered');
  mainLinksHover($('.is-homepage .main-side__left a.main-link'), 'creative-hovered'); // animations in viewport

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

      if (window.innerWidth < 750) {
        if (divPos < topOfWindow + window.innerHeight - 100) {
          $(this).addClass('is-visible');
        }
      } else {
        if (divPos < topOfWindow + window.innerHeight - 150) {
          $(this).addClass('is-visible');
        }
      }
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

  expandText(); // gallery view of images in post page

  var blockImages = $('.is-block__image');
  blockImages.click(function () {
    $(this).addClass('is-active');
    $(body).addClass('overflow-hidden');
  });
  var blockImageGallery = $('.is-block__image-copied');
  blockImageGallery.click(function (e) {
    e.stopPropagation();

    var _this = $(this).parent('.is-active');

    _this.removeClass('is-active');

    $(body).removeClass('overflow-hidden');
  }); // cursor

  var cursor = $('.is-cursor');

  function moveCursor(e) {
    var x = e.clientX - 16;
    var y = e.clientY - 16;
    cursor.css({
      top: '' + y + 'px',
      left: '' + x + 'px'
    });
  }

  function pointerStyles(el) {
    el.hover(function () {
      cursor.addClass('pointer');
    }, function () {
      cursor.removeClass('pointer');
    });
  }

  if (cursor) {
    $(document).mousemove(function (e) {
      moveCursor(e);
      pointerStyles($('a'));
      pointerStyles($('button'));
      pointerStyles($('.is-block__video'));
    });
  } // video in modal


  var videoModal = $('.is-block__video');
  var videoIframe = $('.is-block__video iframe');
  videoModal.click(function () {
    $(this).addClass('is-active');
    $(body).addClass('overflow-hidden');
  });
  var videoOverlay = $('.is-block__video-overlay');
  videoOverlay.click(function (e) {
    e.stopPropagation();
    videoModal.removeClass('is-active');
    $(body).removeClass('overflow-hidden');
    videoIframe.each(function () {
      var el_src = $(this).attr('src');
      $(this).attr('src', el_src);
    });
  });
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

  if (window.innerWidth >= 1100 && !body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover');
  }

  timer = setTimeout(function () {
    body.classList.remove('disable-hover');
  }, 50);
}, false);