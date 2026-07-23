"use strict";

/*==================================================
NOCTIS TECHNOLOGIES
INDEX.JS - PART 1 (NO NAVIGATION)
==================================================*/

const NT = {

    init() {

        this.cache();

        this.scrollProgress();

        this.reveal();

        this.heroParallax();

        this.smoothAnchor();

        this.startingPriceCounter();

    },

    cache() {

        this.progress = document.querySelector(".scroll-progress");

    },

/*==================================================
SCROLL PROGRESS
==================================================*/

    scrollProgress() {

        if (!this.progress) return;

        window.addEventListener("scroll", () => {

            const doc = document.documentElement;

            const total = doc.scrollHeight - doc.clientHeight;

            const progress = (window.scrollY / total) * 100;

            this.progress.style.width = progress + "%";

        });

    },

/*==================================================
SCROLL REVEAL
==================================================*/

    reveal() {

        const elements = document.querySelectorAll(
            "section,.hero-card,.hero-service-item,.why-card,.featured-card,.ecosystem-info-card,.pricing-card,.contact-card"
        );

        elements.forEach(el => {

            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
            el.style.transition = "all .8s ease";

        });

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        elements.forEach(el => observer.observe(el));

    },

/*==================================================
HERO PARALLAX
==================================================*/

    heroParallax() {

        const hero = document.querySelector(".hero");

        if (!hero) return;

        window.addEventListener("scroll", () => {

            hero.style.backgroundPositionY =
                (window.scrollY * 0.25) + "px";

        });

    },

/*==================================================
SMOOTH SCROLL
==================================================*/

    smoothAnchor() {

        document.querySelectorAll('a[href^="#"]').forEach(link => {

            link.addEventListener("click", e => {

                const target = document.querySelector(
                    link.getAttribute("href")
                );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            });

        });

    },

/*==================================================
STARTING PRICE COUNTER
==================================================*/

    startingPriceCounter() {

        const counter = document.getElementById("startingPrice");

        if (!counter) return;

        const target = parseInt(
            counter.dataset.target || "0",
            10
        );

        let started = false;

        const animate = () => {

            const duration = 2000;
            const start = performance.now();

            const update = (time) => {

                const progress = Math.min(
                    (time - start) / duration,
                    1
                );

                counter.textContent =
                    Math.floor(progress * target)
                    .toLocaleString("en-IN");

                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    counter.textContent =
                        target.toLocaleString("en-IN");

                }

            };

            requestAnimationFrame(update);

        };

        const observer = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && !started) {

                started = true;

                animate();

                observer.disconnect();

            }

        }, {
            threshold: 0.4
        });

        observer.observe(counter);

    }

};

/*==================================================
BOOT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    NT.init();

});
/*==================================================
PART 2
COUNTERS + STATS
==================================================*/

Object.assign(NT, {

/*==================================================
INITIALIZE
==================================================*/

stats() {

    this.counterAnimation();

    this.progressBars();

},

/*==================================================
ALL COUNTERS
==================================================*/

counterAnimation() {

    const counters = document.querySelectorAll(
        "[data-count], .counter, .count, .stat-number, .hero-item h3"
    );

    if (!counters.length) return;

    const animate = (el) => {

        const target = parseInt(
            el.dataset.count ||
            el.textContent.replace(/[^\d]/g, ""),
            10
        );

        if (isNaN(target)) return;

        const original = el.textContent;

        const prefix = original.match(/^[^\d]+/)?.[0] || "";
        const suffix = original.match(/[^\d]+$/)?.[0] || "";

        const duration = 1800;
        const start = performance.now();

        const update = (time) => {

            const progress = Math.min(
                (time - start) / duration,
                1
            );

            const value = Math.floor(progress * target);

            el.textContent =
                prefix +
                value.toLocaleString("en-IN") +
                suffix;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                el.textContent =
                    prefix +
                    target.toLocaleString("en-IN") +
                    suffix;

            }

        };

        requestAnimationFrame(update);

    };

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animate(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.35

    });

    counters.forEach(counter => observer.observe(counter));

},

/*==================================================
PROGRESS BARS
==================================================*/

progressBars() {

    const bars = document.querySelectorAll(
        ".progress-bar,.skill-progress,.progress-fill"
    );

    if (!bars.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const value =
                bar.dataset.progress ||
                bar.getAttribute("aria-valuenow") ||
                "100";

            bar.style.width = "0%";

            requestAnimationFrame(() => {

                bar.style.transition = "width 1.8s ease";

                bar.style.width = value + "%";

            });

            observer.unobserve(bar);

        });

    }, {

        threshold: 0.4

    });

    bars.forEach(bar => observer.observe(bar));

}

});

