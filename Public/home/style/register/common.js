var count=0;
var errortime=0;
var service=0;
/*全局变量*/

var cur_reg_email	=	"";    //当前填写的注册邮箱
var cur_reg_mobile =   "";	   //当前正在操作的手机（注册、登录、激活等）
var cur_passtype	=	"";    //当前取回密码的类型
var cur_username	=	"";   //当前操作的用户
var cur_loginacc	=	"";   //当前输入的登录帐号
var act_dft_tips 	=	"您的注册信息已提交，<span class='g_font'>激活邮件已经发送到您刚刚填写的电子邮箱地址，</span>请注意查收。 邮件中包含我们寄送的<span class='g_font'>激活码</span>，请在下面输入您的激活码，以完成注册。";   //激活页面默认提示文字
var cur_reg_type   =   1;   //默认1为email， 0为mobile
var cur_getpwd_questiontype = 1;//默认1为密保一，0为密保二
var sms_active_timeout =180; //重新发送短信激活码倒计时
var sms_active_intervar_Id =""; //重新发送短信激活码倒计时函数的ID
var mob_patterns = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;  //手机格式验证正则
var email_patterns = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  //邮箱验证正则
var checkrt = false;
var secritUser = "";

var username = false;
var pass = false;
var pass2 = false;
var email = false;
var code = false;


var curLoginArray = new Array();		//login页	登录模块
curLoginArray['uid']       = 0;          //当前操作用户的ID，用于修改邮箱
curLoginArray['type']       = 2;	//默认2为邮箱， 3 为手机
curLoginArray['username'] 	= '';	//用户名
curLoginArray['email']	= '';	//email
curLoginArray['mobile']	= '';	//mobile
curLoginArray['globalact']	= '';	//mobile
/**ajax_getData ajax读取数据方法 简单版
* 效果：返回数据到变量     使用： var data	=	ajax_getData(postBody,asoft_asp_file,gf_method,is_async)
* 使用：postBody ：要送的数据body ，如果是get保持为空，如果是post需要使用 $("#form_id").serialize() 方法序列化数据
* asoft_asp_file ：要执行的脚本地址
* gf_method ：传送数据方法 取值为 get post
* is_async 设定读取数据为异步或者同步 ，为空时异步，设定为true时同步
*/
function ajax_getData(postBody,asoft_asp_file,gf_method,is_async){
	var return_temp;
	$.ajax({
		async: is_async,
		url: asoft_asp_file,
		type: gf_method,
		data:postBody,
		cache:false,
		success: function(data){
		  return_temp=data;
		}
	});
	return return_temp;
}

function cross_domain_center(callback){
	// 跨域同步登陆
	// {{{ BBS
	var cookie_url1 ="?q=index/crossdomain&domain=www.oppo.com&loginfile=setssocookie.php";
    var curImg1 = new Image();
    curImg1.src	=	cookie_url1;
    
    var cookie_url2 ="?q=index/crossdomain&domain=bbs.myoppo.com&loginfile=setssocookie.php";
    var curImg2 = new Image();
    curImg2.src	=	cookie_url2;

    var cookie_url3 ="?q=index/crossdomain&domain=bbs.coloros.com&loginfile=setssocookie.php";
    var curImg3 = new Image();
    curImg3.src	=	cookie_url3;

    /*var cookie_url4 ="?q=index/crossdomain&domain=www.oneplusbbs.com&loginfile=setssocookie.php";
    var curImg4= new Image();
    curImg4.src	=	cookie_url4;

	var cookie_url5 ="?q=index/crossdomain&domain=www.oneplus.cn&loginfile=setssocookie.php";
    var curImg5= new Image();
    curImg5.src	=	cookie_url5;*/

   function iscomplete(callback){
   		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('trident') > 0 && agent.indexOf('rv:11.') > 0){//ie11
			setTimeout(function(){callback.call();},5000);
		}else{
			if(curImg3.complete == true || curImg3.width > 0){
				callback.call();
			}else{
				setTimeout(function(){iscomplete(callback)} ,200);
			}
		}
	}
	iscomplete(callback);
}

//尾页语言展示
function langshow()
{
	$(".lang-other").css("display","block");
}

function hidelang()
{
	$(".lang-other").css("display","none");
}

//checkbox是否选中切换
function check_ctime()
{
	if($('.login_ctime').hasClass('uncheck')){
		$('.login_ctime').removeClass('uncheck').attr('lid', '1');
	}else{
		$('.login_ctime').addClass('uncheck').attr('lid', '0');
	}
}

//服务协议是否选中
/*function showprotocol()
{
var	height= window.screen.height;
var   width= window.screen.width;
if((height==768&&width==1024)||(height==600&&width==800))
{   if(service%2==0)
 {$(".agreement").css("display","block");
  $(".RegBox").css("height","571px");
 }
else
 {$(".agreement").css("display","none");
  $(".RegBox").css("height","493px");
 }
service++;
}
else{
if(service%2==0)
 {$(".agreement").css("display","block");
  $(".RegBox").css("height","511px");
 }
else
 {$(".agreement").css("display","none");
  $(".RegBox").css("height","433px");
 }
service++;
}
}*/

//改变按钮的颜色
function changecolor(){$(".gBtn").css("background-color","#00925f");}

function fade(){$(".gBtn").css("background-color","#409f73");}

function red(){$(".veriBox .gBtn").css("background-color","#dc4437");}

function fadered(){$(".veriBox .gBtn").css("background-color","#e57368");	}

