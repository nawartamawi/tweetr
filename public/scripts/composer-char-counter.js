$(function (){
  const $text = $('[data-max-length]');
  const maxChar = $text.data('max-length');

  $text.on('keyup', function () {
    const $counter = $(this).siblings('.counter');
    const counter = maxChar - this.value.length;
    $counter.text(counter);
    $counter[counter < 0 ? 'addClass' : 'removeClass']('red');
  });
});
