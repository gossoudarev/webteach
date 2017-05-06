module.exports = 
        class Timer{
            constructor (n=1) {
              this.secs = n*1000;
            }
            show(){
              return this.secs;
            }
            get start(){
              return new Promise(res=>{
                  setTimeout( res.bind(null, this.secs), this.secs );
              });
            }
		};