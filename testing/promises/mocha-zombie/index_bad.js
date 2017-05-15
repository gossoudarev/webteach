/*jshint esversion: 6 */
const TEMPLATEJSON = './kramer_tests_set_client',
	  Zombie = require('zombie'),
      page  = new  Zombie(),
      jsncnt = (!process.argv[2]) ?  require(TEMPLATEJSON)  : require(`./${process.argv[2]}`),
      goURL = (url, what)=> new Promise(resolve=>page.visit(url, resolve.bind(null, {el:'#button',what}))),
      doClick = options=> new Promise(resolve=>page.pressButton(options.el, resolve.bind(null, options.what ))),
      final = exp=>({exp, got: JSON.parse(page.document.title)}) 
	  ;

    page.silent = true;
    jsncnt.data.forEach(async query=>{
  	  let res =  await  goURL(jsncnt.url+query.input, query.output).then(doClick).then( final );
  	  console.log(res.got);  	  
    });
    //doesn't work well - repeats the last result three times