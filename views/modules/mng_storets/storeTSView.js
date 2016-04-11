define(
[],
function(){
			
	var gridTree = {
		view:"datatable",
		id:"dt_storets",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:2,
		editable:true,
		select: true,
		save:urlstr+"/WBCURDMng/saveStock",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skucode",	header:"SKU", sort:"string",width:150,css:"bgcolor2"},
			
			{ id:"skccode",	header:"款色", sort:"string",width:100},
			{ id:"colorname",	header:"颜色", sort:"string",width:100},
			{ id:"sizename",	header:"尺码", sort:"string",width:60},
			
			{ id:"yearname",	header:"年份", sort:"string",width:80},
			{ id:"seasonname",	header:"季节", sort:"string",width:60},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			{ id:"subtypename",	header:"小类", sort:"string",width:100},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", width:100,editor:"text",css:"bgcolor1"},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:100},
			{ id:"sugrepqty",	header:["理论补退",{content:"numberFilter"}],sort:"int",align:"right", width:100}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "storeTSView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
