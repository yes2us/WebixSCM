define(
["data/storeobject",
"data/stockobject"
],
function(storeobject,stockobject){
	var _UserCode = webix.storage.local.get('_UserCode');
    var regioncode = null;
    var startdate,enddate;
    
    function loadData(_postData){
    		_postData.Type = "Ret";
    	  	var prezRepRetData = stockobject.getRepRetOrder(_postData);
		$$("datatable_retorder").clearAll();
		$$("datatable_retorder").parse(prezRepRetData);
    };
    
	return {
		$ui:{
			width:260,
			type: "clean",
			css: "highlighted_header header5",
			header:"查询条件",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "combo",label: "选择区域",//css:"fltr",
									options:urlstr+'/WBPartyMng/getRegionList',
									on:{
										onChange:function(newregioncode, oldregioncode){
											if(newregioncode!=oldregioncode)
											{
												regioncode = newregioncode;
											}
											var postData = 
											{
												RegionCode:regioncode,
											}
											
					                  	if(startdate) postData.StartDate = startdate;
					                  	if(enddate) postData.EndDate = enddate;
					                	     loadData(postData);
										}
									}},
					                
					                	{view:"datepicker", id:"startdate_input",label:"开始日期",
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
					      
					                  	var postData={RegionCode:regioncode};
					                  	if(startdate) postData.StartDate = startdate;
					                  	if(enddate) postData.EndDate = enddate;
					                	     loadData(postData);
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
											
											var postData={RegionCode:regioncode};
						                  	if(startdate) postData.StartDate = startdate;
						                  	if(enddate) postData.EndDate = enddate;
						                  	loadData(postData);
					                  }
					                  }},
					                  
									]}
                ]
            },
			]
			}
		}
	}
});