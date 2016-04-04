define([
	"data/stockobject",
	"views/modules/mng_dwhret/dwhRetListView",
	"views/modules/mng_dwhret/dwhRetBySKCView",
	"views/modules/mng_dwhret/dwhRetByStoreView",
	"views/modules/mng_dwhret/dwhRetPlanOrderView"
], function(
	stockobject,
	dwhListView,
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
					dwhListView,
					{view:"resizer",width:1},
					{
						rows:[
							{view: "tabbar", multiview: true,optionWidth: 130,
								options:[
									{id: "dwhRetBySKCView", value: "按款退货"},
									{id: "dwhRetByStoreView", value: "按仓退货"},
									{id: "dwhRetPlanOrderView", value: "退货计划"}
								]
							},
							{
								cells:[
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
			var promzStockStructData = stockobject.getStoreStockStruct({RetTargetWHCode:dwhcode});

			//显示目标库存
			$$("dt_dwhskc").clearAll();
			$$("dt_dwhskc").parse(promzTSData);
			
			//显示建议补货量
			$$("dt_storestockstruct").clearAll();
			$$("dt_storestockstruct").parse(promzStockStructData);
			
			//显示建议退货量
			$$("dt_dwhRetPlanOrder").clearAll();
			$$("dt_dwhRetPlanOrder").parse(stockobject.getRetPlanOrder({RetTargetWHCode:dwhcode}));
			
			});
	}
};

});