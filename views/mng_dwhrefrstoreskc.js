define([
	"data/stockobject",
	"views/modules/mng_dwhrefr/dwhRefrListView",
	"views/modules/mng_dwhrefr/dwhRefrByStoreView",
	"views/modules/mng_dwhrefr/dwhRefrPlanView"
], function(
	stockobject,
	dwhRefrListView,
	dwhRefrByStoreView,
	dwhRefrPlanView
){

checkauthorization(false);

var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
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
		]}


	]

};


return {
	$ui:layout,
	$oninit:function(){
		
		$$("lt_refrstores").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var storecode = this.getItem(id).partycode;
			var regioncode = dwhRefrListView.getRegionCode();

			//显示门店的款色
			$$("dt_dwhrefrstoreskc").clearAll();
			$$("dt_dwhrefrstoreskc").parse(stockobject.getWHSKCInfo({WHCode:storecode}));
			
			var presWHSKCInfoData = stockobject.getWHSKCInfoNewSKC({WHCode:storecode,ParentCode:regioncode});
			$$("dt_dwhStoreNewSKC").clearAll();
			$$("dt_dwhStoreNewSKC").parse(presWHSKCInfoData);
							
			//显示换款计划
			$$("dt_dwhRefrPlan").clearAll();
			$$("dt_dwhRefrPlan").parse(stockobject.getRefrSKCPlan({WHCode:storecode}));
			
			});
	}
};

});