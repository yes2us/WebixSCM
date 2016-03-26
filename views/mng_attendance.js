define([
	"data/attendanceobject",
	"views/modules/mng_attendance/modaladd_attendance",
	"views/menus/export"
	],
function(attendanceObject,modaladd,exports){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    { view:"segmented", name:"attendancetype",value:"sgm_all", inputWidth:300, options:[
							{ id:"sgm_all", value:"所有" },
							{ id:"sgm_overtime", value:"加班" },
							{ id:"sgm_dayoff", value:"请假"},
							{ id:"sgm_absent", value:"旷工"}
						]},
			    {view:"datepicker", 	name:"startdate",width:200,align: "left", label: '开始日期',	labelWidth:80,value:enddate, stringResult:true, format:"%Y-%m-%d"},
			    {view:"datepicker", 	name:"enddate",width:200,align: "left", label: '结束日期',	labelWidth:80,value:new Date(), stringResult:true, format:"%Y-%m-%d"},
				{view:"select",name:"deptcode", 	width:200,align: "left", label: '部门名称',	labelWidth:80,
				options:urlstr+"/WBDeptMng/getDeptSNameList/ScoreMngEnabled/1",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
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
			    {view:"select", name:"staffcode",width:200,align: "left", label: '员工姓名',	labelWidth:80,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	var condition = null;
				    	condition = "RecordTime>='"+values.startdate.substr(0,10)+"' and RecordTime<='"+values.enddate.substr(0,10)+"'";
				    	if(values.deptcode) condition += " and deptcode = '"+values.deptcode+"'";
				    	if(values.staffcode && values.staffcode != 'all') condition += " and a.staffcode like '%"+values.staffcode+"%'";
				    	
				    	switch (values.attendancetype){
				    		case 'sgm_overtime':
				    			condition += " and attendancetype = '加班'";
				    			break;
				    		case 'sgm_dayoff':
				    			condition += " and attendancetype = '请假'";
				    			break;
				    		case 'sgm_absent':
				    			condition += " and attendancetype = '旷工'";
				    			break;
				    		default:
				    			break;
				    	}
//				    	console.log(condition);
						$$("dt_attendacerecord").clearAll();
						$$("dt_attendacerecord").parse(attendanceObject.queryAttendanceRecord(condition));
				 }},
			    {},
				{ view: "button", type: "iconButton", icon: "plus", label: "增加记录", width: 120, click: function(){this.$scope.ui(modaladd.$ui).show();}},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("dt_attendacerecord")},
		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_attendacerecord",
				view:"datatable", 
				editable:true,
				select:true,
				headerRowHeight:35,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				save:urlstr+"/WBCURDMng/saveStaffAttendance/DSSuffix/"+_DSSuffix,
				columns:[
					{id:"delete", header:"&nbsp;", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='delete webix_icon fa-trash-o'></span>"},
					{id:"audit", header:"&nbsp;", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='audit webix_icon fa-thumbs-o-up'></span>"},
					{id:"auditstate", header:["状态", {content:"selectFilter"} ], sort:"string" ,width:100,
					template:"<span class='status status#auditvalue#'>#auditstate#</span>"},
					{id:"recordtime", header:"日期", sort:"string", stringResult:true, format:"%Y-%m-%d",width:140},
					{id:"deptsname", header:["部门", {content:"selectFilter"} ], sort:"string", width:150},
					{id:"staffcode", header:"员工编号", sort:"string", width:100,hidden:true},
					{id:"staffname", header:["员工", {content:"selectFilter"}],width:100},
					
					{id:"attendancetype", header:"记录类型",editor:"select",options:["加班","请假","旷工"], width:90, sort:"string"},
					{id:"overtimehours", header:"加班小时", width:90,  editor:"text",format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:0})},
					{id:"offdays", header:"请假天数", width:90, editor:"text",format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"absentdays", header:"旷工天数", width:90, editor:"text", format:webix.Number.numToStr({decimalDelimiter:".",decimalSize:1})},
					{id:"auditorcode", header:"审核人编码",hidden:true},		
					{id:"auditorname", header:["审核人", {content:"selectFilter"} ], sort:"string", minWidth:150},		
					{id:"auditdate", header:"审核日期", sort:"string", width:150},
					{id:"remark", header:"备注",  sort:"string",editor:"popup", fillspace:1},

	

				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"attendance_pagerA",
				onClick:{
					"delete":function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_attendacerecord").remove(id);
								}
							}
						});
					},
					"audit":function(e,id,node){
							var row = $$("dt_attendacerecord").getItem(id);
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
									
									$$("dt_attendacerecord").updateItem(id, row);
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
						height:40,
						cols:[{
							view:"pager", id:"attendance_pagerA",
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
			$$("dt_attendacerecord").parse(attendanceObject.queryAttendanceRecord());
			
			webix.dp.$$("dt_attendacerecord").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
		}
	};

});