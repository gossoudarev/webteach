`npm i && npm run pretest && npm test`
```JavaScript
import Timer from 'timerpromise';

(new Timer(5)).start
.then(
 ()=> {
        console.log('1) 5 sec');
        return (new Timer(2)).start
      })
.then(
 ()=> {
        console.log('2) 2 sec');
      })
```      
