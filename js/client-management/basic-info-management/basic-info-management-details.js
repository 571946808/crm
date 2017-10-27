/*-----------------------------------------------------------------------------
* @Description:     患者管理-查看患者详情
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.15
* ==NOTES:=============================================
* v1.0.0(2015.9.17):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
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
               idcardNum: {
                    validators: {
                        notEmpty: {
                            message: '身份证不能为空'
                        }
                    }
                },
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
            data = $('.J_tableForm').data('bootstrapValidator');

        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {//如果验证不通过
                return false;
            }
            $('#joinDialog').modal();
        }
    });
        /**
        * 取id值
        */
     	$(document).on('click', '.J_join',function(){
     		var id = $("#J_clientId").val();
     		var param = {
     			id: id
     		};
            /**
            * 发送id事件
            */

     		$.ajax({
     			type: "get",
     			url: jQuery.url.ClientManagement.joinUserInfo,
     			contentType: "application/x-www-form-urlencoded; charset=utf-8",
     			data: param,
     			dataType: "json",
                    success: function (rs) {
                    $('#joinDialog').modal('hide');
                     if (rs.code == 0) {
                            // location.reload();
                        } else {
                            $('#modalDialog').modal();
                        }

                    },
                    error: function(message) {
                        $('#joinDialog').modal('hide');
                        $('#modalDialog').modal();
                    }
     		});

     	});
 });