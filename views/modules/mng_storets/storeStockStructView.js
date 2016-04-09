define([], function(){

	var gridTree = { 
			  view:"datatable",
			  id:"dt_stockstruct",
			  rowHeight:_RowHeight,
			  headerRowHeight:_HeaderRowHeight,
			  headermenu:{width:250,autoheight:false,scroll:true},
			  select: true,
			  resizeColumn:true,
			  leftSplit:3,
			  columns:[
					{ id:"yearname",name:"yearname",	header:"年份", css:"bgcolor2", width:60},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"bgcolor2",width:60},
					{ id:"seriesname",name:"seriesname",	header:"系列",css:"bgcolor2",width:100},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,width:70},
					{ id:"frskcnuminparty",name:"frskcnuminparty",header:[null,"畅销款色"],width:85},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],width:85},		
					{ id:"stocktargetqty",name:"stocktargetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,width:85},
					{ id:"stocktotalqty",name:"stocktotalqty",header:[null,"总库存"] ,width:70},
					{ id:"stockshortinstores",name:"stockshortinstores",	header:[null,"库存缺口"],width:85},		
					{ id:"stockoverinstores",name:"stockoverinstores",header:[null,"超额库存"] ,width:85},
					{ id:"stockdeadqty",name:"stockdeadqty",header:[null,"死货库存"] ,width:85}
			  ],
			  	on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
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