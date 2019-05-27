(function(window, document) {
    var lpPrefix = "hmlp";
    function stickyNav() {
        var currentScroll, quickNavTop;
        quickNavTop = $("." + lpPrefix + "-nav-wrap").offset().top;
        function doSticky() {
            currentScroll = $(window).scrollTop();
            if (currentScroll >= quickNavTop) {
                $("body").addClass(lpPrefix + "-sticky-nav--fixed");
            } else {
                $("body").removeClass(lpPrefix + "-sticky-nav--fixed");
            }
        }
        $(window).scroll(doSticky);
        doSticky();
    }
    function quickNavScroll() {
        $(".js-" + lpPrefix + "-scrollto").click(function(e) {
            e.preventDefault();
            var anchor, offset;
            anchor = $(this).attr("href");
            offset = $("." + lpPrefix + "-nav-wrap").outerHeight() - 1;
            $("html, body").stop().animate({
                scrollTop: $(anchor).offset().top - offset
            }, 1500, "easeInOutExpo");
            console.info(offset);
        });
    }
    function freeSampleModal() {
        $(".js-hmlp-sample-modal").click(function(e) {
            e.preventDefault();
            $(this).parents(".hmlp-sample-banner").children(".hmlp-modal-wrap").fadeIn(200);
        });
        $(".js-hmlp-modal-close").click(function(e) {
            e.preventDefault();
            $(this).parents(".hmlp-modal-wrap").fadeOut(200);
        });
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
            self.html("").addClass(lpPrefix + "-quick-add--in-progress");
            $.ajax({
                url: "/modules/ajax/addItemToOrder.jsp",
                method: "POST",
                data: $.param(data),
                success: function success(result) {
                    self.removeClass(lpPrefix + "-quick-add--in-progress").text("Added");
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
    function init() {
        stickyNav();
        quickNavScroll();
        freeSampleModal();
        addToBasket();
    }
    $(document).ready(function() {
        init();
    });
})(window, document);