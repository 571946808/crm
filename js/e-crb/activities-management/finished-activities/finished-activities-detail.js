/*--------------------------------------------------
* @Description:     已完成活动详情                   *
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
            url: jQuery.url.ECRBManagement.finishedActivityDetail,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.id+'</td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.idcard +'</td>\
                                    <td>'+ item.tel +'</td>\
                                    <td>'+ item.noticeStatus+'</td>\
                                    <td>'+ item.startDate +'</td>\
                                    <td>'+ item.joinSituation +'</td>\
                                    <td>'+ item.joinStatus +'</td>\
                                    <td>'+ item.accJoinSituation +'</td>\
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

    /**
     * 模糊匹配-可输入也可下拉选择
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
    *   通知详情按钮
    **/
    // $(".J_inform").click(function(){
    //     var
    //         // 

    //     $.ajax({
    //        type: "GET",
    //        url: jQuery.url.ECRBManagement.informOK,
    //        contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //        data: id,
    //        dataType: "json",
    //        success:function(){
    //             $("#inform-detail").location.href="路径";径
    //        },
    //        error:function(){
    //             console.log(2);
    //        }
        


    //     });

    // })

});