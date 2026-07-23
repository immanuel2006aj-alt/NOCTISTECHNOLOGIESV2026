document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const revealElements = document.querySelectorAll(`
        .section-heading,
        .solutions-hero-content,
        .solutions-hero-visual,
        .workflow-item,
        .business-solution-card,
        .booking-intro-card,
        .booking-features-card,
        .clinic-solution-card,
        .industry-solution-card,
        .specialized-card,
        .custom-solution-card,
        .admin-panel-card,
        .faq-item
    `);

    /* ==========================================
       INITIAL STATE
    ========================================== */

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
    });

    /* ==========================================
       REVEAL OBSERVER
    ========================================== */

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }, index * 80);

            revealObserver.unobserve(entry.target);

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
    /* ==========================================
       HERO VISUAL FLOAT
    ========================================== */

    const heroCard = document.querySelector(".solutions-visual-card");

    if (heroCard) {

        let direction = 1;

        setInterval(() => {

            heroCard.style.transform =
                `translateY(${direction * 8}px)`;

            direction *= -1;

        }, 2200);

    }

    /* ==========================================
       WORKFLOW CARD HOVER
    ========================================== */

    document.querySelectorAll(".workflow-item").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";
            card.style.transition = "all .35s ease";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

    /* ==========================================
       CARD HOVER EFFECT
    ========================================== */

    document.querySelectorAll(`
        .business-solution-card,
        .industry-solution-card,
        .specialized-card,
        .admin-panel-card
    `).forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = "all .35s ease";
            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });
    /* ==========================================
       FAQ ACCORDION
    ========================================== */
document.querySelectorAll(".solutions-faq-question").forEach(question => {

    question.onclick = function () {

        const item = this.parentElement;
        const answer = item.querySelector(".solutions-faq-answer");

        document.querySelectorAll(".solutions-faq-item").forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
                faq.querySelector(".solutions-faq-answer").style.maxHeight = null;
            }

        });

        if (item.classList.contains("active")) {
            item.classList.remove("active");
            answer.style.maxHeight = null;
        } else {
            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

    };

});
    /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */

    const progressBar = document.querySelector(".scroll-progress");

    if (progressBar) {

        window.addEventListener("scroll", () => {

            const scrollTop = window.pageYOffset;
            const pageHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress = (scrollTop / pageHeight) * 100;

            progressBar.style.width = progress + "%";

        });

    }

});
