/*-----------------------------------------------------------------------------
* @Description:     会员管理-会员编辑
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.7.20
* ==NOTES:=============================================
* v1.0.0(2017.7.20):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
    /**
     * 初始化提示信息
     */
    showTip();

    /**
     * 隐藏提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }

    /**
     * 改变会员状态事件
     */
    $('.J_memberStatus').change(function(){
        $('#modalDialog').modal();
    });

    /**
     * 点击单选选择事件，将input的name值取出放到隐藏input中
     */
    $('.J_selectRadio').click(function(e){
        selectRadio(e);
    });

    /**
     * 点击多选选择事件，将input的name值取出放到隐藏input中
     */
    $('.J_selectCheckbox').click(function(e){
        selectCheckbox(e);
    })

    /**
     * 点击单选按钮
     */
     $('.J_radioDlg').click(function(){
        radioSelect();
    });

    /**
     * 点击多选按钮
     */
     $('.J_checkBoxDlg').click(function(){
        checkBoxSelect();
    });

    /**
     * 点击保存按钮
     */
    $('.J_save').click(function(){
        var 
            form = $('.J_form'),
            data = form.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {//如果验证不通过
                return false;
            }else if(validDate() && validNextDate()){//如果前台验证通过，则发送数据
                save(); 
                return true;
            }
        }
    });

    /**
      * 全选selectAll按钮
      */
    $('.J_selectAll').click(function(){
        selectAll();
    });

    /**
     * select按钮
     */
    $(document).on('click', '.J_select', function(){
        select();
    });

    /**
     * 全选事件
     */
    function selectAll(){
        var
            selectMap = $('.J_select');

        if( selectMap.length != $('.J_select:checked').length){
            $('.J_selectAll').prop('checked', true);
            selectMap.prop('checked', true);
        }else{
            selectMap.prop('checked', false);
        }
    }

    /**
     * select全部选中事件
     */
    function select(){
        var
            selectMap = $('.J_select'),
            selectAll = $('.J_selectAll');
        if( selectMap.length == $('.J_select:checked').length){
            selectAll.prop('checked', true);
        }else{
            selectAll.prop('checked', false);
        }
    }

    /**
     * 关闭多选对话框清除全选按钮
     * @param  {[type]} ) {                       } [description]
     * @return {[type]}   [description]
     */
    $('#checkBoxDialog').on('hidden.bs.modal', function() {
        $(".J_selectAll").attr('checked', false);
    });

    /**
     * 画像单选情况-发送画像标签ID，将选择内容刷到选择弹出框中
     */
    function selectRadio(e){
        var
            tagId = $(e.target).parent().prev('div').children('input').attr('value'),
            tagName = $(e.target).parent().prev('div').children('label').html(),
            inputName = $(e.target).parent().prev('div').children('div').children('input').attr('name');

        $('.J_inputName').val(inputName);
        $('.J_tagId').val(tagId);
        $('.J_tagName').html(tagName);
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.sendRadioTagId,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {labelTypeId: tagId},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $(".J_radioSelect").empty();
                if(rs.code == 0){
                    var initOption = '<option value="-1" selected="selected">---清除---</option>';
                    $(".J_radioSelect").append(initOption);
                    $(rs.list).each(function(key, item){
                        var option = "<option value='" + item.id + "'>" + item.name + "</option>";
                        $(".J_radioSelect").append(option);
                    });
                }else{
                    $('#radioDialog').modal('hide');
                    $('#errorDialog').modal();
                }
                
            },
            error: function (message) {
                $('#radioDialog').modal('hide');
                $('#errorDialog').modal();
            }
        }); 
    }

    /**
     * 选择单选事件
     */
    function radioSelect(){
        var
            id = $('.J_id').val(),
            tagId = $('.J_tagId').val(),
            inputName = $('.J_inputName').val(),
            data = $(".J_radioSelect").find("option:selected").text(),
            labelItemId = $(".J_radioSelect").val(),
            ids = [],
            form = {
                labelTypeId: tagId,
                labelItemId: labelItemId
            };

        ids.push(id);
        jQuery.extend(form, {id: ids.toString()});
        if(labelItemId != -1){
            $.ajax({
                type: "GET",
                url: jQuery.url.ClientManagement.sendRadioData,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: form,     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    $('#radioDialog').modal('hide');
                    if( rs.code == 0){
                            $('input[name="'+ inputName +'"]').val(data);
                    }else{                
                        $('#errorDialog').modal();
                    }
                },
                error: function (message) {
                    $('#radioDialog').modal('hide');
                    $('#errorDialog').modal();
                }
            }); 
        }else{
            $.ajax({
                type: "GET",
                url: jQuery.url.ClientManagement.sendRadioData,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: form,     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    $('#radioDialog').modal('hide');
                    if( rs.code != 0){              
                        $('#errorDialog').modal();
                    }
                },
                error: function (message) {
                    $('#radioDialog').modal('hide');
                    $('#errorDialog').modal();
                }
            });
        }
    }

    /**
     * 画像多选情况-发送画像标签ID，将选择内容刷到选择弹出框中
     */
    function selectCheckbox(e){
        var
            tagId = $(e.target).parent().prev('div').children('input').attr('value'),
            tagName = $(e.target).parent().prev('div').children('label').html(),
            textareaName = $(e.target).parent().prev('div').children('div').children('textarea').attr('name');

        $('.J_textareaName').val(textareaName);
        $('.J_tagId').val(tagId);
        $('.J_tagName').html(tagName);
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.sendCheckboxTagId,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {labelTypeId: tagId},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $(".J_checkboxSelect").empty();
                if(rs.code == 0){
                    $(rs.list).each(function(key, item){
                        var str = '<div class="col-sm-6"><label title="'+ item.name +'" class="checkboxWidth"><input type="checkbox" class="J_select" name="'+ textareaName +'" value="'+ item.id +'">' + item.name + '</label></div>';
                        $(".J_checkboxSelect").append(str);
                    });
                }else{
                    $('#checkBoxDialog').modal('hide');
                    $('#errorDialog').modal();
                }
            },
            error: function (message) {
                $('#checkBoxDialog').modal('hide');
                $('#errorDialog').modal();
            }
        }); 
    }

    /**
     * 选择多选事件
     */
    function checkBoxSelect(){
        var
            id = $('.J_id').val(),
            tagId = $('.J_tagId').val(),
            textareaName = $('.J_textareaName').val(),
            data = '',
            labelItemName,
            labelItemList = [],
            ids = [],
            tagIds = [],
            form = {
                id: ids.push(id).toString(),
                labelTypeId: tagIds.push(tagId).toString()  
            };

        ids.push(id);
        tagIds.push(tagId);
        jQuery.extend(form, {clientId: ids.toString()});
        jQuery.extend(form, {labelTypeId: tagIds.toString()});
        $('input[name="'+ textareaName +'"]:checked').each(function(){ 
            labelItemName = $(this).parent().text();
            data += ''+ labelItemName +'' + '，'; 
        });
        $('input[name="'+ textareaName +'"]:checked').each(function(){ 
            labelItemList.push($(this).val()); 
        });
        jQuery.extend(form, {labelItemId: labelItemList.toString()});
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.sendCheckBoxData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#checkBoxDialog').modal('hide');
                if( rs.code == 0){ 
                    $('textarea[name="'+ textareaName +'"]').val('');
                    $('textarea[name="'+ textareaName +'"]').val(data);
                }else{                
                    $('#errorDialog').modal();
                }
            },
            error: function (message) {
                $('#checkBoxDialog').modal('hide');
                $('#errorDialog').modal();
            }
        });
    }

    /**
     * 点击保存事件
     */
    function save(){
        var
            // data = $('.J_memberLevel').val(),
            form = $('.J_form').serialize();

        // if(data != -1){
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.selectSaveData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if( rs.code == 0){ 
                     // window.history.back();
                }else{                
                    $('#errorDialog').modal();
                }
            },
            error: function (message) {
                $('#errorDialog').modal();
            }
        });
        // }else{
            // $('#memberDialog').modal();
        // }
    }

    /*******************************验证表单******************************************/
    formValidatorAddForm();

    /**
     * 点击reset按钮时清空校验、数据
     * @param  {[type]} ) 
     * [description]
     * @return {[type]}   [description]
     */
    $('.J_reset').on('click', function() {
        $('.J_form').bootstrapValidator('resetForm', true);
        $(".J_form").data('bootstrapValidator').destroy();
        $('.J_form').data('bootstrapValidator', null);
        formValidatorAddForm();
    });

    /**
     * 添加框验证
     * [formValidatorAddForm description]
     * @return {[type]} [description]
     */
    function formValidatorAddForm(){
        $('.J_form').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                height: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)?$/,
                            message: '身高不能为负数'
                        }
                    }
                },
                weight: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)?$/,
                            message: '体重不能为负数'
                        }
                    }
                },
                tel: {
                    validators: {
                        stringLength: {
                            min:11,
                            max:11,
                            message: '电话必须为11位数字'
                        },
                        regexp: {
                            regexp: /^1[0-9]{10}$/,
                            message: ' '
                        }
                    }
                },
                secTel: {
                    validators: {
                        regexp: {
                            regexp: /^1[0-9]{10}(,1[0-9]{10})*$/,
                            message: '可以填写多个联系方式，中间以英文逗号隔开'
                        }
                    }
                },
                mciNum: {
                    validators: {
                        regexp: {
                            regexp: /^[A-Za-z0-9]+$/,
                            message: '医保卡号由数字、字母组成'
                        }
                    }
                },
                recordId: {
                    validators: {
                        notEmpty: {
                            message: '档案号不能为空'
                        }
                    }
                }
                // memberDeadline: {
                //     validators: {
                //         notEmpty: {
                //             message: '会员截止日期不能为空'
                //         }
                //     }
                // },
                // nextQuestTime : {
                //     validators: {
                //         notEmpty: {
                //             message: '下次问卷日期不能为空'
                //         }
                //     }
                // }
            }
        });
    }

    /*******************************验证时间******************************************/
    $('.J_form').click(function(){
        validDate();
        validNextDate();
    });

    /**
     * 验证日期是否为空（手动验证）
     */
    function validDate(){
        var
            endTime = $('.J_endTime').val();

        if(endTime == ''){
            if($('.time').length == 0){
                $('.J_endTime').after('<small class="time has-error help-block" data-bv-validator="notEmpty" data-bv-for="name" data-bv-result="INVALID" style="color:#a94442;">会员截止日期不能为空</small>');
            }
        return false;
        }else{
            if($('.time').length > 0){
                $('.time').remove();
            }
        return true;
        }
    }
    function validNextDate(){
        var
            nextQuestTime = $('.J_nextQuestTime').val();

        if(nextQuestTime == ''){
            if($('.time').length == 0){
                $('.J_nextQuestTime').after('<small class="time has-error help-block" data-bv-validator="notEmpty" data-bv-for="name" data-bv-result="INVALID" style="color:#a94442;">下次问卷日期不能为空</small>');
            }
        return false;
        }else{
            if($('.time').length > 0){
                $('.time').remove();
            }
        return true;
        }
    }

});