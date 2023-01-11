const updateQty = () => {
  const $miniCart = $('.mini-cart');

  $miniCart.on('change', 'input[name="quantity[]"]', async function() {
    const number = this.value;
    const id = this.dataset.id;
    const result = await $.post('/cart/change.js', { quantity: number, id: id });
    console.log(result);
  })
}

export default function MiniCart() {
  updateQty();
}

MiniCart(); 