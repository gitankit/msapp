/*function create_post(json,key,caller) {
 	var post_id = json.mag_posts[key].MagPost.id;
 	var image_url = json.mag_posts[key].MagPost.cover_image;
 	var link = json.mag_posts[key].MagPost.view_url;
 	var title = json.mag_posts[key].MagPost.title;
 	var cat = json.mag_posts[key].MagCategory.name;
 	var cat_id = json.mag_posts[key].MagCategory.id;
	var html;
	html = '<div class="wrap"><img src="'+image_url+'" >';
	html = html + '<p class="main"><a href="" data-post="'+ post_id +'" class="post-title">';
	html = html + title + '</a></p><p class="sub"> in <a class="category" ';
	html = html + ' data-category="' + cat_id + '">' + cat +'</a></p></div>';
	$('.content').append(html);
 } */
 function create_post(json,key,caller) {
 	var post_id = json.mag_posts[key].MagPost.id;
 	var image_url = json.mag_posts[key].MagPost.cover_image;
 	var link = json.mag_posts[key].MagPost.view_url;
 	var title = json.mag_posts[key].MagPost.title;
 	var cat = json.mag_posts[key].MagCategory.name;
 	var cat_id = json.mag_posts[key].MagCategory.id;
	var html;
	html = '<div class="wrap"><img src="'+image_url+'" >';
	html = html + '<div class="info_container"><p class="main"><a href="post.html" data-post="'+ post_id +'" data-transition="slide" class="post-title">';
	html = html + title + '</a></p><p class="sub"> in <a class="category" ';
	html = html + ' data-category="' + cat_id + '">' + cat +'</a></p></div></div>';
	$('.content').append(html);
 } 
 function create_category(cat_id,cat_name) {
 	var html;
 	html = '<li><a class="category" data-category="'+ cat_id +'">'+ cat_name +'</a></li>';
 	$('.cat-divider').after(html);
 }
 function scrollalert(){
		if ( loaded < count) 
			{
				var scrolltop=$('.scrollbox').scrollTop();  
				var scrollheight=$('.content').innerHeight();  
				var windowheight=$('.scrollbox').innerHeight();
				if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {
					loading = 1;
					create_post(jsontext,loaded,1);
					loaded+=1;
					loading = 0;
				}
			}
		else
			{
				var scrolltop=$('.scrollbox').scrollTop();  
				var scrollheight=$('.content').innerHeight();  
				var windowheight=$('.scrollbox').innerHeight();
				if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {
					if ( jsontext.last_reached=="true" ) {
						return false;
					}
					else {
						loading = 1;
						var ret = $.ajax({
								url: url_to_fetch,
								type: "GET",
								dataType: "json",
								async: "false",
								data: { last_page_id: jsontext.last_page_id },
								success: function (clone) {
									jsontext = clone;
									loaded = 0;
								},
								error: function (xhr,error,errorthrown) {
									alert("ERROR: "+error+" , "+errorthrown);
								}
						});
						$(document).ajaxComplete(function() {
								count = jsontext['mag_posts'].length;
								//loaded = 0;
								create_post(jsontext,loaded,2);
								loaded++;
								loading = 0;
						});
						return false;
					}
				}
			}
		}

 function scrollalert_cat(){
//	if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {
		if ( loaded < count) 
			{
				var scrolltop=$('.scrollbox').scrollTop();  
				var scrollheight=$('.content').innerHeight();  
				var windowheight=$('.scrollbox').innerHeight();
				if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {

				loading = 1;
				create_post(jsontext,loaded,1);
				loaded+=1;
				loading = 0;
			}}
		else
			{
				//alert(cat_to_be_fetch);
				var scrolltop=$('.scrollbox').scrollTop();  
				var scrollheight=$('.content').innerHeight();  
				var windowheight=$('.scrollbox').innerHeight();
				if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {
						//alert(jsontext.last_reached);
					if ( jsontext.last_reached=="true" ) {
						return false;
					}
					else {
						loading = 1;
						var ret = $.ajax({
								url: url_to_fetch,
								type: "GET",
								dataType: "json",
								async: "false",
								data: { last_page_id: jsontext.last_page_id , mag_category_id: sessionStorage.clickCategory },
								success: function (clone) {
									jsontext = clone;
									loaded = 0;
								},
								error: function (xhr,error,errorthrown) {
									alert("ERROR: "+error+" , "+errorthrown);
								}
						});
						$(document).ajaxComplete(function() {
								count = jsontext['mag_posts'].length;
								//loaded = 0;
								create_post(jsontext,loaded,2);
								loaded++;
								loading = 0;
						});
						return false;
					}
				}
			}
		//}
	}	
 function create_post_content(json) {
 	var post_title = json.mag_post.MagPost.title;
 	var post_content = json.mag_post.MagPost.content;
	var html;
	html = '<div class="post"><h2>'+post_title+'</h2>';
	html = html + '<div>'+post_content+'</div></div>';
	$('.content').append(html);
 } 
