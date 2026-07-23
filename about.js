"use strict";

/*==================================================
 NOCTIS TECHNOLOGIES
 ABOUT PAGE ENGINE
 Version: 2.0.0
==================================================*/

const ABOUT = {

    /*=========================================
      CONFIG
    =========================================*/

    config: {

        debug: false,

        mobileBreakpoint: 768,

        tabletBreakpoint: 1024,

        animationDuration: 700,

        easing: "cubic-bezier(.22,1,.36,1)"

    },

    /*=========================================
      STATE
    =========================================*/

    state: {

        initialized: false,

        isMobile: false,

        reducedMotion: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches,

        scrollY: 0,

        viewportWidth: window.innerWidth,

        viewportHeight: window.innerHeight,

        mouse: {

            x: 0,

            y: 0

        }

    },

    /*=========================================
      DOM CACHE
    =========================================*/

    dom: {

        hero: null,

        overview: null,

        mission: null,

        journey: null,

        why: null,

        expertise: null,

        team: null,

        stats: null,

        cta: null,

        progress: null

    },

    /*=========================================
      HELPERS
    =========================================*/

    qs(selector, scope = document) {

        return scope.querySelector(selector);

    },

    qsa(selector, scope = document) {

        return [...scope.querySelectorAll(selector)];

    },

    clamp(value, min, max) {

        return Math.min(Math.max(value, min), max);

    },

    lerp(start, end, amount) {

        return start + (end - start) * amount;

    },

    /*=========================================
      CACHE DOM
    =========================================*/

    cacheDOM() {

        this.dom.hero =
            this.qs(".about-hero");

        this.dom.overview =
            this.qs(".company-overview");

        this.dom.mission =
            this.qs(".mission-vision");

        this.dom.journey =
            this.qs(".company-journey");

        this.dom.why =
            this.qs(".why-noctis");

        this.dom.expertise =
            this.qs(".our-expertise");

        this.dom.team =
            this.qs(".about-team");

        this.dom.stats =
            this.qs(".company-stats");

        this.dom.cta =
            this.qs(".about-cta");

        this.dom.progress =
            this.qs(".scroll-progress");

    },

    /*=========================================
      UPDATE STATE
    =========================================*/

    updateViewport() {

        this.state.viewportWidth =
            window.innerWidth;

        this.state.viewportHeight =
            window.innerHeight;

        this.state.isMobile =
            window.innerWidth <=
            this.config.mobileBreakpoint;

    },

    updateScroll() {

        this.state.scrollY =
            window.scrollY;

    },

    updateMouse(event) {

        this.state.mouse.x =
            event.clientX;

        this.state.mouse.y =
            event.clientY;

    },
      /*=========================================
      EVENT MANAGER
    =========================================*/

    events: {

        initialized: false,

        resizeHandler: null,

        scrollHandler: null,

        mouseHandler: null

    },

    bindEvents() {

        if (this.events.initialized) return;

        this.events.initialized = true;

        this.events.resizeHandler = () => {

            this.updateViewport();

        };

        this.events.scrollHandler = () => {

            this.updateScroll();

        };

        this.events.mouseHandler = (event) => {

            this.updateMouse(event);

        };

        window.addEventListener(

            "resize",

            this.events.resizeHandler,

            { passive: true }

        );

        window.addEventListener(

            "scroll",

            this.events.scrollHandler,

            { passive: true }

        );

        window.addEventListener(

            "mousemove",

            this.events.mouseHandler,

            { passive: true }

        );

    },

    /*=========================================
      RENDER ENGINE
    =========================================*/

    render: {

        frame: null,

        running: false

    },

    startRenderLoop() {

        if (this.render.running) return;

        this.render.running = true;

        const update = () => {

            this.renderEffects();

            this.render.frame =

                requestAnimationFrame(update);

        };

        update();

    },

    stopRenderLoop() {

        this.render.running = false;

        cancelAnimationFrame(

            this.render.frame

        );

    },

    /*=========================================
      GLOBAL EFFECTS
    =========================================*/

    renderEffects() {

        if (

            this.dom.progress &&

            document.documentElement.scrollHeight >

            window.innerHeight

        ) {

            const percent =

                (

                    this.state.scrollY /

                    (

                        document.documentElement.scrollHeight -

                        window.innerHeight

                    )

                ) * 100;

            this.dom.progress.style.width =

                `${Math.min(percent,100)}%`;

        }

    },

    /*=========================================
      PAGE REFRESH
    =========================================*/

    refresh() {

        this.cacheDOM();

        this.updateViewport();

        this.updateScroll();

    },
    /*=========================================
      SCROLL REVEAL ENGINE
    =========================================*/

    reveal: {

        observer: null,

        selectors: [

            ".company-overview",

            ".mission-vision",

            ".company-journey",

            ".why-noctis",

            ".our-expertise",

            ".about-team",

            ".company-stats",

            ".about-cta"

        ]

    },

    initReveal() {

        if (!("IntersectionObserver" in window)) {

            this.revealFallback();

            return;

        }

        this.reveal.observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    this.reveal.observer.unobserve(entry.target);

                });

            },

            {

                threshold: 0.15,

                rootMargin: "0px 0px -80px 0px"

            }

        );

        this.reveal.selectors.forEach((selector) => {

            this.qsa(selector).forEach((element) => {

                element.classList.add("reveal");

                this.reveal.observer.observe(element);

            });

        });

    },

    revealFallback() {

        this.reveal.selectors.forEach((selector) => {

            this.qsa(selector).forEach((element) => {

                element.classList.add(

                    "reveal",

                    "is-visible"

                );

            });

        });

    },

    destroyReveal() {

        if (this.reveal.observer) {

            this.reveal.observer.disconnect();

            this.reveal.observer = null;

        }

    },
    /*=========================================
      HERO ENGINE
    =========================================*/

    hero: {

        enabled: true,

        parallax: 0.15,

        floatingSpeed: 0.04,

        initialized: false

    },

    initHero() {

        if (!this.dom.hero) return;

        this.hero.initialized = true;

        this.hero.title = this.qs(".hero-title", this.dom.hero);

        this.hero.subtitle = this.qs(".hero-subtitle", this.dom.hero);

        this.hero.badge = this.qs(".hero-badge", this.dom.hero);

        this.hero.buttons = this.qsa(".hero-actions .btn", this.dom.hero);

    },

    updateHero() {

        if (

            !this.hero.initialized ||

            this.state.isMobile ||

            this.state.reducedMotion

        ) return;

        const offset =

            this.state.scrollY * this.hero.parallax;

        this.dom.hero.style.transform =

            `translate3d(0, ${offset}px, 0)`;

    },

    animateHeroEntrance() {

        if (!this.dom.hero) return;

        const elements = [

            this.hero.badge,

            this.hero.title,

            this.hero.subtitle,

            ...this.hero.buttons

        ].filter(Boolean);

        elements.forEach((element, index) => {

            element.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateY(40px)"

                    },

                    {

                        opacity: 1,

                        transform: "translateY(0)"

                    }

                ],

                {

                    duration: 700,

                    delay: index * 120,

                    easing: "cubic-bezier(.22,1,.36,1)",

                    fill: "forwards"

                }

            );

        });

    },

    updateFloatingHero() {

        if (

            !this.hero.initialized ||

            this.state.isMobile ||

            this.state.reducedMotion

        ) return;

        const move =

            Math.sin(Date.now() * 0.0015) * 8;

        if (this.hero.title) {

            this.hero.title.style.transform =

                `translateY(${move}px)`;

        }

    },
    /*=========================================
      OVERVIEW & MISSION ENGINE
    =========================================*/

    sections: {

        cards: [],

        missionCards: []

    },

    initOverview() {

        if (this.dom.overview) {

            this.sections.cards = this.qsa(

                ".overview-card, .feature-card",

                this.dom.overview

            );

        }

        if (this.dom.mission) {

            this.sections.missionCards = this.qsa(

                ".mission-card, .vision-card, .value-card",

                this.dom.mission

            );

        }

    },

    animateOverview() {

        this.sections.cards.forEach((card, index) => {

            card.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateY(30px)"

                    },

                    {

                        opacity: 1,

                        transform: "translateY(0)"

                    }

                ],

                {

                    duration: 650,

                    delay: index * 100,

                    easing: "cubic-bezier(.22,1,.36,1)",

                    fill: "both"

                }

            );

        });

    },

    animateMission() {

        this.sections.missionCards.forEach((card, index) => {

            card.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateY(25px) scale(.96)"

                    },

                    {

                        opacity: 1,

                        transform: "translateY(0) scale(1)"

                    }

                ],

                {

                    duration: 700,

                    delay: index * 120,

                    easing: "cubic-bezier(.22,1,.36,1)",

                    fill: "both"

                }

            );

        });

    },

    initCardHover() {

        if (this.state.isMobile) return;

        const cards = [

            ...this.sections.cards,

            ...this.sections.missionCards

        ];

        cards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;

                const y = event.clientY - rect.top;

                const rotateY =

                    ((x / rect.width) - 0.5) * 8;

                const rotateX =

                    ((y / rect.height) - 0.5) * -8;

                card.style.transform =

                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    },
      /*=========================================
      JOURNEY & STATS ENGINE
    =========================================*/

    journey: {

        items: []

    },

    statsEngine: {

        counters: [],

        observer: null

    },

    initJourney() {

        if (!this.dom.journey) return;

        this.journey.items = this.qsa(

            ".timeline-item, .journey-card",

            this.dom.journey

        );

    },

    animateJourney() {

        this.journey.items.forEach((item, index) => {

            item.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateX(-40px)"

                    },

                    {

                        opacity: 1,

                        transform: "translateX(0)"

                    }

                ],

                {

                    duration: 700,

                    delay: index * 140,

                    easing: "cubic-bezier(.22,1,.36,1)",

                    fill: "both"

                }

            );

        });

    },

    initStats() {

        if (!this.dom.stats) return;

        this.statsEngine.counters = this.qsa(

            "[data-count]",

            this.dom.stats

        );

        if (!this.statsEngine.counters.length) return;

        this.statsEngine.observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    this.animateCounter(entry.target);

                    this.statsEngine.observer.unobserve(

                        entry.target

                    );

                });

            },

            {

                threshold: 0.4

            }

        );

        this.statsEngine.counters.forEach((counter) => {

            this.statsEngine.observer.observe(counter);

        });

    },

    animateCounter(element) {

        const target = Number(

            element.dataset.count || 0

        );

        const duration = 1800;

        const start = performance.now();

        const update = (time) => {

            const progress = Math.min(

                (time - start) / duration,

                1

            );

            const value = Math.floor(

                target * progress

            );

            element.textContent =

                value.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(update);

            }

        };

        requestAnimationFrame(update);

    },

    destroyStats() {

        if (this.statsEngine.observer) {

            this.statsEngine.observer.disconnect();

            this.statsEngine.observer = null;

        }

    },
      /*=========================================
      EXPERTISE • TEAM • CTA ENGINE
    =========================================*/

    ui: {

        expertiseCards: [],

        teamCards: [],

        ctaButtons: []

    },

    initUI() {

        if (this.dom.expertise) {

            this.ui.expertiseCards = this.qsa(

                ".expertise-card,.service-card",

                this.dom.expertise

            );

        }

        if (this.dom.team) {

            this.ui.teamCards = this.qsa(

                ".team-card",

                this.dom.team

            );

        }

        if (this.dom.cta) {

            this.ui.ctaButtons = this.qsa(

                ".btn,.cta-btn",

                this.dom.cta

            );

        }

    },

    animateExpertise() {

        this.ui.expertiseCards.forEach((card,index)=>{

            card.animate(

                [

                    {

                        opacity:0,

                        transform:"translateY(30px) scale(.96)"

                    },

                    {

                        opacity:1,

                        transform:"translateY(0) scale(1)"

                    }

                ],

                {

                    duration:700,

                    delay:index*90,

                    easing:"cubic-bezier(.22,1,.36,1)",

                    fill:"both"

                }

            );

        });

    },

    animateTeam() {

        this.ui.teamCards.forEach((card,index)=>{

            card.animate(

                [

                    {

                        opacity:0,

                        transform:"translateY(40px)"

                    },

                    {

                        opacity:1,

                        transform:"translateY(0)"

                    }

                ],

                {

                    duration:700,

                    delay:index*120,

                    easing:"cubic-bezier(.22,1,.36,1)",

                    fill:"both"

                }

            );

        });

    },

    initMagneticButtons() {

        if (this.state.isMobile) return;

        this.ui.ctaButtons.forEach((button)=>{

            button.addEventListener("mousemove",(event)=>{

                const rect = button.getBoundingClientRect();

                const x =

                    event.clientX -

                    rect.left -

                    rect.width/2;

                const y =

                    event.clientY -

                    rect.top -

                    rect.height/2;

                button.style.transform =

                    `translate(${x*0.18}px,${y*0.18}px)`;

            });

            button.addEventListener("mouseleave",()=>{

                button.style.transform="";

            });

        });

    },

    pulseCTA() {

        if (!this.dom.cta) return;

        this.dom.cta.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(1.015)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:2600,

                iterations:Infinity,

                easing:"ease-in-out"

            }

        );

    },
      /*=========================================
      PERFORMANCE ENGINE
    =========================================*/

    performance: {

        initialized: false,

        resizeTimer: null

    },

    initPerformance() {

        if (this.performance.initialized) return;

        this.performance.initialized = true;

        document.documentElement.style.scrollBehavior = "smooth";

    },

    debounce(callback, delay = 150) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback.apply(this, args);

            }, delay);

        };

    },

    /*=========================================
      ACCESSIBILITY
    =========================================*/

    initAccessibility() {

        if (this.state.reducedMotion) {

            document.documentElement.classList.add(

                "reduce-motion"

            );

        }

        this.qsa("button,a").forEach((element) => {

            element.addEventListener("keyup", (event) => {

                if (event.key === "Enter") {

                    element.click();

                }

            });

        });

    },

    /*=========================================
      CLEANUP
    =========================================*/

    destroy() {

        this.stopRenderLoop();

        this.destroyReveal();

        this.destroyStats();

        window.removeEventListener(

            "resize",

            this.events.resizeHandler

        );

        window.removeEventListener(

            "scroll",

            this.events.scrollHandler

        );

        window.removeEventListener(

            "mousemove",

            this.events.mouseHandler

        );

        this.events.initialized = false;

    },

    /*=========================================
      PAGE VISIBILITY
    =========================================*/

    initVisibility() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    this.stopRenderLoop();

                } else {

                    this.startRenderLoop();

                }

            }

        );

    },

    /*=========================================
      READY CHECK
    =========================================*/

    ready() {

        return (

            document.readyState === "interactive" ||

            document.readyState === "complete"

        );

    },
      /*=========================================
      INITIALIZATION
    =========================================*/

    init() {

        if (this.state.initialized) return;

        this.state.initialized = true;

        /* Core */

        this.cacheDOM();

        this.updateViewport();

        this.updateScroll();

        /* Events */

        this.bindEvents();

        /* Performance */

        this.initPerformance();

        this.initAccessibility();

        this.initVisibility();

        /* Reveal Engine */

        this.initReveal();

        /* Hero */

        this.initHero();

        this.animateHeroEntrance();

        /* Overview */

        this.initOverview();

        this.animateOverview();

        this.animateMission();

        this.initCardHover();

        /* Journey */

        this.initJourney();

        this.animateJourney();

        /* Stats */

        this.initStats();

        /* Expertise & Team */

        this.initUI();

        this.animateExpertise();

        this.animateTeam();

        this.initMagneticButtons();

        this.pulseCTA();

        /* Render */

        this.startRenderLoop();

        if (this.config.debug) {

            console.log(

                "%cABOUT PAGE READY",

                "color:#10B981;font-weight:bold;"

            );

        }

    }

};
/*=========================================
  BOOTSTRAP
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    ABOUT.init();

});

window.addEventListener("beforeunload", () => {

    ABOUT.destroy();

});

window.ABOUT = ABOUT;