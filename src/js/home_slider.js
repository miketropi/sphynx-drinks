import $ from 'jquery';
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
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: false
                }

            }]
        });

        let scrollAmount = 0;

        document.addEventListener('wheel', (event) => {
            const DIVIDE_AMOUNT = 40;
            if(scrollAmount < 5){

            }
            scrollAmount += event.deltaY / DIVIDE_AMOUNT;
            console.log(scrollAmount)
        });

        
    }

}

export const initHomeSlider = () => {
    new HomeSlider();
};