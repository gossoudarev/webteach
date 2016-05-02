...
, path = require('path')
...

app.use(express.static(path.join(__dirname, 'public')));
vs
app.use(express.static(__dirname + '/public'))

второй вариант делает то же самое, но
"цивилизованнее", не вручную, а через устоявшийся функционал

