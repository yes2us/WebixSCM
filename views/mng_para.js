define([
	"data/paraobject",
	"views/modules/modaladd/addpara",
	"views/menus/export"
	],
function(paraobject,modaladd,exports){
	
	checkauthorization(false);
	
	
var grid;

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
				$$("dt_para").clearAll();
				$$("dt_para").parse(paraobject.getSysPara());
				}},
			{},
			{ view: "button", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_para').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('bool').define('disabled',false);	
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_para")},
		]
	};
	
	grid = {
		margin:10,
		rows:[
			{
				id:"dt_para",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				leftSplit:3,
				editable:true,
				select:"row",
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveParameter/DSSuffix/"+_DSSuffix,
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"#", width:30},
					{id:"name", header:"参数名", editor:"text", sort:"string",width:200},
					{id:"type", header:"参数类型", editor:"combo",sort:"string",
					collection:['VInteger','VFloat','VDate',"VBool","VString","VText"],width:100},
					
					{id:"vinteger", header:"整型值",editor:"text", sort:"string",width:90},
					{id:"vfloat", header:"浮点值", editor:"text",sort:"string", format:webix.i18n.numberFormat,width:90},
					{id:"vdate", header:"日期值", editor:"date",sort:"string",stringResult:true, format:"%Y-%m-%d",width:100},
					{id:"vbool", header:"布尔值", template:"{common.checkbox()}",width:70,disabled:true,sort:"string",format:webix.i18n.numberFormat},

					{id:"vstring", header:"字符串",editor:"popup", sort:"string", width:100},
					{id:"vtext", header:"文本值", editor:"popup",sort:"string" ,width:1.5,hidden:true},					
					{id:"desc", header:"备注", editor:"popup", sort:"string",width:100}
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
					
	var detailform = {
		view:"form",
		id:"vtextform",	
		maxWidth:300,
		elements:[	
			{view:"textarea",name:"vtext",id:"vtext",paddingX:5,	paddingY:5, }
		]

	};
	
	var savebar={
		css: "highlighted_header header6",
		paddingX:5,
		paddingY:5,
		cols:[
				{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
				click:function(){
					var selid = $$("dt_para").getSelectedId();
					var item = $$("dt_para").getSelectedItem();
					var vtext = $$("vtext").getValue();
					item["vtext"] = vtext;
					$$("dt_para").updateItem(selid, item);
					webix.message('保存成功');
					}},
					{}
					]
		};
							
	var layout = {
		type: "clean",
		rows:[
			titleBar,
			{
				cols:[{rows:[grid,	pager]},
				{view:"resizer"},
				{rows:[detailform,savebar]}]
			}
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_para").parse(paraobject.getSysPara());
			$$("vtextform").bind($$("dt_para"));
			
			webix.dp.$$("dt_para").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
			
//			$$('dt_para').attachEvent('onSelectChange',function(id){
//				if(id==1 || !this.getItem(id)) return;	
//				var vipcode = this.getItem(id).customercode;
//			});
		}
	};

});