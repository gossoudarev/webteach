Знаменитая история о взаимозависимости в экосистеме Node

https://meduza.io/feature/2016/03/28/kak-slomat-internet

https://api.left-pad.io/?str=Meduza&len=10&ch=a

https://gist.github.com/rauchg/5b032c2c2166e4e36713

Функция форматирует строку, дополняя её слева по необходимости копиями указанного символа до указанной длины.     

На момент 31.05.2017 04:03 код автора уже сильно изменился... Здесь зафиксировано легаси.

leftpad('f',8,'@') === '@@@@@@@f'

или

lines11('f',8,'@') === '@@@@@@@f'

==============


В кодакторе это часть встроенной Out-консоли


<script src="/j/out"></script>

Out.leftpad('f',8,'@') === '@@@@@@@f'     //  true

Out.log(   Out.leftpad('xx',8,'0')   );   //  000000xx

ИЛИ отдельный легаси-модуль

<script>(async()=>{   
          
      eval(await fetch('/g/leftpad').then(x=>x.text()));   
      
      Out.log(   API.leftpad('f',8,'@') );
  
})();</script>
