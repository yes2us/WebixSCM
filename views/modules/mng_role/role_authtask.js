define(
["views/modules/mng_role/modaladd_authandtask"],
	function(modaladd){
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    { view:"button", type:"iconButton", icon: "plus-circle", label: "增加奖扣权限与任务", width: 200, click: function(){
			    	this.$scope.ui(modaladd.$ui).show();
				}},
				{},
		    ]
	};
	
	return {
		$oninit:function(){	webix.dp.$$("dt_roleauthtask").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});},
		$ui:{
			id:"roleAuthTaskView",
			type: "clean",
			rows:[
				titleBar,
				{
					id:"dt_roleauthtask",
					view:"datatable",
					headerRowHeight:35,
					save:urlstr+"/WBCURDMng/saveRoleAuthTask/DSSuffix/"+_DSSuffix,
					editable:true,
					columns:[
					    {id:"deletebutton4", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify", header:"#",fillspace:0.7,hidden:true},
						{ id:"enabled",  header:"启用", fillspace:0.7},
						{ id:"yscoreuplimit",	editor:"text", header:"单次奖励Y分上限" ,  fillspace:1},
						{ id:"yscoredownlimit",	editor:"text", header:"单次奖励Y分下限" ,  fillspace:1},
						{ id:"xscoreuplimit",	editor:"text", header:"单次奖励X分上限" ,  fillspace:1},
						{ id:"xscoredownlimit",	editor:"text", header:"单次奖励X分下限" ,  fillspace:1},
						{ id:"posyscoretaskpermonth",	editor:"text", header:"角色单月奖分任务" ,  fillspace:1},
						{ id:"negyscoretaskpermonth",	editor:"text", header:"角色单月扣分任务" ,  fillspace:1},
						{ id:"authtaskdesc",	editor:"text", header:"描述" ,  fillspace:1}
					],
					autoheight:true,
					rowHeight:40,
					select:"row",
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_roleauthtask").remove(id);
								}
							}
						});
					}
				},
				},
				{}
			]

		}
	}
});