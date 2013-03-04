	var popular = [];
	var similar = [];
	popular["loaded"] = 0 , popular["count"] = 0 , popular["already_loaded"] = 0;
	similar["loaded"] = 0 , similar["count"] = 0 , similar["already_loaded"] = 0;
	var jsontext = [];//= new Object();
	var similar_json = [];
	var popular_json = [];
	var page = 0;
	var host = location.hostname;
	var url_to_fetch = "http://"+host+"/msapp/sanitize_post.php";
	var category_page = "http://"+host+"/msapp/category.html";
	var url_to_fetch_for_cat = "http://"+host+"/msapp/sanitize_cat.php";
	var url_to_fetch_for_similar = "http://"+host+"/msapp/sanitize_similar.php";
	var url_to_fetch_for_popular = "http://"+host+"/msapp/sanitize_popular.php";
	
	var loading = 0;
	var cat_to_be_fetch = 0;
	var is_post;
	var id_category;
	$.holdReady(true);
	$.ajax ({
			url: url_to_fetch_for_cat,
			type: "GET",
			dataType: "json",
			async: "false",
			success: function (clone) {
				jQuery.each(clone.mag_categories,function (index,cat){
					create_category(cat.MagCategory.id,cat.MagCategory.name);
				});
			},
			error: function(xhr,error,errorthrown) {
				alert("ERROR: "+error+" , "+errorthrown);
			}
	}).done(function(){
		$.holdReady(false);	
	});

	$(document).ready(function () {
	$.ajax({
            url: url_to_fetch,
            type: "GET",
            dataType: "json",
            data: { mag_post_id: sessionStorage.clickPost  },
			async: "false",
            success: function (jsontext) {
            	id_post = jsontext.mag_post.MagPost.id;
            	id_category = jsontext.mag_post.MagPost.mag_category_id;
				create_post_content(jsontext);
            },
            error: function (xhr,error,errorthrown) {
                alert("ERROR: "+error+" , "+errorthrown);
			}
	}); 
		if ( loading == 0 ) {	
			scrollalert_post();
		}
		else {
			return false;
		}
	});
	$(document).on("click",".category",function() {
		//alert("Cat id:"+$(this).attr('data-category'));
		sessionStorage.clickCategory = $(this).attr('data-category') ;
		window.location.href = category_page;
	});
});
