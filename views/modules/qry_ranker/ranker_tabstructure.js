define(["views/menus/export","data/scoreobject"],
function(exports,scoreobject){

var StartDate=new Date(new Date().setDate(1)).toString('yyyy-MM-dd');
var EndDate=new Date().toString('yyyy-MM-dd');

var scoretype = "EventType";
var cmptype = "cmpstaff";
var colArray = null;

	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"datepicker", 	id:"StartDate4",width:190,align: "left", label: '查询日期',labelWidth:85,value:StartDate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", 	id:"EndDate4",width:140,align: "left", label: '~',	labelWidth:20,value:EndDate, stringResult:true, format:"%Y-%m-%d"},
				{ view:"segmented", value:"EventType", labelWidth:80,label:"分析粒度",width:300,
					options:[
						{ id:"EventScope", value:"事件范围" },	
						{ id:"EventType", value:"事件类别"},
						{ id:"Event", value:"事件内容"},
						],
						click:function(){scoretype = this.getValue();}
				},	
				{ view:"segmented", value:"cmpstaff", labelWidth:60,label:"对象",width:200,
					options:[
						{ id:"cmpstaff", value:"员工" },	
						{ id:"cmpdept", value:"部门"},
						],
					click:function(){cmptype = this.getValue();}
				},
				{ view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
					click: function(){
						getScoreCrossStructure($$("StartDate4").getValue(),$$("EndDate4").getValue(),scoretype,cmptype);
					}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("crossstructuretable")},
		    ]
	};


	var crossstructuretable = {
		view:"datatable",
		id:"crossstructuretable",
		headerRowHeight:40,
		dragColumn: true,

		select:'row',
		columns:[
			{ id:"deptsname",	name:"deptsname",header:["部门",{content:"selectFilter"}], sort:"string",width:100},
		],
	};
	
var layout = {
	id: "rankStructureView",
	type: "clean",
	rows:[
		titleBar,
		crossstructuretable
	]
};

function getScoreCrossStructure(StartDate,EndDate,scoretype,cmptype)
{
	condition = {
		//DeptCode:deptcode,
		ColAsRow:scoretype,
		StartDate:StartDate.toString('yyyy-MM-dd'),
		EndDate:EndDate.toString('yyyy-MM-dd'),
		CompareType:cmptype
	}
	
	var columns = webix.toArray($$("crossstructuretable").config.columns);
	var len = columns.length;
	for (var i = 1; i < len; i++) {
		columns.removeAt(1);
	};
	
	var prefix = null;
	if(scoretype=="EventScope") prefix = "es";
	if(scoretype=="EventType") prefix = "et";
	if(scoretype=="Event") prefix = "sj";
	
	if(cmptype=="cmpstaff") 
	columns.insertAt({ id:"staffname",name:"staffname",	header:"姓名",  sort:"string", fillspace:1.25});
	
    colArray.forEach(function(item){    	
    	var colcode = item['colcode'].toLowerCase();
		if(colcode.substr(0,2)==prefix) 
		{
			columns.insertAt({ id:colcode,name:colcode,header:{text:item['colname'],rotate:true},  sort:"int", fillspace:1,
			template:function(obj){
				if(obj[colcode]==0) 
				return " ";
				else return obj[colcode];
			}
			});
		}
	});

//	$$("crossstructuretable").define('headermenu',	{width: 250,autoheight: false,	scroll: true});
	$$("crossstructuretable").refreshColumns();
	
	var premObj = scoreobject.getScoreCrossStructure(condition);
	$$("crossstructuretable").clearAll();
	$$("crossstructuretable").parse(premObj);
	
};

return { 
	$ui:layout,
	$oninit:function(){		
		webix.ajax().post(urlstr+"/WBScoreMng/getScoreCrossStructureColArray",{DSSuffix:_DSSuffix},function(response){
			colArray = JSON.parse(response);
		});

	}
};

});