<?php
namespace Common\Model;

use Think\Model\RelationModel;

class AcademyModel extends RelationModel
{

    protected $fields = array(
        'id',
        'name',
        'description',
        '_pk' => 'id',
        'type' => array(
            'id' => 'int',
            'name' => 'varchar',
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
       array('name','', '该学院已存在！',0,'unique',3),
       array('name','2,20','学院名必须在2-20个字符之间',0,'length',3),  
    );
    //字段自动处理和过滤
    protected $_auto = array(
    );
    
    //关联关系
    protected $_link =  array(
        'class'=> array(
            'mapping_type'=> self:: HAS_MANY ,
            'mapping_name'=>'class',
            'class_name'=>'class',
            'foreign_key'=>'Academy_id',
//             'mapping_fields'=>'content',
//             'mapping_limit'=>'0,2',
//             'mapping_order'=>'id DESC',
        ),
    );
    
    
    // 构造器
    public function __construct()
    {
        parent::__construct();
//         echo 'academy';
    }
}