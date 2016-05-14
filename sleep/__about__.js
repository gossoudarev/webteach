sleeper

/var/www/lr/sleep

там находится index.php и  файлы index.js, server.js и time.js, 
выполняющих ту же функциональность

/etc/init/9999.js.conf
здесь находится файл конфига, запускающий форевер с index.js

# 9999.js.conf

description "kodaktor.ru:9999/sleep/?n=5"
start on started networking
stop on runlevel [016]
limit nofile 1000000 1000000
console log
script
  cd /var/www/lr/sleep
  exec forever index.js..
end script
respawn

----
 
user@kodaktor:/var/www/lr/sleep# sudo service 9999.js start
9999.js start/running, process 17307

user@kodaktor:/var/www/lr/sleep# ps aux | grep node
root     17307  0.0  8.1 138136 21336 ?        Ssl  Mar28   0:00 node /usr/local/bin/forever index.js
root     17316  0.0  5.6  93928 14780 ?        Sl   Mar28   0:00 /usr/local/bin/node /var/www/lr/sleep/index.js
root     20299  0.0  0.2   2260   784 pts/1    S+   01:33   0:00 grep --color=auto node

чтобы убить вручную:
kill -9 17307



// localhost:9999/sleep/?n=5 - сделать задержку в 5 секунд и послать
// JSON с двумя временными стампами


localhost:9999/sleep/?error
lr.kodaktor.ru/sleep/?error
 - смоделировать ошибку 404 не найдено
