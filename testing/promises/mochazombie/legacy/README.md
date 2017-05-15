it's for phantomjs docker testing :-)

docker pull yfix/phantomjs

docker run -itd   --name phan   yfix/phantomjs

  (now look at: docker ps)

     (and then later: docker ps -a)

docker exec -it phan bash

  (now we're inside it, could do su, apt-get update apt-get install mc and so on)



wget https://raw.githubusercontent.com/gossoudarev/webteach/master/simple_testing/install.sh

bash install.sh it will make a directory

run the test; 
explain the last case failure

ALSO  
http://kodaktor.ru/g/testing


TASK  
modify http://kodaktor.ru/g/testing_kramer testing script  
to make it click the button and read its updated caption

You can run single_click to see how to deal with remote clicking

From PhantomJS we pass to Node to use async promised requests

For that we need Node7



root@d8d8c6bb4971:/app# nvm install v7.0.0

Downloading https://nodejs.org/dist/v7.0.0/node-v7.0.0-linux-x64.tar.xz...

######################################################################## 100.0%

Now using node v7.0.0 (npm v3.10.8)

root@d8d8c6bb4971:/app# node -v

v7.0.0



NEXT: https://github.com/gossoudarev/webteach/tree/master/promise-hell