//改变QQ 微博的颜色表示状态转换
function qqcolor(){$(".qq").css("background-position","-8px -128px");}

function fadeqq(){$(".qq").css("background-position","-8px -56px"); }

function weibocolor(){$(".weibo").css("background-position","-8px -152px" );}

function  fadeweibo(){$(".weibo").css("background-position","-8px -80px" );}




//找回密码检查用户名是否存在
function check_findusr()
{
	var user = $('input[name=getpwd_user_acc]').val();
	var code = $('input[name=codeStr]').val();
	if(user!="")
	{
	    var patterns1 = /[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}/;
		if(patterns1.test(user))
		{
			if(code){
				$.ajax({
					url: "?q=user/findusername",
					type: "post",
					data: 'username=' + encodeURIComponent(user)+'&vcode='+ encodeURIComponent(code) ,
					cache:false,
					success: function(data){
					    var data = $.parseJSON(data);
					    if(data.no == 1){
                            $('#stepOne').css('display','none');
                            $('#stepTwo').css('display','block');
                            $('input[name=curUser]').val(data.username);
                            if(data.etype){
                                $('.myemail').css('display','block');
                                $('.emailBlcok').html(data.email);
                            }
                            if(data.mtype){
                                $('.cell').css('display','block');
                                $('.phoneBlock').html(data.mobile);
                            }
                            $('.username').html(data.username);
                        }else{
                            $('.errorResult').html('用户不存，请注册！');
                            setTimeout(function(){$('.errorResult').html('');},6000);
                            return false;
                    	}
                    }
             	});
         	}
     	}else{
            $(".users").css("display","block");
         	return false;
     	}
	}
	else
	{
		$(".users").css("display","block");
		return false;
	}
}

//是否允许登录操作判断
function checklog()
{
	var status=$("#logYan").css("display");
	if(status=="block")
	{
		if(check_password()==true&&check_vercode()==true&&check_usr(".inner #vip")==true)
		{
	   		alert("跳转到登录后的页面，并且写入后台一些数据，记录此次登录情况");
		}
		else
		{
		   alert("不允许跳转");
		}
	}
	else
	{
         if(check_password()==true)
      	{
	   //set_loading("login_do_tips","正在处理登录操作...请稍候");
            var myDate=new Date();
            var clientTime = myDate.getFullYear().toString()+(eval(myDate.getMonth()+1)<10? "0" + eval(myDate.getMonth()+1): eval(myDate.getMonth()+1)).toString()+(myDate.getDate()<10? "0" + myDate.getDate(): myDate.getDate()).toString()+(myDate.getHours()<10?"0"+myDate.getHours():myDate.getHours()).toString()+(myDate.getMinutes()<10?"0"+myDate.getMinutes():myDate.getMinutes()).toString();

            var postdata = $("#oppo_login_frm").serialize() + "&ctime="+clientTime;
            var data	=	ajax_getData(postdata,"?q=user/ajaxlogin","post",false);

            data		=	eval("("+data+")");
            var resultId = parseFloat(data.resultId);

            //将返回的用户名密码存入到全局数组
            curLoginArray['uid'] = data.userid;
            curLoginArray['username'] = data.username;
            curLoginArray['email'] = data.email;
            curLoginArray['mobile'] = data.mobile;
            function errorInfo(error){
                $('#errorInfo').html(error);
            }
            if(resultId==-1){
                errorInfo("哦出错了！您的电脑时间与北京时间相差一天以上...<br />请将本机时间校准为 "+data.result+" 再登录。");
            }else if(resultId==0){
                errorInfo("登陆失败！帐号和密码不正确");
            }else if(resultId==1){
				cross_domain_center(function(){
		            errorInfo("<span style='color:#aaa;font-size:11px;'>登陆成功！页面正在努力跳转中<br />如果浏览器没有自动跳转，请<a href='"+data.result+"'>点击这里</a>...</span>");
		            window.location.href=data.result;
});
            }else if(resultId == 2){//若email未激活，返回data.resultId=2

                $('#login-body').fadeOut(500, function(){
                    //需要后台返回注册时用的邮箱tmp
                    var tmp = data.email;
                    $('#login-body')
                        .find('#body-left-login').addClass('body-left-login1').end()
                        .find('#body-middle-login').addClass('body-middle-login1').end()
                        .find('#body-right-login').addClass('body-right-login1').end()
                        .find('#login-frm-main').addClass('hidden').end()
                        .find('#login-frm-other').removeClass('hidden')
                        .find('.login-frms').addClass('hidden').hide().end()
                        .find('#login-frm2').removeClass('hidden').show()
                        .find('.login-frm2-tips').addClass('hidden').hide().end()
                        .find('#login_email_tips').removeClass('hidden').show().end().end().end()
                        .find('#active_error_tips1').css('display', 'block')
                        .find('#active_error_tips1_email').html(tmp).end().end()
                		.fadeIn(500);
            	});
            }else if(resultId == 3){//若mobile未激活，返回data.resultId=3
                cur_reg_mobile = data.adddata;
                $('#login-body').fadeOut(500, function(){
                  $(this)
                    .find('#body-left-login').addClass('body-left-login1').end()
                    .find('#body-middle-login').addClass('body-middle-login1').end()
                    .find('#body-right-login').addClass('body-right-login1').end()
                    .find('#login-frm-main').addClass('hidden').end()
                    .find('#login-frm-other').removeClass('hidden')
                    .find('.login-frms').addClass('hidden').end()
                    .find('#login-frm4').removeClass('hidden').end().end()
                    .find('#active_error_tips2').css('display', 'block').end()
                    .fadeIn(500);
                });
        	}
     	}
	   else
	   {
		   alert("不允许跳转");
	   }
	}
}


