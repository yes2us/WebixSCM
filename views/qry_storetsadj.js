define([
	"data/stockobject",
	"views/modules/qry_storeadj/searchconditionview"
	],
function(stockobject,searchconditionview){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"data_storeadjrecord",
				view:"datatable", 
				editable:true,
				select:true,
				leftSplit:3,
				rowHeight:15,
				headerRowHeight:35,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
					{ id:"recorddate",	header:"日期", sort:"string",fillspace:1.5},
					{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
					{ id:"oldtargetqty",	header:"原目标库存", sort:"string",fillspace:1},
					{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",fillspace:1},
					{id:"adjustreason", header:["调整原因 ",{content:"selectFilter"}], fillspace:3},
					{id:"operator", header:["操作人 ",{content:"selectFilter"} ], sort:"string",width:70}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"storeadjrec_pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		cols:[
			searchconditionview,
			{view:"resizer"},
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"storeadjrec_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					}
				]
			}
		]

	};
	

	return {
		$ui: layout,
	};

});