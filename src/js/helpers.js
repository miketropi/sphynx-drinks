
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
    error: function(XMLHttpRequest, textStatus) {
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
    if($(item.selector).length <= 0) return;
    $(item.selector).html($(html).find(item.selector).html());
  })
}

export { addToCart, updateMiniCartUi }