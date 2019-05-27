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




    //== Init all functions

    function init() {
        stickyNav();
        quickNavScroll();
        freeSampleModal();
        addToBasket();
    };


    $(document).ready(function(){
    
        init();
    
    });


})(window, document);