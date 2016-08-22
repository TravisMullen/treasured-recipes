document.body.onload = onReady();

var delay = 0;

function onReady() {
	

	TweenLite.set(copyLine1, {y:25, opacity:0});
	TweenLite.set(copyLine2, {y:25, opacity:0});
	//TweenLite.set(copyLine3, {y:25, opacity:0});
	//TweenLite.set(copyLine4, {y:25, opacity:0});
	TweenLite.set(copyLine5, {x:0, opacity:0});
	//TweenLite.set(logo, {y:25, opacity:0});
	TweenLite.set(ctaButton, {y:0, opacity:0});
    
    //TweenLite.set([glow1,glow2,glow3,glow4,glow5,streak1,streak2], {x:0, opacity:0});
    
    TweenLite.set(glow1, { opacity:0});
    TweenLite.set(glow2, { opacity:0});
   // TweenLite.set(glow3, { opacity:0});
    TweenLite.set(glow4, { opacity:0});
    TweenLite.set(glow5, { opacity:0});
    TweenLite.set(glow6, { opacity:0});
    TweenLite.set(glow7, { opacity:0});
    TweenLite.set(glow8, { opacity:0});
  //  TweenLite.set(glow9, { opacity:0});
   // TweenLite.set(glow10, { opacity:0});
    //TweenLite.set(glow11, { opacity:0});
    TweenLite.set(glow12, { opacity:0});

   
    

	TweenLite.set(document.getElementsByClassName("sunray"), {autoAlpa:0});

	document.getElementsByClassName("bannerClick")[0].addEventListener("click", exit);
	document.getElementsByClassName("bannerClick")[0].addEventListener("mouseover", rollover);
	document.getElementsByClassName("bannerClick")[0].addEventListener("mouseout", rollout);


	preloadImages( startAnimation );
}

function preloadImages( complete ) {
    var images = document.querySelectorAll('img');
    var loaded=0;
    function onload(){
        loaded++;
        if(loaded==images.length) if(complete) complete();
    }
    for(var i=0;i<images.length;i++) {
        images[i].onload = onload.bind(this);
        images[i].src = images[i].getAttribute('data-src');
    }
}

function rollover (){
	TweenLite.to(ctaButton, .2,{scale: 1.1, ease:Quad.easeOut});	
	TweenLite.set(ctaButton, {"backgroundPosition": "0% 100%"});	
};

function rollout (){
	TweenLite.to(ctaButton, .2,{scale: 1, ease:Quad.easeOut});	
	TweenLite.set(ctaButton, {"backgroundPosition": "0% 0%"});	
};

