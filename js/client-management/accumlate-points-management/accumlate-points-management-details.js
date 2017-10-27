/*-----------------------------------------------------------------------------
* @Description:     积分管理-积分详情
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.20
* ==NOTES:=============================================
* 
* ---------------------------------------------------------------------------*/
$(document).ready(function() {
     /**
     * 初始化提示信息、验证表单
     */
    showTip();
    Pagination(1);

    /**
     * 隐藏提示
     * @return {[type]} [description]
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }
  
   //点击查询事件
 // $(".J_search").click(function() {
     
        
 //        var integralType = $("#integralType option:selected").val();
 //        var  searchName={
 //              integralType :integralType 
 //        }
        
        
 //            $.ajax({
 //            type: "GET",
 //            url: jQuery.url.ClientManagement.searchPoints,
 //            contentType: "application/x-www-form-urlencoded; charset=utf-8",
 //            data: searchName,//JSON.stringify
 //            dataType: "json",
           
 //        });

 //       });
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
            url: jQuery.url.ClientManagement.pointDetails,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.pointsDate +'</td>\
                                    <td>'+ item.pointsForm+'</td>\
                                    <td>'+ item.costPoints+'</td>\
                                    <td>'+ item.currentPoints +'</td>\
                                    <td>'+ item.currentSumpoints+'</td>\
                                    <td>'+ item.eventName +'</td>\
                                </tr>'
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

});
