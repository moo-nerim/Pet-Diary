<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 해당 페이지 반려동물 이름
$year = $_POST["year"]; // 해당 년도
$month = $_POST["month"]; // 해당 달
$day = $_POST["day"]; // 해당 일

$PATH = "./data/".$userId."_".$dogName."_event.json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

       for ($i=0; $i < count($arr); $i++) {
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);

           // 년도, 달, 일 찾고자 하는 정보와 같은지 비교
          // => month+1 의 이유는 month에 저장된 값이 실제 달 보다 하나 적으므로
         if($line->year == $year && $line->month == ($month+1) && $line->day == $day){
           $json = json_encode($line);
           $arr[$i] = $json;
           $myJSON = implode($arr,"\n");
           file_put_contents($PATH, $myJSON);
           echo $line->record; // 해당 조건에 만족하는 일정 출력
           break; // 반복문 종료
         }
       }
     }
  }
  else { // 파일이 없을 경우
            echo 0;
       }
?>
