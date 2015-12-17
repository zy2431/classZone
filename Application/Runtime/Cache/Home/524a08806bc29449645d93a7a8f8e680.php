<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta  http-equiv="X-UA-Compatible"  content="IE=Edge">
	<title>匆匆那年-班级空间</title>
	<link  href="/zone/Public/home/style/register/base.css"  type="text/css"  rel="stylesheet">
	<link  href="/zone/Public/home/style/register/login.css"  type="text/css"  rel="stylesheet">
	<script  src="/zone/Public/home/style/register/jquery-1.8.2.min.js"  type="text/javascript"></script>
	<script  src="/zone/Public/home/style/register/register.js"  type="text/javascript"></script>
	<style  type="text/css">
		.regForm,.username, .login, .makesure, #Phoneyan, #Regyan{width: 700px!important;}
		.regForm,.regForm div{padding: 0!important;}
		label{width: 100px;display: inline-block;text-align: right;}
	</style>
	<script type="text/javascript">
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
var flag5 = false;
$(function(){
	//用户名验证
	$("#user_name").focusout(function() {

		if($('#user_name').val().length >=6){

			$.ajax({
				type: 'post' ,
				url: '<?php echo U("findByName");?>',
				cache:false ,
				data:{username:$('#user_name').val()},
				dataType:'json' ,
				success:function(result){
					$("#nameMsg").text(result.message);
					if(result.status =="error"){
						$("#nameMsg").text(result.message).css("color","red");
						flag1 = false;
					}else{
						$("#nameMsg").text(result.message).css("color","green");
						flag1 = true;
					}
				} 
			});
		}else{
			$("#nameMsg").text("用户名必须在6到12位").css("color","red");
			 flag1 = false;
		}
	});
	//密码验证
	$("#pwd").focusout(function(){
		if($("#pw").val() != $("#pwd").val()){
			$("#pwdMsg").text("两次密码不一致").css("color","red");
			 flag2= false;
		}else{
			if($("#pw").val().length>=6){
				$("#pwdMsg").text("通过").css("color","green");
				flag2= true;
			}else{
				$("#pwdMsg").text("密码必须大于6位").css("color","red");
				flag2= false;
			}
		}		
	});
	
	
	
	

	//验证码验证
	$('#vercode').bind("keyup",function(){
		if($('#vercode').val().length==4){
			$.ajax({
				type: 'post' ,
				url: '<?php echo U("check_verify");?>' ,
				cache:false ,
				data:{code:$('#vercode').val()},
				dataType:'json' ,
				success:function(result){
				
					if(!result){
						$("#ccMsg").text("验证码错误");
						$("#ccMsg").css("color","red");
						 flag3= false;
					}else{
						$("#ccMsg").text("验证码正确");
						$("#ccMsg").css("color","green");
						 flag3= true;
					}
				} 
			});
		}
		
	});
	
	/*学院信息添加到下拉菜单中*/
	$.ajax({
		   type: "POST",
		   url: "<?php echo U('Admin/academy/getAllAcademy');?>",
//		   data: "Academy_id="+academyId,
		   success: function(data){
		   		//遍历所有学院信息
			   	$.each(data,function(i,academy){
			   		var option = $("<option>").val(academy.id).text(academy.name);
			   		$("#academySelect").append(option);
			   	});
		   		
		   }
		});
	
	
	/*学院下拉改变是动态获取班级信息*/
	$("#academySelect").change(function(){
		setClassData($("#academySelect").val());
	});
	
});

/*注册表单验证*/
function check(){ 
	if(flag1 && flag2 &&flag3 && flag4 && flag5){
		
		return true;
	}else{
		return true;
	}
}

/*动态设置班级信息方法*/
function setClassData(academyId){
	$("#classSelect").empty();
	$("#classSelect").append($("<option>").text("---请选择---"));
	
	//alert(academyId);
	//获取对应学院班级信息
	$.ajax({
	   type: "POST",
	   url: "<?php echo U('Admin/academy/getClassByAcademyId');?>",
	   data: "Academy_id="+academyId,
	   success: function(data){
	   		//遍历学院对应的班级信息
		   	$.each(data,function(i,clazz){
		   		var classOption = $("<option>").val(clazz.id).text(clazz.classname);
		   		if(clazz.id=="<?php echo ($data["class"]["id"]); ?>"){classOption.attr("selected",true); }
		   		$("#classSelect").append(classOption); 
		     	//alert( "Data Saved: " + data);
		   	});
	   		
	   }
	});
}
</script>
</head>

<body >
<div  class="header">
	<div  class="wrapper">
		<div  class="logo" style="margin-top:-10px"><a  href="http://localhost:8080/kl/"  target="_blank"><img  src="/zone/Public/home/style/register/pic/logo.gif"></a></div>
		<ul  class="site-nav-right">
			<li  class="sus"><a  href="<?php echo U(login);?>">登录</a></li>
			<li><a  target="_self"  href="<?php echo U('index/index');?>">进入我的班级</a></li>
		</ul>
	</div>
