/*-----------------------------------------------------------------------------
* @Description:     客户关怀-模板管理添加
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.7.25
* ==NOTES:=============================================
* v1.0.0(2017.7.25):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
/*******************************模板添加js开始**********************************************/
    /**
     * 初始化提示信息、分页
     */
     showTip();
     formValidatorForm();
 
    /**
     * 隐藏提示
     * @return {[type]} [description]
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }
    
    /**
     * 活动名称input失焦
     */
    // $(".J_name").blur(function(){
    //     sendName();
    // });

    /**
     * 提醒时间select框改变事件
     */
    // $(".J_remindTime").change(function(){
    //     remindDate();
    // });

    /**
     * 点击活动类型select框
     */
    $('.J_type').change(function(){
        hide();
    });

    /**
     * 点击上传文件按钮
     */
    $(".J_file").change(function(){
        filterFile();
    });

    /**
     * 点击重置按钮事件
     */
    $('.J_reset').click(function(){
        clearValid();
    });

    /**
     * 添加页——保存按钮
     */
    $(".J_save").click(function(){
        var data = $('.J_form').data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }else{
                sendName();
            }
        }
    });

    
    /**
     * 点击重置清除验证功能
     */
    function clearValid(){
        $('.J_form').bootstrapValidator('resetForm', true);
        $(".J_form").data('bootstrapValidator').destroy();
        $('.J_form').data('bootstrapValidator', null);
        formValidatorForm();
    }

    /**
     * 限制上传文件格式
     */
    function filterFile(){
        var 
            filepath = $("input[type='file']").val(),
            extStart = filepath.lastIndexOf("."),
            ext = filepath.substring(extStart, filepath.length).toUpperCase(),
            size = $('.J_file')[0].files[0].size,
            fileSize = Math.ceil(size / 1024 / 1024);// Size returned in MB

        if (ext != ".TXT" && ext != ".DOCX" && ext != ".DOC" && ext != ".PDF" && ext != ".XLS" && ext != ".XLSX") {
            $('#fileDialog').modal();
            $(".J_file").val("");
            return false;
        } 
        if(fileSize > 1){
            $('#fileSizeDialog').modal();
            $(".J_file").val("");
            return false;
        }
    }

    /**
     * 点击活动类型select框，隐藏循环力度和活动人员
     */
    function hide(){
        var
            type = $('.J_type').val();

        if(type == 1){
            $("[name='pollingTime']").val(-1);
            $("[name='memberGroupId']").val(-1);
            $('.J_hide').hide();
        }else{
            $('.J_hide').show();
        }
    }

    /**
     * 提醒时间select框改变事件-将选择的数据刷到input框中
     */
    // function remindDate(){
    //     var
    //         remindTime = $('.J_remindTime option:selected').text(),
    //         remindTimeValue = $('.J_remindTime option:selected').val();

    //     if(remindTimeValue == -1){
    //         $('.J_date').val('');
    //     }else{
    //         $('.J_date').val(remindTime);
    //     }
    // }

    /**
     * 活动名称失焦事件-发送活动名称
     */
    function sendName(){
        var
            name = $("input[name='name']").val();

        if(name != ''){
            $.ajax({
                type: "GET",
                url: jQuery.url.ECRBManagement.sendActiveName,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {name: name},     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if(rs.code != 0){
                        $('#modalDialog').modal();
                        return false;
                    }else{
                        save();
                    }
                },
                error: function (errMsg) {
                    $('#errorDialog').modal();
                }
            });
        }
    }

    /**
     * 保存事件-发送添加模板数据（添加页）
     */
    function save(){
        var 
            form = $('.J_form').serializeObject(),
            content = $('.J_content').val(),
            noticeContent = $('.J_noticeContent').val();

        jQuery.extend(form,{
            content: content,
            noticeContent: noticeContent,
        });
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.saveData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code != 0){
                    $('#errorDialog').modal();
                }
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
     }

    /**
     * 活动名称验证
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
                name: {
                    validators: {
                        notEmpty: {
                            message: '活动名称不能为空'
                        },
                        regexp: {
                            regexp: /^[^ ]+$/,
                            message: ' '
                        },
                    }
                },
                remindTime: {
                    validators: {
                        regexp: {
                            regexp: /^[1-9]*[1-9][0-9]*$/,
                            message: ' '
                        }
                    }
                }
            }
        });
    }
/*******************************模板添加js结束**********************************************/

