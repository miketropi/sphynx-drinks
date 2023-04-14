import 'slick-carousel';

/**
 * Add To Cart
 * @param {*} quantity 
 * @param {*} variant_id 
 * @returns 
 */
const addToCart = async (quantity, variant_id) => {
  const endpoint = window.routes.cart_add_url;
  const params = {
    type: 'POST',
    url: endpoint,
    data: {
      quantity,
      id: variant_id,
    },
    error: function (XMLHttpRequest, textStatus) {
      window.Shopify.onError(XMLHttpRequest, textStatus);
    }
  }
  return await $.ajax(params);
}

const updateMiniCartUi = (html) => {
  const updateElems = [
    {
      selector: '#mini-cart__header'
    },
    {
      selector: '.cart-link__bubble'
    },
    {
      selector: '#main-cart-items'
    },
    {
      selector: '.cart__footer-wrapper'
    },
  ];

  updateElems.forEach(item => {
    if ($(item.selector).length <= 0) return;
    $(item.selector).html($(html).find(item.selector).html());
  })
}

export { addToCart, updateMiniCartUi }

const customFilterProduct = () => {
  $('.facets__main .js-filter:last-child .facets__selected').text('Popular');

  // only show award winner & best sellers
  $('.list-menu__item').each(function (index, value) {
    let valueItem = $(this).find('input').val();
    let idItem = $(this).find('input').attr('id');
    if (idItem.indexOf("Filter-More") != -1) {
      if (valueItem != 'Award Winners' && valueItem != 'Best Sellers') {
        $(this).hide();
      }
    }
  });

  // Tonic and Soda & Mixers 
  const ProductGridContainer = $('#ProductGridContainer');
  let collectionName = ProductGridContainer.data('name-collection');

  $('.js-filter').each(function (index, value) {
    let filterItem = $(this).find('.facets__selected').text();
    if (collectionName == 'Tonic and Soda' || collectionName == 'Non-Alcoholic Mixers') {
      if (filterItem.indexOf("ABV") != -1 || filterItem.indexOf("Popular") != -1) {
        $(this).hide();
      }
    }

    if (collectionName != 'Products') {
      if (filterItem.indexOf("Product type") != -1) {
        $(this).hide();
      }
    }
    // if (filterItem.indexOf("Product type") != -1) {
    //   $(this).find('.facets__selected').text('Type')
    // }

  });

}

customFilterProduct();

const applySlickSlider = () => {
  let prevIcon = `
  <svg width="18px" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g  transform="translate(-385.000000, -6679.000000)" fill="#000000"> <g transform="translate(56.000000, 160.000000)"> <path d="M338.61,6539 L340,6537.594 L331.739,6528.987 L332.62,6528.069 L332.615,6528.074 L339.955,6520.427 L338.586,6519 C336.557,6521.113 330.893,6527.014 329,6528.987 C330.406,6530.453 329.035,6529.024 338.61,6539" id="arrow_left-[#334]"> </path> </g> </g> </g> </svg>`;

  let nextIcon = `
  <svg width="18px" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-425.000000, -6679.000000)" fill="#000000"> <g transform="translate(56.000000, 160.000000)"> <path d="M370.39,6519 L369,6520.406 L377.261,6529.013 L376.38,6529.931 L376.385,6529.926 L369.045,6537.573 L370.414,6539 C372.443,6536.887 378.107,6530.986 380,6529.013 C378.594,6527.547 379.965,6528.976 370.39,6519"> </path> </g> </g> </g> </svg>`;

  $('[data-doslick]').each(function() {
    const $self = $(this);
    let opts = $self.data('doslick');
    $self.slick({ 
      ...opts, 
      prevArrow: `<span class="__slide-nav __slide-prev">${ prevIcon }</span>`,
      nextArrow: `<span class="__slide-nav __slide-next">${ nextIcon }</span>`, 
    })
  })
}

applySlickSlider();