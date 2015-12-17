<?php
namespace Home\Controller;
use Think\Controller;
class IndexPhotoController extends CommonController {
    public function index(){
    	$this->display();
    }
    
    public function setIndexPhoto(){
        
        if(I('positon')&&I('description')&&I('photo_id')){
            $indexPhoto = D('index_photo');
            $data['id'] = (I('positon'));
            $data['positon'] = (I('positon'));
            $data['description'] = (I('description'));
            $data['photo_id'] = I('photo_id');
            
            $class = $this->getCurrentClass();
            $data['class_id'] = $class['id'];
            
            if($indexPhoto->find(I('positon'))){
                $res = $indexPhoto->save($data);
            }else{
                $res = $indexPhoto->add($data);
            }
            if($res){
                $this->ajaxReturn(true);
            }else{
                $this->ajaxReturn(false);
            }
        }else{
            $this->ajaxReturn(false);
        }
    }
    
}