/*******************************模板详情js开始**********************************************/
    /**
     * 详情页——控制显示循环力度和活动人员
     */
    show();
    function show(){
        var
            id = $('.J_detail').attr("id");
        
        if(id == 2){
            $('.J_pollingTime').hide();
            $('.J_memberGroupId').hide();
        }else{
            $('.J_pollingTime').show();
            $('.J_memberGroupId').show();
        }
    }
/******************************模板详情js结束***********************************************/

/*******************************模板编辑js开始**********************************************/
    var oldNames = $('.J_name').val();
    
    /**
     * 编辑页——保存按钮
     */
    $(".J_edit").click(function(){
        var 
            newName = $('.J_name').val(),
            data = $('.J_form').data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }else{
                if(oldNames != newName){
                    sendEditName();
                }else{
                    edit();
                }
            }
        }
    });

    /**
      * 获取列表页编辑项的id
      */
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

    /**
     * 发送活动名称
     */
    function sendEditName(){
        var
            name = $("input[name='name']").val();

        if(name != ''){
            $.ajax({
                type: "GET",
                url: jQuery.url.ECRBManagement.sendActiveName,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {name: name},     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if(rs.code != 0){
                        $('#modalDialog').modal();
                        return false;
                    }else{
                        edit();
                    }
                },
                error: function (errMsg) {
                    $('#errorDialog').modal();
                }
            });
        }
    }

    /**
     * 保存事件-发送添加模板数据（编辑页）
     */
    function edit(){
        var 
            form = $('.J_form').serializeObject(),
            id = getUrlParam('id'),
            content = $('.J_content').val(),
            noticeContent = $('.J_noticeContent').val();

        jQuery.extend(form,{
            id: id,
            content: content,
            noticeContent: noticeContent,
        });
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.saveData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code != 0){
                    $('#errorDialog').modal();
                }
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
     }
/*******************************模板编辑js开始**********************************************/

/*******************************上传文件js开始**********************************************/
    
    $(".J_file").change(function(){
        var 
            formdata = new FormData();

        formdata.append("attachment",$('.J_file')[0].files[0]);
        $.ajax({
            type: "POST",
            // url: "/admin/file/ajax/upload",
            contentType: false,
            processData : false,
            data: formdata,
            success: function (rs) {
                if(rs.code == 0){
                    $(".attachment").val(rs.attachment.id);
                }else{
                    $('#errorDialog').modal();
                }
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
    });

/*******************************上传文件js结束**********************************************/

/*******************************根据循环粒度动态控制时间************************************/
    // $('.J_pollingTime').change(function(){
    //     // console.log(typeof($('.J_startDate').val()))
    //     // if($('.J_startDate').val() != ''){
    //         circle();
    //     // }
    // });
    // $('.J_startDate').blur(function(){
    //     // if($('.J_pollingTime').val() != -1){
    //         circle();
    //     // }
    // });
    // /**
    //  * 函数
    //  */
    // function circle(){
    //     var
    //         pollingTime = $('.J_pollingTime').val(),
    //         startDate = $('.J_startDate').val(),
    //         firstDate = '',
    //         secondDate = '';
            
    //     date = new Date(Date.parse(startDate.replace(/-/g, "/")));
    //     month = date.getMonth() + 1;//月
    //     day = date.getDate();//日
    //     year = date.getFullYear();//年
    //     if(month == 12){
    //         firstDate = (year++)+'-'+1+'-'+day;
    //     }else{
    //         firstDate = year+'-'+(month++)+'-'+day;
    //     }
    //     secondDate = (year++)+'-'+month+'-'+day;

    //     console.log(firstDate == 'NaN-NaN-NaN')
    //     console.log(typeof(secondDate))
    //     if(pollingTime == 2 && firstDate != 'NaN-NaN-NaN'){
    //         $('.J_endDate').attr("onfocus", "WdatePicker({minDate:'"+firstDate+"'})");
    //     }else if(pollingTime == 1 && secondDate != 'NaN-NaN-NaN'){
    //         $('.J_endDate').attr("onfocus", "WdatePicker({minDate:'"+secondDate+"'})");
    //     }
    // }

});