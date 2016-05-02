pug-jade

часть общего механизма шаблонов

0. делаем npm install --save pug ("pug": "2.0.0-alpha6")
1. создаём в папке приложения папку views
2. помещаем в неё файл 404.pug
-------------------------------
html
  head
    title= title
  body
    h1= title
    p Not here yet...
      a(href='/') Homepage!
-------------------------------
3. //res.status(404).send('<h2>Not yet here, pardon!</h2>');
   res.status(404).render('404.pug', {title: '4eg0-4ego? Net takoy page poka!'});

