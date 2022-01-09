<?php
$userId = $_POST["userId"]; // 작성자 id
$text = $_POST["text"]; // 게시글
$image = $_POST["image"]; // 게시글 이미지

$PATH = "./data/share_noticeBoard.json";

if (is_file($PATH)) { // .json 파일 존재
  $json = file_get_contents($PATH);
  $arr = explode("\n",$json);

      if (!isset($myObj)){
          $myObj = new stdClass();
        }
          $myObj->userId = $userId; // 작성자 id와 게시글 저장
          $myObj->text = $text;
          $myObj->image = $image;
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
            $myObj->text = $text;
            $myObj->image = $image;
            $myJSON = json_encode($myObj);
            $myJSON .= "\n";

            file_put_contents($PATH, $myJSON,FILE_APPEND);
            echo 0;
          }
?>
