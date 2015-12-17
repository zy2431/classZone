<?php
namespace Admin\Controller;
use Think\Controller;
class AcademyController extends CommonController {
    public function index(){
        
      $academy = D("Common/Academy");
    	
      $count      = $academy->count();// 查的总询满足要求记录数

      $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
      // 进行分页数据查询 注意limit方法的参数要使用Page类的属性

      $data = $academy->limit($Page->firstRow.','.$Page->listRows)->select();

    	$show       = $this->getPageShow($Page);// 分页显示输出

    	$this->assign('data',$data);// 赋值数据集
    	$this->assign('page',$show);// 赋值分页输出
    	$this->display("academy/list"); // 输出模板
    }
    public function add(){
        $this->display();
    }
    public function doadd(){
    	//echo "add";
    	$academy=D("Common/Academy");
    	$academy->create();
    	if($academy->add()){
            $this->success('添加成功','index',1);
    	}else{
    	    $this->error($academy->getError(),'index',2);
    	}
    }
     public function delete(){
      	$academy = D("Common/Academy");
      	$res = $academy->delete(I('id'));
    	$this->success("删除成功","index",1);
    }
     public function update(){
		$academy = D("Common/Academy");
		$data = $academy->find(I("id"));
		// dump($data);exit;
		$this->assign('data',$data);
    	$this->display();
    }

   public function doupdate(){
   	$academy = D("Common/Academy");
   	$data['id']= I("id");
   	$data['name']= I("name");
   	$data['description']= I("description");

   	$a = $academy->save($data);
		if($a>0){
	    	$this->success("修改成功","index",1);
		}else{
			$this->error("修改失败","index",1);
		}       	
    }
    
    public function getClassByAcademyId(){
        $class = D('Common/Academy');
        $classItem = $class->relation(TRUE)->find(I('Academy_id'));
         
        $data =   $classItem['class'];
        $this->ajaxReturn($data);
    }
    
    public function getAllAcademy(){
        $class = D('Common/Academy');
        $data = $class->select();
        $this->ajaxReturn($data);
    }
}