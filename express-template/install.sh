mkdir express-template
cd express-template
mkdir public
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/index.js
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/server.js
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/package.json
cd public
wget https://raw.githubusercontent.com/gossoudarev/webteach/master/express-template/public/page.html

echo ===================
echo cd express-template
echo npm install
echo npm start  or  port=XXXX npm start   or  port=YYYY pm2 start index.js --watch  or...