export async function __requestUpdateCart(data) {
  return await $.post(routes.cart_change_url, {
    sections_url: window.location.pathname,
    ...data
  });
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

const updateQty = () => {
  const $miniCart = $('.mini-cart');

  $miniCart.on('change', 'input[name="quantity[]"]', async function() {
    const number = this.value;
    const id = this.dataset.id;
    if(number <= 0) { number = 1; }

    $('.mini-cart').addClass('__loading');

    const __html = await __requestUpdateCart({ quantity: number, id: id });
    updateMiniCartUi(__html);

    $('.mini-cart').removeClass('__loading');
  })

  $miniCart.on('click', '.__decrease-qty', function(e) {
    e.preventDefault();
    const $inputQty = $(this).parent().find('input[name="quantity[]"]');
    let value = parseInt($inputQty.val());
    let newValue = value - 1;
    
    if(newValue <= 0) {
      newValue = 1;
    }

    $inputQty.val(newValue).trigger('change');
  })

  $miniCart.on('click', '.__increase-qty', function(e) {
    e.preventDefault();
    const $inputQty = $(this).parent().find('input[name="quantity[]"]');
    let value = parseInt($inputQty.val());
    let newValue = value + 1;
    
    if(newValue <= 0) {
      newValue = 1;
    }

    $inputQty.val(newValue).trigger('change');
  })
}

export default function MiniCart() {
  updateQty();
}

MiniCart(); 