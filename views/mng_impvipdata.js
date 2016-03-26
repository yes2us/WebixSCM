define([
	"views/menus/export",
	"data/impobject"
], function(exports, impobject){

checkauthorization(false);
	var PageIndex = 1;
	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[		
			{
					view:"uploader",
					multiple:false,
					id: "uploaderid",
					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	label:"上传Excel",
				  	link:"vipdata",
				  	width:120,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB"
				 },
			{view:"list",  id:"vipdata", type:"uploader",	autoheight:true, borderless:true,width:200},

			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 130,labelWidth:80},
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 100,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedData").clearAll();
				 $$("dt_loadedData").parse(impobject.getImportData(PageIndex,$$('pagelen').getValue()));
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 100,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedData").clearAll();
				 $$("dt_loadedData").parse(impobject.getImportData(PageIndex,$$('pagelen').getValue()));		 
			}},
			{},
			{},
			{ view: "button", type: "iconButton", icon: "times", label: "请空", width: 70,
			click: function(){
				 impobject.clearImportData();
				 $$("dt_loadedData").clearAll();
				 webix.message("清空成功！");
			}},
			{ view: "button", type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
				 impobject.saveImportData();
				 webix.message("保存成功！");
			}},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_loadedData",
				view:"datatable",
				headerRowHeight:35,
				dragColumn:true,
				select:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
//					{id:"recordtime", header:"渠道四级名称", sort:"string", fillspace:1.2},
//					{id:"incenttype", header:["渠道五级名称",{content:"selectFilter"}], width:60},
					{id:"rankorder", header:"#", sort:"string", fillspace:0.5},
					{id:"salebillcode", header:["零售单号", {content:"selectFilter"} ], sort:"string", fillspace:1.3},
					{id:"recorddate", header:["消费日期", {content:"selectFilter"} ], sort:"string", stringResult:true, format:"%Y-%m-%d",fillspace:1},
					
					{id:"customercode", header:["会员编号", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"customername", header:["会员名称", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"mobileno", header:["会员手机号码", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"brand", header:["会员归属品牌", {content:"selectFilter"} ], sort:"string", fillspace:1},
					
					{id:"skucode", header:["产品编号", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"year", header:["产品年代", {content:"selectFilter"} ], sort:"string", fillspace:0.5},
					{id:"waveband", header:["产品波段", {content:"selectFilter"} ], sort:"string", fillspace:0.5},
					{id:"theme", header:["产品主题", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"series", header:["产品系列", {content:"selectFilter"} ], sort:"string", fillspace:1},
					{id:"ticketprice", header:["吊牌价", {content:"selectFilter"} ], sort:"string", fillspace:1},
					
					{id:"saleqty", header:["销售数量", {content:"selectFilter"} ], sort:"int"},
					{id:"salemoney", header:["销售金额", {content:"selectFilter"} ], sort:"string",format:webix.i18n.priceFormat,fillspace:1}

				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
//				pager:"pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		rows:[
			titleBar,
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:35,
						cols:[{
							view:"pager", id:"pagerA",
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
		$oninit:function(){
			$$("uploaderid").attachEvent("onUploadComplete", function(){
    			webix.message("done");
    			$$("dt_loadedData").showOverlay("正在载入导入的前200条数据...");
			});
			$$("dt_loadedData").clearAll();
			$$("dt_loadedData").parse(impobject.getImportData(1,200));
		}
	};

});