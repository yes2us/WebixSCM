define(
[
"data/stockobject"
],
function(stockobject){

    var regioncode = null;
    var startdate,enddate;
    var ordertype="Rep";
    
    function loadData(_postData){
    		_postData.OrderType = ordertype;
    		_postData.WHType="门店";

		$$("dt_repretorder").clearAll();
		$$("dt_repretorderitem").clearAll();
		var prezRepRetData = stockobject.getRepRetOrder(_postData);
		$$("dt_repretorder").parse(prezRepRetData);
    };
    
	return {
		getOrderType:function(){return ordertype;},
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"查询条件",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								 { view:"segmented", value:"Rep", label:"",inputWidth:_ListWidth-10, 
										options:[
											{ id:"Rep", value:"补货单"},
											{ id:"Ret", value:"退货单"}],
											click:function(){
												ordertype = this.getValue();
											var postData = 
											{
												RegionCode:regioncode,
											}
											
					                  	if(startdate) postData.StartDate = startdate;
					                  	if(enddate) postData.EndDate = enddate;
					                	     loadData(postData);
									 }
									},
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
            }
			]
			}
		}
	}
});