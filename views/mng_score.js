define([
	"data/scoreobject",
	"data/deptobject",
	"views/modules/mng_score/modaladd_score",
	"views/menus/export"
	],
function(scoreobject,deptobject,modaladd,exports){
	checkauthorization(false);
	
	var enddate = new Date();
	enddate.setDate(enddate.getDate()-7);
	var titleBar = {
			view:"toolbar",
			id:'toolbarid',
			css: "highlighted_header header5",
			height:85,
			cols:[
				{rows:[				
					{ view:"segmented",name:"recordtype", value:"all", label:"",width:300,
					options:[
						{ id:"all", value:"所有" },
						{ id:"yscore", value:"Y分" },	
						{ id:"atvalue", value:"实绩"},
						{ id:"vtvalue", value:"虚绩"}]},
						
				   {cols:[{ view:"segmented",name:"showtype", value:"detail", label:"",width:150,
					options:[
						{ id:"detail", value:"明细" },
						{ id:"sum", value:"汇总" },]},
						
				   { view:"segmented",name:"rankarea", value:"indept", label:"",width:150,
					options:[
						{ id:"indept", value:"部门排名" },
						{ id:"global", value:"全体排名" },]}
				   ]},
				]},
				
				{rows:[	
			    {view:"datepicker", name:"startdate",width:200,align: "left", label: '开始日期',	labelWidth:75,value:enddate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", name:"enddate",width:200,align: "left", label: '结束日期',	labelWidth:75,value:new Date(), stringResult:true, format:"%Y-%m-%d"},
				]},
				
				{rows:[	
				{view:"select",name:"deptcode",width:200,align: "left", label: '部门名称',	labelWidth:75,
				options:urlstr+"/WBDeptMng/getDeptSNameList/ScoreMngEnabled/1/DSSuffix/"+_DSSuffix,
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							if(newv=='all')
							{
									$$("staffcode").define('options',{});
									$$("staffcode").refresh();
									return;
							}
							webix.ajax().post(urlstr+"/WBDeptMng/getDeptStaffList",{DeptCode:newv},function(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.id,value:item.value});
									});
									
									$$("staffcode").define('options',optionarray);
									$$("staffcode").refresh();
								});
						}
					}
				}
				},
			    {view:"select", name:"staffcode",	id:"staffcode",width:200,align: "left", label: '员工姓名',	labelWidth:75,options:[]},
			   	]},
			  
			   { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70,height:40,
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	var condition = null;
				    	condition = "RecordTime>='"+values.startdate.substr(0,10)+"' and RecordTime<='"+values.enddate.substr(0,10)+"'";
				    	if(values.deptcode && values.deptcode !='all') condition += " and deptcode = '"+values.deptcode+"'";
				    	if(values.staffcode && values.staffcode != 'all') condition += " and staffcode = '"+values.staffcode+"'";

				    	switch (values.recordtype){
				    		case 'yscore':
				    			condition += " and recordtype = 'Y分'";
				    			break;
				    		case 'atvalue':
				    			condition += " and recordtype = '实绩'";
				    			break;
				    		case 'vtvalue':
				    			condition += " and recordtype = '虚绩'";
				    			break;
				    		default:
				    			break;
				    	}
//				    	console.log(condition);
						$$("dt_scorerecord").clearAll();
						if(values.showtype=='detail')
						{
							$$("dt_scorerecord").parse(scoreobject.queryScoreRecord(condition));
							
							$$("dt_scorerecord").showColumn("delete");
							$$("dt_scorerecord").showColumn("audit");
							$$("dt_scorerecord").showColumn("auditstate");
							$$("dt_scorerecord").showColumn("recordcode");
							$$("dt_scorerecord").showColumn("recordtime");
							$$("dt_scorerecord").showColumn("recordtype");
							$$("dt_scorerecord").showColumn("incenttype");
							$$("dt_scorerecord").showColumn("deptsname");
							$$("dt_scorerecord").showColumn("staffname");
							$$("dt_scorerecord").showColumn("yscore");
							$$("dt_scorerecord").showColumn("tscore");
							$$("dt_scorerecord").showColumn("tsaleqty");
							$$("dt_scorerecord").showColumn("eventtype");
							$$("dt_scorerecord").showColumn("event");							
							$$("dt_scorerecord").showColumn("auditorname");
							
							
							$$("dt_scorerecord").hideColumn("problem");
							$$("dt_scorerecord").hideColumn("memcount");
							$$("dt_scorerecord").hideColumn("tvalue");
							$$("dt_scorerecord").hideColumn("atvalue");
							$$("dt_scorerecord").hideColumn("vtvalue");
							$$("dt_scorerecord").hideColumn("yorderno");
							$$("dt_scorerecord").hideColumn("torderno");
							

							
						}
						else
						{
							$$("dt_scorerecord").parse(scoreobject.queryPeriodScoreSum(condition,values.rankarea));
							
							$$("dt_scorerecord").hideColumn("delete");
							$$("dt_scorerecord").hideColumn("audit");
							$$("dt_scorerecord").hideColumn("auditstate");
//							$$("dt_scorerecord").hideColumn("_identify");
							$$("dt_scorerecord").hideColumn("recordcode");
							$$("dt_scorerecord").hideColumn("recordtime");
							$$("dt_scorerecord").hideColumn("recordtype");
							$$("dt_scorerecord").hideColumn("incenttype");
							$$("dt_scorerecord").hideColumn("auditorname");
							
							$$("dt_scorerecord").showColumn("problem");
							$$("dt_scorerecord").showColumn("memcount");
							$$("dt_scorerecord").showColumn("yorderno");
							$$("dt_scorerecord").showColumn("torderno");
							$$("dt_scorerecord").showColumn("deptsname");
							$$("dt_scorerecord").showColumn("staffname");
							$$("dt_scorerecord").showColumn("yscore");
							$$("dt_scorerecord").showColumn("tscore");
							$$("dt_scorerecord").showColumn("tsaleqty");
							
							$$("dt_scorerecord").showColumn("tvalue");
							$$("dt_scorerecord").hideColumn("atvalue");
							$$("dt_scorerecord").hideColumn("vtvalue");
							
							$$("dt_scorerecord").hideColumn("eventtype");
							$$("dt_scorerecord").hideColumn("event");

						}

				    }},
				{}, {},
				{ view: "button", type: "iconButton", icon: "plus", label: "增加记录", width: 120, height:80,click: function(){this.$scope.ui(modaladd.$ui).show();}},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70,height:80, popup: exports.print("dt_scorerecord")},
		    ]
	};

	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_scorerecord",
				view:"datatable", 
				select:true,
				headerRowHeight:35,
				dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
				save:urlstr+"/WBCURDMng/saveEventRecord/DSSuffix/"+_DSSuffix,
				columns:[
					{id:"delete", header:"删除", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='delete webix_icon fa-trash-o'></span>"},
					{id:"audit", header:"审核", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='audit webix_icon fa-thumbs-o-up'></span>"},
					{id:"auditstate", header:["状态", {content:"selectFilter"} ], sort:"string" ,width:70,
					template:"<span class='status status#auditvalue#'>#auditstate#</span>"},
					{id:"_identify", header:"#",width:60,hidden:true},
					{id:"recordcode", header:"记录编码", width:120},
					
					
					{id:"yorderno", header:"Y分排名",sort:"int",format:webix.i18n.intFormat, width:90},
					{id:"torderno", header:"业绩排名",sort:"int",format:webix.i18n.intFormat, width:90},
					{id:"memcount", header:"部门人数",sort:"int",format:webix.i18n.intFormat, width:90},
					{id:"problem", header:["异常",{content:"selectFilter"}],sort:"string", width:120},
					
					{id:"recordtime", header:"日期", sort:"string", stringResult:true, format:"%Y-%m-%d",width:100},
					{id:"recordtype", header:["类型",{content:"selectFilter"}], width:60},
					{id:"incenttype", header:["奖扣",{content:"selectFilter"}], width:60},
					{id:"deptsname", header:["部门", {content:"selectFilter"} ], sort:"string", width:120},
					{id:"staffname", header:["得分人", {content:"selectFilter"} ], sort:"string", width:70},
					
					{id:"yscore", header:["Y分",{content:"numberFilter"}], width:60, sort:"int",format:webix.i18n.intFormat},
					{id:"tscore", header:["T分", {content:"numberFilter"}], width:60, sort:"string", format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"tsaleqty", header:["客单",{content:"numberFilter"}],width:60, format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"tvalue", header:["金额",{content:"numberFilter"}], hidden:true, sort:"int", format:webix.i18n.priceFormat},
					{id:"atvalue", header:["实绩",{content:"numberFilter"}], hidden:true, sort:"int", format:webix.i18n.priceFormat},
					{id:"vtvalue", header:["虚绩",{content:"numberFilter"}],hidden:true, sort:"int", format:webix.i18n.priceFormat},


					{id:"eventtype", header:["事件类型", {content:"selectFilter"} ], sort:"string", width:100},
					{id:"event", header:["事件",{content:"selectFilter"}], sort:"string" ,fillspace:1},
					{id:"auditorname", header:["审核人",{content:"selectFilter"}], sort:"string" ,width:100},
					{id:"auditdate", header:"审核日期", stringResult:true, format:"%Y-%m-%d",width:100,hidden:true},

				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"score_pagerA",
				onClick:{
					"delete":function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(result){
								if(result){
									webix.$$("dt_scorerecord").remove(id);
								}
							}
						});
					},
						"audit":function(e,id,node){
							var row = $$("dt_scorerecord").getItem(id);
//							console.log(id);
							if(row['auditstate'] != "待审核") 
							{
							   webix.message("不可对已经审核记录再次审核");
							   return;
							}
							
						webix.confirm({
							text:"你将审核本条记录.<br/>确定吗?", ok:"批准", cancel:"拒绝",
							callback:function(result){
									var auditstate = "拒绝";	
									var auditvalue = 0;
									if(result)  
									{
										auditstate = "批准";
										auditvalue = 1;
									}

									row['auditstate'] = auditstate;
									row['auditvalue'] = auditvalue;
									row['auditdate'] = new Date().toString('yyyy/MM/dd');
									
									$$("dt_scorerecord").updateItem(id, row);
							}
						});
					},
				}
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
							view:"pager", id:"score_pagerA",
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
		webix.dp.$$("dt_scorerecord").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
//		$$("deptcode").defined(deptobject.getDeptSNameList("ScoreMngEnabled"));	
//		$$("deptcode").add({deptcode:'all',deptsname:"所有店铺"}, 0);
		}
	};

});