define([], function() {
	var vipObject = new Object();
	
	
	vipObject.getVIPList = function(fieldStrIndex,_postData) {
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
		postData.VIPMngEnabled = 1;
		postData.DSSuffix = _DSSuffix;
		if(fieldstr)  postData.FieldStr = fieldstr;
				
//		if(vipcode) postData.CustomerCode = vipcode;
//		if(belongStoreCode) postData.BelongStoreCode = belongStoreCode;
//		if(maintainerCode)  postData.MaintainerCode = maintainerCode;
//		if(anzbuyhabitquad)  postData.AnzBuyHabitQuad = anzbuyhabitquad;
//		if(isreserved) postData.IsReserved= isreserved;
		

		return webix.ajax().post(urlstr+"/WBVIPMng/getVIPList",postData);
	}

	vipObject.getSingleVIPBasicDetail=function(vipcode){
		return webix.ajax().post(urlstr+"/WBVIPMng/getSingleVIPBasicDetail",{CustomerCode:vipcode,DSSuffix:_DSSuffix});
	}
	
	vipObject.saveSingleVIPBasicDetail=function(vipInfos){
		vipInfos.DSSuffix=_DSSuffix;
		return webix.ajax().post(urlstr+"/WBCURDMng/saveVIPInfo",vipInfos);
	}
		
	vipObject.getContRecord = function(vipcode) {
		return webix.ajax().post(urlstr+"/WBVIPMng/getContRecord",{CustomerCode:vipcode,DSSuffix:_DSSuffix});
	}

	vipObject.getSaleSpan= function(vipcode) {
		return webix.ajax().post(urlstr+"/WBVIPMng/getSaleSpan",{CustomerCode:vipcode,DSSuffix:_DSSuffix});
	}
	
	vipObject.getSaleRecord= function(vipcode) {
		return webix.ajax().post(urlstr+"/WBVIPMng/getSaleRecord",{CustomerCode:vipcode,DSSuffix:_DSSuffix});
	}
		
	vipObject.getStoreQuadInfo = function(storeCode,yearMonth) {
		var postData = {DSSuffix:_DSSuffix};
		if(storeCode) postData.StoreCode = storeCode;
		if(yearMonth)  postData.YearMonth = yearMonth;
		
		return webix.ajax().post(urlstr+"/WBVIPMng/getStoreQuadInfo",postData);
	}
	
	vipObject.getCurMonthPlan = function(deptcode,staffcode,maintaintype) {
		var postData = {DSSuffix:_DSSuffix};
		if(deptcode) postData.DeptCode = deptcode;
		if(staffcode)  postData.StaffCode = staffcode;
		if(maintaintype)  postData.MaintainType = maintaintype;
		
		return webix.ajax().post(urlstr+"/WBVIPMng/getCurMonthPlan",postData);
	}
		
	vipObject.getVIPTEMPTrend = function(vipcode,showdays){
		return webix.ajax().post(urlstr+"/WBVIPMng/getVIPTEMPTrend",{DSSuffix:_DSSuffix,CustomerCode:vipcode,ShowDays:showdays});
	}
	
	return vipObject;
});