const src = 'Secret1',
      key = 31;

let coded = (src,key) => src.split('')
    .map(x=>x.charCodeAt(0))
    .map(x=>x.toString(key))
    .join('=');
    
console.log(coded(src, key));    

