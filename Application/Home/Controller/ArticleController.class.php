<?php
namespace Home\Controller;
use Think\Controller;
class ArticleController extends CommonController {
    public function index(){
        $user = $this->getCurrentUser();
        $class = $this->getCurrentClass();
        
        //设置文章分类数据
        $articleClass = D("article_class");
        $articleClassData = $articleClass->where("class_id=".$class['id'])->select();
        $this->assign("articleClassData",$articleClassData);
        
            $article = M("article");
            $class = $this->getCurrentClass();
//             dump(!empty($_GET));exit;
        if(!empty($_GET)){
        //设置文章列表数据
            $count      = $article->where("class_id=".$class['id']." and article_class_id=".I("id"))->count();// 查询满足要求的总记录数
            $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
            // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
            $data = $article->limit($Page->firstRow.','.$Page->listRows)->where("class_id=".$class['id']." and article_class_id=".I("id"))->select();
            foreach($data as $k=>$v){
                $user = M('user');
                $userdata = $user->find($data[$k]['create_user_id']);
              
                $data[$k]['create_user'] = $userdata;
            }
            $show = $this::getPageShow($Page);
            $articleClass = M('article_class');
            $articleClassData = $articleClass->find(I('id'));
            $this->assign("coutentTitle","文章->".$articleClassData['name']);
        }else{
            $count      = $article->where("class_id=".$class['id'])->count();// 查询满足要求的总记录数
            $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
            // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
            $data = $article->limit($Page->firstRow.','.$Page->listRows)->where("class_id=".$class['id'])->select();
            foreach($data as $k=>$v){
                $user = M('user');
                $userdata = $user->find($data[$k]['create_user_id']);
            
                $data[$k]['create_user'] = $userdata;
            }
            $show = $this::getPageShow($Page);
            $this->assign("coutentTitle","全部文章");
        }
        
        $articleClass = M('article_class');
        $articleClassData = $articleClass->find(I('id'));
        $this->assign('data',$data);// 赋值数据集
        $this->assign('page',$show);// 赋值分页输出
    	$this->display('index_ext');
    }
    public function addArticle(){
        $user = $this->getCurrentUser();
        $class = $this->getCurrentClass();
        $article = D("article");
        $articleData = $article->create();
        $articleData['create_user_id']= $user['id'];
        $articleData['class_id'] = $class['id'];
        $articleData['create_time'] = time();
        
        $res = $article->add($articleData);
        if(res){
            $this->success("添加成功","index",1);
        }else{
            $this->error("添加失败,错误信息：".$article->getError(),"index");
        }
    }
    
    public function addArticleClass(){
        $user = $this->getCurrentUser();
        $class = $this->getCurrentClass();
        
        $articleClass = D("article_class");
        $articleClassData = $articleClass->create($_GET);
        $articleClassData['create_user_id'] = $user['id'];
        $articleClassData['class_id'] = $class['id'];
        $res = $articleClass->add($articleClassData);
        
        if(res){
            $this->success("添加成功","index",1);
        }else{
            $this->error("添加失败,错误信息：".$articleClass->getError(),"index");
        }
    }
    
    public function info(){
        $article = M('article');
        $articleData = $article->find(I('id'));
        $user = M('user');
        $userdata = $user->find($articleData['create_user_id']);
        $articleData['create_user'] = $userdata;
        $this->assign("data",$articleData);
        $this->display();
    }
}