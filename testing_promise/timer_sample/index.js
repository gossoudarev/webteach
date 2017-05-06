/*jshint esversion: 6 */
import Timer from './Timer';
new Timer(1).start.then( x=>console.log( `Result: ${x} should be 1000` ) );