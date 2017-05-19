var sy = sy || {};
//$.ajaxSetup({ 
//	error: function (XMLHttpRequest, textStatus, errorThrown){
//		if(XMLHttpRequest.status==403){
//			alert('您没有权限访问此资源或进行此操作');
//			return false;
//		}
//	},  
//	complete:function(XMLHttpRequest,textStatus){   
//		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头,sessionstatus， 
//        alert(sessionstatus);
//				if(sessionstatus=='timeout'){   
//			//如果超时就处理 ，指定要跳转的页面  
//			var top = getTopWinow(); //获取当前页面的顶层窗口对象
//			alert('登录超时, 请重新登录.'); 
//			top.location.href=path+"/login.jsp"; //跳转到登陆页面
//		}   
//	}   
//}); 
$(function() {
	if( jQuery.isEmptyObject($('#dg'))){
		var p = $('#dg').datagrid('getPager');  
		$(p).pagination({  
			pageSize: 20,//每页显示的记录条数，默认为10  
			pageList: [20,50,100]//可以设置每页记录条数的列表  
		});}
});

function addTab(title, url){
	parent.addTab(title,url);
}	
function closeTab(title){
	parent.closeTab(title);
}
/**
 * 日期格式化 pattern yyyy-MM-dd HH:mm:ss
 */
function convertMsToDate(v, r, i) {
	if(!v) return "";
	if (v.length == 10) {
		v = v * 1000;
	}
	//var newTime = new Date(new Number(v)).toLocaleString().replace(/:\d{1,2}$/, ' ');
	var newTime = new Date(new Number(v)).format("yyyy-MM-dd HH:mm:ss");
	return newTime;
}
function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
var sy = sy || {};

sy.modalDialog = function(options) {
	var opts = $.extend({
		title : '&nbsp;',
		width : 680,
		height : 480,
		modal : true,
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
	if (options.url) {
		opts.content = '<iframe id="" src="' + options.url + '" allowTransparency="true" scrolling="auto" width="100%" height="98%" frameBorder="0" name=""></iframe>';
	}



	return $('<div/>').dialog(opts);
};


sy.serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (this['value'] != undefined && this['value'].length > 0) {// 如果表单项的值非空，才进行序列化操作
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		}
	});
	return o;
};




