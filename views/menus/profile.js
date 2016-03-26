define(function(){

return {
	$ui:{
		view: "submenu",
		id: "profilePopup",
		width: 200,
		padding:0,
		data: [
			{id: 1, icon: "user", value: "我的设置"},
			{id: 2, icon: "cog", value: "我的帐号"},
			{ $template:"Separator" },
			{id: 3, icon: "sign-in", value: "登陆"},
			{id: 4, icon: "sign-out", value: "退出"}
		],
		type:{
			template: function(obj){
				if(obj.type)
					return "<div class='separator'></div>";
				return "<span class='webix_icon alerts fa-"+obj.icon+"'></span><span class='profileitem'> "+obj.value+"</span>";
			}
		},
		onClick:{
			profileitem:function(e,id,node){
				if(id==3 || id==4) checkauthorization(true);
			}
		},

	}
};

});