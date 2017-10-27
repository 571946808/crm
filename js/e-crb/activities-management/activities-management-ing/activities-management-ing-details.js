/*-----------------------------------------------------------------------------
* @Description:     活动管理-活动详情
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.27
* ==NOTES:=============================================
* 
* ---------------------------------------------------------------------------*/
$(document).ready(function() {
    showTip();
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
            url: jQuery.url.ECRBManagement.activitesDetailsList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td><input type="checkbox" class="J_select" value="'+ item.id +'"></td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.idCardNum +'</td>\
                                    <td>'+ item.tel+'</td>\
                                    <td>'+ item.noticeStatus+'</td>\
                                    <td>'+ item.BQStartDate +'</td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class=" J_participation" "><i class="fa fa-"></i>&nbsp;2</a>\
                                    </td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class=" J_totalParticipation" "><i class="fa fa-"></i>&nbsp;3</a>\
                                    </td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class="label-info J_record" ><i class="fa fa-book"></i>&nbsp;记录</a>\
                                    </td>\
                                </tr>'
                    }); 
                    $('#J_template').append(str);
                }else{                
                    location.reload();
                }

            },
            error: function (message) {
                // location.reload();
            }
        });
    }
     
  /**
     * 模糊匹配-可输入也可下拉选择（引用插件）
     * @type {String}
     */
    $('#editable-select1').editableSelect1({
        effects: 'slide'  
    });
    $('#editable-select2').editableSelect2({
        effects: 'slide'  
    });
  
    $('#html1').editableSelect1();
    $('#html2').editableSelect2();
   
    /**
     * 姓名-模糊匹配keyup事件——下拉框
     * @param  {[type]} ){                                          var            name [description]
     * @param  {[type]} dataType: "json"        [description]
     * @param  {String} success:  function      (rs)          {                                       var                                       li [description]
     * @param  {[type]} error:    function      (errMsg)      {                                       console.log(errMsg);            }                        } [description]
     * @return {[type]}           [description]
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
     * 身份证-模糊匹配keyup事件——下拉框
     * @param  {[type]} ){                                          var            idcard [description]
     * @param  {[type]} dataType: "json"        [description]
     * @param  {String} success:  function      (rs)          {                                         var                                       li [description]
     * @param  {[type]} error:    function      (errMsg)      {                                         console.log(errMsg);            }                        } [description]
     * @return {[type]}           [description]
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
     * 列表点击搜索事件
     * @param  {[type]} ){                     }
     * @return {[type]}     [description]
     */
    $(".J_search").click(function(){
        var
            form = $(".J_searchForm").serializeObject();

       
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
     * 点击批量添加
     */
    $('.J_addIntegral').click(function(){
        addAll();
    });

    /**
     * 判断是否选择添加项
     */
    function addAll(){
        var
            select = $('.J_select:checked').length;

        if(select == 0){
            $('#addTipDialog').modal();
        }else{
            $('#integralDialog').modal();
        }
    }

    /**
     * 批量编辑对话框确定事件
     */
    $('.J_integral').click(function(){
        sendAdd();
    });

    /**
     * 获取编辑项并发送数据
     */
    function sendAdd(){
        var
            selectMap = $('.J_select:checked'),
            pointItem= $(".J_pointItem option:selected").val(),
            idArray = [];
            
        $.each(selectMap, function(index, item){
            idArray.push(item.value);
        });

        data = {
            id : idArray,
            pointItem : pointItem
        };

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.addIntegral,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: JSON.stringify(data),     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#integralDialog').modal('hide');
                if( rs.code == 0){                   
                    // location.reload();
                    
                }else{                
                    // location.reload();
                }

            },
            error: function (message) {
                $('#modalDialog').modal();
            }
        });
    }
  
    

});