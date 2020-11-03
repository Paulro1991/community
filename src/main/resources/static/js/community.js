//提交回复
function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    comment2target(questionId, 1, content);

}

function comment2target(targetId, type, content) {
    if (!content) {
        alert("不能回复空内容");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: "application/json",
        data: JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": type
        }),
        success: function (response) {
            if (response.code == 200) {
                window.location.reload();
            } else {
                if (response.code == 2003) {
                    var isAccepted = confirm(response.message);
                    if (isAccepted) {
                        window.open("https://github.com/login/oauth/authorize?client_id=31a0d2602de460caafd8&redirect_uri=http://localhost:8887/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", "true");
                    }
                } else {
                    alert(response.message);
                }
            }
        },
        data_type: "json"
    });
}

function comment(e) {
    var commentId = e.getAttribute("data-id");
    var content = $("#input-" + commentId).val();
    comment2target(commentId, 2, content);
}

//展开二级评论
function collapseComments(e) {
    var id = e.getAttribute("data-id");
    var comments = $("#comment-" + id);
    var state = e.getAttribute("data-collapse");
    if (state) {
        // 关闭二级评论
        comments.removeClass("in")
        e.removeAttribute("data-collapse");
        e.classList.remove("active");
    } else {
        var subCommentContainer = $("#comment-" + id);
        if (subCommentContainer.children().length != 1) {
            // 展开二级评论
            comments.addClass("in");
            //标记展开状态
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        } else {
            $.getJSON("/comment/" + id, function (data) {
                $.each(data.data.reverse(), function (key, comment) {
                    //1
                    var commentElement = $("<div/>", {
                        "class": "col-lg-12 col-md-12 col-sm-12 col-xs-12 comments",
                    });

                    //2
                    var mediaElement = $("<div/>", {
                        "class": "media"
                    });

                    //3-1
                    var mediaLeftElement = $("<div/>", {
                        "class": "media-left"
                    });
                    //3-1-1
                    var avatarElement = $("<img/>", {
                        "class": "media-object img-rounded",
                        "src": comment.user.avatarUrl
                    });

                    //3-2
                    var mediaBody = $("<div/>", {
                        "class": "media-body"
                    });
                    //3-2-1
                    var mediaHeading = $("<h6/>", {
                        "class": "media-heading"
                    });
                    //3-2-1-1
                    var username = $("<span/>", {
                        html: comment.user.name
                    });
                    //3-2-2
                    var content = $("<div/>", {
                        html: comment.content
                    });
                    //3-2-3
                    var menu = $("<div/>", {
                        "class": "menu"
                    });
                    //3-2-3-1
                    var gmtTime = new Date(comment.gmtCreate).toISOString();
                    var time = $("<span/>", {
                        "class": "pull-right",
                        html: gmtTime.substring(0, 10) + " " + gmtTime.substring(11, 19)
                    });

                    //3-1
                    mediaLeftElement.append(avatarElement);
                    //3-2
                    mediaHeading.append(username);
                    menu.append(time);
                    mediaBody.append(mediaHeading);
                    mediaBody.append(content);
                    mediaBody.append(menu);

                    //2
                    mediaElement.append(mediaLeftElement);
                    mediaElement.append(mediaBody);

                    //1
                    commentElement.append(mediaElement);

                    subCommentContainer.prepend(commentElement);

                });

                // 展开二级评论
                comments.addClass("in");
                //标记展开状态
                e.setAttribute("data-collapse", "in");
                e.classList.add("active");

            });
        }
    }
}

function selectTag(e) {
    var value = e.getAttribute("data")
    var previous = $("#tag").val();
    if (previous.indexOf(value) == -1) {
        if (previous) {
            $("#tag").val(previous + ',' + value);
        } else {
            $("#tag").val(value);
        }
    }
}

function showSelectTag() {
    $("#select-tag").show();
}