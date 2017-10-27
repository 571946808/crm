/*-----------------------------------------------------------------------------
* @Description:     活动管理-待开展活动列表页
* @Version:         1.0.0
* @author:          gts(616603151@qq.com)
* @date             2017.7.24
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
        var
            form = $(".J_searchForm").serializeObject();

        Pagination(1, form);
    });

      /**
     * 操作注销点击事件
    */

   $(document).on('click', '.J_cancle', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });



     /**
     * 操作注销按钮
     
     */
    $('.J_cancleDlg').click(function() {
        cancle();
    });
    /**
     * 注销事件
     */

    function cancle() {
        var id = $(".hidId").val(),
        form = {
            id: id
        };
        
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.cancleActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,
            //JSON.stringify
            dataType: "json",
            success: function(rs) {
                $('#cancleDialog').modal('hide');
                if (rs.code == 0) {
                    // location.reload();
                } else {
                    $('#modalDialog').modal();
                }

            },
            error: function(message) {
                $('#cancleDialog').modal('hide');
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
            data = {
                page: currentPage
            };
        jQuery.extend(data, extraData);

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.searchActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'" data-userId="'+ item.userId +'" data-approve="'+item.approve+'">\
                                    <td>'+ item.name+'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.level+'</td>\
                                    <td>'+ item.evnentStatus +'</td>\
                                    <td>'+ item.eventStartBate +'</td>\
                                    <td>'+ item.eventEndtBate +'</td>\
                                    <td>'+ item.menberGroupld +'</td>\
                                    <td>'+ item.createdPartyId +'</td>\
                                    <td>'+ item.createdTime+'</td>\
                                    <td>';
                        if(userid == item.userId){
                                    str += '<a href="#?id='+ item.id +'" class="label-info J_see"><i class="fa fa-book"></i>&nbsp;查看</a>\
                                    <a href="#?id='+ item.id +'" class="label-info J_revise"><i class="fa fa-pencil"></i>&nbsp;修改</a>\
                                    <a href="#" class="label-info J_cancle" data-toggle="modal" data-target="#cancleDialog"><i class="fa fa-exclamation"></i>&nbsp;注销</a>';
                          }
                         else if(item.approve == 0){
                                    str += '<a href="#?id='+ item.id +'" class="label-info J_see"><i class="fa fa-book"></i>&nbsp;查看</a>\
                                    <a href="#" class="label-info J_approve" data-toggle="modal" data-target="#approveDialog"><i class="fa fa-check-square-o"></i>&nbsp;审批</a>';
                         } 
                          else{
                                    str += '<a href="#?id='+ item.id +'" class="label-info J_see"><i class="fa fa-book"></i>&nbsp;查看</a>';
                        }
                        str += '</td></tr>';
                    });
                    // <a href="#" class="label-info J_approve" data-toggle="modal" data-target="#approveDialog"><i class="fa fa-check-square-o"></i>&nbsp;审批</a>\
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
    * 操作审批点击事件
    */

   $(document).on('click', '.J_approve', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
      
    });



     /**
     * 操作审批按钮
     
     */
    $(document).on('click', '.J_approveDlg', function() {
        approve();
    });
    /**
     * 审批事件
     */

    function approve() {
        var 
            id = $(".hidId").val(),
            examineApprove=$(".J_examineApprove").val(),
            remaks=$(".J_remarks").val()
        form = {
            id: id,
            examineApprove:examineApprove,
            remaks:remaks,
        };
        
        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.approveActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,
            //JSON.stringify
            dataType: "json",
            success: function(rs) {
                $('#approveDialog').modal('hide');
                if (rs.code == 0) {
                    // location.reload();
                } else {
                    $('#modalDialog').modal();
                }

            },
            error: function(message) {
                $('#approveDialog').modal('hide');
                $('#modalDialog').modal();
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