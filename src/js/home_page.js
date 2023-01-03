import $ from 'jquery';
import slick from 'slick-carousel';
console.log(123)
class ListingCarousel {
    constructor() {
        this.carousel = document.querySelector('.listing-carousel');
        this.slideTimer = 5000;

        if(this.carousel) {
            this.initializeCarousel();
        }
    }

    initializeCarousel() {
        this.$slider = $(this.carousel).find('.slider');
        this.$controls = $(this.carousel).find('.controls');
        this.positionDisplay = this.carousel.querySelector('.controls .position');
        this.indicator = this.carousel.querySelector('.controls .indicator');

        this.$slider.on('init', (instance, slick) => {
            this.updateNumbers(slick.currentSlide, slick.slideCount);
        });

        this.$slider.on('afterChange', (instance, slick) => {
            this.updateNumbers(slick.currentSlide, slick.slideCount);
        });

        this.$slider.slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: this.slideTimer,
            appendArrows: this.$controls,
            arrows: true,
            centerPadding: '0',
            pauseOnFocus: false,
            pauseOnHover: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon icon-arrow-right"></i></button>',
        });
    }

    updateNumbers(current, count) {
        $(this.indicator).css({width: 0, left: 0}).stop().animate({ width: '100%' }, this.slideTimer - 400, 'linear',
            function(){
                $(this).addClass('pop').animate({width: 0, left: '100%'}, 400);
            });

        current += 1;
        this.positionDisplay.innerHTML = (current < 10 ? '0' : '') + current + '/' + (count < 10 ? '0' : '') + count;
    }
}

export const initListingCarousel = () => {
//   new ListingCarousel();
};