/*点击标题栏 */
$('.category>li>a').on('click', function() {
    $(this).parent().addClass("active").siblings().removeClass("active")
})

// 点击文章索引边栏的一级目录
$('.sidebar>li>a').on('click', function(event) {
    //隐藏所有二级折叠框
    //$('.sidebar>li>div.collapse').collapse('hide')
    // 移除其他二级标题active属性
    $(".sub-sidebar > li").removeClass("active")
        //将点击的一级标题设置active类，其他一级标题移除active
    $(this).parent().addClass("active").siblings().removeClass("active")
        // 将其他一级目录图标切换为初始化右箭头
        //console.log($(this).parent().siblings().children('a').children('span'))
        //$(this).parent().siblings().children('a').children('span').removeClass('glyphicon glyphicon-menu-down').removeClass('glyphicon glyphicon-menu-right').addClass('glyphicon glyphicon-menu-right')

    //将自己的一级目录图标切换
    if ($(this).children('span').attr('class').trim().indexOf('glyphicon-menu-right') != -1) {
        $(this).children('span').removeClass('glyphicon glyphicon-menu-right')
        $(this).children('span').addClass('glyphicon glyphicon-menu-down')
        $(this).siblings('div').collapse('show')

    } else {
        $(this).children('span').removeClass('glyphicon glyphicon-menu-down')
        $(this).children('span').addClass('glyphicon glyphicon-menu-right')
        $(this).siblings('div').collapse('hide')
    }

    // if ($(this).parent().hasClass('requested')) {
    //     return
    // }

    // let data = {}
    // data.cat = $('#category-name').text()
    // data.subcat = $(this).attr('subname')
    // let jsdata = JSON.stringify(data)
    // console.log('jsdata is ', jsdata)
    // let lireq = $(this).parent()
    // $.ajax({
    //     type: "POST",
    //     url: "/home/artinfos",
    //     contentType: "application/json",
    //     data: jsdata, //参数列表
    //     dataType: "html",
    //     success: function(result) {
    //         //请求正确之后的操作
    //         console.log('post success , result is ', result)
    //         if (result.indexOf('res-success') == -1) {
    //             return
    //         }
    //         lireq.children('div').children('ul').html(result)
    //         lireq.addClass('requested')
    //         lireq.children('div').collapse('show')
    //         demo.hiding()
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown) {
    //         //请求失败之后的操作
    //         console.log('post failed')
    //             // 状态码
    //         console.log(XMLHttpRequest.status);
    //         // 状态
    //         console.log(XMLHttpRequest.readyState);
    //         // 错误信息   
    //         console.log(textStatus);
    //     }
    // })
})

