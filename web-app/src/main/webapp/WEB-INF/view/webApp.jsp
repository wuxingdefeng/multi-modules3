<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<html>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<body>
<h2>Hello World!</h2>

<div style="margin: 0 auto;height: 60px;width: 100px;background-color: #FF0000;">
    <a style="display: block;width: 100%;height: 100%;text-align: center;line-height:60px;" onclick="window.location.href='/login'">登录</a>
</div>
</body>
</html>