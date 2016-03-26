define(
		["views/modules/mng_dept/modaladd_deptgoal"],
function(modaladd){
	


	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    { view:"button", type:"iconButton", icon: "plus-circle", label: "增加记录", width: 120, click: function(){this.$scope.ui(modaladd.$ui).show();}},	
				{},
		    ]
	};
	
	return {
		$oninit:function(){
			webix.dp.$$("dt_deptgoal").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
					
	     	webix.dp("dt_deptgoal").attachEvent("onAfterInsert",
				function(response, id, object){
				$$("dt_deptgoal").getItem(id)._identify = response;
				$$("dt_deptgoal").refresh();
			});					
		},
		
		$ui:{
			id:"deptGoalView",
			type: "clean",
			rows:[
				titleBar,
				{
					rows:[
					{id:"dt_deptgoal",
					view:"datatable",
					headerRowHeight:35,
					editable:true,
				dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
					save:urlstr+"/WBCURDMng/saveDeptGoal",
					columns:[
					    {id:"deletebutton4", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5},
						{ id:"yearmonth", header:"年月",width:75},
						{ id:"standardmonthgoal",  editor:"text",header:"*月均目标业绩", fillspace:1.2,format:webix.i18n.priceFormat},
						{ id:"totaltvaluetarget",  editor:"text",header:"*本月目标业绩", fillspace:1.2,format:webix.i18n.priceFormat},
						{ id:"staffnum",  editor:"select",	options:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],	header:"*人数", fillspace:0.7,value:"6"},
						{ id:"tvaluepertscore",	editor:"text", header:"单分业绩" ,  fillspace:1},
						{ id:"singletscoretarget", header:"单人目标分", fillspace:1.2,format:webix.i18n.intFormat},
						{ id:"singlebasictscore",header:"保底分", fillspace:1.2,format:webix.i18n.intFormat},
						{ id:"basicsalarypertscore", header:"单分工资", fillspace:1.2,format:webix.i18n.priceFormat},
						{ id:"basicsalary", header:"基本工资", fillspace:1.2,format:webix.i18n.priceFormat},
						{ id:"orginalbonusratio", header:"原提成比例", fillspace:1.2}
					],
					height:600,
					maxheight:500,
					select:"row",
					on: {
						onAfterLoad: function(){this.select(1);},
//						onItemClick:function(id){this.editRow(id);},
						onAfterEditStop:function(state, editor, ignoreUpdate){
							if(state.value != state.old){
        						var row = $$("dt_deptgoal").getItem(editor.row);
								row[row.column] = state.value;
        						if(!row.standardmonthgoal || !row.totaltvaluetarget || !row.tvaluepertscore || row.staffnum<1|| !row.basicsalary || !row.orginalbonusratio)
        						{
        							webix.message("填充相关数据后将目标T分,计算T分值和保底分！");
        							return;
        						}
								row.singletscoretarget = row.totaltvaluetarget/(row.staffnum-1)/row.tvaluepertscore;
        						row.basicsalarypertscore = parseInt(parseFloat(row.tvaluepertscore)*(parseFloat(row.orginalbonusratio)+row.basicsalary*(row.staffnum-1)/row.standardmonthgoal));
        						row.singlebasictscore = parseInt(parseFloat(row.basicsalary)/row.basicsalarypertscore);
        						
        						row.singletscoretarget = Math.round(row.singletscoretarget);
        						row.basicsalarypertscore = Math.round(row.basicsalarypertscore,0);
        						row.singlebasictscore = Math.round(row.singlebasictscore,0);
//        						$$("dt_deptgoal").updateItem(editor.row,row);

        						
    						}  
						}
					},
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_deptgoal").remove(id);
								}
							}
						});
					}},
					pager:"goal_pagerA"
				},
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"goal_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]}
					]},
				{}
			]

		}
	}
});