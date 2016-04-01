define([], function(){

	var gridTree = { 
			  view:"datatable",
			  id:"table_stockstruct",
			  select: true,
			  headerRowHeight:_HeaderRowHeight,
			  leftSplit:3,
			  rowHeight:_RowHeight,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
			  columns:[
					{ id:"yearname",name:"yearname",	header:"年份", css:"rank", fillspace:1},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"rank", fillspace:1},
					{ id:"seriesname",name:"series",	header:"系列",width:200, fillspace:2},
					{ id:"skcnum",name:"skcnum",header:"款色数" ,fillspace:1},
					{ id:"targetqty",name:"targetqty",header:"目标库存" ,fillspace:1},
					{ id:"totalqty",name:"totalqty",header:"总库存" ,fillspace:1},
					{ id:"overstockqty",name:"overstockqty",header:"超额库存" ,fillspace:1},
					{ id:"shortstockqty",name:"shortstockqty",	header:"库存缺口",fillspace:1},		
					{ id:"deadskcnum",name:"deadskcnum",	header:"死货款色",fillspace:1},		
					{ id:"fastrunnerskcnum",name:"fastrunnerskcnum",header:"畅销款色",fillspace:1}
			  ]
							};
	
	var layout = {
		type: "clean",
		id: "storeStockStructView",
		cols:[
			gridTree,
		]
	};
					
	return {
		$ui:layout
	};
	

});