define(function(){
	    var tr_fixedEvent = {
            view:"list",
            id:"tr_fixedEvent",
            url:urlstr+"/WBStaffMng/getStaffFixedEvent/ShowType/AllEvent/DSSuffix/"+_DSSuffix,
            width:200,
            select:true,
            drag:"source",
//          template:"{common.icon()} {common.checkbox()} #eventcode# - #eventtype# - #event#",
            template:"#eventtype# - #event#",
			on:{
					onBeforeDrag:function(context, ev){//做数据校验
					    var lt_stafflist = $$("lt_stafflist");
						var item_staff = lt_stafflist.getSelectedItem();												
						if(lt_stafflist.getOpenState().parents.length===0 || !item_staff || !item_staff['staffcode'])
						{
							webix.message("请选择员工");
							return false;
						}

						var dragItem = $$("tr_fixedEvent").getItem(context.start);
						var duplicated = $$("dt_fixedevent").find(function(obj){
							return obj.eventcode === dragItem['eventcode']; 
						});
						if(duplicated.length) 
						{
							webix.message("本记录已经存在");
							return false;
						}
						
					    return true;         
					}
			}
       };

	return {
		$oninit:function(){
			webix.dp.$$("dt_fixedevent").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix});			
			
			webix.dp("dt_fixedevent").attachEvent("onAfterInsert",
			function(response, id, object){
				$$("dt_fixedevent").getItem(id)._identify = response;
				$$("dt_fixedevent").refresh();
			});
		},
		$ui:{
			id:"fixedEventView",
			padding: 0,
			margin: 5,
			type:"wide",
			cols:[
			tr_fixedEvent,
			{view:"resizer"},
			{
					id:"dt_fixedevent",
					view:"datatable",
					headerRowHeight:35,
					editable:false,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
					save:urlstr+"/WBCURDMng/saveStaffFixedScore/DSSuffix/"+_DSSuffix,
					columns:[
						{id:"deletebutton2", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"iskeyevent", header:"关键",template:"{common.checkbox()}",fillspace:0.5},
						{ id:"deliveryway", header:["奖扣方式",{content:"selectFilter"}]},
						{ id:"staffcode", header:"员工编号",width:100},												
						{ id:"eventscope",header:["事件范围",{content:"selectFilter"}],width:100},
						{ id:"eventtype",header:["事件类型",{content:"selectFilter"}],width:100},
						{ id:"event",header:"事件内容", fillspace:2.5},
					],
					rowHeight:40,
					select:"row",
					drag:"target",
					externalData:function (data, id){
						var item_role = $$("lt_stafflist").getSelectedItem();							
						data['staffcode'] = item_role['staffcode'];
						data['staffname'] = item_role['staffname'];
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
									webix.$$("dt_fixedevent").remove(id);
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