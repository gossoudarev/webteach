FROM ubuntu
MAINTAINER Elias Goss <elias.goss@gmail.com>

ENV WDIR /var/www/html
ENV P /run/apache2/apache2.pid

RUN apt-get update && apt-get install -y \
    mc \
    apache2 \
    libapache2-mod-php \
    curl \
    php \
    php-mysql  

ADD run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh


WORKDIR $WDIR
RUN curl https://wordpress.org/latest.zip -o w.zip && unzip w.zip && rm w.zip
RUN echo '<?php phpinfo(); ?>' > info.php

EXPOSE 80

CMD ["/usr/local/bin/run.sh"]