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
      <div class="__loading-ui">
        <div class="loading-overlay__spinner">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-spinner" fill="none" viewBox="0 0 66 66">
            <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
          </svg>
        </div>
      </div>
      <div class="__content-wrap">
        <span class="__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#F05123" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#F05123" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="__popup-quick-action-product__inner">
          <!-- CONTENT -->
        </div>
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

    const loading = (isLoading) => {
      if(isLoading == true) {
        $__wrap.addClass('__loading')
      } else {
        $__wrap.removeClass('__loading')
      }
    }

    $__wrap.on('click', '.__close', e => {
      e.preventDefault();
      display(false);
    });

    return { push, clear, display, loading }
  }

  const popupObj = popupInit();

  $(window).on('openQuickActionPopup', async (ev, productModalUrl) => {
    // console.log(productModalUrl);
    popupObj.display(true);
    popupObj.loading(true);

    const contentHtml = await __getContent(productModalUrl);
    const popupHtml = $(contentHtml).find('#quick-action-product');
    
    popupObj.loading(false);
    popupObj.clear();
    popupObj.push(popupHtml);
    
  })

  $(window).on('closeQuickActionPopup', () => {
    popupObj.display(false);
  })

  $('body').on('click', '.quick-action-popup', function(e) {
    e.preventDefault();
    const url = $(this).data('product-url');
    
    $(window).trigger('openQuickActionPopup', [url])
  })
}

QuickActionPopup();