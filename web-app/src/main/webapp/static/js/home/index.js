var popDialog;
$(function() {
	tabCloseEven();
//	$("#wnav").accordion( {
//		animate : false
//	});

//	loadMenu();//加载菜单信息

	//主页加载信息
	//	//绑定修改密码事件
	bindEditPassword();
//	bindSavePassword();
	bindLoginOut();
	updatePassword();
	
});

function updatePassword(){
	//修改密码
	$('#dlg-save').click(function(){
		 var newPasswor = $("#newPassword").val();
		 var comfirmPassword = $("#comfirmPassword").val();
		 if(newPasswor != comfirmPassword){
			 $.messager.alert('错误','新密码和确认密码不一致！！');  
			 return;
		}
		$('#fm').form('submit', {
			url : 'sysadmin/updatePwd?type=1',
			onSubmit : function() {
				return $(this).form('validate');
			},
			success : function(result) {
				result=jQuery.parseJSON(result);
				if(result.success==true){
					$('#dlg').dialog('close');
					$.messager.alert('信息','保存成功！');  
				}else{
					$.messager.alert('错误',result.errorMsg);  
				}
			}
		});
		
	});
}

function loadMenu() {

//	$.ajax( {
//		type : "POST",
//		url : "index/login!findMenuInfo.do",
//		success : function(result) {
//			result = jQuery.parseJSON(result);
//			if (result.success == true) {
//				addNav(result.data)
//				menu_class();
//			}
//		}
//	});
		$('.cs-navi-tab').parent().parent().click(function() {
		var $this = $(this).children(':first').children(':first');
		var href = $this.attr('src');
		var title = $this.text();
		addTab(title, href);
	});
	

}
function menu_class() {
	$('#main_menu a').click(function() {
		$('#main_menu a').removeClass('active');
		$(this).addClass('active');

	});
}
function addNav(data) {
//	$.each(data, function(i, sm) {
//		var menulist = "";
//		menulist += '<ul id="main_menu">';
//		$.each(sm.menus, function(j, o) {
//			menulist += '<li><a href="javascript:void(0);" class="cs-navi-tab" src="'
//				+ o.url + '"><div style="padding-left: 25px;">' + o.menuName
//					+ '</div></a></li> ';
//		});
//		menulist += '</ul>';
//
//		$('#wnav').accordion('add', {
//			title : sm.menuName,
//			content : menulist,
//		});
//		
//		$('.cs-navi-tab').click(function() {
//		var $this = $(this);
//		var href = $this.attr('src');
//		var title = $this.text();
//		addTab(title, href);
//	});
//
//	});

//	var pp = $('#wnav').accordion('panels');
//	var t = pp[0].panel('options').title;
//	$('#wnav').accordion('select', t);
//	$('.cs-navi-tab').click(function() {
//		var $this = $(this);
//		var href = $this.attr('src');
//		var title = $this.text();
//		addTab(title, href);
//	});

}
//function addNav(data) {
//    var pMenuDiv='<div class="easyui-panel" style="padding: 3px 0px 0px 20px;">';
//	 var cMenuDiv='';
//	$.each(data, function(i, sm) {
//	    pMenuDiv +='<a href="#" class="easyui-menubutton" data-options="menu:\'#'+sm.menuid+'\',iconCls:\'icon-book\'">Edit</a>';
//		cMenuDiv += '<div id="'+sm.menuid+'" style="width:150px;">';
//		$.each(sm.menus, function(j, o) {
//			cMenuDiv+='<div data-options="iconCls:\'icon-book\'"><a href="'+o.url+'" class="cs-navi-tab">'+o.menuName+'</a></div>'
//					
//			
//		});
//		cMenuDiv += '</div>';
//	
//	$('.cs-navi-tab').click(function() {
//		var $this = $(this);
//		var href = $this.attr('src');
//		var title = $this.text();
//		addTab(title, href);
//	});
//
//	});
//	pMenuDiv +="</div>"
//	//alert(pMenuDiv+cMenuDiv);
//	$('#menu_bar').append(pMenuDiv+cMenuDiv)
//
//}
function addTab(title, url){
	if ($('#tabs').tabs('exists', title)){
		$('#tabs').tabs('select', title);//选中并刷新
		var currTab = $('#tabs').tabs('getSelected');
//		var url = $(currTab.panel('options').content).attr('src');
//		if(url != undefined && currTab.panel('options').title != 'Home') {
//			$('#tabs').tabs('update',{
//				tab:currTab,
//				options:{
//					content:createFrame(url)
//				}
//			})
//		}
		$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url)
				}
			})
	} else {
		var content = createFrame(url);
		$('#tabs').tabs('add',{
			title:title,
			content:content,
			closable:true
		});
	}
	tabClose();
}
function closeTab(title){
	$('#tabs').tabs('close', title);
}
function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:99.5%;"></iframe>';
	return s;
}
		
function tabClose() {
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}		
//绑定右键菜单事件
function tabCloseEven() {
	//刷新
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if(url != undefined && currTab.panel('options').title != 'Home') {
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url)
				}
			})
		}
	})
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			if(t != '首页') {
				$('#tabs').tabs('close',t);
			}
		});
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		var nextall = $('.tabs-selected').nextAll();		
		if(prevall.length>0){
			prevall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != '首页') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		if(nextall.length>0) {
			nextall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != 'Home') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		return false;
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			//msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}
function editUserPassword(){
    
	
}
function bindEditPassword(){
	$('#editPassword').click(function(){
	 $('#dlg').dialog('open').dialog('setTitle','修改密码');
	});
}
//function bindSavePassword(){
//	$('#dlg-save').click(function(){
//	 
//		$('#fm').form('submit', {
//			url : 'index/login!editPassword.do',
//			onSubmit : function() {
//				return $(this).form('validate');
//			},
//			success : function(result) {
//				result=jQuery.parseJSON(result);
//				if(result.success==true){
//					$('#dlg').dialog('close');
//					$.messager.alert('信息','保存成功！');  
//				}else{
//					$("#pwderrorMsg").html(result.errorMsg);
//				}
//
//			}
//		});
//		
//	});
//}

function bindLoginOut(){
	$('#loginOut').click(function(){
	 	$.messager.confirm('确认','是否确认退出？',function(r){    
		    if (r){    
			       $.post("exit",function(result){
			    	   window.location.reload();
			    	});
		    }    
	 	});
	});
}


