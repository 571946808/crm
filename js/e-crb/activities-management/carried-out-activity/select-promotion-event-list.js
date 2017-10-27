/*-----------------------------------------------------------------------------
* @Description:     活动管理-待开展活动列表页
* @Version:         1.0.0
* @author:          yudan(862669640@qq.com)
* @date             2017.8.9
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
     * 点击搜索事件
     * @param  {[type]} ){                     search();    } [description]
     * @return {[type]}     [description]
     */
    $(".J_search").click(function(){
        var form = $(".J_searchForm").serializeObject();
        Pagination(1, form);
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
    function Pagination(page, extraData){

        var
            currentPage = page, 
            userid = $('.J_userId').val(),            
            str = '',
            data = {
                page: currentPage
            };
        jQuery.extend(data, extraData);

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.promotionActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'" data-userId="'+ item.userId +'">\
                                    <td>'+ item.name+'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.level+'</td>\
                                    <td>'+ item.evnentStatus +'</td>\
                                    <td>'+ item.eventStartBate +'</td>\
                                    <td>'+ item.eventEndtBate +'</td>\
                                    <td>'+ item.menberGroupld +'</td>\
                                    <td>'+ item.createdPartyId +'</td>\
                                    <td>'+ item.createdTime+'</td>\
                                    <td><a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-tag"></i>&nbsp;选择</a></td>\
                                    </tr>';
                    });
                    $('#J_template').append(str);
                }else{                
                    // location.reload();
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
   
    $('#editable-select3').editableSelect3({
        effects: 'slide'  
    });
   
    $('#html3').editableSelect3();
    
     /**
     * 活动名称-模糊匹配keyup事件——下拉框
     * @param  {[type]} ){                                          var            activityName[description]
     * @param  {[type]} dataType: "json"        [description]
     * @param  {String} success:  function      (rs)          {                                        var                                       li [description]
     * @param  {[type]} error:    function      (errMsg)      {                                        console.log(errMsg);            }                        } [description]
     * @return {[type]}           [description]
     */
    $('.J_selectActivity').keyup(function(){
        var
          activityName= $('input.J_selectActivity').val();

        $(".es-list3").empty();     
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.selectActivityName,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {activityName: activityName},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.name+ '</li>';                    
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