function create_post_snippet(json,key,caller) {
 	var post_id = json.mag_posts[key].MagPost.id;
 	var image_url = json.mag_posts[key].MagPost.cover_image;
 	//var link = json.mag_posts[key].MagPost.view_url;
 	var title = json.mag_posts[key].MagPost.title;
 	/*var cat = json.mag_posts[key].MagCategory.name;
 	var cat_id = json.mag_posts[key].MagCategory.id;*/
 	var post_content = json.mag_posts[key].MagPost.content_snippet;
	var html;
	html = '<div class="wrap"><img src="'+image_url+'" >';
	html = html + '<p class="main"><a href="" data-post="'+ post_id +'" class="post-title">';
	html = html + title + caller + '</a></p><p>' + post_content + '</div>';
	$('.content').append(html);
	//alert("loaded");
 } 
 
 function scrollalert_post(){
	var scrolltop=$('.scrollbox').scrollTop();  
	var scrollheight=$('.content').innerHeight();  
	var windowheight=$('.scrollbox').innerHeight();
	if( scrolltop > (scrollheight-(windowheight)) && loading == 0 )  {	//If the end of page is reached
		if ( similar["already_loaded"] == 0 ) {	// If similar posts loading is not over
			if ( similar["loaded"] == 0 ) {	// If Similar posts have not been loaded at all
				$('.content').append("<h2>Similar Posts</h2>");
				loading = 1;
				var sret = $.ajax({
						url: url_to_fetch_for_similar,
						type: "GET",
						dataType: "json",
						async: "false",
						data: { mag_post_id: id_post , mag_category_id: id_category , num_posts: "3" },
						success: function (clone) {
							similar_json = clone;
						},
						error: function (xhr,error,errorthrown) {
							alert("ERROR: "+error+" , "+errorthrown);
						}
				}).done(function(){
					similar["count"] = similar_json.mag_posts.length;
					similar["loaded"] = 0;
					create_post_snippet(similar_json,0,3); //Create the first similar post
					similar["loaded"] = 1;
					loading = 0;
				});
			}
			else {	// If the similar posts have been loaded at least once
				if ( similar["loaded"] >= similar["count"] ) { // If all similar posts have been displayed	
					similar["already_loaded"] = 1; 
				}
				else {	//Else display next similar post
					create_post_snippet(similar_json,similar["loaded"],1);
					similar["loaded"] ++;
				}
			}
		}
		else if ( popular["already_loaded"] == 0 && similar["already_loaded"] == 1 ) {	// If popular posts loading is not over
			if ( popular["loaded"] == 0 ) {	// If popular posts have not been loaded at all
				loading = 1;
				$('.content').append("<h2>Popular Posts</h2>");
				$.ajax({
						url: url_to_fetch_for_popular,
						type: "GET",
						dataType: "json",
						async: "false",
						data: { mag_post_id: id_post , mag_category_id: id_category , num_posts: "3" },
						success: function (clone) {
							popular_json = clone;
						},
						error: function (xhr,error,errorthrown) {
							alert("ERROR: "+error+" , "+errorthrown);
						}
				}).done(function(){ 
					popular["count"] = popular_json.mag_posts.length;
					popular["loaded"] = 0;
					//$('.content').append("<h2>Popular Posts Posts</h2>");
					create_post_snippet(popular_json,0,1); //Create the first popular post
					popular["loaded"] = 1;
					loading = 0;
				});
			}
			else {	// If the popular posts have been loaded at least once
				if ( popular["loaded"] >= popular["count"] ) { // If all popular posts have been displayed	
					popular["already_loaded"] = 1; 
				}
				else {	//Else display next popular post
					create_post_snippet(popular_json,popular["loaded"],2);
					popular["loaded"] ++;
				}
			}
		}
		else { // Everthing has loaded
			return false;
		}
	}

}				

