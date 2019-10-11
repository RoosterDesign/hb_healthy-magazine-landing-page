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
      body: 'Discover the latest health and wellness research and our guides to living healthier.'
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
      quote: '<p>Inside this issue, we\\’ve turned our attention to nutrition. As the weather turns colder, we turn to comfort food, but how important is food for our health? We discover what you should be eating to boost your immunity and how to make the most of autumnal produce to create nourishing meals.  <strong>We\\’re also excited to reveal the winners of this year\\’s Healthy awards.</strong></p>',
      editor: {
        id: 'ellie-hughes',
        name: 'Ellie Hughes',
        role: 'Editorial Director',
        magazine: 'Healthy'
      },
      product: {
        sku: '010306',
        prodId: '60010306',
        title: 'Healthy Magazine Issue 153: The Nutrition Issue',
        price: 2.99,
        url: '/shop/product/healthy-magazine-issue-153-the-nutrition-issue-60010306',
        coverImage: '/__ssobj/static/hmlp-healthy-cover-oct-nov-19.jpg',
        mobileImage: '/__ssobj/static/hmlp-healthy-prod-oct-nov-19-mobile.jpg'
      },
      talkingAboutBullets: ['Managing chronic pain', 'Prebiotic supplements', 'Fertility', 'Organic beauty', 'Kettlebell swings', 'Mineral skincare']
    };

    var healthyHtml =
      '<div class="hmlp-block" id="healthy"><div class="hmlp-block__intro"><img src="' +
      healthyContent.logo +
      '" class="hmlp-block__logo" title="Healthy Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' +
      healthyContent.quote +
      '</blockquote><p class="hmlp-block__intro-editor"><strong>' +
      healthyContent.editor.name +
      '</strong> <br>' +
      healthyContent.editor.role +
      ', <em>' +
      healthyContent.editor.magazine +
      '</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-' +
      healthyContent.editor.id +
      '" class="hmlp-block-editor__photo"></div><p><strong>' +
      healthyContent.editor.name +
      '</strong> <br>' +
      healthyContent.editor.role +
      ', <em>' +
      healthyContent.editor.magazine +
      '</em></p></div><img src="/__ssobj/static/hmlp-healthy-awards-2019.gif" class="hmlp-award-logo" /><div class="hmlp-block-product"><a href="' +
      healthyContent.product.url +
      '" title="' +
      healthyContent.product.title +
      '"><img src="' +
      healthyContent.product.coverImage +
      '" class="hmlp-block-product__cover" title="Healthy Magazine"></a><p class="hmlp-block-product__price">&pound;' +
      healthyContent.product.price +
      '</p><button class="hmlp-quick-add js-quickadd" data-sku="' +
      healthyContent.product.sku +
      '" data-product-id="' +
      healthyContent.product.prodId +
      '">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="' +
      healthyContent.product.mobileImage +
      '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy Magazine"></div>';
    healthyHtml += '<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">' + talkingAboutTitle + '</h3><ul class="hmlp-talking-about-list">';

    healthyContent.talkingAboutBullets.forEach(function(el) {
      return (healthyHtml += '<li class="hmlp-talking-about-list__item">' + el + '</li>');
    });
    healthyHtml += '</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;' + healthyContent.product.price + '</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="' + healthyContent.product.sku + '" data-product-id="' + healthyContent.product.prodId + '">Quick Add</button></div>';
    container.append(healthyHtml);
  }

  function initHealthySampleBanner() {
    var healthySampleBannerContent = {
      id: 'hmlp-healthy-banner',
      label: 'Read your FREE sample of Healthy here',
      ctaLabel: 'Free Sample',
      modalContent: {
        link: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-october-2019-sampler/',
        scriptLink: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-october-2019-sampler/files/html/static/embed.js'
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
      quote: '<p>We get the scoop on how Michael B Jordan trains like a champion for his film roles including, Creed, Black Panther and the new film, Just Mercy. Whether you\\’re looking to build strength or, to look and feel better, this issue has got all the tips and advice you need whether you\\’re 25 or 55. Discover how to strengthen your winter defences with our guide on how your nutrition can boost immunity.</p><p>PLUS, Save with exclusive vouchers inside including half price Grenade Killa Ketones and Optimum Nutrition BCAA powder.</p>',
      editor: {
        id: 'tom-rowley',
        name: 'Tom Rowley',
        role: 'Editor',
        magazine: 'Healthy For Men'
      },
      product: {
        sku: '010314',
        prodId: '60010314',
        title: 'Healthy for Men Issue 85: Fitness Special',
        price: 2.49,
        url: '/shop/product/healthy-for-men-issue-85-fitness-special-60010314?skuid=010314',
        coverImage: '/__ssobj/static/hmlp-healthy-men-cover-111019.jpg',
        mobileImage: '/__ssobj/static/hmlp-healthy-men-prod-111019.jpg'
      },
      talkingAboutBullets: ['Being an ace Dad', 'Mastering your sex drive', 'Greener grooming', 'Handling hangovers', 'Tackling loneliness', 'Training with your tribe']
    };

    var healthyMenHtml =
      '<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' + healthyMenContent.logo + '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' + healthyMenContent.quote +
      '</blockquote><p class="hmlp-block__intro-editor"><strong>' + healthyMenContent.editor.name + '</strong> <br>' + healthyMenContent.editor.role + ', <em>' + healthyMenContent.editor.magazine + '</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-' + healthyMenContent.editor.id + '" class="hmlp-block-editor__photo"></div><p><strong>' + healthyMenContent.editor.name + '</strong> <br>' + healthyMenContent.editor.role + ', <em>' + healthyMenContent.editor.magazine + '</em></p></div><div class="hmlp-block-product"><a href="' + healthyMenContent.product.url + '" title="' + healthyMenContent.product.title + '"><img src="' + healthyMenContent.product.coverImage + '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' + healthyMenContent.product.price + '</p><button class="hmlp-quick-add js-quickadd" data-sku="' + healthyMenContent.product.sku + '" data-product-id="' + healthyMenContent.product.prodId + '">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="' + healthyMenContent.product.mobileImage + '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>';

    // NO EDITOR PHOTO
    // var healthyMenHtml = '<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' + healthyMenContent.logo + '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' + healthyMenContent.quote + '</blockquote></div><div class="hmlp-block-editor"><div id="hmlp-photo-' + healthyMenContent.editor.id + '" class="hmlp-block-editor__photo"></div></div><div class="hmlp-block-product"><a href="' + healthyMenContent.product.url + '" title="' + healthyMenContent.product.title + '"><img src="' + healthyMenContent.product.coverImage + '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' + healthyMenContent.product.price + '</p><button class="hmlp-quick-add js-quickadd" data-sku="' + healthyMenContent.product.sku + '" data-product-id="' + healthyMenContent.product.prodId + '">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="' + healthyMenContent.product.mobileImage + '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>';

    // OUT OF STOCK
    // var healthyMenHtml ='<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="' + healthyMenContent.logo + '" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">' + healthyMenContent.quote + '</blockquote></div><div class="hmlp-block-editor"><div id="hmlp-photo-' + healthyMenContent.editor.id + '" class="hmlp-block-editor__photo"></div></div><div class="hmlp-block-product"><a href="' + healthyMenContent.product.url + '" title="' + healthyMenContent.product.title + '"><img src="' + healthyMenContent.product.coverImage + '" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;' + healthyMenContent.product.price + '</p><span class="hmlp-quick-add hmlp-quick-add--nostock">Out of stock</span></div><div class="hmlp-product-img-wrap"><img src="' + healthyMenContent.product.mobileImage + '" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>';

    healthyMenHtml += '<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">' + talkingAboutTitle + '</h3><ul class="hmlp-talking-about-list">';
    healthyMenContent.talkingAboutBullets.forEach(function(el) {
      return (healthyMenHtml += '<li class="hmlp-talking-about-list__item">' + el + '</li>');
    });

    // healthyMenHtml += '</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;' + healthyMenContent.product.price + '</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="' + healthyMenContent.product.sku + '" data-product-id="' + healthyMenContent.product.prodId + '">Quick Add</button></div>';

    healthyMenHtml += '</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;' + healthyMenContent.product.price + '</p><span class="hmlp-quick-add hmlp-quick-add--nostock hmlp-quick-add--mobile">Out of stock</span></div>';

    container.append(healthyMenHtml);
  }
  function initHealthyMenSampleBanner() {
    var healthyMenSampleBannerContent = {
      id: 'hmlp-healthy-for-men-banner',
      label: 'Read your FREE sample of Healthy For Men here',
      ctaLabel: 'Free Sample',
      modalContent: {
        link: 'https://www.healthyformen.com/wp-content/uploads/samplers/healthy_for_men-nov-dec-2019-sampler/',
        scriptLink: 'https://www.healthyformen.com/wp-content/uploads/samplers/healthy_for_men-nov-dec-2019-sampler/files/html/static/embed.js'
      }
    };
    var healthyMenSampleBannerHtml = '<div class="hmlp-sample-banner u-c" id="' + healthyMenSampleBannerContent.id + '"><div class="hmlp-sample-banner__body"><p>' + healthyMenSampleBannerContent.label + '</p><a href="#" class="hmlp-sample-banner__cta js-hmlp-sample-modal" alt="View Sample">' + healthyMenSampleBannerContent.ctaLabel + '</a></div><div class="hmlp-modal-wrap"><div class="hmlp-modal"><span class="hmlp-modal__close js-hmlp-modal-close"><i class="fas fa-times"></i></span><a class="fbp-embed" style="max-width: 100%" href="' + healthyMenSampleBannerContent.modalContent.link + '" data-fbp-lightbox="yes" data-fbp-version="1" data-fbp-width="620px" data-fbp-height="480px">Healthy</a></div></div></div>';
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
