<?php
$userId = $_POST["userId"]; // 사용자 id

$PATH = "./data/".$userId.".json";

if(is_file($PATH)){
  $jsonString = file_get_contents($PATH);
  $arr = explode("\n",$jsonString);

  for ($i=0; $i < count($arr); $i++) {
    if($arr[$i]!=null){
      $line = json_decode($arr[$i]);
      $image = $line->image."|"; // 구분자 사용하여 표시
      $name = $line->name."|";
      $age = $line->age."|";
      $hobby = $line->hobby."|";
      $restring = implode($arr,"\n");
      file_put_contents($PATH, $restring);
      echo $image; // 반려동물 사진
      echo $name; // 이름
      echo $age; // 나이
      echo $hobby; // 취미 보내기
    }
  }
}
else{
  echo 0;
   }
 ?>
