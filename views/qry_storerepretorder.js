define([
	"data/billobject",
	"views/modules/qry_storerepretorder/repretconditionview"
	],
function(billobject,repretconditionview){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_repretorder",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				leftSplit:2,
				export: true,
				columns:[
					{id:"ordercode", header:"单号", width:200},
					{ id:"partyname",	header:["门店 ",{content:"selectFilter"}], sort:"string",width:150},
					{ id:"parentname",	header:["上级区域 ",{content:"selectFilter"}], sort:"string",width:150},
					{ id:"makedate",	header:"日期", sort:"string",width:100},
					{ id:"orderqty",	header:"数量",width:80},
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					},
					onSelectChange:function()
					{
						var selRow = this.getSelectedItem();
						if(selRow)
						{
						var ordertype = repretconditionview.getOrderType();
						var prezRepItemData = billobject.getRepRetOrderItem({OrderType:ordertype,OrderCode:selRow.ordercode});
						$$("dt_repretorderitem").clearAll();
						$$("dt_repretorderitem").parse(prezRepItemData);
						}
					}
				},
				pager:"storerepret_pagerA"
			}
		]

	};
	
	var grid_orderitem={
				view:"datatable", 
				id:"dt_repretorderitem",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				leftSplit:1,
				export: true,
				columns:[
					{ id:"skucode",	header:"SKU", sort:"string",width:150,css:"bgcolor2"},			
					{ id:"skccode",	header:"款色", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:100},
					{ id:"sizename",	header:"尺码", sort:"string",width:80},				
					{ id:"yearname",	header:"年份", sort:"string",width:80},
					{ id:"seasonname",	header:"季节", sort:"string",width:80},
					{ id:"maintypename",header:"大类", sort:"string",width:100},
					{ id:"subtypename",header:"小类", sort:"string",width:150},		
					{ id:"ordertype",	header:"类型", width:100},
					{ id:"orderqty",header:"数量",width:100}
				],
				pager:"storerepretitem_pagerA"
	};
	
	var layout = {
		type: "line",
		cols:[
			repretconditionview,
			{view:"resizer",width:1},
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"storerepret_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					},
					{view:"resizer"},
					grid_orderitem,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"storerepretitem_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					},
				]
			}
		]

	};
	

	return {
		$ui: layout,
	};

});