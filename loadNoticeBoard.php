<?php
$PATH = "./data/share_noticeBoard.json"; // 공유게시판 글 가져오기

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
      echo $line->userId."|"; // 구분자 사용해서 작성자 id 보내기
      echo $line->text."|"; // 작성한 게시글 보내기
      echo $line->image."|"; // 사진 보내기
    }
  }
  echo "%%";
}
  else { // 파일이 없을 경우
            echo 0;
       }
?>
