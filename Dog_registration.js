var userId = document.location.href.split("=")[1]; // 넘어온 사용자 id
document.getElementById("intro").innerHTML = userId + "님의 멍냥이";
var today = new Date(); // 현재 날짜 today에 저장
var temp;

//저장된 데이터 가져오기
window.onload = function() {
  $.ajax({ // 강아지 리스트 가져오기
    url: "loadProfile.php",
    type: "POST",
    data: {
      userId: userId
    },
    success: function(result) {

      console.log(result);
      if (result != 0) {
        var first = result.split("|")[0]; // image;
        var second = result.split("|")[4]; // image;
        var third = result.split("|")[8]; // image;
        var fourth = result.split("|")[12]; // image;
        if (first != 0 && first != undefined) { // 1번째 반려동물
          $('#addlist1').html("<img src=" + first + " width='130px' height='130px' id='1dog' onclick='go_main(1)'>");
          $("#addlist1").attr('onclick', '').unbind('click');
          // 반려동물 이름 붙이기
          $('#addlist1').append("<p style='width:100px; position:fixed; top:290px;font-size:30px'>" + result.split("|")[1] + "</p>");
        }
        if (second != 0 && second != undefined) { // 2번째 반려동물
          $('#addlist2').html("<img src=" + second + " width='130px' height='130px' id='1dog' onclick='go_main(2)'>");
          $("#addlist2").attr('onclick', '').unbind('click');
          // 반려동물 이름 붙이기
          $('#addlist2').append("<p style='width:100px; position:fixed; top:290px;right:630px;font-size:30px'>" + result.split("|")[5] + "</p>");
        }
        if (third != 0 && third != undefined) { // 3번째 반려동물
          $('#addlist3').html("<img src=" + third + " width='130px' height='130px' id='1dog' onclick='go_main(3)'>");
          $("#addlist3").attr('onclick', '').unbind('click');
          // 반려동물 이름 붙이기
          $('#addlist3').append("<p style='width:100px; position:fixed; top:530px;left:628px;font-size:30px'>" + result.split("|")[9] + "</p>");
        }
        if (fourth != 0 && fourth != undefined) { // 4번째 반려동물
          $('#addlist4').html("<img src=" + fourth + " width='130px' height='130px' id='1dog' onclick='go_main(4)'>");
          $("#addlist4").attr('onclick', '').unbind('click');
          // 반려동물 이름 붙이기
          $('#addlist4').append("<p style='width:100px; position:fixed; top:530px;right:630px;font-size:30px'>" + result.split("|")[13] + "</p>");
        }
      }
    }
  });
}

// 반려동물 추가 PopUp창
function addList_PopUp() {
  document.getElementById("registration").style.display = 'block'; // click시 PopUp창 보이기
}

// 이미지 미리보기
function readInputFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader(); // FileReader 객체 생성
    reader.onload = function(e) {
      $('#registDog').html("<img src='./image/" + document.getElementById('imageFile').files[0].name + "'/ width='200px' height='200px'id=" + input.files[0].name + ">");
      temp = './image/' + document.getElementById('imageFile').files[0].name; // temp에 src 저장
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#imageFile").on('change', function() {
  readInputFile(this);

});

// birthday 정보 저장
var b_year;
var b_month;
var b_day;

// 반려동물 저장
function addList() {
  var name = document.getElementById("name").value; // 저장할 반려동물 이름
  var hobby = document.getElementById("hobby").value; // 반려동물 취미
  var image = temp; // 반려동물 사진
  var birthday = document.getElementById("age").value; // 반려동물 생일
  var dateSplit = birthday.split("-"); // 문자열 자르기
  var age = today.getFullYear() - dateSplit[0] + 1; // 나이 계산 => 현재 년도 - 생일

  b_year = dateSplit[0]; // 년도
  b_month = dateSplit[1]; // 월
  b_day = dateSplit[2]; // 일

  $.ajax({ // 반려동물 리스트에 추가
    url: "addList.php",
    type: "POST",
    data: {
      userId: userId,
      name: name,
      age: age,
      hobby: hobby,
      image: image
    },
    success: function(result) {
      if (result == 1) { // 1번째 반려동물 저장
        $('#addlist1').html("<img src=" + image + " width='130px' height='130px' id='1dog' onclick='go_main(1)'>");
        $('#addlist1').append("<p style='width:100px; position:fixed; top:290px;font-size:30px'>" + name + "</p>");
        document.getElementById("registration").style.display = 'none';
        $("#addlist1").attr('onclick', '').unbind('click');
      } else if (result == 2) { // 2번째 반려동물 저장
        $('#addlist2').html("<img src=" + image + " width='130px' height='130px' id='2dog' onclick='go_main(2)'>");
        $('#addlist2').append("<p style='width:100px; position:fixed; top:290px;right:630px;font-size:30px'>" + name + "</p>");
        document.getElementById("registration").style.display = 'none';
        $("#addlist2").attr('onclick', '').unbind('click');
      } else if (result == 3) { // 3번째 반려동물 저장
        $('#addlist3').html("<img src=" + image + " width='130px' height='130px' id='3dog' onclick='go_main(3)'>");
        $('#addlist3').append("<p style='width:100px; position:fixed; top:530px;left:628px;font-size:30px'>" + name + "</p>");
        document.getElementById("registration").style.display = 'none';
        $("#addlist3").attr('onclick', '').unbind('click');
      } else if (result == 4) { // 4번째 반려동물 저장
        $('#addlist4').html("<img src=" + image + " width='130px' height='130px' id='4dog' onclick='go_main(4)'>");
        $('#addlist4').append("<p style='width:100px; position:fixed; top:530px;right:630px;font-size:30px'>" + name + "</p>");
        document.getElementById("registration").style.display = 'none';
        $("#addlist4").attr('onclick', '').unbind('click');
      }
    }
  });
}

// 사진 click하면 main_board.html로 넘어감
function go_main(input) {
  $.ajax({
    url: "birthday.php", // 생일 정보 저장
    type: "POST",
    data: {
      userId: userId,
      dogName:document.getElementById("name").value,
      month: b_month,
      day: b_day,
      record: "🎂"
    }
  });
  location.href = "main_board.html?id=" + userId + "&dog=" + input; // main_board로 이동
}

// cancel_X button
function cancel_X() {
  document.getElementById("registration").style.display = "none"; // 반려동물 초기 입력창 닫기
  $('#name').val(""); // 입력한 text값 모두 초기
  $('#age').val("");
  $('#hobby').val("");
  $('#registDog').empty();
  $('#registDog').append("<img src=./image/focus.png id=" + "pocusImage>"); // focus.png 다시 붙이기
}
