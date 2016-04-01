define([
	"views/menus/export",
	"data/impobject"
], function(exports, impobject){

checkauthorization(false);

	var PageIndex = 1;
	var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		height:30,
		cols:[		
			{
					view:"uploader",
					multiple:false,
					id: "dwh_uploaderid",
					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	label:"上传Excel",
				  	link:"tsdata",
				  	width:120,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB"
				 },
			{view:"list",  id:"tsdata", type:"uploader",	autoheight:true, borderless:true,width:200},

			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 130,labelWidth:80},
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 100,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_dwh_loadedData").clearAll();
				 $$("dt_dwh_loadedData").parse(impobject.getImportData(PageIndex,$$('pagelen').getValue()));
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 100,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_dwh_loadedData").clearAll();
				 $$("dt_dwh_loadedData").parse(impobject.getImportData(PageIndex,$$('pagelen').getValue()));		 
			}},
			{},
			{},
			{ view: "button", type: "iconButton", icon: "times", label: "请空", width: 70,
			click: function(){
				 impobject.clearImportData();
				 $$("dt_dwh_loadedData").clearAll();
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
				id:"dt_dwh_loadedData",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[					
				    	{id:"checked", header:"#",fillspace:0.5,template:"{common.checkbox()}"},
					{id:"partycode", header:"仓库编号", sort:"string", fillspace:1},
					{id:"partyname", header:"仓库名称", sort:"string", fillspace:1},
					{id:"skucode", header:"SKU", sort:"string", fillspace:1},	
					{id:"targetqty", header:"目标库存", sort:"int",fillspace:1},
					{id:"checkinfo", header:"数据验证结果", sort:"string",fillspace:3}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
//				pager:"dwh_pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		id: "dwhImpTSDataView",
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
							view:"pager", id:"dwh_pagerA",
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
			$$("dwh_uploaderid").attachEvent("onUploadComplete", function(){
//  			webix.message("done");
    			$$("dt_dwh_loadedData").showOverlay("正在载入导入的前200条数据...");
			});
			$$("dt_dwh_loadedData").clearAll();
			$$("dt_dwh_loadedData").parse(impobject.getImportData(1,200));
		}
	};

});