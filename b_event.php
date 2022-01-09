<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 반려동물 이름

$PATH = "./data/birthday.json"; // 생일 정보 저장 json

if(is_file($PATH)){ // 파일 존재
  $jsonString = file_get_contents($PATH);
  $arr = explode("\n",$jsonString);

  for ($i=0; $i < count($arr); $i++) {
    if($arr[$i]!=null){
      $line = json_decode($arr[$i]);
    if($line->userId == $userId && $line->dogName == $dogName){ // 사용자 id랑 반려동물 이름 같을 시에
      $month = $line->month."|"; // 생일에 해당하는 달
      $day = $line->day."|"; // 생일에 해당하는 일
      $record = $line->record."|"; // 생일 케이크 유니코드

      $restring = implode($arr,"\n");
      file_put_contents($PATH, $restring);
      echo $month; // 찾은 달 출력
      echo $day; // 일 출력
      echo $record; // 케이크 유니코드 출력
      break; // 반복문 종료
    }
  }
}
}
else{ // 파일 존재하지 않을 경우
  echo 0;
}
 ?>
