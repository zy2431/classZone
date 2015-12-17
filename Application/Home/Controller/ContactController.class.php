<?php
namespace Home\Controller;
use Think\Controller;
class ContactController extends CommonController {
    public function index(){
        $class = $this->getCurrentClass();
        $userModel = D("Common/User");
        $users = $userModel->Relation(TRUE)->where("class_id=".$class['id'])->select();
        $this->assign("contactList",$users);
    	$this->display();
    }
    
    public function outExcel(){
        C('SHOW_PAGE_TRACE',false);
        $class = $this->getCurrentClass();
        $userModel = D("Common/User");
        $users = $userModel->Relation(TRUE)->where("class_id=".$class['id'])->select();
        $arr = array();
        foreach ($users as $k=>$v){
            $user['username'] = $v['username'];
            $user['true_name'] = $v['userinfo']['true_name'];
            $user['telphone'] = $v['userinfo']['telphone'];
            $user['qq'] = $v['userinfo']['qq'];
            $user['weibo'] = $v['userinfo']['weibo'];
            $user['email'] = $v['userinfo']['email'];
            $user['address'] = $v['userinfo']['address'];
            $arr[$k] = $user;
        }
        $this->exportexcel($arr,$title=array("账号","姓名","电话","qq","微博","email","家庭住址"),$class['classname']."班通讯录");
    }
    
    /**
     * 导出数据为excel表格
     *@param $data    一个二维数组,结构如同从数据库查出来的数组
     *@param $title   excel的第一行标题,一个数组,如果为空则没有标题
     *@param $filename 下载的文件名
     *@examlpe
     $stu = M ('User');
     $arr = $stu -> select();
     exportexcel($arr,array('id','账户','密码','昵称'),'文件名!');
     *//**
    * 导出数据为excel表格
    *@param $data    一个二维数组,结构如同从数据库查出来的数组
    *@param $title   excel的第一行标题,一个数组,如果为空则没有标题
    *@param $filename 下载的文件名
    *@examlpe 
    $stu = M ('User');
    $arr = $stu -> select();
    exportexcel($arr,array('id','账户','密码','昵称'),'文件名!');
*/
    private function exportexcel($data=array(),$title=array(),$filename='report'){
        header("Content-type:application/octet-stream");
        header("Accept-Ranges:bytes");
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:attachment;filename=".$filename.".xls");
        header("Pragma: no-cache");
        header("Expires: 0");
        //导出xls 开始
        if (!empty($title)){
            foreach ($title as $k => $v) {
                $title[$k]=iconv("UTF-8", "GB2312",$v);
            }
            $title= implode("\t", $title);
            echo "$title\n";
        }
        if (!empty($data)){
            foreach($data as $key=>$val){
                foreach ($val as $ck => $cv) {
                    $data[$key][$ck]=iconv("UTF-8", "GB2312", $cv);
                }
                $data[$key]=implode("\t", $data[$key]);
            }
            echo implode("\n",$data);
        }
    }
    
}