//css3兼容性判断
function account(){

	if(navigator.appName == "Microsoft Internet Explorer")
	{
	   if(navigator.appVersion.match(/6./i)=='6.'||navigator.appVersion.match(/7./i)=='7.'||navigator.appVersion.match(/8./i)=='8.')
	   {

			$(".circle li").removeClass("stept");
			$(" .num").css("display","none");
			$("#two").css("background" ,"url(images/icons.png)");
			$("#two").css("width", "48px");
			$("#two").css("height", "48px");
			$("#two").css("background-position", "-224px -40px");

			$("#now").css("background" ,"url(images/icons.png)");
			$("#now").css("width", "48px");
			$("#now").css("height", "48px");
			$("#now").css("background-position", "-152px -96px");

			$("#three").css("background" ,"url(images/icons.png)");
			$("#three").css("width", "48px");
			$("#three").css("height", "48px");
			$("#three").css("background-position", "-296px -40px");
		}
	}
}


function verify()
{
	if(navigator.appName == "Microsoft Internet Explorer")
	{
	   if(navigator.appVersion.match(/6./i)=='6.'||navigator.appVersion.match(/7./i)=='7.'||navigator.appVersion.match(/8./i)=='8.')
	   {

			$(".circle li").removeClass("stept");
			$(" .num").css("display","none");
			$("#one").css("background" ,"url(images/icons.png)");
			$("#one").css("width", "48px");
			$("#one").css("height", "48px");
			$("#one").css("background-position", "-152px -40px");

			$("#now").css("background" ,"url(images/icons.png)");
			$("#now").css("width", "48px");
			$("#now").css("height", "48px");
			$("#now").css("background-position", "-224px -96px");

			$("#three").css("background" ,"url(images/icons.png)");
			$("#three").css("width", "48px");
			$("#three").css("height", "48px");
			$("#three").css("background-position", "-296px -40px");
		}
	}
}

function resets()
{
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		if(navigator.appVersion.match(/6./i)=='6.'||navigator.appVersion.match(/7./i)=='7.'||navigator.appVersion.match(/8./i)=='8.')
		{

			$(".circle li").removeClass("stept");
			$(" .num").css("display","none");
			$("#one").css("background" ,"url(images/icons.png)");
			$("#one").css("width", "48px");
			$("#one").css("height", "48px");
			$("#one").css("background-position", "-152px -40px");

			$("#now").css("background" ,"url(images/icons.png)");
			$("#now").css("width", "48px");
			$("#now").css("height", "48px");
			$("#now").css("background-position", "-296px -96px");

			$("#two").css("background" ,"url(images/icons.png)");
			$("#two").css("width", "48px");
			$("#two").css("height", "48px");
			$("#two").css("background-position", "-224px -40px");

    	}

	}
}

function complete()
{
	if(navigator.appName == "Microsoft Internet Explorer")
	{
	   if(navigator.appVersion.match(/6./i)=='6.'||navigator.appVersion.match(/7./i)=='7.'||navigator.appVersion.match(/8./i)=='8.')
	   {

			$(".circle li").removeClass("stept");
			$(" .num").css("display","none");
			$("#one").css("background" ,"url(images/icons.png)");
			$("#one").css("width", "48px");
			$("#one").css("height", "48px");
			$("#one").css("background-position", "-152px -40px");

			$("#three").css("background" ,"url(images/icons.png)");
			$("#three").css("width", "48px");
			$("#three").css("height", "48px");
			$("#three").css("background-position", "-296px -40px");

			$("#two").css("background" ,"url(images/icons.png)");
			$("#two").css("width", "48px");
			$("#two").css("height", "48px");
			$("#two").css("background-position", "-224px -40px");

    	}
	}
}

//用户名注册格式提示
//function passwordtip(str)
//{
//	$(str).val("");
//}

function lengthtip()
{
	$("#hasdone .error").css("background-position","-64px -152px");
	$("#hasdone .eInfo").css("color","#afafaf");
	$("#hasdone .eInfo").empty();
	$("#hasdone .eInfo").append('4-40位字符之间，一个汉字为两个字符');
	$("#hasdone").css("display","block");
}

//注册时检查用户名  为 手机格式
function checkmobile(username){
	$.ajax({
		url: "?q=user/checkmobile",
		type: "post",
		data: 'mobile=' + username,
		cache:false,
		success: function(data){
			data	=	parseFloat(data);
			if(data<=0){
				var error = "";
				switch(data) {
					case -1:
						error = "抱歉，手机号码格式不正确";
						break;
					case -2:
						error = "";
						break;
					case -3:
						error = "抱歉，该手机号码已被注册！";
						break;
					default:
						error = "通信错误，手机号码检测操作终止！";
						break;
				}
			 	$("#hasdone .error").css("background-position","-64px -80px");
				$("#hasdone .eInfo").empty();
				$("#hasdone .eInfo").append(error);
				return false;
			}else{
				return true;
			}
		}
	});
}
//注册时检查用户名  为 邮箱格式
function checkemail(username){
	$.ajax({
		url: "?q=user/checkemail",
		type: "post",
		data: 'email=' + encodeURIComponent(username),
		cache:false,
		success: function(data){
			data	=	parseFloat(data);
			if(data<=0){
				var error = "";

				switch(data) {
					case -1:
						error = "抱歉，Email地址格式不正确";
						break;
					case -2:
						error = "OPPO推荐您使用主流邮箱以快速激活帐户";
						break;
					case -3:
						error = "抱歉，该Email已被注册！";
						break;
					default:
					error = "通信错误，Email地址检测操作终止！";
					break;
				}

				 $("#hasdone .error").css("background-position","-64px -80px");
				 $("#hasdone .eInfo").empty();
				 $("#hasdone .eInfo").append(error);
				return false;
			}else{
				return true;
			}
		}
	});
}


