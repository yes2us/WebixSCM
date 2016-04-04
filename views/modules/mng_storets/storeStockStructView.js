define([], function(){

	var gridTree = { 
			  view:"datatable",
			  id:"dt_stockstruct",
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
					{ id:"seriesname",name:"series",	header:"系列",width:200, fillspace:1},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,fillspace:1},
					{ id:"fastrunnerskcnum",name:"fastrunnerskcnum",header:[null,"畅销款色"],fillspace:1},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],fillspace:1},		
					{ id:"targetqty",name:"targetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,fillspace:1},
					{ id:"totalqty",name:"totalqty",header:[null,"总库存"] ,fillspace:1},
					{ id:"shortstockqty",name:"shortstockqty",	header:[null,"库存缺口"],fillspace:1},		
					{ id:"overstockqty",name:"overstockqty",header:[null,"超额库存"] ,fillspace:1},
					{ id:"deadstockqty",name:"deadstockqty",header:[null,"死货库存"] ,fillspace:1}
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