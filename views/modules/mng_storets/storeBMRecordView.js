define(function(){

	var gridTree = {
		view:"treetable",
		id:"dt_storebmrecord",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight,
		headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		leftSplit:1,
		resizeColumn:true,
		navigation:true,
		select: true,
		columns:[
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			
			{ id:"recorddate",	header:"调整日期", sort:"string",fillspace:1.5},
			{ id:"oldtargetqty",	header:"原目标库存", sort:"string",fillspace:1},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",fillspace:1},
			
			{ id:"bmreason",	header:"调整原因", sort:"string",fillspace:3},
			{ id:"operator",	header:"操作人", sort:"string",fillspace:1}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "storeBMRecordView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
