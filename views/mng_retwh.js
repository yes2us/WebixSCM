define([
	"data/stockobject",
	"views/modules/mng_retwh/retListView",
	"views/modules/mng_retwh/retBySKUView",
	"views/modules/mng_retwh/retBySKCView",
	"views/modules/mng_retwh/retPlanView"
], function(
	stockobject,
	retListView,
	retBySKUView,
	retBySKCView,
	retPlanView
){

checkauthorization(false);

var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					retListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "retBySKUView", value: "SKU退货"},
									{id: "retBySKCView", value: "款色退货"},
									{id: "retPlanView", value: "退货计划"}
								]
							},
							{
								cells:[
								    retBySKUView,
								    retBySKCView,
									retPlanView
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
		
		$$("lt_dwhs").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var dwhcode = this.getItem(id).id;
			var promzTSData = stockobject.getFGWarehouseTSInfo(dwhcode);
			var promzStockStructData = stockobject.getPartyIndex({ParentCode:dwhcode,RelationType:"退货关系"});

//			//显示分仓skc
//			$$("dt_whsku").clearAll();
//			$$("dt_whsku").showOverlay("正在加载......");
//			$$("dt_whsku").parse(promzTSData);
			
			
			//显示门店库存结构
			retBySKUView.setRetTargetWH(dwhcode);
			retBySKCView.setRetTargetWH(dwhcode);
			$$("dt_storestockstruct1").clearAll();
			$$("dt_storestockstruct1").showOverlay("正在加载......");
			$$("dt_storestockstruct1").parse(promzStockStructData);
			
			$$("dt_storestockstruct2").clearAll();
			$$("dt_storestockstruct2").showOverlay("正在加载......");
			$$("dt_storestockstruct2").parse(promzStockStructData);			
	
			//显示区域退货计划:退码和退款
			$$("dt_retPlan").clearAll();
			$$("dt_retPlan").showOverlay("正在加载......");
			$$("dt_retPlan").parse(stockobject.getRetPlanOrder({RetTargetWHCode:dwhcode}));
			
			});
	}
};

});