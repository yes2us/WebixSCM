define([
		"views/menus/export",
	"views/modules/qry_ranker/storestaffyscore",
	"views/modules/qry_ranker/storestafftscore"
], function(exports,yscoreranker,tscoreranker){

var	StartDate=new Date(new Date().setDate(1)).toString('yyyy-MM-dd');
var	EndDate=new Date().toString('yyyy-MM-dd');

var yearMonthArray = [];
for (var i = 0; i < 3; i++) {
	var today = new Date();
	today.setMonth(today.getMonth() - i);
	yearMonthArray[i] = today.toString("yyyy-MM");
}
	
var deptcode = null;

	var titleBar1 = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"datepicker", 	id:"StartDate2",width:190,align: "left", label: '查询日期',labelWidth:80,value:StartDate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", 	id:"EndDate2",width:140,align: "left", label: '~',	labelWidth:20,value:EndDate, stringResult:true, format:"%Y-%m-%d"},
				{ view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
					click: function(){
									yscoreranker.$fnInvoke(deptcode,$$("StartDate2").getValue(),$$("EndDate2").getValue());
					}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("storestaffyscore")},
		    ]
	};

	var titleBar2 = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,			
			height:35,
			cols:[
				{ view:"combo", value:"yearmonth", labelWidth:70,label:"月份",inputWidth:300, 
					options:yearMonthArray,
						on:{onchange:function(){
								tscoreranker.$fnInvoke(deptcode,this.getValue());
				 			}}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("storestafftscore")},
		    ]
	};


var layout = {
	id: "rankStoreStaffView",
	type: "clean",
	autoheight:true,
	rows:[
		{
			type: "wide",
			cols:[
				{
					type:"clean",
					rows:[
						titleBar1,
						yscoreranker,
					]
				},
				{view:"resizer"},
				{
					type:"clean",
					rows:[
						titleBar2,
						tscoreranker,
					]
				}

			]
		}
	]
};


return { 
	$ui:layout,
};

});