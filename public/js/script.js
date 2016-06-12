$(document).ready(function () {
   var elements = document.getElementsByTagName("INPUT");
   for (var i = 0; i < elements.length; i++) {
      elements[i].oninvalid = function (e) {
         e.target.setCustomValidity("");
         if (!e.target.validity.valid) {
            switch (e.srcElement.id) {
               case "email":
                  e.target.setCustomValidity("Email cannot be blank");
                  break;
               case "pwd":
                  e.target.setCustomValidity("Password cannot be blank");
                  break;
               case "phone":
                  e.target.setCustomValidity("Phone number cannot be blank");
                  break;
            }
         }
      };
      elements[i].oninput = function (e) {
         e.target.setCustomValidity("");
      };
   }
});

jQuery(function($){
   $("#phone").mask("(999) 999-9999");
});


$(document).ready(function(){
    $('a').click(function(e){
        e.preventDefault();
        $("#dynamic").load($(this).attr('href'));
    });
});
 

function checkLocalForm(form) {
    $("#result").html('');
    var action = form.attr('action');
    var method = form.attr('method');
    $.ajax({
      method: method,
      url: action,
      data: { email: form.find($("#email")).first().val(), password: form.find($("#pwd")).first().val() }
   }).done(function (data) {
       var result = data.result || false;
       error_text = '';
       if(result){
           window.location.replace("http://university.innopolis.ru/");
       } else {
           var error_text = data.error || "Unexpected error";
           $("#result").html(error_text);
       }
   });
}

$("#local").submit(function(e) {
    checkLocalForm($(this));
    e.preventDefault();
});
