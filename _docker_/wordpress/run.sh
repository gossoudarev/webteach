#!/bin/bash

#preventing error with apache PID
if [  -f "$P" ]
then
    rm $P
fi

exec apache2ctl -DFOREGROUND