/*--------------------------------------------------
* @Description:     已完成活动详情通知                *
* @Version:         1.0.0                           *
* @author:          zhangfc (546641398@qq.com)      *
* @date             2017.7.24                       *
---------------------------------------------------*/
$(function(){

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
            url: jQuery.url.ECRBManagement.finishedActivityDetailInform,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.id+'</td>\
                                    <td>'+ item.eventName +'</td>\
                                    <td>'+ item.idcard +'</td>\
                                    <td>'+ item.tel +'</td>\
                                    <td>'+ item.noticeStatus+'</td>\
                                    <td>'+ item.noticeComment +'</td>\
                                    <td>'+ item.noticeTime +'</td>\
                                    <td>'+ item.sysNames +'</td>\
                                </tr>'
                    }); 
                    $('#J_template').append(str);
                }else{                
                    location.reload();
                }

            },
            error: function (message) {
                // location.reload();
                alert(message);
            }
        });
    }


    



});