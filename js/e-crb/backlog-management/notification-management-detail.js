/*-----------------------------------------------------------------------------
* @Description:     活动管理-进行中的活动
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.7.26
* ==NOTES:=============================================
* * v1.0.0(2017.7.26):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
    /**
     *  初始化提示信息、分页
     */
    showTip();
    Pagination(1);

    /**
     * 隐藏提示
     */
    function showTip(){
        setTimeout(function(){
            $(".J_tip").hide();
        },2000)
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
            url: jQuery.url.ECRBManagement.notificationDetailList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.number+'</td>\
                                    <td>'+ item.participantName +'</td>\
                                    <td>'+ item.participantIdcard +'</td>\
                                    <td>'+ item.participantTel +'</td>\
                                    <td>'+ item.noticeStatus+'</td>\
                                    <td>'+ item.comment +'</td>\
                                    <td>'+ item.noticeTime +'</td>\
                                    <td>'+ item.sysId +'</td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-edit"></i>&nbsp;处理</a>\
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
            }
        });
    }


});