define(function(){
	return {
		$ui:{
			id:"deptStaffView",
			padding: 10,
			margin: 10,
			type:"wide",
			cols:[
			{
				view:"tree",
				template:"{common.icon()} {common.checkbox()}#deptsname# - #staffcode# - #staffname#",
				width:400,
				url:urlstr+"/WBStaffMng/getAllStaffs/DSSuffix/"+_DSSuffix
	
			},
				{
					id:"dt_deptstaff",
					view:"datatable",
					headerRowHeight:35,
					editable:true,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},					
					columns:[
						{ id:"_identify",	header:"#", fillspace:0.5},
						{ id:"isonjob",  header:"在职",template:"{common.checkbox()}",fillspace:0.7},
						{ id:"staffcode", header:"员工编号", fillspace:0.7},
						{ id:"staffname",header:"员工姓名" ,  fillspace:1},
						{ id:"reltype",  editor:"select",	header:["员工角色",{content:"selectFilter"}],options:['店长','审核人','仲裁人'], fillspace:2}
					],
////					autoheight:true,
//					maxheight:550,
//					rowHeight:40,
					select:"row"
//					url:"http://127.0.0.1/POAAdmin/index.php/Home/WBDeptMng/getDeptStaffs"
				},
//				{}
			]

		}
	}
});