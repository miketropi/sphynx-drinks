class CookieBanner extends HTMLElement {
  constructor() {
    super();

    this.classes = {
      activeClass: 'is-active',
      closingClass: 'is-closing'
    };
    this.banner = this.querySelector('.cookie-banner');

    if (this.dataset.testMode === 'true') {
      this.init();

      this.querySelectorAll('.button').forEach(
        (button) => button.addEventListener('click', this.close.bind(this))
      );
    }
    else {
      window.Shopify.loadFeatures([
        {
          name: 'consent-tracking-api',
          version: '0.1',
        }
      ],
      (error) => {
        if (error) {
          throw error;
        }
    
        this.beforeInit();
      });
    }

    if (Shopify.designMode) {
      document.addEventListener('shopify:section:load', (event) => filterShopifyEvent(event, this, () => this.open.bind(this)));
      document.addEventListener('shopify:section:select', (event) => filterShopifyEvent(event, this, this.open.bind(this)));
      document.addEventListener('shopify:section:deselect', (event) => filterShopifyEvent(event, this, this.close.bind(this)));
    }
  }

  beforeInit() {
    const userCanBeTracked = window.Shopify.customerPrivacy.userCanBeTracked();
    const userTrackingConsent = window.Shopify.customerPrivacy.getTrackingConsent();

    if (!window.location.pathname.match(/^(\/[a-z]{2}(-[A-Z]{2})?)?\/cart$/) && !userCanBeTracked && userTrackingConsent === 'no_interaction') {
      this.init();

      this.querySelectorAll('.button').forEach(
        (button) => button.addEventListener('click', this.onButtonClick.bind(this))
      );
    }
  }

  init() {
    if (Shopify && Shopify.designMode) {
      return;
    }

    setTimeout(function() {
      this.open();
    }.bind(this), parseInt(this.dataset.delay) * 1000);
  }

  open() {
    this.banner.classList.add(this.classes.activeClass);
  }

  close() {
    this.banner.classList.add(this.classes.closingClass);

    setTimeout(() => {
      this.banner.classList.remove(this.classes.activeClass);
      this.banner.classList.remove(this.classes.closingClass);
    }, 500);
  }

  onButtonClick(event) {
    event.preventDefault();
    this.close();

    if (event.target.name === 'accept') {
      window.Shopify.customerPrivacy.setTrackingConsent(true, this.noop);

      document.addEventListener('trackingConsentAccepted', () => {
        console.log('trackingConsentAccepted event fired');
      });
    }
    else {
      window.Shopify.customerPrivacy.setTrackingConsent(false, this.noop);
    }
  }

  noop() {
  }
}
customElements.define('cookie-banner', CookieBanner);
