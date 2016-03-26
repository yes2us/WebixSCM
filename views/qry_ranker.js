define([
	"views/modules/qry_ranker/ranker_tabstoremnger",
	"views/modules/qry_ranker/ranker_tabstorestaff",
	"views/modules/qry_ranker/ranker_tabtype",
	"views/modules/qry_ranker/ranker_tabstructure",
	"views/modules/qry_ranker/ranker_incenttask"
	
], function(storemngerrank,storestaffrank,scoretyperank,scorestructurerank,incenttaskrank){
	
	checkauthorization(false);
	
var layout = {
	type: "clean",
	rows:[
		{
				type: "wide",
				cols:[
					{
						gravity: 2.2,
						rows:[
							{
								view: "tabbar", 
								multiview: true,
								optionWidth: 130,
								options:[
									{id: "rankStoreMngerView", value: "店长排名"},
									{id: "rankStoreStaffView", value: "店员排名"},
									{id: "rankTypeView", value: "分类排名"},
									{id: "rankStructureView", value: "结构分析"},
									{id: "rankIncentTaskView", value: "店长奖扣"},
								]
							},
							{
								cells:[
									storemngerrank,
									storestaffrank,
									scoretyperank,
									scorestructurerank,
									incenttaskrank
								]
							}
						]
					}
		]}
	]
};

return { 
	$ui:layout,
};

});