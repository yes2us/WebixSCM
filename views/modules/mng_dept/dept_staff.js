define(function(){
	return {
		$oninit:function(){
			webix.dp.$$("dt_deptstaff").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
					
			webix.dp("dt_deptstaff").attachEvent("onAfterInsert",
			function(response, id, object){
				$$("dt_deptstaff").getItem(id)._identify = response;
				$$("dt_deptstaff").refresh();
			});
			
			 $$("grouplist_input").attachEvent("onTimedKeyPress",function(){
        		var value = this.getValue();
       	 		$$("lt_dept_stafflist").filter(function(obj){
       	 			console.log(obj);
       	 			console.log(obj.staffcode.indexOf(value)==0);
            	return obj.staffcode.indexOf(value)==0 && obj.staffname.indexOf(value)==0;
        })
    });
    
		},
		$ui:{
			id:"deptStaffView",
			padding: 0,
			margin: 5,
			cols:[
			{rows:[
			{
                height: 35,
                view:"toolbar",
                elements:[
                    {view:"text", id:"grouplist_input",label:"查询员工",css:"fltr", 
                    filterMode:{level:1, showSubItems:1},}
                ]
            },
			{
					view: "grouplist",
					id: "lt_dept_stafflist",
					width:200,
					select:true,
					url:urlstr+"/WBStaffMng/getAllStaffs/IsOnJob/1/DSSuffix/"+_DSSuffix,
					templateGroup:"#value#<br> Results:#$count#",
					templateBack: "#value#<br> Results:#$count#",
				    templateItem:"#staffcode#- #staffname#<div class='marker  status#isonjob#' style='width:50px;'>&nbsp;</div>",
				    scheme:{$group:function(obj){return obj.deptsname; },}, 
					drag:"source",
					on:{
					onBeforeDrag:function(context, ev){//做数据校验
						var item_dept = $$("lt_deptlist").getSelectedItem();												
						if(!item_dept || !item_dept['deptcode'])
						{
							webix.message("请选择部门");
							return false;
						}
						
						
					    var lt_dept_stafflist = $$("lt_dept_stafflist");
						if(lt_dept_stafflist.getOpenState().parents.length===0)
						{
							webix.message("请选择员工");
							return false;
						}
						
					    return true;         
					}
				},
			}]},
			{view:"resizer"},
				{
					id:"dt_deptstaff",
					view:"datatable",
					editable:true,
					headerRowHeight:35,
					dragColumn:true,
						headermenu:{
						    width:250,
						    autoheight:false,
						    scroll:true
						},					
					save:urlstr+"/WBCURDMng/saveDeptStaff/DSSuffix/"+_DSSuffix,
					columns:[
						{id:"deletebutton2", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5},
						{ id:"isonjob",  header:"在职",template:"{common.checkbox()}",fillspace:0.7},
						{ id:"staffcode", header:"员工编号", fillspace:0.7},
						{ id:"staffname",header:"员工姓名" ,  fillspace:1},
						{ id:"reltype",  editor:"select",	header:["员工角色",{content:"selectFilter"}],options:['店长','审核人','仲裁人','观察员'], fillspace:2}
					],
					updateFromResponse:true,
					select:"row",
					drag:"target",
					
					externalData:function (data, id){
						var item_dept = $$("lt_deptlist").getSelectedItem();							
						data['deptcode'] = item_dept['deptcode'];
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
									webix.$$("dt_deptstaff").remove(id);
								}
							}
						});
					}}
				},
//				{}
			]

		}
	}
});