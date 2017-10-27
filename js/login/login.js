/*-----------------------------------------------------------------------------
* @Description:     登录首页
* @Version:         1.0.0
* @author:          yudan(862669640@qq.com)
* @date             2017.7.14
* ==NOTES:=============================================
* v1.0.0(2017.7.14):
     初始生成
* ---------------------------------------------------------------------------*/
$(document).ready(function(){
    formValidatorAddForm();

    /**
     * 提交数据
     * @param  {[type]} ){                                   var                                    username      [description]
     * @param  {[type]} error: function      (message) {                   $("#modalDialog").modal( [description]
     * @return {[type]}        [description]
     */
    $('.J_submitBtn').click(function(){
        var
            username = $('.J_username').val(),
            pwd = $('.J_pwd').val(),
            form = {
                username: username,
                password: pwd
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.Login.getLogin,
            contentType: "application/json; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                //location.reload();
                if(rs.code != 0){
                    $("#modalDialog").modal();
                }

            },
            error: function (message) {
                $("#modalDialog").modal();
            }
        });
    });

    /**
     * 重置按钮清除校验
     */
    $(".J_resetBtn").click(function(){
        location.reload();
    });

    /**
     * 登录验证
     */
    function formValidatorAddForm(){
        $('#J_form').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                loginName: {
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空，请重新输入'
                        }
                    }
                },
                pwd: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空，请重新输入'
                        }
                    }
                }
            }
        });
    }
});