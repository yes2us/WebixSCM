define(
	[],
function(){
	return {
		$ui:{
			width:250,
			type: "clean",
			css: "highlighted_header header5",
			header:"选择部门",
			body:{
			rows:[
//				{view: "label",label: "请选择部门"},
				{
					view: "list",
					id: "lt_deptlist",
					select: true,
					template: "<div class='marker status#enabled#'></div>#deptcode# - #deptsname#",
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
			}
		}
	}
});