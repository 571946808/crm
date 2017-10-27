/*--------------------------------------------------
* @Description:     问卷管理详情                     *
* @Version:         1.0.0                           *
* @author:          zhangfc (546641398@qq.com)      *
* @date             2017.7.24                       *
---------------------------------------------------*/
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
            str = '';
            data = {
                page: currentPage
            };
            jQuery.extend(data, extraData);
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.questDetail,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                       str += '<tr data-id="'+ item.id +'"> <td>'+ item.id +'</td> <td>'+ item.dicQuestItem +'</td> <td>'+ item.questContent +'</td> <td>'+ item.startData +'</td> <td>'+ item.endData +'</td> </tr>' 
                    }); 
                    $('#J_template').append(str);
                }else{                
                    location.reload();
                }

            },
            error: function (message) {
                alert(message);
            }
        });
    }

    /**
    *  option添内容
    */
    AddOption();

    function AddOption() {

        var 
            id = $('.hidId').val();
            str = '';
        $.ajax({
            type:"GET",
            url: jQuery.url.ClientManagement.questItem,
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data: id,
            dataType:"json",
            success:function(rs) {
                // $('#J_select').empty();
                // console.log(1);
                if( rs.code == 0){
                $.each(rs.list,function(index,item){    
                    str += '<option data-id="' + item.id + '" value="' + item.dicQuestItem + '"> <value> ' + item.dicQuestItem + ' </value> </option>'
                });
                $('#J_select').append(str);
                }
                else{
                    location.reload();
                }

            },
            error:function(message) {
                alert(message);
            }
        }); 
    }
    
    /**
     * 列表点击搜索事件
     * @param  {[type]} ){                     }
     * @return {[type]}     [description]
     */
    $(".J_search").click(function(){
        var
            form = $(".J_searchForm").serializeObject();
            // console.log(form);
        Pagination(1, form);
        // console.log(2);
    });

});