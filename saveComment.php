<?php
$userId = $_POST["userId"]; // 작성자 id
$comment= $_POST["comment"]; // 댓글
$text = $_POST["text"]; // 게시글

$PATH = "./data/comment.json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

      if (!isset($myObj)){
          $myObj = new stdClass();
        }
          $myObj->userId = $userId;
          $myObj->comment = $comment;
          $myObj->text = $text;
          $myJSON = json_encode($myObj);
          $myJSON .= "\n";

          file_put_contents($PATH, $myJSON,FILE_APPEND);
          echo 0;
  }
  else { // 파일이 없을 경우
            if (!isset($myObj)){
                $myObj = new stdClass();
            }
            $myObj->userId = $userId;
            $myObj->comment = $comment;
            $myObj->text = $text;
            $myJSON = json_encode($myObj);
            $myJSON .= "\n";

            file_put_contents($PATH, $myJSON,FILE_APPEND);
            echo 0;
          }
?>
