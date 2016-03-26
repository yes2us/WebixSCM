define(["data/vipobject"],function(vipobject){
	return {
		$oninit:function(){	
			webix.dp.$$("dt_maintainvip").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;			
		},
		$invoke:function(deptcode,maintainercode){
			$$("lt_deptunmaintainedviplist").clearAll();
			 var postData = {BelongStoreCode:deptcode};
			 $$("lt_deptunmaintainedviplist").parse(vipobject.getVIPList(1,postData));
			 
			 $$("dt_maintainvip").clearAll();
			 postData = {MaintainerCode:maintainercode};
			 $$("dt_maintainvip").parse(vipobject.getVIPList(2,postData));
		},
		$ui:{
			id:"maintainVIPView",
			padding: 0,
			margin: 5,
			type:"wide",
			cols:[
			{
				view:"list",
				id:"lt_deptunmaintainedviplist",
				template:"#customercode# - #customername#",
				drag:'source', 
				select:true,
				width:250,
				on:{
					onBeforeDrag:function(context, ev){//做数据校验
					   
						var dragItem = this.getItem(context.start);

						var duplicated = $$("dt_maintainvip").find(function(obj){
							return obj.customercode === dragItem['customercode']; 
						});
						if(duplicated.length) 
						{
							webix.message("本记录已经存在");
							return false;
						}
						
					    return true;         
					}
				},
			},
				{
					id:"dt_maintainvip",
					view:"datatable",
					editable:true,
					headerRowHeight:35,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},					
					save:urlstr+"/WBCURDMng/saveStaffMaintainVIP/DSSuffix/"+_DSSuffix,
					columns:[
						{id:"deletebutton4", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						
						{ id:"reservevip",header:["保留会员",{content:"selectFilter"}] ,fillspace:1},
						{ id:"_identify",	header:"#", fillspace:1,hidden:true},
						{ id:"maintainercode",header:"维护人编号" , fillspace:1,hidden:true},
						{ id:"maintainername",header:["维护人" ,{content:"selectFilter"}] , fillspace:1},
						{ id:"customercode",  header:["会员编号",{content:"textFilter"}],fillspace:1},
						{ id:"customername", header:["会员姓名",{content:"textFilter"}], fillspace:1},
						{ id:"mobileno", header:["手机号",{content:"textFilter"}], fillspace:1},
						{ id:"anzbuynearity", header:["消费近度", {content:"numberFilter"}],fillspace:1}
					],
					select:"row",
					drag:"target",
					externalData:function (data, id){
						var item_subcriber = $$("lt_stafflist").getSelectedItem();							
						data['maintainercode'] = item_subcriber['staffcode'];
						data['maintainercode'] = item_subcriber['staffcode'];
						data['maintainername'] = item_subcriber['staffname'];
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
									webix.$$("dt_maintainvip").remove(id);
								}
							}
						});
					}
					},
//					pager:"maintainvip_pagerA"
				},
//				{
//						view: "toolbar",
//						css: "highlighted_header header6",
//						paddingX:5,
//						paddingY:5,
//						height:40,
//						cols:[{
//							view:"pager", 
//							id:"maintainvip_pagerA",
//							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
//							autosize:true,
//							height: 35,
//							group:5
//						}]
//					}
			]

		}
	}
});