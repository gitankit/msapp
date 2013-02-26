<?php
/**** Sanitize the output and then pass it to AJAX***/
if ( !isset($_GET['last_page_id'])) {
		//echo "";
		exit(0);
}
$getJSON = file_get_contents('http://myshaadi.in/main/blog/ajax_load_more?sort_by=recent&last_page_id='.$_GET['last_page_id']);
$encoded_string = $getJSON;//(utf8_encode($getJSON));
	header('Content-Type: application/json');
	echo $encoded_string;
?>
