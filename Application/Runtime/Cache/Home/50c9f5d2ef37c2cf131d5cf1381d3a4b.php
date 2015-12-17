<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta  http-equiv="X-UA-Compatible"  content="IE=Edge">

	<title>匆匆那年-班级空间</title>
	<link  href="/zone/Public/home/style/login/base.css"  type="text/css"  rel="stylesheet">
	<link  href="/zone/Public/home/style/login/login.css"  type="text/css"  rel="stylesheet">

</head>

<body >

<div  class="header">
	<div  class="wrapper">
	<div style="float:left"> <img src="/zone/Public/home/style/login/pic/logo.gif" width=""></div>
	<ul  class="site-nav-right">
		<li  class="sus"><a  href="<?php echo U('register');?>">注册</a></li>
		<li><a  target="_blank"  href="<?php echo U('class/index');?>">进入我的班级</a></li>
	</ul>
	</div>
</div>
<!--登录主界面-->
<div  class="wrapper loginBox">
    <div>
      <img class="left_bigpic" style="padding-left:100px" src="/zone/Public/home/style/login/pic/004jtqHqgy6MUPXfOEM80.jpg">
    </div>
	
    <div  class="regBox" style="">
    <h1>欢迎登录</h1>
	<!--登录名-->
    <form  action="<?php echo U('index');?>" class="inner"   method="post" >
    	<!--请选择：
	    <input type="radio" name="peopleFlag" value="1" checked="checked"/>　管理员　
	    <input type="radio" name="peopleFlag" value="2"/>　老师　
	    <input type="radio" name="peopleFlag" value="3"/>　学生<br/><br/>
	    -->
      <input  type="text" name="username" class="usr"  id="login_user_acc"  maxlength="32"  autocomplete="off" value="">
      <div  class="pEor clearfix users">
          <span  class="error user_error"> </span>
          <span  class="eInfo user_tips"> </span>
      </div>
	<!--登录密码-->
      <input  type="password" name="password" value=""  id="login_user_pass"  class="usr"  maxlength="16"  autocomplete="off"  >
      <div  class="pEor clearfix users"  id="pUnmatch">
        <span  class="error pwd_error"> </span>
        <span  class="eInfo pwd_tips"> </span>
      </div>
      <div>
      </div>
      
        <div  class="denglu">   
              <a  href=""  class="blue">忘记密码？</a>
        </div>
        <input  type="submit"  value="登  录"  class="gBtn"  >
      </form>
       <div  class="other">   
            <a  href="<?php echo U('register');?>"  class="blue">免费注册</a>
       </div>  
  </div>
</div>
<div  class="footer">
	 <div region="south" title="" style="height:40px;text-align: center">
		    	<span style="font-size:12px;color:#46A3FF">帮助中心 | 网站客服 | 投诉中心 | 网站协议</span><br/>
       			<span style="font-size:11px;color:#666;margin-top:35px;margin-bottom:0px">©2014 中北大学</span>
  	</div>  

</div>