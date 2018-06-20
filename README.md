# optionbox
# A Materialize plugin with more flexibility than a dropdown menu and not as intrusive as a modal dialog

# Load dependencies
<link rel="stylesheet" href="optionbox.css">
<script src="optionbox.dev.js"></script>


# Initialize the plugin
$( document ).ready(function() {
	$(".optionbox").OptionBox({
		width: 'auto'
	});
});

# Create an option box and identify it with the class "optionbox"
<div id="dialog-email" class="optionbox">
	<div class="optionbox-padding">
		<ul>
			<li><a href="#">Send Message</a></li>
		</ul>
		<p>You can search for things here:</p>
		<hr />
		<p>You can search for things here:</p>
		<hr />
		<p>You can search for things here:</p>
	</div>
</div>

# Create a trigger that will control the option box and identify it with the class "optionbox-trigger"
# Give the trigger element a data-box attribute that identifies the correct dialog to call
<a class="optionbox-trigger" data-box="dialog-email"><i class="material-icons">email</i></a>
