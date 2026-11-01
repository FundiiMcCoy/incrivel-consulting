/**
 * Main JavaScript file for the website
 * Organized with proper initialization and modular functions
 */

(function($) {
    'use strict';

    // Configuration object
    const CONFIG = {
        breakpoints: {
            mobile: 1199
        },
        scroll: {
            threshold: 1,
            offset: 90
        },
        animation: {
            duration: 500
        }
    };

    // Header functionality module
    const Header = {
        init: function() {
            this.bindEvents();
            this.handleResize();
        },

        bindEvents: function() {
            // Mobile menu toggle
            $('.phone-menu').on('click', this.toggleMobileMenu);
            
            // Window resize handler
            $(window).on('resize', this.handleResize);
            
            // Scroll handler for fixed header
            $(window).on('load scroll resize orientationchange', this.handleScroll);
        },

        toggleMobileMenu: function() {
            $(this).toggleClass('change');
            $('header').toggleClass('active');
            $('.menu-holder').slideToggle();
        },

        handleResize: function() {
            const windowWidth = $(window).innerWidth();
            
            if (windowWidth < CONFIG.breakpoints.mobile) {
                $('.phone-menu').show();
                $('.menu-holder').hide();
            } else {
                $('.phone-menu').hide();
                $('.menu-holder').show();
            }

            // Reset mobile menu state on resize
            $('.phone-menu').removeClass('change');
            $('header').removeClass('active');
        },

        handleScroll: function() {
            const scrollTop = $(document).scrollTop();
            
            if (scrollTop > CONFIG.scroll.threshold) {
                $('header').addClass('scrolled');
            } else {
                $('header').removeClass('scrolled');
            }
        }
    };

    // Navigation functionality module
    const Navigation = {
        init: function() {
            this.bindSmoothScroll();
        },

        bindSmoothScroll: function() {
            $('a[href*="#"]')
                .not('[href="#"]')
                .not('.card-link')
                .not('[href="#0"]')
                .on('click', this.handleSmoothScroll);
        },

        handleSmoothScroll: function(event) {
            // Check if it's an on-page link
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname) {
                
                const target = Navigation.getScrollTarget(this.hash);
                
                if (target.length) {
                    event.preventDefault();
                    Navigation.animateScroll(target);
                }
            }
        },

        getScrollTarget: function(hash) {
            let target = $(hash);
            return target.length ? target : $('[name=' + hash.slice(1) + ']');
        },

        animateScroll: function(target) {
            $('html, body').animate({
                scrollTop: target.offset().top - CONFIG.scroll.offset
            }, CONFIG.animation.duration, function() {
                Navigation.setFocus(target);
            });
        },

        setFocus: function(target) {
            const $target = $(target);
            $target.focus();
            
            if (!$target.is(':focus')) {
                $target.attr('tabindex', '-1');
                $target.focus();
            }
        }
    };

    // Slider functionality module
    const Slider = {
        init: function() {
            this.initHeroSlider();
        },

        initHeroSlider: function() {
            const $heroSlider = $('.hero-slider');
            
            if ($heroSlider.length && $heroSlider.width() > 1) {
                $heroSlider.slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    autoplay: false,
                    prevArrow: '.prev-hero-btn',
                    nextArrow: '.next-hero-btn',
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                });
            }
        }
    };

    // Utility functions
    const Utils = {
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Main application initialization
    const App = {
        init: function() {
            console.log('Initializing application...');
            
            // Initialize modules
            Header.init();
            Navigation.init();
            Slider.init();
            
            console.log('Application initialized successfully');
        }
    };

    // Document ready initialization
    $(document).ready(function() {
        App.init();
    });

    // Expose modules to global scope if needed
    window.App = App;
    window.Header = Header;
    window.Navigation = Navigation;
    window.Slider = Slider;

})(jQuery);
