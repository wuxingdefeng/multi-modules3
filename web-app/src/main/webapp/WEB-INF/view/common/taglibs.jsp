<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%String path = request.getContextPath();%>
<%String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"//";%>
<%String contextPath = request.getContextPath();%>
<%String version = "20161111";%>

<%
Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
Cookie[] cookies = request.getCookies();
if (null != cookies) {
	for (Cookie cookie : cookies) {
		cookieMap.put(cookie.getName(), cookie);
	}
}
String easyuiTheme = "default";//指定如果用户未选择样式，那么初始化一个默认样式
if (cookieMap.containsKey("easyuiTheme")) {
	Cookie cookie = (Cookie) cookieMap.get("easyuiTheme");
	easyuiTheme = cookie.getValue();
}
%>
<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<script type="text/javascript">
var sy = sy || {};
sy.contextPath = '<%=contextPath%>';
sy.basePath = '<%=basePath%>';
sy.version = '<%=version%>';
sy.pixel_0 = '<%=contextPath%>/style/images/pixel_0.gif';//0像素的背景，一般用于占位
</script>



<script type="text/javascript">
var  contextPath="<%=contextPath%>";
	var  rootPath="<%=basePath %>";
</script>


<%-- 引入jQuery --%>
<%
 String User_Agent = request.getHeader("User-Agent");
if (StringUtils.indexOfIgnoreCase(User_Agent, "MSIE") > -1 && (StringUtils.indexOfIgnoreCase(User_Agent, "MSIE 6") > -1 || StringUtils.indexOfIgnoreCase(User_Agent, "MSIE 7") > -1 || StringUtils.indexOfIgnoreCase(User_Agent, "MSIE 8") > -1)) {
	out.println("<script src='" + contextPath + "/static/easyui_lib/jquery-1.9.1.js' type='text/javascript' charset='utf-8'></script>");
} else {
	out.println("<script src='" + contextPath + "/static/easyui_lib/jquery-2.0.3.js' type='text/javascript' charset='utf-8'></script>");
}  
%>
<%-- 引入my97日期时间控件 --%>
<script type="text/javascript" src="<%=contextPath%>/static/easyui_lib/My97DatePicker4.8Beta3/My97DatePicker/WdatePicker.js" charset="utf-8"></script>

<%-- 引入jquery扩展 --%>
<script src="<%=contextPath%>/static/easyui_lib/syExtJquery.js?version=<%=version%>" type="text/javascript" charset="utf-8"></script>


<%-- 引入EasyUI --%>
<link id="easyuiTheme" rel="stylesheet" href="<%=contextPath%>/static/easyui_lib/jquery-easyui-1.3.4/themes/<%=easyuiTheme%>/easyui.css" type="text/css">
<link rel="stylesheet" href="<%=contextPath%>/static/easyui_lib/jquery-easyui-1.3.4/themes/icon.css" type="text/css">
<script type="text/javascript" src="<%=contextPath%>/static/easyui_lib/jquery-easyui-1.3.4/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=contextPath%>/static/easyui_lib/jquery-easyui-1.3.4/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<%-- 引入EasyUI Portal插件 --%>
<link rel="stylesheet" href="<%=contextPath%>/static/easyui_lib/jquery-easyui-portal/portal.css" type="text/css">
<script type="text/javascript" src="<%=contextPath%>/static/easyui_lib/jquery-easyui-portal/jquery.portal.js" charset="utf-8"></script>

<%-- 引入easyui扩展 --%>
<script src="<%=contextPath%>/static/easyui_lib/syExtEasyUI.js?version=<%=version%>" type="text/javascript" charset="utf-8"></script>

<%-- 引入javascript扩展 --%>
<script src="<%=contextPath%>/static/easyui_lib/syExtJavascript.js?version=<%=version%>" type="text/javascript" charset="utf-8"></script>

<%--自定义扩展开始 --%>
<link rel="stylesheet" href="<%=contextPath %>/static/common/common.css" type="text/css">
<script type="text/javascript" src="<%=contextPath %>/static/common/common.js"></script>
<%--自定义扩展结束 --%>

<link rel="stylesheet" type="text/css" href="<%=contextPath%>/static/easyui_lib/style/style.css">
<script type="text/javascript" src="<%=contextPath %>/static/easyui_lib/js/jqextend.js"></script>
<script type="text/javascript" src="<%=contextPath %>/static/easyui_lib/js/base.js"></script>
<script type="text/javascript" src="<%=contextPath %>/static/easyui_lib/js/dateFormat.js"></script>
<script type="text/javascript" src="<%=contextPath %>/static/easyui_lib/js/utils.js"></script>
<link rel="stylesheet" href="<%=contextPath %>/static/easyui_lib/style/syExtCss.css" type="text/css">
<link rel="stylesheet" href="<%=contextPath %>/static/easyui_lib/style/syExtIcon.css" type="text/css">
<link rel="stylesheet" href="<%=contextPath %>/static/easyui_lib/style/new-icon.css" type="text/css">

<script type="text/javascript" src="<%=contextPath %>/static/easyui_lib/js/zephyr/zephyr.web.utils.js"></script>

<link rel="stylesheet" href="<%=contextPath %>/static/layer/skin/layui.css" type="text/css">
<script type="text/javascript" src="<%=contextPath %>/static/layer/layer.js"></script>

<script type="text/javascript" src="<%=basePath%>/static/layer/layui.js"></script>