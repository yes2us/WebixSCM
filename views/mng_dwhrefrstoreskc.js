define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_dwhrefr/dwhRefrListView",
	"views/modules/mng_dwhrefr/dwhRefrByStoreView",
	"views/modules/mng_dwhrefr/dwhRefrPlanView"
], function(
	stockobject,
	billobject,
	dwhRefrListView,
	dwhRefrByStoreView,
	dwhRefrPlanView
){

checkauthorization(false);

var layout = {
				type: "line",
				cols:[
					dwhRefrListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "dwhRefrByStoreView", value: "按店换款"},
									{id: "dwhRefrPlanView", value: "换款计划"}
								]
							},
							{
								cells:[
								    dwhRefrByStoreView,
									dwhRefrPlanView
								]
							}
						]
			}
	]
};


return {
	$ui:layout,
	$oninit:function(){
		
		$$("lt_refrstores").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var storecode = this.getItem(id).partycode;
			var regioncode = dwhRefrListView.getRegionCode();
				 dwhRefrByStoreView.setParties(regioncode,storecode);

			//显示门店的款色
			$$("dt_dwhrefrstoreskc").clearAll();
			$$("dt_dwhrefrstoreskc").showOverlay("正在加载......");
//			$$("dt_dwhrefrstoreskc").parse(stockobject.getWHSKCInfo({WHCode:storecode}));
			//载入此门店的调出计划：未处理的
			$$("dt_refrplan_outskc").clearAll();
//			$$("dt_refrplan_outskc").parse(billobject.getMovSKCPlan({PlanType:"人工换款",DealState:"未处理",SrcPartyCode:storecode}));		

			stockobject.getWHSKCInfo({WHCode:storecode}).then(function(response){
				$$("dt_dwhrefrstoreskc").parse(response.json());
				return billobject.getMovSKCPlanItem({PlanType:"人工换款",DealState:"未处理",SrcPartyCode:storecode});
			}).then(function(reponse){
				$$("dt_refrplan_outskc").parse(reponse.json());
				$$("dt_refrplan_outskc").eachRow(function(rowid){
					var row = this.getItem(rowid);
					var matchrow = $$("dt_dwhrefrstoreskc").find(function(obj){
						return obj.skccode == row.skccode;
					},true);
					if(matchrow){
						matchrow.check = true;
					};
				});
			});
			
			$$("dt_dwhStoreNewSKC").clearAll();
			$$("dt_dwhStoreNewSKC").showOverlay("正在加载......");
//			$$("dt_dwhStoreNewSKC").parse(presWHSKCInfoData);
			//载入此门店的调出计划：未处理的
			$$("dt_refrplan_inskc").clearAll();
//			$$("dt_refrplan_inskc").parse(billobject.getMovSKCPlanItem({PlanType:"人工换款",DealState:"未处理",TrgPartyCode:storecode}));
			 stockobject.getWHSKCInfoNewSKC({WHCode:storecode,ParentCode:regioncode}).then(function(response){
			 	$$("dt_dwhStoreNewSKC").parse(response.json());
			 	return billobject.getMovSKCPlanItem({PlanType:"人工换款",DealState:"未处理",TrgPartyCode:storecode});
			 }).then(function(response){
			 	 $$("dt_refrplan_inskc").parse(response.json());
			 	 $$("dt_refrplan_inskc").eachRow(function(rowid){
					var row = this.getItem(rowid);
					var matchrow = $$("dt_dwhStoreNewSKC").find(function(obj){
						return obj.skccode == row.skccode;
					},true);
					if(matchrow){
						matchrow.check = true;
					};
				});
			 });
			 		   
			 //显示换款计划
			 dwhRefrPlanView.setParentCode(regioncode);
			$$("dt_dwhRefrPlan").clearAll();
			$$("dt_dwhRefrPlan").showOverlay("正在加载......");
			$$("dt_dwhRefrPlan").parse(billobject.getMovSKCPlanItem({WHCode:storecode}));
			
		});
	}
};

});