<?php
namespace Admin\Controller;
use Think\Controller;
class ClassController extends CommonController {


    public function index(){
      $class=D('Common/Class');

      $count      = $class->count();// 查询满足要求的总记录数
      $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
      // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
      $data = $class->relation(true)->limit($Page->firstRow.','.$Page->listRows)->select();
       $show = $this::getPageShow($Page);

      $this->assign('data',$data);// 赋值数据集
      $this->assign('page',$show);// 赋值分页输出
    
      $this->display('list');

    }

    public function add(){
        $academy=M('academy');
        $data=$academy->select();
        $this->assign('data',$data);
        // dump($data);


        $this->display(); 
    }
     public function doadd(){
        $class=D('Common/class');
        $class->academy_id=I('academy_id');
        $class->classname=I('classname');
        $class->description=I('description');
        $class->add();
        $this->success('添加成功','index',1);
     }
     public function delete(){
        $class=M('class');
        $class->delete(I('id'));
        $this->success('删除成功','index',1);
     }

     public function update(){
        $academy=M('academy');
        $academy_data=$academy->select();
        $this->assign('academy_data',$academy_data);

        $class=D('Common/class');
        $data=$class->relation(TRUE)->find(I('id'));
//         var_dump($data);
        $this->assign('data',$data);

        $this->display();
     }

     public function doupdate(){
        $class=M('class');
        $class->id=I('id');
        $class->academy_id=I('academy_id');
        $class->classname=I('classname');
        $class->description=I('description');
        $class->save();
        $this->success('修改成功','index',1);
     }
     
    

}