define(
["data/billobject"],
function(billobject){

    var startdate,enddate;
    var plantype="补货";
    
    function loadData(){
   
    		$$("dt_dwhrepretorderitem").clearAll();
		$$("dt_dwhrepretorder").clearAll();
		$$("dt_dwhrepretorder").showOverlay("正在加载......");
		
		var _postData={};
		_postData.PlanType = plantype;
		if(plantype=='补货')  _postData.SrcPartyCode  ="T";
		if(plantype=='退货')  _postData.TrgPartyCode  ="T";

		if(startdate) _postData.StartDate = startdate;
		if(enddate) _postData.EndDate = enddate;
		$$("dt_dwhrepretorder").parse(billobject.getMovSKUPlan(_postData));
    };
    
	return {
		getPlanType:function(){return plantype;},
		$ui:{
			width:_ListWidth,
			type: "line",
			css: "highlighted_header header5",
			header:"查询条件",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								 { view:"segmented", value:"补货", label:"",inputWidth:_ListWidth-10, 
										options:[
											{ id:"补货", value:"补货"},
											{ id:"退货", value:"退货"}],
											click:function(){
												plantype = this.getValue();											
					                	    	 		loadData();
									 		}
									},					                
					                	{view:"datepicker", id:"startdate_input",label:"开始日期",
					                  on:{onChange:function(newdate,olddate){
					                  	startdate = newdate;
					                	     loadData();
					                  }
					                  }},
					             
					             	{view:"datepicker", id:"enddate_input",label:"结束日期",
					                  on:{onChange:function(newdate,olddate){
											enddate = newdate;
						                  	loadData();
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