<?php
/**** Sanitize the output and then pass it to AJAX***/
$url = 'http://myshaadi.in/main/blog/api_get_categories?key=sd3fsdva2as';
$getJSON = file_get_contents($url);
$encoded_string = (utf8_encode($getJSON));
	header('Content-Type: application/json');
	echo $encoded_string;
?>
