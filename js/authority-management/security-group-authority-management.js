/*-----------------------------------------------------------------------------
* @Description:     安全组权限管理
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
            id =  $('.J_id').val();

        $.ajax({
            type: "GET",
            url: jQuery.url.AuthorityManagement.securityGroupAuthorityList,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {page: currentPage, id: id},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#J_template').empty();
                if( rs.code == 0){  
                    $.each(rs.list, function(index, item){
                        str += '<tr data-id="'+ item.id +'" data-express="'+ item.express +'" data-description="'+ item.description +'">\
                                    <td>'+ item.express +'</td>\
                                    <td>'+ item.description +'</td>\
                                    <td>\
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
     * 对话框添加按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_add').click(function(){
        add();
    });
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
     * 对话框删除按钮
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_delDlg').click(function(){
        del();
    });
    /**
     * 添加事件
     */
    function add(){
        var
            selectId = $('.J_select').val(),
            id =  $('.J_id').val();

        if(id == '-1'){
            $('#addDialog').modal();
        }else{
            $.ajax({
                type: "GET",
                url: jQuery.url.AuthorityManagement.sendAuthority,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {id: id, selectId: selectId},     //JSON.stringify
                dataType: "json",
                success: function (rs) {
                    if( rs.code == 0){
                        location.reload();
                    }else{
                        $('#modalDialog').modal();
                    }
                },
                error: function (message) {
                    console.log("添加失败!");
                }
            });
        }
    }
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
            url: jQuery.url.AuthorityManagement.delSecurityGroup,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#delDialog').modal('hide');
                location.reload();
                // $(tr).remove();

            },
            error: function (message) {
                console.log('删除失败!');
            }
        });
    }
    
});