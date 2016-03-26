define(function(){
	return {
		$oninit:function(){
			webix.dp.$$("dt_rolestaff").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix});			
							
			webix.dp("dt_rolestaff").attachEvent("onAfterInsert",
			function(response, id, object){
				$$("dt_rolestaff").getItem(id)._identify = response;
				$$("dt_rolestaff").refresh();
			});
		},
		$ui:{
			id:"roleStaffView",
			padding: 10,
			margin: 10,
			type:"wide",
			cols:[
			{
				view:"grouplist",
				id:"tr_allstafflist",
				templateGroup:"#value#<br> Results:#$count#",
				templateBack: "#value#<br> Results:#$count#",
				templateItem:"#staffcode#- #staffname#<div class='marker  status#isonjob#' style='width:50px;'>&nbsp;</div>",
				scheme:{$group:function(obj){return obj.deptsname; },}, 
				drag:"source", 
				width:250,
				url:urlstr+"/WBStaffMng/getAllStaffs/IsOnJob/1/DSSuffix/"+_DSSuffix,
				on:{
					onBeforeDrag:function(context, ev){//做数据校验
					    var lt_rolelist = $$("lt_rolelist");
						var item_role = lt_rolelist.getSelectedItem();												
						if(lt_rolelist.getOpenState().parents.length===0 || !item_role || !item_role['rolename'])
						{
							webix.message("请选择角色");
							return false;
						}
							
						var dragItem = $$("tr_allstafflist").getItem(context.start);
						var duplicated = $$("dt_rolestaff").find(function(obj){
							return obj.staffcode === dragItem['staffcode']; 
						});
						if(duplicated.length) 
						{
							webix.message("本记录已经存在");
							return false;
						}
						
					    return true;         
					}
				}
	
			},
				{
					id:"dt_rolestaff",
					view:"datatable",
					save:urlstr+"/WBCURDMng/saveRoleStaff/DSSuffix/"+_DSSuffix,
					headerRowHeight:35,
					editable:true,
					columns:[
					    {id:"deletebutton2", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5,hidden:false},
						{ id:"rolename", header:"角色", fillspace:1.0},
						{ id:"isonjob",  header:"在职",template:"{common.checkbox()}",fillspace:0.7},
						{ id:"staffcode", header:"员工编号", fillspace:1.5},
						{ id:"staffname",header:"员工姓名" ,  fillspace:1.5}
					],
					maxheight:550,
					rowHeight:40,
					select:"row",
					drag:"target", 
					externalData:function (data, id){
						var item_role = $$("lt_rolelist").getSelectedItem();							
						data['rolename'] = item_role['rolename'];
	                	return data;
       				},
		       		on:{
					    onBeforeDrop:function(context, e){
						    for (var i=0; i< context.source.length; i++){//复制数据,使原数据不被删除
						        context.from.copy(context.source[i],context.start,this,webix.uid());
						    }
						    return false;
					    }
					},
				 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_rolestaff").remove(id);
								}
							}
						});
					}
				},
				},
//				{}
			]

		}
	}
});