//填写完用户名之后进行判断
function  checkusername()
{
	var username=$(".ming #vip").val();
	$(".select").css("display","none");
	if(username!="邮箱/手机/用户名"&&username!="")
	{

		if(username.length<=3||username.length>40)
		{
			$("#hasdone .error").css("background-position","-64px -152px");
			//$("#hasdone .eInfo").css("color","#afafaf");
			$("#hasdone .eInfo").empty();
			$("#hasdone .eInfo").append('4-40位字符之间，一个汉字为两个字符');
			$("#hasdone").css("display","block");
			$(".yantip").css("display","none");
			$("#showverify").css("display","none");
			return false;
		}
  		else{
			if( !isNaN($.trim(username)) ){
				 if (username.match(/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/) && username.length==11)
				{
					checkmobile(username);
				}else{
					$("#hasdone .error").css("background-position","-64px -80px");
					$("#hasdone .eInfo").empty();
					$("#hasdone .eInfo").append('手机格式不正确！');
					return false;
				}
			}else if (username.indexOf('@')){
				if (username.match(/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/))
				{
					checkemail(username);
				}else{
					$("#hasdone .error").css("background-position","-64px -80px");
					$("#hasdone .eInfo").empty();
					$("#hasdone .eInfo").append('邮箱格式不正确！');
					return false;
				}
			}
			else{
		        $.ajax({
	               url: "?q=user/checkusername",
	               type: "post",
	               data: 'username=' + encodeURIComponent(username),
	               cache:false,
	               success: function(data){
	                    data	=	parseFloat(data);
	                   // alert(data);
	                    if (data == -3) {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('该用户名已经注册');
							return false;
						} else if (data == -1) {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('用户名非法');
							return false;
						} else if (data == -2) {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('用户名包含有不允许注册的词语！');
							return false;
						} else if (data == -4) {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('用户名不能含有无意义的字符（如 %、# 等）！');
							return false;
						} else if (data == -5) {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('用户名长度超过限制！');
							return false;
						} else if (data > 0) {
							$("#hasdone .error").css("background-position","-64px -56px");
							$("#hasdone .eInfo").empty();
						} else {
							$("#hasdone .error").css("background-position","-64px -80px");
							$("#hasdone .eInfo").empty();
							$("#hasdone .eInfo").append('通信错误，暂时不能注册！');
							return false;
						}
					}
				});
			}

			//alert("IN RIGHT");
			$("#hasdone .error").css("background-position","-64px -56px");
			$("#hasdone .eInfo").empty();
			$("#hasdone").css("display","block");
			//alert( isNaN(parseInt("username","10")));
			//alert(username.length);
			//alert( $.isNumeric(username));
			if($.isNumeric(username)&& mob_patterns.test(username))
			{
				//手机注册用户
				$("#Regyan").css("display","none");
				$(".fillBox .Mesbtn").css("display","block");
				$("#Phoneyan").css("display","block");
				$(".showma").css("margin-left","14px");
			}
			else
			{
				$("#Phoneyan").css("display","none");
				$("#Regyan").css("display","block");
				$(".showma").css("margin-left","21px");
				get_code();
			}
			return true;
		}
	}
	else
	{
		$("#hasdone .error").css("background-position","-64px -80px");
		$("#hasdone .eInfo").empty();
		$("#hasdone .eInfo").append('用户名不能为空');
		return false;
	}
}



//检测注册密码是否匹配
function pswmatch()
{
	var password=$(".login #pw").val();
	var repassword=$(".makesure #pwd").val();
	//alert("password"+password);
	//alert("repassword"+repassword);
	if(password==repassword)
	{
		//  alert("in");
		if(password!="")
		{
			 $("#RpUnmatch .error").css("background-position","-64px -56px");
			 $("#RpUnmatch .eInfo").css("display","none");
			 $("#RpUnmatch").css("display","block");
			 $(".makesure .usr").css("border","solid 1px #409f73");
			 return true;
		}else{
			$("#RpUnmatch .error").css("background-position","-64px -80px");
			$("#RpUnmatch .eInfo").empty();
			$("#RpUnmatch .eInfo").append('密码不能为空');
			$("#RpUnmatch").css("display","block");
		}
	}
	else
	{
		//alert("not in");
		$("#RpUnmatch .error").css("background-position","-64px -80px");
		$("#RpUnmatch .eInfo").empty();
		$("#RpUnmatch .eInfo").append('两次密码不一致');
		$("#RpUnmatch .eInfo").css("display","block");
		$("#RpUnmatch").css("display","block");
		$(".makesure #pwd").css("border","#db4437 solid 1px");
		return false;
	}
}

//注册时下拉列表
function chooseemail(email)
{
	$(".select").css("display","block");
	$(email).css("background","#f6f6f6");
	var get=$(email).text();
	$(".ming #vip").val(get);
}
function blurcolor(email)
{
	$(email).css("background-color","#fff");
}


