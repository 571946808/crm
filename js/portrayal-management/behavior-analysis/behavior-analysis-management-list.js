/*-----------------------------------------------------------------------------
* @Description:     画像管理-行为分析
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2017.7.28
* ==NOTES:=============================================
* v1.0.0(2017.7.28):
     初始生成
* ---------------------------------------------------------------------------*/
  $(function(){
   /**
     * 初始化提示信息、分页
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
            url: jQuery.url.PortrayalManagement.behaviorAnalysisList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'">\
                                    <td><input type="checkbox" name="userCheck" class="J_select"></td>\
                                    <td>'+ item.name +'</td>\
                                    <td>'+ item.age +'</td>\
                                    <td>'+ item.phone +'</td>\
                                    <td>'+ item.idCard +'</td>\
                                    <td>'+ item.userType +'</td>\
                                    <td>'+ item.integralCondition +'</td>\
                                    <td>'+ item.highestCost +'</td>\
                                    <td>'+ item.allCost+'</td>\
                                    <td>\
                                        <a href="#?id='+ item.id +'" class="label-info"><i class="fa fa-book"></i>&nbsp;详情</a>\
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
    /**
     * 全选事件
     */
    $(".J_selectAll").click(function() {
        $('input[name="userCheck"]').prop("checked", this.checked);
    });
    $(document).on('click', "input[name='userCheck']", function(){
        var userCheck = $("input[name='userCheck']");
        if(userCheck.length == $("input[name='userCheck']:checked").length){
            $(".J_selectAll").prop("checked", true);
        }else{
            $(".J_selectAll").prop("checked", false);
        }
    });
    /**
     * 选择活动方案
     */
    $('.J_plan').click(function(){
        var
            array = [],
            id;

        $.each($('.J_select:checked'), function(index, item){
            id = $(item).parents('tr').attr('data-id');
            array.push(id);
        });

        if(array.length === 0){
            Alert('提示信息', '请至少选择一个用户！');
        }else{
            window.array = array;
            $('#modalDialog').modal();            
        }
    });
    /**
     * 选择活动方案确定
     */
    $('.J_save').click(function(){
        var
            id = $('.J_activity').val();
        if(id == -1){
            Alert('提示信息', '操作失败，请选择活动！');
        }else{
            $.ajax({
                type: "GET",
                url: jQuery.url.PortrayalManagement.behaviorGetTagItem,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {clientId: window.array, id: id},     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if( rs.code == 0){
                        $('#modalDialog').modal('hide');  
                    }else{                
                        Alert('提示信息', '选择活动失败！');
                    }
                },
                error: function (message) {
                    Alert('提示信息', '选择活动失败！');
                }
            }); 
        }        
    });
    /**
     * 活动详情
     */
    $('.J_detail').click(function(){
        var
            id = $('.J_activity').val()
        if(id != -1){
            window.open('#?id='+id);
        }else{
            Alert('提示信息', '查看详情失败，请选择查看的活动！');
        }
    });
    /**
     * 渲染标签类型
     */
    $('select.tagType').on('focus change', function(e){
        var
            array = [],
            selectIndex = $(this).index('select.tagType'),
            tagTypeId = this.value,
            option = $(this).children('option'),
            str = '';

        option.removeClass('hidden');

        $.each($('select.tagType'), function(index, item){
            if(selectIndex != index){
                array.push($(item).val());
            }
        });

        $.each(option, function(index, item){
            if(item.value === array[0] || item.value === array[1]){
                $(this).addClass('hidden');
            }
        });

        renderTagItem(selectIndex, tagTypeId);
    });
    /**
     * 渲染标签项
     */
    function renderTagItem(selectIndex, tagTypeId){
        var
            str = '';

        $.ajax({
            type: "GET",
            url: jQuery.url.PortrayalManagement.behaviorGetTagItem,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {tagTypeId: tagTypeId},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('select.tagItem:eq('+ selectIndex +')').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<option value="'+ item.id +'">'+ item.tagItem +'</option>';
                    }); 
                    $('select.tagItem:eq('+ selectIndex +')').append(str);
                }else{                
                    //location.reload();
                }
            },
            error: function (message) {
                // alert(message);
            }
        });   
    }
});