</div>


<div  class="wrapper container">
	<div  class="RegBox">
		<div  class="RegTitle"><span  class="wel_reg">欢迎注册</span> ( 如已有帐号，请<a  class="blue1"  href="<?php echo U(login);?>"> 点此登录 </a>)</div>
		
		<form id="myform" action="<?php echo U(register);?>"  method="post"  class="fillBox regForm" onsubmit="return check();">
			<div  class="username"  id="username">
				<label  for="vip"  class="einfo">登录名:</label>
				<span  style="display:inline-block;position:relative;">
					<ul  id="mailListBox_0"  class="justForJs emailist"  style="min-width:292px;_width:292px;position:absolute;left:-6000px;top:37px;z-index:1;"></ul>
					<input  type="text"  name="username"  class="usr " required=true validType="midLength[6,18]" missingMessage="用户名必填!" invalidMessage="用户名必须在6到18个字符之间!"  id="user_name"  placeholder="6~18位数字、字母或字符组合的登录名"  maxlength="18"  autocomplete="off">
				</span>
				<span  class="rightMsg" id="nameMsg"></span>
			</div>

			<div  class="login">
				<label  class="einfo"  for="pw">登录密码:</label>
				<input  id="pw" name="password" type="password"  placeholder="6~18位数字、字母或字符组合的密码"  class="usr easyui-validatebox"  maxlength="18" required=true validType="midLength[6,18]" missingMessage="密码必填!" invalidMessage="密码必须在6到18个字符之间!">
			</div>
			<div  class="makesure">
				<label  class="einfo"  for="pw">确认密码:</label>
				<input  id="pwd"  type="password"  placeholder="重复输入密码"  class="usr"  maxlength="16">
				<span  class="rightMsg" id="pwdMsg"></span>
			</div>
			<div  class="makesure">
				<label  class="einfo"  for="academySelect" >选择学院:</label>
				<select name="academy_id" id = "academySelect" class="selectinput"  required=true validType="midLength[6,18]" missingMessage="用户名必填!" invalidMessage="用户名必须在6到18个字符之间!" >
				  	<option>---请选择---</option>
				</select>
				<!--<input  id="academy"  type="password"  placeholder=""  class="usr"  maxlength="16">
				-->
				<span  class="rightMsg" id="academyMsg"></span>
			</div>
			<div  class="makesure">
				<label  class="einfo"  for="classSelect">选择班级:</label>
				<select name="class_id" id = "classSelect" class="selectinput">
				  	<option>---请选择---</option>
				</select>
				<!--
				<input  id="academy"  type="password"  placeholder=""  class="usr"  maxlength="16">
				-->
				<span  class="rightMsg" id="classMsg"></span>
			</div>
			<div  class="makesure">
				<label  class="einfo"  for="role">选择身份:</label>
				学生<input  id="role"  type="radio" name="role" value="0" checked>
				老师<input  id="role"  type="radio" name="role" value="3" >
				<span  class="rightMsg" id="classMsg"></span>
			</div>
			<div  class="yanzheng clearfix Regyan"  id="Regyan">
				<div  class="verblock">
					<label  for="vercode"  class="einfo">验证码:</label>
					<input  type="text"  id="vercode"  name="codeStr"  class="verify"  maxlength="6"  value="" placeholder="验证码">
					<div  class="pic">
						<img  src="<?php echo U('getResGetVerify');?>"  alt="点击刷新验证码"  title="点击刷新验证码" onclick="this.src='<?php echo U('getResGetVerify');?>?tm='+Math.random();" style="vertical-align:middle;margin-bottom:3px;cursor:pointer;"  id="checkcode">
					</div>
					<span  class="rightMsg" id="ccMsg"></span>
				</div>
			</div>

			<div  class="ctime protype">
         		<span  lid="1"   class="login_ctime check"><input type="checkbox" name="some_name" value="" id="some_name"/></span>
               	<span   class="free_l">我已阅读并同意<a  target="_blank"  class="blue1"  href="javascript:void(0);">《服务协议》</a></span>
       		</div>

			<div  class="reg"><input  type="submit"  value="同意协议并注册"  id="regBtn"  class="gBtn"  ></div>
		</form>
	</div>
    
</div>


<div  class="footer">
	 <div region="south" title="" style="height:40px;text-align: center">
		    	<span style="font-size:12px;color:#46A3FF">帮助中心 | 网站客服 | 投诉中心 | 网站协议</span><br/>
       			<span style="font-size:11px;color:#666;margin-top:35px;margin-bottom:0px">©2014 中北大学</span>
		    
  	</div>  
</div>