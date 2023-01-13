export default function mobileMenu() {
    const mobileElems = document.querySelectorAll('.site-header__mobile');
    if(!mobileElems) return;

    $('.site-header__mobile-search-toggle').on('click', function () {
        $(this).toggleClass('open');
        $('.site-header__search-tools').slideToggle(250); 
    });
    
    $('.site-header__mobile-menu-toggle').on('click', function () {
        $('.site-header__mobile').addClass('open');
    });

    $('.site-mobile__close').on('click', function () {
        $('.site-header__mobile').removeClass('open');
    });

    $('.menu-mobile-toggle-btn').on('click', function () {
        $(this).toggleClass('open');
        $( this ).parent().children('ul').slideToggle(250); 
    });

  }
  
  mobileMenu();