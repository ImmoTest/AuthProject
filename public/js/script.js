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