<?php
namespace Common\Model;

use Think\Model\RelationModel;

class UserModel extends RelationModel
{
    protected $fields = array(
        'id',
        'username',
        'password',
        'create_time',
        'role',
        'class_id',
        '_pk' => 'id',
        'type' => array(
            'id' => 'int',
            'username' => 'varchar',
            'password' => 'varchar',
            'role' => 'int',
            'class_id' => 'int',
        )
    );
    
    
//     验证条件：共三种：
//     1.self::EXISTS_VALIDATE 或 0，表示存在字段就验证（默认） ；
//     2.self::MUST_VALIDATE 或 1，表示必须验证；
//     3.self::VALUE_VALIDATE 或 2，表示值不为空的时候验证。
//     验证时间：主要新增修改等验证。
//     1.self::MODEL_INSERT 或 1 新增数据时验证；
//     2.self::MODEL_UPDATE 或 2 编辑数据时验证；
//     3.self::MODEL_BOTH 或 3 全部情况下验证(默认)。
    //文件自动校验
    protected $_validate = array(
//         要验证的字段  验证的规则  错误提示语句   验证条件 附加规则
       array('username', '', '该用户已存在！',0,'unique',self::MODEL_INSERT),
       array('username','6,20','用户名必须在6-20个字符之间',2,'length',3),
       array('password','6,20','密码必须在6-20个字符之间',2,'length',3),
//        array('role',array(0,1,2,3),'角色格式不正确',2,'in'),
       array('class_id', 'require', '用户必须选择所在班级！'),
    );
    //字段自动处理和过滤
    protected $_auto = array(
            array('password','md5',3, 'function'),
    );
    //关联关系
    protected $_link =  array(
        'class'=> array(
            'mapping_type'=> self::BELONGS_TO ,
            'class_name'=>'Class',
            'foreign_key'=>'class_id',
//             'mapping_name'=>'academyname',
//             'mapping_fields'=>'name',
//             'as_fields'=>'academyname',
            ),
        'userinfo'=> array(
            'mapping_type'=> self:: HAS_ONE ,
            'class_name'=>'Userinfo',
            'foreign_key'=>'User_id',
            //             'mapping_name'=>'academyname',
        //             'mapping_fields'=>'name',
        //             'as_fields'=>'academyname',
        ),
    );
    
    // 构造器
    public function __construct()
    {
        parent::__construct();
//         echo 'User';
    }
}