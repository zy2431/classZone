<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends CommonController {
    public function index(){
        $class = $this->getCurrentClass();
        //准备首页轮播图
        $indexPhoto = M('index_photo');
        $indexPhotoData = $indexPhoto->where("class_id=".$class['id'])->order("id")->select();
        foreach ($indexPhotoData as $k=>$v){
            $photo = M('photo');
            $indexPhotoData[$k]['photo'] = $photo->find($indexPhotoData[$k]['photo_id']);
        }
        $this->assign("indexPhotoData",$indexPhotoData);
        //dump($indexPhotoData);
    	$this->display();
    }
}