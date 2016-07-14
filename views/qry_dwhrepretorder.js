define([
	"data/billobject",
	"views/modules/qry_dwhrepretorder/repretconditionview"
	],
function(billobject,repretconditionview){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);

	
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_dwhrepretorder",
	 			rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
				leftSplit:3,
				columns:[
					{ id:"srcpartycode",	header:["出货仓库编号 ",{content:"textFilter"}], sort:"string",width:100},
					{ id:"srcpartyname",header:["出货仓库",{content:"selectFilter"}], sort:"string",width:150},
					{ id:"trgpartycode",	header:["收货仓库编号 ",{content:"textFilter"}], sort:"string",width:100},
					{ id:"trgpartyname",header:["收货仓库",{content:"selectFilter"}], sort:"string",width:150},
					{ id:"makedate",	header:"日期", sort:"string",width:100},
					{ id:"movqty",header:"数量",fillspace:1},
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
					onSelectChange:function()
					{
						var selRow = this.getSelectedItem();
						if(selRow)
						{
							var plantype = repretconditionview.getPlanType();
							var postData={
								PlanType:plantype,
								MakeDate:selRow.makedate,
								SrcPartyCode:selRow.srcpartycode,
								TrgPartyCode:selRow.trgpartycode,
							};
	
							$$("dt_dwhrepretorderitem").clearAll();
							$$("dt_dwhrepretorderitem").showOverlay("正在加载......");
							$$("dt_dwhrepretorderitem").parse(billobject.getMovSKUPlanItem(postData));
						}
					}
				},
				pager:"dwhrepret_pagerA"
			}
		]

	};
	
	var grid_orderitem={
				id:"dt_dwhrepretorderitem",
				view:"datatable", 
	 			rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
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
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},},
				pager:"dwhrepretitem_pagerA"
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
							view:"pager", id:"dwhrepret_pagerA",
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
							view:"pager", id:"dwhrepretitem_pagerA",
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