//短信验证码获取倒计时
function countSms(){
	$(".yantip").html('验证码已发送，请查收短信。');
	$("#Phoneyan .Mesbtn").val("");
	$("#Phoneyan .Mesbtn").val("109秒后重新获取");
	var count = 109;
	var countdown = 0;
	function CountDown() {
		$("#Phoneyan .Mesbtn").attr("disabled", true);
		$("#Phoneyan .Mesbtn").val( count +"秒后重新获取");
		if (count == 0) {
			$("#Phoneyan .Mesbtn").val("获取短信验证码").removeAttr("disabled");
			$(".yantip").html('');
			clearInterval(countdown);
		}
		count--;
	}
	countdown = setInterval(CountDown, 1000);
}

function showl(time)
{
	$("#Phoneyan .Mesbtn").val(time+"秒后重新获取");
}

//用户名、邮箱注册验证码判断是否正确
function Recheck_vercode()
{
	var YAN = $("#Regyan #vercode").val();
	// alert("YAN = " + YAN);
	$.ajax({
       url: "?q=user/vifycode",
       type: "post",
       data: 'vifycode=' + encodeURIComponent(YAN),
       cache:false,
       success: function(data){
            data	=	parseFloat(data);
            //alert(data);
            if (data < 0) {
				$("#showverify").css("background-position","-64px -80px");
				$("#showverify").css("display","block");
				return false;
			} else if (data == 1) {
				$("#showverify").css("background-position","-64px -56px");
				$("#showverify").css("display","block");
				return true;
			}
        }
     });
}



//注册按钮最后的判定
function check_Reg()
{
	//event.preventDefault();
	var phonestatus=$("#Phoneyan").css("display");
	var Restatus=$("#Regyan").css("display");
	var email=$(".ming #vip").val();
	var isemail= valid_email(email);
	var str="register_complete.html?username="+email+";";
	if(phonestatus=="block"&&Restatus=="none")//采用的是手机注册
	{
		var postData = "user_mobile="+encodeURIComponent($('input[name=userName]').val())+"&user_pass="+encodeURIComponent($('input[name=userPass2]').val())+"&act_code="+encodeURIComponent($('input[name=codeMob]').val());
		var data = ajax_getData(postData,"?q=user/ajaxquickregister","post",false);
		data =	eval("("+data+")");
		var resultId = parseFloat(data.resultId);

		if(resultId<0){
			var error = "";
			switch(resultId) {
				case -94:
                     error = "抱歉，俩次密码不相等,注册失败 ";
                     break;
				case -93:
		             error = "抱歉，密码不符合规范";
		             break;
				case -92:
		            error = "抱歉，手机号不能为空";
		            break;
				case -88:
		            error = "抱歉，验证码不能为空";
		            break;
				case -87:
				     error = "抱歉，密码不能为空";
				     break;
				case -3:
				     error = "抱歉，手机号码已被注册";
				     break;
				default:
				     error = "抱歉，注册失败，请稍后再试";
				     break;
			}
			$('.errorResult').html(error);
     		setTimeout(function(){$('.errorResult').html('');},3000);
		}else if(resultId==1){
         	cross_domain_center(function(){
	         	window.location.href=data.result;
	 		});
 		}
	}
	else
	{
	 	if(phonestatus=="none"&&Restatus=="block")//采用的是用户名或者邮箱注册
		{

           if(isemail){
		   		var postData = "email="+encodeURIComponent($('input[name=userName]').val())+"&user_pass="+encodeURIComponent($('input[name=userPass2]').val())+"&act_code="+encodeURIComponent($('input[name=codeStr]').val());

                var data = ajax_getData(postData,"?q=user/ajaxfastregister","post",false);
             	data =	eval("("+data+")");
             	var resultId = parseFloat(data.resultId);

				if(resultId<0){
					var error = "";
					switch(resultId) {
						case -94:
							error = "抱歉，俩次密码不相等,注册失败 ";
							break;
						case -93:
							error = "抱歉，密码不符合规范";
							break;
						case -92:
					        error = "抱歉，手机号不能为空";
					        break;
						case -88:
							error = "抱歉，验证码不能为空";
							break;
						case -87:
						     error = "抱歉，密码不能为空";
						     break;
						case -3:
						     error = "抱歉，手机号码已被注册";
						     break;
						default:
							error = "抱歉，注册失败，请稍后再试";
							break;
					}
                     $('.errorResult').html(error);
	                 setTimeout(function(){$('.errorResult').html('');},3000);
                 }else if(resultId==1){
                     cross_domain_center(function(){
                         window.location.href=data.result;
                     });
                 }
           	}
	        else
           	{
				var postData = "user_name="+encodeURIComponent($('input[name=userName]').val())+"&user_pass="+encodeURIComponent($('input[name=userPass2]').val())+"&act_code="+encodeURIComponent($('input[name=codeStr]').val());

             	var data = ajax_getData(postData,"?q=user/ajaxfastregister","post",false);
                data =	eval("("+data+")");
             	var resultId = parseFloat(data.resultId);

             	if(resultId<0){
                     var error = "";
                     switch(resultId) {
                         case -94:
                             error = "抱歉，俩次密码不相等,注册失败 ";
                             break;
                         case -93:
                             error = "抱歉，密码不符合规范";
                             break;
                         case -92:
                            error = "抱歉，手机号不能为空";
                            break;
                         case -88:
                            error = "抱歉，验证码不能为空";
                            break;
                         case -87:
	                         error = "抱歉，密码不能为空";
	                         break;
                         case -3:
                             error = "抱歉，手机号码已被注册";
                             break;
                         default:
                             error = "抱歉，注册失败，请稍后再试";
                             break;
                	 }
                     $('.errorResult').html(error);
                     setTimeout(function(){$('.errorResult').html('');},3000);
                     return false;
                 }else if(resultId==1){
                     cross_domain_center(function(){
                         window.location.href=data.result;
                     });
                 }
           	}

		}
	}
}

