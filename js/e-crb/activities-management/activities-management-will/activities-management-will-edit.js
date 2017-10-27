/*-----------------------------------------------------------------------------
* @Description:     客户关怀-活动修改
* @Version:         1.0.0
* @author:          sunwanlin(1124038074@qq.com)
* @date             2017.8.3
* ==NOTES:=============================================
* v1.0.0(2017.8.3):
     初始生成
* ==NOTES:=============================================
* v2.0.0(2017.8.6):   yudan(862669640@qq.com)
    修改内容见标签 modify, 并删除了有关保存模板的代码
* ---------------------------------------------------------------------------*/
$(function(){
    //初始化提示信息、分页
    showTip();
    //新建活动form验证
    formValidatorForm();
    //检查项添加弹框验证
    formValidatorAddForm();
    //积分项添加弹框验证
    formValidatorAddPointsForm();
    //刷进页面发送活动id，返回页面的内容
    returnVal();
    //点击修改关联检查项，发送活动id，返回页面的内容
    //isSubmit();
    var oldName;
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
     * 获取当前页面url
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    /**
     * 刷进页面发送活动id，返回页面的内容
     * @return {[type]} [description]
     */
    function returnVal(){
        var activitiesId = getUrlParam('id');
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.returnVal,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                activitiesId:activitiesId
            },     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code==0){
                    oldName = rs.name;
                    $(".J_name").val(rs.name);
                    $(".J_level").val(rs.level);
                    $(".J_startDate").val(rs.startDate);
                    $(".J_activitiesType").val(rs.type);
                    $(".J_remindTime").val(rs.remindTime);
                    $(".J_endDate").val(rs.endDate);
                    $(".J_content").val(rs.content);
                    $(".J_noticeContent").val(rs.noticeContent);
                    $(".J_polling").addClass('hide');//循环粒度
                    $(".J_group").addClass('hide');//活动人员
                    /*$(".J_file").val(rs.attenchment);*/
                    if(rs.type==1){//判定如果活动类型是关怀型
                        $(".J_polling").removeClass('hide');//循环粒度
                        $(".J_group").removeClass('hide');//活动人员
                        $(".J_pollingTime").val(rs.pollingTime);//循环粒度
                        $(".J_memberGroupId").val(rs.memberGroupId);//活动人员
                        $(".J_pollingTimeIpt").val(rs.pollingTime);//循环粒度隐藏框
                        $(".J_memberGroupIdIpt").val(rs.memberGroupId);//活动人员隐藏框
                    }
                }
                else{
                    $('#modalDialog').modal();//活动名称重复对话框
                }
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
    }

    /**
     * 点击修改关联检查项，发送活动id
     * 刷进页面发送活动id，返回页面的内容
     * @return {[type]} [description]
     */
    $(".J_checkButton").click(function(){
        var activitiesId = getUrlParam('id');
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.returnCheckVal,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                activitiesId:activitiesId
            },     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $("#J_checkTbody").empty();
                if(rs.code == 0){
                    var trStr = '';//动态拼接table
                    var list = rs.list;
                    for (var i = 0; i < list.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                        trStr+='<tr class="J_checkTr">';//拼接处规范的表格形式
                        trStr+='<td><input class="J_subCheck" type="checkbox" name="subCheck"></td>'+'</td>';
                        trStr+='<td>检查项'+list[i].checkItemName+'</td>';
                        trStr+='<td>内容'+list[i].checkItemContent+'</td>';
                        trStr+='</tr>';  
                    }
                    $("#J_checkTbody").append(trStr);//运用html方法将拼接的table添加到tbody中return;
                }else{
                    $('#errorDialog').modal();
                }
                
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
    });
        
    /**
     * 点击修改关联积分项，发送活动id
     * 刷进页面发送活动id，返回页面的内容
     * @return {[type]} [description]
     */
    $(".J_pointsButton").click(function(){
        var activitiesId = getUrlParam('id');
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.returnPointsVal,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                activitiesId:activitiesId
            },     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $("#J_pointsTbody").empty();
                if(rs.code==0){
                    var trStr = '';//动态拼接table
                    var list = rs.list;
                    for (var i = 0; i < list.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                        trStr+='<tr class="J_pointsTr">';//拼接处规范的表格形式
                        trStr+='<td><input class="J_subCheck" type="checkbox"></td>'+'</td>';
                        trStr+='<td>积分项'+list[i].name+'</td>';
                        trStr+='<td>内容'+list[i].pointsValue+'</td>';
                        trStr+='</tr>';  
                    }
                    $("#J_pointsTbody").append(trStr);//运用html方法将拼接的table添加到tbody中return;
                }else{
                    $('#errorDialog').modal();
                }
                
            },
            error: function (errMsg) {
                $('#errorDialog').modal();
            }
        });
    });
    
    /**
     * 关怀型活动-->显示循环粒度和活动人员
     * 营销型活动-->隐藏循环粒度和活动人员
     * @param  {[type]} ){                     var activitiesType [description]
     * @return {[type]}     [description]
     */
    $(".J_activitiesType").change(function(){
        var activitiesType = $(".J_activitiesType").val();
        var polling = $(".J_pollingTimeIpt").val(),
            group = $(".J_memberGroupIdIpt").val();
        if(activitiesType==1){//关怀
            $(".J_polling").removeClass('hide');
            $(".J_group").removeClass('hide');
            $(".J_pollingTime").val(polling);
            $(".J_memberGroupId").val(group);
        }else if(activitiesType==2){//营销
            $(".J_polling").addClass('hide');
            $(".J_group").addClass('hide');
            $(".J_pollingTime").val(-1);
            $(".J_memberGroupId").val(-1);
        }
    });
    //两个日期都默认为当天,获取文本id并且传入当前日期
    $('#startDate').val(today());
    $('#end').val(today());
    /**
     * 日期默认为当天,获取文本id并且传入当前日期
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
    }
    /**
     * 是否点击提交按钮，如果点击，验证、发送表单
     * @return {Boolean} [description]
     */
    $(".J_submit").click(function(){
        //此处函数已调用validForm()，isSameName()
        if(validForm() == true && isSameName() == true){
            submitForm();
        }
    });
    /**
     * 当前活动名和旧活动名判重
     * @return {Boolean} [description]
     */
    function isSameName(){
        var
            name = $("input[name='name']").val();

        if(oldName==name){
            return true;
        }else{
            return valueIt();
        }
    }
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
                data: {
                    name: name
                },     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if(rs.code != 0){
                        $('#modalDialog').modal();//活动重复对话框
                        return false;
                    }else{
                        valueIt();  
                    }
                },
                error: function (errMsg) {
                    $('#errorDialog').modal();
                }
            });
        }
    }
    function valueIt(){
        return true;
    }
    /**
     * 提交审核
     * 点击了提交审核按钮
     * @return {[type]} [description]
     */
    function submitForm(){
        var activitiesId = getUrlParam('id');
        var 
            form = $('.J_form').serializeObject(),
            content = $('.J_content').val(),
            noticeContent = $('.J_noticeContent').val(),
            attenchment = $('.J_file').val();

        jQuery.extend(form,{
            id:activitiesId,
            content: content,
            noticeContent: noticeContent,
            attenchment: attenchment
        });

        var 
            tr = $('.J_tbody').children(),
            trPoints = $('.J_tbodyPoints').children(),
            
            checkItemList =[],
            pointsItemList =[],
            id, checkItemName, checkItemContent,
            idPoints, checkPointsItemName, checkPointsItemContent,
            data;

        tr.each(function(){
            var tdArr = $(this).children(),
                id = $(this).attr('data-id'),
                trList = {}, 
                checkItemName = tdArr.eq(1).text(),
                checkItemContent = tdArr.eq(2).text();

            var checkItem = {
                name: checkItemName,
                content: checkItemContent
            };   
            checkItemList.push(checkItem);
        });
        trPoints.each(function(){
            var tdArr = $(this).children(),
                idPoints = $(this).attr('data-id'),
                trPointsList = {}, 
                checkPointsItemName = tdArr.eq(1).text(),
                checkPointsItemContent = tdArr.eq(2).text();
            var pointsItem = {
                name: checkPointsItemName,
                pointsValue: checkPointsItemContent
            };
            pointsItemList.push(pointsItem);
        });
        var param = {
              event:form,
              checkItemList: checkItemList,
              pointsItemList: pointsItemList
          };       

        
        $.ajax({
                type: "GET",
                url: jQuery.url.ECRBManagement.submitForm,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: JSON.stringify(param),     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    // modify 修改页没有保存模板按钮，不需要判断
                    if (rs.code == 0) {
                    }
                    else{
                        $('#modalDialog').modal();//活动名称重复对话框
                    }
                },
                error: function (errMsg) {
                    $('#errorDialog').modal();
                }
            });
    }
    /**
     * 提醒时间select框改变事件
     */
    $(".J_remindTime").change(function(){
        remindDate();
    });
    /**
     * 提醒时间select框改变事件-将选择的数据刷到input框中
     */
    function remindDate(){
        var
            remindTime = $('.J_remindTime option:selected').text(),
            remindTimeValue = $('.J_remindTime option:selected').val();

        if(remindTimeValue == -1){
            $('.J_date').val('');
        }else{
            $('.J_date').val(remindTime);
        }
    }
    //检查项全选事件
    $(".J_selectAll").click(function() {
        $('input[name="subCheck"]').prop("checked", this.checked);
    });
    var subCheck = $("input[name='subCheck']");
    subCheck.click(function() {
        $(".J_selectAll").prop("checked", subCheck.length == $("input[name='subCheck']:checked").length ? true: false);
    });
    //积分项全选事件
    $(".J_selectAllPoints").click(function() {
        $('input[name="subCheckPoints"]').prop("checked", this.checked);
    });
    var subCheckPoints = $("input[name='subCheck']");
    subCheckPoints.click(function() {
        $(".J_selectAllPoints").prop("checked", subCheckPoints.length == $("input[name='subCheckPoints']:checked").length ? true: false);
    });
