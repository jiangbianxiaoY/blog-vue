$('#title-edit').keyup(function(e) {
    let key = e.which
        //按下回车后抬起
    if (key == 13) {
        e.preventDefault()
    }
})

$('#title-edit').keydown(function(e) {
    let key = e.which
    if (key == 13) {
        e.preventDefault()
    }
})


//点击分类下拉菜单
$('.cat-div button').on('click', function() {
    //console.log("year button clicked")
    //设置下拉列表选中状态
    let text_data = $(this).children('.cat-text').text()
        //清空之前的选中状态
    $(this).siblings('ul').children('li').removeClass('active')
        //设置下拉列表选中状态

    $(this).siblings('ul').children('li').each(function() {
        if ($(this).children('a').text() == text_data) {
            $(this).addClass('active')
        }
    })
})

//点击分类列表更新按钮信息
$('.cat-div ul li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active')
    $(this).parent().siblings('button').children('.cat-text').text($(this).children('a').text())
    console.log('catid is ', $(this).children('a').attr('catid'))
    $('.subcat-div>button>.subcat-text').text('不限')
    if ($(this).children('a').attr('catid') == undefined) {
        return
    }
    //请求子分类
    $.ajax({
        type: "POST",
        url: "/admin/subcatselect",
        contentType: "application/json",
        data: JSON.stringify({ 'catid': $(this).children('a').attr('catid') }), //参数列表
        dataType: "html",
        success: function(result) {
            //请求正确之后的操作
            console.log('post success , result is ', result)

            let index_find = result.indexOf('Sign in')
                //找到Sign in 说明是登录页面
            if (index_find != -1) {
                window.location.href = "/admin/login"
                return
            }

            $('.subcat-div>ul').html(result)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //请求失败之后的操作
            console.log('post failed')
                // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
        }
    });
})

//点击子分类下拉菜单
$('.subcat-div button').on('click', function() {

    //console.log("year button clicked")
    //设置下拉列表选中状态
    let text_data = $(this).children('.subcat-text').text()
        //清空之前的选中状态
    $(this).siblings('ul').children('li').removeClass('active')
        //设置下拉列表选中状态

    $(this).siblings('ul').children('li').each(function() {
        if ($(this).children('a').text() == text_data) {
            $(this).addClass('active')
        }
    })
})

//点击月份列表更新按钮信息
$('.subcat-div ul').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active')
    $(this).parent().siblings('button').children('.subcat-text').text($(this).children('a').text())
})

//点击发布文章按钮
$('.publish-edit-btn').on('click', function() {
    // 保持您原有的变量声明方式
    let title = $('#title-edit').val()
    let content = window.maineditor.txt.html()
    let cat = $('.cat-text').text()
    let subcat = $('.subcat-text').text()
    let subtitle = $('.sub-tittle>input').val()
    let author = $('.author>input').val()
    let summary = $('.summary>input').val()

    // 数据验证
    if (!title || title.trim().length < 5 || title.trim().length > 100) {
        alert('文章标题需5-100个字');
        $('#title-edit').focus();
        return;
    }
    
    if (!content || content.length < 10) {
        alert('文章内容不能少于10个字符');
        return;
    }

    // 设置作者默认值
    author = author || '江边小余';

    // AJAX请求
    $.ajax({
        type: "POST",
        url: "/admin/pubarticle",
        contentType: "application/json",
        data: JSON.stringify({
            'title': title.trim(),
            'content': content,
            'cat': cat,
            'subcat': subcat,
            'subtitle': subtitle ? subtitle.trim() : '',
            'summary': summary ? summary.trim() : '',
            'author': author.trim()
        }),
        dataType: "json",
        beforeSend: function() {
            $('.publish-edit-btn').prop('disabled', true).text('发布中...');
        },
        success: function(result) {
            console.log('发布成功:', result);
            
            if (result.code == 1005) {
                window.location.href = "/admin/login";
                return;
            }
            
            if (result.code == 0) {
                window.location.href = "/admin";
                return;
            }
            
            alert(result.msg || '发布失败');
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('发布失败:', textStatus, errorThrown);
            alert('发布失败，请稍后重试');
        },
        complete: function() {
            $('.publish-edit-btn').prop('disabled', false).text('发布文章');
        }
    });
});

$(function() {
    const E = window.wangEditor
    const editor = new E('#toolbar-container', '#text-container')
        //    设置编辑区域高度为 500 px
    editor.config.height = 100
        //配置菜单
    editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo',
    ]
    hljs.initHighlightingOnLoad(); // 初始化
    hljs.initLineNumbersOnLoad();
    editor.highlight = hljs
    editor.config.languageTab = '    '
    editor.config.pasteIgnoreImg = false
    editor.config.uploadImgShowBase64 = true
    editor.create()
    window.maineditor = editor
    console.log('window.editor is ', window.maineditor)
})