define([
	"data/stockobject",
	"data/billobject",
	"views/modules/mng_retwh/retListView",
	"views/modules/mng_retwh/retBySKUView",
	"views/modules/mng_retwh/retBySKCView",
	"views/modules/mng_retwh/retPlanView"
], function(
	stockobject,
	billobject,
	retListView,
	retBySKUView,
	retBySKCView,
	retPlanView
){

checkauthorization(false);

var layout = {
				type: "line",
				cols:[
					retListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "retWHBySKUView", value: "按SKU退货"},
									{id: "retWHBySKCView", value: "按款色退货"},
									{id: "retWHPlanView", value: "退货计划"}
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
	]

};


return {
	$ui:layout,
	$oninit:function(){
		
		$$("lt_RetWH_Regions").attachEvent("onSelectChange",function(id){
			if(id==1 || !this.getItem(id)) return;	
			
			var regionCode = this.getItem(id).id;
			var promzStockStructData = stockobject.getPartyIndex({ParentCode:regionCode,RelationType:"退货关系"});

			
			//显示门店库存结构
			retBySKUView.setRetTargetWH(regionCode);
			retBySKCView.setRetTargetWH(regionCode);
			$$("dt_RetWHBySKU_StoreStockStruct").clearAll();
			$$("dt_RetWHBySKU_StoreStockStruct").showOverlay("正在加载......");
			$$("dt_RetWHBySKU_StoreStockStruct").parse(promzStockStructData);
			
			$$("dt_RetWHBySKC_StoreStockStruct").clearAll();
			$$("dt_RetWHBySKC_StoreStockStruct").showOverlay("正在加载......");
			$$("dt_RetWHBySKC_StoreStockStruct").parse(promzStockStructData);			
	
			$$("dt_RetWHBySKU_StoreTSInfo").clearAll();
			$$("dt_RetWHBySKUPlan").clearAll();
			$$("dt_RetWHBySKU_StoreTSInfo").clearAll();
			$$("dt_RetWHBySKUPlan").clearAll();
			
			//显示区域退货计划:退码和退款
			$$("dt_RetWHPlan").clearAll();
			$$("dt_RetWHPlan").showOverlay("正在加载......");
			billobject.getMovSKUPlanItem({TrgPartyCode:regionCode,PlanType:"人工退货",DealState:"未处理"}).then(function(response1){
				var skuPlanData = response1.json();
				billobject.getMovSKCPlanItem({TrgPartyCode:regionCode,PlanType:"人工退货",DealState:"未处理"}).then(function(response2){
					var skcPlanData = response2.json();
				$$("dt_RetWHPlan").parse(skcPlanData.concat(skuPlanData));
				});
			});
			
			});
	}
};

});