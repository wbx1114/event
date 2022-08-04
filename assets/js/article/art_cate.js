 // 获取 表格数据
 const initArtCateList = () => {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        data:null,
        success: (res) => {
            // console.log(res);
            const {status,message,data}=res
            if(status!==0) return layer.msg(message)
            // 调用 template
            let htmlStr = template("tpl-table", data);
            $("tbody").empty().html(htmlStr);
        },
    });
};

initArtCateList();
const layer = layui.layer;
$('#addCateBtn').click(function(){
    layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $('#dialog-add').html(),
    });
})
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg("新增分类失败！");
            initArtCateList();
            layer.msg("新增分类成功！");
            layer.close(indexAdd);
        },
    });
})