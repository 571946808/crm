/*-----------------------------------------------------------------------------
* @Description:     权限管理-会员添加
* @Version:         1.0.0
* @author:          sunwanlin(1124038074@qq.com)
* @date             2017.7.20
* ==NOTES:=============================================
* v1.0.0(2017.7.20):
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
     * 表格编辑按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_edit').click(function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id'),
            express = $(tr).attr('data-express'),
            description = $(tr).attr('data-description');

        $('.hidId').val(id);
        $('.J_editexpInput').val(express);
        $('.J_editdesInput').val(description);
    });
    /**
     * 对话框编辑按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_editDlg').click(function(){
        var data = $('.J_editForm').data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();

            if (!data.isValid()) {
                return false;
            }
        }
        edit();
    });
    /**
     * 编辑事件
     */
    function edit(){
        var
            id = $('.hidId').val(),
            express = $('.J_editexpInput').val(),
            description = $('.J_editdesInput').val(),
            form = {
                id: id,
                express: express,
                description: description
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.AuthorityManagement.editAuthority,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#editDialog').modal('hide');
                if( rs.code == 0){                   
                    location.reload();
                }else{                
                    $('#modalDialog').modal();
                }

            },
            error: function (message) {
                $('#editDialog').modal('hide');
                $('#modalDialog').modal();
            }
        });
    }
    /**
     * 保存事件
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
                    console.log("Ajax提交成功，后台验证成功");  
                    location.reload();
                }else{ 
                    console.log("Ajax提交成功，后台验证失败"); 
                    location.reload();
                }
            },
            error: function (message) {
                console.log("Ajax提交失败，后台验证失败");
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

            if (!data.isValid()) {
                return false;
            }else{
                save();
                return true;
            }
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
                        }
                    }
                },
                idcardNum: {
                    validators: {
                        stringLength: {
                            min:18,
                            max:18,
                            message: '必须为18位'
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: '不是标准邮箱格式'
                        }
                    }
                }
            }
        });
    }    
});