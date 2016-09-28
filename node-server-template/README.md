wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/install.sh

bash install.sh it will make a directory

uses 4444 for default but  

port=9876 npm start

then localhost:9876

(will say 4444 listening but run on 9876)

BETTER

port=8765 pm2 start index.js --watch
