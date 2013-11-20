$(document).ready(function() {
	$('#inst').click(function() 
	{
		$('#mInst').toggle(function() 
		{
			var home = '<div class="drop">';	
			home += '<p>One player</p>';		
			home += '<p>W = Rotate</p>';
	        home += '<p>A = Moves brick to the left</p>';
	        home += '<p>D = Moves brick to the right</p>';
	        home += '<p>S = Speeds gravity</p>';
	        home += '<p> </p>';
	        home += '<p>Two player</p>';
	        home += '<p> Player one</p>';
	        home += '<p>W = Rotate</p>';
	        home += '<p>A = Moves brick to the left</p>';
	        home += '<p>D = Moves brick to the right</p>';
	        home += '<p>S = Speeds gravity (etc)</p>';
	        home += '<p> Player two</p>';
	        home += '<p>I = Rotate</p>';
	        home += '<p>J = Moves brick to the left</p>';
	        home += '<p>L = Moves brick to the right</p>';
	        home += '<p>K = Speeds gravity (etc)</p>';
	        home += '<p> </p>';
	        home += '<p>P = Pause</p>';	        
			home += '</div>';
											
			$('#moreText').html(home);
	});
	});
});