Создайте сервер, который отдаёт либо md5, либо sha1 в зависимости от GET-параметра hash и либо text/plain либо application/json в зависимости от GET-параметра type. При этом src - это имя параметра для хранения того, от чего берётся хэш. 

Обратите внимание на способ указания порта

listen(process.env.PORT || PORT,()=>

		  	        console.log(`--> Port ${  process.env.PORT || PORT  } listening!`)
					
в среде c9 будет установлена переменная окружения PORT

при запуске получите   --> Port 8080 listening!			

если запускать локально, то 

  если npm start   или node index.js - будет использовано внутренне указанное 4444 в server.js
  
  иначе если PORT=7777 npm start  или  PORT=7777 node index.js   - будет взято это значение
  
 аналогично с pm2
 
    pm2 start index.js --watch
	
	или
	
	PORT=8765 pm2 start index.js --watch  

=======

в проекте express-template написано не в стиле c9 строчными буквами process.env.PORT

поэтому там уже port=7777 npm start  или  port=7777 node index.js

    или port=8765 pm2 start index.js --watch

=======

Клиент:		

http://kodaktor.ru/jquery_c60fd
