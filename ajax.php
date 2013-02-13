<?php
/**** Sanitize the output and then pass it to AJAX***/
$getJSON = file_get_contents('http://myshaadi.in/main/blog/ajax_load_more?sort_by=recent&last_page_id=0');
$encoded_string = (utf8_encode($getJSON));
header('Content-Type: application/json');
echo $encoded_string;
?>