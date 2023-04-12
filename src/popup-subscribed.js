import axios from "axios";
const ENDPOINT = 'https://api.sendinblue.com/v3';
const API_KEY = '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';
const CSS_INLINE = `.s-modal { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(1, 1, 1, .3); z-index: 999; font-family: Arial, Helvetica, sans-serif; color: black; letter-spacing: 0; } .s-modal__close { position: absolute; right: -18px; top: -18px; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; background-color: #f05124; color: white; border-radius: 30px; font-weight: bold; font-size: 12px; border: solid 2px white; box-shadow: 0 0 10px 2px rgba(1, 1, 1, .1); cursor: pointer; transition: 0.3s ease; -webkit-transition: 0.3s ease; } .s-modal__close:hover { background-color: black; } .s-modal__inner { position: relative; max-width: calc(100% - 40px); width: 550px; padding: 2em; background: white; border-radius: 8px; margin: 15vh auto; box-shadow: 0 0 8px 2px rgba(1, 1, 1, .1); } form.thanks-subscribe-form:after { content: ""; clear: both; display: block; } form.thanks-subscribe-form input[type=email], form.thanks-subscribe-form input[type=text] { width: 100%; padding: 12px; border: solid 1px black; border-radius: 3px; margin-bottom: 0.3em; font-size: 1em; } form.thanks-subscribe-form label { display: inline-block; width: 100%; margin-bottom: 0.5em; font-weight: bold; } form.thanks-subscribe-form button[type=submit] { float: right; margin-top: 1em; }`;

class SibApiV3 {

  constructor(API_KEY) {
    this.API_KEY = API_KEY;
  }

  __header() {
    return {
      'api-key': this.API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  async addContact(email, fname, listIds) {
    return await axios({
      method: 'POST',
      url: `${ ENDPOINT }/contacts`,
      headers: this.__header(),
      data: JSON.stringify({
        email,
        "attributes": {
          "FIRSTNAME": fname
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

    const modal = document.createElement('div');
    modal.className = 's-modal';
    modal.innerHTML = `<div class="s-modal__inner">
      <a class="s-modal__close">✕</a>
      <p>🎉 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
      <form id="THANKS_SUBSCRIBE_FORM" class="thanks-subscribe-form" method="POST">
        <label>
          Your friend's email* 
          <input type="email" name="f-email" placeholder="Enter email" required />
        </label>
        <label>
          Your friend's name* 
          <input type="text" name="f-name" placeholder="Enter name" required />
        </label>
        <button type="submit" class="button">Submit</button> 
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

    form.querySelector('button[type="submit"]').innerHTML = 'Submitting...';
    form.style.opacity = '.6';
    form.style.pointerEvents = 'none';

    const S = new SibApiV3(API_KEY);
    try {
      const result = await S.addContact(email, name, [7]); // [7] list ids number of sendinblue
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    
    const thankMessage = document.createElement('p');
    thankMessage.innerHTML = '<p>Successfully, thank you so much!</p>';
    form.after(thankMessage);
    form.remove();

    setTimeout(() => {
      Smodal.remove();
    }, 5000)
  })
}

PopupSubscribed();