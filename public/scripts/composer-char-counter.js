$(document).ready(function() {
  $(".new-tweet").on('input', 'textarea', function(e) {

    //
    $text = $(this).val();
    $chars = 140 - $text.length;

    //bad practice will look into it
    $count = $(this).closest('form').find('.counter')
    $count.text($chars);
    
    if ($chars < 0) {
      $count.css('color','red');
    } else {
      $count.css('color','black');
    }

  });
});