/*************************************以下是检查项的函数*******************************************************/    
    //点击check添加对话框确定按钮验证
    $('.J_addDlg').click(function(){
        validItem();
    });
    //点击删除按钮，弹出提示框
    $('.J_del').click(function(){
        openTipDlg();
    })
    //删除用药项
    $('.J_delDlg').click(function(){
        delItem();
    });
    //重置表单
    $('.J_cancel').click(function() {
        resetForm();
    });
/*******************************************以下是积分项的函数******************************************************/
    //点击check添加对话框确定按钮验证
    $('.J_addPointsDlg').click(function(){
        validPointsItem();
    });
    //点击删除按钮，弹出提示框
    $('.J_delPoints').click(function(){
        openTipDlg();
    })
    //删除用药项
    $('.J_delDlg').click(function(){
        delItem();
    });
/*******************************************以下是自定义函数******************************************************/
    /**
     * 修改活动验证
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
                        }
                    }
                },
                level: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '活动级别不能为空'
                        }
                    }
                },
                startDate: {
                    validators: {
                        notEmpty: {
                            message: '活动时间不能为空'
                        }
                    }
                },
                pollingTime: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '循环粒度不能为空'
                        }
                    }
                },
                type: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '活动类型不能为空'
                        }
                    }
                },
                endDate: {
                    validators: {
                        notEmpty: {
                            message: '活动时间不能为空'
                        }
                    }
                },
                memberGroupId: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '活动人员不能为空'
                        }
                    }
                },
                type: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[0-9]\d*$/,
                            message: '活动类型不能为空'
                        }
                    }
                },
                remindTime:{
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '提醒时间不能为空'
                        }
                    }
                }
            }
        });
    }
    /**
    * 检查项添加框验证
    * [formValidatorAddForm description]
    * @return {[type]} [description]
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
                checkItemName: {
                    validators: {
                        notEmpty: {
                            message: '名称不能为空'
                        }
                    }
                },
                checkItemContent: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '内容不能为空'
                        }
                    }
                }
            }
        });
    }
    /**
    * 积分项添加框验证
    * [formValidatorAddForm description]
    * @return {[type]} [description]
    */
    function formValidatorAddPointsForm(){
        $('.J_addPointsForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                
                checkItemName: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '积分项不能为空'
                        }
                    }
                },
                checkItemContent: {
                    validators: {
                        notEmpty: {
                            message: '积分值不能为空'
                        }
                    }
                }
            }
        });
    }
    /**
     * 点击提交审核按钮时验证表单
     * @return {[type]} [description]
     */
    function validForm(){
        var data = $('.J_form').data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }else{
                return true;
            }
        }
    }
    /**
     * 验证检查项添加对话框表单内容
     * @return {[type]} [description]
     */
    function validItem(){
         var form = $('.J_addForm'),
             data = form.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }else{
                addItem();
                return true;
            }
        }
    }

    /**
     * 验证积分项添加对话框表单内容
     * @return {[type]} [description]
     */
    function validPointsItem(){
         var form = $('.J_addPointsForm'),
             data = form.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {
                return false;
            }else{
                addPointsItem();
                return true;
            }
        }
    }
    /**
     * 自动给关联检查项的名称赋值
     * @param  {[type]} )var itemTr [description]
     * @return {[type]}     [description]
     */
    $(document).on('click','.J_add',function(){
        if($(".J_tbody tr").length==0){
            $(".J_checkItemName").val('检查项1');
            // console.log($(".J_checkItemName").val());
        }else{    
            var itemTr = $(".J_tbody tr:last td:nth-child(2)");
            var trText = itemTr.text();//获取最后一条内容的text,string类型
            var trTextString = trText.substr(-1,1);
            var nameNum = parseInt(trTextString);//将最后一条名称的编号赋值给nameNum,string类型
            console.log(trText.length);
            console.log(itemTr);   
            console.log(trText);  
            console.log(trTextString);  
            console.log(nameNum);
            $(".J_checkItemName").val('检查项'+(nameNum+1));
        }
        
    });
    /**
     * 新增一条检查项名称-内容数据项
     * [addItem description]
     */
    function addItem(){
        var id = $('.J_tbody').children("tr:last-child").attr('data-id'),
            curId = id + 1,
            checkItemName =$('.J_checkItemName').val(),
            checkItemContent = $('.J_checkItemContent').find("option:selected").text();

        $('.J_tbody').append(
            '<tr data-id="' + curId + '"> \
                <td> <input class="J_subCheck"  type="checkbox" name="subCheck" > </td> \
                <td>'+checkItemName+'</td>\
                <td><span>'+checkItemContent+'</span></td> \
            </tr>');
        $('#addDialog').modal('hide');
        /**
         * 清楚验证缓存
         */
        $('#addDialog').on('hidden.bs.modal', function() {
            $('.J_addForm').bootstrapValidator('resetForm', true);

            $('.J_checkItemName').val('');
            $('.J_checkItemContent').val('');
            $(".J_addForm").data('bootstrapValidator').destroy();
            $('.J_addForm').data('bootstrapValidator', null);
            formValidatorAddForm();
        });
    }

    /**
     * 新增一条积分项名称-内容数据项
     * [addItem description]
     */
    function addPointsItem(){
        var id = $('.J_tbodyPoints').children("tr:last-child").attr('data-id'),
            curId = id + 1,
            pointsItemName =$('.J_pointsItemName').find("option:selected").text();
            pointsItemContent = $('.J_pointsItemContent').val();

        $('.J_tbodyPoints').append(
            '<tr data-id="' + curId + '"> \
                <td> <input class="J_subCheckPoints"  type="checkbox" name="subCheck" > </td> \
                <td>' + '积分'+pointsItemName + '</td>\
                <td>'+ pointsItemContent + '</td> \
            </tr>');
        $('#addPointsDialog').modal('hide');
        /**
         * 清楚验证缓存
         */
        $('#addPointsDialog').on('hidden.bs.modal', function() {
            $('.J_addPointsForm').bootstrapValidator('resetForm', true);

            $('.J_pointsItemName').val('');
            $('.J_pointsItemContent').val('');
            $(".J_addPointsForm").data('bootstrapValidator').destroy();
            $('.J_addPointsForm').data('bootstrapValidator', null);
            formValidatorAddPointsForm();
        });
    }
    /**
     * 根据是否有删除项弹出不同的提示框
     * @return {[type]} [description]
     */
    function openTipDlg(){
        var checked = $('input[type=checkbox]:checked').length; 
        if(checked == 0){
            $('#delTipDialog').modal();
        }else{
            $('#delDialog').modal();
        }
    }
    /**
     * 删除所选项
     * [delItem description]
     * @return {[type]} [description]
     */
    function delItem(){
        var checked = $('tbody').find('input[type=checkbox]:checked'),
            tr = checked.parents("tr");
        tr.remove();
        $('#delDialog').modal('hide');
        $(".J_selectAll").prop("checked", subCheck.length == $("input[name='subCheck']:checked").length ? true: false);
    }

    
    /**
     * 点击新建活动reset按钮时清空校验、数据
     * @param  {[type]} ) 
     * [description]
     * @return {[type]}   [description]
     */
    function resetForm(){
        $('.J_form').bootstrapValidator('resetForm', true);
        $(".J_form").data('bootstrapValidator').destroy();
        $('.J_form').data('bootstrapValidator', null);
        $('.tip').remove();
    }
});