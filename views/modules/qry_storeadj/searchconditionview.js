define(
["data/storeobject",
"data/stockobject"],
function(storeobject,stockobject){
	var _UserCode = webix.storage.local.get('_UserCode');
    var selectedStoreCode = null;
    var startdate,enddate;
    
    function loadData(_postData){
    	  	var prezAdjRecData = stockobject.getPartyAdjRec(_postData);
		$$("data_storeadjrecord").clearAll();
		$$("data_storeadjrecord").parse(prezAdjRecData);
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
												 $$("lt_stores").clearAll();
												 $$("lt_stores").refresh();
											}
											var postData = 
											{
												RegionCode:newregioncode,
												FieldStr:"PartyCode,PartyName"
											}
											$$("lt_stores").parse(storeobject.getStoreList(postData));
										}
									}},
									
					                {view:"text", id:"store_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                  	var value = this.getValue();
					                  	 	$$("lt_stores").filter(function(obj){
								            	return (obj.partycode && obj.partycode.indexOf(value)>=0) || (obj.partyname && obj.partyname.indexOf(value)>=0);
					                });
					                  }
					                  }},
					                
					                	{view:"datepicker", id:"startdate_input",label:"开始日期",
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
					      
					                  	var postData={WHCode:selectedStoreCode};
					                  	if(startdate) postData.StartDate = startdate;
					                  	if(enddate) postData.EndDate = enddate;
					                	     loadData(postData);
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
											
											var postData={WHCode:selectedStoreCode};
						                  	if(startdate) postData.StartDate = startdate;
						                  	if(enddate) postData.EndDate = enddate;
						                  	loadData(postData);
					                  }
					                  }},
					                  
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_stores",
					select: true,
				    template:"#partycode# - #partyname#",
				    
					on: {
						onAfterLoad: function(){this.select(1);},
						onSelectChange: function () {
                         var selItem = $$("lt_stores").getSelectedItem();
				       	if(selItem)
				       	{
				       		selectedStoreCode =selItem.partycode;
											
						var postData={WHCode:selectedStoreCode};
						if(startdate) postData.StartDate = startdate;
						if(enddate) postData.EndDate = enddate;
						loadData(postData);
				       	}
				     }
					}
				}
			]
			}
		}
	}
});