define(
[],
function(){
	var _UserCode = webix.storage.local.get('_UserCode');
		
	return {
		$ui:{
			width:150,
			type: "clean",
			css: "highlighted_header header5",
			header:"店铺列表",
			body:{
			rows:[

//				{view: "label",label: "选择店铺"},
				{					
					view: "grouplist",
					id: "lt_inviteplanlist",
					select: true,
					url:urlstr+"/WBDeptMng/getDeptList/VIPMngEnabled/1/StaffCode/"+_UserCode+"/DSSuffix/"+_DSSuffix,
				    template:"#deptsname#",
				    
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
			}
		}
	}
});