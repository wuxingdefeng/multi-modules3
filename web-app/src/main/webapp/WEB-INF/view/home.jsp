<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/taglibs.jsp"%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=mode">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title >主页</title>
    <link rel="stylesheet" href="<%=basePath%>/static/extends_layer/layer_.css" type="text/css">
    <script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
    <link rel="stylesheet" type="text/css"
          href="<%=basePath%>/static/easyui_lib/home/index.css">
    <script type="text/javascript" src="<%=basePath%>/static/js/home/index.js"></script>
    <style type="text/css">
        <!-- 	/** 手风琴样式 **/ -->
        .accordion{
            background:#fff;
            overflow:hidden;
            border: 0px;
        }

        .accordion .accordion-header{
            background:#ffffff;
            border-top-width:0;
            cursor:pointer;
            height: 21px;
            border-bottom: 1px solid #CCC;
        }
        .accordion .accordion-header .panel-title{
            font-weight:normal;
        }
        .accordion .accordion-header-selected .panel-title{
            font-weight:bold;
            color:#b63b4d;
            font-size: 14px;

            cursor: pointer;
            display: block;
            font-size: 14px;
            font-weight: 700;
            position: relative;
            -webkit-transition: all 0.4s ease;
            -o-transition: all 0.4s ease;
            transition: all 0.4s ease;
        }
        .accordion-noborder .accordion-header{
            border-width:0 0 1px;
        }
        .accordion-noborder .accordion-body{
            border-width:0px;
        }
        <!-- /** 菜单easyui-tree样式修改 **/ -->
        .easyui-tree-add .tree-node .tree-indent{
            margin-left: -8px;
        }
        .easyui-tree-add .tree-node{
            height: 30px;
        }
        .easyui-tree-add li .tree-node .tree-title{
            line-height: 30px
        }
        .easyui-tree-add li .tree-node-selected{
            font-size: 15px;
        }
        .easyui-tree-add .tree-node .tree-file{
            height: 0px;
            width: 0px;
        }
        .tree-node{border-bottom:1px dashed #bababa;}
        .easyui-tree-add li{
            background: #fff;
            font-size: 14px;
        }
        .panel .accordion-body{
            height: 100%;
        }
        /**** pen***/
        .panel .panel-header-noborder{
            height:19px;
        }
        .panel-title{height:19px;line-height:22px;}
        .head-right{line-height:54px;}
        #dlg tr td{padding:5px 5px;}
        #msgg{background-color:#d2e0f2 ;border-radius:24px;font-size:12px;
            display:inline-block;text-align:center;height:24px;width:24px;
            line-height:24px;color:red;position:absolute;margin-top:25px;margin-left:31px;}
    </style>



    <script type="text/javascript" >

        $(function(){
//            $("#leftAccordion").accordion({ //初始化accordion
//                fillSpace:true,
//                fit:true,
//                border:false,
//                animate:false
//            });

            <%--var url = '<%=contextPath%>/menu/getMenus';--%>
            <%--var url2='<%=contextPath%>/menu/getMenus2';--%>
            <%--//菜单树形加载--%>
            <%--$.post(url,function (data) {--%>
                <%--$.each(data, function (i, e) {//循环创建手风琴的项--%>
                    <%--var id = e.id;--%>
                    <%--$('#leftAccordion1').accordion('add', {--%>
                        <%--title: e.text,--%>
                        <%--content: '<ul id="tree'+id+'"  class="easyui-tree-add"></ul>',--%>
                        <%--selected: true,--%>
                        <%--iconCls:e.iconCls//e.Icon--%>
                    <%--});--%>
                    <%--$.parser.parse($("#leftAccordion1").parent());--%>

                    <%--$.get(url2+"?ID="+id, function(data) {//循环创建树的项--%>
                        <%--$("#tree" + id).tree({--%>
                            <%--data: data,--%>
                            <%--onClick : function(node){--%>
                                <%--var tabTitle = node.text;--%>
                                <%--var sysUrl=node.attributes.url;--%>
                                <%--var url=sysUrl;--%>
                                <%--if(sysUrl.indexOf("http")<0){--%>
                                    <%--url = <%=contextPath%>/+sysUrl;--%>
                                <%--}--%>
                                <%--var icon = node.iconCls;--%>
                                <%--addTab(tabTitle, url);--%>
                            <%--}--%>
                        <%--});--%>
                        <%--$.parser.parse($("#leftAccordion1").parent());--%>
                    <%--}, 'json');--%>
                <%--});--%>
            <%--}, "json");--%>

// 测试打开tab页面
            <%-- $('#tree1').tree({
                onClick : function(node){
                    var tabTitle = node.text;
                    var url = "<%=contextPath%>/showstyle_show";
                    addTab(tabTitle, url);
                }
                var datas=e.children;
                        $.parser.parse($("#leftAccordion1").parent());
                        $("#tree"+id).tree({
                                data: datas,
                                onClick : function(node){
                                        var tabTitle = node.text;
                                        var url = <%=contextPath%>/+node.attributes.url;
                                        var icon ="";
                                        addTab(tabTitle, url);
                                }
                      });

            });   --%>
        });
    </script>
