<?php
/**** Sanitize the output and then pass it to AJAX***/
$url = 'http://myshaadi.in/main/blog/ajax_load_more?';
if ( isset($_GET['last_page_id'])) {
		//echo "";
		//exit(0);
		$url = $url.'&last_page_id='.$_GET['last_page_id'];
}
if ( isset($_GET['mag_category_id'])) {
		$url = $url.'&mag_category_id='.$_GET['mag_category_id'];
}
/*if () {
	exit(0);
}*/
//echo $url;
$getJSON = file_get_contents($url);
$encoded_string = $getJSON;//(utf8_encode($getJSON));
	header('Content-Type: application/json');
	echo $encoded_string;
?>
