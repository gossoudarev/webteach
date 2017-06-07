/*jshint esversion: 6 */
import util from 'util';
const t = util.promisify(setTimeout);
t(5000)
  .then(()=>console.log('5 sec DONE!'));