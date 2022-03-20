// default params
var videoWidth = 853; // needed a default value -- this is overwritten almost immediately
var videoRatio = 16/9; // either 4/3 or 16/9 -- tweak as needed
var defaultDiv = 'wrapper';

jQuery.fn.tubular = function(videoId,wrapperId) {
	wrapperId = (typeof(wrapperId) == undefined) ? 'wrapper' : wrapperId;
	
	//t = setTimeout("resizePlayer",1000); 
	setTimeout(function(){ resizePlayer(); },1000); 

	jQuery('html,body').css('height','100%');
	jQuery('body').prepend('<div id="yt-container" style="overflow: hidden; position: fixed; z-index: 1;"><div id="ytapiplayer">You need Flash player 8+ and JavaScript enabled to view this video.</div></div><div id="video-cover" style="position: fixed; width: 100%; height: 100%; z-index: 2;"></div>');
	jQuery('#' + wrapperId).css({position: 'relative', 'z-index': 99});
	
	// initiailize vars
	var ytplayer = 0;
	var pageWidth = 0;
	var pageHeight = 0;
	var videoHeight = videoWidth / videoRatio;
	var duration;

	// iframe embedded yt player
	var iframe = '<iframe id="myytplayer" width="' + videoWidth + '" height="' + videoHeight + '" src="http://www.youtube.com/embed/' + videoId + '?autoplay=1&vq=hd720&controls=0&modestbranding=1&showinfo=0&version=3&wmode=transparent&loop=1&enablejsapi=1&&playerapiid=ytplayer&playlist=' + videoId + '" frameborder="0" allowfullscreen></iframe>';
	
	jQuery('#ytapiplayer').html(iframe);
	
	jQuery(window).resize(function() {
		resizePlayer();
	});
	
	return this;
}

function resizePlayer() {
	var newWidth = jQuery(window).width(); // original page width
	var newHeight = jQuery(window).height(); // original page height
	jQuery('#yt-container, #video-cover').width(newWidth).height(newHeight);
	if (newHeight > newWidth / videoRatio) { // if window ratio becomes taller than video
		newWidth = newHeight * videoRatio; // overflow video to sides instead of bottom
	}
	jQuery('#myytplayer').width(newWidth).height(newWidth/videoRatio);
}