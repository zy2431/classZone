<?php
namespace Home\Controller;
use Think\Controller;
class PhotoController extends CommonController {
    public function index(){
        //准备相册数据
        $album = M('album');
        $albumData = $album->find(I('id'));
        
        //查询创建相册用户名
        $user = M('user');
        $username = $user->where('id='.$albumData['create_user_id'])->getField('username');
        $albumData['create_user'] = $username;
        
        //准备照片数据
        $photo = M('photo');
        $photoData =  $photo->where("album_id=".I('id'))->select();
//         var_dump($albumData);
        $this->assign("album",$albumData);
        $this->assign("photos",$photoData);
    	$this->display('photo');
    }
    
    public function album(){
        $this->display();
    }
    
    public function add(){
        
        $user = $this->getCurrentUser();
        $photo = M("photo");
        $photo->name = I('name');
        $photo->filename = I('filename');
        $photo->upload_user_id = $user['id'];
        $photo->upload_time = time();
        $photo->album_id = I('album_id');
        $photoId = $photo->add();
        
        //如果相册没有设置封面 则设置当前图片为封面
        $album = M("album");
        $album_data = $album->find(I('album_id'));
        if(!$album_data["show_photo_id"]){
            $album_data["show_photo_id"] = $photoId;
        }
        $album->save($album_data);
    }
    
}