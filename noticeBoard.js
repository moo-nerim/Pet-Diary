var userId = document.location.href.split(/[=&]/)[1]; // 넘어온 사용자 id
var dogNum = document.location.href.split("=")[2]; // dog num

// 게시글 작성 PopUp창
function write_popUp() {
  document.getElementById('writeDiary').style.display = "block";
}

// img preview
var temp;

function readInputFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader(); // FileReader 객체 생성
    reader.onload = function(e) {
      $('#writeDay').html("<img src='./image/" + document.getElementById('imageFile').files[0].name + "'/ width='300px' height='200px'>");
      temp = './image/' + document.getElementById('imageFile').files[0].name; // image src 저장
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageFile").on('change', function() {
  readInputFile(this);
});

// 게시글 저장
function savePost() {
  var image = temp; // image
  var text = document.getElementById('post').value; // 게시글
  var unique_id = document.getElementById('Post_writeBox').childElementCount; // 게시글 수 저장
  $.ajax({
    url: "saveNoticeBoard.php",
    type: "POST",
    data: {
      userId: userId,
      image: image,
      text: text
    },
    success: function(result) { // 저장 성공했을 경우
      // 각 위치에 맞게 게시글 저장
      $('#Post_writeBox').append("<div class = 'abc' style='border:3px solid rgba(116, 97, 92, 0.77);margin-bottom:30px;width:580px;height:410px'><p style='font-size:20px; top:50px; margin-left:20px;margin-bottom:5px;margin-top:15px'>작성자 : " + userId + "</p><img id='" + (userId + text) + "'src='" + image + "' style='width:300px; height:300px; margin-left:20px; top:100px'> <div style = 'width:240px; height:80px; margin-left:330px;margin-top:-310px;font-size:20px;' >" + text + " </div><img src='./image/opinion.png' style='width:40px;height:40px;margin-top:232px'></div>");
      $('#Post_writeBox').append("<div id='wrap_text'><input type='text' id='" + unique_id + "' class='comment' placeholder='댓글을 달아주세요'></div>");
      $('#Post_writeBox').append("<input type='button' class='send_button' id='" + unique_id + "' value='send' onclick='saveComment()'>");
      $('#Post_writeBox').append("<div id='comment_list'><span class='toc-toggle' id='" + unique_id + "'onclick='openCloseToc()'>▶</span><ul id='" + unique_id + "ul'></ul></div>");
      $('#not_exist').remove();
      cancel_X(); // 게시글 팝업창 닫기
    }
  });
}

var tempText;
// 게시글 가져오기
function loadPost() {
  $.ajax({
    url: "loadNoticeBoard.php",
    type: "POST",
    success: function(result) {

      console.log(result);
      console.log(typeof(result));

      if (result != 0) {
        for (var i = 0; i < result.length; i += 3) {
          if (result.split("|")[i] == "%%") { // 구분자 '%%' 만나기 전까지 반복
            break;
          }
          // '|' 구분자 기준으로 저장
          var userId = result.split("|")[i];
          var text = result.split("|")[i + 1];
          var image = result.split("|")[i + 2];

          tempText = text;
          console.log(text);
          // 게시글에 load하여 저장
          $('#Post_writeBox').append("<div style='border:3px solid rgba(116, 97, 92, 0.77);margin-bottom:30px;width:580px;height:410px'><p style='font-size:20px; top:50px; margin-left:20px;margin-bottom:5px;margin-top:15px'>작성자 : " + userId + "</p><img id='" + (userId + text) + "'src='" + image + "' style='width:300px; height:300px; margin-left:20px; top:100px'> <div style = 'width:240px; height:80px; margin-left:330px;margin-top:-310px;font-size:20px;' >" + text + " </div><img src='./image/opinion.png' style='width:40px;height:40px;margin-top:232px'></div>");
          $('#Post_writeBox').append("<div id='wrap_text'><input type='text' id='" + text + "' class='comment' placeholder='댓글을 달아주세요'></div>");
          $('#Post_writeBox').append("<input type='button' class='send_button' id='" + text + "' value='send' onclick='saveComment()'>");
          $('#Post_writeBox').append("<div id='comment_list'><span class='toc-toggle' id='" + text + "'onclick='openCloseToc()'>▶</span><ul id='" + text + "ul'></ul></div>");
        }
      } else { // 저장된 게시글이 없을 경우
        $('#Post_writeBox').append("<p style='font-size:20px;position:absolute;top:300px;left:130px' id='not_exist'>" + "저장된 게시글이 없습니다. 처음으로 작성해보세요!" + "</p>");
      }
    }
  });
}

loadPost();

// cancle button
function cancel_X() {
  document.getElementById('writeDiary').style.display = "none"; // 게시글 팝업창 닫기
  $('#writeDay').empty(); // 작성한 내용 초기화
  $('#writeDay').append("<img src=./image/focus.png id=" + "pocusImage>");
  $('#post').val("");
}

// 이모티콘
$(document).ready(function() {
  $(".comment").emojioneArea();
})

// 댓글 저장
function saveComment() {
  console.log(event.target.id);
  var t = event.target.id;
  var comment = $('#' + t + '').val();
  console.log(comment);
  if(comment!=undefined && comment!=""){
    $.ajax({
      url: "saveComment.php",
      type: "POST",
      data: {
        userId: userId,
        comment: comment,
        text: t
      },
      success: function(result) { // id 값을 가진 댓글창에 댓글 붙이기
        $('#' + t + 'ul').append("<div id='comment_size'>" + userId + "님:&nbsp" + comment + "</div>");
      }
    });
  }
  // 댓글창 초기화
  $(".emojionearea-editor").empty();
  $(".comment").val("");
  //$('#'+t+'').val("");
}

// 댓글 가져오기
function loadComment(){
  $.ajax({
    url: "loadComment.php",
    type: "POST",
    success: function(result) {
      if (result != 0) {
        for (var i = 0; i < result.length; i += 3) {
          if (result.split("|")[i] == "%%") {
            break;
          }
          var userId = result.split("|")[i];
          var comment = result.split("|")[i + 1];
          var text = result.split("|")[i + 2];

          $('#' + text + 'ul').append("<div id='comment_size'>" + userId + "님:&nbsp" + comment + "</div>");
        }
      }
    }
  });
}

loadComment();

//댓글 펼치기, 숨기기
function openCloseToc() {
  console.log(event.target.id);
  if ($('#' + event.target.id + 'ul').css("display") == 'block') { // 댓글창이 펼쳐졌을 경우
    $('#' + event.target.id + 'ul').css("display", "none"); // 댓글창 닫기
    $('.toc-toggle').text('▶'); // text 변경
  } else { // 댓글창 닫혔을 경우
    $('#' + event.target.id + 'ul').css("display", "block");
    $('.toc-toggle').text('▼');
  }
}

function back_mainBoard() {
  location.href = "main_board.html?id=" + userId + "&dog=" + dogNum; // 페이지 이동
}
