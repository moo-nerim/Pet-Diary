var userId = document.location.href.split(/[=&]/)[1]; // 넘어온 사용자 id
var dogNum = document.location.href.split("=")[2]; // dog num

var currentTitle = document.getElementById('current-year-month'); // 현재 기준 년도, 달
var calendarBody = document.getElementById('calendar-body'); // 달력
var mainTodayDay = document.getElementById('main-day'); // 왼쪽 todoList에 요일 표시
var mainTodayDate = document.getElementById('main-date'); // 왼쪽 todoList에 일자 표시

var today = new Date(); // Date 객체 생성
var fixed_day = new Date(); // 고정된 현재 날짜
var first = new Date(today.getFullYear(), today.getMonth(), 1); // 현재 기준 년도, 월 가져오기
var dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // 요일 배열에 저장
var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // 월 배열에 저장
var leapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 윤년일 경우 월마다 총 일수
var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 윤년이 아닐 경우 월마다 총 일수
var pageFirst = first; // 처음 페이지를 기준으로 Date 객체 저장
var pageYear;
var tdGroup = []; // 일자 클릭시 active class 추가하기 위함 배열

if (first.getFullYear() % 4 === 0) { // 함수 호출을 통해 현재 년도를 알아낸 뒤 4로 나눠 떨어질 경우 윤년에 해당
  pageYear = leapYear; // 윤년 배열을 현재 년도로 변수에 저장
} else { // 윤년이 아닐 경우
  pageYear = notLeapYear; // 기본 총일수 배열을 변수에 저장
}

// ※Reference => "바닐라 코딩"
function showCalendar() { // 달력 출력하는 함수
  let monthCnt = 100; // 초기값 100으로 한 주 세는 변수
  let cnt = 1; // date count하는 변수(초기 date는 1일)

  for (var i = 0; i < 6; i++) { // week 생성(최대 6주)
    var $tr = document.createElement('tr'); // tr tag 생성하여 한 주를 나타냄
    $tr.setAttribute('id', monthCnt); // tr에 속성추가하여 id 값으로 monthCnt 저장

    for (var j = 0; j < 7; j++) { // date 생성(한 주에 7일)
      if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        // 첫 번째 주라면 현재 기준 날짜 출력 || 현재 달의 총일수 비교하여 달력 출력을 종료
        var $td = document.createElement('td'); // td tag 생성하여 날짜 한칸을 나타냄
        $tr.appendChild($td); // 한 주를 나타내는 tr 변수에 td 추가
      } else { // 첫 번째 주가 아니거나, cnt값이 총일수보다 작을 경우
        var $td = document.createElement('td'); // td 요소 생성
        $td.textContent = cnt; // cnt 변수 값 넣어 날짜 저장
        $td.setAttribute('id', cnt); // 날짜값으로 id 생성
        $tr.appendChild($td); // tr에 td 추가

         // Dom setAttribute, by rim
        $td.style.border = "2px solid #8f7642"; // 날짜 칸 style 변경
        $td.style.textAlign = "left";
        $td.style.padding = "5px 20px 34px 5px";
        $td.style.maxHeight = "82.4px";
        $td.style.maxWidth = "140.8px";
        cnt++; // cnt값 증가(1 -> 2 -> ... -> 30) , 최대 총일 수 채워질 때까지 반복
      }
    }
    monthCnt++; // tr 추가될 때마다 monthCnt 증가
    calendarBody.appendChild($tr); // 달력 일자 표시 부분에 한 주씩 추가
  }
  currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
  // 맨 첫줄에 달, 년도 표시
  showMain();
  clickStart();
}

showCalendar(); // 달력 출력 함수 실행

function removeCalendar() { // 현재 달력 표시 삭제
  let catchTr = 100; // monthCnt 변수와 같은 초기값
  for (var i = 100; i < 106; i++) { // 6번 반복
    var $tr = document.getElementById(catchTr);
    $tr.remove(); // 한 주에 해당하는 tr 삭제
    catchTr++; // 다음 tr id 접근하기 위해 증가
  }
}

