FROM ubuntu
MAINTAINER Elias Goss <elias.goss@gmail.com>

ENV WDIR /home

RUN apt-get update -q && apt-get install -y -q \
    sudo \
    mc \
    curl \
    wget 

ADD run.sh /usr/local/bin/run.sh
ADD .bash_profile /root/.bash_profile
ADD micro /bin
RUN chmod +x /usr/local/bin/run.sh
RUN . ~/.bash_profile

WORKDIR $WDIR
ADD express-template ./express-template/

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get install -y \ 
    nodejs
RUN npm cache clean -f
RUN npm i -g \
    
    jshint \
    prettyjson \
    nodemon

EXPOSE 80

WORKDIR $WDIR/express-template
RUN npm i


CMD ["/usr/local/bin/run.sh"]