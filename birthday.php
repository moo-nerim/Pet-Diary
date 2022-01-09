<?php
$userId = $_POST["userId"];
$dogName = $_POST["dogName"];
$month = $_POST["month"];
$day = $_POST["day"];
$record = $_POST["record"];

$PATH = "./data/birthday.json"; // 생일 정보 저장 json

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

      if (!isset($myObj)){
          $myObj = new stdClass();
        }
          $myObj->userId = $userId; // 사용자 id
          $myObj->dogName = $dogName; // 반려동물 이름
          $myObj->month = $month; // 생일 달
          $myObj->day = $day; // 생일 일
          $myObj->record = $record; // 생일 케이크 유니코드 저장
          $myJSON = json_encode($myObj);
          $myJSON .= "\n"; // 마지막 줄바꿈 추가

          file_put_contents($PATH, $myJSON,FILE_APPEND); // 해당 경로 파일 마지막에 추가
          echo 0;
  }
  else { // 파일이 없을 경우
            if (!isset($myObj)){
                $myObj = new stdClass();
            }
            $myObj->userId = $userId; // 사용자 id
            $myObj->dogName = $dogName; // 반려동물 이름
            $myObj->month = $month; // 생일 달
            $myObj->day = $day; // 생일 일
            $myObj->record = $record; // 생일 케이크 유니코드 저장
            $myJSON = json_encode($myObj);
            $myJSON .= "\n"; // 마지막 줄바꿈 추가

            file_put_contents($PATH, $myJSON,FILE_APPEND); // 해당 경로 파일 마지막에 추가
            echo 0;
          }
?>
