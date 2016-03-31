define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var storeObject = new Object();
	
	storeObject.getRegionList = function(){
		return webix.ajax().post(urlstr+"/WBPartyMng/getRegionList",{MaintainerCode:_UserCode,FieldStr:"PartyCode,PartyName"});
	}
	
	storeObject.getStoreList = function(_postData) {
		var fieldstr = null;
		if(fieldStrIndex)
		{
			switch (fieldStrIndex){
								
				case 1:
				fieldstr   = "customers._Identify, (case when IsReserved=1 then '保留' else '放弃' end) ReserveVIP ,IsReserved,[CustomerCode],[CustomerName],MaintainerCode,isnull(StaffName,'(无人维护)') MaintainerName,"
				fieldstr += "BelongStoreCode,isnull(DeptSName,'(无归属店铺)') DeptSName,MobileNo,PlanInviteDate,PlanInviteContent,AnzBuyHabitQuad,AnzRelationLevel";
					break;
					
				case 2:
				fieldstr   = "customers._Identify,(case when IsReserved=1 then '保留' else '放弃' end) ReserveVIP,IsReserved,[CustomerCode],[CustomerName],MaintainerCode,isnull(StaffName,'(无人维护)') MaintainerName,MobileNo,";
				fieldstr += "[AnzBuyNearity],[AnzMidTermBuyMoney],[AnzMidTermBuyFreq],AnzStateLevel,AnzImportantLevel,PlanInviteDate,PlanInviteContent,AnzBuyHabitQuad,AnzRelationLevel,";
				fieldstr += "ROW_NUMBER() over (partition by AnzBuyHabitQuad order by AnzBuyNearity) QuadRankNo";
					break;
					
				default:
					break;
			}
		}
			
		var postData = _postData;
		postData.FieldStr = fieldstr;
				
		return webix.ajax().post(urlstr+"/WBStoreMng/getStoreList",postData);
	}

		

	return storeObject;
});