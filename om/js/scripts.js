history.scrollRestoration="manual",document.addEventListener("DOMContentLoaded",(function(){var e="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;(e=!(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)&&!/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))),document.addEventListener("lazybeforeunveil",(function(t){var o;e?(o=t.target.getAttribute("data-bg-mob"))&&(t.target.style.backgroundImage="url("+o+")"):(o=t.target.getAttribute("data-bg"))&&(t.target.style.backgroundImage="url("+o+")")})),document.querySelector(".homepage"))&&(new Glide(".reviews__glide",{type:"carousel",rewind:!1,startAt:0,perView:1,focusAt:"center",animationDuration:800,dragThreshold:10,gap:0}).mount(),new Glide(".blog__glide",{type:"slider",bound:!0,rewind:!1,dragThreshold:10,startAt:0,perView:2.5,gap:40,breakpoints:{768:{perView:1}}}).mount());window.addEventListener("load",t=>{if(document.querySelectorAll(".no-trans").forEach(e=>{e.classList.remove("no-trans")}),!e&&document.querySelector(".scroller")){let e,t=-100,o=-100,n=!0,r=450,a=0,i=0,s=!1,c=!0,l=[],d=[],u=0,m=[];const p=document.querySelector(".cursor");document.querySelectorAll(".scroller").forEach((t,o)=>{l.push(t.querySelector(".scroller__list")),d.push(t.querySelectorAll(".scroller__left, .scroller__right")),e=getComputedStyle(l[o]).getPropertyValue("transform").match(/(-?[0-9\.]+)/g)[4],e=e/l[o].scrollWidth*1e3,m.push(e)});const g=window.innerWidth/3,v=2*window.innerWidth/3;(()=>{document.addEventListener("mousemove",e=>{t=e.clientX,o=e.clientY}),d.forEach((function(e,t){e.forEach((function(e){e.addEventListener("mouseleave",e=>{n=!0,function(){function e(o){a=m[u],i=c?a+8:a-8,e=o,t(o)}function t(o){if(s)return;o-e>=r&&(s=!0);let n=(o-e)/r,c=m[u]=a+(i-a)*((d=n)*(2-d));var d;l[u].style.transform="translate3d("+c/10+"%,0,0)",requestAnimationFrame(t)}requestAnimationFrame(e)}()}),e.addEventListener("mouseenter",e=>{u=t,n=s=!1})}))}));const e=r=>{n?(p.style.display="none",d.forEach(e=>e.forEach(e=>e.style.cursor="initial"))):(p.style.display="block",d.forEach(e=>e.forEach(e=>e.style.cursor="none")),p.style.transform=`translate3d(${t-10}px, ${o-30}px,0)`,t<g?(c=!1,m[u]--,p.classList.add("left"),l[u].style.transform="translate3d("+m[u]/10+"%,0,0)",Math.round(m[u])/10==-50&&(m[u]=0)):t>v&&(c=!0,Math.round(m[u])/10==0&&(m[u]=-500),m[u]++,p.classList.remove("left"),l[u].style.transform="translate3d("+m[u]/10+"%,0,0)",Math.round(m[u])/10==0&&(m[u]=-500))),requestAnimationFrame(e)};requestAnimationFrame(e)})()}});let t,o,n=window.requestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},r=document.querySelectorAll(".lines-block"),a=document.querySelectorAll(".parallax"),i=document.querySelectorAll(".faded"),s=document.querySelector(".cases"),c=document.querySelector(".cases-parallax"),l=[];line=[],r.forEach((function(e){line.push(e.querySelector(".lines"))}));const d=document.querySelectorAll(".header"),u=document.querySelector(".head-homepage")||!1,m=document.querySelector(".reviews")||!1;function p(e){var t=e.getBoundingClientRect();return t.top<=0&&t.bottom>=0||t.bottom>=(window.innerHeight||document.documentElement.clientHeight)&&t.top<=(window.innerHeight||document.documentElement.clientHeight)||t.top>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)}function g(e){return e.getBoundingClientRect().top-window.innerHeight<=-200}!function e(){var v;t=window.pageYOffset,r.forEach((function(e,n){o=t-e.offsetTop,p(e)?line[n].style.transform="rotate3d(1,0,0,"+o/17+"deg)":line[n].style.transform="rotate3d(0,0,0,0deg)"})),i.forEach((function(e,t){g(e)&&e.classList.add("animated")})),a.forEach((function(e,o){p(c)&&(c.classList.contains("cases-page__items")?l[o]=(t-s.offsetTop)*(o+1)/30:l[o]=(t-s.offsetTop)*(o+1)/15,e.style.transform="translate3d(0,"+l[o]+"px,0)")})),t>60?d.forEach(e=>e.classList.add("sticky")):d.forEach(e=>e.classList.remove("sticky")),u&&(p(u)||(v=m.getBoundingClientRect()).top<=50&&v.bottom>=50?d[0].classList.add("homepage"):d[0].classList.remove("homepage")),n(e)}();const v=document.querySelector(".hamburger"),f=document.querySelector(".overlay"),h=document.querySelector(".overlay__scroll");if(v.addEventListener("click",e=>{f.classList.contains("active")?(f.classList.remove("active"),d[0].classList.remove("overlayed"),document.body.style.overflowY="scroll",h.scrollTop=0):(d[0].classList.add("overlayed"),f.classList.add("active"),document.body.style.overflowY="hidden")}),document.querySelectorAll(".services__title").forEach(e=>{e.addEventListener("click",t=>{let o=e.nextElementSibling;e.classList.contains("active")?(e.classList.remove("active"),o.style.height="0px"):(e.classList.add("active"),o.style.height=o.scrollHeight+85+"px")})}),document.querySelector(".cases-page__results")){let e=document.querySelector(".cases-page__results");window.addEventListener("scroll",(function t(){let o=[],n=[];g(e)&&(window.removeEventListener("scroll",t),document.querySelectorAll(".odometer").forEach((function(e,t){o.push(+e.dataset.start),n.push(+e.dataset.end),e.innerHTML=o[t];let r=()=>{setTimeout((function(){e.innerHTML=o[t],o[t]<n[t]&&(o[t]++,r())}),60)};r()})))}))}if(document.querySelector(".contact")){document.querySelectorAll(".contact input, .contact textarea").forEach((function(e){e.addEventListener("input",t=>{e.classList.remove("error"),e.value.length?e.classList.add("active"):e.classList.remove("active")})}));let t=document.querySelector(".contact select");if(t.addEventListener("input",e=>{0!==t.selectedIndex?t.classList.add("active"):t.classList.remove("active")}),e){document.querySelector(".contact").classList.add("simple")}const o=document.querySelectorAll(".contact__form"),n=document.querySelector(".contact__err");o.forEach((function(e){e.addEventListener("submit",t=>{t.preventDefault(),r(e)})}));let r=e=>{let t=e.querySelectorAll(".input-text"),o=e.querySelector(".input-email");window.pageYOffset=document.querySelector(".contact").offsetTop,o.value.length?/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(o.value)||(o.classList.add("error"),n.textContent="Please enter a valid e-mail address.",n.classList.add("active")):(o.classList.add("error"),n.innerHTML="Please fill in our entire form. Every little bit helps!",n.classList.add("active")),t.forEach((function(e){e.validity.valid||(e.classList.add("error"),n.innerHTML="Please fill in our entire form. Every little bit helps!",n.classList.add("active"))}))}}}));