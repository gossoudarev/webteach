| STEPS		| STATUS
| ------------- | ------
| 1.		| Download the archieve
| 2.		| Unzip
| 3.		| Run npm install
| 4.		| Specify the PORT as convenient in server.js
| 5.		| Run npm start
| 6.		| Goto localhost:PORT or c9 or your server

Also here: http://kodaktor.ru/express-template.zip

and curl 'http://kodaktor.ru/{express-template.zip}' -o  '#1'

ALSO 

wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/install.sh

bash install.sh

===============

now about PORT

you can run like  port=8765 npm start and it will override the PORT constant in server.js

or even 

port=8765 pm2 start index.js --watch

and you can put this into package.json start section

===============

don't forget about tests!

