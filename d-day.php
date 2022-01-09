<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 반려동물 이름
$year = $_POST["year"]; // 현재 년도
$month = $_POST["month"]; // 현재 달
$day = $_POST["day"]; // 현재 일

$PATH = "./data/".$userId."_".$dogName."_event.json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

       for ($i=0; $i < count($arr); $i++) {
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);

           // json 파일에 저장된 년이 현재 년도보다 크거나, 년도와 달, 일이 모두 클 경우
         if($line->year > $year || ($line->year >= $year && $line->month >= $month && $line->day >= $day)){
           $json = json_encode($line);
           $arr[$i] = $json;
           $myJSON = implode($arr,"\n");
           file_put_contents($PATH, $myJSON);
           echo $line->year."|"; // 현재 년도보다 큰 년도를 출력
           echo $line->month."|"; // 달을 출력
           echo $line->day."|"; // 일을 출력
           echo $line->record."|"; // 날짜에 해당하는 event 출력
         }
       }
     }
     echo "%%"; // 조건 모두 검색했을 때 마지막 구분자 %% 출력
  }
  else { // 파일이 없을 경우
            echo 0;
        }
?>
