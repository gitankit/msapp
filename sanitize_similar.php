<?php
/**** Sanitize the output and then pass it to AJAX***/
$url = 'http://myshaadi.in/main/blog/api_get_similar_posts?key=sd3fsdva2as';
//var_dump($_GET);
foreach ($_GET as $key => $value) {
	if($value)
	{
		$url = $url.'&'.$key.'='.$value;
	}
}
//echo $url;
$getJSON = file_get_contents($url);
$encoded_string = $getJSON;//(utf8_encode($getJSON));
	header('Content-Type: application/json');
	echo $encoded_string;
?>
