define([
	"data/impobject"
], function(impobject){

checkauthorization(false);
	var TargetTable="importstock";
	var PageIndex = 1;
	
	function showDatatable(){
		$$("uploaderid").define("upload",urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/"+TargetTable);
		$$("dt_loadedDataimportstock").hide();
		$$("dt_loadedDataimportsale").hide();
		$$("dt_loadedDataimportsku").hide();
		$$("dt_loadedDataimportparty").hide();
		$$("dt_loadedData"+TargetTable).show();
		
	};

	
	var uploadForm={
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		width:350,
		rows:[
			 	{
			 	view:"segmented", value:"importstock", label:"",inputWidth:350,
				options:[{ id:"importstock", value:"导入库存"},{ id:"importsale", value:"导入销售"},
				{ id:"importsku", value:"导入SKU"},{ id:"importparty", value:"导入仓库"}],
				click:function(){
					TargetTable = this.getValue();
					showDatatable();
				}
			},
			{cols:[{
					view:"uploader",
//					multiple:false,
					id: "uploaderid",
//					type:"iconButton", 
//					icon:"cloud-upload",
				  	name:"uploader", 
				  	value:"上传",
				  	link:"mylist",
				  	width:100,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/"+TargetTable
			},
			{},
//			{view:"button", label: "取消", type:"iconButton", icon: "trash", click: function(){
//				var id= $$("uploaderid").files.getFirstId();
//				while(id){
//					$$("uploaderid").stopUpload(id);
//					id = $$("uploaderid").files.getNextId(id);
//				}
//			}},
				]},
			{view:"list",  id:"mylist", type:"uploader",autoheight:true, borderless:true}
		
			]};
	
	var dbToolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
		height:45,
		cols:[		 
			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 130,labelWidth:80,maxHeight:40},
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedData"+TargetTable).clearAll();
				 $$("dt_loadedData"+TargetTable).parse(impobject.getImportData(TargetTable,PageIndex,$$('pagelen').getValue()));
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 
				 $$("dt_loadedData"+TargetTable).clearAll();
				 $$("dt_loadedData"+TargetTable).parse(impobject.getImportData(TargetTable,PageIndex,$$('pagelen').getValue()));		 
			}},
			{},
			{ view: "button", type: "iconButton", icon: "times", label: "清空", width: 70,height:40,
			click: function(){
				 impobject.clearImportData(TargetTable);
				 $$("dt_loadedData"+TargetTable).clearAll();
				 webix.message("清空成功！");
			}},
			{ view: "button", type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
				 impobject.saveImportData(TargetTable);
				 webix.message("保存成功！");
			}}
		]
	};
	
	var grid_stock = 
			{
				id:"dt_loadedDataimportstock",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"partycode", header:"仓库编号", sort:"string", fillspace:1},
					{id:"skucode", header:"SKU", sort:"string", fillspace:1},	
					{id:"onhandqty", header:"在手库存", sort:"int",fillspace:1},
					{id:"onroadqty", header:"在途库存", sort:"int",fillspace:1}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
	
	var grid_sale = 
			{
				id:"dt_loadedDataimportsale",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"门店编号", header:"门店编号", sort:"string", fillspace:1},
					{id:"消费日期", header:"消费日期", sort:"string", fillspace:1},
					{id:"skucode", header:"SKU", sort:"string", fillspace:1},	
					{id:"销售数量", header:"销售数量", sort:"int",fillspace:1},
					{id:"销售金额", header:"销售金额", sort:"int",fillspace:1}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			
		var grid_sku = 
			{
				id:"dt_loadedDataimportsku",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"skucode", header:"SKU", sort:"string", fillspace:1},
					{id:"productcode", header:"款式", sort:"string", fillspace:1},	
					{id:"productname", header:"款名", sort:"string", fillspace:1},	
					{id:"colorcode", header:"颜色编号", sort:"int",fillspace:1},
					{id:"colorname", header:"颜色", sort:"int",fillspace:1},
					{id:"shapename", header:"杯型", sort:"int",fillspace:1},
					{id:"sizecode", header:"尺码编号", sort:"int",fillspace:1},
					{id:"sizename", header:"尺码", sort:"int",fillspace:1},
					{id:"brandname", header:"品牌", sort:"int",fillspace:1},
					{id:"maintypename", header:"大类", sort:"int",fillspace:1},
					{id:"subtypename", header:"小类", sort:"int",fillspace:1},
					{id:"ticketprice", header:"吊牌价", sort:"int",fillspace:1},
					{id:"onshelfdate", header:"上市日期", sort:"int",fillspace:1}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			
	var grid_party = 
			{
				id:"dt_loadedDataimportparty",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"partycode", header:"仓库编号", sort:"string", fillspace:1},
					{id:"partyname", header:"仓库名称", sort:"string", fillspace:1},	
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};

	var layout = {
		type: "line",
		cols:[
		uploadForm,
			{rows:[dbToolbar,grid_stock,grid_sale,grid_sku,grid_party]}
			]
	};

	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_loadedDataimportstock").show();
			$$("dt_loadedDataimportsale").hide();
			$$("dt_loadedDataimportsku").hide();
			$$("dt_loadedDataimportparty").hide();
		
			$$("uploaderid").attachEvent("onUploadComplete", function(){
    			webix.message("done");
    			$$("dt_loadedData"+TargetTable).showOverlay("正在载入导入的前200条数据...");
			
			$$("dt_loadedData"+TargetTable).clearAll();
			$$("dt_loadedData"+TargetTable).parse(impobject.getImportData(TargetTable,1,200));
			});
		}
	};

});