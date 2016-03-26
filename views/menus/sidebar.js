define(["data/paraobject"],function(paraobject){
	
	return {
		$oninit:function(){
			$$("app:menu").clearAll();
			$$("app:menu").parse(paraobject.getWBMenu(webix.storage.local.get("_UserCode")));
		},
		$ui:{
			width: 150,
//			header:"menu",
//			body:{
			rows:[
				{
					view: "tree",
					id: "app:menu",
					type: "menuTree2",
					css: "menu",
					activeTitle: true,
					select: true,
					tooltip: {
						template: function(obj){
							return obj.$count?"":obj.details;
						}
					},
					on:{
						onBeforeSelect:function(id){
							if(this.getItem(id).$count){
								debugger;
								return false;
							}
							
						},
						onAfterSelect:function(id){
//							console.log(id);
							this.$scope.show("./"+id);
						}
					},
//					data:paraobject.get
//					url:urlstr+"/WBParaMng/getWBMenu/WBMenuType/wbmenu_admin/DSSuffix/eekabsc.com",
//					data:[
//						{id: "tyscoremng", value: "得分管理", open: true, data:[
//							{ id: "mng_mytask", value: "我的任务", icon: "tasks", details: "T分和Y分的审核以及仲裁,会员的邀约和维护"},
//							{ id: "qry_ranker", value: "排名查询", icon: "pencil-square-o", details: "c查询T分和Y分的各种排名"},
//							{ id: "qry_hotspots", value: "典型事件", icon: "star-o", $css: "orders", details:"典型的正面事件和负面事件"},
//							{ id: "mng_score", value: "得分查询", icon: "ticket", details: "管理T分Y分记录" },						
////							{ id: "mng_attendance", value: "考勤管理", icon: "calendar", details: "管理员工的考勤"},
//						]},
//						{id: "vipmng", value:"会员管理", open:true, data:[
//							{ id: "mng_vipinviteplan", value: "邀约计划", icon: "fax", details: "制定邀约计划" },
//							{ id: "mng_vipemotionplan", value: "维护计划", icon: "weixin", details: "制订维护计划" },
//							{ id: "mng_vipmngbasicinfo", value: "我的会员", icon: "book", details: "管理我的会员" }
//						]},
//						{id: "setting", value:"相关配置", open:true, data:[
//							{ id: "mng_dept", value: "部门管理", icon: "sitemap", details: "增加或修改部门资料,维护部门成员,部门工资,奖扣事件,月度目标" },
//							{ id: "mng_staff", value: "员工管理", icon: "users", details: "增加或修改员工,维护员工角色,奖扣事件,订阅对象,维护会员" },
////							{ id: "mng_role", value: "角色管理", icon: "user", details: "管理角色及其奖扣权限和任务",hidden:true},
//							{ id: "mng_event", value: "奖扣事件", icon: "list-alt", details: "维护奖扣事件" ,hidden:true},
//							{ id: "mng_para", value: "参数管理", icon: "cogs", details: "管理系统参数" ,hidden:true},
////							{ id: "mng_configuration", value: "配置管理", icon: "cogs", details: "管理系统参数" ,hidden:true},
//							{ id: "mng_debuginfo", value: "测试信息", icon: "cogs", details: "查询调试信息",hidden:true},
////							{ id: "usermng", value: "用户管理", icon: "users", details: "增加或修改员工,维护员工角色,奖扣事件,订阅对象,维护会员" },
////							{ id: "authmng", value: "权限管理", icon: "key", details: "管理用户的权限" }help.js
//							{ id: "help", value: "帮助视频", icon: "fa-question-circle", details: "操作帮助" }
//						]},
//					]
				}
			]
//			}
		}
	};

});
