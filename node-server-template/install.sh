mkdir node-server-template
cd node-server-template
mkdir public
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/index.js
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/server.js
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/package.json
cd public
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/node-server-template/public/page.html

echo ===================
echo cd node-server-template
echo npm install
echo npm start  or  PORT=XXXX npm start   or  PORT=YYYY pm2 start index.js --watch  or...
