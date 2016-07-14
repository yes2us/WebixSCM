
		var isDebug = false;
		
		var _UserObject;

		var _UserName;
		var _BelongDeptCode;
		var _RawUserCode;
		var _DSSuffix;
		var _RowHeight = 20;
		var _HeaderRowHeight = 20;


		var _ToolBarHeight = 35;
		var _ListWidth=210;
		var _CWHCode;
		
		
		 var dayGap = (new Date()-new Date(_LastLoginTime))/1000/3600/24;
		 var _LastLoginTime = webix.storage.local.get('_LastLoginTime');
		
		 var _UserCode = webix.storage.local.get('_UserCode');
		 var _PWD = webix.storage.local.get('_PWD');


		   
    var urlstr = "http://"+window.location.host+"/TOCDistAdmin/index.php/Home";
	var homestr = document.location.href.substr(0,document.location.href.replace("http://",'').indexOf("/",document.location.href.replace("http://",'').indexOf("/",1)+1)+7);
	var localhost = "http://"+window.location.host;