<?php

$PATH = "./data/comment.json"; // 댓글 저장 .json

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

  for ($i=0; $i < count($arr); $i++) {
    if($arr[$i]!=null){
      $line = json_decode($arr[$i]);
      $json = json_encode($line);
      $arr[$i] = $json;
      $myJSON = implode($arr,"\n");
      file_put_contents($PATH, $myJSON);
      echo $line->userId."|"; // 댓글 작성 id
      echo $line->comment."|"; // 댓글
      echo $line->text."|"; // 댓글을 담긴 게시글
    }
  }
  echo "%%"; // 구분자 사용
  }
  else { // 파일이 없을 경우
          echo 0;
       }
?>
