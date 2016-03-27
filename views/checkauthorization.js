 function checkauthorization(forceLogin){

	var thishref = document.location.href
	var PageId = thishref.substr(thishref.lastIndexOf("/")+1,thishref.length-thishref.lastIndexOf("/"));
	
	webix.ajax().post(urlstr+"/Index/checkAuth",{PageId:PageId,DSSuffix:_DSSuffix},function(response){
		if(!response)
		{
			//window.location.href= "http://"+window.location.host+"/WebixPOA/index.html#!/app/info";
		}
	});
	
   var _UserCode = webix.storage.local.get('_UserCode');
   var _LastLoginTime = webix.storage.local.get('_LastLoginTime');
   var dayGap = (new Date()-new Date(_LastLoginTime))/1000/3600/24;
    

   if(forceLogin || !_UserCode || dayGap>7)
  {   
		window.location.href= "http://"+window.location.host+"/WebixSCM/login.html";
//		window.location.href= homestr+"/login.html";
  };

};