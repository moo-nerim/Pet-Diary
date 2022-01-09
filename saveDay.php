<?php
$userId = $_POST["userId"]; // 사용자 id
$dogName = $_POST["dogName"]; // 반려동물 이름
$keyValue = $_POST["keyValue"]; // 날짜
$text = $_POST["text"]; // 일기장 text
$image = $_POST["image"]; // 일기장 image

$PATH = "./data/".$userId."_".$dogName.".json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

       for ($i=0; $i < count($arr); $i++) { // 일기장 내용 변경
         if($arr[$i]!=null){
           $line = json_decode($arr[$i]);
         if($line->keyValue == $keyValue){ // .json 에 저장된 날짜가 이미 있을 경우
           $line->text = $text; // text 변경해서 다시 저장
           $line->image = $image; // image 변경해서 다시 저장
           $json = json_encode($line);
           $arr[$i] = $json;
           $myJSON = implode($arr,"\n");
           file_put_contents($PATH, $myJSON);
           echo 0;
           exit;
         }
       }
     }

     // 수정하지 않고 저장할 경우
      if (!isset($myObj)){
          $myObj = new stdClass();
        }
          $myObj->keyValue = $keyValue; // 날짜
          $myObj->text = $text; // 일기장 text
          $myObj->image = $image; // 일기장 image 저장
          $myJSON = json_encode($myObj);
          $myJSON .= "\n";

          file_put_contents($PATH, $myJSON,FILE_APPEND);
          echo 0;
  }
  else { // 파일이 없을 경우
            if (!isset($myObj)){
                $myObj = new stdClass();
            }
            $myObj->keyValue = $keyValue; // 날짜
            $myObj->text = $text; // 일기장 text
            $myObj->image = $image; // 일기장 image 저장
            $myJSON = json_encode($myObj);
            $myJSON .= "\n";

            file_put_contents($PATH, $myJSON,FILE_APPEND);
            echo 0;
          }
?>
