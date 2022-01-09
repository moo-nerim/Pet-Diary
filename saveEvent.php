<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 반려동물 이름
$year = $_POST["year"]; // 저장하고자 하는 년
$month = $_POST["month"]; // 월
$day = $_POST["day"]; // 일
$record = $_POST["record"]; // 일정

$PATH = "./data/".$userId."_".$dogName."_event.json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

      // 일정 수정할 경우(update)
       for ($i=0; $i < count($arr); $i++) {
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);

           // 이미 .json 파일에 수정할 년, 달, 일이 존재할 경우
         if($line->year == $year && $line->month == $month && $line->day == $day){
           $line->record = $record; // 해당 record key에 새로운 일정 저장
           $json = json_encode($line);
           $arr[$i] = $json;
           $myJSON = implode($arr,"\n");
           file_put_contents($PATH, $myJSON);
           echo $record;
           exit;
         }
       }
     }

      if (!isset($myObj)){ // 수정하지 않고 기존 파일에 저장할 경우
          $myObj = new stdClass();
        }
          $myObj->year = $year;
          $myObj->month = $month;
          $myObj->day = $day;
          $myObj->record = $record;
          $myJSON = json_encode($myObj);
          $myJSON .= "\n";

          file_put_contents($PATH, $myJSON,FILE_APPEND);
          echo 0;
  }
  else { // 파일이 없을 경우
            if (!isset($myObj)){
                $myObj = new stdClass();
            }
            $myObj->year = $year;
            $myObj->month = $month;
            $myObj->day = $day;
            $myObj->record = $record;
            $myJSON = json_encode($myObj);
            $myJSON .= "\n";

            file_put_contents($PATH, $myJSON,FILE_APPEND);
            echo 0;
          }
?>
