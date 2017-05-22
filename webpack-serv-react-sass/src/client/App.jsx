import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

class App extends React.Component{

 constructor(props) {
     super(props);
 
     this.state = {
       floatingLabelText: "Дата начала Вашей работы",
     };
   }
 calc(date){
 	 alert(date);
 }
 render() { 
     return (
       <MuiThemeProvider>
         <div className="ui">
           <DatePicker id="date" onChange={(n=null,date)=>this.calc(date)} 
		               floatingLabelText={this.state.floatingLabelText}
             />
         </div>
       </MuiThemeProvider>
     )
 }
};

export default App;

