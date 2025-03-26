$(document).ready(function() {
    // Add fade-in animation to elements as they come into view
    $(window).scroll(function() {
        $('.category-card, .hero-section, .featured-products, .product-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('header').addClass('bg-dark');
        } else {
            $('header').removeClass('bg-dark');
        }
    });

    // Mobile menu close on click
    $('.navbar-nav a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Category card hover effect
    $('.category-card').hover(
        function() {
            $(this).find('.card-body').css('background-color', '#f8f9fa');
        },
        function() {
            $(this).find('.card-body').css('background-color', '#fff');
        }
    );

    // Product view switching (Grid/List)
    $('.view-options .btn').on('click', function() {
        $('.view-options .btn').removeClass('active');
        $(this).addClass('active');
        
        if ($(this).find('.fa-th-large').length) {
            $('.products-grid').removeClass('list-view');
        } else {
            $('.products-grid').addClass('list-view');
        }
    });

    // Product sorting
    $('.filter-group select').on('change', function() {
        var sortBy = $(this).val();
        var products = $('.product-card').get();
        
        products.sort(function(a, b) {
            if (sortBy === 'Price: Low to High') {
                return parseFloat($(a).find('.product-price').text().replace('$', '')) - 
                       parseFloat($(b).find('.product-price').text().replace('$', ''));
            } else if (sortBy === 'Price: High to Low') {
                return parseFloat($(b).find('.product-price').text().replace('$', '')) - 
                       parseFloat($(a).find('.product-price').text().replace('$', ''));
            }
            return 0;
        });
        
        $('.products-grid').append(products);
    });

    // Add to cart animation
    $('.product-overlay .btn-primary').on('click', function() {
        var $btn = $(this);
        $btn.html('<i class="fas fa-check"></i> Added');
        $btn.removeClass('btn-primary').addClass('btn-success');
        
        setTimeout(function() {
            $btn.html('<i class="fas fa-shopping-cart"></i> Add to Cart');
            $btn.removeClass('btn-success').addClass('btn-primary');
        }, 2000);
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 