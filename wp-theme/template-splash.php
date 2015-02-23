<?php
/*
Template Name: Splash
*/

get_header();
?>
<header class="splash-header"> 
	<img class="logo" src="<?php bloginfo('template_directory') ?>/assets/images/logo.png" alt="SELF Interactive" />
	<h1>Interactive Development,<br/> Consulting &amp; Training</h1>
	<aside>
		<ul class="contact-icos">
			<li class="contact">
				<a href="mailto:charlie@selfinteractive.com" data-toggle-footer="1">
					Contact
					<img src="<?php bloginfo('template_directory') ?>/assets/images/speech-point.png" class="speech-point" />
				</a>
			</li>
			<li class="twitter">
				<a href="https://twitter.com/chuckmo" class="icon icon-twitter" title="Twitter @chuckmo"></a>
			</li>
			<li class="github">
				<a href="https://github.com/chuckmo" class="icon icon-git" title="Github"></a>
			</li>
			<li class="linkedin">
				<a href="https://www.linkedin.com/in/rosenbury" class="icon icon-linkedin" title="LinkedIn"></a>
			</li>
		</ul>
	</aside>
</header>
<?php
get_footer();
?>