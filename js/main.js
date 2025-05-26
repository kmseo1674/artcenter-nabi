// $(function(){
	
// 	const mainSwiper=new Swiper(".mainSwiper", {
// 		loop: true,
// 		autoplay: { 
// 			delay: 5000
// 		},
// 		pagination: {
// 			el: ".mainSwiper .swiper-pagination"
// 		},
// 	});
	
// 	let isMobile;
// 	$(window).resize(function(){
// 		if(window.innerWidth > 950){
// 			if(isMobile != false){
// 				isMobile=false

// 				if($(".tab").hasClass("active") == true){
// 					$("#gnb > ul > li").each(function(index, item){
// 						let $item=$(item);

// 						$item.removeClass("active");
// 						$item.find(".sub").hide();
// 					});

// 					$("body").removeClass("fixed");
// 					$("#gnb").removeClass("active");
// 					$(".tab").removeClass("active");
// 					$(".dimmed").removeClass("active");
// 				}
// 			}
// 		}
// 		else {
// 			if(isMobile != true){
// 				isMobile=true
// 			}
// 		}
// 	});
// 	$(window).trigger("resize");
	
// 	$("nav > ul > li").hover(
// 		function(){
// 			if(isMobile == false){
// 				$("#header").addClass("active");
// 				$(this).addClass("active");
// 				$(this).find(".sub").slideDown(300);
// 			}
// 		},
// 		function(){
// 			if(isMobile == false){
// 				$("#header #gnb > ul > li").removeClass("active")
// 				$(this).find(".sub").stop().slideUp(300);
// 			}
// 		}
// 	);

// 	$(".tab").click(function (e) {
// 		e.preventDefault();

// 		if(isMobile == true){
// 			if($(".tab").hasClass("active") == false){
// 				$("body").addClass("fixed");
// 				$("#gnb").addClass("active");
// 				$(".tab").addClass("active");
// 				$(".dimmed").addClass("active");
				
// 			}
// 			else{

// 				$("#gnb > ul > li").each(function(index, item){
// 					let $item=$(item);

// 					$item.removeClass("active");
// 					$item.find(".sub").slideUp(300);
// 				});

// 				$("body").removeClass("fixed");
// 				$("#gnb").removeClass("active");
// 				$(".tab").removeClass("active");
// 				$(".dimmed").removeClass("active");
// 			}
		
// 		}
// 	});

// 	$("nav > ul > li").click(function(e){
// 		e.preventDefault();

// 		if(isMobile == true){
// 			if($(this).hasClass("active") == false){
// 				$("nav > ul > li").removeClass("active");
// 				$(".sub").slideUp(300);

// 				$(this).addClass("active");
// 				$(this).find(".sub").slideDown(300);
// 			}
// 			else{
// 				$(this).removeClass("active");
// 				$(this).find(".sub").slideUp(300);
// 			}
// 		}
// 	});
// });

