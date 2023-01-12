import 'slick-carousel';

export default function ProductCatCarousel() {
  const elems = document.querySelectorAll('.product-cat-carousel-inner');
  if(!elems) return;

  let prevIcon = `
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
  <path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `;

  let nextIcon = `
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle r="21" transform="matrix(-1 0 0 1 21.9263 21.3164)" fill="#F05123"/>
<path d="M14.9263 21.1934H28.9263" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.9263 28.1934L28.9263 21.1934L21.9263 14.1934" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  [...elems].forEach(el => {
    $(el).slick({
      dots: false,
      infinite: false, 
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: `<span class="__slide-nav __slide-prev">${ prevIcon }</span>`,
      nextArrow: `<span class="__slide-nav __slide-next">${ nextIcon }</span>`,
      responsive: [
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
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    })
  })
}

ProductCatCarousel();