//点击文章索引边栏的二级目录
$('.sidebar').on('click', '.subcatli>div>.sub-sidebar>.subtitleli>a', function() {
    loadinst.loading()
        // 移除一级标题active类
    $(".sidebar > li").removeClass("active").siblings().removeClass("active")
        //移除二级标题active类
    $('.subtitleli').removeClass('active')
        //设置二级标题active选中效果
    $(this).parent().addClass("active")
    let id = $(this).attr('art-id')
    data = { 'id': id }
    datajs = JSON.stringify(data)
        //发送请求页面
    $.ajax({
        type: "POST",
        url: "/home/artdetail",
        contentType: "application/json",
        data: datajs, //参数列表
        dataType: "html",
        success: function(result) {
            //请求正确之后的操作
            // console.log('post success , result is ', result)
            let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
            let matchres = matchreg.exec(result)
            if (!matchres) {
                $('.error-tips').text('res not fond').fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            if (matchres[1] != 'res-success') {
                $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            // $('.error-tips').text(matchres[1]).fadeIn(700, function() {
            //     $('.error-tips').fadeOut(1000)
            // })

            $('.article-detail').html(result)
            loadEditor()
            loadinst.unloading()
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
            loadinst.unloading()
        }
    });
})


//小屏幕下点击列表按钮
$('.article-index-btn').on('click', function() {
    $('.ancestor').addClass('show')
    $('body,html').addClass('fix-html');
})

//蒙板点击后侧边栏弹回
$('.mask').on('click', function() {
    $('body,html').removeClass('fix-html');
    $('.ancestor').removeClass('show')
})

//小屏幕下点击分类箭头
$('.category-index').on('click', function() {
    $('.catmask').css('display', 'block')
})

$('.catmask').on('click', function() {
    $('.catmask').css('display', 'none')
    $('#example-navbar-collapse').collapse("hide")
})

//小屏幕侧边栏点击一级标题
$('.xs-article-index-wrapper>ul>li>a').on('click', function() {
    //折叠其他一级标题
    //$(this).parent().siblings().children().collapse('hide')
    //将点击的一级标题设置active类，其他一级标题移除active
    $(this).parent().addClass("active").siblings().removeClass("active")
        //设置二级标题取消active
    $('.xs-article-index-wrapper>ul>li>div a').parent().removeClass('active')

    let glyphicon = $(this).children('span.glyphicon').attr('class')
    if (!glyphicon) {
        return
    }
    if (glyphicon.indexOf('glyphicon-menu-right') == -1) {
        $(this).children('span.glyphicon').removeClass('glyphicon-menu-down glyphicon').addClass('glyphicon glyphicon-menu-right')
    } else {
        $(this).children('span.glyphicon').removeClass('glyphicon glyphicon-menu-right').addClass('glyphicon glyphicon-menu-down')
    }
})

//小屏幕侧边栏点击二级标题
$('.xs-article-index-wrapper>ul>li>div a').on('click', function() {
    //移除一级标题选中状态
    $('.xs-article-index-wrapper>ul>li>a').parent().removeClass('active')
        //移除其他二级标题active
    $('.xs-article-index-wrapper>ul>li>div a').parent().removeClass('active')
        //设置点击的二级标题active
    $(this).parent().addClass('active')

    let id = $(this).attr('art-id')
    data = { 'id': id }
    datajs = JSON.stringify(data)
    loadinst.loading()
        //发送请求页面
    $.ajax({
        type: "POST",
        url: "/home/artdetail",
        contentType: "application/json",
        data: datajs, //参数列表
        dataType: "html",
        success: function(result) {
            //请求正确之后的操作
            // console.log('post success , result is ', result)
            let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
            let matchres = matchreg.exec(result)
            if (!matchres) {
                $('.error-tips').text('res not fond').fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            if (matchres[1] != 'res-success') {
                $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            // $('.error-tips').text(matchres[1]).fadeIn(700, function() {
            //     $('.error-tips').fadeOut(1000)
            // })

            $('.article-detail').html(result)
            loadEditor()
            loadinst.unloading()
            $('body,html').removeClass('fix-html');
            $('.ancestor').removeClass('show')
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
            loadinst.unloading()
            $('body,html').removeClass('fix-html');
            $('.ancestor').removeClass('show')
        }
    });
})

//评论按钮点击事件
$('.article-detail').on('click', '.comment-wrapper>.comment-commit-btn', function() {

    if (window.editor.txt.html().trim() == "") {
        return
    }

    var comment_data = {
        "username": "江边小余",
        "headicon": "",
        "content": window.editor.txt.html(),
        "parent": $('.article-id').text(),
        "artid": $('.article-id').text()
    }

    let commentjs = JSON.stringify(comment_data)
    console.log('comment json data is ', commentjs)
    window.editor.txt.clear()

    //发送点赞数
    $.ajax({
        type: "POST",
        url: "/home/comment",
        contentType: "application/json",
        data: commentjs, //参数列表
        dataType: "html",
        success: function(result) {
            //请求正确之后的操作
            console.log('post success , result is ', result)
            let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
            let matchres = matchreg.exec(result)
            if (!matchres) {
                $('.error-tips').text('res not fond').fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            if (matchres[1] != 'res-success') {
                $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            $('.error-tips').text('感谢您的评论!').fadeIn(700, function() {
                $('.error-tips').fadeOut(1000)
            })

            $('.comment-list-ul').prepend(result)


            let comment_num = $('.comment-span').text().match(/\d+/g)[0]

            $('.comment-span').text(' 评论(' + (comment_num - 0 + 1) + ')')
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
    return
})

//点击评论数
$('.article-detail').on('click', '.browselist>.list-inline>#comment-num', function() {
    console.log("comment-num clicked")
    $('html , body').animate({ scrollTop: $('#comment-label-id').offset().top - 200 }, 300);
    window.editor.txt.html("")
})

//点击回复数开启回复功能
$('.article-detail').on('click', '.reply-num a', function(e) {
    $(this).parent().parent().parent().siblings('.reply-text').stop().slideToggle()
    $(this).parent().parent().parent().siblings('.reply-text').find('textarea').focus()
})

//点击回复按钮
$('.article-detail').on('click', '.reply-btn', function(e) {
    console.log("回复按钮点击")
    let textarea_ = $(this).siblings('form').children('div').children('textarea')
    let span_reply = $(this).parent().siblings('.comment-love').find('span.reply-span')
    if (textarea_.val().trim() == "") {
        return
    }
    console.log(textarea_)
    let replyspan = $(this).parents('.reply-text').siblings('.comment-love').find('span.reply-span')
    let replynum = replyspan.text().match(/\d+/g)[0]
    console.log('replynum is ', replynum)

    let comid = $(this).parents('.comment-ul-li').attr('comment-id')

    console.log('回复父级id为 ', comid)
    console.log('文章id为 ', $('.article-id').text())

    let replyul = $(this).parents('.comment-ul-li').children('.comment-replay')

    let datasend = {
        'parent': comid,
        "username": "江边小余",
        "headicon": "",
        "content": textarea_.val(),
        "artid": $('.article-id').text()
    }

    $(this).parents('.reply-text').stop().slideToggle(300, function() {
        $.ajax({
            type: "POST",
            url: "/home/comreply",
            contentType: "application/json",
            data: JSON.stringify(datasend), //参数列表
            dataType: "html",
            success: function(result) {
                //请求正确之后的操作
                console.log('post success , result is ', result)

                let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
                let matchres = matchreg.exec(result)
                if (!matchres) {
                    $('.error-tips').text('res not fond').fadeIn(700, function() {
                        $('.error-tips').fadeOut(1000)
                    })
                    return
                }

                if (matchres[1] != 'res-success') {
                    $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                        $('.error-tips').fadeOut(1000)
                    })
                    return
                }

                $('.error-tips').text("回复成功").fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })

                replyul.prepend(result)

                replyspan.text(' 回复(' + (replynum - 0 + 1) + ')')

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
        })
    })
})

// $('.comment-list-ul').on('blur', '.reply-text textarea', function(e) {
//     $(this).parent().parent().parent(".reply-text").stop().slideUp();
// })

//文章点击喜欢数
$('.article-detail').on('click', '#love-num a', function() {
    //console.log($(this))
    $(this).siblings('div').stop().fadeIn(1000, function() {
            $(this).fadeOut()
        })
        //已经点赞了
    console.log($(this).children('span.glyphicon').attr('class'))
    if ($(this).children('span.glyphicon').attr('class').indexOf('glyphicon-heart-empty') == -1) {
        return
    }
    $(this).children('span.glyphicon').removeClass('glyphicon glyphicon-heart-empty').addClass('glyphicon glyphicon-heart')
    let love_span = $(this).children('.love-span')
    let love_num = love_span.text().match(/\d+/g)[0]
    console.log(love_num)
    love_span.text(' 喜欢(' + (love_num - 0 + 1) + ')')

    let articleid = $('.article-data .article-id').text()

    let condition = {}
    condition.id = articleid
    let condJson = JSON.stringify(condition)
    console.log("condJson is ", condJson)

    //发送点赞数
    $.ajax({
        type: "POST",
        url: "/home/addlovenum",
        contentType: "application/json",
        data: condJson, //参数列表
        dataType: "json",
        success: function(result) {
            //请求正确之后的操作
            console.log('post success , result is ', result)
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


//评论点击喜欢数
$('.article-detail').on('click', '.comment-love-ul>.love-num-li a', function() {
    //console.log($(this))
    $(this).siblings('div').stop().fadeIn(1000, function() {
            $(this).fadeOut(1000)
        })
        //已经点赞了
    console.log($(this).children('span.glyphicon').attr('class'))
    if ($(this).children('span.glyphicon').attr('class').indexOf('glyphicon-heart-empty') == -1) {
        return
    }

    $(this).children('span.glyphicon').removeClass('glyphicon glyphicon-heart-empty').addClass('glyphicon glyphicon-heart')
    let love_span = $(this).children('.love-span')
    let love_num = love_span.text().match(/\d+/g)[0]
    console.log(love_num)
    love_span.text(' 喜欢(' + (love_num - 0 + 1) + ')')

    let comid = $(this).parents('.comment-ul-li').attr('comment-id')
    console.log('评论id为 ', comid)
    let artid = $('.article-id').text()
    console.log('文章id为 ', artid)

    let datasend = { 'id': comid, 'parent': artid }
    $.ajax({
        type: "POST",
        url: "/home/addcomlove",
        contentType: "application/json",
        data: JSON.stringify(datasend), //参数列表
        dataType: "json",
        success: function(result) {
            //请求正确之后的操作
            console.log('post success , result is ', result)
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
    })
})

// 回复区点赞喜欢数
$('.article-detail').on('click', '.reply-love-ul>.love-num-li a', function() {
    //console.log($(this))
    $(this).siblings('div').stop().fadeIn(1000, function() {
            $(this).fadeOut(1000)
        })
        //已经点赞了
    console.log($(this).children('span.glyphicon').attr('class'))
    if ($(this).children('span.glyphicon').attr('class').indexOf('glyphicon-heart-empty') == -1) {
        return
    }
    $(this).children('span.glyphicon').removeClass('glyphicon glyphicon-heart-empty').addClass('glyphicon glyphicon-heart')
    let love_span = $(this).children('.love-span')
    let love_num = love_span.text().match(/\d+/g)[0]
    console.log(love_num)
    love_span.text(' 喜欢(' + (love_num - 0 + 1) + ')')

    let replyid = $(this).parents('.reply-ul-li').attr('reply-id')
    let commid = $(this).parents('.comment-ul-li').attr('comment-id')
    let datasend = { 'id': replyid, 'parent': commid }
    console.log('reply id is ', replyid)
    console.log('parent id is ', commid)
    $.ajax({
        type: "POST",
        url: "/home/addrpllove",
        contentType: "application/json",
        data: JSON.stringify(datasend), //参数列表
        dataType: "json",
        success: function(result) {
            //请求正确之后的操作
            console.log('post success , result is ', result)
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
    })
})

//点击最新评论
$('.new-comments .com-title').on('click', function(e) {
    let article_id = $(this).attr('article-id')
    console.log("article_id is ", article_id)
    if (article_id && article_id != "") {
        window.location.href = "/articlepage?id=" + article_id
    }
})

//点击热门文章
$('.article-hot>a').on('click', function(e) {
    let article_id = $(this).attr('article-id')
    console.log("article_id is ", article_id)
    if (article_id && article_id != "") {
        window.location.href = "/articlepage?id=" + article_id
    }
})

//文章列表
$('.index-art-list').on('click', '.read-more-span', function(e) {
    let id = $(this).parents('.article-li').attr('article-id')
    let req = "/articlepage?id=" + id
    console.log('req is ', req)
    window.location.href = req
})

//下一页
$('.index-art-list ').on('click', '.next', function(e) {
    e.preventDefault()
    if ($(this).hasClass('disabled')) {
        return false
    }
    loadinst.loading()
    let nextpage = $(this).attr('page')
    console.log('nextpage is ', nextpage)
    let data = {
        'page': nextpage - 0
    }
    let datajs = JSON.stringify(data)
    let nextli = $(this)
    $('.index-art-list').fadeOut()
    $.ajax({
        type: "POST",
        url: "/home/artdetails",
        contentType: "application/json",
        data: datajs, //参数列表
        dataType: "html",
        success: function(result) {
            loadinst.unloading()
                //请求正确之后的操作
            console.log('post success , result is ', result)

            let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
            let matchres = matchreg.exec(result)
            if (!matchres) {
                $('.error-tips').text('res not fond').fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            if (matchres[1] != 'res-success') {
                $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                return
            }

            // $('.error-tips').text("翻页成功").fadeIn(700, function() {
            //     $('.error-tips').fadeOut(1000)
            // })

            $('.index-art-list').html(result).fadeIn()
            $("body,html").animate({ scrollTop: 0 }, 500)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            loadinst.unloading()
                //请求失败之后的操作
            console.log('post failed')
                // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
        }
    })
})


//上一页
$('.index-art-list ').on('click', '.previous', function(e) {
    e.preventDefault()
    if ($(this).hasClass('disabled')) {
        return false
    }

    loadinst.loading()

    let prevpage = $(this).attr('page')
    console.log('prevpage is ', prevpage)
    let data = {
        'page': prevpage - 0
    }
    let datajs = JSON.stringify(data)
    let prevli = $(this)
    $('.index-art-list').fadeOut()
    $.ajax({
        type: "POST",
        url: "/home/artdetails",
        contentType: "application/json",
        data: datajs, //参数列表
        dataType: "html",
        success: function(result) {
            loadinst.unloading()
                //请求正确之后的操作
            console.log('post success , result is ', result)

            let matchreg = /<div class="res" hidden>(.+?)<\/div>/gi
            let matchres = matchreg.exec(result)
            if (!matchres) {
                $('.error-tips').text('res not fond').fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                $('.index-art-list').fadeIn()
                return
            }

            if (matchres[1] != 'res-success') {
                $('.error-tips').text(matchres[1]).fadeIn(700, function() {
                    $('.error-tips').fadeOut(1000)
                })
                $('.index-art-list').fadeIn()
                return
            }

            // $('.error-tips').text("翻页成功").fadeIn(700, function() {
            //     $('.error-tips').fadeOut(1000)
            // })

            $('.index-art-list').html(result).fadeIn()
            $("body,html").animate({ scrollTop: 0 }, 500)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            loadinst.unloading()
                //请求失败之后的操作
            console.log('post failed')
                // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
            $('.index-art-list').fadeIn()
        }
    })
})