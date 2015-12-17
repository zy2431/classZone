<?php
namespace Home\Controller;
use Think\Controller;
/**
 * 留言版控制器
 * @author wolfgang
 */
class MessageController extends CommonController {
    public function index(){
        $message = D("message");
        $class = $this->getCurrentClass();
        
        
        $count      =  $message->where("parent_id=0 and class_id=".$class['id'])->count();// 查询满足要求的总记录数
        $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
        // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
        $data = $message->limit($Page->firstRow.','.$Page->listRows)->where("parent_id=0 and class_id=".$class['id'])->select();
        $show = $this::getPageShow($Page);
        $this->assign('page',$show);// 赋值分页输出
        
        //$this->assign('data',$data);// 赋值数据集
        for($i = 0 ;$i<count($data);$i++){
            $childMessage = D("message");
            $childData = $childMessage->where("parent_id=".$data[$i]['id'])->select();
            //设置回复中的用户信息
            $data[$i]['child'] = $childData;
                for ($j=0;$j<count( $childData);$j++){
                    $msgAppUser = D('Common/User');
                    $data[$i]['child'][$j]['user'] = $msgAppUser->Relation("userinfo")->find($data[$i]['child'][$j]['create_id']);
                }
            
            $msgUser = D('Common/User');
            $data[$i]['user'] =   $msgUser->Relation("userinfo")->find($data[$i]['create_user_id']);
        }
//        dump($data);exit;
        $this->assign("totalRows",$Page->totalRows);
        $this->assign("data",$data);
    	$this->display();
    }
    
    public  function add(){
        $user = $this->getCurrentUser();
        $class = $this->getCurrentClass();
        $message = D("message");
        //判断是否有父
        if(isset($_GET['pid'])){
            $message->parent_id = I('pid');
        }else{
            $message->parent_id = 0;
        }
//       dump($_GET);exit;
        $message->create_time = time();//  创建时间
        $message->create_user_id = $user['id'];//创建用户
        $message->class_id = $class['id'];//所属班级
        $message->context = I("context");//留言内容
        //设置消息楼层数
        $where["parent_id"] = $message->parent_id;
        $where["class_id"] = $class['id'];
        $message->floor_num = $message->where($where)->count() +1;
        
       // dump($message);exit;
        $res = $message->add();
        
        if($res){
            $this->success("留言成功","index",1);
        }else{
            $this->error("留言失败 请重试","index",1);
        }
    }
    
    public function del(){
        
    }
    
}