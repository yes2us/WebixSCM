define([
"views/menus/export",
"data/scoreobject"
], function(exports,scoreobject){


var scoretype = "KeyItemY";
var StartDate=new Date(new Date().setDate(1)).toString('yyyy-MM-dd');
var EndDate=new Date().toString('yyyy-MM-dd');

	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"datepicker", 	id:"StartDate3",width:190,align: "left", label: '查询日期',	labelWidth:80,value:StartDate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", 	id:"EndDate3",width:140,align: "left", label: '~',	labelWidth:20,value:EndDate, stringResult:true, format:"%Y-%m-%d"},
				{ view:"segmented", value:"KeyItemY", labelWidth:20,label:"",width:350,
					options:[
						{ id:"KeyItemY", value:"关键Y分" },	
						{ id:"VIPMngY", value:"会员管理"},
						{ id:"MmMngY", value:"演练Y分"},
						{ id:"QtyPerSaleY", value:"连单Y分"}
						],
						click:function(){
							scoretype = this.getValue();
				 			}
				},
				{ view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
					click: function(){
							getScoreTypeRank($$("StartDate3").getValue(),$$("EndDate3").getValue(),scoretype);
					}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("scoretyprank")},
		    ]
	};
	

	var grid = {
		view:"datatable",
		id:"scoretyprank",
		headerRowHeight:35,
		dragColumn: true,
	headermenu: {
		width: 250,
		autoheight: false,
		scroll: true
	},
		columns:[
			{ id:"rankorder", header:"排名", sort:"int",width: 65},
			{ id:"staffname",	header:"姓名",  sort:"string", fillspace:1},
			{ id:"deptsname",	header:["店名",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"yscore",	header:"Y分", sort:"string",fillspace:1,format:webix.Number.numToStr({decimalSize:0})},
		]
	};
	
	var layout = {
		id: "rankTypeView",
		type: "clean",
		rows:[
			titleBar,
			grid
		]
	};

function getScoreTypeRank(StartDate,EndDate,scoretype)
{
	var condition = {
		//DeptCode:deptcode,
		StartDate:new Date(StartDate).toString('yyyy-MM-dd'),
		EndDate:new Date(EndDate).toString('yyyy-MM-dd'),
		RankAtt:scoretype,
		PageIndex:1,
		PageLen:1000
	};
	
		$$("scoretyprank").clearAll();
		$$("scoretyprank").parse(scoreobject.getRanker(condition));	
}

return { 
	$ui:layout
};

});