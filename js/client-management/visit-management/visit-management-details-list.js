/*-----------------------------------------------------------------------------
* @Description:     来访管理
* @Version:         1.0.0
* @author:          sunwanlin(1124038074@qq.com)
* @date             2017.7.24
* ==NOTES:=============================================
* v1.0.0(2017.7.24):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
	/**
     * 初始化提示信息、验证表单
     */
    console.log($('.pageDataCount').val());
    showTip();
    formValidatorEditForm();
    formValidatorAddForm();
    Pagination(1);
    /**
     * 进入本页面时发送clientID
     */
    var clientId=$('.clientId').val();
    $.ajax({
            type: "GET",
            url: jQuery.url.PortrayalManagement.sendClientId,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                clientId:clientId
            },     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if( rs.code == 0){
                    console.log("发送成功验证成功");                  
                    //location.reload();
                }else{   
                    console.log("发送成功验证失败");   
                }

            },
            error: function (message) {
                console.log("发送失败"); 
            }
        });
    /**
     * 取消提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000)
    }
    // 结束日期默认为当天,获取文本id并且传入当前日期
    $('#addVisitTime').val(today());
    /**
     * 结束日期默认为当天,获取文本id并且传入当前日期
     * @return {[type]} [description]
     */
    function today(){
        var today = new Date(),
            y = today.getFullYear(),
            m = today.getMonth()+1,
            d = today.getDate();
        //这里判断日期是否<10,如果是在日期前面加'0'
        m = m<10 ? '0'+m : m;
        d = d<10 ? '0'+d : d;
        return y + '-' + m + '-' + d;
    };
/***************************************************以下是分页相关√***********************************************************/
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
            url: jQuery.url.ClientManagement.visitList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){ 
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'" data-number="'+ item.number +'" data-name="'+ item.name +'" data-visitFrom="'+ item.visitFrom +'" data-visitTime="'+ item.visitTime +'" data-visitContent="'+ item.visitContent +'" data-cost="'+ item.cost +'" data-partyName="'+ item.partyName +'" data-partyDate="'+ item.partyDate +'">\
                                    <td>'+ item.number +'</td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.visitFrom +'</td>\
                                    <td>'+ item.visitTime +'</td>\
                                    <td>'+ item.visitContent +'</td>\
                                    <td>'+ item.cost +'</td>\
                                    <td>'+ item.partyName +'</td>\
                                    <td>'+ item.partyDate +'</td>\
                                    <td>\
                                        <a href="#" class="label-info J_edit" data-toggle="modal" data-target="#editDialog"><i class="fa fa-pencil"></i>&nbsp;修改</a>\
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
                console.log(message);
                console.log(1);
                //location.reload();
            }
        });
    }
/***************************************************以下是删除相关√***********************************************************/
    /**
     * 表格删除按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $(document).on('click','.J_del',function(e){

        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });
    /**
     * 表格删除按钮，事件委托
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('#handleDialog').on('click','.J_del',function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.tagId').val(id);
        $('#delDialog').modal();
    });
    /**
     * 删除弹框中的“确定删除”按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_delDlg').click(function(){
        del();
    });
    /**
     * 删除事件
     */
    function del(){
        var
            id = $('.hidId').val(),
            form = {
                id: id
            };
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.delUserInfo,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#delDialog').modal('hide');
                //location.reload();
            },
            error: function (message) {
                console.log('删除失败!');
            }
        });
    }
/***************************************************以下是查询相关√***********************************************************/
    /**
     * 列表点击查询事件
     * @param  {[type]} ){                     }
     * @return {[type]}     [description]
     */
    $(".J_search").click(function(){
        var
            form = $(".J_searchForm").serializeObject(),
            id =$('.clientId').val();
            jQuery.extend(form,{clientId:id});

        Pagination(1, form);
    });
/***************************************************以下是添加相关***********************************************************/
    /**
     * 添加框验证
     */
    function formValidatorAddForm(){
        $('.J_addForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                visitTime: {
                    validators: {
                        notEmpty: {
                            message: '来访日期不能为空！'
                        }
                    }
                },
                visitFrom: {
                    validators: {
                        notEmpty: {
                            message: '  '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '来访来源不能为空！'
                        }
                    }
                },
                cost: {
                    validators: {
                        notEmpty: {
                            message: '消费金额不能为空！'
                        }
                    }
                },
                visitContent: {
                    validators: {
                        notEmpty: {
                            message: '来访内容不能为空！'
                        }
                    }
                }
            }
        });
    }
    /**
     * 添加事件
     */
    function add(){
        var
            form = $('.J_addForm').serializeObject();

        $.ajax({
            type: "GET",
            url: jQuery.url.PortrayalManagement.addTag,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#addDialog').modal('hide');
                if( rs.code == 0){
                    console.log("发送成功验证成功");                  
                    //location.reload();
                }else{   
                    console.log("发送成功验证失败");               
                    $('#modalDialog').modal();
                }

            },
            error: function (message) {
                console.log("发送失败");  
                $('#addDialog').modal('hide');
                $('#modalDialog').modal();
            }
        });
    }
    /**
     * 对话框添加按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_addDlg').click(function(){
        var data = $('.J_addForm').data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }
        }
        add();
    });
    /**
     * 关闭添加对话框清除校验、数据
     * @param  {[type]} ) {                       } [description]
     * @return {[type]}   [description]
     */
    $('#addDialog').on('hidden.bs.modal', function() {
        //$('.J_addForm').bootstrapValidator('resetForm', true);
        $('.J_addVisitTime').val('');
        $('.J_addVisitFromInput').val('');
        $('.J_addCostInput').val('');
        $('.J_addVisitContentInput').val('');

        //$('.J_addRadio1').prop("checked", true);
        $(".J_addForm").data('bootstrapValidator').destroy();
        $('.J_addForm').data('bootstrapValidator', null);
        formValidatorAddForm();
    });
