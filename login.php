<?php
$id = $_POST['id'];
$pw = $_POST['pw'];
$PATH = "./data/account.json";

$json = file_get_contents($PATH);
$arr = explode("\n",$json);
for ($i=0; $i <count($arr) ; $i++) {
  if($arr[$i]!=null){
    $line = json_decode($arr[$i]);
    if($line->id == $id){ // 해당 id가 존재할 경우
      if($line->pw == $pw){ // id에 저장된 정보의 pw가 동일할 경우 로그인 성공
        echo 1;
      }
      else{
        echo 0;
      }
    }
  }
}
?>
