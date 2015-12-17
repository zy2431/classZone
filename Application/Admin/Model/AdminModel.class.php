<?php
namespace admin\Model;

use Think\Model;

class AdminModel extends Model
{
    protected $fields = array(
        'id',
        'adminname',
        'password',
        'description',
        '_pk' => 'id',
        'type' => array(
            'id' => 'int',
            'adminname' => 'varchar',
            'password' => 'varchar',
            'description' => 'varchar',
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
        //要验证的字段  验证的规则  错误提示语句   验证条件 附加规则
       array('adminname', '', '用户名称已存在！',0,'unique',3),
       array('adminname','6,20','用户名必须在6-20个字符之间',3,'length',3),  
       array('password','6,20','密码必须在6-20个字符之间',3,'length',3),
    );
    //字段自动处理和过滤
    protected $_auto = array(
        array('password','md5', 3, 'function'),
    );
    
    
    
    // 构造器
    public function __construct()
    {
        parent::__construct();
//         echo 'Admin';
    }
    //公共方法
    public function getAll(){
        $model = D("Admin");
        $data = $model->relation(TRUE)->select();
        return $data;
    }
    
}