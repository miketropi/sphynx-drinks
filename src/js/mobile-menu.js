export default function mobileMenu() {
    const mobileElems = document.querySelectorAll('.site-header__mobile');
    if(!mobileElems) return;

    $('.site-header__mobile-toggle').on('click', function () {
        $('.site-header__mobile').addClass('open');
    });

    $('.site-mobile__close').on('click', function () {
        $('.site-header__mobile').removeClass('open');
    });
    
  }
  
  mobileMenu();