FROM ubuntu
MAINTAINER Elias Goss <elias.goss@gmail.com>

ENV WDIR /home

RUN apt-get update -q && apt-get install -y -q \
    sudo \
    mc \
    curl \
    wget 

ADD .bash_profile /root/.bash_profile
ADD micro /bin
RUN . ~/.bash_profile

WORKDIR $WDIR
ADD server.js .

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get install -y \ 
    nodejs
RUN npm cache clean -f
RUN npm install -g \
    npm \
    n \
    jshint \
    prettyjson \
    nodemon

EXPOSE 80

CMD ["nodemon", "server.js"]