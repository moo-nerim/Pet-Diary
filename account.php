<?php
$id = $_POST["id"]; // 사용자 id
$pw = $_POST["pw"]; // 사용자 pw
$PATH = "./data/account.json";

if (is_file($PATH)) { // 파일 존재
  $json = file_get_contents($PATH); // 경로에서 가져와서 저장
  $arr = explode("\n",$json); // 줄바꿈 기준으로 다시 배열에 저장

  for ($i=0; $i<count($arr); $i++) {
    if($arr[$i]!=null){
    $jsonArr = json_decode($arr[$i]); // i번째에 해당하는 줄 decode해서 저장
    if ($jsonArr->id == $id) { // 해당 줄에 저장된 id와 전달받은 id 동일한지 확인
      echo 1; // 같을 경우 1 보냄
      exit; // 종료
      }
    }
  }
      if (!isset($myObj)){
          $myObj = new stdClass(); // json 위한 class생성
        }
          $myObj->id = $id; // id key값에 $id 저장
          $myObj->pw = $pw; // pw key값에 $pw 저장
          $myJSON = json_encode($myObj); // encode하여 저장
          $myJSON .= "\n"; // 마지막 줄바꿈 추가

          file_put_contents($PATH, $myJSON,FILE_APPEND); // 해당 경로 파일 마지막에 회원정보 추가
          echo 0; // result 0 보냄
          }
          else { // account.data 파일이 없을 경우
              if (!isset($myObj)){
                  $myObj = new stdClass(); // json 위한 class생성
              }
              $myObj->id = $id; // id key값에 $id 저장
              $myObj->pw = $pw; // pw key값에 $pw 저장
              $myJSON = json_encode($myObj); // encode하여 저장
              $myJSON .= "\n"; // 마지막 줄바꿈 추가
              file_put_contents($PATH, $myJSON,FILE_APPEND); // 해당 경로 파일 마지막에 회원정보 추가
              echo 0; // result 0 보냄
          }
?>