// ※Reference => "바닐라 코딩"
function prev() { // 이전 달로 이동
  if (pageFirst.getMonth() === 1) { // 현재달이 1월일 경우
    pageFirst = new Date(first.getFullYear() - 1, 12, 1); // 현재년도-1, 12월, 1일로 date 객체 생성
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) { // 윤년일 경우
      pageYear = leapYear; // 윤년의 경우 총일수 배열 저장
    } else { // 윤년이 아닐 경우
      pageYear = notLeapYear; // 아닌 경우의 총일수 배열 저장
    }
  } else { // 1월이 아닐 경우
    pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1); // 현재 년도, 현재 달-1, 1일 date 생성
    first = pageFirst;
  }

  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // today 변수도 date 객체 생성하여 변경
  currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
  // 맨 첫줄에 달, 년도 표시

  // by rim
  removeCalendar(); // 현재 달력 삭제
  showCalendar(); // 변경된 달력 출력
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add('active'); // class ="active" 추가
  clickStart();
  showMain();
  reshowingList();
  loadEventLoop();
}

// ※Reference => "바닐라 코딩"
function next() { // 다음 달로 이동
  if (pageFirst.getMonth() === 12) { // 현재달이 12월일 경우
    pageFirst = new Date(first.getFullYear() + 1, 1, 1); // 현재년도+1, 1월, 1일 date 생성
    first = pageFirst; // first 변수에 저장
    if (first.getFullYear() % 4 === 0) { // 윤년일 경우
      pageYear = leapYear; // 윤년의 경우 총일수 배열 저장
    } else { // 윤년이 아닐 경우
      pageYear = notLeapYear; // 아닌 경우의 총일수 배열 저장
    }
  } else { // 12월이 아닌 다른 달의 경우
    pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1); // 현재년도, 현재 달+1, 1일
    first = pageFirst;
  }
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()); // today 변수도 date 객체 생성하여 변경
  currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
  // 맨 첫줄에 달, 년도 표시

  // by rim
  removeCalendar(); // 현재 달력 삭제
  showCalendar(); // 변경된 달력 출력
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add('active'); // class ="active" 추가
  clickStart();
  showMain();
  reshowingList();
  loadEventLoop();
}
// ※Reference => "바닐라 코딩"
var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active'); // class ="active" 추가
var prevBtn = document.getElementById('prev'); // 이전 달 이동
var nextBtn = document.getElementById('next'); // 다음 달 이동
prevBtn.addEventListener('click', prev); // click할 경우 prev() 호출
nextBtn.addEventListener('click', next); // click할 경우 next() 호출

// ※Reference => "바닐라 코딩"
function showMain() {
  mainTodayDay.innerHTML = dayList[today.getDay()];
  mainTodayDate.innerHTML = today.getDate();
}

// ※Reference => "바닐라 코딩"
function clickStart() { // 일자 클릭할 경우 실행되는 함수
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) { // 현재 년, 월에 해당하는 총일수 만큼 반복
    tdGroup[i] = document.getElementById(i); // 배열에 element 저장
    tdGroup[i].addEventListener('click', changeToday); // 'click'할 경우 changeToday() 호출
  }
}

// ※Reference => "바닐라 코딩"
function changeToday(e) { // 일자 클릭할 경우 .active css 효과 바꾸기 위한 함수
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    if (tdGroup[i].classList.contains('active')) {
      // toGroup[]에 저장된 element가 class ="active"를 포함할 경우
      tdGroup[i].classList.remove('active'); // class ="active" 삭제 => 다른 일자에 css 효과 씌우기
    }
  }
  clickedDate1 = e.currentTarget; // 클릭한 현재 target 변수에 저장
  clickedDate1.classList.add('active'); // class ="active" 추가
  today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
  // 현재 날짜를 clickedDate1.id로 일자를 정함
  showMain();
  reshowingList();
}

