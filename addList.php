<?php
$userId = $_POST["userId"]; // 사용자 id
$name = $_POST["name"]; // 사용자 반려동물 이름
$age = $_POST["age"]; // 나이
$hobby = $_POST["hobby"]; // 취미
$image = $_POST["image"]; // 이미지

$PATH = "./data/".$userId.".json";
$count = 0; // 저장된 반려동물 마릿수

          if (!isset($myObj)){
              $myObj = new stdClass();
          }
          $myObj->name = $name; // 이름 저장
          $myObj->age = $age; // 나이 저장
          $myObj->hobby = $hobby; // 취미 저장
          $myObj->image = $image; // 이미지 저장

          $myJSON = json_encode($myObj);
          $myJSON .= "\n"; // 마지막 줄바꿈 추가
          file_put_contents($PATH, $myJSON,FILE_APPEND); // 파일 마지막에 새로운 정보 추가

          // 저장된 데이터 수 세기
          $json = file_get_contents($PATH); // 해당 경로로 파일 읽기
          $arr = explode("\n",$json); // 줄바꿈 기준으로 배열에 저장
          for ($i=0; $i<count($arr); $i++) {
            if($arr[$i]!=null){
              $count++; // 저장된 반려동물 마릿수 세기
              }
            }
          echo $count; // 데이터 수 출력
?>
