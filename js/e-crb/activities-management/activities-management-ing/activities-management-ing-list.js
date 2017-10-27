/*-----------------------------------------------------------------------------
* @Description:     活动管理-进行中的活动
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
     * 模糊匹配-可输入也可下拉选择（引用插件）
     * @type {String}
     */
	$('#editable-select1').editableSelect1({
        effects: 'slide'  
    });
    $('#editable-select2').editableSelect2({
        effects: 'slide'  
    });
    $('#editable-select3').editableSelect3({
        effects: 'slide'  
    });
    $('#html1').editableSelect1();
    $('#html2').editableSelect2();
    $('#html3').editableSelect3();
      
      /**
     * 姓名-模糊匹配keyup事件——下拉框
     * @param  {[type]} ){                                          var            name [description]
     * @param  {[type]} dataType: "json"        [description]
     * @param  {String} success:  function      (rs)          {                                       var                                       li [description]
     * @param  {[type]} error:    function      (errMsg)      {                                       console.log(errMsg);            }                        } [description]
     * @return {[type]}           [description]
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
     * 身份证-模糊匹配keyup事件——下拉框
     * @param  {[type]} ){                                          var            idcard [description]
     * @param  {[type]} dataType: "json"        [description]
     * @param  {String} success:  function      (rs)          {                                         var                                       li [description]
     * @param  {[type]} error:    function      (errMsg)      {                                         console.log(errMsg);            }                        } [description]
     * @return {[type]}           [description]
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
            url: jQuery.url.ECRBManagement.searchActivityIng,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.name+'</td>\
                                    <td>'+ item.type +'</td>\
                                    <td>'+ item.participantName +'</td>\
                                    <td>'+ item.participantldcard +'</td>\
                                    <td>'+ item.level+'</td>\
                                    <td>'+ item.status +'</td>\
                                    <td>'+ item.noticedPersons +'</td>\
                                    <td>'+ item.thisTermStartDate +'</td>\
                                    <td>'+ item.menberGroupld +'</td>\
                                    <td>'+ item.toFinishPersons+'</td>\
                                    <td>'+ item.createdPartyId +'</td>\
                                    <td>'+ item.createdTime +'</td>\
                                    <td>\
                                 		<a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-book"></i>&nbsp;详情</a>\
                                        <a href="#" class="label-info  J_stop" data-toggle="modal" data-target="#stopDialog"><i class="fa fa-stop"></i>&nbsp;暂停下一期</a>\
                                        <a href="#" class="label-info  J_stopAll" data-toggle="modal" data-target="#stopAllDialog"><i class="fa fa-stop"></i>&nbsp;暂停所有</a>\
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
     /**
     * 表格暂停下一期按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $(document).on('click', '.J_stop', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });

    /**
     * 暂停下一期按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_stopDlg').click(function(){
        stop();
    });

    /**
     * 暂停下一期事件
     */
    function stop(){
        var
            id = $('.hidId').val(),
            form = {
                id: id
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.stopActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#stopDialog').modal('hide');
                if(rs.code == 0){
                 
                    // location.reload();
                }else{
                    $('#stopDialog').modal('hide');
                    $('#modalDialog').modal();
                }
            },
            error: function (message) {
                $('#modalDialog').modal();
            }
        });
    }
     /**
     * 表格暂停所有按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $(document).on('click', '.J_stopAll', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });

    /**
     * 暂停所有按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_stopAllDlg').click(function(){
        stopall();
    });

    /**
     * 暂停所有事件
     */
    function stopall(){
        var
            id = $('.hidId').val(),
            form = {
                id: id
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.ECRBManagement.stopAllActivity,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#stopAllDialog').modal('hide');
                if(rs.code == 0){
                   
                    // location.reload();
                }else{
                    $('#stopAllDialog').modal('hide');
                    $('#modalDialog').modal();
                }
            },
            error: function (message) {
                $('#modalDialog').modal();
            }
        });
    }

});