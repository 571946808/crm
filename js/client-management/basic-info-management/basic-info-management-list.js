/*-----------------------------------------------------------------------------
* @Description:     患者基本信息管理
* @Version:         1.0.0
* @author:          zhangxn(571946808@qq.com)
* @date             2017.7.20
* ==NOTES:=============================================
* v1.0.0(2017.7.20):
     初始生成
* ---------------------------------------------------------------------------*/
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
            str = '',
            data = {
                page: currentPage
            };
        jQuery.extend(data, extraData);

        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.userList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td>'+ item.number +'</td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.gender +'</td>\
                                    <td>'+ item.idcardNum +'</td>\
                                    <td>'+ item.tel +'</td>\
                                    <td class="listStyle"><div class="listStyle">'+ item.diagnosisType +'</div></td>\
                                    <td>'+ item.dicType +'</td>\
                                    <td>'+ item.dicMciType +'</td>\
                                    <td>'+ item.allCost +'</td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-pencil"></i>&nbsp;修改</a>\
                                        <a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-book"></i>&nbsp;详情</a>\
                                        <a href="#" class="label-info J_del" data-toggle="modal" data-target="#delDialog"><i class="fa fa-times"></i>&nbsp;删除</a>\
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
     * 表格删除按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $(document).on('click', '.J_del', function(e){
        var
            tr = $(e.target).parents('tr'),
            id = $(tr).attr('data-id');

        $('.hidId').val(id);
    });

    /**
     * 删除按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_delDlg').click(function(){
        del();
    });

    /**
     * 删除事件
     */
    function del(){
        var
            id = $('.hidId').val(),
            form = {
                id: id
            };

        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.delUserInfo,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                if(rs.code == 0){
                    $('#delDialog').modal('hide');
                    location.reload();
                }else{
                    $('#delDialog').modal('hide');
                    $('#modalDialog').modal();
                }
            },
            error: function (message) {
                $('#modalDialog').modal();
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
    $('#editable-select3').editableSelect3({
        effects: 'slide'  
    });
    $('#html1').editableSelect1();
    $('#html2').editableSelect2();
    $('#html3').editableSelect3();

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
     * 电话-模糊匹配-keyup事件
     */
    $('.J_selectPhone').keyup(function(){
    	var
    		phone = $('input.J_selectPhone').val();

        $(".es-list3").empty();     
        $.ajax({
            type: "GET",
            url: jQuery.url.ClientManagement.selectPhoneData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {phone: phone},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                var
                    li = "";

                $(rs.list).each(function(key, item){
                    li +='<li class="es-visible" style="display: block;">' + item.phone + '</li>';                  
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
     * 列表点击搜索事件
     * @param  {[type]} ){                     }
     * @return {[type]}     [description]
     */
    $(".J_search").click(function(){
        var
            form = $(".J_searchForm").serializeObject();

        Pagination(1, form);
    });
});