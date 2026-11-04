// One small, dependency-free script that powers scroll reveals, counters, parallax and animation pausing.
// It runs inline in <head>, so it works even before React hydrates, and it does nothing at all when the visitor
// has "reduce motion" turned on (everything simply stays visible and still).
export const motionScript = `(function(){
var d=document,root=d.documentElement;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
root.classList.add("motion");
var ready=false;
setTimeout(function(){if(!ready)root.classList.remove("motion")},3000);

function init(){
  ready=true;
  function show(el,ms,dur){
    el.style.setProperty("--d",ms+"ms");
    el.style.setProperty("--dur",dur+"ms");
    el.setAttribute("data-in","");
    setTimeout(function(){el.setAttribute("data-done","")},dur+ms+450);
  }
  var revealIO=new IntersectionObserver(function(entries){
    var i=0;
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target;revealIO.unobserve(el);
      var delay=el.getAttribute("data-delay");
      show(el,delay!==null?+delay:Math.min(i,5)*90,850);i++;
    });
  },{threshold:0.12,rootMargin:"0px 0px -6% 0px"});

  var countIO=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      countIO.unobserve(e.target);count(e.target);
    });
  },{threshold:0.6});

  function count(el){
    var to=+el.getAttribute("data-count"),node=el.firstChild,t0=null,dur=1500;
    if(!node||isNaN(to))return;
    node.nodeValue="0";
    function step(t){
      if(t0===null)t0=t;
      var p=Math.min((t-t0)/dur,1);
      node.nodeValue=String(Math.round(to*(1-Math.pow(1-p,3))));
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var animIO=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting)e.target.removeAttribute("data-off");else e.target.setAttribute("data-off","");
    });
  },{rootMargin:"120px"});

  var par=[];
  var parIO=new IntersectionObserver(function(entries){
    entries.forEach(function(e){e.target.__vis=e.isIntersecting});
    update();
  });

  var first=true;
  function scan(){
    var vh=window.innerHeight;
    [].forEach.call(d.querySelectorAll("[data-reveal],[data-stagger]>*"),function(el){
      if(el.__rv)return;el.__rv=1;
      if(el.hasAttribute("data-in"))return;
      // On first load, anything already on screen stays visible from the very first paint (fast, and good for
      // Core Web Vitals). Only content further down is hidden, to be revealed as it scrolls into view.
      if(first&&el.getBoundingClientRect().top<vh*0.98){el.setAttribute("data-in","");el.setAttribute("data-done","");return}
      el.setAttribute("data-hide","");
      revealIO.observe(el);
    });
    first=false;
    [].forEach.call(d.querySelectorAll("[data-count]"),function(el){if(el.__ct)return;el.__ct=1;countIO.observe(el)});
    [].forEach.call(d.querySelectorAll("[data-anim]"),function(el){if(el.__an)return;el.__an=1;animIO.observe(el)});
    [].forEach.call(d.querySelectorAll("[data-parallax]"),function(el){if(el.__pr)return;el.__pr=1;par.push(el);parIO.observe(el)});
  }

  var ticking=false,scrolled=false;
  function update(){
    ticking=false;
    var y=window.scrollY>8;
    if(y!==scrolled){scrolled=y;if(y)root.setAttribute("data-scrolled","");else root.removeAttribute("data-scrolled")}
    var vh=window.innerHeight,k=vh<700?0.6:1;
    par.forEach(function(el){
      if(!el.__vis||!el.parentElement)return;
      var r=el.parentElement.getBoundingClientRect();
      var s=(parseFloat(el.getAttribute("data-parallax"))||0.1)*k;
      el.style.setProperty("--py",((r.top+r.height/2-vh/2)*-s).toFixed(1)+"px");
    });
  }
  window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});

  new MutationObserver(function(){scan()}).observe(d.body,{childList:true,subtree:true});

  scan();update();
}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",init);else init();
})();`;
