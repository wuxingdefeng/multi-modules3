
<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html>
<html>
<body>
<h2>Hello World!</h2>
<div>
    <form id="form" action="/goHome">
        用户名： <input type="text" name="userName" id="userName">
        <input type="submit" value="登录" >

    </form>

</div>

<script type="text/javascript">

</script>
</body>
</html>