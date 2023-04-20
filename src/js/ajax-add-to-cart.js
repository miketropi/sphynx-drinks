import { addToCart, updateMiniCartUi } from './helpers';

const onSubmit_AddToCart = async function(ev) {
  ev.preventDefault();
  const $form = $(this);
  const quantity = $form.find('input#Quantity').val();
  const variant_id = $form.find('select#productSelect').val(); 

  $form
    .find('button#AddToCart')
    .css({
      pointerEvents: 'none',
      opacity: .4,
    })
    .html('Add To Cart...')

  const result = await addToCart(quantity, variant_id);
  $(window).trigger('__ajax_addtocart_completed', [result]);
  return false;
}

export default function ajaxAddToCart() {
  $('body').on('submit', 'form#AddToCartForm.__add-to-cart-ajax', onSubmit_AddToCart);

  const getLimitNumberStock = ($form, currentNumber) => {
    let variantSelected = $form.find('[data-inventory_quantity]:checked');

    if(variantSelected.length) {
      let limitNumber = parseInt(variantSelected.data('inventory_quantity'));
      if(currentNumber >= limitNumber) {
        return limitNumber;
      } else {
        return currentNumber;
      }
    } else {
      return currentNumber;
    } 
  }

  $('body').on('change', 'form#AddToCartForm input[name="quantity"]', function() {
    let currentValue = parseInt($(this).val());
    let qty = getLimitNumberStock($('form#AddToCartForm'), currentValue);

    var price = $('form#AddToCartForm').find('[data-variant_price]:checked').data("variant_price");
    var initialPrice = price.replace('$', '');
    let newPrice = initialPrice * qty;
    var el = $('form#AddToCartForm .current-price');
    el.html('$' + newPrice.toFixed(2));

    $(this).val(qty);
  })

  $('body').on('change', 'form#AddToCartForm [name="variant_price"]', function() {
    let qtyField = $('form#AddToCartForm').find('input[name="quantity"]');
    qtyField.val(1);
    qtyField.trigger('change');
  })
  
  /**
   * trigger event add to cart completed
   */
  $(window).on('__ajax_addtocart_completed', (ev, html) => {

    $('.__no-item-in-cart').removeClass('__no-item-in-cart');

    // close quick modal
    $(window).trigger('closeQuickActionPopup');

    // update mini cart
    updateMiniCartUi(html);

    // scroll on top
    // window.scrollTo({ top: 0, behavior: 'smooth' })

    $('body').addClass('__mini-cart-show');
    setTimeout(() => {
      $('body').removeClass('__mini-cart-show');
    }, 2000)
  })
}

ajaxAddToCart();