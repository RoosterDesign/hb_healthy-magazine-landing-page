(function(window, document){

    const lpPrefix = 'hmlp';



    //== Sticky Nav (Mobile only)

    function stickyNav() {

        let currentScroll, quickNavTop;

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
    
        // Check on load
        doSticky();

    }



    //== Quick Nav Scroll

    function quickNavScroll() {
        $('.js-'+lpPrefix+'-scrollto').click(function(e){
            e.preventDefault();
            let anchor, offset;

            anchor = $(this).attr("href");
            offset = $('.'+lpPrefix+'-nav-wrap').outerHeight() - 1;

            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top - offset
            }, 1500, 'easeInOutExpo');

            console.info(offset);

        });
    };



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



    //== Init all functions

    function init() {
        stickyNav();
        quickNavScroll();
        freeSampleModal();
    };


    $(document).ready(function(){
    
        init();
    
    });


})(window, document);