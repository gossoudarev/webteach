var Cur = (function(){
   function inner(){
      function formTime(){
          var today = new Date();
          var MM = today.getMinutes();
          var SS = today.getSeconds();
          var HH = today.getHours();  
          if(MM<10)  MM='0'+MM;  if(SS<10)  SS='0'+SS;   
          return   HH+':'+MM+':'+SS;        
      }   
      function formDate(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear(); 
          if(dd<10)  dd='0'+dd;  if(mm<10)  mm='0'+mm;    
          return     dd+'.'+mm+'.'+yyyy;       
      }                                 
      this.date = formDate;
      this.time = formTime;  
    }
  return new inner;
})(); 

exports.Cur = Cur;
