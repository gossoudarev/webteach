//вызов данного скрипта: phantom testing55.js [json]
//если джейсон не указан, берется по умолчанию

var fs = require('fs');
var args = require('system').args;
var page = require('webpage').create();

var templatejson= "testing5.json";


//первый аргумент должен быть джейсоном
//если его нет, по умолчанию (см. верх)
if (!args[1]) {
  var json = templatejson;
    //можно еще предусмотреть, что если не указан джейсон, то смотреть имя_скрипта+on
    //var json = args[0] + "on";  //testing.js + "on" =  testing.json
    //а если уж и такого нет, то брать по умолчанию 
  } else {
  var json = args[1];
}

//***************************************************************


function p(where, how, what) {
   //where = basic testing url
   //how = inputs 1d array
   //what = outputs 1d array of json ojects needing to be stringified

   //изначально функция описана с сигнатурой из трех аргументов
   //если функция вызывается без четвертого аргумента, это значит, что она вызывается впервые
   //договоримся, что в массивах how-what минимум два члена, т.е. делается минимум два тестовых запроса
   if (arguments.length == 3) {
       var num = 0; //при первом вызове берется крайний левый входной тестирующий набор
   } else {
       var num = arguments[3]; //далее берется тот, который рекурсивно передан (*)
   }
   var finalurl = where + how[num]; //адрес для вызова: базовый плюс перебираемый входной набор
   page.open(finalurl, function(status) {
      if (status !== 'success') {
        console.log('Unable to access network');
      } else {
        var r = page.evaluate(function() {
            //var result = JSON.parse(document.title);
            return document.body.textContent;  // а не !!! return document.title;
        }); //its probably synchronous
        var result = "Called:   " + finalurl + "\nReceived: " + r + "\nExpected: " + JSON.stringify(what[num]);
        console.log(result + " <<");


        if (num == how.length-1) { //если только что поработали с последним из входных тестирующих наборов 
          phantom.exit();
        } else {
          p(where, how, what,   num+1); // (*) рекурсивная часть: вызов по второму разу уже с индексом
        }
      }
   });
}

var jsncnt = JSON.parse( fs.read(json)  );
//можно еще предусмотреть оверрайд урл-а из джейсона тем, который указан вторым аргументом

//вызываем функцию впервые с тремя аргументами
p(jsncnt.url, jsncnt.urlinputs, jsncnt.outputs);

