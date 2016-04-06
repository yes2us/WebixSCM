define([
	"data/storeobject",
	"views/modules/mng_para/modaladd_para",
	"views/menus/export"
	],
function(storeobject,modaladd,exports){
	
	checkauthorization(false);
	
  var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_party").clearAll();
				$$("dt_party").parse(paraobject.getSysPara());
				}},
			{},
			{ view: "button", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_party').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_party")},
		]
	};
	
	var grid_party = {
		margin:10,
		rows:[
			{
				id:"dt_party",
				view:"datatable", 
				editable:true,
				select:"row",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveParameter",
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"#", width:30},
					{id:"partycode", header:"仓库编号", editor:"text", sort:"string",width:150},
					{id:"partyname", header:"仓库名", editor:"text", sort:"string",width:150},
					{id:"partycode", header:"参数名", editor:"text", sort:"string",width:150},
					{id:"partycode", header:"参数名", editor:"text", sort:"string",width:150},
					{id:"partycode", header:"参数名", editor:"text", sort:"string",width:150},
					{id:"type", header:"参数类型", editor:"combo",sort:"string",
					collection:['VInteger','VFloat','VDate',"VBool","VString","VText"],fillspace:0.7},
					
					{id:"vinteger", header:"整型值",editor:"text", sort:"string",fillspace:0.5},
					{id:"vfloat", header:"浮点值", editor:"text",sort:"string", format:webix.i18n.numberFormat,fillspace:0.5},
					{id:"vdate", header:"日期值", editor:"date",sort:"string",stringResult:true, format:"%Y-%m-%d",fillspace:0.7},
					{id:"vbool", header:"布尔值", template:"{common.checkbox()}",fillspace:0.5,disabled:true,sort:"string",format:webix.i18n.numberFormat},

					{id:"vstring", header:"字符串",editor:"popup", sort:"string", fillspace:1.5},
					{id:"vtext", header:"文本值", editor:"popup",sort:"string" ,fillspace:1.5,hidden:true},					
					{id:"desc", header:"备注", editor:"popup", sort:"string",fillspace:1}
				],
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_para").remove(id);
								}
							}
						});
					}
				},
				pager:"para_pagerA"
			}
		]

	};

var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", 
							id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
							
	var layout = {
		type: "clean",
		rows:[
			titleBar,
			{
				cols:[{rows:[grid_party,pager]},{view:"resizer"}
			}
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_para").parse(paraobject.getSysPara());

			
			webix.dp.$$("dt_para").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});

		}
	};

});