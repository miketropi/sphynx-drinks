export default function ratingRendering() {
  const ratingElems = document.querySelectorAll('.__rating-elem');
  if(!ratingElems) return;

  const startRenderHtml = (number, max) => {
    let _temp = '';
    for(let i = 1; i <= max; i++) {
      let startColor = '#FEFEFE';

      if(i <= number) {
        startColor = '#FFC85E';
      }

      _temp += `<span>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.60602 0.134766L8.55555 4.08429L12.9152 4.72152L9.7606 7.79407L10.5051 12.1348L6.60602 10.0843L2.70697 12.1348L3.45145 7.79407L0.296875 4.72152L4.6565 4.08429L6.60602 0.134766Z" fill="${ startColor }"/>
      </svg>
      </span>`;
    }

    return `<div class="__start">${ _temp }</div>`;
  }

  [...ratingElems].forEach(el => {
    const { value, count, max } = el.dataset;
    if(!value) return;

    let text = count <= 1 ? 'review' : 'reviews';
    
    const __html = startRenderHtml(value, max);
    el.innerHTML = `<div class="__review">
      ${ __html } 
      <span class="__count">(${ count } ${ text })</span>
    </div>`;
  })
}

ratingRendering();