var myAPI=(function(){

		const _Debug = false 
		    , _NoError = 0
		    , _GeneralException = 101
		    , _GeneralInitializationFailure = 102
		    , _AlreadyInitialized = 103
		    , _ContentInstanceTerminated = 104
		    , _GeneralTerminationFailure = 111
		    , _TerminationBeforeInitialization = 112
		    , _TerminationAfterTermination = 113
		    , _ReceivedDataBeforeInitialization = 122
		    , _ReceivedDataAfterTermination = 123
		    , _StoreDataBeforeInitialization = 132
		    , _StoreDataAfterTermination = 133
		    , _CommitBeforeInitialization = 142
		    , _CommitAfterTermination = 143
		    , _GeneralArgumentError = 201
		    , _GeneralGetFailure = 301
		    , _GeneralSetFailure = 351
		    , _GeneralCommitFailure = 391
		    , _UndefinedDataModelElement = 401
		    , _UnimplementedDataModelElement = 402
		    , _DataModelElementValueNotInitialized = 403
		    , _DataModelElementIsReadOnly = 404
		    , _DataModelElementIsWriteOnly = 405
		    , _DataModelElementTypeMismatch = 406
		    , _DataModelElementValueOutOfRange = 407
		    , apiHandle = null
		    , API = null
		;
		let findAPITries = 0
		;		
		function doInitialize() {
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nInitialize was not successful.');
		      return 'false';
		   }
		   let result = api.Initialize('');		
		   if (result.toString() != 'true') {
		      let err = ErrorHandler();
		   }		
		   return result.toString();
		}		
		function doTerminate(){  
		   let api = getAPIHandle();
		   if (api == null){
		      console.error('Unable to locate the LMS API Implementation.\nTerminate was not successful.');
		      return 'false';
		   }
		   else {
		      // call the Terminate function that should be implemented by the API
			  let result = api.Terminate('');
		      if (result.toString() != 'true') {
		         let err = ErrorHandler();
		      }		
		   }		
		   return result.toString();
		}		
		function doGetValue(name){
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetValue was not successful.');
		      return '';
		   } else {
		      let value = api.GetValue(name)
		        , errCode = api.GetLastError().toString();
		      if (errCode != _NoError)      {
		         // an error was encountered so display the error description
		         let errDescription = api.GetErrorString(errCode);
		         console.error('GetValue('+name+') failed. \n'+ errDescription);
		         return '';
		      } else {  
		         return value.toString();
		      }
		   }
		}		
		function doSetValue(name, value){
		   let api = getAPIHandle();
		   if (api == null)   {
		      console.error('Unable to locate the LMS API Implementation.\nSetValue was not successful.');
		      return;
		   } else{
		      let result = api.SetValue(name, value);
		      if (result.toString() != 'true')      {
		         let err = ErrorHandler();
		      }
		   }		
		   return;
		}		
		function doCommit() {
		   let api = getAPIHandle();
		   if (api == null){
		      console.error('Unable to locate the LMS API Implementation.\nCommit was not successful.');
		      return 'false';
		   } else {
		      let result = api.Commit('');
		      if (result != 'true') {
		         let err = ErrorHandler();
		      }
		   }		
		   return result.toString();
		}		
		function doGetLastError() {
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetLastError was not successful.');
		      //since we cannot get the error code from the LMS, return a general error
		      return _GeneralError;
		   }		
		   return api.GetLastError().toString();
		}		
		function doGetErrorString(errorCode) {
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetErrorString was not successful.');
		   }		
		   return api.GetErrorString(errorCode).toString();
		}			
		function doGetDiagnostic(errorCode){
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nGetDiagnostic was not successful.');
		   }		
		   return api.GetDiagnostic(errorCode).toString();
		}		
		function LMSIsInitialized(){
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nLMSIsInitialized() failed.');
		      return false;
		   }    else {
		      let value = api.GetValue('cmi.core.student_name')
		        , errCode = api.GetLastError().toString();
		      if (errCode == _NotInitialized) {
		         return false;
		      }  else  {
		         return true;
		      }
		   }
		}		
		function ErrorHandler() {
		   let api = getAPIHandle();
		   if (api == null) {
		      console.error('Unable to locate the LMS API Implementation.\nCannot determine LMS error code.');
		      return;
		   }		
		   // check for errors caused by or from the LMS
		   let errCode = api.GetLastError().toString();
		   if (errCode != _NoError) {
		      // an error was encountered so display the error description
		      let errDescription = api.GetErrorString(errCode);		
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

	   let theAPI = findAPI(window);
	   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != 'undefined'))  {
	      theAPI = findAPI(window.opener);
	   } 
	   if (theAPI == null) {
	      console.error('Unable to find an API adapter');
	   }
	   theAPI.my = function(){let t = 'Goss'; return t};
	   return theAPI;
  
})();

 






 


