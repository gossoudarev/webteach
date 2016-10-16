it's for phantomjs docker testing :-)

docker pull yfix/phantomjs

  (now look at: docker exec -it phan sh)

docker run -itd   --name phan   yfix/phantomjs

  (now look at: docker ps)

  (and then later: docker ps -a)

docker exec -it phan bash

  (now we're inside it, could do su, apt-get updatem apt-get install mc and so on)



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