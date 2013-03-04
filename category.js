var loaded = 0;
	var count = 0;
	var jsontext = [];//= new Object();
	var page = 0;
	var host = location.hostname;
	var url_to_fetch = "http://"+host+"/msapp/sanitize.php";
	var category_page = "http://"+host+"/msapp/category.html";
	var post_page = "http://"+host+"/msapp/post.html";
	var url_to_fetch_for_cat = "http://"+host+"/msapp/sanitize_cat.php";
	var loading = 0;
	var cat_to_be_fetch = 0;
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
            data: { mag_category_id: sessionStorage.clickCategory  },
			async: "false",
            success: function (clone) {
            	jsontext = clone;
				count = jsontext['mag_posts'].length;
				var height_container = $('.scrollbox').height();
				var initial_posts = Math.round(height_container/950); 
				for ( var index = 0;index <= initial_posts;index++ )
				{
					create_post(jsontext,index,0);
					loaded+=1;
				}
            },
            error: function (xhr,error,errorthrown) {
                alert("ERROR: "+error+" , "+errorthrown);
			}
	}); 
	/*** When clicked on a post , set the local storage for the clicked post id ***/
	$(document).on("click",".post-title",function() {
		sessionStorage.clickPost = $(this).attr('data-post');
		window.location.href = post_page;
	});
	$('.scrollbox').scroll(function() {
		if ( loading == 0 ) {	
			scrollalert_cat();
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
 