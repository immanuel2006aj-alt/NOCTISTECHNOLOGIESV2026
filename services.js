"use strict";

/*==================================================
  NOCTIS TECHNOLOGIES
  SERVICES PAGE ENGINE
  Production Architecture v1
==================================================*/

const SERVICES = {

    /*==================================================
      CONFIG
    ==================================================*/

    config: {

        debug: false,

        mobileBreakpoint: 768,

        tabletBreakpoint: 1024,

        revealOffset: 0.12,

        parallaxStrength: 24,

        tiltMax: 12,

        magneticStrength: 0.22,

        counterDuration: 1800,

        particleCount: 18

    },

    /*==================================================
      STATE
    ==================================================*/

    state: {

        initialized: false,

        isMobile: false,

        isTablet: false,

        reducedMotion: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches,

        viewportWidth: window.innerWidth,

        viewportHeight: window.innerHeight,

        scrollY: window.scrollY,

        scrollProgress: 0,

        mouseX: 0,

        mouseY: 0,

        pointerX: 0,

        pointerY: 0,

        raf: null,

        ticking: false

    },

    /*==================================================
      DOM CACHE
    ==================================================*/

    dom: {

        body: null,

        root: null,

        hero: null,

        heroContent: null,

        heroVisual: null,

        heroButtons: [],

        services: null,

        serviceCards: [],

        technology: null,

        techCards: [],

        process: null,

        processCards: [],

        consultation: null,

        consultationCards: [],

        faq: null,

        faqItems: [],

        cta: null,

        counters: [],

        progressBar: null

    },

    /*==================================================
      HELPERS
    ==================================================*/

    qs(selector, scope = document) {

        return scope.querySelector(selector);

    },

    qsa(selector, scope = document) {

        return [...scope.querySelectorAll(selector)];

    },

    clamp(value, min, max) {

        return Math.min(Math.max(value, min), max);

    },

    lerp(start, end, factor) {

        return start + (end - start) * factor;

    },

    map(value, inMin, inMax, outMin, outMax) {

        return (
            (value - inMin) *
            (outMax - outMin) /
            (inMax - inMin) +
            outMin
        );

    },

    random(min, max) {

        return Math.random() * (max - min) + min;

    },

    /*==================================================
      CACHE DOM
    ==================================================*/

    cacheDOM() {

        this.dom.body = document.body;

        this.dom.root = document.documentElement;

        this.dom.hero =
            this.qs(".services-hero") ||
            this.qs(".hero");

        this.dom.heroContent =
            this.qs(".services-content") ||
            this.qs(".hero-content");

        this.dom.heroVisual =
            this.qs(".services-visual") ||
            this.qs(".hero-preview");

        this.dom.heroButtons =
            this.qsa(".btn-primary,.btn-secondary");

        this.dom.services =
            this.qs(".services-section");

        this.dom.serviceCards =
            this.qsa(".service-card");

        this.dom.technology =
            this.qs(".technology");

        this.dom.techCards =
            this.qsa(".tech-card");

        this.dom.process =
            this.qs(".process");

        this.dom.processCards =
            this.qsa(".process-card");

        this.dom.consultation =
            this.qs(".consultation");

        this.dom.consultationCards =
            this.qsa(".consultation-card");

        this.dom.faq =
            this.qs(".faq");

        this.dom.faqItems =
            this.qsa(".faq-item");

        this.dom.cta =
            this.qs(".cta");

        this.dom.counters =
            this.qsa("[data-count]");

        this.dom.progressBar =
            this.qs(".scroll-progress");

    },

    /*==================================================
      VIEWPORT
    ==================================================*/

    updateViewport() {

        this.state.viewportWidth =
            window.innerWidth;

        this.state.viewportHeight =
            window.innerHeight;

        this.state.isMobile =
            this.state.viewportWidth <=
            this.config.mobileBreakpoint;

        this.state.isTablet =
            this.state.viewportWidth <=
            this.config.tabletBreakpoint;

    },

    /*==================================================
      SCROLL
    ==================================================*/

    updateScroll() {

        this.state.scrollY =
            window.scrollY;

        const maxScroll =

            document.documentElement.scrollHeight -

            window.innerHeight;

        this.state.scrollProgress =

            maxScroll > 0

            ? this.state.scrollY / maxScroll

            : 0;

    },

    /*==================================================
      POINTER
    ==================================================*/

    updatePointer(event) {

        this.state.pointerX = event.clientX;

        this.state.pointerY = event.clientY;

        this.state.mouseX =

            (event.clientX /

            this.state.viewportWidth) * 2 - 1;

        this.state.mouseY =

            (event.clientY /

            this.state.viewportHeight) * 2 - 1;

    },
    /*==================================================
      EVENT MANAGER
    ==================================================*/

    events:{

        initialized:false,

        resize:null,

        scroll:null,

        pointer:null,

        visibility:null

    },

    bindEvents(){

        if(this.events.initialized) return;

        this.events.initialized=true;

        this.events.resize=()=>{

            this.updateViewport();

            this.refresh();

        };

        this.events.scroll=()=>{

            this.updateScroll();

            this.updateProgress();

        };

        this.events.pointer=(event)=>{

            this.updatePointer(event);

        };

        this.events.visibility=()=>{

            if(document.hidden){

                this.stopRenderLoop();

            }else{

                this.startRenderLoop();

            }

        };

        window.addEventListener(
            "resize",
            this.events.resize,
            {passive:true}
        );

        window.addEventListener(
            "scroll",
            this.events.scroll,
            {passive:true}
        );

        window.addEventListener(
            "mousemove",
            this.events.pointer,
            {passive:true}
        );

        document.addEventListener(
            "visibilitychange",
            this.events.visibility
        );

    },

    /*==================================================
      RENDER LOOP
    ==================================================*/

    startRenderLoop(){

        if(this.state.raf) return;

        const animate=()=>{

            this.render();

            this.state.raf=requestAnimationFrame(animate);

        };

        this.state.raf=requestAnimationFrame(animate);

    },

    stopRenderLoop(){

        if(!this.state.raf) return;

        cancelAnimationFrame(this.state.raf);

        this.state.raf=null;

    },

    /*==================================================
      MASTER RENDER
    ==================================================*/

    render(){

    this.renderHero();

    this.renderCards();

    this.renderMagnetic();

    this.renderTechnology();

    this.renderProcess();

    this.renderCTA();

    this.renderParticles();

},
    /*==================================================
      SCROLL PROGRESS
    ==================================================*/

    updateProgress(){

        if(!this.dom.progressBar) return;

        this.dom.progressBar.style.width=

            (this.state.scrollProgress*100)+"%";

    },

    /*==================================================
      REFRESH
    ==================================================*/

    refresh(){

        this.updateViewport();

        this.updateScroll();

    },

    /*==================================================
      PLACEHOLDERS
      (Implemented in later parts)
    ==================================================*/

    renderHero(){},

    renderCards(){},

    renderMagnetic(){},

    renderParticles(){},
      /*==================================================
      SCROLL REVEAL ENGINE
    ==================================================*/

    reveal:{

        observer:null,

        initialized:false,

        selectors:[

            ".services-hero",
            ".services-section",
            ".service-card",

            ".technology",
            ".tech-card",

            ".process",
            ".process-card",

            ".consultation",
            ".consultation-card",

            ".faq",
            ".faq-item",

            ".cta"

        ]

    },

    initReveal(){

        if(this.reveal.initialized) return;

        this.reveal.initialized=true;

        if(this.state.reducedMotion){

            this.revealFallback();

            return;

        }

        const options={

            root:null,

            rootMargin:"0px 0px -10% 0px",

            threshold:this.config.revealOffset

        };

        this.reveal.observer=new IntersectionObserver(

            (entries)=>{

                entries.forEach(entry=>{

                    if(!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    this.reveal.observer.unobserve(entry.target);

                });

            },

            options

        );

        this.reveal.selectors.forEach(selector=>{

            this.qsa(selector).forEach(element=>{

                element.classList.add("reveal");

                this.reveal.observer.observe(element);

            });

        });

    },

    revealFallback(){

        this.reveal.selectors.forEach(selector=>{

            this.qsa(selector).forEach(element=>{

                element.classList.add(

                    "reveal",

                    "is-visible"

                );

            });

        });

    },

    destroyReveal(){

        if(this.reveal.observer){

            this.reveal.observer.disconnect();

            this.reveal.observer=null;

        }

    },
    /*==================================================
      PREMIUM HERO ENGINE
    ==================================================*/

    hero:{

        rotationX:0,

        rotationY:0,

        currentX:0,

        currentY:0,

        currentTranslate:0

    },

    renderHero(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        if(!this.dom.heroVisual) return;

        const targetX=

            this.state.mouseY*

            this.config.tiltMax;

        const targetY=

            this.state.mouseX*

            -this.config.tiltMax;

        this.hero.rotationX=

            this.lerp(

                this.hero.rotationX,

                targetX,

                .08

            );

        this.hero.rotationY=

            this.lerp(

                this.hero.rotationY,

                targetY,

                .08

            );

        this.hero.currentTranslate=

            this.lerp(

                this.hero.currentTranslate,

                this.state.scrollY*.08,

                .05

            );

        this.dom.heroVisual.style.transform=

        `perspective(1800px)
         rotateX(${this.hero.rotationX}deg)
         rotateY(${this.hero.rotationY}deg)
         translateY(${-this.hero.currentTranslate}px)
         translateZ(0)`;

        if(this.dom.heroContent){

            const moveX=

                this.state.mouseX*12;

            const moveY=

                this.state.mouseY*12;

            this.dom.heroContent.style.transform=

            `translate3d(${moveX}px,${moveY}px,0)`;

        }

    },

    /*==================================================
      HERO FLOATING ORBS
    ==================================================*/

    createHeroOrbs(){

        if(

            this.state.isMobile ||

            this.state.reducedMotion ||

            !this.dom.hero

        ) return;

        const wrapper=document.createElement("div");

        wrapper.className="hero-orbs";

        for(let i=0;i<5;i++){

            const orb=document.createElement("span");

            orb.className="hero-orb";

            orb.style.left=

                this.random(5,90)+"%";

            orb.style.top=

                this.random(5,90)+"%";

            orb.style.animationDuration=

                this.random(8,16)+"s";

            orb.style.animationDelay=

                this.random(0,6)+"s";

            wrapper.appendChild(orb);

        }

        this.dom.hero.appendChild(wrapper);

    },
    /*==================================================
      PREMIUM SERVICE CARDS
    ==================================================*/

    initServiceCards(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.dom.serviceCards.forEach(card=>{

            card.addEventListener("mousemove",(e)=>{

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

                card.style.setProperty("--mouse-x",`${x}px`);
                card.style.setProperty("--mouse-y",`${y}px`);

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="";

            });

        });

    },

    renderCards(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.dom.serviceCards.forEach(card=>{

            const rect=card.getBoundingClientRect();

            if(
                rect.bottom<0 ||
                rect.top>window.innerHeight
            ) return;

            const distance=

                rect.top-
                window.innerHeight/2;

            const translate=

                distance*-0.03;

            card.style.transform+=
                ` translateZ(0) translateY(${translate}px)`;

        });

    },

    /*==================================================
      MAGNETIC BUTTONS
    ==================================================*/

    renderMagnetic(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.dom.heroButtons.forEach(button=>{

            const rect=button.getBoundingClientRect();

            const centerX=rect.left+rect.width/2;
            const centerY=rect.top+rect.height/2;

            const dx=this.state.pointerX-centerX;
            const dy=this.state.pointerY-centerY;

            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<140){

                button.style.transform=

                `translate(
                    ${dx*0.18}px,
                    ${dy*0.18}px
                )`;

            }else{

                button.style.transform="";

            }

        });

    },
    /*==================================================
      PREMIUM COUNTERS
    ==================================================*/

    initCounters(){

        if(!this.dom.counters.length) return;

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const element = entry.target;

                const target = Number(
                    element.dataset.count || 0
                );

                this.animateCounter(element,target);

                observer.unobserve(element);

            });

        },{

            threshold:0.4

        });

        this.dom.counters.forEach(counter=>{

            observer.observe(counter);

        });

    },

    animateCounter(element,target){

        const start=performance.now();

        const duration=this.config.counterDuration;

        const update=(now)=>{

            const progress=Math.min(
                (now-start)/duration,
                1
            );

            const eased=

                1-Math.pow(1-progress,3);

            const value=Math.floor(
                eased*target
            );

            element.textContent=
                value.toLocaleString();

            if(progress<1){

                requestAnimationFrame(update);

            }else{

                element.textContent=
                    target.toLocaleString();

            }

        };

        requestAnimationFrame(update);

    },

    /*==================================================
      TECHNOLOGY FLOAT
    ==================================================*/

    initTechnology(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.dom.techCards.forEach((card,index)=>{

            card.style.animation=
                `techFloat ${
                    4+(index%3)
                }s ease-in-out infinite`;

            card.style.animationDelay=
                `${index*.25}s`;

        });

    },

    /*==================================================
      TECHNOLOGY PARALLAX
    ==================================================*/

    renderTechnology(){

        if(
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.dom.techCards.forEach((card,index)=>{

            const rect=
                card.getBoundingClientRect();

            if(
                rect.bottom<0 ||
                rect.top>window.innerHeight
            ) return;

            const speed=
                0.02+(index*0.005);

            const offset=

                (window.innerHeight/2-
                rect.top)*speed;

            card.style.transform=

                `translateY(${offset}px)`;

        });

    },
      /*==================================================
      FAQ ACCORDION
    ==================================================*/
initFAQ() {

    const items = document.querySelectorAll(".faq-item");

    items.forEach(item => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) return;

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            items.forEach(faq => {

                faq.classList.remove("active");

                const a = faq.querySelector(".faq-answer");

                if (a) {
                    a.style.maxHeight = null;
                }

            });

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

},

    /*==================================================
      PROCESS TIMELINE
    ==================================================*/

    renderProcess() {

        if (!this.dom.processCards.length) return;

        this.dom.processCards.forEach((card, index) => {

            const rect =
                card.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > window.innerHeight
            ) return;

            const progress = this.clamp(

                1 -

                (rect.top /
                    window.innerHeight),

                0,

                1

            );

            const translate =
                (1 - progress) * 40;

            card.style.opacity = progress;

            card.style.transform =

                `translateY(${translate}px)
                 scale(${0.95 + progress * 0.05})`;

        });

    },

    /*==================================================
      CTA GLOW
    ==================================================*/

    renderCTA() {

        if (
            !this.dom.cta ||
            this.state.reducedMotion
        ) return;

        const rect =
            this.dom.cta.getBoundingClientRect();

        if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight
        ) return;

        const glowX =
            this.state.pointerX - rect.left;

        const glowY =
            this.state.pointerY - rect.top;

        this.dom.cta.style.setProperty(
            "--glow-x",
            glowX + "px"
        );

        this.dom.cta.style.setProperty(
            "--glow-y",
            glowY + "px"
        );

    },
      /*==================================================
      PARTICLE ENGINE
    ==================================================*/

    particles: [],

    createParticles() {

        if (
            this.state.isMobile ||
            this.state.reducedMotion ||
            !this.dom.hero
        ) return;

        const container = document.createElement("div");
        container.className = "particles-layer";

        this.dom.hero.appendChild(container);

        for (let i = 0; i < this.config.particleCount; i++) {

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = this.random(0, 100) + "%";
            particle.style.top = this.random(0, 100) + "%";
            particle.style.animationDuration =
                this.random(8, 18) + "s";
            particle.style.animationDelay =
                this.random(0, 8) + "s";

            container.appendChild(particle);

            this.particles.push(particle);

        }

    },

    renderParticles() {

        if (
            this.state.isMobile ||
            this.state.reducedMotion
        ) return;

        this.particles.forEach((particle, index) => {

            const offset =
                Math.sin(
                    (performance.now() * 0.001) + index
                ) * 8;

            particle.style.transform =
                `translateY(${offset}px)`;

        });

    },

    /*==================================================
      PERFORMANCE
    ==================================================*/

    optimize() {

        document.documentElement.classList.add(
            "services-loaded"
        );

    },

    /*==================================================
      DESTROY
    ==================================================*/

    destroy() {

        this.stopRenderLoop();

        this.destroyReveal();

        window.removeEventListener(
            "resize",
            this.events.resize
        );

        window.removeEventListener(
            "scroll",
            this.events.scroll
        );

        window.removeEventListener(
            "mousemove",
            this.events.pointer
        );

        document.removeEventListener(
            "visibilitychange",
            this.events.visibility
        );

    },
    /*==================================================
      INITIALIZE
    ==================================================*/

    init() {

        if (this.state.initialized) return;

        this.state.initialized = true;

        /* Cache */

        this.cacheDOM();

        /* Viewport */

        this.updateViewport();

        this.updateScroll();

        /* Animation Systems */

        this.bindEvents();

        this.initReveal();

        /* Hero */

        this.createHeroOrbs();

        /* Service Cards */

        this.initServiceCards();

        /* Counters */

        this.initCounters();

        /* Technology */

        this.initTechnology();

        /* FAQ */

        this.initFAQ();

        /* Particles */

        this.createParticles();

        /* Performance */

        this.optimize();

        /* Start Engine */

        this.startRenderLoop();

        if (this.config.debug) {

            console.log(
                "✅ Noctis Services Engine Loaded"
            );

        }

    }

};
/*==================================================
AUTO START
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    SERVICES.init();

});

/*==================================================
GLOBAL ACCESS
==================================================*/

window.SERVICES = SERVICES;
document.querySelector(".faq-question")?.click();