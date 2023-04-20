import axios from "axios";
const ENDPOINT = 'https://api.sendinblue.com/v3';
const API_KEY = window.__sendinblue_api_key;
const CAT_IDS = window.__cat_ids ? window.__cat_ids : [10];
const CSS_INLINE = `.s-modal { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(1, 1, 1, .3); z-index: 999; font-family: Montserrat, Arial, Helvetica, sans-serif; color: black; letter-spacing: 0; font-size: 1em; line-height: 1.5em; overflow: auto; } .s-modal p, .s-modal small { color: #8b8b8b; } .s-modal small { display: inline-block; text-align: center; font-size: 10px; line-height: normal; } .s-modal__close { position: absolute; right: 5px; top: 5px; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; background-color: white; color: #f05123; border-radius: 30px; font-weight: bold; font-size: 12px; box-shadow: 0 0 10px 2px rgba(1, 1, 1, .1); cursor: pointer; transition: 0.3s ease; -webkit-transition: 0.3s ease; } .s-modal__close:hover { background-color: black; } .s-modal__banner { border-radius: 8px 8px 0 0; width: 100%; } .s-modal__heading { text-align: center; padding: 1em; } .s-modal__heading h4 { font-family: 'Montserrat', Arial, Helvetica, sans-serif; margin: 0; font-weight: 900; font-size: 2em; } .s-modal__inner { position: relative; max-width: calc(100% - 40px); width: 600px; box-sizing: border-box; background: white; border-radius: 8px; margin: 10vh auto; box-shadow: 0 0 8px 2px rgba(1, 1, 1, .1); } .s-modal__message { padding: 1em; text-align: center; } form.thanks-subscribe-form { padding: 0 1em 1em; } form.thanks-subscribe-form:after { content: ""; clear: both; display: block; } form.thanks-subscribe-form input[type=email], form.thanks-subscribe-form input[type=text] { width: 100%; padding: 20px; border: none; border-radius: 3px; margin-bottom: 0.3em; margin-top: 0.3em; font-size: 1em; box-sizing: border-box; text-align: center; background-color: #f0f0f0; } form.thanks-subscribe-form label { display: inline-block; width: 100%; margin-bottom: 0.5em; font-weight: bold; } form.thanks-subscribe-form .__button { margin: 1em auto 0; background: #f05124; border: none; color: white; padding: 14px 26px; border-radius: 8px; font-size: 1em; cursor: pointer; transition: 0.3s ease; -webkit-transition: 0.3s ease; width: 200px; display: inherit; text-transform: uppercase; font-weight: 900; font-family: Montserrat, Arial, Helvetica, sans-serif; } form.thanks-subscribe-form .__button:hover { background: black; }`;

class SibApiV3 {

  constructor(API_KEY) {
    this.API_KEY = API_KEY;
  }

  __header() {
    return {
      'api-key': this.API_KEY,
      'content-type': 'application/json',
      'accept': 'application/json',
    }
  }

  async addContact(email, fname, listIds, cname) {
    return await axios({
      method: 'POST',
      url: `${ ENDPOINT }/contacts`,
      headers: this.__header(),
      data: JSON.stringify({
        email,
        "attributes": {
          "FIRSTNAME": fname,
          "CNAME": cname
        },
        listIds
      })
    }).then(response => {
      return response.data;
    });
  }
}

export default function PopupSubscribed() {

  const createModal = () => {

    const Style = document.createElement('style');
    Style.id = 'SMODAL';
    Style.textContent = CSS_INLINE;
    document.head.appendChild(Style);

    let smodalHeadingText = (window.__smodalHeadingText) ? window.__smodalHeadingText : 'GIFT A MATE';
    let smodalSubText = (window.__smodalSubText) ? window.__smodalSubText : 'Do you know a cool cat who deserves a gift on us? Give us their details and we’ll send them a free 6-pack from you… No catches!';

    const modal = document.createElement('div');
    modal.className = 's-modal';
    modal.innerHTML = `<div class="s-modal__inner">
      <a class="s-modal__close">✕</a>
      <img class="s-modal__banner" src="https://cdn.shopify.com/s/files/1/0651/2004/3236/files/Screenshot_2023-04-18_at_10.56.29_AM.png?v=1681790385" />
      <div class="s-modal__heading">
        <h4>${ smodalHeadingText }</h4>
        <p>${ smodalSubText }</p>
      </div>
      <form id="THANKS_SUBSCRIBE_FORM" class="thanks-subscribe-form" method="POST">
        <label>
          <input type="text" name="f-name" placeholder="Friend’s Name" required />
        </label>
        <label>
          <input type="email" name="f-email" placeholder="Friend’s Email Address" required />
        </label>
        <small>*We’ll email your nominated mate with a unique link to redeem their free 6-pack. The name and email captured here will be used for the purposes of this email only.</small>
        <button type="submit" class="__button">Submit</button> 
      </form>
    </div>`;

    return modal;
  }

  const Smodal = createModal();
  document.body.appendChild(Smodal);

  /**
   * click (x) remove modal
   */
  Smodal.querySelector('.s-modal__close').addEventListener('click', () => {
    Smodal.remove();
  })

  /**
   * enter [ESC] remove modal
   */
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      Smodal.remove();
    }
  };

  /** 
   * Submit form handle
   */
  Smodal.querySelector('form#THANKS_SUBSCRIBE_FORM').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    let email = form.querySelector('input[name="f-email"]').value;
    let name = form.querySelector('input[name="f-name"]').value;
    let cname = window.__customer_name;

    form.querySelector('button[type="submit"]').innerHTML = 'Submitting...';
    form.style.opacity = '.6';
    form.style.pointerEvents = 'none';

    const S = new SibApiV3(API_KEY);
    try {
      const result = await S.addContact(email, name, CAT_IDS, cname); // [7] list ids number of sendinblue
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    
    const thankMessage = document.createElement('p');
    thankMessage.innerHTML = '<div class="s-modal__message"><p>Successfully, thank you so much!</p></div>';
    form.after(thankMessage);
    form.remove();

    setTimeout(() => {
      Smodal.remove();
    }, 5000)
  })
}

window.addEventListener("DOMContentLoaded", () => {
  PopupSubscribed(); 
});
