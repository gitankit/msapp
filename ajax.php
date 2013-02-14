<?php
/**** Sanitize the output and then pass it to AJAX***/
$getJSON = file_get_contents('http://myshaadi.in/main/blog/ajax_load_more?sort_by=recent&last_page_id=0');
$encoded_string = (utf8_encode($getJSON));
if ( isset ( $_GET['id'] ) ) {
	$row = $_GET['id'];// - 1;
	$json = json_decode($encoded_string);
	if ( $row >= count($json->mag_posts) ) {
		exit(0); }
	$html = '<div class="wrap"><img src="'.$json->mag_posts[$row]->MagPost->cover_image.'" >';
	$html = $html . '<p class="main"><a href="'.$json->mag_posts[$row]->MagPost->link.'">';
	$html = $html . $json->mag_posts[$row]->MagPost->title .'</a></p><p class="sub"> in ';
	$html = $html . $json->mag_posts[$row]->MagCategory->name .'</p></div>';
	header('Content-Type: text/html');
	echo $html;
}
	else {
			header('Content-Type: application/json');
			echo $encoded_string;
}
?>
