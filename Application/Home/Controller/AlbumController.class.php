<?php
namespace Home\Controller;
use Think\Controller;
class AlbumController extends CommonController {
    public function index(){
        $album  = M('album');
        $class = $this->getCurrentClass();
        $where['class_id'] = $class['id'];
        if(isset($_GET['nav_id'])){
            $where['album_nav_id'] = I('nav_id');
            $albumNav = M('album_nav');
            $albumNavData = $albumNav->find( I('nav_id'));
            $this->assign('albumTitle',$albumNavData['name']);
//             dump($albumNavData['name']);exit;
        }else{
            $this->assign('albumTitle',"全部相册");
        }
        $albumData = $album->where($where)->select();
        
        foreach ($albumData as $key=>$val){
            $photo = M('photo');
            $show_photo_data = $photo->find($val['show_photo_id']);
            $albumData[$key]['show_photo'] = $show_photo_data['filename'];
        }
        $this->assign('album', $albumData);
        
        $this->display('gallerys');
    }
    
    public function add(){
        $album  = M('album');
        
        $data = $album->create();
       
        $class = $this->getCurrentClass();
        $user = $this->getCurrentUser();
        $data['create_time'] = time();
        $data['create_user_id'] = $user['id'];
        $data['class_id'] = $class['id'];
        //dump($data);
        $res = $album->add($data);
        if($res){
            $this->ajaxReturn(true);
        }else{
            $this->ajaxReturn(false);
        }
        
    }
    
    public function getAllNav(){
        $albumNav = M('album_nav');
        $class = $this->getCurrentClass();
        $where['class_id'] = $class['id'];
        $albumNavData = $albumNav->where($where)->select();
        $this->ajaxReturn($albumNavData);
    }
    
    public function setShowPhoto(){
        $album  = M('album');
        $data['id'] =I("album_id");
        $data['show_photo_id'] = I("photo_id");
        $res =  $album->save($data);
        if($res){
            $this->ajaxReturn(true);
        }else{
            $this->ajaxReturn(false);
        }
    }
}