<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/zone/Public/admin/css/common.css" type="text/css" />
<title>管理员列表</title>
</head>

<body>
<div id="man_zone">
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
	<form action="<?php echo U('academy/doadd');?>" method="post">
		<tr>
		  <td width="25%" class="left_title_1"><span class="left-title">学院名称</span></td>
		  <td><input type="text" name="name"></td>
		</tr>
		<tr>
		  <td width="25%" class="left_title_1"><span class="left-title">描述</span></td>
		  <td><textarea name="description" rows="2" cols="25" maxlength="255" style="resize:none;"></textarea></td>
		</tr>
		<tr>
		  <td width="25%" class="left_title_1"></td>
		  <td><input type="submit" value="提交"></td>
		</tr>
	</form>
  </table>
</div>
</body>
</html>