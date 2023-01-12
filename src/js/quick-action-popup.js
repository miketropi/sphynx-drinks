const __getContent = async (url) => {
  return await fetch(url)
    .then(res => res.text())
    .then(html => {
      return html
    })
}

export default function QuickActionPopup() {

  const popupInit = () => {
    const $__wrap = $(`<div class="__popup-quick-action-product">
      <div class="__popup-quick-action-product__inner">
        <!-- CONTENT -->
      </div>
    </div>`); 

    $('body').append($__wrap);

    const clear = () => {
      $__wrap.find('.__popup-quick-action-product__inner').empty();
    }

    const push = (__html) => {
      $__wrap.find('.__popup-quick-action-product__inner').html(__html);
    }

    const display = (show) => {
      if(show == true) {
        $('body').addClass('__quick-popup-show')
      } else {
        $('body').removeClass('__quick-popup-show')
      }
    }

    return { push, clear, display }
  }

  const popupObj = popupInit();

  $(window).on('openQuickActionPopup', async (ev, productModalUrl) => {
    // console.log(productModalUrl);
    const contentHtml = await __getContent(productModalUrl);
    const popupHtml = $(contentHtml).find('#quick-action-product');
    
    popupObj.clear();
    popupObj.push(popupHtml);
    popupObj.display(true);
  })

  $('body').on('click', '.quick-action-popup', function(e) {
    e.preventDefault();
    const url = $(this).data('product-url');
    
    $(window).trigger('openQuickActionPopup', [url])
  })
}

QuickActionPopup();