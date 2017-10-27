/*-----------------------------------------------------------------------------
* @Description:     权限管理-用户管理
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.19
* ==NOTES:=============================================
* 
* ---------------------------------------------------------------------------*/
$(document).ready(function() {
    /**
     * 初始化提示信息、验证表单
     */
    showTip();
    // formValidatorAddForm();
    Pagination(1);
     /**
     * 取消提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }
    /**
     * 操作点击事件
    */

    $('.J_del').click(function(e) {
        var tr = $(e.target).parents('tr'),
        id = $(tr).attr('data-id');
        $('.hidId').val(id);
    });
     /**
     * 操作删除按钮
     
     */
    $('.J_delDlg').click(function() {
        del();
    });

    /**
     * 删除事件
     */

    function del() {
        var id = $(".hidId").val(),
        form = {
            id: id
        };

        $.ajax({
            type: "GET",
            url: jQuery.url.AuthorityManagement.delUser,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,
            //JSON.stringify
            dataType: "json",
            success: function(rs) {
                $('#delDialog').modal('hide');
                if (rs.code == 0) {
                    // location.reload();
                } else {
                    $('#modalDialog').modal();
                }

            },
            error: function(message) {
                $('#delDialog').modal('hide');
                $('#modalDialog').modal();
            }
        });
    }
    /**
     * 点击搜索事件
     * @param  {[type]} ){                     search();    } [description]
     * @return {[type]}     [description]
     */
    
    $(".J_search").click(function(){
        var
            form = $(".J_searchForm").serializeObject();

        console.log(form)
        Pagination(1, form);
    });

    /**
     * selectAll全选
     */
    $('.J_selectAll').click(function(){
        var
            selectMap = $('.J_select');
        if( selectMap.length != $('.J_select:checked').length){
            $('.J_selectAll').prop('checked', true);
            selectMap.prop('checked', true);
        }else{
            selectMap.prop('checked', false);
        }
    });

    /**
     * select按钮
     */
    $(document).on('click', '.J_select', function(){
        var
            selectMap = $('.J_select'),
            selectAll = $('.J_selectAll');
        if( selectMap.length == $('.J_select:checked').length){
            selectAll.prop('checked', true);
        }else{
            selectAll.prop('checked', false);
        }
    });
    /**
     * 批量删除事件
     */
    $("#del_model").click(function() {
        // 判断是否至少选择一项
        var select = $('.J_select:checked').length;
        if(select == 0){
            $("#modalDel").modal();
            //return;
        } else {
            $("#modalAll").modal();
        }
    });

 // 批量选择 
    $(".J_delAllDlg").click(function() {
        // 判断是选择多项
            var subBoxList = $("input[class='J_select']:checked");
            var subBoxValue = [];
            if (subBoxList.length > 0) {
                for (var i = 0; i < subBoxList.length; i++) {
                    subBoxValue[i] = subBoxList.get(i).value;
                }
                 var param = {
                    subBoxValue: JSON.stringify(subBoxValue)
                };
                 $.ajax({
                    type: "get",
                    url: jQuery.url.AuthorityManagement.batchDelete,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: param,
                    dataType: "json",
                    success: function(rs) {
                        $('#modalAll').modal('hide');
                        if (rs.code == 0) {
                            //location.reload();
                        } else {
                            $('#modalDialog').modal();
                        }

                    },
                    error: function(message) {
                        $('#modalAll').modal('hide');
                        $('#modalDialog').modal();
                    }

                });
            }

    });
    /**
     * 批量修改详情事件
     */
    $("#edit_model").click(function() {
        // 判断是否至少选择一项
        var select = $('.J_select:checked').length;
        if(select == 0){
            $("#modalDel").modal();
            //return;
        } else {
            $("#editDialog").modal();
        }
    });
    // 批量选择 
    $(".J_editDlg").click(function() {
        // 判断是选择多项  
        var checkedNum = $("input[class='J_select']:checked").length;
        if (checkedNum >= 1) {
            var subBoxList = $("input[class='J_select']:checked");
            console.log(2131);
            var subBoxValue = [];
            if (subBoxList.length > 0) {
                for (var i = 0; i < subBoxList.length; i++) {
                    subBoxValue[i] = subBoxList.get(i).value;
                }
                var customerType = $("#customerType option:selected").val();
                var department = $("#department option:selected").val();
                var position = $("#position option:selected").val();
                var lead = $("#lead option:selected").val();

                var param = {
                    subBoxValue: JSON.stringify(subBoxValue),
                    customerType: customerType,
                    department: department,
                    position: position,
                    lead: lead
                };
                console.log(param);

                $.ajax({
                    type: "get",
                    url: jQuery.url.AuthorityManagement.update,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: param,
                    dataType: "json",
                    success: function(rs) {
                        $('#editDialog').modal('hide');
                        if (rs.code == 0) {
                            //location.reload();
                        } else {
                            $('#modalDialog').modal();
                        }

                    },
                    error: function(message) {
                        $('#editDialog').modal('hide');
                        $('#modalDialog').modal();
                    }

                });
        }  
       } 

    });
    /**
     * 批量分配角色事件
     */
    $("#allot_model").click(function() {
        // 判断是否至少选择一项
        var select = $('.J_select:checked').length;
        if(select == 0){
            $("#modalDel").modal();
            //return;
        } else {
            $("#allotDialog").modal();
        }
    });
     $(".J_role").hover(function () {
        if($(".J_role option:selected").val() == 9){
            $(".J_group").removeClass("hidden");
        }else{
            $(".J_group").addClass("hidden");
        }
    });
    // 批量选择 
    $(".J_allotDlg").click(function() {
        // 判断是选择多项
        var checkedNum =  $("input[class='J_select']:checked").length;
        if (checkedNum >= 1) {
            var subBoxList =  $("input[class='J_select']:checked");
            var subBoxValue = [];
            if (subBoxList.length > 0) {
                for (var i = 0; i < subBoxList.length; i++) {
                    subBoxValue[i] = subBoxList.get(i).value;
                }

                var role = $("#role option:selected").val();

                var param = {
                    subBoxValue: JSON.stringify(subBoxValue),
                    role: role
                };
                

                $.ajax({
                    type: "get",
                    url: jQuery.url.AuthorityManagement.batchRole,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: param,
                    dataType: "json",
                    success: function(rs) {
                        $('#allotDialog').modal('hide');
                        if (rs.code == 0) {
                            //location.reload();
                        } else {
                            $('#modalDialog').modal();
                        }

                    },
                    error: function(message) {
                        $('#allotDialog').modal('hide');
                        $('#modalDialog').modal();
                    }

                });
            }
        }

    });
/**
     * 分页
     */
    $('#pageLimit').bootstrapPaginator({
        //currentPage: 3,
        totalPages: $('.pageDataCount').val(),
        size: "small",
        bootstrapMajorVersion: 3,
        alignment: "right",
        numberOfPages: 5,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first": return "首页";
                case "prev": return "<";
                case "next": return ">";
                case "last": return "末页";
                case "page": return page;
            }
        },
        
        onPageClicked: function (event, originalEvent, type, page) {
            var
                form = $(".J_searchForm").serializeObject();

            Pagination(page, form);  
        }
    });



    /**
     * 分页刷数据
     */
   /**
     * 分页刷数据
     */
    function Pagination(page, extraData){

        var
            currentPage = page,            
            str = '',
            data = {
                page: currentPage
            };
        jQuery.extend(data, extraData);

        $.ajax({
            type: "GET",
            url: jQuery.url.AuthorityManagement.systemUserList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'" >\
                                    <td><input type="checkbox" class="J_select" value="'+ item.id +'"></td>\
                                    <td>'+ item.loginName +'</td>\
                                    <td>'+ item.phone+'</td>\
                                    <td>'+ item.createdTime+'</td>\
                                    <td>'+ item.userType+'</td>\
                                    <td>'+ item.department+'</td>\
                                    <td>'+ item.position+'</td>\
                                    <td>'+ item.immediateS+'</td>\
                                    <td>'+ item.lastloginTime+'</td>\
                                    <td>'+ item.status+'</td>\
                                    <td>\
                                        <a href="#"?id='+ item.id +'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;编辑</a>\
                                        <a href="#"?id='+ item.id +'" class="label-info J_details"><i class="fa fa-book"></i>&nbsp;详情</a>\
                                        <a href="#" class="label-info J_del" data-toggle="modal" data-target="#delDialog"><i class="fa fa-times"></i>&nbsp;删除</a>\
                                    </td>\
                                </tr>'
                    }); 
                    $('#J_template').append(str);
                }else{                
                    location.reload();
                }

            },
            error: function (message) {
                location.reload();
            }
        });
    }
        /**
     * 表格处理按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    // $(document).on('click', '.J_power', function(e){
    //     var
    //         tr = $(e.target).parents('tr'),
    //         id = $(tr).attr('data-id');

    //     $('.hidId').val(id);
    // });

    //  /**
    //  * 保存事件
    //  */
    // function save(){
    //         var id = $('.hidId').val(),
    //         var serializeForm=$('.J_powerForm').serializeObject(),
    //      jQuery.extend(serializeForm, {
    //         id: id
    //     });
            
    //         $.ajax({
    //         type: "GET",
    //         url: jQuery.url.AuthorityManagement.addAccountNumber,
    //         contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //         data: serializeForm,     //JSON.stringify
    //         dataType: "json",
    //         success: function (rs) {
    //             if( rs.code == 0){
    //                 console.log("Ajax提交成功，后台验证成功");  
    //                 //location.reload();
    //             }else{ 
    //                 console.log("Ajax提交成功，后台验证失败"); 
    //                 //location.reload();
    //             }
    //         },
    //         error: function (message) {
    //             console.log("Ajax提交失败，后台验证失败");
    //         }
    //     });
    // }
     /**
     * 点击save按钮时提交数据
     * @param  {[type]} ){                     var data [description]
     * @return {[type]}     [description]
     */
    // $('.J_powerDlg').click(function(){
    //     var 
    //         form = $('.J_powerForm'),
    //         data = form.data('bootstrapValidator');
    //     if (data) {
    //     // 修复记忆的组件不验证
    //         data.validate();

    //         if (!data.isValid()) {
    //             console.log("aaa");
    //             return false;
    //         }else{
    //             console.log("bbba");
    //             save();
    //             return true;
    //         }
    //     }
    // });

     /**
     * 点击reset按钮时清空校验、数据
     * @param  {[type]} ) 
     * [description]
     * @return {[type]}   [description]
     */
    // $('.J_reset').on('click', function() {
    //     $('.J_powerForm').bootstrapValidator('resetForm', true);
    //     $(".J_powerForm").data('bootstrapValidator').destroy();
    //     $('.J_powerForm').data('bootstrapValidator', null);
    //     formValidatorAddForm();
    // });
   
    /**
     * 添加框验证
     * [formValidatorAddForm description]
     * @return {[type]} [description]
     */
    // function formValidatorAddForm(){
    //     $('.J_powerForm').bootstrapValidator({
    //         message: 'This value is not valid',
    //         feedbackIcons: {
    //             valid: 'glyphicon glyphicon-ok',
    //             invalid: 'glyphicon glyphicon-remove',
    //             validating: 'glyphicon glyphicon-refresh'
    //         },
    //         fields: {
    //            accountnumber: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: '账户不能为空'
    //                     },
    //                     stringLength: {
    //                         max:18,
    //                         message: '不能多于18位'
    //                     }
    //                 }
    //             },
    //             password: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: '密码不能为空'
    //                     },
    //                     stringLength: {
    //                         min:6,
    //                         max:18,
    //                         message: '必须多于6位'
    //                     }
    //                 }
    //             },
    //             retypePassword: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: '重复密码不能为空'
    //                     },
    //                     stringLength: {
    //                         min:6,
    //                         max:18,
    //                         message: '必须多于6位'
    //                     }
    //                 }
    //             },
    //         }
    //     });
    // }    

});