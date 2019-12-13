(function(window, document) {
  var container = $('body > div[role="main"] > div:nth-of-type(1)'),
    lpPrefix = 'hmlp',
    talkingAboutTitle = 'We\\’re also talking about...';
  function freeSampleModal() {
    $('.js-hmlp-sample-modal').click(function(e) {
      e.preventDefault();
      $(this)
        .parents('.hmlp-sample-banner')
        .children('.hmlp-modal-wrap')
        .fadeIn(200);
    });
    $('.js-hmlp-modal-close').click(function(e) {
      e.preventDefault();
      $(this)
        .parents('.hmlp-modal-wrap')
        .fadeOut(200);
    });
  }
  function addToBasket() {
    $(document).on('click', '.js-quickadd', function(e) {
      var self = $(this);
      var _dynSessConf = $("input[name='_dynSessConf']").attr('value');
      var skuID = $(this).attr('data-sku');
      var prodId = $(this).attr('data-product-id');
      var data = {
        _dyncharset: 'UTF-8',
        _dynSessConf: _dynSessConf,
        productId: prodId,
        skuId: skuID,
        quantity: 1
      };
      self.html('').addClass(lpPrefix + '-quick-add--in-progress');
      $.ajax({
        url: '/modules/ajax/addItemToOrder.jsp',
        method: 'POST',
        data: $.param(data),
        success: function success(result) {
          self.removeClass(lpPrefix + '-quick-add--in-progress').text('Added');
        }
      }).then(function() {
        $.ajax({
          url: '/modules/ajax/basket-masthead.jsp',
          success: function success(result) {
            $('.js-header-basket-link').html(result);
            setTimeout(function() {
              self.text('Quick Add');
            }, 1e3);
          }
        });
      });
    });
  }
  function initHero() {
    var heroContent = {
      title: 'Expert health, wellbeing & fitness advice at your fingertips',
      body: 'Make 2020 your healthiest year yet.'
    };
    var heroHtml = '<div class="hmlp-hero"><div class="hmlp-hero__content"><h1 class="hmlp-hero__title">' + heroContent.title + '</h1><p class="hmlp-hero__body">' + heroContent.body + '</p></div></div>';
    container.append(heroHtml);
  }
  function stickyNav() {
    var currentScroll, quickNavTop, stickyNavHtml;
    var stickyNavLiks = [
      {
        label: 'Healthy',
        link: 'healthy'
      },
      {
        label: 'Healthy For Men',
        link: 'healthy-for-men'
      }
    ];
    stickyNavHtml = '<div class="hmlp-nav-wrap"><ul class="hmlp-nav">';
    stickyNavLiks.forEach(function(el) {
      return (stickyNavHtml += '<li class="hmlp-nav__item"><a href="#' + el.link + '" class="hmlp-nav__link js-hmlp-scrollto" alt="Scroll to ' + el.label + '">' + el.label + '</a></li>');
    });
    stickyNavHtml += '</ul></div>';
    container.append(stickyNavHtml);
    quickNavTop = $('.' + lpPrefix + '-nav-wrap').offset().top;
    function doSticky() {
      currentScroll = $(window).scrollTop();
      if (currentScroll >= quickNavTop) {
        $('body').addClass(lpPrefix + '-sticky-nav--fixed');
      } else {
        $('body').removeClass(lpPrefix + '-sticky-nav--fixed');
      }
    }
    $(window).scroll(doSticky);
    doSticky();
    $('.js-' + lpPrefix + '-scrollto').click(function(e) {
      e.preventDefault();
      var anchor, offset;
      anchor = $(this).attr('href');
      if ($(window).width() <= 768) {
        offset = 100;
      } else {
        offset = $('.main-nav').outerHeight() + $('.js-main-header .branding').outerHeight() - 2;
      }
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $(anchor).offset().top - offset
          },
          1500,
          'easeInOutExpo'
        );
    });
  }

  // -----------------------------------------
  //          Healthy
  // -----------------------------------------

  function initHealthy() {
    var healthyContent = {
      logo: '/__ssobj/static/hmlp-healthy-logo.png',
      quote: "<p>Hello 2020! Whatever your take on New Year resolutions, the idea of a whole fresh decade to do things differently in has undeniable appeal. If there\\'s one thing pretty much all the experts agree on, it\\'s that small changes have a bigger chance of succeeding than wholesale life swerves. Hence our theme this issue – little life upgrades, whether that\\'s in your approach to what you eat or even new technologies to make your brain efficient. Grab a copy today.</p>",
      editor: {
        id: 'ellie-hughes',
        name: 'Ellie Hughes',
        role: 'Editorial Director',
        magazine: 'Healthy'
      },
      product: {
        sku: '038031',
        prodId: '60038031',
        title: 'Healthy Magazine Issue 155: Fitness Issue',
        price: 2.99,
        url: '/shop/product/healthy-magazine-issue-155-fitness-issue-60038031',
        coverImage: '/__ssobj/static/hmlp-healthy-cover-131219.jpg',
        mobileImage: '/__ssobj/static/hmlp-healthy-prod-131219-mobile.jpg'
      },
      talkingAboutBullets: ['Anxiety hacks','Clean beauty','Safe sex','Dry(ish) January','Nordic cuddle therapy','Vegan recipes']
    };

    var healthyHtml =
      '<div class="hmlp-block" id="healthy"><div class="hmlp-block__intro"><img src="'+healthyContent.logo+'" class="hmlp-block__logo" title="Healthy Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">'+healthyContent.quote+'</blockquote><p class="hmlp-block__intro-editor"><strong>'+healthyContent.editor.name+'</strong> <br>'+healthyContent.editor.role+', <em>'+healthyContent.editor.magazine+'</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-'+healthyContent.editor.id+'" class="hmlp-block-editor__photo"></div><p><strong>'+healthyContent.editor.name+'</strong> <br>'+healthyContent.editor.role+', <em>'+healthyContent.editor.magazine+'</em></p></div><div class="hmlp-block-product"><a href="'+healthyContent.product.url+'" title="'+healthyContent.product.title+'"><img src="'+healthyContent.product.coverImage +
      '" class="hmlp-block-product__cover" title="Healthy Magazine"></a><p class="hmlp-block-product__price">&pound;'+healthyContent.product.price+'</p><button class="hmlp-quick-add js-quickadd" data-sku="'+healthyContent.product.sku+'" data-product-id="'+healthyContent.product.prodId+'">Quick Add</button></div>';

    healthyHtml += '<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">' + talkingAboutTitle + '</h3><ul class="hmlp-talking-about-list">';

    healthyContent.talkingAboutBullets.forEach(function(el) {
      return (healthyHtml += '<li class="hmlp-talking-about-list__item">'+el+'</li>');
    });
    healthyHtml += '</ul></div><a href="'+healthyContent.product.url+'" title="'+healthyContent.product.title+'" class="hmlp-block-product__cover-mobile"><img src="'+healthyContent.product.coverImage +
      '" class="hmlp-block-product__cover" title="Healthy Magazine"></a><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;'+healthyContent.product.price+'</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="'+healthyContent.product.sku+'" data-product-id="'+healthyContent.product.prodId+'">Quick Add</button></div>';
    container.append(healthyHtml);
  }

  function initHealthySampleBanner() {
    var healthySampleBannerContent = {
      id: 'hmlp-healthy-banner',
      label: 'Read your FREE sample of Healthy here',
      ctaLabel: 'Free Sample',
      modalContent: {
        link: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-feb-2020-sampler/',
        scriptLink: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-feb-2020-sampler/files/html/static/embed.js'
      }
    };
    var healthySampleBannerHtml = '<div class="hmlp-sample-banner u-c" id="' + healthySampleBannerContent.id + '"><div class="hmlp-sample-banner__body"><p>' + healthySampleBannerContent.label + '</p><a href="#" class="hmlp-sample-banner__cta js-hmlp-sample-modal" alt="View Sample">' + healthySampleBannerContent.ctaLabel + '</a></div><div class="hmlp-modal-wrap"><div class="hmlp-modal"><span class="hmlp-modal__close js-hmlp-modal-close"><i class="fas fa-times"></i></span><a class="fbp-embed" style="max-width: 100%" href="' + healthySampleBannerContent.modalContent.link + '" data-fbp-lightbox="yes" data-fbp-version="1" data-fbp-width="620px" data-fbp-height="480px">Healthy</a></div></div></div>';
    container.append(healthySampleBannerHtml);
    var modalScriptTag = document.createElement('script');
    modalScriptTag.type = 'text/javascript';
    modalScriptTag.src = healthySampleBannerContent.modalContent.scriptLink;
    $('#hmlp-healthy-banner .hmlp-modal').append(modalScriptTag);
  }

  // -----------------------------------------
  //          Healthy for Men
  // -----------------------------------------

  function initHealthyMen() {
    var healthyMenContent = {
      logo: '/__ssobj/static/hmlp-healthy-men-logo.png',
      quote: '<p>Hello to cover star Daniel Craig and his final time as 007. Discover how the 51-year-old is fitter and healthier now than he was in his 20s and 30s, and his nutritional plan. Elsewhere, uncover why male fertility is under threat, how plants can provide strength and power this January and a fat burning workout from Love Islands Anton to kick start your year. PLUS, every issue comes with 4 goodies to help fuel your next session – get your copy now.</p>',
      editor: {
        id: 'tom-rowley',
        name: 'Tom Rowley',
        role: 'Editor',
        magazine: 'Healthy For Men'
      },
      product: {
        sku: '038032',
        prodId: '60038032',
        title: 'Healthy for Men Issue 86: Health Upgrades',
        price: 2.49,
        url: '/shop/product/healthy-for-men-issue-86-health-upgrades-60038032',
        coverImage: '/__ssobj/static/hmlp-healthy-men-cover-131219.jpg',
        mobileImage: '/__ssobj/static/hmlp-healthy-men-prod-131219.jpg'
      },
      talkingAboutBullets: ['Amir Khan','Tech-free workouts','Winter fitness','Sweeteners','Dirty vegan recipes','Body dysmorphia']
    };

    var healthyMenHtml =
      '<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' +
      healthyMenContent.logo +
      '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' +
      healthyMenContent.quote +
      '</blockquote><p class="hmlp-block__intro-editor"><strong>' +
      healthyMenContent.editor.name +
      '</strong> <br>' +
      healthyMenContent.editor.role +
      ', <em>' +
      healthyMenContent.editor.magazine +
      '</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-' +
      healthyMenContent.editor.id +
      '" class="hmlp-block-editor__photo"></div><p><strong>' +
      healthyMenContent.editor.name +
      '</strong> <br>' +
      healthyMenContent.editor.role +
      ', <em>' +
      healthyMenContent.editor.magazine +
      '</em></p></div><div class="hmlp-block-product"><a href="' +
      healthyMenContent.product.url +
      '" title="' +
      healthyMenContent.product.title +
      '"><img src="' +
      healthyMenContent.product.coverImage +
      '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' +
      healthyMenContent.product.price +
      '</p><button class="hmlp-quick-add js-quickadd" data-sku="' +
      healthyMenContent.product.sku +
      '" data-product-id="' +
      healthyMenContent.product.prodId +
      '">Quick Add</button></div>';

    // NO EDITOR PHOTO
    // var healthyMenHtml = '<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' + healthyMenContent.logo + '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' + healthyMenContent.quote + '</blockquote></div><div class="hmlp-block-editor"><div id="hmlp-photo-' + healthyMenContent.editor.id + '" class="hmlp-block-editor__photo"></div></div><div class="hmlp-block-product"><a href="' + healthyMenContent.product.url + '" title="' + healthyMenContent.product.title + '"><img src="' + healthyMenContent.product.coverImage + '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' + healthyMenContent.product.price + '</p><button class="hmlp-quick-add js-quickadd" data-sku="' + healthyMenContent.product.sku + '" data-product-id="' + healthyMenContent.product.prodId + '">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="' + healthyMenContent.product.mobileImage + '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>';

    // OUT OF STOCK
    // var healthyMenHtml ='<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' + healthyMenContent.logo + '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' + healthyMenContent.quote + '</blockquote></div><div class="hmlp-block-editor"><div id="hmlp-photo-' + healthyMenContent.editor.id + '" class="hmlp-block-editor__photo"></div></div><div class="hmlp-block-product"><a href="' + healthyMenContent.product.url + '" title="' + healthyMenContent.product.title + '"><img src="' + healthyMenContent.product.coverImage + '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' + healthyMenContent.product.price + '</p><span class="hmlp-quick-add hmlp-quick-add--nostock">Out of stock</span></div><div class="hmlp-product-img-wrap"><img src="' + healthyMenContent.product.mobileImage + '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>';

    healthyMenHtml += '<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">' + talkingAboutTitle + '</h3><ul class="hmlp-talking-about-list">';
    healthyMenContent.talkingAboutBullets.forEach(function(el) {
      return (healthyMenHtml += '<li class="hmlp-talking-about-list__item">' + el + '</li>');
    });

    // healthyMenHtml += '</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;' + healthyMenContent.product.price + '</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="' + healthyMenContent.product.sku + '" data-product-id="' + healthyMenContent.product.prodId + '">Quick Add</button></div>';

    healthyMenHtml += '</ul></div><a href="'+healthyMenContent.product.url+'" title="'+healthyMenContent.product.title+'" class="hmlp-block-product__cover-mobile"><img src="'+healthyMenContent.product.coverImage+'" class="hmlp-block-product__cover" title="Healthy Magazine"></a><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;'+healthyMenContent.product.price+'</p><span class="hmlp-quick-add hmlp-quick-add--nostock hmlp-quick-add--mobile">Out of stock</span></div>';

    container.append(healthyMenHtml);
  }
  function initHealthyMenSampleBanner() {
    var healthyMenSampleBannerContent = {
      id: 'hmlp-healthy-for-men-banner',
      label: 'Read your FREE sample of Healthy For Men here',
      ctaLabel: 'Free Sample',
      modalContent: {
        link: 'https://www.healthyformen.com/wp-content/uploads/healthy_for_men-jan-feb-2020-sampler/',
        scriptLink: 'https://www.healthyformen.com/wp-content/uploads/healthy_for_men-jan-feb-2020-sampler/files/html/static/embed.js'
      }
    };
    var healthyMenSampleBannerHtml = '<div class="hmlp-sample-banner u-c hmlp-sample-banner--alt" id="' + healthyMenSampleBannerContent.id + '"><div class="hmlp-sample-banner__body"><p>' + healthyMenSampleBannerContent.label + '</p><a href="#" class="hmlp-sample-banner__cta js-hmlp-sample-modal" alt="View Sample">' + healthyMenSampleBannerContent.ctaLabel + '</a></div><div class="hmlp-modal-wrap"><div class="hmlp-modal"><span class="hmlp-modal__close js-hmlp-modal-close"><i class="fas fa-times"></i></span><a class="fbp-embed" style="max-width: 100%" href="' + healthyMenSampleBannerContent.modalContent.link + '" data-fbp-lightbox="yes" data-fbp-version="1" data-fbp-width="620px" data-fbp-height="480px">Healthy</a></div></div></div>';
    container.append(healthyMenSampleBannerHtml);
    var modalScriptTag = document.createElement('script');
    modalScriptTag.type = 'text/javascript';
    modalScriptTag.src = healthyMenSampleBannerContent.modalContent.scriptLink;
    $('#hmlp-healthy-banner .hmlp-modal').append(modalScriptTag);
  }
  function initTwitterBanner() {
    var twitterBannerContent = {
      link: 'https://twitter.com/home?status=@holland_barrett',
      body: 'Let us know what you think about the new look magazines by tweeting',
      twitterAccountName: '@holland_barrett'
    };
    var twitterBannerHtml = '<a href="' + twitterBannerContent.link + '" target="_blank" class="hmlp-twitter-banner" alt="Tweet Us"><p class="hmlp-twitter-banner__body">' + twitterBannerContent.body + ' <span class="hmlp-twitter-banner__twitter-account">' + twitterBannerContent.twitterAccountName + '</span></p><i class="fab fa-twitter hmlp-twitter-banner__twitter-logo"></i></a>';
    container.append(twitterBannerHtml);
  }
  function init() {
    initHero();
    stickyNav();
    initHealthy();
    initHealthySampleBanner();
    initHealthyMen();
    initHealthyMenSampleBanner();
    initTwitterBanner();
    freeSampleModal();
    addToBasket();
  }
  $(document).ready(function() {
    container.attr('id', lpPrefix + '-wrap').show();
    container.find('.l-wrap').remove();
    $('.global-banners').remove();
    init();
  });
})(window, document);
