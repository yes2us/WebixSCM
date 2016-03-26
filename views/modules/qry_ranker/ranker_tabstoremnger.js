define([
	"views/menus/export",
	"views/modules/qry_ranker/storemngeryscore",
	"views/modules/qry_ranker/storemngertscore"
], function(exports,storemngeryscore,storemngertscore){

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
				{view:"datepicker", 	id:"StartDate1",width:190,align: "left", label: '查询日期',	labelWidth:80,value:StartDate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", 	id:"EndDate1",width:140,align: "left", label: '~',	labelWidth:20,value:EndDate, stringResult:true, format:"%Y-%m-%d"},
				{ view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
					click: function(){
							storemngeryscore.$fnInvoke($$("StartDate1").getValue(),$$("EndDate1").getValue());
					}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("storemngeryscore")},
		    ]
	};

	var titleBar2 = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{ view:"combo", labelWidth:70,label:"月份",inputWidth:300, 
					options:yearMonthArray,
						on:{onchange:function(){
								storemngertscore.$fnInvoke(this.getValue());
				 			}}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("storemngertscore")},
		    ]
	};


var layout = {
	id: "rankStoreMngerView",
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
						storemngeryscore,
					]
				},
				{view:"resizer"},
				{
					type:"clean",
					rows:[
						titleBar2,
						storemngertscore,
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