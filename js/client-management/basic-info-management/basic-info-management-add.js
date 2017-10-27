/*-----------------------------------------------------------------------------
* @Description:     患者信息管理-基本信息添加
* @Version:         1.0.0
* @author:          sunwanlin(1124038074@qq.com)
* @date             2017.7.21
* ==NOTES:=============================================
* v1.0.0(2017.7.21):
     初始生成
* ---------------------------------------------------------------------------*/
$(document).ready(function(){
    /**
     * 初始化提示信息、验证表单
     */
    showTip();
    formValidatorAddForm();
    /**
     * 取消提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }
    /**
     * 分页
     */
    $('#pageLimit').bootstrapPaginator({
        currentPage: 3,
        totalPages: 10,
        size: "small",
        bootstrapMajorVersion: 3,
        alignment: "right",
        numberOfPages: 5,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first": return "首页";
                case "prev": return "<<";
                case "next": return ">>";
                case "last": return "末页";
                case "page": return page;
            }
        },
        pageUrl:function (url,page,current) {
            return "";  
        }
    });
    /**
     * 点击reset按钮时清空校验、数据
     * @param  {[type]} ) 
     * [description]
     * @return {[type]}   [description]
     */
    $('.J_reset').on('click', function() {
        $('.J_tableForm').bootstrapValidator('resetForm', true);
        $(".J_tableForm").data('bootstrapValidator').destroy();
        $('.J_tableForm').data('bootstrapValidator', null);
        formValidatorAddForm();
    });
    /**
     * 添加框验证
     * [formValidatorAddForm description]
     * @return {[type]} [description]
     */
    function formValidatorAddForm(){
        $('.J_tableForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空'
                        }
                    }
                },
                tel: {
                    validators: {
                        notEmpty: {
                            message: '电话不能为空'
                        },
                        stringLength: {
                            min:11,
                            max:11,
                            message: '必须为11位'
                        },
                        regexp: {
                            regexp: /^[0-9_\.]+$/,
                            message: '只能是数字'
                        }
                    }
                },
                idcardNum: {
                    validators: {
                        stringLength: {
                            min:18,
                            max:18,
                            message: '必须为18位'
                        },
                        regexp: {
                            regexp: /^[xX0-9_\.]+$/,
                            message: '只能是字母或数字'
                        }
                    }
                },
                mciNum:{
                    validators: {
                        regexp: {
                            regexp: /^[A-Za-z0-9]+$/,
                            message: '医保卡号由数字、字母组成'
                        }
                    }
                },
                secTel:{
                    validators: {
                        regexp: {
                            regexp: /^1[0-9]{10}(,1[0-9]{10})*$/,
                            message: '可以填写多个联系方式，中间以英文逗号隔开'
                        }
                    }
                },
                age: {
                    validators: {
                        regexp: {
                            regexp: /^\d?$/,
                            message: '年龄必须大于零的整数'
                        }
                    }
                },
                height: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)?$/,
                            message: '身高必须为大于0的数'
                        }
                    }
                },
                weight: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)?$/,
                            message: '体重必须为大于0的数'
                        }
                    }
                }
            }
        });
    }
    /**
     * 点击save按钮时提交数据
     * @param  {[type]} ){                     var data [description]
     * @return {[type]}     [description]
     */
    $('.J_save').click(function(){
        var 
            form = $('.J_tableForm'),
            data = form.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();

            if (!data.isValid()) {//如果验证不通过
                return false;
            }else{//如果前台验证通过，则调用sendCardId()方法，验证身份证是否唯一
            	save(); 
                return true;
            }
        }
    });
    /**
     * 身份证input框失焦
     * 功能：失焦后开始向后台发送cardId,并验重
     * @param  {[type]} ){} [description]
     * @return {[type]}                    [description]
     */
    $(".J_tableName").blur(function(){
		sendCardId();
    });
    /**
     * 身份号码验重
     * 功能：身份号码向后台发ajax，验证是否唯一，唯一则将年龄计算出来显示在input内
     * @return {[type]} [description]
     */
    function sendCardId(){
    	var cardId=$(".J_tableName").val();
    	$.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.sendTableName,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
            	cardId:cardId
            },     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if( rs.code == 0){
                    console.log("sendCardId:Ajax提交成功，后台验证成功");
                    //如果发送成功，并且身份证验证唯一，则计算年龄
	                ageCalculated(cardId);                    
                    //计算年龄之后向后台发送整个表单内容
                }else{ 
                    console.log("sendCardId:Ajax提交成功，后台验证失败"); 
                }
            },
            error: function (message) {
                console.log("sendCardId:Ajax提交失败，后台验证失败");
            }
        });
    }
    /**
     * 计算年龄函数
     * @return {[type]} [description]
     */
    function ageCalculated(cardId){
    	var
	        birthYear=cardId.substr(6,4),
	        myDate = new Date(),
	        nowYear=myDate.getFullYear(),
	        age=nowYear-birthYear;

		$(".J_age").val(age);
    }
    /**
     * 保存事件
     * @return {[type]} [description]
     */
    function save(){

        var serializeForm=$('.J_tableForm').serializeObject();

            $.ajax({
            type: "GET",
            url: jQuery.url.AuthorityManagement.addUser,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: serializeForm,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if( rs.code == 0){
                    console.log("save:Ajax提交成功，后台验证成功");  
                    location.reload();
                }else{ 
                    console.log("save:Ajax提交成功，后台验证失败"); 
                    location.reload();
                }
            },
            error: function (message) {
                console.log("save:Ajax提交失败，后台验证失败");
            }
        });
    }    
});