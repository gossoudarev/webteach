based upon express-template

чтобы получить то, что здесь:


wget kodaktor.ru/express-template.zip

unzip

меняем в package.json команду start на "nodemon"

npm i

npm i -S socket.io
	


    http = require('http').Server(app),
    io = require('socket.io')(http);


    внизу где было app.listen теперь будет http.listen

далее см. lab.pdf
