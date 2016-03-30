define([],function(){
	var _UserCode = webix.storage.local.get('_UserCode');
	var _UserObject = JSON.parse(webix.storage.local.get('UserObject'));
	
	var deptStaffs = [];
	_UserObject['myrelpersons'].forEach(function(item){
		if(item['reltype']==='部门员工' && item['isonjob'])
		{
			deptStaffs.push({id:item['staffcode'],value:item['staffcode'],staffname:item['staffname']})
		}
	});
	
		var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:5,
		paddingY:5,
		height:35,
		cols:[
			{
				template: "<span class='webix_icon fa-star-o'></span>部门所有会员", "css": "sub_title2", borderless: true
			},
		]
	};
	
	var popup = webix.ui({
			view:"gridsuggest",
			body:{
				columns:[
					{id:"value", header:"员工编号", width:100},
					{id:"staffname", header:"员工姓名", width:100}
				]
			}
			
		});
		
	var mydeptvip = {
					id:"dt_mydeptvip",
					view:"datatable",
					editable:true,
					headerRowHeight:35,
					save:urlstr+"/WBCURDMng/saveStaffMaintainVIP/DSSuffix/"+_DSSuffix,
					columns:[
						{ id:"isreserved",header:["保留会员",{content:"selectFilter"}] ,template:"{common.checkbox()}",width:100},
						{ id:"_identify",	header:"#", fillspace:1,hidden:true},
						{ id:"maintainercode",header:"维护人编号" , fillspace:1,
							editor:"richselect",collection:deptStaffs,popup:popup
						},
						{ id:"maintainername",header:["维护人" ,{content:"selectFilter"}] , fillspace:1},
						{ id:"customercode",  header:["会员编号",{content:"textFilter"}],fillspace:1},
						{ id:"customername", header:["会员姓名",{content:"textFilter"}], fillspace:1},
						{ id:"mobileno", header:["手机号",{content:"textFilter"}], fillspace:1},
						{ id:"anzbuynearity", header:["消费近度", {content:"numberFilter"}],fillspace:1}
					],
					select:"row",
					 on:{		
						        "onAfterEditStop":function(state, editor, ignoreUpdate){
						        var id = $$("dt_mydeptvip").getSelectedId();
					 			var row = $$("dt_mydeptvip").getSelectedItem();
					 			
						        	deptStaffs.forEach(function(item){
						        		if(item.id == state.value)
						        		{
						        			row['maintainername'] = item.staffname;
						        			return;
						        		}
						        	});
						            $$("dt_mydeptvip").updateItem(id,row);
						        }
					  },
					pager:"pagerA"
			};
			
	var footer = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:35,
						cols:[
						{
							view:"pager", id:"pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:10
						}]
					};
	
	return {
		$oninit:function(){		webix.dp.$$("dt_mydeptvip").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});},
		$ui:{
			id:"vipmngMyVIPView",
//			padding: 10,
//			margin: 10,
			type:"clean",
			rows:[
				titleBar,
				mydeptvip,
				footer
			]

		}
	}
});