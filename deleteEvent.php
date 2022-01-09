<?php
$userId = $_POST["userId"];
$dogName = $_POST["dogName"];
$year = $_POST["year"];
$month = $_POST["month"];
$day = $_POST["day"];

$PATH = "./data/".$userId."_".$dogName."_event.json";

$json = file_get_contents($PATH);
$arr = explode("\n",$json);

      // POST로 받은 정보에 해당하는 내용 파일에서 삭제
       for ($i=0; $i < count($arr); $i++) {
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);

           // 년, 달, 일 모두 찾고자 하는 것에 만족할 경우
         if($line->year == $year && $line->month == $month && $line->day == $day){
           unset($arr[$i]); // unset() 이용해서 해당 라인 삭제
           break; // 찾았으므로 for문 종료
         }
       }
     }
     $restring = implode($arr,"\n"); // 줄바꿈으로 나눈 배열 다시 합쳐서 저장
     file_put_contents($PATH, $restring); // 해당 경로에 변경 내용 쓰기
     echo 0;
?>
