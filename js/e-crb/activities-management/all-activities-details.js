/*-----------------------------------------------------------------------------
* @Description:     活动管理-进行中的活动
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.24
* ==NOTES:=============================================
* 
* ---------------------------------------------------------------------------*/
$(document).ready(function() {
    Pagination(1);

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
            url: jQuery.url.ECRBManagement.joinList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.rate +'</td>\
                                    <td>'+ item.status+'</td>\
                                    <td>'+ item.startDate +'</td>\
                                    <td>'+ item.people +'</td>\
                                    <td>'+ item.creator +'</td>\
                                    <td>'+ item.createTime +'</td>\
                                    <td>\
                                        <a href="#?id=1" class="label-info J_process" data-toggle="modal" data-target="#modalDialog"><i class="fa fa-book"></i>&nbsp;详情</a>\
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
});