//下拉列表采用键盘的事件
$(function(){
	var index=0;
	$(".ming #vip").keydown(function (event) {//上下键获取焦点
		var key = event.keyCode;
		if (key == 38)
		{ /*向上按钮*/
			index--;
			//alert(index);
			var li = $(".select").find("li:eq(" + index + ")");
			$(li).css("background","#f6f6f6");
			var get=$(li).text();
			$(".ming #vip").val("");
			var a= $(".ming #vip").val();
			// alert(a);
			$(".ming #vip").val(get);
			for(i=0;i<=7;i++)
			{
				if(i!=index){
					var ol=$(".select").find("li:eq(" + i + ")");
					$(ol).css("background","#fff");
				}

			}
			if (index == 0) index = 7; //到顶了，

		}
		else if (key == 40)
		{/*向下按钮*/
			index++;
			//alert(index);
			if (index == 8) index = 0; //到底了
			var li = $(".select").find("li:eq(" + index + ")");
			$(li).css("background","#f6f6f6");
			var get=$(li).text();
			$(".ming #vip").val("");
			var a= $(".ming #vip").val();
			// alert(a);
			$(".ming #vip").val(get);
			for(i=0;i<=7;i++)
			{
				if(i!=index){
					var ol=$(".select").find("li:eq(" + i + ")");
				$(ol).css("background","#fff");
				}
			}
		}else if(key==13)
		{
	   		$(".select").css("display","none");
		}

		 // alert(index);
	});

});


$(function(){

	$(".ming #vip").keyup(function (event) {
		var key = event.keyCode;
		if(key!=38&&key!=40&&key!=13)
		{
			var now=$(".ming #vip").val();
			$(".select .name").text(now);
			$(".select").css("display","block");
		}
	});
});


//完成页面信息获取并判断
function panduan(){
	var url=location.href;
	var tmp1=url.split("?")[1];
	var tmp2=tmp1.split("&")[0];
	var tmp3=tmp2.split("=")[1];
	var temp=tmp3.split(";")[0];
	var parm=decodeURI(temp);
	//alert(decodeURI(parm));
	$(".username").empty();
	$(".username").text(parm);
	if(valid_email(parm))
	{
		$(".usrreg").css("display","none");
		$(".emailreg .tip").css("display","none");
		$(".emailreg").css("display","block");
	}
	return parm;
}

//邮箱跳转判断
function panduan2(){
	var url=location.href;
	var tmp1=url.split("?")[1];
	var tmp2=tmp1.split("&")[0];
	var tmp3=tmp2.split("=")[1];
	var temp=tmp3.split(";")[0];
	var parm=decodeURI(temp);
	//alert(decodeURI(parm));
	$(".username").empty();
	$(".username").text(parm);
	return parm;
}
//验证邮箱名是否有效
function valid_email(email) {
	var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
	return patten.test(email);
}

//验证步骤下拉列表框判断
function showmenu()
{
	$(".menu").css("display","block");
}

function Hidemenu()
{
	$(".menu").css("display","none");
}
function choosecell()
{
	$('#phone_check').css('display','block');
	$('#email_check').css('display','none');
	$('#checkType').val('已验证手机');
}

function gonecell()
{
	$(".cell").css("background-color","#fff");
}

function choosed()
{
	$('#phone_check').css('display','none');
	$('#email_check').css('display','block');
	$('#checkType').val('已验证邮箱');
}

function gone()
{
	$(".myemail").css("background-color","#fff");
}
/*function verifycell()
{
alert("shouji");
$(".chooseway").val("已验证手机");

}
function verifymail()
{
alert("shouji");
$(".chooseway").val("已验证邮箱");

}*/

//验证请求,发送邮件或短信
function backpassReg(type){
	var curUser = $.trim($('input[name=curUser]').val());
	if(curUser != ""){
		$.ajax({/* 需要返回用户注册时激活方式cur_reg_type，1表示邮箱，0表示手机 */
			url: "?q=user/ajaxsetbackpass",
			type: "post",
			data: 'userName=' + encodeURIComponent(curUser) +'&type='+type,
			cache:false,
			success: function(data){
				if(parseFloat(data)<=0){
				data = parseFloat(data);
				var error = "";
				switch(data) {
					case -11:
						error = "抱歉，帐号检测失败，请检查后重新输入";
						break;
					case -12:
						error = "抱歉，帐号没有激活，不能使用此功能";
						break;
					default:
						error = "通信错误，暂时不能发送邮件！";
						break;
					}
					$('.errorResult').html(error);
					setTimeout(function(){$('.errorResult').html('');},3000);
				}else{
					data = eval("("+data+")");
					if(data.no==1){
					  //邮件发送成功
						$('.errorResult').html('邮件已发送，请注意查收！');
					}else if(data.no==2){
						$('.erroResult').html('短信已发送，请注意查收！');
					}else if(data.no== -8){
						$('.erroResult').html('今天您申请的次数超过5次，请明天再试！');
					}
				}
			}
		});

	}else{
		$('.errorResult').html('抱歉，登录帐号不能为空');
	    setTimeout(function(){$('.errorResult').html('');},3000);
	}
}

