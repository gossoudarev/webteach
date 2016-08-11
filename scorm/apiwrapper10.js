var myAPI=(function(){

		var _Debug = false;  
		var _NoError = 0;
		var _GeneralException = 101;
		var _GeneralInitializationFailure = 102;
		var _AlreadyInitialized = 103;
		var _ContentInstanceTerminated = 104;
		var _GeneralTerminationFailure = 111;
		var _TerminationBeforeInitialization = 112;
		var _TerminationAfterTermination = 113;
		var _ReceivedDataBeforeInitialization = 122;
		var _ReceivedDataAfterTermination = 123;
		var _StoreDataBeforeInitialization = 132;
		var _StoreDataAfterTermination = 133;
		var _CommitBeforeInitialization = 142;
		var _CommitAfterTermination = 143;
		var _GeneralArgumentError = 201;
		var _GeneralGetFailure = 301;
		var _GeneralSetFailure = 351;
		var _GeneralCommitFailure = 391;
		var _UndefinedDataModelElement = 401;
		var _UnimplementedDataModelElement = 402;
		var _DataModelElementValueNotInitialized = 403;
		var _DataModelElementIsReadOnly = 404;
		var _DataModelElementIsWriteOnly = 405;
		var _DataModelElementTypeMismatch = 406;
		var _DataModelElementValueOutOfRange = 407;
		var apiHandle = null;
		var API = null;
		var findAPITries = 0;		
		function doInitialize() {
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nInitialize was not successful.');
		      return 'false';
		   }
		   var result = api.Initialize('');		
		   if (result.toString() != 'true') {
		      var err = ErrorHandler();
		   }		
		   return result.toString();
		}		
		function doTerminate(){  
		   var api = getAPIHandle();
		   if (api == null){
		      console.error('Unable to locate the LMS API Implementation.\nTerminate was not successful.');
		      return 'false';
		   }
		   else {
		      // call the Terminate function that should be implemented by the API
				      var result = api.Terminate('');
		      if (result.toString() != 'true') {
		         var err = ErrorHandler();
		      }		
		   }		
		   return result.toString();
		}		
		function doGetValue(name){
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetValue was not successful.');
		      return '';
		   } else {
		      var value = api.GetValue(name);
		      var errCode = api.GetLastError().toString();
		      if (errCode != _NoError)      {
		         // an error was encountered so display the error description
		         var errDescription = api.GetErrorString(errCode);
		         console.error('GetValue('+name+') failed. \n'+ errDescription);
		         return '';
		      } else {
		         
		         return value.toString();
		      }
		   }
		}		
		function doSetValue(name, value){
		   var api = getAPIHandle();
		   if (api == null)   {
		      console.error('Unable to locate the LMS API Implementation.\nSetValue was not successful.');
		      return;
		   } else{
		      var result = api.SetValue(name, value);
		      if (result.toString() != 'true')      {
		         var err = ErrorHandler();
		      }
		   }		
		   return;
		}		
		function doCommit() {
		   var api = getAPIHandle();
		   if (api == null){
		      console.error('Unable to locate the LMS API Implementation.\nCommit was not successful.');
		      return 'false';
		   } else {
		      var result = api.Commit('');
		      if (result != 'true') {
		         var err = ErrorHandler();
		      }
		   }		
		   return result.toString();
		}		
		function doGetLastError() {
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetLastError was not successful.');
		      //since we cannot get the error code from the LMS, return a general error
		      return _GeneralError;
		   }		
		   return api.GetLastError().toString();
		}		
		function doGetErrorString(errorCode) {
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetErrorString was not successful.');
		   }		
		   return api.GetErrorString(errorCode).toString();
		}			
		function doGetDiagnostic(errorCode){
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetDiagnostic was not successful.');
		   }		
		   return api.GetDiagnostic(errorCode).toString();
		}		
		function LMSIsInitialized(){
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nLMSIsInitialized() failed.');
		      return false;
		   }    else {
		      var value = api.GetValue('cmi.core.student_name');
		      var errCode = api.GetLastError().toString();
		      if (errCode == _NotInitialized) {
		         return false;
		      }  else  {
		         return true;
		      }
		   }
		}		
		function ErrorHandler() {
		   var api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nCannot determine LMS error code.');
		      return;
		   }		
		   // check for errors caused by or from the LMS
		   var errCode = api.GetLastError().toString();
		   if (errCode != _NoError) {
		      // an error was encountered so display the error description
		      var errDescription = api.GetErrorString(errCode);		
		      if (_Debug == true)      {
		         errDescription += '\n';
		         errDescription += api.GetDiagnostic(null);
		         // by passing null to GetDiagnostic, we get any available diagnostics
		         // on the previous error.
		      }		
		      console.error(errDescription);
		   }		
		   return errCode;
		}		
		function getAPIHandle(){
		   if (apiHandle == null) {
		      apiHandle = getAPI();
		   }		
		   return apiHandle;
		}		
		function findAPI(win){
		   while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win)) {
		      findAPITries++;		      
		      if (findAPITries > 500)       {
		         console.error('Error finding API -- too deeply nested.');
		         return null;
		      }		      
		      win = win.parent;		
		   }
		   return win.API_1484_11;
		}
//*********************************************

	   var theAPI = findAPI(window);
	   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != 'undefined'))  {
	      theAPI = findAPI(window.opener);
	   } 
	   if (theAPI == null) {
	      console.error('Unable to find an API adapter');
	   }
	   theAPI.my = function(){var t = 'Goss'; return t};
	   return theAPI;
  
})();

 






 


