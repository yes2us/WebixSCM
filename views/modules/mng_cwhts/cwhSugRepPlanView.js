define(function(){

	var gridTree = {
		view:"datatable",
		id:"dt_cwhsugrepplan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:3,
		select: true,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			
			{ id:"skccode",	header:"款色", sort:"string",fillspace:1.5},
			{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
			{ id:"sizename",	header:"尺码", sort:"string",fillspace:1},
			
			{ id:"yearname",	header:"年份", sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",fillspace:1},
			{ id:"maintypename",	header:"大类", sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:"小类", sort:"string",fillspace:1.5},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"repretqty",	header:"建议补货",sort:"int",align:"right", fillspace:1}
		],
		on:{
			onAfterLoad:function(){
			$$("dt_cwhsugrepplan").filter(function(obj){
    				return parseInt(obj.repretqty)>0;
			});
			$$("dt_cwhsugrepplan").refresh();
		}}
	};

	var layout = {
		type: "clean",
		id: "cwhSugRepPlanView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
