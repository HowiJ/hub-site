$( document ).ready( function() {
	//Number of Pages available to scroll to (with content)
	var pages = 5;

	$("#signup").hide();
	$("#contactme").hide();
	$("#contentPages").hide();
	$("#settingsBox").hide();

	// $("#loginPage").hide();
	$(".pageForm").hide();

	//Initializes Windows jquery addon
	windows();
	//Initializes FlexSlider for the Images
	flex();
	//Initializes Countdown Clock should it be used **Unused**
	ctd();
	//Initializes Weather jquery addon
	weat();
	//Github jQuery initialize
	$("[data-repo]").github();

	//Signup and Contact slide Toggles
	signCon();
	//For Menu bar to tell which page you're on **Unused**
	view( pages );
	$('.flexslider').flexslider();
	// $("#contactme").draggable();


	//undo comment below when ready for sign up.
	$(".barbut").hide();

	//Scroll to pages 
	//for var i = 1, 6 is the number of pages with content, i++
	for ( var i=1; i<=pages; i++ ) {
		scto( "#sp"+i, "#p"+i );
	}

	$("#refresh").click( function() {weat()});

	//on hover, show menu, on !hover, hide
	$( ".menuhov" ).hover( function() {
		$("#menu").animate({
			top: -5
		}, 100);
	}, function() {
		$("#menu").animate({
			top: -45
		}, 100);
	})


	//Submit buttons return false
	submit( "#submit", "#signup");
	submit( "#send", "#contactme");

	//Contact me X button
	$("#closeSettings").click( function() {
		$("#settingsBox").slideToggle();
		$(".settings").slideUp()
	})
	$("#close").click( function() {
		$("#contactme").slideToggle();
	})


	//////////////////////////////////////////////////////
	//					Login Page  					//
	//////////////////////////////////////////////////////
	var user = $("#user").val();
	var pass = $("#pass").val();

	$("#loginButton").click( function() {
		$("#loginPage").fadeOut( function(){ $("#contentPages").fadeIn(); } );

		user = $("#user").val();
		pass = $("#pass").val();		

		console.log("Username: "+user+" Password: "+pass);

		return false;
	});

	//////////////////////////////////////////////////////
	//					Settings Box  					//
	//////////////////////////////////////////////////////

	$("#logout").click( function(){ 
		$("#settingsBox").slideUp();
		$(".settings").slideUp();

		$("#contentPages").fadeOut();
		$("#loginPage").fadeIn();

		return false;
	});

	//////////////////////////////////////////////////////
	//					Page Cards  					//
	//////////////////////////////////////////////////////
	cHide("#cCHide", ".card", "cards");

	$(".cards").mCustomScrollbar();
	var cardName = "";
	var cardDesc = "";
	var cardPhone = "";
	var cardEmail = "";
	var card = ""

	var numberOfCards = 0;

	$("#cards").sortable();

	$("#cardTitle").text("Cards ("+numberOfCards+")");

	//Flip buttons
	$("#cCDFlip").click( function () {
		$(".desc").siblings().show();
		$(".desc").hide();
	})
	$("#cCDDFlip").click( function () {
		$(".desc").siblings().hide();
		$(".desc").show();
	})

	if ( $("#cards").html()==""  ) {
		$("#cardCreator").slideToggle();
	} 

	$(document).on("click", ".card", function() {
		$(this).children().toggle();
	})

	$("#cCBut").click( function() {
		$("#cardCreator").slideToggle();
	})
	//return submit button
	$("#iNewCard").click( function() {
		getCard();
		validateCard();
		createCard();
		$("#cardCreator").slideToggle();

		numberOfCards++;
		$("#cardTitle").text("Cards ("+numberOfCards+")");

		return false;
	})
	function getCard() {
		cardName = $("#iCardName").val();
		cardDesc = $("#iCardDesc").val();
		cardPhone = $("#iCardPhone").val();
		cardEmail = $("#iCardEmail").val();
	}
	function createCard() {
		$("#cards").append("<li class='card' class='ui-state-default'><h4>"+cardName+"</h4><div class='desc'><p class='cardName'>"+cardName+"</p><p class='cardDesc'>"+cardDesc+"</p><p class='cardPhone'>"+cardPhone+"</p><p class='cardEmail'>"+cardEmail+"</p></div></li>");
	}

	function validateCard () {
		if ( cardName == "") {
			cardName="&nbsp;";
		}
		if ( cardDesc == "") {
			cardDesc="&nbsp;";
		}
		if ( cardPhone == "") {
			cardPhone="&nbsp;";
		}
		if ( cardEmail == "") {
			cardEmail="&nbsp;";			
		}
	}

	//////////////////////////////////////////////////////
	//					Page Trips  					//
	//////////////////////////////////////////////////////
	var tripName = "";
	var tripFrom = "";
	var tripTo = '';
	var tripLocation = '';
	var tripComments = '';
	var numberOfTrips = 0;

	$("#trips").sortable();
	$("#tripTitle").text("Trips ("+numberOfTrips+")");

	cHide("#cTHide", ".trip", "trips");
	$("#tripFrom").datepicker();
	$("#tripTo").datepicker();

	$("#tripSubmit").click( function() {
		getTrip();
		validateTrip();
		createTrip();
		$("#tripMenu").slideToggle();
		numberOfTrips++;
		$("#tripTitle").text("Trips ("+numberOfTrips+")");


		return false;
	})

	//New trip button
	$("#cTBut").click( function() {
		$("#tripMenu").slideToggle();
	})

	if ( $("#trips").html()==""  ) {
		$("#tripMenu").slideToggle();
	} 

	//Remove Button for pages, button as in button to click, content as in what to hide
	function cHide( button, content, type ) {
		$(button).click( function() {
			$('*').css("cursor", "crosshair");
			event.stopPropagation();
			$(document).on("click", content, function() {
				if (  $("*").css("cursor")=="crosshair"  ) {
					$(this).remove();
					$("*").css("cursor", "");
					if ( type == "cards") {
						numberOfCards--;
						$("#cardTitle").text("Cards ("+numberOfCards+")");
					}
					if ( type == "trips") {
						numberOfTrips--;
						$("#tripTitle").text("Trips ("+numberOfTrips+")");
					}
				}
			})
			$(document).click( function() {
				$("*").css("cursor", "");
			})
		});
	}

	function getTrip() {
		tripName = $("#tripName").val();
		tripFrom = $("#tripFrom").val();
		tripTo = $("#tripTo").val();
		tripLocation = $("#tripLocation").val();
		tripComments = $("#tripComments").val();
	}

	function createTrip() {
		$("#trips").append("<ul class='trip' class='ui-state-default'><h3>"+tripName+"</h3><p class='tripDest'>"+tripLocation+"</p><b>From: </b><p class='tripDate'>"+tripFrom+"</p><b>To: </b><p class='tripDate'>"+tripTo+"</p><p class='tripComments'>"+tripComments+"</p></ul>");
	}

	function validateTrip () {
		if ($("#tripName").val() == "") {
			tripName = "&nbsp;";
		}
		if ($("#tripFrom").val() == "") {
			tripFrom = "&nbsp;";
		}
		if ($("#tripTo").val() == "") {
			tripTo = "&nbsp;";
		}
		if ($("#tripLocation").val() == "") {
			tripLocation = "&nbsp;";
		}
	}


	//////////////////////////////////////////////////////
	//					Page Github  					//
	//////////////////////////////////////////////////////
	var url = "";
	var numberOfGits

	cHide( "#cGHide", ".reps", "gits" );

	$("#cGBut").click( function() {
		$("#gitForm").slideToggle();
	})

	$("#gitUrl").keypress( function(e) {
		if ( e.which == 13 ) {
			url = $("#gitUrl").val();
			createGit();
			$("[data-repo]").github();
			$("#gitForm").slideToggle();
		}
	})

	function createGit () {
		$("#github").append("<li class='reps' id='vDate' data-repo="+url+"></li>");
	}


	//Z INDEX/////////////////////////////////////////////
	//Z-Index for menu to be above jquery rendered pictures
	$("#menu").css("z-index", 9001);
	$("#signup").css("z-index", 4000);
	$("#contactme").css("z-index", 4000);
})

//////////////////////////////////////////////////////
//			Submit and checkpages  					//
//////////////////////////////////////////////////////
//returns page IDs as hard-coded for menu
//CHANGE THIS FOR PAGES
function checkmenu ( id, pages ) {
	for ( var i = 1; i <= pages; i++ ) {
		if ( id=="p"+i ) {
			return "sp"+i;
		}
	}
}

//Where 'id' is the submit for the form and dest is the div that spans the form
function submit( id, dest ) {
	$(id).click( function() {
		console.log( $(dest).serialize() );

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
		$("#settingsBox").slideToggle();
	})
	$("#contactMeButton").click( function() {
		$("#contactme").slideToggle();
	})
}
//Menu bar bottom border
function view (pages) {
	$('.window').on('inview', function(event, isInView) {
		if (isInView) {
			//console.log("<"+$(this).attr("id")+">");
			$("#"+checkmenu( $(this).attr("id")), pages ).css("border-bottom", "2px solid white");
			//console.log( "CheckMenu(x): "+checkmenu( $(this).attr("id")  ));

		} else {
			//console.log($(this).attr("id")+" out");
			$("#"+checkmenu( $(this).attr("id")), pages ).css("border-bottom", "0px none");

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