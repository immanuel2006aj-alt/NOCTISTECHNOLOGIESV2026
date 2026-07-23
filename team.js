/*==================================================
 NOCTIS TECHNOLOGIES
 team.js
 PART 1
 Premium Foundation
==================================================*/

"use strict";

/*==================================================
 SELECTORS
==================================================*/

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/*==================================================
 SCROLL PROGRESS
==================================================*/

const progressBar = $(".scroll-progress");

function updateProgress(){

    if(!progressBar) return;

    const scroll = window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scroll / height) * 100;

    progressBar.style.width = progress + "%";

}

window.addEventListener(
    "scroll",
    updateProgress,
    { passive:true }
);

updateProgress();


/*==================================================
 STAGGER ANIMATION
==================================================*/

const staggerCards = $$(`

.team-intro-card,
.team-member-card,
.team-workflow-item,
.team-value-card,
.leadership-focus-item,
.backend-focus-item

`);

staggerCards.forEach((card,index)=>{

    card.style.transitionDelay =
        `${index*80}ms`;

});


/*==================================================
 BUTTON RIPPLE
==================================================*/

$$(".btn-primary,.btn-secondary")
.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple =
            document.createElement("span");

        ripple.className="btn-ripple";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX-rect.left)+"px";

        ripple.style.top =
            (e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


/*==================================================
 SMOOTH SCROLL
==================================================*/

document
.querySelectorAll('a[href^="#"]')
.forEach(link=>{

    link.addEventListener("click",e=>{

        const target =
        document.querySelector(
            link.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    });

});


/*==================================================
 PAGE LOADED
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add(
        "page-loaded"
    );

});


/*==================================================
 END PART 1
==================================================*/
/*==================================================
 PART 2
 TEAM CARD 3D INTERACTIONS
==================================================*/


/*==================================================
 3D TILT
==================================================*/

const teamCards = document.querySelectorAll(".team-member-card");

teamCards.forEach(card=>{

    card.addEventListener("mousemove",e=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const rotateY=((x/rect.width)-0.5)*18;

        const rotateX=((y/rect.height)-0.5)*-18;

        card.style.transform=

        `perspective(1200px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        translateY(-10px)

        scale(1.02)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/*==================================================
 MOBILE TOUCH TILT
==================================================*/

teamCards.forEach(card=>{

    card.addEventListener("touchmove",e=>{

        const touch=e.touches[0];

        const rect=card.getBoundingClientRect();

        const x=touch.clientX-rect.left;

        const y=touch.clientY-rect.top;

        const rotateY=((x/rect.width)-0.5)*10;

        const rotateX=((y/rect.height)-0.5)*-10;

        card.style.transform=

        `perspective(1000px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        scale(1.01)`;

    },{passive:true});

    card.addEventListener("touchend",()=>{

        card.style.transform="";

    });

});


/*==================================================
 IMAGE PARALLAX
==================================================*/

teamCards.forEach(card=>{

    const image=card.querySelector("img");

    if(!image) return;

    card.addEventListener("mousemove",e=>{

        const rect=card.getBoundingClientRect();

        const x=(e.clientX-rect.left)/rect.width;

        const y=(e.clientY-rect.top)/rect.height;

        image.style.transform=

        `translate(${(x-.5)*12}px,

        ${(y-.5)*12}px)

        scale(1.08)`;

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform="";

    });

});


/*==================================================
 MAGNETIC EFFECT
==================================================*/

teamCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition=".15s linear";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transition=".35s ease";

    });

});


/*==================================================
 GLASS SHINE
==================================================*/

teamCards.forEach(card=>{

    const shine=document.createElement("span");

    shine.className="card-shine";

    card.appendChild(shine);

    card.addEventListener("mousemove",e=>{

        const rect=card.getBoundingClientRect();

        shine.style.left=

        (e.clientX-rect.left)+"px";

        shine.style.top=

        (e.clientY-rect.top)+"px";

    });

});


/*==================================================
 CARD PRESS
==================================================*/

teamCards.forEach(card=>{

    card.addEventListener("mousedown",()=>{

        card.style.transform+=" scale(.985)";

    });

    card.addEventListener("mouseup",()=>{

        card.style.transform=

        card.style.transform.replace(

        " scale(.985)",""

        );

    });

});


/*==================================================
 END PART 2
==================================================*/
/*==================================================
 PART 3
 PREMIUM MOTION
==================================================*/


/*==================================================
 HERO FLOATING
==================================================*/

const heroCard=document.querySelector(

".team-visual-card"

);

if(heroCard){

let angle=0;

(function animate(){

angle+=0.015;

heroCard.style.transform=

`translateY(${Math.sin(angle)*10}px)`;

requestAnimationFrame(animate);

})();

}


/*==================================================
 COUNT UP
==================================================*/

const counters=document.querySelectorAll(

"[data-count]"

);

const counterObserver=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=

parseInt(el.dataset.count);

const prefix=

el.dataset.prefix||"";

const suffix=

el.dataset.suffix||"";

let current=0;

const speed=

target/90;

(function update(){

current+=speed;

if(current<target){

el.textContent=

prefix+

Math.floor(current)

.toLocaleString()

+suffix;

requestAnimationFrame(update);

}else{

el.textContent=

prefix+

target.toLocaleString()

+suffix;

}

})();

counterObserver.unobserve(el);

});

},{threshold:.45});

counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*==================================================
 FLOATING BADGES
==================================================*/

document.querySelectorAll(

".section-badge"

).forEach((badge,index)=>{

let angle=index*50;

(function float(){

angle+=0.03;

badge.style.transform=

`translateY(${Math.sin(angle)*5}px)`;

requestAnimationFrame(float);

})();

});


/*==================================================
 PARALLAX BLOBS
==================================================*/

window.addEventListener(

"scroll",

()=>{

const y=

window.scrollY*0.08;

document.querySelectorAll(

".team-hero::before"

);

document.documentElement

.style.setProperty(

"--blob-offset",

`${y}px`

);

},

{passive:true}

);


/*==================================================
 MOUSE FOLLOW GLOW
==================================================*/

const hero=document.querySelector(

".team-hero"

);

if(hero){

const glow=document.createElement("div");

glow.className="mouse-glow";

hero.appendChild(glow);

hero.addEventListener("mousemove",e=>{

const rect=

hero.getBoundingClientRect();

glow.style.left=

(e.clientX-rect.left)+"px";

glow.style.top=

(e.clientY-rect.top)+"px";

});

}


/*==================================================
 IMAGE FADE
==================================================*/

document.querySelectorAll("img")

.forEach(img=>{

img.loading="lazy";

img.addEventListener("load",()=>{

img.classList.add("loaded");

});

});


/*==================================================
 HERO TITLE REVEAL
==================================================*/

const heroTitle=document.querySelector(

".team-hero h1"

);

if(heroTitle){

heroTitle.innerHTML=

heroTitle.textContent

.split("")

.map(letter=>{

if(letter===" ")

return "<span>&nbsp;</span>";

return `<span>${letter}</span>`;

})

.join("");

heroTitle.querySelectorAll("span")

.forEach((span,index)=>{

span.style.transitionDelay=

`${index*25}ms`;

requestAnimationFrame(()=>{

span.classList.add("show");

});

});

}


/*==================================================
 END PART 3
==================================================*/
/*==================================================
 PART 4
 FAQ + PREMIUM INTERACTIONS
==================================================*/


/*==================================================
 FAQ ACCORDION
==================================================*/

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question=item.querySelector(".faq-question");
    const answer=item.querySelector(".faq-answer");
    const icon=item.querySelector(".faq-icon");

    if(!question || !answer) return;

    question.addEventListener("click",()=>{

        faqItems.forEach(other=>{

            if(other!==item){

                other.classList.remove("active");

                const otherAnswer=
                other.querySelector(".faq-answer");

                const otherIcon=
                other.querySelector(".faq-icon");

                if(otherAnswer)
                    otherAnswer.style.maxHeight=null;

                if(otherIcon)
                    otherIcon.style.transform="rotate(0deg)";

            }

        });

        item.classList.toggle("active");

        if(item.classList.contains("active")){

            answer.style.maxHeight=
            answer.scrollHeight+"px";

            if(icon)
                icon.style.transform="rotate(45deg)";

        }else{

            answer.style.maxHeight=null;

            if(icon)
                icon.style.transform="rotate(0deg)";

        }

    });

});


/*==================================================
 MAGNETIC BUTTONS
==================================================*/

document.querySelectorAll(

".btn-primary,.btn-secondary"

).forEach(button=>{

button.addEventListener("mousemove",e=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

button.style.transform=

`translate(

${(x-rect.width/2)/10}px,

${(y-rect.height/2)/10}px

)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="";

});

});


/*==================================================
 BUTTON RIPPLE
==================================================*/

document.querySelectorAll(

".btn-primary,.btn-secondary"

).forEach(button=>{

button.addEventListener("click",e=>{

const ripple=document.createElement("span");

ripple.className="btn-ripple";

const rect=button.getBoundingClientRect();

ripple.style.left=

(e.clientX-rect.left)+"px";

ripple.style.top=

(e.clientY-rect.top)+"px";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


/*==================================================
 CARD SPOTLIGHT
==================================================*/

document.querySelectorAll(

".team-member-card"

).forEach(card=>{

const light=document.createElement("span");

light.className="card-light";

card.appendChild(light);

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect();

light.style.left=

(e.clientX-rect.left)+"px";

light.style.top=

(e.clientY-rect.top)+"px";

});

});


/*==================================================
 TOUCH FEEDBACK
==================================================*/

document.querySelectorAll(

".team-member-card"

).forEach(card=>{

card.addEventListener("touchstart",()=>{

card.classList.add("touch-active");

},{passive:true});

card.addEventListener("touchend",()=>{

card.classList.remove("touch-active");

});

});


/*==================================================
 END PART 4
==================================================*/
/*==================================================
 PART 5
 FINAL PREMIUM POLISH
==================================================*/


/*==================================================
 UNIVERSAL COUNTER
==================================================*/

const statCounters=document.querySelectorAll("[data-count]");

const statObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=parseInt(el.dataset.count);

const prefix=el.dataset.prefix||"";

const suffix=el.dataset.suffix||"";

let current=0;

const speed=target/100;

(function animate(){

current+=speed;

if(current<target){

el.textContent=

prefix+

Math.floor(current).toLocaleString()+

suffix;

requestAnimationFrame(animate);

}else{

el.textContent=

prefix+

target.toLocaleString()+

suffix;

}

})();

statObserver.unobserve(el);

});

},{threshold:.4});

