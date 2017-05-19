/**
 * grid 时间戳转换成 'yyyy-MM-dd HH:mm:ss'
 * @param {Object} v
 * @param {Object} r
 * @param {Object} i
 * @return {TypeName} 
 */
function formatDateTime(v,r,i){
	if(!v) return "";
	//alert(v.getTime());
	return v.replace(/T/," ");
}
function dateFormatter(v,r,i){
	if(v!=null&&v!=''){
		var date=new Date(v);
		return date.format('yyyy-mm-dd HH:MM:ss');
	}else{
		return "暂无";
	}
}
$(".NumDecText").keyup(function(){    
	$(this).val($(this).val().replace(/[^0-9.]/g,''));    
}).bind("paste",function(){  //CTR+V事件处理    
	$(this).val($(this).val().replace(/[^0-9.]/g,''));     
}).css("ime-mode", "disabled"); //CSS设置输入法不可用   
/**
 * grid 时间戳转换成 'yyyy-MM-dd HH:mm:ss'
 * @param {Object} v
 * @param {Object} r
 * @param {Object} i
 * @return {TypeName} 
 */
function formatDate(v, r, i) {
	if(!v) return "";
	return v.replace(/T/," ").slice(0,10);
}
$(function(){     
	/*JQuery 限制文本框只能输入数字*/  
	$(".NumText").keyup(function(){    
		$(this).val($(this).val().replace(/D|^0/g,''));  
	}).bind("paste",function(){  //CTR+V事件处理    
		$(this).val($(this).val().replace(/D|^0/g,''));     
	}).css("ime-mode", "disabled"); //CSS设置输入法不可用    

	/*JQuery 限制文本框只能输入数字和小数点*/  
	$(".NumDecText").keyup(function(){    
		$(this).val($(this).val().replace(/[^0-9.]/g,''));    
	}).bind("paste",function(){  //CTR+V事件处理    
		$(this).val($(this).val().replace(/[^0-9.]/g,''));     
	}).css("ime-mode", "disabled"); //CSS设置输入法不可用    
});
//导出excel 带有搜索 以及分页公共 js
function excelParams(obj,url){
	var ob=$(".datagrid-view2 .datagrid-header-inner").find(".datagrid-header-row");
	var i=0;
	var params="";
	$(ob).find("td").each(function(){
		if($(this).css("display")!="none"){
			var key=$(this).find("span").html();
			var value=$(this).attr("field");
			params+="lis["+i+"].title="+key+"&lis["+i+"].code="+value+"&";
			i++;
		}
	});
	//便利搜索条件
	//--input
	var seachObj=$(obj).closest("#searchForm");
	$(seachObj).find("input").each(function(){
		var name=$(this).attr("name");
		var val=$(this).val();
		if(name!=null&&typeof(name)!="undefined"&&val!=""&&val!=null&&typeof(val)!="undefined"){
			params+=name+"="+$(this).val()+"&";
		}
	});
	//--select
	$(seachObj).find("select").each(function(){
		var name=$(this).attr("name");
		var val=$(this).val();
		if(name!=null&&typeof(name)!="undefined"&&val!=""&&val!=null&&typeof(val)!="undefined"){
			params+=name+"="+$(this).val()+"&";
		}
	});
//	var pageSize=$(".pagination-page-list").val();
//	var currentPage=$(".pagination-num").val();
//	params+="&pageSize="+pageSize+"&currentPage="+currentPage;
	params=params.substring(0,params.length-1);
//	$.messager.confirm('确认','请确认需要导出的是否查询过?',function(a){
//		if(a){
			$(obj).attr("href",url+"?"+params);
//		}
//	});
}