//短信跳转至密码验证
function setpass(){
	var vcode = $.trim($('input[name=vcode]').val());
	if(vcode){
		$('#stepTwo').css('display','none');
		$('#stepThree').css('display','block');
		$('input[name=username]').val($('input[name=curUser]').val());
		$('input[name=type]').val(1);
		$('input[name=checkcode]').val(vcode);
	}
}

//重设密码
function resetPass(){
    $.ajax({
        url: "?q=user/ajaxresetpass",
        type: "post",
        data: 'userPass=' + encodeURIComponent($('input[name=repass]').val()) + "&userPass2=" + encodeURIComponent($('input[name=repass2]').val()) +"&username=" + encodeURIComponent($('input[name=username]').val())+"&type=" + $('input[name=type]').val() +"&checkcode=" + $('input[name=checkcode]').val(),
        cache:false,
        success: function(data){
            data	=	parseFloat(data);
            if(data<=0){
                var error = "";
                switch(data) {
                    case -1:
                        error = "抱歉，链接已失效！";
                        break;
                    case -2:
                        error = "抱歉，验证码错误！";
                        break;
                    case -3:
                        error = "抱歉，两次密码不相等！";
                        break;
                    case -4:
                        error = "抱歉，新密码不符合规则！";
                        break;
	                case -6:
                        error = "抱歉，用户不存在或禁止修改密码！";
                        break;
	                case -7:
                        error = "原密码错误！";
                        break;
	                case -8:
                        error = "密码修改失败！";
                        break;
	                default:
                        error = "通信错误，暂时不能修改密码！";
                        break;
    			}
			    $('.getnewpass').html(error);
			    setTimeout(function(){$('.getnewpass').html('');},3000);
			    return false;
			}else{
	            $('#stepFive').css('display','none');
	            $('#stepThree').css('display','none');
	            $('#stepFour').css('display','block');
            }
        }
    });
}

//屏幕分辨率兼容性判断
function screenInfo(){
	var width;
	var height;
	height= window.screen.height;
	width= window.screen.width;
	document.body.style.height = height;
	/*if(height==768&&width==1024)
	{
	    // alert("in");
	     $(".wrapper").css("width","906px");
	     $(".foot-bt-content").css("width","906px");
	     $(".lang-other").css("left","-1px");
	     $(".foot-bt-links a").css("padding-left","15px");
	     $(".loginBox").css("background","url(/resource/images/deepblue/login_left_big.jpg) no-repeat");
	     $(".loginBox").css("height","300px");
		 $(".process").css("width","906px");
		 $(".accout").css("width","906px");
		 $(".accout").css("margin","0 auto");
		 $(".accoutf").css("width","906px");
		 $(".accoutT").css("width","906px");
		 $(".accoutTh").css("width","906px");
		 $(".RegBox").css("width","906px");
		 $(".fillBox").css("width","366px");
		 $(".fillBox .pEor").css("margin-left","73px");
		 $(".line").css("width","184px");
		 $(".num li").css("margin-right","228px");
		 $(".stInfo li").css("margin-right","173px");
	     $(".stInfo li .reset").css("margin-left","10px");
		 $(".stInfo li.done").css("margin-right","0px");
		 $(".stInfo li.done").css("margin-left","10px");
		 $(".veriBox").css("width","625px");
		 $(".usrreg").css("top","33px").css("left","25px");
	 }
	else if(height==600&&width==800)
	{
		$(".wrapper").css("width","704px");
		$(".foot-bt-content").css("width","783px");
		$(".ft-info").css("margin-left","0px");
		$(".lang-other").css("left","-1px");
		$(".foot-bt-links").css("float","left").css("margin-left","4px");
		$(".foot-bt-links a").css("padding-left","2px");
		$(".lang-other a ").css("padding","10px 0px");
		$(".loginBox").css("background","url(/resource/images/deepblue/login_left_big.jpg) no-repeat");
		$(".loginBox").css("height","274px");
		$(".process").css("width","704px");
		$(".accout").css("width","704px");
		$(".accout").css("margin","0 auto");
		$(".accoutf").css("width","704px");
		$(".accoutT").css("width","704px");
		$(".accoutTh").css("width","704px");
		$(".regBox ").css("width","316px").css("height","349px");
		$(".RegBox").css("width","704px");
		$(".fillBox").css("width","369px");
		$(".fillBox .pEor").css("margin-left","73px");
		$(".line").css("width","136px");
		$(".num li").css("margin-right","179px");
		$(".stInfo li").css("margin-right","121px");
		$(".stInfo li .reset").css("margin-left","10px");
		$(".stInfo li.done").css("margin-right","0px");
		$(".stInfo li.done").css("margin-left","23px");
		$(".veriBox").css("width","600px");
		$(".biaodan").css("left","169px");
		$(".biaodanT").css("left","56px");
		$(".biaodanTh").css("left","104px");
		$(".suinfo").css("left","30px");
		$(".usrreg").css("top","16px").css("left","14px");
		$(".MessBox").css("width","238px").css("top","25px").css("right","15px");
		$(".qucik").css("width","224px");
		$(".phone").css("margin-left","69px");
	}*/

}
/*set_err 为指定区域的innerHTML增加错误提示效果*/
function set_err(error_class, eIno_class, msg)
{
	if(typeof(error_class)=="undefined" || typeof(eIno_class)=="undefined"){
		return false;
	}
	$("."+error_class).css('display', 'block');
	$("."+eIno_class).css('display', 'block').html(msg);
	return false;
}

