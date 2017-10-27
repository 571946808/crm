/*-----------------------------------------------------------------------------
* @Description:     登录首页
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.8.02
* ==NOTES:=============================================
* v1.0.0(2017.8.02):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
	/**
     * 初始化提示信息、验证表单
     */
    showTip();
    formValidatorAddForm();

    /**
     * 隐藏提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }

    /**
     * 填完原密码失焦事件
     */
   	$('.J_oldPassword').blur(function(){
   		sendOldPassword();
   	});

    /**
     * 点击重置按钮事件
     */
    $('.J_reset').click(function(){
        clearValid();
    });

    /**
     * 新密码失焦事件
     */
    $('.J_newPassword').blur(function(){
        checkNewPassword();
    });

    /**
     * 保存按钮
     */
    $('.J_save').click(function(){
    	var 
            form = $('.J_searchForm'),
            data = form.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {//如果验证不通过
                return false;
            }else{//如果前台验证通过，则发送数据
            	save(); 
                return true;
            }
        }
    });

    /**
     * 点击重置清除验证功能
     */
    function clearValid(){
        $('.J_searchForm').bootstrapValidator('resetForm', true);
        $(".J_searchForm").data('bootstrapValidator').destroy();
        $('.J_searchForm').data('bootstrapValidator', null);
        formValidatorAddForm();
    }

    /**
     * 验证新密码与旧密码相同事件
     */
    function checkNewPassword(){
        var
            oldPassword = $('.J_oldPassword').val(),
            newPassword = $('.J_newPassword').val();

        if(newPassword == oldPassword && newPassword != null &&  oldPassword != null){
            $('.J_p').text("原密码与新密码相同，请重新操作!");
            $('#checkNewPasswordDialog').modal();
            $('.J_newPassword').val('');
        } 
    }

    /**
     * 失焦发送原密码事件
     */
    function sendOldPassword(){
    	var
    		oldPassword = $('.J_oldPassword').val();

        if(oldPassword != ''){
            $.ajax({
                type: "GET",
                url: jQuery.url.Login.sendNameData,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {oldPassword: oldPassword},     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if(rs.code != 0){
                        $('#oldPasswordDialog').modal();
                        $('.J_oldPassword').val('');
                    }
                },
                error: function (errMsg) {
                    $('#modalDialog').modal();
                }
            });
        }
    }

    /**
     * 保存事件
     */
    function save(){
    	var
    		oldPassword = $('.J_oldPassword').val(),
    		newPassword = $('.J_newPassword').val();

        if(newPassword != oldPassword){
            $.ajax({
                type: "GET",
                url: jQuery.url.Login.sendPassWordData,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if(rs.code != 0){
                        $('#modalDialog').modal();
                    }else{
                        $('.J_p').text("密码修改成功!");
                        $('.J_btn').hide();
                        $('#checkNewPasswordDialog').modal();
                    }
                },
                error: function (errMsg) {
                    $('#modalDialog').modal();
                }
            });
        }else{
            $('.J_p').text("原密码与新密码相同，请重新操作!");
            $('#checkNewPasswordDialog').modal();
        }
    }

    /**
     * 密码验证
     */
    function formValidatorAddForm(){
        $('.J_searchForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                oldPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码为6~18位非空字符，请重新输入'
                        },
                        regexp: {
                            regexp: /^[^ ]+$/,
                            message: ' '
                        },
                        stringLength: {
                            min:6,
                            max:18,
                            message: ' '
                        }
                    }
                },
                newPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码为6~18位非空字符，请重新输入'
                        },
                        regexp: {
                            regexp: /^[^ ]+$/,
                            message: ' '
                        },
                        stringLength: {
                            min:6,
                            max:18,
                            message: ' '
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码为6~18位非空字符，请重新输入'
                        },
                        regexp: {
                            regexp: /^[^ ]+$/,
                            message: ' '
                        },
                        stringLength: {
                            min:6,
                            max:18,
                            message: ' '
                        },
                        identical: {
                        field: 'newPassword',
                        message: '新密码和确认密码不一致'
                    	}
                    }
                }
            }
        });
    }

});