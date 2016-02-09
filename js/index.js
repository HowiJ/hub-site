$( document ).ready( function() {
	$("#signup").hide();
	$("#contactme").hide();
	windows();
	flex();
	ctd();
	signCon();
	view();
	weat();
	//Github jQuery initialize
	$("[data-repo]").github();

	//undo comment below when ready for sign up.
	$(".barbut").hide();

	//Scroll to pages 
	//for var i = 1, 6 is the number of pages with content, i++
	for ( var i=1; i<=6; i++ ) {
		scto( "#sp"+i, "#p"+i );
	}

	//Z-Index for menu to be above jquery rendered pictures
	$("#menu").css("z-index", 4000);
	$("#signup").css("z-index", 4000);
	$("#contactme").css("z-index", 4000);

	//Submit buttons return false
	submit( "#submit", "#signup");
	submit( "#send", "#contactme");
})

//Where 'id' is the submit for the form and dest is the div that spans the form
function submit( id, dest ) {
	$(id).click( function() {
		console.log( $('form').serialize() );

		$(dest).slideToggle();
		return false;
	})
}
//////////////////////////////////////////////////////
//					Menu Bar Top 					//
//////////////////////////////////////////////////////
//Click function for signup and contact
function signCon() {
	$("#sps").click( function() {
		$("#signup").slideToggle();
	})
	$("#spc").click( function() {
		$("#contactme").slideToggle();
	})
}
//Menu bar bottom border
function view () {
	$('.window').on('inview', function(event, isInView) {
		if (isInView) {
			//console.log("<"+$(this).attr("id")+">");
			$("#"+checkmenu( $(this).attr("id"))).css("border-bottom", "2px solid white");
			//console.log( "CheckMenu(x): "+checkmenu( $(this).attr("id")  ));

		} else {
			//console.log($(this).attr("id")+" out");
			$("#"+checkmenu( $(this).attr("id"))).css("border-bottom", "0px none");

		}
	} )
}

//Toggles slide up/slide down
function slideToggle() {
	if ( $(this).css("display") == "none" ) {
		$(this).stop(false, false).slideDown();
	} else {
		$(this).stop(false, false).slideUp();
	}
}
//returns page IDs as hard-coded for menu
function checkmenu ( id ) {
	for ( var i = 1; i <= 6; i++ ) {
		if ( id=="p"+i ) {
			return "sp"+i;
		}
	}
}
//on button click, scroll to correct destination
function scrollTo( dest ) {
    $('html, body').animate({
    	scrollTop: $( dest ).offset().top
    },750);
}

//for scroll to
function scto ( sp, pn ) {
	$(sp).click( function() {
		scrollTo( pn );
	})
}

//////////////////////////////////////////////////////
//					Page/Pages  					//
//////////////////////////////////////////////////////

//Initialized Windows, page global
function windows() {
    $('.window').windows({
        snapping: true,
        snapSpeed: 500,
        snapInterval: 1100,
        onScroll: function(scrollPos){
            // scrollPos:Number
        },
        onSnapComplete: function($el){
            // after window ($el) snaps into place
        },
        onWindowEnter: function($el){
            // when new window ($el) enters viewport
        }
    })

    //console.log('windows initiated');
}

//For weather on Home page
function weat() {
  $.simpleWeather({
    woeid: '', //56244897 San Jose City Hall
    location: 'San Jose, CA',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
      
      for(var i=0;i<weather.forecast.length;i++) {
        html += '<p class="fore">'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
      }
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
};

//Initialized FlexSlider Page 'Photos'
function flex() {
	$(".flexslider").flexslider();
	//console.log('flexslider initiated');
}

//Initiates countdown clock Page 'Weekend'
function ctd () {

	var note = $('#note'),
	ts = new Date.today().next().saturday();
	console.log( "Countdown time set for: "+new Date.today().next().saturday() );
	
	// if((new Date()) > ts){
	// 	// The new year is here! Count towards something else.
	// 	// Notice the *1000 at the end - time must be in milliseconds
	// 	ts = (new Date()).getTime() + 10*24*60*60*1000;
	// 	newYear = false;
	// }

	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){

			var message = "";

			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";

			message += "left until the coming Saturday!";

			note.html(message);
		}
	});
}