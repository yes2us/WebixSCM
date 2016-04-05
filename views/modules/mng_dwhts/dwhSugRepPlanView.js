define(function(){

	var gridTree = {
		view:"datatable",
		headerRowHeight:_HeaderRowHeight,
		id:"dt_dwhsugrepplan",
		dragColumn:true,
		leftSplit:3,
		rowHeight:_RowHeight,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
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
			{ id:"repretqty",	header:["理论补退",{content:"numberFilter"}],sort:"int",align:"right", fillspace:1}
		],
		select: true,
		on:{
			onAfterLoad:function(){
			$$("dt_dwhsugrepplan").filter(function(obj){
    				return parseInt(obj.repretqty) != 0;
			});
			$$("dt_dwhsugrepplan").refresh();
		}}
	};

	var layout = {
		type: "clean",
		id: "dwhSugRepPlanView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
