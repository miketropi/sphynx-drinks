
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

    // if (filterItem.indexOf("Product type") != -1) {
    //   $(this).find('.facets__selected').text('Type')
    // }

  });

}

customFilterProduct();