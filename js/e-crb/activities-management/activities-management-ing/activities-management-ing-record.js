/*-----------------------------------------------------------------------------
* @Description:     活动管理-进行中的活动
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.24
* ==NOTES:=============================================
* 
* ---------------------------------------------------------------------------*/
$(document).ready(function() {
    showTip();
    formValidatorForm();
    formValidatorDetailForm();
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

            Pagination(page);  
        }
    });

    /**
     * 分页刷数据
     */
    function Pagination(page){

        var
            currentPage = page,            
            str = '',
            data = {
                page: currentPage
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.recordList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.number+'</td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.rate +'</td>\
                                    <td>'+ item.status+'</td>\
                                    <td>'+ item.startDate +'</td>\
                                    <td>'+ item.people +'</td>\
                                    <td>'+ item.creator +'</td>\
                                    <td>'+ item.createTime +'</td>\
                                    <td>\
                                        <a href="#" class="label-info J_process" data-toggle="modal" data-target="#modalDialog"><i class="fa fa-edit"></i>&nbsp;处理</a>\
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
    $(document).on('click', '.J_process', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });

    /**
     * 确定提交按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_submit').click(function(){
        var 
            data = $('.J_detailForm').data('bootstrapValidator');

        if (data) {
        // 修复记忆的组件不验证
            data.validate();

            if (!data.isValid()) {
                return false;
            }
        }
        submit();
    });

    /**
     * 提交数据
     */
    function submit(){
        var
            form = $('.J_detailForm').serializeArray();

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.sendRecord,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code == 0){
                    location.reload();
                }else{
                    $('#tipDialog').modal();
                }
            },
            error: function (message) {
                $('#tipDialog').modal();
            }
        });

    }

    /**
     * 处理按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_save').click(function(){
        var 
            data = $('.J_form').data('bootstrapValidator');

        if (data) {
        // 修复记忆的组件不验证
            data.validate();

            if (!data.isValid()) {
                return false;
            }
        }
        process();
    });

    /**
     * 处理事件
     */
    function process(){
        var
            id = $('.hidId').val(),
            form = $('.J_form').serializeArray();

        jQuery.extend(form, {
            id: id
        });

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.processActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code == 0){
                    $('#modalDialog').modal('hide');
                    location.reload();
                }else{
                    $('#modalDialog').modal('hide');
                    $('#tipDialog').modal();
                }
            },
            error: function (message) {
                $('#tipDialog').modal();
            }
        });
    }

    /**
     * 关闭处理对话框清除校验、数据
     * @param  {[type]} ) {                       } [description]
     * @return {[type]}   [description]
     */
    $('#modalDialog').on('hidden.bs.modal', function() {
        $('.J_form').bootstrapValidator('resetForm', true);
        $('.J_date').val('2017-07-01');
        $('.J_nextTime').val('2017-08-01');
        $(".J_form").data('bootstrapValidator').destroy();
        $('.J_form').data('bootstrapValidator', null);
        formValidatorForm();
    });

    /**
     * 详情页验证
     */
    function formValidatorDetailForm(){
        $('.J_detailForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                time: {
                    validators: {
                        notEmpty: {
                            message: '提醒时间不能为空'
                        }
                    }
                },
                date: {
                    validators: {
                        notEmpty: {
                            message: '日期不能为空'
                        }
                    }
                },
                checkItem: {
                    validators: {
                        notEmpty: {
                            message: '检查项选择不能为空'
                        }
                    }
                },
                nextTime: {
                    validators: {
                        notEmpty: {
                            message: '下次计划时间不能为空'
                        }
                    }
                },
                remarks: {
                    validators: {
                        stringLength: {
                            min: 0,
                            max: 100,
                            message: '备注不能超过100字'
                        }
                    }
                }
            }
        });
    }

    /**
     * 处理框验证
     */
    function formValidatorForm(){
        $('.J_form').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: '日期不能为空'
                        }
                    }
                },
                checkItem: {
                    validators: {
                        notEmpty: {
                            message: '检查项选择不能为空'
                        }
                    }
                },
                nextTime: {
                    validators: {
                        notEmpty: {
                            message: '下次计划时间不能为空'
                        }
                    }
                },
                remarks: {
                    validators: {
                        stringLength: {
                            min: 0,
                            max: 100,
                            message: '备注不能超过100字'
                        }
                    }
                }
            }
        });
    }

});