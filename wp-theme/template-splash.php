<?php
/*
Template Name: Splash
*/

get_header();

$videos = array(
'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11679595_446121665565112_826993811_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xfa1/t50.2886-16/11673071_379475492250158_1975011783_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11675368_793594220755444_500955429_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11373084_895652970490869_205551364_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11336740_791601014281083_1139788957_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11250849_1447679142211608_1839698999_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xfa1/t50.2886-16/11214422_1610200179220432_2062958988_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xtf1/t50.2886-16/11099934_1618123458402108_882747486_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xpa1/t50.2886-16/11080166_1584122515200011_598251143_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xpf1/t50.2886-16/11019589_1555832421368292_1326463975_n.mp4',
'https://scontent.cdninstagram.com/hphotos-xpf1/t50.2886-16/11014526_1626068410948112_1659381473_n.mp4'
); 

?>
<video autoplay poster="" id="bgvid" loop muted>
  <!-- WCAG general accessibility recommendation is that media such as background video play through only once. Loop turned on for the purposes of illustration; if removed, the end of the video will fade in the same way created by pressing the "Pause" button  -->
<!-- <source src="//demosthenes.info/assets/videos/polina.webm" type="video/webm"> -->
<source src="<?php echo $videos[array_rand($videos)] ?>" type="video/mp4">
</video>
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