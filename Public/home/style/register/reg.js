var error=['请输入登录名','请输入正确的邮箱/手机号码','请输入验证码','您输入的验证码不正确，请重新输入','请输入登录密码','请输入确认密码','两次密码不一致','请输入图片验证码','请阅读并同意《服务协议》'];
var defaultval=['手机/邮箱','验证码'];
var right=['发送成功'];
var ismobile=false;
/*
  * 绑定邮箱快速输入控件
  */
function setMailAutoComplete(list){
	//alert(list);
	var list_count = list.length;
	for(var i=0;i<list_count;i++){
		$("#"+list[i]).mailAutoComplete({boxClass: "out_box", listClass: "list_box", focusClass: "focus_box", markCalss: "mark_box", autoClass: false});
	}
}
function check_type(){
	var username = document.getElementById('user_name').value;
	if(username != '' && username != defaultval[0]) return false;

	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var reg_mobile = /^1[3|5|8][0-9]{9}$/;
	if(reg_mobile.test(username)){
		$('#Phoneyan').css('display', 'block');
		$('.RegBox').css('height', '546px');
	}else{
		$('#Phoneyan').css('display', 'none');
	}
}
//检查用户名是否存在
function check_uname()
{
	removeTips('div.username span');

	var flag = false;
	var username = document.getElementById('user_name').value;
	if('' == username || defaultval[0] == username)
	{
		document.getElementById('user_name').value = defaultval[0];
		addError('div.username', error[0]);
		$('#Phoneyan').css('display', 'none');
		return false;
	}else{
		var mobile_reg = /^1[3|5|8][0-9]{9}$/;
		var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(mobile_reg.test(username)){
			ismobile=true;
			$('#Phoneyan').css('display', 'block');
			$('.RegBox').css('height', '546px');
		}else if(email_reg.test(username)){
			$('#Phoneyan').css('display', 'none');
		}else{
			addError('div.username', error[1]);
			return false;
		}
	
		$.ajax({
			url:'?q=user/checkaccount',
			type:'POST',
			data: {userName:username},
			dataType:'JSON',
			async:false,
			success: function(data){
				if(data.flag == 1){
					if(data.nums == 1){
						$('#Phoneyan').css('display', 'block');
						$('.RegBox').css('height', '546px');
					}else{
						$('#Phoneyan').css('display', 'none');
					}
	
					flag = true;
					addRight('div.username', '');
					return false;
				}else{
					addError('div.username',data.msg);
					$('#Phoneyan').css('display', 'none');
					return false;
				}
			}
		});
		return flag;
	}
}
//判断图片验证码正误
function check_code()
{
	removeTips('div#Regyan span');
	var flag = false;
	var authcode = document.getElementById('vercode').value;
	if('' == authcode || defaultval[1] == authcode){
		document.getElementById('vercode').value = defaultval[1];
		addError('div#Regyan',error[7]);
		return false;
	}
	$.ajax({
		url:'',
		type:'POST',
		data: {vifycode:authcode},
		async:false,
		success:function(data){
			if(data < 0){
				addError('div#Regyan',error[3]);
				get_code();
				return flag;
			}else{
				addRight('div#Regyan','');
				flag = true;
				return flag;
			}
		}
	});
	return flag;
}
//手机用户验证码判断
function check_phone()
{
	removeTips('div#Phoneyan span');
	var messageyan= $("#Phoneyan #vercode").val();
	if(messageyan == '' || defaultval[1] == messageyan){
		document.getElementById('vercode').value = defaultval[1];
		addError('div#Phoneyan',error[2]);
		return false;
	}else{
		addRight('div#Phoneyan','');
		return true;
	}	
}
function countDown(time){
	$('.Mesbtn').addClass('Mesbtn1').css('disabled',true);
	if(time >= 0){
		$('.Mesbtn').val(time+'秒后重新获取');
		time--;
		setTimeout("countDown("+time+")", 1000);
	}else{
		$('.Mesbtn').removeClass('Mesbtn1').css('disabled',false).val('获取短信激活码');
	}
}
//显示发送短息验证码
function sendMessage()
{
	removeTips('div.username span');
	removeTips('div.login span');
	removeTips('div.makesure span');
	removeTips('div#Regyan span');
	removeTips('div#Phoneyan span');
	
	if(!check_uname()){
		return false;
	}
	if(!check_pass()){
		return false;
	}
	if(!check_repass()){
		return false;
	}
	if(!check_code()){
		return false;
	}
	if(!check_phone()){
		return false;
	}

	var username = $('input[name=user_name]').val();
	var pw = $('#pw').val();
	var pwd = $('#pwd').val();
	var vercode = $('#vercode').val();

	$("div#Phoneyan").append('<span class="rightMsg">发送中...</span>');
	countDown(60);
	$.ajax({
		url:'?q=user/sendSms',
		type:'POST',
		data:{user_mobile:encodeURIComponent(username),type:2},
		dataType:'json',
		async:false,
		success:function(data){
			removeTips('div#Phoneyan span');
			if(data.flag == 1){
				addRight("div#Phoneyan",right[0]);
 				return true;1
			}else{
				var cls = 'Phoneyan';
				if(data.flag == -2){
					var cls = 'username';
				}
				addError("div."+cls, data.msg);
    			return false;
			}
		}
	});
}
function removeTips(ele){
	$(ele).remove(".rightIcon").remove(".rightMsg").remove(".errorIcon").remove(".errorMsg");
}
function addError(ele,msg){
	$(ele).append('<span class="errorIcon"></span><span class="errorMsg">'+msg+'</span>');
}
function addRight(ele,msg){
	$(ele).append('<span class="rightIcon"></span><span class="rightMsg">'+msg+'</span>');
}

