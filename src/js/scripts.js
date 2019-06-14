

(function(window, document){


    //== Global Variables
    const container = $('body > div[role="main"] > div:nth-of-type(1)'),
          lpPrefix = 'hmlp',
          talkingAboutTitle = `We\\\’re also talking about...`;
    

          //== Free Sample Modal
    function freeSampleModal() {

        // Open modal
        $('.js-hmlp-sample-modal').click(function(e) {
            e.preventDefault();
            $(this).parents('.hmlp-sample-banner').children('.hmlp-modal-wrap').fadeIn(200);
        });

        // Close modal
        $('.js-hmlp-modal-close').click(function(e) {
            e.preventDefault();
            $(this).parents('.hmlp-modal-wrap').fadeOut(200);
        });

    }



    //== Add to basket
    function addToBasket() {
    
        $(document).on('click', '.js-quickadd', function(e){
            var self = $(this);
        
            // Variables
            var _dynSessConf = $("input[name='_dynSessConf']").attr('value');
            var skuID = $(this).attr('data-sku');
            var prodId = $(this).attr('data-product-id');
        
            // Form Data
            var data = {
                '_dyncharset': 'UTF-8',
                '_dynSessConf': _dynSessConf,
                'productId' : prodId,
                'skuId' : skuID,
                'quantity' : 1
            };
        
            // Show loading spinner and remove text
            self.html('').addClass(lpPrefix+'-quick-add--in-progress');
        
            // Run AJAX call to dyanmically add to basket 
            $.ajax({
                url:"/modules/ajax/addItemToOrder.jsp",
                method:"POST",
                data: $.param(data),
                success: function(result){
                    self.removeClass(lpPrefix+'-quick-add--in-progress').text('Added');
                }                
            }).then(function(){
                $.ajax({
                    url: '/modules/ajax/basket-masthead.jsp',
                    success: function(result){
                        $('.js-header-basket-link').html(result);
                        setTimeout(function(){
                            self.text('Quick Add');
                        }, 1000);
                    }
                });
            });
        
        });   
    };



    //================ TEMPLATING ========================



    //== Hero

    function initHero() {
        const heroContent = {
            title: `Expert health, wellbeing & fitness advice at your fingertips`,
            body: `Discover the latest health and wellness research and our guides to living healthier.`
        };
        const heroHtml = `<div class="hmlp-hero"><div class="hmlp-hero__content"><h1 class="hmlp-hero__title">${heroContent.title}</h1><p class="hmlp-hero__body">${heroContent.body}</p></div></div>`
        container.append(heroHtml);
    }



    //== Sticky Nav

    function stickyNav() {
        let currentScroll, quickNavTop, stickyNavHtml;
        const stickyNavLiks = [{
            label: 'Healthy',
            link: 'healthy'
        }, {
            label: 'Healthy For Men',
            link: 'healthy-for-men'
        }];

        stickyNavHtml = `<div class="hmlp-nav-wrap"><ul class="hmlp-nav">`;
        stickyNavLiks.forEach(el => stickyNavHtml += `<li class="hmlp-nav__item"><a href="#${el.link}" class="hmlp-nav__link js-hmlp-scrollto" alt="Scroll to ${el.label}">${el.label}</a></li>`);
        stickyNavHtml += `</ul></div>`;    

        container.append(stickyNavHtml);



        //== Sticky nav (mobile only)

        quickNavTop = $('.'+lpPrefix+'-nav-wrap').offset().top; 

        function doSticky() {
            currentScroll = $(window).scrollTop();
            if (currentScroll >= quickNavTop) {                    
                $('body').addClass(lpPrefix+'-sticky-nav--fixed');                 
            } else {
                $('body').removeClass(lpPrefix+'-sticky-nav--fixed');
            }
        };

        $(window).scroll(doSticky);
    
        doSticky();



        //== Scroll to section       

        $('.js-'+lpPrefix+'-scrollto').click(function(e){
            e.preventDefault();
            let anchor, offset;

            anchor = $(this).attr("href");

            if($(window).width() <= 768) {
                // offset = $('.'+lpPrefix+'-nav-wrap').outerHeight() + 30;
                offset = 100;
            } else {
                offset = $('.main-nav').outerHeight() + $('.js-main-header .branding').outerHeight() - 2;
            }            

            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top - offset
            }, 1500, 'easeInOutExpo');

        });

    }



    //== Healthy Block

    function initHealthy() {

        const healthyContent = {
            logo: '/__ssobj/static/hmlp-healthy-logo.png',
            quote: `<p>Introducing your Mental Wellbeing issue. Turn the page for practical advice from Mental Health experts and explore how to improve your overall wellbeing with delicious recipes and the latest health and fitness trends. Check out page 32 for your very own self-care tool kit.</p>`,
            editor: {
                id: 'ellie-hughes',
                name: 'Ellie Hughes',
                role: 'Editorial Director',
                magazine: 'Healthy'
            },
            product: {
                sku: '010284',
                prodId: '60010284',
                title: 'Healthy Magazine Issue 151 2019: Mental Wellbeing',
                price: 2.99,
                url: '/shop/product/healthy-magazine-issue-151-2019-mental-wellbeing-60010284?skuid=010284',
                coverImage: '/__ssobj/static/hmlp-healthy-cover3.jpg',
                mobileImage: '/__ssobj/static/hmlp-healthy-prod2.jpg'
            },
            talkingAboutBullets: [
                'Your holiday health to-do list',
                'Your full guide to SPF',
                'How to be vegan on a budget',
                'The best veg you need to be eating - Seaweed',
                'Everything you need to know about Evening Primrose Oil'
            ]
        };

        let healthyHtml = `<div class="hmlp-block" id="healthy"><div class="hmlp-block__intro"><img src="${healthyContent.logo}" class="hmlp-block__logo" title="Healthy Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">${healthyContent.quote}</blockquote><p class="hmlp-block__intro-editor"><strong>${healthyContent.editor.name}</strong> <br>${healthyContent.editor.role}, <em>${healthyContent.editor.magazine}</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-${healthyContent.editor.id}" class="hmlp-block-editor__photo"></div><p><strong>${healthyContent.editor.name}</strong> <br>${healthyContent.editor.role}, <em>${healthyContent.editor.magazine}</em></p></div><div class="hmlp-block-product"><a href="${healthyContent.product.url}" title="${healthyContent.product.title}"><img src="${healthyContent.product.coverImage}" class="hmlp-block-product__cover" title="Healthy Magazine"></a><p class="hmlp-block-product__price">&pound;${healthyContent.product.price}</p><button class="hmlp-quick-add js-quickadd" data-sku="${healthyContent.product.sku}" data-product-id="${healthyContent.product.prodId}">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="${healthyContent.product.mobileImage}" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy Magazine"></div>`;

        healthyHtml += `<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">${talkingAboutTitle}</h3><ul class="hmlp-talking-about-list">`;
        healthyContent.talkingAboutBullets.forEach(el => healthyHtml += `<li class="hmlp-talking-about-list__item">${el}</li>`);
        healthyHtml += `</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;${healthyContent.product.price}</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="${healthyContent.product.sku}" data-product-id="${healthyContent.product.prodId}">Quick Add</button></div>`;
    
        container.append(healthyHtml);        

    }



    //== Healthy Sample Banner

    function initHealthySampleBanner() {

        const healthySampleBannerContent = {
            id: 'hmlp-healthy-banner',
            label: 'Read your FREE sample of Healthy here',
            ctaLabel: 'Free Sample',
            modalContent: {
                link: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-august-2019-sampler/',
                scriptLink: 'https://www.healthy-magazine.co.uk/wp-content/uploads/healthy-august-2019-sampler/files/html/static/embed.js'
            }

        };

        const healthySampleBannerHtml = `<div class="hmlp-sample-banner u-c" id="${healthySampleBannerContent.id}"><div class="hmlp-sample-banner__body"><p>${healthySampleBannerContent.label}</p><a href="#" class="hmlp-sample-banner__cta js-hmlp-sample-modal" alt="View Sample">${healthySampleBannerContent.ctaLabel}</a></div><div class="hmlp-modal-wrap"><div class="hmlp-modal"><span class="hmlp-modal__close js-hmlp-modal-close"><i class="fas fa-times"></i></span><a class="fbp-embed" style="max-width: 100%" href="${healthySampleBannerContent.modalContent.link}" data-fbp-lightbox="yes" data-fbp-version="1" data-fbp-width="620px" data-fbp-height="480px">Healthy</a></div></div></div>`;

        container.append(healthySampleBannerHtml);

        let modalScriptTag = document.createElement("script");
        modalScriptTag.type = "text/javascript";
        modalScriptTag.src = healthySampleBannerContent.modalContent.scriptLink;
        $("#hmlp-healthy-banner .hmlp-modal").append(modalScriptTag);

    }
    


    //== Healthy For Men Block

    function initHealthyMen() {

        const healthyMenContent = {
            logo: '/__ssobj/static/hmlp-healthy-men-logo.png',
            quote: `<p>We discover the power of opening up to others and say hello to cover star Ryan Reynolds to learn how he dealt with his struggle with anxiety. Not only do we look at improving your mental wellbeing, we also have expert advice on how to improve your nutrition and fitness - from superfoods to how to build bigger arms - this issue has it all.</p>`,
            editor: {
                id: 'tom-rowley',
                name: 'Tom Rowley',
                role: 'Editor',
                magazine: 'Healthy For Men'
            },
            product: {
                sku: '010312',
                prodId: '60010312',
                title: 'Healthy For Men Issue 83 2019: Mental Health',
                price: 2.49,
                url: '/shop/product/healthy-for-men-issue-83-2019-mental-health-60010312?skuid=010312',
                coverImage: '/__ssobj/static/hmlp-healthy-men-cover3.jpg',
                mobileImage: '/__ssobj/static/hmlp-healthy-men-prod2.jpg'
            },
            talkingAboutBullets: [
                'Why you need to be drinking more salt water',
                'What\\\’s so super about superfoods?',
                'How to build bigger muscles in your arms',
                'Why feeling and looking good may boost self-esteem this summer',
                'Why more calories doesn’t mean more muscles'
            ]
        };

        let healthyMenHtml = `<div class="hmlp-block" id="healthy-for-men"><div class="hmlp-block__intro"><img src="${healthyMenContent.logo}" class="hmlp-block__logo" title="Healthy For Men Magazine"><i class="fas fa-quote-left hmlp-block__speech-mark"></i><blockquote class="hmlp-block__intro-quote">${healthyMenContent.quote}</blockquote><p class="hmlp-block__intro-editor"><strong>${healthyMenContent.editor.name}</strong> <br>${healthyMenContent.editor.role}, <em>${healthyMenContent.editor.magazine}</em></p></div><div class="hmlp-block-editor"><div id="hmlp-photo-${healthyMenContent.editor.id}" class="hmlp-block-editor__photo"></div><p><strong>${healthyMenContent.editor.name}</strong> <br>${healthyMenContent.editor.role}, <em>${healthyMenContent.editor.magazine}</em></p></div><div class="hmlp-block-product"><a href="${healthyMenContent.product.url}" title="${healthyMenContent.product.title}"><img src="${healthyMenContent.product.coverImage}" class="hmlp-block-product__cover" title="Healthy For Men Magazine"></a><p class="hmlp-block-product__price">&pound;${healthyMenContent.product.price}</p><button class="hmlp-quick-add js-quickadd" data-sku="${healthyMenContent.product.sku}" data-product-id="${healthyMenContent.product.prodId}">Quick Add</button></div><div class="hmlp-product-img-wrap"><img src="${healthyMenContent.product.mobileImage}" class="hmlp-product-img hmlp-product-img--mobile" title="Healthy For Men Magazine"></div>`;

        healthyMenHtml += `<div class="hmlp-talking-about"><h3 class="hmlp-block__subtitle">${talkingAboutTitle}</h3><ul class="hmlp-talking-about-list">`;
        healthyMenContent.talkingAboutBullets.forEach(el => healthyMenHtml += `<li class="hmlp-talking-about-list__item">${el}</li>`);
        healthyMenHtml += `</ul></div><p class="hmlp-block-product__price hmlp-block-product__price--mobile">&pound;${healthyMenContent.product.price}</p><button class="hmlp-quick-add hmlp-quick-add--mobile js-quickadd" data-sku="${healthyMenContent.product.sku}" data-product-id="${healthyMenContent.product.prodId}">Quick Add</button></div>`;
    
        container.append(healthyMenHtml);        

    }



    //== Healthy For Men Sample Banner

    function initHealthyMenSampleBanner() {

        const healthyMenSampleBannerContent = {
            id: 'hmlp-healthy-for-men-banner',
            label: 'Read your FREE sample of Healthy For Men here',
            ctaLabel: 'Free Sample',
            modalContent: {
                link: 'https://www.healthyformen.com/wp-content/uploads/healthy_for_men-jul-aug-2019-sampler/',
                scriptLink: 'https://www.healthyformen.com/wp-content/uploads/healthy_for_men-jul-aug-2019-sampler/files/html/static/embed.js'
            }
        };

        const healthyMenSampleBannerHtml = `<div class="hmlp-sample-banner u-c" id="${healthyMenSampleBannerContent.id}"><div class="hmlp-sample-banner__body"><p>${healthyMenSampleBannerContent.label}</p><a href="#" class="hmlp-sample-banner__cta js-hmlp-sample-modal" alt="View Sample">${healthyMenSampleBannerContent.ctaLabel}</a></div><div class="hmlp-modal-wrap"><div class="hmlp-modal"><span class="hmlp-modal__close js-hmlp-modal-close"><i class="fas fa-times"></i></span><a class="fbp-embed" style="max-width: 100%" href="${healthyMenSampleBannerContent.modalContent.link}" data-fbp-lightbox="yes" data-fbp-version="1" data-fbp-width="620px" data-fbp-height="480px">Healthy</a></div></div></div>`;

        container.append(healthyMenSampleBannerHtml);

        let modalScriptTag = document.createElement("script");
        modalScriptTag.type = "text/javascript";
        modalScriptTag.src = healthyMenSampleBannerContent.modalContent.scriptLink;
        $("#hmlp-healthy-banner .hmlp-modal").append(modalScriptTag);

    }



    //== Twitter Banner

    function initTwitterBanner() {

        const twitterBannerContent = {
            link: 'https://twitter.com/home?status=@holland_barrett',
            body: 'Let us know what you think about the new look magazines by tweeting',
            twitterAccountName: '@holland_barrett'
        };

        const twitterBannerHtml = `<a href="${twitterBannerContent.link}" target="_blank" class="hmlp-twitter-banner" alt="Tweet Us"><p class="hmlp-twitter-banner__body">${twitterBannerContent.body} <span class="hmlp-twitter-banner__twitter-account">${twitterBannerContent.twitterAccountName}</span></p><i class="fab fa-twitter hmlp-twitter-banner__twitter-logo"></i></a>`

        container.append(twitterBannerHtml);
    }




    //== Init all functions

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
    };


    $(document).ready(function(){
        container.attr('id', lpPrefix+'-wrap').show();
        container.find('.l-wrap').remove();  
        $('.global-banners').remove();
        init();    
    });


})(window, document);