/*==================================================
RUN PART 2
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    NT.stats();

});
/*==================================================
PART 3
PREMIUM INTERACTIONS
==================================================*/

Object.assign(NT, {

/*==================================================
INITIALIZE
==================================================*/

premium() {

    this.heroFloat();

    this.mouseParallax();

    this.staggerCards();

    this.magneticButtons();

    this.cardHover();

},

/*==================================================
FLOATING HERO CARDS
==================================================*/

heroFloat() {

    const cards = document.querySelectorAll(".hero-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {

        let offset = index * 0.6;

        function animate() {

            offset += 0.02;

            card.style.transform =
                `translateY(${Math.sin(offset) * 10}px)`;

            requestAnimationFrame(animate);

        }

        animate();

    });

},

/*==================================================
MOUSE PARALLAX
==================================================*/

mouseParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    hero.addEventListener("mousemove", e => {

        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll(".hero-card").forEach((card, i) => {

            card.style.transform =
                `translate(${x * (i + 1) / 8}px, ${y * (i + 1) / 8}px)`;

        });

    });

},

/*==================================================
STAGGER REVEAL
==================================================*/

staggerCards() {

    const cards = document.querySelectorAll(
        ".service-card,.why-card,.featured-card,.ecosystem-info-card,.hero-service-item"
    );

    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            cards.forEach((card, index) => {

                setTimeout(() => {

                    card.classList.add("show");

                }, index * 120);

            });

            observer.disconnect();

        });

    }, {

        threshold: 0.2

    });

    observer.observe(cards[0]);

},

/*==================================================
MAGNETIC BUTTONS
==================================================*/

magneticButtons() {

    document.querySelectorAll(
        ".btn,.btn-primary,.btn-secondary"
    ).forEach(btn => {

        btn.addEventListener("mousemove", e => {

            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform =
                `translate(${x * .15}px, ${y * .15}px)`;

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform = "translate(0,0)";

        });

    });

},

/*==================================================
CARD GLOW EFFECT
==================================================*/

cardHover() {

    document.querySelectorAll(
        ".service-card,.why-card,.featured-card,.pricing-card"
    ).forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            card.style.setProperty(
                "--mx",
                (e.clientX - rect.left) + "px"
            );

            card.style.setProperty(
                "--my",
                (e.clientY - rect.top) + "px"
            );

        });

    });

}

});

/*==================================================
RUN PART 3
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    NT.premium();

});
/*==================================================
PART 4
FINAL UTILITIES
==================================================*/

Object.assign(NT, {

/*==================================================
INITIALIZE
==================================================*/

utilities() {

    this.pageLoader();

    this.backToTop();

    this.techMarquee();

    this.lazyImages();

    this.performance();

    this.errorHandler();

},

/*==================================================
PAGE LOADER
==================================================*/

pageLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.classList.add("loaded");

        setTimeout(() => {

            loader.remove();

        }, 600);

    });

},

/*==================================================
BACK TO TOP
==================================================*/

backToTop() {

    const button = document.querySelector(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        button.classList.toggle("show", window.scrollY > 500);

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

},

/*==================================================
TECH MARQUEE
==================================================*/

techMarquee() {

    const track = document.querySelector(".tech-track");

    if (!track) return;

    let position = 0;

    function animate() {

        position -= 0.5;

        if (Math.abs(position) >= track.scrollWidth / 2) {

            position = 0;

        }

        track.style.transform = `translateX(${position}px)`;

        requestAnimationFrame(animate);

    }

    animate();

},

/*==================================================
LAZY IMAGE FADE
==================================================*/

lazyImages() {

    const images = document.querySelectorAll("img");

    if (!images.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("image-visible");

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.15

    });

    images.forEach(img => observer.observe(img));

},

/*==================================================
PERFORMANCE
==================================================*/

performance() {

    let ticking = false;

    window.addEventListener("scroll", () => {

        if (ticking) return;

        requestAnimationFrame(() => {

            ticking = false;

        });

        ticking = true;

    });

},

/*==================================================
ERROR HANDLER
==================================================*/

errorHandler() {

    window.addEventListener("error", event => {

        console.warn("[NOCTIS]", event.message);

    });

}

});

/*==================================================
RUN PART 4
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    NT.utilities();

});

/*==================================================
NOCTIS INDEX.JS
VERSION 2.0
NO NAVIGATION
END
==================================================*/