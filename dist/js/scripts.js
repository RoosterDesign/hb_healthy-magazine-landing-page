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
    function init() {
        stickyNav();
        quickNavScroll();
    }
    $(document).ready(function() {
        init();
    });
})(window, document);