window.addEventListener("load", function(){

const mainSwiper=new Swiper(".mainSwiper",{
		loop: true,
		autoplay: { 
			delay: 5000
		},
		pagination: {
			el: ".mainSwiper .swiper-pagination",
			clickable: true
		}
	});

	let tab=document.querySelector(".tab");
	let gnb=document.querySelector("#gnb");
	let dim=document.querySelector(".dimmed");
	let body=document.querySelector("body");
	let topbtn=document.querySelector(".top");

	let menuList=gnb.querySelectorAll("#gnb > ul > li");
	let start=document.querySelector(".start");
	let sectionList=document.querySelectorAll("section > div");
	let pageList=[start];

	sectionList.forEach(function(item){
		pageList.push(item);
	});

	let isMobile="";

	function deviceCheck(){
		if(window.innerWidth > 950){
			isMobile="desktop";
		}
		else{
			isMobile="mobile";
		}
	}

	deviceCheck();

	window.addEventListener("resize", deviceCheck);

	menuList.forEach(function(item){
		let sub=item.lastElementChild;

		item.addEventListener("mouseenter", function(){
			if(isMobile == "desktop"){
				item.classList.add("active");
				gsap.fromTo(sub,{ display: "block", height: 0 }, { height: "auto", duration: 0.3 });
			}
		});

		item.addEventListener("mouseleave", function(){
			if(isMobile == "desktop"){
				item.classList.remove("active");
				gsap.to(sub, { height:0, duration: 0.3, onComplete: function(){
					sub.removeAttribute("style");
				}});
			}
		});

		item.addEventListener("click", function(e){
			if(isMobile == "mobile"){
				e.preventDefault();
				item.classList.toggle("active");
				if(item.classList.contains("active")){
					gsap.fromTo(sub, {display: "block", height: 0}, {height: "auto", duration: 0.3});	
				}
				else{
					gsap.to(sub, { height:0, duration: 0.3, onComplete: function(){
						sub.removeAttribute("style");
					}});
				}
			}
		});
	});


	// pageList.forEach(function(item, i){
	// 	gsap.timeline({
	// 		scrollTrigger:{
	// 			trigger: item,
	// 			start: "top center",
	// 			end: "bottom center",
	// 			markers: true,
	// 			onEnter: function(){
				
	// 			},
	// 			onEnterBack: function(){
				
	// 			}
	// 		}
	// 	})
	// });

tab.addEventListener("click", function(e){
	e.preventDefault();
	tab.classList.toggle("close");
	gnb.classList.toggle("active");
	dim.classList.toggle("active");
	body.classList.toggle("fixed");
	topbtn.classList.toggle("active");
});

window.addEventListener("resize", function(){
	if(
	window.innerWidth > 950 != tab.classList.contains("active")){
	tab.classList.remove("close");
	gnb.classList.remove("active");
	dim.classList.remove("active");
	body.classList.remove("fixed");
	topbtn.classList.remove("active");
	}
	
});
topbtn.addEventListener("click", function(e){
	e.preventDefault();
	gsap.to(window, { scrollTo:0, duration: 0.5 });
});
// slide text
const slText=gsap.timeline();

slText.from(".sl_text strong", {y : 60, opacity: 0, duration: .5}, "a");
slText.from(".sl_text p", {y : 60, opacity: 0, duration: .5, stagger: 0.2 },"a+=0.2");

// about

const tl=gsap.timeline({
	scrollTrigger: {
		trigger:".about",
		start: "top center",
		end: "bottom center"
	}
});
tl.fromTo(".textbox", { x: -100, opacity:0 }, {x: 0, opacity:1, duration: 0.6}, "a");
tl.fromTo(".right_textbox", { x: 100, opacity:0 }, {x: 0, opacity:1, duration: 0.6}, "a+=0.2");

// project

const pjlist=gsap.timeline({
	scrollTrigger: {
		trigger:".project",
		start: "top center",
		end: "bottom center"
	}
});
pjlist.fromTo(".academy", { x: -100, opacity:0 }, {x: 0, opacity:1, duration: 1},"a");
pjlist.fromTo(".upcoming", { y: -100, opacity:0 }, {y: 0, opacity:1, duration: 1},"a+=0.2");
pjlist.fromTo(".archive", { x: 100, opacity:0 }, {x: 0, opacity:1, duration: 1},"a+=0.4");


//nabi

const nabilist=gsap.timeline({
	scrollTrigger: {
		trigger:".nabi",
		start: "top center",
		end: "bottom center"
	}
});
nabilist.fromTo(".nabi_textbox", { x: -100, opacity:0 }, {x: 0, opacity:1, duration: 1});

// news

let newslist=document.querySelectorAll(".news > .inner > ul > li");

const nsTl=gsap.timeline({
	scrollTrigger: {
		trigger: ".news",
		start: "top center",
		end: "bottom 100%"
	}
});

newslist.forEach(function(item, i){

	if(i%2 == 1){
		nsTl.from(item, { y: 50, opacity: 0, duration: 1 }, "a+=0.2");
		
	}
	else{
		nsTl.from(item, { y: -50, opacity: 0, duration: 1 }, "a");
	}

});

nsTl.from(".studies", { y: 100, opacity: 0, duration: 1 }, "a+=0.4");
});