// 달력 이동시 출력화면 변경
function reshowingList() {
  inputBox.disabled = false; // 텍스트 수정 가능
  keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();

  loadDiary(); // 이동 날짜 해당 일기장 load
  birthdayEvent(); // 생일 load

// 해당 날짜 index에 저장된 값이 undefined일 경우
  if (todoList[keyValue] === undefined) {
    // text 작성 초기화
    inputBox.value = '';
    // image 선택란 초기화
    $('#writeDay').empty();
    // focus.png 다시 붙여서 기본 상태로 돌려놓음
    $('#writeDay').append("<img src=./image/focus.png id=" + "pocusImage>");

    // 해당날짜를 가진 배열 값 초기화
    todoList[keyValue] = [];
    imageList[keyValue] = [];

  } else if (todoList[keyValue].length === 0) { // 저장된 값이 없을 경우
    // 초기화
    inputBox.value = '';
    $('#writeDay').empty();
    $('#writeDay').append("<img src=./image/focus.png id=" + "pocusImage>");

  }
  // todoList[keyValue]에 저장된 값이 있을 경우
  var $div = document.createElement('div'); // div tag 생성
  for (var i = 0; i < todoList[keyValue].length; i++) { // 해당 달에 저장된 길이 만큼 반복
    var $div = document.createElement('div'); // div tage 생성
    //  해당 index에 저장된 값 div에 붙이기
    $div.textContent = todoList[keyValue][i];
    var temp_text = $div.textContent;
    // 글쓰는 칸 value값으로 넣어주기
    $('#textdiary').val(temp_text);
    inputBox.value = temp_text;
    // imageList[][]에 저장된 해당 날짜 image 붙이기
    $('#writeDay').html("<img src='" + imageList[keyValue][i] + "'/ width='300px' height='200px'id=" + keyValue + ">");
    $div.addEventListener('click', checkList); // 한 cell당 'click' 이벤트 부여
  }
}

// img preview
var temp;

