const QtyUpdateUI = () => {
  $('body').on('click', '.__product-qty .__qty-update', function() {
    const $self = $(this);
    const $qtyInput = $self.parent().find('input[name=quantity]');
    let currentNumber = parseInt($qtyInput.val());

    if($self.hasClass('__qty-decrease')) {
      currentNumber = currentNumber - 1;
    }

    if($self.hasClass('__qty-increase')) {
      currentNumber = currentNumber + 1;
    }

    if(currentNumber <= 1) {
      currentNumber = 1;
    }

    $qtyInput.val(currentNumber);
  })
}

const updateVariant = () => {
  const $cartForm = $('form#AddToCartForm');

  $('body').on('change', 'select#productSelect', function() {
    const $select = $(this);
    const price = $select.find(`option[value="${ this.value }"]`).data('price');

    $cartForm.find('button#AddToCart .current-price').html(price);
  })
}

const ProductGalleryHandle = () => {
  const $GalleryContainer = $('.__product-gallery');
  const $PreviewImageTag = $GalleryContainer.find('.main-product__image img');

  $GalleryContainer.find('.main-product__gallery-thumb-item').on('click', function(e) {
    e.preventDefault();
    const imageUrl = $(this).data('imageurl');
    $PreviewImageTag.attr('src', imageUrl);

    $(this)
      .addClass('__active')
      .siblings()
      .removeClass('__active')
  })
}

export default function MainProduct() {
  QtyUpdateUI();
  updateVariant();
  ProductGalleryHandle();
}

MainProduct();