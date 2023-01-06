import 'slick-carousel';

export default function ProductCarousel() {
  const elems = document.querySelectorAll('.slide-product-container');
  if(!elems) return;

  const slideOpts = {
    
  };

  [...elems].forEach(el => {
    $(el).slick({
      slidesToShow: 5,
      slidesToScroll: 1,
    })
  })
}

ProductCarousel();