statCounters.forEach(counter=>{

statObserver.observe(counter);

});


/*==================================================
 STAGGER REVEAL
==================================================*/

document.querySelectorAll("section").forEach(section=>{

const children=section.children;

[...children].forEach((item,index)=>{

item.style.transitionDelay=

`${index*80}ms`;

});

});


/*==================================================
 FLOATING PARTICLES
==================================================*/

document.querySelectorAll(

".team-hero,.core-team"

).forEach(section=>{

for(let i=0;i<8;i++){

const dot=document.createElement("span");

dot.className="floating-dot";

dot.style.left=Math.random()*100+"%";

dot.style.top=Math.random()*100+"%";

dot.style.animationDelay=

(Math.random()*6)+"s";

section.appendChild(dot);

}

});


/*==================================================
 CARD IDLE FLOAT
==================================================*/

document.querySelectorAll(

".team-member-card"

).forEach((card,index)=>{

let angle=index*50;

(function float(){

angle+=0.02;

card.style.translate=

`0 ${Math.sin(angle)*2}px`;

requestAnimationFrame(float);

})();

});


/*==================================================
 IMAGE QUALITY
==================================================*/

document.querySelectorAll("img").forEach(img=>{

img.loading="lazy";

img.decoding="async";

});


/*==================================================
 PAGE READY
==================================================*/

window.addEventListener("pageshow",()=>{

document.body.classList.add("page-ready");

});


/*==================================================
 PERFORMANCE
==================================================*/

window.addEventListener("scroll",()=>{},{

passive:true

});

window.addEventListener("touchstart",()=>{},{

passive:true

});


/*==================================================
 READY
==================================================*/

console.log(

"%cTEAM PAGE READY ✓",

"color:#2F66F3;font-size:14px;font-weight:bold;"

);