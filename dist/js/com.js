function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

(function(window, document) {
    var container = $('body > div[role="main"] > div:nth-of-type(1)'), baseURL = "https://www.hollandandbarrett.com/shop/product/", baseImgURL = "https://images.hollandandbarrettimages.co.uk/productimages/", baseCurrency = "£", lpPrefix = "ssc", socialLinks = [ {
        icon: "fab fa-facebook-f",
        title: "Share this page on Facebook",
        link: "//www.facebook.com/sharer/sharer.php?u=https://www.hollandandbarrett.com/info/summer-shop"
    }, {
        icon: "fab fa-twitter",
        title: "Share this page on Twitter",
        link: "//twitter.com/home?status=https://www.hollandandbarrett.com/info/summer-shop From your natural beauty favourites in travel-ready sizes to the latest innovation in mineral suncare, we have your holiday checklist covered this summer!"
    }, {
        icon: "fas fa-envelope",
        title: "Share this page via e-mail",
        link: "mailto:?&subject=Summer Shop &body=From your natural beauty favourites in travel-ready sizes to the latest innovation in mineral suncare, we have your holiday checklist covered this summer! %0D%0A%0D%0Ahttps://www.hollandandbarrett.com/info/summer-shop"
    } ];
    function scrollTo() {
        $(".js-" + lpPrefix + "-scrollto").click(function(e) {
            e.preventDefault();
            var $anchor = $(this).attr("href");
            if ($(window).width() <= 768) {
                offset = $("." + lpPrefix + "-sticky-nav").outerHeight();
            } else {
                offset = 70 + $(".main-nav").outerHeight() + $(".js-main-header .branding").outerHeight() - 2;
            }
            $("html, body").stop().animate({
                scrollTop: $($anchor).offset().top - offset
            }, 1500, "easeInOutExpo");
        });
    }
    function initStickyQuickNav() {
        var quickNavLinks = [ {
            text: "Suncare",
            link: "#" + lpPrefix + "-suncare",
            icon: "fas fa-sun",
            external: false
        }, {
            text: "Toiletries",
            link: "#" + lpPrefix + "-travel-sized-toiletries",
            icon: "fas fa-shower",
            external: false
        }, {
            text: "Travel Health",
            link: "#" + lpPrefix + "-travel-healthcare",
            icon: "fas fa-heartbeat",
            external: false
        }, {
            text: "Insect Repellent",
            link: "#" + lpPrefix + "-insect-repellent",
            icon: "fas fa-bug",
            external: false
        }, {
            text: "Summer Ready",
            link: "#" + lpPrefix + "-get-set-for-summer",
            icon: "fas fa-umbrella-beach",
            external: false
        }, {
            text: "Food & Drink",
            link: "#" + lpPrefix + "-food-drink",
            icon: "fas fa-utensils",
            external: false
        }, {
            text: "Shop all Summer Shop",
            link: "/shop/offers/summer-shop/",
            icon: "fas fa-shopping-bag",
            external: true
        } ];
        var hamburgerHtml = '<div class="' + lpPrefix + "-burger-menu js-" + lpPrefix + '-nav-toggle"><div class="menu_part"></div><div class="menu_part"></div><div class="menu_part"></div></div>';
        var quickNavHtml = '<nav role="navigation" class="' + lpPrefix + '-sticky-nav"><div class="' + lpPrefix + '-container u-c"><div class="' + lpPrefix + '-sticky-nav-mob">' + hamburgerHtml + '<ul class="' + lpPrefix + '-sticky-nav-social"><li class="' + lpPrefix + "-sticky-nav-social__item " + lpPrefix + '-sticky-nav-social__item--share">Share:</li>';
        for (var _i = 0; _i < socialLinks.length; _i++) {
            var socialLink = socialLinks[_i];
            quickNavHtml += '<li class="' + lpPrefix + '-sticky-nav-social__item"><a href="' + socialLink.link + '" class="' + lpPrefix + '-sticky-nav-social__icon" title="' + socialLink.title + '" target="_blank"><i class="' + socialLink.icon + '"></i></a></li>';
        }
        quickNavHtml += '</ul></div><ul class="' + lpPrefix + '-sticky-nav-list">';
        for (var _i2 = 0; _i2 < quickNavLinks.length; _i2++) {
            var quickNavLink = quickNavLinks[_i2];
            var externalLink = quickNavLink.external ? "" : "js-" + lpPrefix + "-scrollto";
            quickNavHtml += '<li class="' + lpPrefix + '-sticky-nav-list__item"><a href="' + quickNavLink.link + '" class="' + lpPrefix + "-sticky-nav-list__link " + externalLink + '"><i class="' + quickNavLink.icon + " " + lpPrefix + '-sticky-nav-list__icon"></i>' + quickNavLink.text + "</a></li>";
        }
        quickNavHtml += '</ul></div></nav><div class="' + lpPrefix + '-sticky-nav-mask"></div>';
        container.append(quickNavHtml);
        var burger = $(".js-" + lpPrefix + "-nav-toggle"), stickyNav = $("." + lpPrefix + "-sticky-nav-list"), mask = $("." + lpPrefix + "-sticky-nav-mask"), duration = 350, easing = "easeInOutExpo";
        function openMobileNav(el) {
            mask.fadeIn(350);
            $("." + lpPrefix + "-sticky-nav-list").stop().animate({
                left: 0
            }, 350, easing);
            $("html, body").addClass(lpPrefix + "-sticky-nav-open");
            el.addClass("is-active");
            $(".ssc-sticky-nav-list__link").stop().delay(50).each(function(i) {
                $(this).delay(50 * i).queue(function() {
                    $(this).addClass("ssc-sticky-nav-list__link--animate");
                });
            });
        }
        function closeMobileNav(el) {
            mask.fadeOut(duration);
            stickyNav.stop().animate({
                left: -225
            }, duration, easing);
            $("html, body").removeClass(lpPrefix + "-sticky-nav-open");
            el.removeClass("is-active");
            $(".ssc-sticky-nav-list__link").removeClass("ssc-sticky-nav-list__link--animate");
        }
        burger.click(function() {
            if ($(this).hasClass("is-active")) {
                closeMobileNav($(this));
            } else {
                openMobileNav($(this));
            }
        });
        $(".ssc-sticky-nav .js-ssc-scrollto").click(function() {
            if (burger.is(":visible")) {
                closeMobileNav(burger);
            }
        });
        function stickyQuicknav() {
            var currentScroll, quickNavTop;
            if ($(window).width() <= 767) {
                quickNavTop = 300;
            } else {
                quickNavTop = $("." + lpPrefix + "-sticky-nav").offset().top - $(".main-nav").outerHeight() - $(".js-main-header .branding").outerHeight();
            }
            console.info(quickNavTop);
            function doSticky() {
                currentScroll = $(window).scrollTop();
                if (currentScroll >= quickNavTop) {
                    $("body").addClass(lpPrefix + "-sticky-nav--fixed");
                    if (!$(".main-nav").hasClass("main-nav-hidden")) {
                        $("body").addClass(lpPrefix + "-sticky-nav--has-nav");
                    } else {
                        $("body").removeClass(lpPrefix + "-sticky-nav--has-nav");
                    }
                } else {
                    $("body").removeClass(lpPrefix + "-sticky-nav--fixed");
                    $("body").removeClass(lpPrefix + "-sticky-nav--has-nav");
                }
                if (currentScroll >= quickNavTop + 30) {
                    $("body").addClass(lpPrefix + "-sticky-nav--condensed");
                } else {
                    $("body").removeClass(lpPrefix + "-sticky-nav--condensed");
                }
            }
            $(window).scroll(doSticky);
            setTimeout(function() {
                if (currentScroll >= quickNavTop) {
                    $("body").addClass(lpPrefix + "-sticky-nav--fixed");
                    if (!$(".main-nav").hasClass("main-nav-hidden")) {
                        $("body").addClass(lpPrefix + "-sticky-nav--has-nav");
                    } else {
                        $("body").removeClass(lpPrefix + "-sticky-nav--has-nav");
                    }
                } else {
                    $("body").removeClass(lpPrefix + "-sticky-nav--fixed");
                    $("body").removeClass(lpPrefix + "-sticky-nav--has-nav");
                }
            }, 1e3);
        }
        stickyQuicknav();
    }
    function productsCarousel() {
        $slick_slider = $(".js-" + lpPrefix + "-slick");
        settings = {
            slidesToShow: 2,
            centerMode: false,
            variableWidth: true,
            responsive: [ {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    variableWidth: true,
                    centerPadding: 0,
                    infinite: false,
                    slidesToShow: 1
                }
            } ]
        };
        function reslick() {
            if (!$(".ssc-scrolling-mouse").is(":visible")) {
                if ($slick_slider.hasClass("slick-initialized")) {
                    $slick_slider.slick("unslick");
                }
                return;
            }
            if (!$slick_slider.hasClass("slick-initialized")) {
                return $slick_slider.slick(settings);
            }
        }
        reslick();
        var resizePause;
        window.onresize = function() {
            clearTimeout(resizePause);
            resizePause = setTimeout(reslick, 100);
        };
    }
    function addToBasket() {
        $(document).on("click", ".js-quickadd", function(e) {
            var self = $(this);
            var _dynSessConf = $("input[name='_dynSessConf']").attr("value");
            var skuID = $(this).attr("data-sku");
            var prodId = $(this).attr("data-product-id");
            var data = {
                _dyncharset: "UTF-8",
                _dynSessConf: _dynSessConf,
                productId: prodId,
                skuId: skuID,
                quantity: 1
            };
            self.html("").addClass(lpPrefix + "-product__add-btn--in-progress");
            $.ajax({
                url: "/modules/ajax/addItemToOrder.jsp",
                method: "POST",
                data: $.param(data),
                success: function success(result) {
                    self.removeClass(lpPrefix + "-product__add-btn--in-progress").text("Added");
                }
            }).then(function() {
                $.ajax({
                    url: "/modules/ajax/basket-masthead.jsp",
                    success: function success(result) {
                        $(".js-header-basket-link").html(result);
                        setTimeout(function() {
                            self.text("Quick Add");
                        }, 1e3);
                    }
                });
            });
        });
    }
    var promoProfiles = {
        bygohp: {
            label: "Buy One Get One Half Price",
            bgColour: "#c4333a"
        },
        penny: {
            label: "Buy One Get One for a Penny",
            bgColour: "#c4333a"
        },
        bthp: {
            label: "Better than Half Price",
            bgColour: "#c4333a"
        },
        halfPrice: {
            label: "Half Price",
            bgColour: "#c4333a"
        },
        thirtyThreePcOff: {
            label: "33% off",
            bgColour: "#c4333a"
        },
        twentyPcOff: {
            label: "20% off",
            bgColour: "#c4333a"
        },
        twentyFivePcOff: {
            label: "25% off",
            bgColour: "#c4333a"
        },
        doublePoints: {
            label: "Double Bonus Points",
            bgColour: "#c4333a"
        },
        threeForTwo: {
            label: "3 for 2",
            bgColour: "#c4333a"
        }
    }, productsConfig = [ {
        id: lpPrefix + "-suncare",
        title: "Suncare",
        intro: "Protect your family\\'s skin over the summer months with our range of natural suncare.",
        ctaLabel: "Shop all Suncare",
        ctaLink: "/shop/natural-beauty/skincare/sun-care/",
        products: [ { 
            sku: "018373",
            productId: "60018373",
            image: "HB/724/018373_A.jpg",
            promo: promoProfiles.twentyFivePcOff,
            link: "beauty-kitchen-invisible-mineral-shield-primer-cream-spf30-60018373?skuid=018373",
            title: "Beauty Kitchen Invisible Mineral Shield Primer Cream SPF30 50ml",
            desc: "100% natural and fragrance-free daily protection for all skin types - plus it\\'s safe for coral reefs and other ecosystems.",
            price: 11.24,
            rating: 3.5
        }, { 
            sku: "018367",
            productId: "60018367",
            image: "HB/724/018367_A.jpg",
            link: "ultrasun-body-mineral-sunscreen-spf50-60018367?skuid=018367",
            title: "Ultrasun Body Mineral Sunscreen SPF50 100ml",
            desc: "An ultra-light formula that offers heavy duty sun protection with a very high UVA filter of over 95%. The high tech formulation effortlessly glides onto skin, with 100% mineral filters.",
            price: 28.00,
            rating: 4.8
        } ]
    }, {
        id: lpPrefix + "-travel-sized-toiletries",
        title: "Travel sized toiletries",
        intro: "All your natural beauty essentials, in holiday-ready<br> 100ml or under bottles.",
        ctaLabel: "Shop all Travel Sized Toiletries",
        ctaLink: "/shop/natural-beauty/washing-bathing/travel-size/",
        products: [ { 
            sku: "033740",
            productId: "60033740",
            image: "HB/724/033740_A.jpg",
            promo: promoProfiles. bygohp,
            link: "faith-in-nature-dragon-fruit-conditioner-mini-60033740?skuid=033740",
            title: "Faith In Nature Dragon Fruit Conditioner Mini 100ml",
            desc: "A vegan shampoo, infused with exotic Dragonfruit, which is rich in antioxidants and free from Parabens and SLS.",
            price: 2.99,
            rating: 0
        }, { 
            sku: "033737",
            productId: "60033737",
            image: "HB/724/033737_A.jpg",
            promo: promoProfiles. bygohp,
            link: "dr-organic-aloe-vera-micellar-water-mini-60033737?skuid=033737",
            title: "Dr Organic Aloe Vera Micellar Water Mini 75ml",
            desc: "This no-rinse formula helps to remove makeup and gently cleanses on-the-go. Plus it\\'s suitable for all skin types and contains soothing Aloe Vera, Marigold Flower Extract and Pro-Vitamin B5.",
            price: 2.49,
            rating: 0
        } ]
    }, {
        id: lpPrefix + "-travel-healthcare",
        title: "Travel healthcare",
        intro: "Whether you’re worried about hay fever and allergies, or just want to prevent an upset stomach, stock up on these natural remedies.",
        ctaLabel: "Shop all Travel Healthcare",
        ctaLink: "/shop/product-group/summer-healthcare/",
        products: [ { 
            sku: "029475",
            productId: "60029475",
            image: "HB/724/029475_A.jpg",
            link: "holland-barrett-travel-biotic-capsules-60029475?skuid=029475",
            title: "Holland & Barrett Travel Biotic 60 Capsules",
            desc: "Whether traveling abroad or within the UK, different foods, water quality and other things can cause an upset stomach. Refresh your active cultures on-the-go, with these capsules which are specifically designed to give you 10 billion active cultures on the move.",
            price: 24.99,
            rating: 5
        }, { 
            sku: "012072",
            productId: "60012072",
            image: "HB/724/012072_A.jpg",
            link: "a-vogel-pollinosan-hay-fever-tablets-60012072?skuid=012072",
            title: "A.Vogel Pollinosan Hay Fever Tablets",
            desc: "A natural, homeopathic hayfever remedy to relieve sneezing and itching in the nose, throat and eyes",
            price: 10.49,
            rating: 4.2
        } ]
    }, {
        id: lpPrefix + "-insect-repellent",
        title: "Insect Repellent",
        intro: "Take the sting out of summer by using natural remedies<br> to keep insects at bay.",
        ctaLabel: "Shop all Insect Repellent",
        ctaLink: "/shop/natural-beauty/skincare/skin-ailments/insect-repellent/",
        products: [ { 
            sku: "083768",
            productId: "60083768",
            image: "HB/724/083768_A.jpg",
            link: "incognito-insect-repellent-60083768?skuid=083768",
            title: "incognito Insect Repellent 100ml",
            desc: "A 100% natural spray that provides protection against mosquitoes, midges, sandflies, horseflies and ticks. Plus, it\\'s free of DEET, Parabens, GMO and SLS.",
            price: 9.99,
            rating: 4.3
        }, { 
            sku: "060119",
            productId: "60060119",
            image: "HB/724/060119_A.jpg",
            promo: promoProfiles.halfPrice,
            link: "miaroma-citronella-pure-essential-oil-60060119?skuid=060119",
            title: "Miaroma Citronella Pure Essential Oil 10ml",
            desc: "Did you know Citronella can be used as an insect repellent? Add a few drops to a wax burner or mix with a base or carrier oil, such as jojoba oil, and massage into the skin to keep the mozzies at bay",
            price: 3.14,
            rating: 4.7
        } ]
    }, {
        id: lpPrefix + "-get-set-for-summer",
        title: "Get set for Summer",
        intro: "From natural cosmetics and tan tablets, to products designed to help you reach your weight management goals, discover our top picks guaranteed to leave you looking and feeling your best this summer!",
        ctaLabel: "Shop all Summer Beauty",
        ctaLink: "/shop/offers/summer-shop/",
        products: [ { 
            sku: "006495",
            productId: "60006495",
            image: "HB/724/006495_A.jpg",
            link: "holland-barrett-tan-tablets-60006495?skuid=006495",
            promo: promoProfiles.halfPrice,
            title: "Holland & Barrett Tan 60 Tablets",
            desc: "A blend of PABA, L-Tyrosine and Copper, which contribute to normal skin pigmentation. Essential in the run up to summer or a holiday away!",
            price: 2.99,
            rating: 3.4
        }, { 
            sku: "002301",
            productId: "60002301",
            image: "HB/724/002301_A.jpg",
            link: "dead-sea-spa-magik-beauty-balm-60002301?skuid=002301",
            promo: promoProfiles.threeForTwo,
            title: "Dead Sea Spa Magik Beauty Balm 50ml",
            desc: "A deeply moisturising face cream with a light coverage to help even out skintone plus SPF15 to protect the skin from the suns harmful rays.",
            price: 13.5,
            rating: 4.7
        } ]
    }, {
        id: lpPrefix + "-food-drink",
        title: "Food and Drink<br> on the go",
        intro: "Discover healthy snacks and drinks to keep kids (and adults!) happy and hydrated on long journeys.",
        ctaLabel: "Shop all Food & Drink",
        ctaLink: "/shop/food-drink/food-drink-shop-all/",
        products: [ { 
            sku: "081927",
            productId: "60081927",
            image: "HB/724/081927_A.jpg",
            promo: promoProfiles.halfPrice,
            link: "vita-coco-natural-coconut-water-60081927?skuid=081927",
            title: "Vita Coco Natural Coconut Water 330ml",
            desc: "Made with 100% natural and fresh coconut water with naturally occurring essential electrolytes, Vita Coco is the natural and refreshing way to hydrate and replenish anywhere, anytime.",
            price: 0.99,
            rating: 4.7
        }, { 
            sku: "011879",
            productId: "011879",
            image: "HB/724/011879_A.jpg",
            link: "deliciously-ella-energy-ball-cacao-almond-011879?skuid=011879",
            title: "Deliciously Ella Energy Ball Cacao & Almond 40g",
            desc: "A mix of sweet dates with rich cacao, roasted nut butter, almonds, coconut and a pinch of salt. This is the ideal vegan snack when you’re on-the-go!",
            price: 1.99,
            rating: 4.5
        } ]
    } ], bannersConfig = [ {
        id: lpPrefix + "-suncare-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "Discover mineral sunscreen",
        intro: "Whether you\\'re strolling around the park or lying on a tropical beach, you\\'re exposed to the sun\\'s harmful rays. Discover what mineral suncare is and how it can protect you this summer.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/natural-beauty/skincare/suncare/mineral-sun-protection/"
    }, {
        id: lpPrefix + "-toiletries-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "How to really relax on holiday",
        intro: "You might have all the essentials packed, but with over a quarter of Brits taking 4 to 5 days to truly relax, make sure you\\'re ready to make the most of your summer break with our top tips.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/conditions/mental-health/stress/how-to-really-relax/"
    }, {
        id: lpPrefix + "-travel-healthcare-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "How to stay well on holiday",
        intro: "That desperately needed holiday is finally within reach! Ensure you and your loved ones stay healthy to ensure the best summer break.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/natural-beauty/skincare/summer/stay-healthy-holiday/"
    }, {
        id: lpPrefix + "-insect-repellent-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "Make your own natural mosquito spray",
        intro: "Discover which essential oils can keep the bugs at bay. <br>TOP TIP: Apply repellent between sunset & sunrise as this is when mosquitoes are most active.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/natural-beauty/skincare/summer/natural-diy-mosquito-spray/"
    }, {
        id: lpPrefix + "-summer-ready-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "Summer skin and beauty hydration hacks",
        intro: "The beautiful sunshine can take its toll on skin, sapping it of moisture and leaving it dull and dehydrated. Stay hydrated this summer for supple and glowing skin.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/natural-beauty/skincare/summer/summer-hydration-hacks/"
    }, {
        id: lpPrefix + "-food-drink-banner",
        mobileBgImg: "",
        tabletBgImg: "",
        desktopBgImg: "",
        title: "Tips to eat healthy this summer",
        intro: "Family trips out in the sun doesn’t have to mean opting for the stodgy, high salt & sugar foods. Discover the tips and tricks to<br> healthier eating this summer.",
        ctaLabel: "Learn more",
        ctaLink: "/the-health-hub/food-drink/recipes/festivals-eating-healthily-summer-despite-temptations/"
    } ];
    function initHero() {
        var hero_content = {
            title: "Summer Shop",
            intro: "From your natural beauty favourites in travel-ready sizes to the latest innovation in mineral suncare, we have your holiday checklist covered this summer!"
        };
        var hero_social_html = '<ul class="' + lpPrefix + '-hero-social"><li class="' + lpPrefix + "-hero-social__item " + lpPrefix + '-hero-social__item--share">Share</li>';
        for (var _i3 = 0; _i3 < socialLinks.length; _i3++) {
            var socialLink = socialLinks[_i3];
            hero_social_html += '<li class="' + lpPrefix + '-hero-social__item"><a href="' + socialLink.link + '" class="' + lpPrefix + '-hero-social__icon" title="' + socialLink.title + '" target="_blank"><i class="' + socialLink.icon + '"></i></a></li>';
        }
        hero_social_html += "</ul>";
        var hero_html = '<section class="' + lpPrefix + '-hero"><div class="' + lpPrefix + '-hero-container"><h1 class="' + lpPrefix + '-hero__title">' + hero_content.title + '</h1><p class="' + lpPrefix + '-hero__intro">' + hero_content.intro + '</p><a href="#' + lpPrefix + '-row-1" class="' + lpPrefix + "-scrolling-mouse js-" + lpPrefix + '-scrollto"></a>' + hero_social_html + "</div></section>";
        container.append(hero_html);
    }
    function rowConstructor(id) {
        var rowHtml = '<div class="' + lpPrefix + '-row" id="' + lpPrefix + "-row-" + id + '"></div>';
        container.append(rowHtml);
    }
    function productCarouselRepeater(arr) {
        var productCarousel_html = "";
        arr.forEach(function(product) {
            var link = baseURL + product.link, image = baseImgURL + product.image + "?i10c=img.resize(width:320,height:320)", promo = product.promo ? '<span class="' + lpPrefix + '-product__promo" style="background-color:' + product.promo.bgColour + '">' + product.promo.label + "</span>" : "", price = product.price.toFixed(2);
            ratingWidth = product.rating * 10 * 2 + "px", starRating = '<div class="' + lpPrefix + '-product-meta__rating-wrap"><div class="' + lpPrefix + '-product-meta__rating" style="width:' + ratingWidth + '"></div></div>';
            productCarousel_html += '<div class="' + lpPrefix + '-product-wrap"><div class="' + lpPrefix + '-product" id="' + lpPrefix + "-product-" + product.sku + '"><a href="' + link + '"><img src="' + image + '" class="' + lpPrefix + '-product__image" alt="' + product.title + '"/></a>' + promo + '<p class="' + lpPrefix + '-product__title js-mh"><a href="' + link + '" class="' + lpPrefix + '-product__link">' + product.title + '</a></p><div class="' + lpPrefix + '-product-footer"><div class="' + lpPrefix + '-product-meta u-c"><span class="' + lpPrefix + '-product-meta__price">' + baseCurrency + price + "</span>" + starRating + '</div><p class="' + lpPrefix + '-product__desc">' + product.desc + '</p><button class="' + lpPrefix + '-product__add-btn js-quickadd" data-sku="' + product.sku + '" data-product-id="' + product.productId + '">Quick Add</button></div></div></div>';
        });
        return productCarousel_html;
    }
    function productBlockConstructor(i, arr) {
        var productCarousel_html = productCarouselRepeater(arr.products);
        var product_html = '<section class="' + lpPrefix + "-block " + lpPrefix + '-block--products" id="' + arr.id + '"><h1 class="' + lpPrefix + '-block__title">' + arr.title + '</h1><p class="' + lpPrefix + '-block__intro">' + arr.intro + '</p><div class="' + lpPrefix + '-slick-wrap"><div class="js-' + lpPrefix + "-slick " + lpPrefix + '-slick-inner">' + productCarousel_html + '</div></div><div class="u-c"></div><a href="' + arr.ctaLink + '" class="' + lpPrefix + "-btn " + lpPrefix + '-block__cta">' + arr.ctaLabel + "</a></section>";
        $("#" + lpPrefix + "-row-" + i).append(product_html);
    }
    function bannerBlockConstructor(i, arr) {
        var banner_html = '<section class="' + lpPrefix + "-block " + lpPrefix + '-block--banner" id="' + arr.id + '"><div class="' + lpPrefix + '-block-banner-inner"><h1 class="' + lpPrefix + '-block__title">' + arr.title + '</h1><p class="' + lpPrefix + '-block__intro">' + arr.intro + '</p><a href="' + arr.ctaLink + '" class="' + lpPrefix + "-btn " + lpPrefix + '-block__cta">' + arr.ctaLabel + "</a></div></section>";
        $("#" + lpPrefix + "-row-" + i).append(banner_html);
    }
    function initRepeatableBlocks() {
        var mergeArraysFn = function mergeArraysFn(a, b) {
            return (a.length > b.length ? a : b).reduce(function(acc, cur, i) {
                return a[i] && b[i] ? [].concat(_toConsumableArray(acc), [ a[i], b[i] ]) : [].concat(_toConsumableArray(acc), [ cur ]);
            }, []);
        }, mergedArrays = mergeArraysFn(productsConfig, bannersConfig), rowSize = 2, repeatableBlocksArray = mergedArrays.map(function(e, i) {
            return i % rowSize === 0 ? mergedArrays.slice(i, i + rowSize) : null;
        }).filter(function(e) {
            return e;
        });
        repeatableBlocksArray.forEach(function(rowArr, i) {
            i++;
            rowConstructor(i);
            productBlockConstructor(i, rowArr[0]);
            bannerBlockConstructor(i, rowArr[1]);
        });
    }
    function initShopAllCTA() {
        var shopAllCTA_html = '<section class="' + lpPrefix + '-shop-all-cta"><a href="/shop/offers/summer-shop/" class="' + lpPrefix + '-btn">Shop all Summer Shop</a></section>';
        container.append(shopAllCTA_html);
    }
    $(document).ready(function() {
        if ($(".js-main-header").hasClass("new-header")) {
            $("body").addClass(lpPrefix + "-new-header");
        }
        container.removeClass("page").empty().attr("id", lpPrefix + "-wrap").show();
        $(".global-banners").remove();
        initHero();
        initStickyQuickNav();
        initRepeatableBlocks();
        initShopAllCTA();
        scrollTo();
        productsCarousel();
        addToBasket();
    });
})(window, document);