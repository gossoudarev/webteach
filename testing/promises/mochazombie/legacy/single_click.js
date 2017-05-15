//вызов данного скрипта: phantom single_click.js

var  page = require('webpage').create();

//***************************************************************

function p(where, how) {
   var finalurl = where + '?' +  how; 
   page.open(finalurl, function(status) {
      if (status !== 'success') {
        console.log('Unable to access network');
      } else {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
           var r = page.evaluate(function() {
			   //the click happens synchronously
			   $("button").click();  // we can comment it out
               return $("button").html();
           });
           var result = "Called:   " + finalurl + "\nReceived: " + r;
           console.log(result + " <<");
           phantom.exit();
           
           
        });
      }
   });
}

p('http://kodaktor.ru/g/testing_kramer', 'a1=2&b1=-3&c1=-32&a2=-3&b2=2&c2=33');

