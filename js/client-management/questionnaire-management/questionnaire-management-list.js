/*-----------------------------------------------------------------------------
* @Description:     问卷管理列表
* @Version:         1.0.0
* @author:          yudan (862669640@qq.com)
* @date             2017.7.20
* ==NOTES:=============================================
* v1.0.0(2017.7.20):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
    /**
     * 初始化提示信息、验证表单
     */
    showTip();
    Pagination(1);

    /**
     * 取消提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    };
    // appendTip();
    // function appendTip(){
    //     var tr = $('#J_template').children(),
    //         length = tr.length;
    //     if(length == 0){
    //         $('#J_template').append('<tr><td colspan="10">暂无数据</td></tr>');
    //     }
    // }
    /**
     * 问卷次数验证
     * [formValidatorAddForm description]
     * @return {[type]} [description]
     */
    formValidatorAddForm();
    function formValidatorAddForm(){
        $('.J_searchForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                questCount: {
                    validators: {
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '问卷次数请输入正整数。'
                        }
                    }
                }
            }
        });
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
            url: jQuery.url.ClientManagement.questList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.number +'</td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.idcardNum +'</td>\
                                    <td>'+ item.tel +'</td>\
                                    <td>'+ item.allCost +'</td>\
                                    <td>'+ item.memberGroup +'</td>\
                                    <td>'+ item.level +'</td>\
                                    <td>'+ item.questCount +'</td>\
                                    <td><span show-quest-time = "'+ item.showQuestTime +'" class="J_nextQuestTime">'+ item.nextQuestTime +'</span></td>\
                                    <td>\
                                        <a href="#" class="label-info"><i class="fa fa-book"></i>&nbsp;详情</a>\
                                        <a href="#" hidden="hidden" class="label-info J_questBtn"><i class="fa fa-file-text-o"></i>&nbsp;问卷</a>\
                                    </td>\
                                </tr>'
                    }); 
                    $('#J_template').append(str);  
                    //判断当前日期是否可填写问卷
                    var tr = $('#J_template').children();
                    if(tr.length == 0){
                        $('#J_template').append('<tr><td colspan="10">暂无数据</td></tr>');
                    }
                    showBtn();
                }else{                
                    alert('请求失败');
                }
            },
            error: function (message) {
                alert(message);
            }
        });
    };

    /**
     * [showBtn description]根据下次计划时间显示\隐藏问卷按钮
     * @return {[type]} [description]
     */
    function showBtn(){
        var curTime = new Date();
        $('#J_template tr').each(function(item){
            var showQuest = $(this).find('.J_nextQuestTime').attr("show-quest-time"),
                showQuestTime = new Date(Date.parse(showQuest));

            if(curTime>showQuestTime){
                $(this).find('.J_questBtn').removeAttr("hidden");
            }  
        })
            
    };

    /**
     * 验证成功，点击搜索事件
     * @param  {[type]} 
     * @return {[type]}     [description]
     */
    $('.J_search').click(function(){
        var 
            searchForm = $('.J_searchForm'),
            data = searchForm.data('bootstrapValidator');
        if (data) {
        // 修复记忆的组件不验证
            data.validate();
            if (!data.isValid()) {//如果验证不通过
                return false;
            }else{
                var form = $(".J_searchForm").serializeObject();
                Pagination(1, form);
                return true;
            }
        }
    });
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
            data: {idcard: idcard},  
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.idcard + '</li>'; 
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
                });
                $(".es-list3").append(li);
            },
            error: function (errMsg) {
                console.log(errMsg);
            }
        });
    });
});