$(document).ready(function(){
	var obj = $("#user_name");
	obj.mailAutoComplete({
	    boxClass: "emailist", //外部box样式
	//    listClass: "list_box", //默认的列表样式
	    focusClass: "focus_box", //列表选样式中
	    markCalss: "mark_box", //高亮样式
	    autoClass: false,
	    textHint: true, //提示文字自动隐藏
	    hintText: "请输入邮箱地址"
	});
	
	obj.keyup(function(){
		check_type();
	});
	obj.blur(function(){
		check_uname();
	});
	obj.focus(function(){
		removeTips('div.username span');
		if(this.value == defaultval[0]){this.value = '';}
	});
	$("#vercode").focus(function(){
		removeTips('div#Regyan span');
		if(this.value == defaultval[1]){this.value = '';}
	}).blur(function(){
		check_code();
	});
	$("#smsvercode").focus(function(){
		removeTips('div#Phoneyan span');
		if(this.value == defaultval[1]){this.value = '';}
	}).blur(function(){
		check_phone();
	});
	$(".Mesbtn").live("click", function(){
		sendMessage();
	});
	$("#auth_code").live("click", function(){
		get_code();
	});
});
function reg_submit(){
	if(!check_uname()){
		return false;
	}
	if(!check_pass()){
		return false;
	}
	if(!check_repass()){
		return false;
	}
	if(!check_code()){
		return false;
	}
	if(ismobile){
		if(!check_phone()){
			return false;
		}
	}
	
	var username = $('#user_name').val();
	var pass = $('#pw').val();
	var repass = $('#pwd').val();
	var authcode = $('#vercode').val();
	var smsauthcode = $('#smsvercode').val();
	var isagree = $('.login_ctime').attr('lid');

	removeTips('div.ctime span');
	if(isagree == 0){
		addError('div.ctime',error[8]);
		return false;
	}
	
	$('#regBtn').val('注 册 中 ...');
	$.ajax({
		url:'?q=user/webajaxregister',
		type:'POST',
		data:{username:username,pass:pass,repass:repass,authcode:authcode,smsauthcode:smsauthcode},
		dataType:'json',
		async:false,
		success:function(data){
			if(data.flag == 1){
				window.location.href = data.msg;
			}else{
				switch(data.flag){
					case -2:var cls = 'username';break;
					case -3:var cls = 'login';break;
					case -4:var cls = 'makesure';break;
					case -5:var cls = 'Regyan';break;
					case -6:var cls = 'Phoneyan';break;
					default:var cls = 'reg';break;
				}
				removeTips('div.'+cls+' span');
				addError('div.'+cls,data.msg);
				if(data.flag == -5){
					$('#vercode').val('');
				}
				return false;
			}
		}
	});
	return false;
}