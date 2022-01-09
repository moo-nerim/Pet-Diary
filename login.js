// login
var id = document.getElementById("id"); // id
var pw = document.getElementById("pw"); // password
var idpattern = /^([A-Za-z0-9]){6,15}$/; // id 형식 지정
var pwdpattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // pw 형식 지정

// 회원가입
function account() {
  if (!idpattern.test(id.value) | !pwdpattern.test(pw.value)) { // valid check
    alert('아이디 또는 패스워드가 입력 양식에 맞지 않습니다.');
  } else {
    $.ajax({
      url: "account.php",
      type: "POST",
      data: {
        id: id.value, // id 값
        pw: pw.value // pw 값
      },
      success: function(result) {
        console.log(result);
        if (result == 1) { // 이미 아이디가 존재할 경우 회원가입 X
          alert("이미 아이디가 존재합니다.");
        } else if (result == 0) { // 형식에 맞는 회원정보일 경우 가입완료
          alert("회원가입이 완료되었습니다.");
          $('#JoinBox').toggle(0); // 작성한 값 초기화
          $('#id').val("");
          $('#pw').val("");
        }
      }
    });
  }
}

// 로그인
function login() {
  $.ajax({
    url: "login.php",
    type: "POST",
    data: {
      id: id.value,
      pw: pw.value
    },
    success: function(result) {
      if (result == 1) { // 로그인 성공
        location.href="Dog_registration.html?id="+id.value; // 페이지 이동
        $('#id').val("");
        $('#pw').val("");
      }
      else{ // 입력한 아이디와 비밀번호가 일치하지 않으면 오류
        alert('아이디와 비밀번호가 일치하지 않습니다.');
      }
    }
  });
}
