// import $ from 'jquery';
import slick from 'slick-carousel';

class HomeSlider {
    constructor() {
        this.slider = document.querySelector('.section-home-slider');
        this.slideTimer = 3000;
        this.slideAutoplay = true;
        this.slideArrows = true;
        this.slideInfinite = true;

        if (this.slider) {
            this.initializeSlider();
        }
    }

    initializeSlider() {
        this.$slider = $(this.slider).find('.section-home-slider-inner');
        this.slideTimer = $(this.slider).data('speed');
        this.slideAutoplay = $(this.slider).data('autoplay');
        this.slideArrows = $(this.slider).data('arrows');
        this.slideInfinite = $(this.slider).data('infinite');

        // this.$slider.on('init', (instance, slick) => {
        //     this.updateNumbers(slick.currentSlide, slick.slideCount);
        // });

        // this.$slider.on('afterChange', (instance, slick) => {
        //     this.updateNumbers(slick.currentSlide, slick.slideCount);
        // });

        this.$slider.slick({
            dots: false,
            infinite: this.slideInfinite,
            autoplay: this.slideAutoplay,
            autoplaySpeed: this.slideTimer,
            arrows: this.slideArrows,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        $(document).on("scroll", function () {
            if ($(window).width() < 767) return;
            let pixels = $(document).scrollTop();
            let pageHeight = $(document).height() - $(window).height();
            let progress = (100 * pixels / pageHeight) * 10 + 50;
            const imgAnimation = $(".slide-media__image-animation img");
            const imgSlide = $(".slide-media__image img");

            if (progress >= 100 || progress <= 50) return;
            if (imgAnimation.length) {
                imgAnimation.css("max-width", progress + "%");
            }
            if (imgSlide.length) {
                imgSlide.css("max-width", progress + "%");
            }
        })

    }

}

export const initHomeSlider = () => {
    new HomeSlider();
};