// 파일에서 사진 선택시 미리보기 함수
function readInputFile(input) {
  if (input.files && input.files[0]) {
    // FileReader 객체 생성
    var reader = new FileReader();
    reader.onload = function(e) {
      // 선택한 image 붙이기
      $('#writeDay').html("<img src='./image/" + document.getElementById('imageFile').files[0].name + "'/ width='300px' height='200px'id=" + keyValue + ">");
      temp = './image/' + document.getElementById('imageFile').files[0].name;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
// id = imageFile이 변경될 경우 readInputFile()에 자신 객체 인자로 넣어 호출
$("#imageFile").on('change', function() {
  readInputFile(this);
});

// varaible
var inputBox = document.getElementById('textdiary');
var inputDate = document.getElementById('submitDiary');
inputDate.addEventListener('click', addTodoList); // 저장하기 button 클릭

var dataCnt = 1;
// 현재 년, 달에 맨 처음 날짜를 keyValue 값에 저장
var keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
// text 저장 배열
let todoList = [];
todoList[keyValue] = [];
// image 저장 배열
let imageList = [];
imageList[keyValue] = [];

// 일기장 기록 저장
function addTodoList() {
  // div tag 생성
  var $div = document.createElement('div');
  // 일기장에 쓴 text div text로 붙이기
  $div.textContent = inputBox.value;
  inputDate.appendChild($div);
  // 저장한 날짜 index에 작성한 글 저장
  todoList[keyValue].push(inputBox.value);
  // imageList 배열에 'src' 속성 가진 keyValue id값 저장
  imageList[keyValue].push($('#' + keyValue + '').attr("src"));

  // 서버 연결하여 json파일에 저장
  $.ajax({
    url: "saveDay.php",
    type: "POST",
    data: {
      userId: userId, // 사용자 id
      dogName: tempName, // 반려동물 이름
      keyValue: keyValue, // 저장할 날짜
      text: inputBox.value, // 작성한 text
      image: $('#' + keyValue + '').attr("src") // image src
    },
    success: function(result) {
      if (result == 0) { // 저장완료
        dataCnt++; // 데이터 수 증가
        // cell 'click'시 checkList 함수 실행
        $div.addEventListener('click', checkList);
        inputBox.disabled = true; // 저장한 후 바로 내용 변경 X
      }
    }
  });
}

// event 발생 객체에 class 추가
function checkList(e) {
  e.currentTarget.classList.add('checked');
}

// ==============================================
// sidebar
var tempName;
$.ajax({ // 강아지 리스트 가져오기
  url: "loadProfile.php",
  type: "POST",
  data: {
    userId: userId
  },
  success: function(result) {
    // 1번째 반려동물
    var first = result.split("|")[0]; // img src
    var first_name = result.split("|")[1]; // 반려동물 이름
    var first_age = result.split("|")[2]; // 나이
    var first_hobby = result.split("|")[3]; // 취미

    // 2번째 반려동물
    var second = result.split("|")[4];
    var second_name = result.split("|")[5];
    var second_age = result.split("|")[6];
    var second_hobby = result.split("|")[7];

    // 3번째 반려동물
    var third = result.split("|")[8];
    var third_name = result.split("|")[9];
    var third_age = result.split("|")[10];
    var third_hobby = result.split("|")[11];

    // 4번째 반려동물
    var fourth = result.split("|")[12];
    var fourth_name = result.split("|")[13];
    var fourth_age = result.split("|")[14];
    var fourth_hobby = result.split("|")[15];

    if (result != 0) {
      if (first != 0 && first != undefined && dogNum == 1) { // 1번째 반려동물

        // navigator slide bar에 반려동물 정보 출력
        $('.dog-profile').html("<img src=" + first + " width='200px' height='200px' id='1dog'>"); // img 붙이기
        $('.dog-name').html("<p>" + "이름 : " + first_name + "</p>"); // 이름 붙이기
        $('.dog-age').html("<p>" + "나이 : " + first_age + "</p>"); // 나이 붙이기
        $('.dog-hobby').html("<p>" + "취미 : " + first_hobby + "</p>"); // 취미 붙이기
        tempName = first_name;
      } else if (second != 0 && second != undefined && dogNum == 2) { // 2번째 반려동물
        $('.dog-profile').html("<img src=" + second + " width='200px' height='200px' id='2dog'>");
        $('.dog-name').html("<p>" + "이름 : " + second_name + "</p>");
        $('.dog-age').html("<p>" + "나이 : " + second_age + "</p>");
        $('.dog-hobby').html("<p>" + "취미 : " + second_hobby + "</p>");
        tempName = second_name;
      } else if (third != 0 && third != undefined && dogNum == 3) { // 3번째 반려동물
        $('.dog-profile').html("<img src=" + third + " width='200px' height='200px' id='3dog'>");
        $('.dog-name').html("<p>" + "이름 : " + third_name + "</p>");
        $('.dog-age').html("<p>" + "나이 : " + third_age + "</p>");
        $('.dog-hobby').html("<p>" + "취미 : " + third_hobby + "</p>");
        tempName = third_name;
      } else if (fourth != 0 && fourth != undefined && dogNum == 4) { // 4번째 반려동물
        $('.dog-profile').html("<img src=" + fourth + " width='200px' height='200px' id='4dog'>");
        $('.dog-name').html("<p>" + "이름 : " + fourth_name + "</p>");
        $('.dog-age').html("<p>" + "나이 : " + fourth_age + "</p>");
        $('.dog-hobby').html("<p>" + "취미 : " + fourth_hobby + "</p>");
        tempName = fourth_name;
      }
    }
    loadDiary();
    loadEventLoop();
    D_day_cal();
    birthdayEvent();
  }
});

// 저장된 일기장 load
function loadDiary() {
  // 현재 기준으로 keyValue값 변경
  keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();

  $.ajax({
    url: "reshowingDay.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      keyValue: keyValue
    },
    success: function(result) {
      // '|' 기준으로 result 자르기
      var string = result.split("|");
      if (result != 0 && result != "") { // 저장완료
        todoList[keyValue].push(string[0]); // text저장
        imageList[keyValue].push(string[1]); // image 저장

        // cell마다 div 생성하여 text, image 붙이기
        for (var i = 0; i < todoList[keyValue].length; i++) {
          var $div = document.createElement('div');
          $div.textContent = todoList[keyValue][i];
          var temp_text = $div.textContent;
          $('#textdiary').val(temp_text);
          inputBox.value = temp_text;
          $('#writeDay').html("<img src='" + imageList[keyValue][i] + "'/ width='300px' height='200px'id=" + keyValue + ">");
          $div.addEventListener('click', checkList);
        }
      }
    }
  });
}

// 일기장 저장 후 변경 X => 수정 버튼 click
function modifiy() {
  inputBox.disabled = false; // 내용 변경 가능
}

// cancel_X button
function cancel_X() {

  // 저장하고자 했던 event 입력 모두 초기화
  document.getElementById("eventWrite").style.display = "none";
  $(".emojionearea-editor").empty();
  $("#emoji_text").val("");
  $("#event_date").val("");
}

// logout function
function Logout() {
  location.href = "login.html"; // 로그인 페이지로 이동
}

// emoji 사용 function
$(document).ready(function() {
  $("#emoji_text").emojioneArea();
})

// 할일 추가 popUp
function eventPopup() {
  document.getElementById("eventWrite").style.display = "block"; // event 기록 popUp창 보이기
}

// event 저장
function saveEvent() {
  document.getElementById("eventWrite").style.display = "none"; // event 기록 popUp창 숨기기
  console.log($("#emoji_text").val());

  // input type = date value 값 '-' 기준 문자열 자르기
  var y = $("#event_date").val().split("-")[0]; // 년도
  var m = $("#event_date").val().split("-")[1]; // 달
  var d = $("#event_date").val().split("-")[2]; // 일
  if (d.charAt(0) == "0") { // .json에 저장된 형식과 맞추기 위해 2일일 경우 02가 아닌 2만 저장
    d = d.substr(1);
  }

  $.ajax({
    url: "saveEvent.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      year: y,
      month: m,
      day: d,
      record: $("#emoji_text").val() // event 기록 text
    },
    success: function(result) {
      // event 저장한 년, 달이 현재 페이지에 해당할 경우 record 바로 붙임
      if (y == first.getFullYear() && m == first.getMonth() + 1) {
        // 저장한 event cell에 붙임
        $('#' + d + '').append("<br><span style='font-size:20px;width:110px;position:fixed'>" + $('#emoji_text').val() + "</span>");
        d = Number(d) + 1; // string 값 숫자로 변경하여 +1 해줌
        console.log(y);
        console.log(m);
        console.log(d);
        var dday = new Date("" + m + " " + d + ", " + y + "").getTime(); // d-day
        var nowday = new Date(); // 현재
        console.log(new Date("" + m + " " + d + ", " + y + ""));
        console.log(nowday);
        nowday = nowday.getTime(); // 밀리세컨드 단위변환
        var distance = dday - nowday; // d-day에서 현재까지 뺌
        console.log(distance);
        console.log(d);
        console.log(m);
        console.log(y);
        console.log(nowday);
        console.log(dday);
        var count_day = Math.floor(distance / (1000 * 60 * 60 * 24)); // 일
        if (!(distance < 0)) { // 지난 과거 event는 표시하지 않음
          if (distance <= 0) { // 당일 넘어섰을때, d-day로 변경
            // d-day 박스에 날짜 d-day와 record 기록
            $('#D-day').append("<div style='font-size:30px'>D-day&nbsp;" + $("#emoji_text").val() + "</div>");
          } else { // d-day가 아닐 경우 날짜 count, record 기록
            $('#D-day').append("<div style='font-size:30px'>D-" + count_day + "&nbsp;" + $("#emoji_text").val() + "</div>");
          }
        }
        cancel_X(); // 저장 완료시 popUp창 닫음
      } else { // 현재 페이지에 해당하는 event가 아닐 경우 바로 붙이지 않음
        d = Number(d) + 1; // string 값 숫자로 변경하여 +1 해줌
        var dday = new Date("" + m + " " + d + ", " + y + "").getTime(); // d-day
        var nowday = new Date(); // 현재
        nowday = nowday.getTime(); // 밀리세컨드 단위변환
        var distance = dday - nowday; // d-day에서 현재까지 뺌
        console.log(distance);
        console.log(nowday);
        console.log(dday);
        var count_day = Math.floor(distance / (1000 * 60 * 60 * 24)); //일
        if (!(distance < 0)) { // 지난 과거 event는 표시하지 않음
          if (distance == 0) { //당일넘어섰을때, dday로 변경
            $('#D-day').append("<div style='font-size:30px'>D-day&nbsp;" + $("#emoji_text").val() + "</div>");
          } else {
            $('#D-day').append("<div style='font-size:30px'>D-" + count_day + "&nbsp;" + $("#emoji_text").val() + "</div>");
          }
        }
        cancel_X();
      }
    }
  });
}

// event 기록 수정
function updateEvent() {
  var y = $("#event_date").val().split("-")[0];
  var m = $("#event_date").val().split("-")[1];
  var d = $("#event_date").val().split("-")[2];
  if (d.charAt(0) == "0") { // .json 파일에 저장된 형식과 맞추기 위해 한자리 일 경우 앞에 0 제거
    d = d.substr(1);
    console.log(d);
  }

  $.ajax({
    url: "saveEvent.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      year: y,
      month: m,
      day: d,
      record: $("#emoji_text").val()
    },
    success: function(result) {
      // 수정한 event 날짜가 현재 페이지에 해당할 경우
      if (y == first.getFullYear() && m == first.getMonth() + 1) {
        // 기존 기록 삭제
        $('#' + d + '').children('span').last().remove();
        $('#' + d + '').children('br').last().remove();
        // 수정한 event 다시 붙이기
        $('#' + d + '').append("<br><span style='font-size:20px;width:110px;position:fixed'>" + result + "</span>");
        cancel_X();
      }
    }
  });
}

