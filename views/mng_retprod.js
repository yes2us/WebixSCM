define([
	"data/stockobject",
	"views/modules/mng_dwhret/dwhRetListView",
	"views/modules/mng_dwhret/dwhRetBySKView",
	"views/modules/mng_dwhret/dwhRetBySKCView",
	"views/modules/mng_dwhret/dwhRetByStoreView",
	"views/modules/mng_dwhret/dwhRetPlanOrderView"
], function(
	stockobject,
	dwhRetListView,
	dwhRetBySKUView,
	dwhRetBySKCView,
	dwhRetByStoreView,
	dwhRetPlanOrderView
){

checkauthorization(false);

var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					dwhRetListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "dwhProdRetBySKUView", value: "产品退货-按SKU"},
									{id: "dwhStoreRetBySKUView", value: "门店退货-按SKU"},
									{id: "dwhRetPlanBySKUView", value: "退货计划-按SKU"},
																				
									{id: "dwhProdRetBySKCView", value: "产品退货-按SKC"},
									{id: "dwhStoreRetBySKCView", value: "门店退货-按SKC"},
									{id: "dwhRetPlanBySKCView", value: "退货计划-按SKC"},
								]
							},
							{
								cells:[
								    dwhRetBySKUView,
								    dwhRetBySKCView,
									dwhRetByStoreView,	
									dwhRetPlanOrderView
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

			//显示分仓skc
			$$("dt_dwhskc").clearAll();
			$$("dt_dwhskc").showOverlay("正在加载......");
			$$("dt_dwhskc").parse(promzTSData);
			
			//显示门店库存结构
			dwhRetByStoreView.setRetTargetWH(dwhcode);
			$$("dt_storestockstruct").clearAll();
			$$("dt_storestockstruct").showOverlay("正在加载......");
			$$("dt_storestockstruct").parse(promzStockStructData);
			
	
			//显示区域退货计划:退码和退款
			$$("dt_dwhRetPlanOrder").clearAll();
			$$("dt_dwhRetPlanOrder").showOverlay("正在加载......");
			$$("dt_dwhRetPlanOrder").parse(stockobject.getRetPlanOrder({RetTargetWHCode:dwhcode}));
			
			});
	}
};

});