</head>
<body class="easyui-layout">
<div data-options="region:'north',border:false" >
    <div id="header" class="head-north">
	    	   <span class="head head-right">
	    	        <a href="javascript:void(0)" class="header-link"  style="position:relative;"data-options="iconCls:'icon-user'">
	    	             <font id="msgg">99</font>
                             <img src="<%=basePath%>/static/sys_images/adminHend.jpg" style="width:43px;height:43px;margin-right:13px;border-radius:43px;" id="adminHeand">

	    	       </a>
	    	        <input type="hidden" name="loginID" value="小明">
					<a 	href="javascript:void(0)" class="header-link" data-options="iconCls:'icon-user'">欢迎:小明</a>
					<a   href="javascript:void(0)" class="changepwd header-link"	data-options="iconCls:'icon-edit'" id="editPassword">修改密码</a>
					<a	href="javascript:void(0)" class="loginOut header-link" data-options="iconCls:'icon-user_go'" id="loginOut">安全退出</a>
					</span>
        <span class="head-left"> 掘客后台管理系统</span>
    </div>
</div>
<!-- 菜单加载 -->
<div data-options="region:'west',split:true,title:'主菜单',border:false" style="width:185px;">
    <div id="leftAccordion1" class="easyui-accordion" data-options="fit:true,width:185">
        <div title="Language" data-options="iconCls:'icon-ok'" style="overflow:auto;padding:10px;">
            <p>A programming language is a formal language designed to communicate instructions to a machine, particularly a computer. Programming languages can be used to create programs that control the behavior of a machine and/or to express algorithms precisely.</p>
        </div>
        <div title="Java" style="padding:10px;">
            <p>Java (Indonesian: Jawa) is an island of Indonesia. With a population of 135 million (excluding the 3.6 million on the island of Madura which is administered as part of the provinces of Java), Java is the world's most populous island, and one of the most densely populated places in the world.</p>
        </div>
        <div title="C#" style="padding:10px;">
            <p>C# is a multi-paradigm programming language encompassing strong typing, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines.</p>
        </div>
        <div title="Ruby" style="padding:10px;">
            <p>A dynamic, reflective, general-purpose object-oriented programming language.</p>
        </div>
        <div title="Fortran" style="padding:10px;">
            <p>Fortran (previously FORTRAN) is a general-purpose, imperative programming language that is especially suited to numeric computation and scientific computing.</p>
        </div>

    </div>
</div>
<!-- 首页放置 -->
<div data-options="region:'center'" >
    <div id="tabs" class="easyui-tabs" border="false" fit="true" style="height: 26px;">
        <div id="home" style="overflow: hidden;" title="首页">
            <%--  <iframe src="<%=contextPath%>/sys/jkmembercard/go"   frameborder="no" border="0" marginwidth="0" marginheight="0"   style="width:100%;height:100%;"></iframe> --%>
        </div>
    </div>
</div>
<div data-options="region:'south',border:false" style="height: 25px; padding-top: 5px;background: #D2E0F2;" >
    <div class="footer">
    </div>
</div>

<!-- tabs鼠标右键实践 -->
<div id="mm" class="easyui-menu cs-tab-menu">
    <div id="mm-tabupdate">
        刷新
    </div>
    <div class="menu-sep"></div>
    <div id="mm-tabclose">
        关闭
    </div>
    <div id="mm-tabcloseother">
        关闭其他
    </div>
    <div id="mm-tabcloseall">
        关闭全部
    </div>
</div>

<div id="dlg" class="easyui-dialog" title="修改密码" style="padding: 10px 20px; width: 430px" data-options="buttons: '#dlg-buttons',closed:'true',modal:true">
    <form id="fm" method="post" novalidate>
        <table border="0" cellpadding="2" cellspacing="1" class="search">
            <tr>
                <td>
                    用户名:
                </td>
                <td >
                    ${user.ADMIN_NAME }
                </td>
            </tr>
            <tr>
                <td >
                    原始密码:
                </td>
                <td >
                    <input id="oldPassword" name='oldPwd' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
                    <span style="color: red">*</span>
                </td>
            </tr>
            <tr>
                <td >
                    新密码:
                </td>
                <td >
                    <input id="newPassword" name='newPwd' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
                    <span style="color: red">*</span>
                </td>
            </tr>
            <tr>
                <td >
                    确认密码:
                </td>
                <td >
                    <input id="comfirmPassword" name='pwdConfrim' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
                    <span style="color: red">*</span>
                </td>
            </tr>
        </table>
    </form>
</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton"	iconCls="icon-ok"  id="dlg-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton"	iconCls="icon-cancel"	onclick="javascript:$('#dlg').window('close')">取消</a>
</div>

</body>
<script type="text/javascript" src="<%=basePath%>/static/js/home/homeIM.js"></script>
</html>