 /*-----------------------------------------------------------------------------
 * @Description:    后台管理--配置url地址 (url-core.js)
 * @Version:        V1.0.0
 * @author:         yud(862669640@qq.com)
 * @date            2017.6.30
 * ==NOTES:=============================================
 * v1.0.0(2015.11.02) cuiy:
 * 经项目实践,发现目前项目架构不适合调试使用,需要不断修改IO层,这样会对前\后端的开发带来不便,故决定使用此插件来解决问题
 * v2.0.0(2017.07.22) zhangxn:
 * 为了适应新版框架，现将url-core进行修改
 * ---------------------------------------------------------------------------*/
(function(){
    var
        site ={
            website:'/', //站点地址
            staticWebsite: '/' // 前端服务器地址
        };


    _pw_apiData = {
        //  后台登录
        Login: {
            'getLogin': site.staticWebsite + 'mock/common.json', //'后台登录'
            'sendNameData': site.staticWebsite + 'mock/common.json', //'修改密码发送旧密码'
            'sendPassWordData': site.staticWebsite + 'mock/common.json', //'发送修改密码数据'
        },
        //权限管理
        AuthorityManagement: {
            //基本权限管理
            'authorityList': site.staticWebsite + 'mock/authority-list.json', //'权限分页数据权限',
            'delAuthority': site.staticWebsite + 'mock/common.json', //'删除权限',
            'addAuthority': site.staticWebsite + 'mock/common.json', //'添加权限',
            'editAuthority': site.staticWebsite + 'mock/common.json', //'编辑权限',
            //会员组管理 
            'memberGroupList': site.staticWebsite + 'mock/member-group-management-list.json', //'会员组管理分页数据',
            'delMember': site.staticWebsite + 'mock/common.json', //'删除权限',
            'addMember': site.staticWebsite + 'mock/common.json', //'添加权限',
            'editMember': site.staticWebsite + 'mock/common.json', //'编辑权限',
            //安全组管理
            'securityGroupList': site.staticWebsite + 'mock/security-group-list.json', //'安全组分页数据',
            'delSecurityAuthority': site.staticWebsite + 'mock/common.json', //'删除安全组权限',
            'addSecurityAuthority': site.staticWebsite + 'mock/common.json', //'添加安全组权限',
            'editSecurityAuthority': site.staticWebsite + 'mock/common.json', //'编辑安全组权限',
            //安全组权限管理
            'sendAuthority': site.staticWebsite + 'mock/common.json', //'发送添加的权限',
            'delSecurityGroup': site.staticWebsite + 'mock/common.json', //'删除安全组',
            'securityGroupAuthorityList': site.staticWebsite + 'mock/security-group-authority-list.json', //'安全组权限分页数据',
            'sendTableName': site.staticWebsite + 'mock/common.json', //'用户添加时身份证号码验重',
            'addUser': site.staticWebsite + 'mock/common.json', //'添加用户'
            //用户权限管理
            'delUser': site.staticWebsite + 'mock/common.json', //'删除用户',
            'searchUser': site.staticWebsite + 'mock/common.json', //'查询用户',
            'update': site.staticWebsite + 'mock/common.json' ,//'批量修改用户',
            'batchDelete':site.staticWebsite + 'mock/common.json', //'批量删除用户',
            'batchRole':site.staticWebsite + 'mock/common.json', //'批量修改角色',
            'systemUserList': site.staticWebsite + 'mock/authority-list.json', //'权限分页系统用户权限',
            //字典值管理
            'sendDicTree': site.staticWebsite + 'mock/dictionary-tree.json', //'获取字典值信息',
            'addDicTree': site.staticWebsite + 'mock/dictionary-tree-add.json', //'添加节点，获取字典值信息',
            'delDicTree': site.staticWebsite + 'mock/common.json', //'删除节点信息',
            'editDicTree': site.staticWebsite + 'mock/common.json', //'编辑节点信息',
        },
        //患者管理
        ClientManagement: {
            //基本信息管理
            'userList': site.staticWebsite + 'mock/user-list.json', //'用户分页数据',
            'delUserInfo': site.staticWebsite + 'mock/common.json', //'删除用户信息',
            'joinUserInfo': site.staticWebsite + 'mock/common.json', //'加入会员',
            'sendTableName': site.staticWebsite + 'mock/common.json', //'患者添加时身份证号码验重',
            //访客管理
            'visitorList': site.staticWebsite + 'mock/visitor-list.json', //'访客用户分页数据'
            //会员管理
            'memberList': site.staticWebsite + 'mock/member-management-list.json', //'会员管理分页数据',
            'selectNameData': site.staticWebsite + 'mock/member-management-select-name.json', //'获取姓名信息',
            'selectIdData': site.staticWebsite + 'mock/member-management-select-id.json', //'获取身份证信息',
            'selectPhoneData': site.staticWebsite + 'mock/member-management-select-phone.json' ,//'获取电话信息',
            'sendRadioData': site.staticWebsite + 'mock/common.json' ,//'患者画像单选发送数据',
            'sendCheckBoxData': site.staticWebsite + 'mock/common.json' ,//'患者画像多选发送数据',
            'selectSaveData': site.staticWebsite + 'mock/common.json' ,//'点击保存发送数据', 
            'sendRadioTagId': site.staticWebsite + 'mock/member-management-edit-radio.json' ,//'点击选择发送单选标签ID',
            'sendCheckboxTagId': site.staticWebsite + 'mock/member-management-edit-checkbox.json' ,//'点击选择发送单选标签ID', 
            //积分管理
            'searchPoints': site.staticWebsite + 'mock/common.json', //'查询积分信息',
            'searchUserPoints': site.staticWebsite + 'mock/common.json', //'查询用户积分信息',
            'pointsList': site.staticWebsite + 'mock/accumulate-points-management-list.json', //'积分列表分页数据',
            'pointDetails': site.staticWebsite + 'mock/accumulate-points-management-details.json', //'积分详情页分页数据',
            'rulesPoints': site.staticWebsite + 'mock/common.json', //'兑换积分信息',
            //来访管理
            'visitList': site.staticWebsite + 'mock/visit-management-details-list.json', //'来访信息分页数据',
            'sendClientId': site.staticWebsite + 'mock/common.json', //'发送患者Id',
            //问卷管理
            'questList': site.staticWebsite + 'mock/quest-management-list.json', //'问卷管理列表分页数据',
            'questDetail':site.staticWebsite + 'mock/quest-management-detail.json',//'问卷管理详情分页数据',
            'questItem':site.staticWebsite + 'mock/quest-management-questItem.json',//'问卷管理详情问卷项数据',
            'questAdd':site.staticWebsite + 'mock/common.json',//'问卷管理添加',
        },
        // 画像管理
        PortrayalManagement: {
            //标签管理
            'delInfo': site.staticWebsite + 'mock/common.json', //'删除信息',
            'tagList': site.staticWebsite + 'mock/tag-list.json',//'标签分页数据',
            'addTag': site.staticWebsite + 'mock/common.json', //'新增标签',
            'editTag': site.staticWebsite + 'mock/common.json', //'编辑标签',
            'sendTagId': site.staticWebsite + 'mock/send-tag-id.json',//'发送标签项操作ID，获取数据列表',
            'sendNewTag': site.staticWebsite + 'mock/send-new-tag.json',//'发送新标签'
            'delTagItem': site.staticWebsite + 'mock/common.json', //'删除标签项',
            //画像列表
            'sendPortrayal': site.staticWebsite + 'mock/common.json',//'搜索画像信息',
            'chooseSingle': site.staticWebsite + 'mock/common.json',//'选择单个画像信息',
            'chooseComplex': site.staticWebsite + 'mock/common.json',//'选择多个画像信息',
            'portrayalList': site.staticWebsite + 'mock/portrayal-function-list.json', //'画像管理列表分页数据',
            'updatePortrayal': site.staticWebsite + 'mock/common.json',//'批量修改多个画像信息',
            'radioUpdateData': site.staticWebsite + 'mock/common.json',//'批量选择单个画像信息',
            'updateRadioTagId': site.staticWebsite + 'mock/portrayal-function-update-radio.json',//'批量发送单个画像信息',
            'updateCheckboxTagId': site.staticWebsite + 'mock/portrayal-function-update-checkbox.json',//'批量发送多个画像信息',
            'updateCheckBoxData': site.staticWebsite + 'mock/common.json',//'批量选择多个画像信息',
            //行为分析
            'behaviorAnalysisList': site.staticWebsite + 'mock/behavior-analysis-management-list.json',//'行为分析列表分页数据', 
            'behaviorGetTagItem': site.staticWebsite + 'mock/behavior-get-tagitem-list.json'//'行为分析获取标签列表',
        },
        // 客户关怀管理
        ECRBManagement: {
            //模板管理
            'templateList': site.staticWebsite + 'mock/template-management-list.json', //'模板管理分页数据',
            'delTemplate': site.staticWebsite + 'mock/common.json', //'删除模板信息',
            'sendActiveName': site.staticWebsite + 'mock/common.json', //'发送活动名称验重',
            'saveData': site.staticWebsite + 'mock/common.json', //'发送模板数据',
            'selectTemplate': site.staticWebsite + 'mock/common.json', //'发送选择模板id',
            //待开展活动列表
            'searchActivity': site.staticWebsite + 'mock/activities-management-select-activity.json',//'查询活动信息',
            'promotionActivity': site.staticWebsite + 'mock/activities-management-select-activity.json',//'查询活动信息',
            'cancleActivity': site.staticWebsite + 'mock/common.json',//'注销活动信息',
            'approveActivity': site.staticWebsite + 'mock/common.json',//'审批活动信息',
            //待开展活动-新建活动
            'saveWillData': site.staticWebsite + 'mock/activities-management-will.json', //'点击保存按钮,发送模板数据',
            'addYes': site.staticWebsite + 'mock/common.json', //'发送关联检查项数据',
            'addYesPoints': site.staticWebsite + 'mock/common.json', //'发送关联积分数据',
            'sendTemplateId': site.staticWebsite + 'mock/common.json',//'发送模板ID和模板是否被使用',
            'submitForm': site.staticWebsite + 'mock/common.json',//'点击提交审核按钮，提交表单',
            //待开展活动-修改活动
            'returnVal': site.staticWebsite + 'mock/activities-management-will-edit.json',//'发送活动id，返回修改页form内容的原来的值',
            'returnCheckVal': site.staticWebsite + 'mock/activities-management-will-edit-check.json',//'发送活动id，返回修改页check内容的原来的值',
            'returnPointsVal': site.staticWebsite + 'mock/activities-management-will-edit-points.json',//'发送活动id，返回修改页points内容的原来的值',
            //进行中的活动
            'selectActivityName': site.staticWebsite + 'mock/activities-management-select-activity-name.json', //'查询活动名称信息',
            'searchActivityIng': site.staticWebsite + 'mock/activities-management-select-activity-ing.json',//'查询进行中活动信息',
            'stopActivity': site.staticWebsite + 'mock/common.json',//'暂停活动信息',
            'recordList': site.staticWebsite + 'mock/activities-management-ing-record-list.json', //'记录页分页数据',
            'sendRecord': site.staticWebsite + 'mock/common.json',//'提交记录',
            'processActivity': site.staticWebsite + 'mock/common.json',//'处理活动',
            'informList': site.staticWebsite + 'mock/activities-management-ing-inform-list.json', //'通知处理分页',
            'informOk': site.staticWebsite + 'mock/common.json', 
            'activitesDetailsList': site.staticWebsite + 'mock/activities-management-ing-details-list.json', //'详情页分页数据',
            'joinList': site.staticWebsite + 'mock/activities-management-ing-record-list.json', //'参与活动列表页分页数据',
            'stopAllActivity': site.staticWebsite + 'mock/common.json',//'暂停所有活动信息',
            //待办问卷
            'dealQuest': site.staticWebsite + 'mock/questionnaire-management-todo-list.json', //'待办问卷',
            'delQuest': site.staticWebsite + 'mock/common.json', //'删除问卷',
            //待办事务
            'backLog': site.staticWebsite + 'mock/backlog-management-list.json', //'待办事务',
            'delBacklog': site.staticWebsite + 'mock/common.json', //'删除事务',
            //待办通知
            'notificationList': site.staticWebsite + 'mock/notification-management-list.json', //'待办通知列表分页数据',
            'notificationDetailList': site.staticWebsite + 'mock/notification-management-detail-list.json', //'待办通知详情分页数据',
            //已完成的活动
            'finishedActivity': site.staticWebsite + 'mock/activities-management-finished-activity-list.json', //'已完成活动分页数据',
            'finishedActivityDetail': site.staticWebsite + 'mock/activities-management-finished-activity-detail.json', //'已完成活动详情分页数据',
            'selectEventName': site.staticWebsite + 'mock/activities-management-select-event-name.json', //'查询事件名称',
            'finishedActivityDetailInform': site.staticWebsite + 'mock/activities-management-finished-activity-detail-inform.json', //'已完成活动详情通知',
            //累积参与活动
            'participSituation': site.staticWebsite + 'mock/participation-situation.json', //'累积参与情况",
        }
    };

    jQuery.extend({
        url: _pw_apiData
    });
})();