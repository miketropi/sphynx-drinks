export default function faqToggle() {
    const faqElems = document.querySelectorAll('.faq__item');
    if(!faqElems) return;

    $('.faq__question').on('click', function () {
        if($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().find('.faq__answer').slideUp();
        } else {
            $(this).parents('.faq__list').find('.faq__item').each(function(){
                $(this).removeClass('open');
                $(this).find('.faq__answer').slideUp();
            });
            $(this).parent().addClass('open');
            $(this).parent().find('.faq__answer').slideDown();
        }
        
    });
    
  }
  
  faqToggle();