const lenis=new Lenis({duration:0.8,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smooth:true});
function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
// Entrance animations (5 elements)
gsap.fromTo(".header_logo__DsksJ",{autoAlpha:0},{autoAlpha:1,y:0,duration:0.8,delay:0.26,ease:"power4.inOut"});
gsap.fromTo(".header_baseline__RbXAJ",{autoAlpha:0},{autoAlpha:1,y:0,duration:0.8,delay:0.26,ease:"power4.inOut"});
gsap.fromTo(".header_contact__RdxmC",{autoAlpha:0},{autoAlpha:1,y:0,duration:0.8,delay:0.26,ease:"power4.inOut"});
gsap.fromTo(".projects_projects__v9AYS",{autoAlpha:0},{autoAlpha:1,y:0,duration:0.8,delay:0.26,ease:"power4.inOut"});
gsap.fromTo(".projects_placeholderLogo__Bp9Cb",{autoAlpha:0},{autoAlpha:1,y:0,duration:0.8,delay:0.26,ease:"power4.inOut"});
// Scale reveal (1 elements)
(()=>{const el=document.querySelector(".projects_placeholderLogo__Bp9Cb");if(!el)return;
gsap.set(el,{opacity:1,scaleX:0,transformOrigin:"left center"});
gsap.to(el,{scaleX:1,duration:1.2,delay:0.2,ease:"expo.out"});})();
document.querySelectorAll('[class*="cover"],[class*="Cover"],[class*="overlay"],[class*="Overlay"]').forEach(el=>{if(el.style)el.style.display="none"});
// Scroll-driven (1 elements)
document.querySelectorAll(".Row_row__I_fKs").forEach((el,i)=>{
  const h=el.getBoundingClientRect().height||180;const vh=window.innerHeight;
  const mult=(vh/(Math.floor(h)+20))*(1-0.5);
  gsap.set(el,{"--progress":0.5,"--base-height":h+"px"});el.style.setProperty("min-height",h+"px");
  ScrollTrigger.create({trigger:el,start:"bottom-="+(h-(i===0?42:0))+"px bottom",end:"top top",scrub:1,
    onUpdate:s=>{gsap.set(el,{"--progress":0.5+mult*s.progress})}});
});
// Character stagger (1 patterns)
document.querySelectorAll(".InflatingText_container__N6D4c").forEach(c=>{
  const chars=[...c.querySelectorAll(".InflatingText_character__Vc6qq")];if(!chars.length)return;
  chars.forEach(ch=>{ch.style.transform="translateX(-5px) scaleX(0)";ch.style.transformOrigin="left bottom"});
  const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){
    chars.forEach((ch,i)=>{setTimeout(()=>{ch.style.transition="transform 0.6s cubic-bezier(0.16,1,0.3,1)";ch.style.transform="translateX(0) scaleX(1)"},i*20)});
    obs.disconnect();
  }},{threshold:0.1});
  obs.observe(c);
});
// Card stagger (2 grids)
document.querySelectorAll(".Row_prev__XuuKD").forEach(w=>{
  const els=w.querySelectorAll(".Element_element__k08ik");if(els.length<2)return;
  gsap.set(els,{x:-25,opacity:0});
  ScrollTrigger.create({trigger:w,start:"top 80%",once:true,onEnter:()=>{
    els.forEach((el,i)=>{gsap.to(el,{x:0,opacity:1,duration:0.8,delay:i*0.1,ease:"expo.out",clearProps:"transform"})});
  }});
});
document.querySelectorAll(".Row_next__wA2PK").forEach(w=>{
  const els=w.querySelectorAll(".Element_element__k08ik");if(els.length<2)return;
  gsap.set(els,{x:-25,opacity:0});
  ScrollTrigger.create({trigger:w,start:"top 80%",once:true,onEnter:()=>{
    els.forEach((el,i)=>{gsap.to(el,{x:0,opacity:1,duration:0.8,delay:i*0.1,ease:"expo.out",clearProps:"transform"})});
  }});
});
// Visibility fix for JS-dependent elements
document.querySelectorAll('[style*="opacity: 0"],[style*="opacity:0"]').forEach(el=>{
  if(!el.closest('[class*="modal"],[class*="Modal"]'))el.style.opacity="1";
});
document.querySelectorAll('button,a,[role="button"]').forEach(el=>{
  el.style.pointerEvents="auto";el.style.cursor="pointer";
  const img=el.querySelector("img");if(!img)return;
  el.addEventListener("mouseenter",()=>gsap.to(img,{scale:1.03,filter:"brightness(0.9)",duration:0.75,ease:"expo.out"}));
  el.addEventListener("mouseleave",()=>gsap.to(img,{scale:1,filter:"brightness(1)",duration:0.75,ease:"expo.out"}));
});