function closefc(){
	$('.lead-tips').css('display', 'none');
	$('.bg-fc').css('display', 'none');
	cross_domain_center(function(){
		var url = $('.banner-tips').attr('back');
		if(!url){
			url = 'http://www.oppo.com/';
		}
		window.location.href=url;
	});
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
	if ((version >= 5.5 && version<8.0) && (document.body.filters))
	{
		for(var j=0; j<document.images.length; j++)
		{
			var img = document.images[j];
			var imgName = img.src.toUpperCase();
			var imgtmp = new Image();
			imgtmp.src = img.src;
			var width = imgtmp.width;
			var height = imgtmp.height;
			if (imgName.toLowerCase().indexOf('.png') > 0)
			{
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className + "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText
				if (img.align == "left") imgStyle = "float:left;" + imgStyle
				if (img.align == "right") imgStyle = "float:right;" + imgStyle
				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
				var strNewHTML = "<span " + imgID + imgClass + imgTitle
						 + " style=\"" + "width:" + width + "px; height:" + height + "px;" + imgStyle + ";"
						 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
						 + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
						 img.outerHTML = strNewHTML
						 j = j-1
			}
		}
	}
}

/*
* 获取验证码，通用。
*/
function get_code() {
	$('#auth_code').attr('src', '?q=index/verify&rd='+Math.random());
	$('#vercode').val('');
}



function testpass(password){
	var score = 0;
    score += password.length * 4;
    score += ( repeat(1,password).length - password.length ) * 1;
    score += ( repeat(2,password).length - password.length ) * 1;
    score += ( repeat(3,password).length - password.length ) * 1;
    score += ( repeat(4,password).length - password.length ) * 1;
    if (password.match(/(.*[0-9].*[0-9].*[0-9])/)){ score += 5;}
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ score += 5 ;}
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ score += 10;}
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){score += 15;}
    if (password.match(/^\w+$/) || password.match(/^\d+$/) ){ score -= 10;}
    if ( score < 0 ){score = 0;}
    if ( score > 100 ){ score = 100;}
    return score;

}
function repeat(len,str){
    var res = "";
    for (var i = 0; i < str.length; i++ ){
        var repeated = true;
        for (var j = 0, max = str.length - i - len; j < len && j < max; j++){
            repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + len));
        }
        if (j < len) repeated = false;
        if (repeated) {
            i += len - 1;
            repeated = false;
        }else{
            res += str.charAt(i);
        }
    }
    return res;
}

function check_pass_strong(){
	var password = document.getElementById('pw').value;
	if(password){
		var score = testpass(password);
		$('.strong').css('display', 'block');
		if(score < 34){
			$(".strong .middle").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
	 		$(".strong .middle").css({"opacity":"0.7","filter":"alpha(opacity=70)","-moz-opacity":"0.7"});
	 		$(".strong .high").css({"opacity":"0.7","filter":"alpha(opacity=70)","-moz-opacity":"0.7"});
		}else if(score < 68){
			$(".strong .default").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
			$(".strong .middle").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
			$(".strong .high").css({"opacity":"0.7","filter":"alpha(opacity=70)","-moz-opacity":"0.7"});
	 	}else{
	 		$(".strong .default").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
			$(".strong .middle").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
		    $(".strong .high").css({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"});
	 	}
	}else{
		$('.strong').css('display', 'none');
	}
}


//检测密码强度
function check_pass()
{
	var password = document.getElementById('pw').value;
	$('div.login span').remove(".rightIcon").remove(".errorIcon").remove(".errorMsg");
	if('' == password)
	{
		$('.login').append('<span class="errorIcon"></span><span class="errorMsg">请输入登录密码</span>');
		return false;
	}else{
		check_pass_strong();
		var reg = /^[0-9a-zA-Z!@#\$%\^\&\*\-_\+\=\|:;,\.\?]{6,16}$/i;
		if(reg.test(password)){
			var reg2 = /^[0-9]{6,16}$/;
			var reg3 = /^[a-zA-Z]{6,16}$/i;
			var reg4 = /^[!@#\$%\^\&\*\-_\+\=\|:;,\.\?]{6,16}$/i;
			if(reg2.test(password) || reg3.test(password) || reg4.test(password)){
				$('.login').append('<span class="errorIcon"></span><span class="errorMsg">密码长度6~16位，数字、字母、字符至少包含两种</span>');
				return false;
			}else{
				$('.login').append('<span class="rightIcon"></span>');
				return true;
			}
		}else{
			$('.login').append('<span class="errorIcon"></span><span class="errorMsg">密码长度6~16位，数字、字母、字符至少包含两种</span>');
			return false;
		}
	}
}

function check_repass()
{
	var password = document.getElementById('pw').value;
	var repassword = document.getElementById('pwd').value;
	$('div.makesure span').remove(".rightIcon").remove(".errorIcon").remove(".errorMsg");
	if('' == repassword)
	{
		$('.makesure').append('<span class="errorIcon"></span><span class="errorMsg">请输入确认密码</span>');
		return false;
	}else{
		if(password != repassword){
			$('.makesure').append('<span class="errorIcon"></span><span class="errorMsg">两次密码不一致</span>');
			return false;
		}else{
			$('.makesure').append('<span class="rightIcon"></span>');
			return true;
		}
	}
}

$(function(){
	$('#pw').blur(function(){
		check_pass();
	});
	$('#pw').focus(function(){
		$('div.login span').css('display','none');
	});
	$('#pw').keyup(function(){
		 check_pass_strong();
	});

	$('#pwd').blur(function(){
		check_repass();
	});
	$('#pwd').focus(function(){
		$('div.makesure span').css('display','none');
	});
});

