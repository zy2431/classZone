<?php
namespace Admin\Controller;
use Admin\Common\Controller\AuthController;

class CommonController extends AuthController {
//     public  function _initialize(){
//         if(!empty($_SESSION['admin'])){
//             $this->redirect('Public/login');
//             exit;
//         }
//     }

//设置分页方式 并返回分页的效果
    public function getPageShow($Page){
    	$Page->setConfig('prev', "上一页");//上一页
  		$Page->setConfig('next', '下一页');//下一页
  		$Page->setConfig('first', '首页');//第一页
  		$Page->setConfig('last', "末页");//最后一页
  		$Page -> setConfig ( 'theme', '%HEADER% %FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END%' );
  		return $Page->show();
    }
   
}
