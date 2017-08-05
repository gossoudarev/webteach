import path from 'path';
const x = path.join(__dirname, './dist');
const y = path.resolve(__dirname, 'dist');
console.log(x);
console.log(y);
console.log(x===y);