// event 삭제
function deleteEvent() {
  var y = $("#event_date").val().split("-")[0];
  var m = $("#event_date").val().split("-")[1];
  var d = $("#event_date").val().split("-")[2];
  if (d.charAt(0) == "0") { // .json 파일에 저장된 형식과 맞추기 위해 한자리 일 경우 앞에 0 제거
    d = d.substr(1);
    console.log(d);
  }

  $.ajax({
    url: "deleteEvent.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      year: y,
      month: m,
      day: d
    },
    success: function(result) {
      console.log(result);
      console.log(y);
      console.log(first.getFullYear());
      console.log(m);
      console.log(first.getMonth());
      // 저장된 event 삭제
      if (result == 0) {
        $('#' + d + '').children('span').last().remove();
        $('#' + d + '').children('br').last().remove();
        cancel_X();
      }
    }
  });
}

// load event pageYear[]에 저장된 달 index 일수 만큼 반복
function loadEventLoop() {
  for (var q = 1; q <= pageYear[first.getMonth()]; q++) { // 1일 부터 현재 달 마지막 일까지 반복
    loadEvent(q);
  }
}

function loadEvent(q) {
  $.ajax({
    url: "loadEvent.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      year: first.getFullYear(),
      month: first.getMonth(),
      day: q // loadEventLoop()로 받은 일
    },
    success: function(result) {
      console.log(result);
      if (result != 0) { // 해당 day에 저장된 값이 있을 경우
        // event cell에 붙이기
        $('#' + q + '').append("<br><span style='font-size:20px;width:110px;position:fixed'>" + result + "</span>");
      }
    }
  });
}

