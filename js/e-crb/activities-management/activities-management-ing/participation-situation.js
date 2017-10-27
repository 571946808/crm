$(function(){

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
            str = '';

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.participSituation,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {page: currentPage},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                       <td>'+ item.number +'</td> \
                       <td>'+ item.participantName +'</td> \
                       <td>'+ item.participantDate +'</td> \
                       <td>'+ item.content +'</td>\
                       <td>'+ item.comment +'</td>\
                       <td>'+ item.createdPartyId +'</td>\
                       <td>'+ item.createdTime +'</td>\
                       </tr>' 
                    }); 
                    $('#J_template').append(str);
                }else{                
                    location.reload();
                }
            },
            error: function (message) {
                alert('请求失败')
            }
        });
    }
}) 