/*-----------------------------------------------------------------------------
* @Description:     客户关怀-选择模板列表
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.8.05
* ==NOTES:=============================================
* v1.0.0(2017.8.05):
     初始生成
* ---------------------------------------------------------------------------*/
$(function(){
	/**
     * 初始化提示信息、验证表单
     */
    showTip();
    Pagination(1); 

    /**
     * 隐藏提示
     */
    function showTip(){
        setTimeout(function(){
            $('.J_tip').hide();
        }, 2000);
    }

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
     * 列表点击选择事件
     */
    $(document).on('click','.J_templateId',function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');
        
        $('.hidId').val(id);
    });

    /**
     * 弹出框点击确定事件
     */
    $(".J_selectTemplate").click(function(){
        sendTemplateId();
    });

    /**
     * 弹出框点击确定发送模板id事件
     */
    function sendTemplateId(){
        var
            id = $('.hidId').val(),
            form = {
                id: id
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.selectTemplate,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code == 0){
                    $('#selectDialog').modal('hide');
                }else{
                    $('#selectDialog').modal('hide');
                    $('#modalDialog').modal();
                }
            },
            error: function (message) {
                $('#modalDialog').modal();
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
            userid = $('.J_userId').val(),         
            str = '',
            data = jQuery.extend(extraData, {page: currentPage});

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.templateList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.templateId +'">\
                                    <td>'+ item.number +'</td>\
                                    <td>'+ item.templateName +'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.level +'</td>\
                                    <td>'+ item.startDate +'</td>\
                                    <td>'+ item.endDate +'</td>\
                                    <td>'+ item.memberGroupId +'</td>\
                                    <td>'+ item.createdPartyId +'</td>\
                                    <td>'+ item.createdTime+'</td>\
                                    <td>\
                        	           <a href="#" class="label-info J_templateId" data-toggle="modal" data-target="#selectDialog"><i class="fa fa-tag"></i>&nbsp;选择</a>\
                                    </td>\
                                </tr>';
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

});