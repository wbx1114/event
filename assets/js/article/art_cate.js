 // 获取 表格数据
 const initArtCateList = () => {
     $.ajax({
         type: "GET",
         url: "/my/article/cates",
         data: null,
         success: (res) => {
             // console.log(res);
             const {
                 status,
                 message,
                 data
             } = res
             if (status !== 0) return layer.msg(message)
             // 调用 template
             let htmlStr = template("tpl-table", data);
             $("tbody").empty().html(htmlStr);
         },
     });
 };

 initArtCateList();
 const layer = layui.layer;
 const form = layui.form
 let indexAdd = null;
 $("#addCateBtn").click(() => {
     indexAdd = layer.open({
         type: 1,
         area: ["500px", "250px"],
         title: "添加文章分类",
         content: $("#dialog-add").html(),
     });
 });
 $('body').on('submit', '#form-add', function (e) {
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

 $('tbody').on('click', '.btn-edit', function () {
     // 弹出修改文章分类的弹窗
     indexEdit = layer.open({
         type: 1,
         area: ["500px", "250px"],
         title: "修改文章分类",
         content: $("#dialog-edit").html(),
     })
     let id = $(this).attr("data-id")
     $.ajax({
         type: "GET",
         url: "/my/article/cates/" + id,

         success: res => {
             const {
                 status,
                 message,
                 data
             } = res
             if (status !== 0) return layer.msg(message)
             form.val('formEdit', data)
         }
     })
 })
 $('body').on('submit', '#form-edit', function (e) {
     e.preventDefault()
     $.ajax({
         type: "POST",
         url: "/my/article/updatecate",
         data: form.val('formEdit'),
         success: res => {
             const {
                 status,
                 message,
             } = res
             layer.msg(message)
             if (status !== 0) return
             initArtCateList()
             layer.close(indexEdit);
         },
     })
 })

 $("tbody").on("click", ".btn-delete", function () {
     let id = $(this).attr('data-id')
     // 提示用户是否删除
     layer.confirm("确定删除吗？", {
         icon: 3,
         title: "提示"
     }, function (index) {
         $.ajax({
             type: "GET",
             url: "/my/article/deletecate/" + id,
             success: res => {
                 const {
                     status,
                     message
                 } = res
                 layer.msg(message)
                 if (status !== 0) return
                 initArtCateList()
             }
         })
     })

 })