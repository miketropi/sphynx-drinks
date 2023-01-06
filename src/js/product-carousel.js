import 'slick-carousel';

export default function ProductCarousel() {
  const elems = document.querySelectorAll('.slide-product-container');
  if(!elems) return;

  let prevIcon = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12.8477H5" stroke="#F05123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 19.8477L5 12.8477L12 5.84766" stroke="#F05123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  let nextIcon = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.8477H19" stroke="#F05123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 19.8477L19 12.8477L12 5.84766" stroke="#F05123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  [...elems].forEach(el => {
    $(el).slick({
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: `<span class="__slide-nav __slide-prev">${ prevIcon }</span>`,
      nextArrow: `<span class="__slide-nav __slide-next">${ nextIcon }</span>`,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]
    })
  })
}

ProductCarousel();