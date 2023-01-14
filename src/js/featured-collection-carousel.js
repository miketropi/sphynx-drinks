import slick from 'slick-carousel';

class FeaturedCollectionCarousel {
    constructor() {
        this.carousel = document.querySelector('.section-ft-collection-carousel-wrap');
        this.slideTimer = 500;
        this.slideAutoplay = true;
        this.slideArrows = true;
        this.slideInfinite = true;
        this.prevIcon = `
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
  <path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

        this.nextIcon = `
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
<path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        if (this.carousel) {
            this.initializeCarousel();
        }
    }

    initializeCarousel() {
        this.$slider = $(this.carousel).find('.ft-collection-carousel-wrap');
        this.slideTimer = $(this.carousel).data('speed');
        this.slideAutoplay = $(this.carousel).data('autoplay');
        this.slideArrows = $(this.carousel).data('arrows');
        this.slideInfinite = $(this.carousel).data('infinite');

        this.$slider.slick({
            dots: true,
            infinite: this.slideInfinite,
            autoplay: this.slideAutoplay,
            autoplaySpeed: this.slideTimer,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: `<span class="__slide-nav __slide-prev">${ this.prevIcon }</span>`,
            nextArrow: `<span class="__slide-nav __slide-next">${ this.nextIcon }</span>`,
            
        });

    }

}

export const initFeaturedCollectionCarousel = () => {
    new FeaturedCollectionCarousel();
};