/***************************************************以下是编辑相关***********************************************************/
    /**
     * 获取下拉框中的文字
     * @return {[type]} [description]
     */
    /*function getSelectVal(){
        var selectVal = $("option").val
    }*/
    /**
     * 编辑框验证
     */
    function formValidatorEditForm(){
        $('.J_editForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                visitFrom: {
                    validators: {
                        notEmpty: {
                            message: ''
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '来访来源不能为空！'
                        }
                    }
                },
                visitTime: {
                    validators: {
                        notEmpty: {
                            message: '来访日期不能为空！'
                        }
                    }
                },
                visitContent: {
                    validators: {
                        notEmpty: {
                            message: '来访内容不能为空！'
                        }
                    }
                },
                cost: {
                    validators: {
                        notEmpty: {
                            message: '消费金额不能为空！'
                        }
                    }
                }
            }
        });
    }
    /**
     * 编辑事件
     */
    function edit(){
        var
            page = $('#pageLimit li.active').text(),
            id = $('.hidId').val(),
            form = $('.J_editForm').serializeObject();
            
        jQuery.extend(form, {
            id: id
        })

        $.ajax({
            type: "GET",
            url: jQuery.url.PortrayalManagement.editTag,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#editDialog').modal('hide');
                if( rs.code == 0){                   
                    Pagination(page, form)
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
     * 弹出的对话框里的编辑按钮
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
     * 表格中的编辑按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $(document).on('click','.J_edit',function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id'),
            number = $(tr).attr('data-number'),
            name = $(tr).attr('data-name'),
            visitFrom = $(tr).attr('data-visitFrom'),
            visitTime = $(tr).attr('data-visitTime'),
            visitContent = $(tr).attr('data-visitContent'),
            cost = $(tr).attr('data-cost'),
            partyName = $(tr).attr('data-partyName'),
            partyDate = $(tr).attr('data-partyDate');        

        $('.hidId').val(id);
        $('.J_editNameInput').val(name);
        $('.J_editVisitFromInput').val(visitFrom);
        $('.J_editVisitTime').val(visitTime);
        $('.J_editVisitContentInput').val(visitContent);
        $('.J_editCostInput').val(cost);
        $('.J_editPartyNameInput').val(partyName);
        $('.J_editPartyDateInput').val(partyDate);
    });
    /**
     * 关闭编辑对话框清除校验
     * @param  {[type]} ) {                       } [description]
     * @return {[type]}   [description]
     */
    $('#editDialog').on('hidden.bs.modal', function(){
        $(".J_editForm").data('bootstrapValidator').destroy();
        $('.J_editForm').data('bootstrapValidator', null);
        formValidatorEditForm();
    });
/***************************************************以下是模糊匹配√***********************************************************/
    /**
     * 模糊匹配-可输入也可下拉选择
     */
    $('#editable-select1').editableSelect1({
        effects: 'slide'  
    });
    $('#editable-select2').editableSelect2({
        effects: 'slide'  
    });
    $('#editable-select3').editableSelect3({
        effects: 'slide'  
    });
    $('#html1').editableSelect1();
    $('#html2').editableSelect2();
    $('#html3').editableSelect3();

    /**
     * 姓名-模糊匹配-keyup事件
     */
    $('.J_selectName').keyup(function(){
        var
            name = $('input.J_selectName').val();

        $(".es-list1").empty();     
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.selectNameData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {name: name},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.name + '</li>';                   
                    // console.log(li);
                });
                $(".es-list1").append(li);
            },
            error: function (errMsg) {
                console.log(errMsg);
            }
        });
    });

    /**
     * 身份证-模糊匹配-keyup事件
     */
    $('.J_selectId').keyup(function(){
        var
            idcard = $('input.J_selectId').val();

        $(".es-list2").empty();     
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.selectIdData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {idcard: idcard},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.idcard + '</li>';                 
                    // console.log(li);
                });
                $(".es-list2").append(li);
            },
            error: function (errMsg) {
                console.log(errMsg);
            }
        });
    });
    
    /**
     * 电话-模糊匹配-keyup事件
     */
    $('.J_selectPhone').keyup(function(){
        var
            phone = $('input.J_selectPhone').val();

        $(".es-list3").empty();     
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.selectPhoneData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {phone: phone},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.phone + '</li>';                  
                    // console.log(li);
                });
                $(".es-list3").append(li);
            },
            error: function (errMsg) {
                console.log(errMsg);
            }
        });
    });    
});