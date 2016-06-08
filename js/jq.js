
$(document).ready(function() {
    $('#searchButton').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#margin").offset().top - 30
        }, 500);
    });

    $(document).ready(function(){
      $('#title').focus();
        $('#text').autosize();
    });

//     $('#searchInput').keyup(function(e){
//        if(e.keyCode == 8){
//            // user has pressed backspace
// alert("lol");       }
//        if(e.keyCode == 32){
//            // user has pressed space
//            array.push('');
//        }
//     });
});
