const x = '2l=38=36=3l=38=3n=1i',
      key = 31;

let decoded = (x,key) => x.split('=')
    .map(x=>parseInt(x,key))
    .map(x=>String.fromCharCode(x))
    .join('');
    
console.log(decoded(x, key));    

