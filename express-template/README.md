| STEPS	 	| STATUS
| ------------- | ------
| 1.		| Download the archieve
| 2.		| Unzip, may be run  sudo npm i nodemon -g
| 3.		| Run npm i
| 4.		| Specify the PORT as convenient in server.js
| 5.		| Run npm start
| 6.		| Goto localhost:PORT or c9 or your server

wget kodaktor.ru/et && unzip et && rm et && npm i

OR

curl kodaktor.ru/{et} -o '#1' && unzip et && rm et && npm i

ALSO 

wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/i.sh && bash i.sh && rm i.sh && npm i

===============

now about PORT

you can run like  

| nodemon	 	    | pm2
| ------------------- | ------
| npm start  	     | 
| port=4321 npm start | port=4321 pm2 start index.js --watch


So you can override the PORT constant in server.js

===============

see errors part and small.pdf

===============

don't forget about tests!

==============

see routing

==============

https://hub.docker.com/r/igossoudarev/express-template/

the image and its instruction
