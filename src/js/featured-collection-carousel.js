import 'slick-carousel';

const featuredCollectionCarousel = () => {

   const elems = $('.section-ft-collection-carousel-wrap');

   if (!elems) return;

   const prevIcon = `
      <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
      <path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

   const nextIcon = `
      <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
      <path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;


   elems.each(function () {
      let $slider = $(this).find('.ft-collection-carousel-wrap'),
         slideTimer = $(this).data('speed'),
         slideAutoplay = $(this).data('autoplay'),
         slideArrows = $(this).data('arrows'),
         slideInfinite = $(this).data('infinite'),
         nav = $(this).find('.carousel-nav-inner');

      $slider.slick({
         dots: true,
         infinite: slideInfinite,
         autoplay: slideAutoplay,
         autoplaySpeed: slideTimer,
         arrows: slideArrows,
         slidesToShow: 5,
         slidesToScroll: 1,
         prevArrow: `<span class="__slide-nav __slide-prev">${prevIcon}</span>`,
         nextArrow: `<span class="__slide-nav __slide-next">${nextIcon}</span>`,
         appendArrows: nav,
         appendDots: nav,
         responsive: [
            {
               breakpoint: 1400,
               settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
               }
            },
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
               }
            },
            {
               breakpoint: 1024,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
               }
            },
            {
               breakpoint: 991,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
               }
            },
            {
               breakpoint: 600,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
               }
            }
         ]
      });
   })
}

featuredCollectionCarousel();