function startAnimation() {
	//console.time("startAnimationTimer");
	document.getElementById("banner").classList.remove("hide");

	//glowBuild
	glowBuildTL = new TimelineMax({delay: 0});
    
   //Glow1
    glowBuildTL.to(glow1, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=.5')
    glowBuildTL.to(glow1, .5, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=1.2')
    glowBuildTL.to(glow1, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=1.75')
    glowBuildTL.to(glow1, .5, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=2.3')
    glowBuildTL.to(glow1, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=2.9')
    glowBuildTL.to(glow1, .5, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=3.3')
    glowBuildTL.to(glow1, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=3.75')
    glowBuildTL.to(glow1, .5, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=4.3')
    glowBuildTL.to(glow1, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=4.75')
    
    glowBuildTL.to(glow1, .5, { opacity:.1, ease:Power0.easeNone}, 'glowBuildTL +=7.5')
    
    //Glow2
    glowBuildTL.to(glow2, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=.25')
    glowBuildTL.to(glow2, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=.75')
    glowBuildTL.to(glow2, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=1')
    glowBuildTL.to(glow2, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=1.25')
    glowBuildTL.to(glow2, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=1.75')
    glowBuildTL.to(glow2, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=2')
    glowBuildTL.to(glow2, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=2.75')
    glowBuildTL.to(glow2, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=3')

    glowBuildTL.to(glow2, .5, { opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=7.5')
    
    //Glow3
   /* glowBuildTL.to(glow3, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=.25')
    glowBuildTL.to(glow3, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=.75')
    glowBuildTL.to(glow3, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=1')
    glowBuildTL.to(glow3, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=1.25')
    glowBuildTL.to(glow3, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=1.75')
    glowBuildTL.to(glow3, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=2')
    glowBuildTL.to(glow3, .25, {autoAlpha:0, opacity:0, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=2.75')
    glowBuildTL.to(glow3, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone, delay:.75}, 'glowBuildTL +=3')

    glowBuildTL.to(glow3, .5, { opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=7.5')
    */
     //Glow4
    glowBuildTL.to(glow4, .75, {autoAlpha:1, opacity:1, ease:Power0.easeNone }, 'glowBuildTL +=.5')
   
    glowBuildTL.to(glow4, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=1')
    glowBuildTL.to(glow4, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=1.5')
    glowBuildTL.to(glow4, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=2')
    glowBuildTL.to(glow4, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=2.5')
    glowBuildTL.to(glow4, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=3')
    glowBuildTL.to(glow4, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=3.5')
    glowBuildTL.to(glow4, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone,}, 'glowBuildTL +=4')
    
    glowBuildTL.to(glow4, .5, { opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=7.5')
    

    //Glow5
    glowBuildTL.to(glow5, .75, {autoAlpha:1, opacity:1, ease:Power0.easeNone,delay:.75 }, 'glowBuildTL +=.75')
   
    glowBuildTL.to(glow5, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=1')
    glowBuildTL.to(glow5, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=1.5')
    glowBuildTL.to(glow5, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=2')
    glowBuildTL.to(glow5, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=2.25')
    glowBuildTL.to(glow5, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=3')
    glowBuildTL.to(glow5, .75, {autoAlpha:0, opacity:0, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=3.75')
    glowBuildTL.to(glow5, .25, {autoAlpha:1, opacity:1, ease:Power0.easeNone,delay:.75}, 'glowBuildTL +=4.2')
    
    glowBuildTL.to(glow5, .5, { opacity:0, ease:Power0.easeNone}, 'glowBuildTL +=7.5')
    
    

    glowBuildTL.to(glow6, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=1.5')
    glowBuildTL.to(glow7, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=1.8')
    glowBuildTL.to(glow8, .5, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=4.5')
  
  
    glowBuildTL.to(glow12, 1, {autoAlpha:1, opacity:1, ease:Power0.easeNone}, 'glowBuildTL +=6.5')
   

	//clouds movement
	cloudsTL = new TimelineMax({delay: 0});


	//copy timeline
	copyTL = new TimelineMax({delay: 0});

	copyTL.to(copyLine1, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=0");
	copyTL.to(copyLine2, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=1.75");
	//copyTL.to(copyLine3, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=3");
//	copyTL.to(copyLine4, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=4.5");
	copyTL.to(copyLine5, 1.5, {x:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=3.5");
	//copyTL.to(copyLine5, 0.5, {y:0, opacity:0, ease:Linear.easeNone}, "+=2.8");
	//copyTL.to(logo, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=6.5");
	copyTL.to(ctaButton, 1, {y:0, opacity:1, ease:Expo.easeOut}, "glowBuildTL +=4.5");


	//main timeline (combines all timelines)
	masterTL = new TimelineMax({delay:1});

	masterTL.timeScale(1); //change if you want to test something quickly
	masterTL.add(copyTL, 0)
	//masterTL.add(introZoomTL, 0)
	masterTL.add(TweenMax.delayedCall(15, function() {
		TweenMax.killAll(); //kill all tweens after 15 sec
	}), 0) 
	masterTL.add("endframe");
}

function exit() {
	console.log("Exit")
	masterTL.gotoAndPlay("endframe");
	window.open(window.clickTag);
}