// 반려동물 생일 cell에 저장
function birthdayEvent() {
  $.ajax({
    url: "b_event.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName
    },
    success: function(result) {
      console.log(result);
      if (result != 0) { // 저장된 event가 있을 경우
        if (first.getMonth() + 1 == result.split("|")[0]) { // 생일 달과 현재 페이지 달이 같을 경우
          // 생일에 해당하는 cell에 생일 케이크 event 붙이기
          $('#' + result.split("|")[1] + '').append("<br><span style='font-size:20px;width:110px;position:fixed'>" + result.split("|")[2] + "</span>");
        }
      }
    }
  });
}

// D-day 계산
function D_day_cal() {
  $.ajax({
    url: "d-day.php",
    type: "POST",
    data: {
      userId: userId,
      dogName: tempName,
      year: first.getFullYear(),
      month: fixed_day.getMonth() + 1,
      day: fixed_day.getDate()
    },
    success: function(result) {
      console.log(result);
      console.log(typeof(result));
      if (result != 0) {
        for (var i = 0; i < result.length; i += 4) { // 4씩 i값 증가
          if (result.split("|")[i] == "%%") { // 구분자 '%%' 일 경우 반복문 종료
            break;
          }
          var year = result.split("|")[i]; // 년
          var month = result.split("|")[i + 1]; // 달
          var day = result.split("|")[i + 2]; // 일
          var record = result.split("|")[i + 3]; // 기록
          //day = Number(day) + 1;
          console.log(day);
          var dday = new Date("" + month + " " + day + ", " + year + "").getTime(); // 디데이
          var nowday = new Date(); // 현재
          nowday = nowday.getTime(); // 밀리세컨드 단위변환
          var distance = dday - nowday; // 디데이에서 현재까지 뺌

          console.log(dday);
          console.log(nowday);
          console.log(distance);
          var d = Math.floor(distance / (1000 * 60 * 60 * 24)); // 일
          if (distance <= 0) { // 지난 event는 d-day 표시하지 않음
            $('#D-day').append("<div style='font-size:30px'>D-day&nbsp;" + record + "</div>");
          } else {
            $('#D-day').append("<div style='font-size:30px'>D-" + (d + 1) + "&nbsp;" + record + "</div>");
          }
        }
      }
    }
  });
}

// 자유 게시판 button 클릭시
function goto_noticeBord() {
  location.href = "noticeBoard.html?id=" + userId + "&dog=" + dogNum; // 자유 게시판 페이지 이동
}
