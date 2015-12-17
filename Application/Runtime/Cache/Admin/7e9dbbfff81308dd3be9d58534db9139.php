<?php if (!defined('THINK_PATH')) exit();?>﻿<link rel="stylesheet" href="/zone/Public/admin/css/common.css" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #EEF2FB;
}
-->
</style>
<script>
  function confirm_check(){
    var returnVal = window.confirm("您确定要删除吗?", "标题"); 
    if(returnVal) { 
      return true;
    }else{
      return false;
    }
  }
</script>
<body>
          <div id="man_zone">
            <table width="99%" border="0" align="center"  cellpadding="4" cellspacing="1" class="table_style">
              <tr>
                <td width="20%" class="left_title_1" style="text-align:left"><span class="left-title">编号</span></td>
               <td width="20%" class="left_title_1" style="text-align:left"><span class="left-title">学院名称</span></td>
                <td width="35%" class="left_title_1" style="text-align:left"><span class="left-title">描述</span></td>
                 <td width="25%" class="left_title_1" style="text-align:left"><span class="left-title">操作</span></td>
              </tr>
                <!-- 循环遍历查询出的数据 -->
 <?php if(is_array($data)): $i = 0; $__LIST__ = $data;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
                  <td><?php echo ($vo["id"]); ?></td>
                  <td><?php echo ($vo["name"]); ?></td>
                  <td><?php echo ($vo["description"]); ?></td>
                  <td><a href="<?php echo U('academy/update');?>?id=<?php echo ($vo["id"]); ?>">修改</a> 
                    <a href="<?php echo U('academy/delete');?>?id=<?php echo ($vo["id"]); ?>" onclick="return confirm_check()">删除</a></td>
                </tr><?php endforeach; endif; else: echo "" ;endif; ?>

               <tr>
                <td align="left" colspan="4" valign="top" class="fenye">
                    <?php echo ($page); ?>
                 </td> 
              </tr>
          </table>
</div>
</body>