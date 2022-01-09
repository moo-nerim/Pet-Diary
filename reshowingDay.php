<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 반려동물 이름
$keyValue = $_POST["keyValue"]; // 날짜

$PATH = "./data/".$userId."_".$dogName.".json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

       for ($i=0; $i < count($arr); $i++) {
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);
         if($line->keyValue == $keyValue){ // 날짜 같을 경우
           $json = json_encode($line);
           $arr[$i] = $json;
           $myJSON = implode($arr,"\n");
           file_put_contents($PATH, $myJSON);
           echo $line->text."|".$line->image; // 일기장 text, image 보내기
           break; // 반복문 종료
         }
       }
     }
  }
  else { // 파일이 없을 경우
            echo 0;
        }
?>
