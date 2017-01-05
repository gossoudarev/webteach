Архив здесь: http://kodaktor.ru/node-server-template.zip

... curl 'http://kodaktor.ru/{node-server-template.zip}' -o  '#1'

ИЛИ

wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/install.sh

bash install.sh создаст каталог, далее cd в этот каталог и ...

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

в развитие этого темплейта - примитивный файл-сервер

https://github.com/gossoudarev/webteach/tree/master/node-server-file


=======

если мы хотим видеть приложение изнутри докер-контейнера:

[docker pull yfix/phantomjs]

docker run -itd -p YYYY:4444   --name fileserver   yfix/phantomjs

wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-file/index.js


если внутри сервер будет работать на порту 4444

то снаружи будет виден как localhost:YYYY

если мы хотим устроить файл-сервер в локальную сеть,

то проще всего -p 80:4444

и тогда обращаясь просто по http://[ip]

соседи будут видеть наш файл-сервер.



см. также 

https://github.com/HowProgrammingWorks/NodeServer

