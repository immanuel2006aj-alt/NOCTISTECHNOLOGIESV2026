document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      SCROLL REVEAL
    =========================================*/

    const revealItems = document.querySelectorAll(`
        .section-heading,
        .pricing-card,
        .setup-card,
        .seo-card,
        .maintenance-card,
        .branding-card,
        .integration-card,
        .admin-card,
        .amc-card,
        .pricing-note,
        .setup-disclaimer,
        .seo-disclaimer,
        .creative-note,
        .integration-disclaimer,
        .admin-note,
        .amc-support-note,
        .faq-item
    `);

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        revealItems.forEach(item => revealObserver.observe(item));

    } else {

        revealItems.forEach(item => item.classList.add("show"));

    }


    /*=========================================
      FAQ ACCORDION
    =========================================*/

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        answer.style.maxHeight = "0px";
        answer.style.overflow = "hidden";
        answer.style.transition = "max-height .35s ease";

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            faqItems.forEach(faq => {

                faq.classList.remove("active");

                const ans = faq.querySelector(".faq-answer");

                if (ans) ans.style.maxHeight = "0px";

            });

            if (!isOpen) {

                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });


    /*=========================================
      SCROLL PROGRESS BAR
    =========================================*/

    const progress = document.querySelector(".scroll-progress");

    if (progress) {

        window.addEventListener("scroll", () => {

            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const percent =
                (window.scrollY / totalHeight) * 100;

            progress.style.width = percent + "%";

        });

    }
  
    /*=========================================
      PRICE COUNT ANIMATION
    =========================================*/

    const priceElements = document.querySelectorAll(`
        .hero-price strong,
        .service-price strong,
        .setup-price strong,
        .seo-price strong,
        .admin-price strong,
        .amc-price strong
    `);

    if ("IntersectionObserver" in window) {

        const priceObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const finalValue = parseInt(
                    element.textContent.replace(/[^\d]/g, "")
                );

                if (isNaN(finalValue)) {
                    observer.unobserve(element);
                    return;
                }

                let current = 0;
                const step = Math.max(1, Math.ceil(finalValue / 50));

                const timer = setInterval(() => {

                    current += step;

                    if (current >= finalValue) {

                        current = finalValue;
                        clearInterval(timer);

                    }

                    element.textContent = "₹" + current.toLocaleString();

                }, 20);

                observer.unobserve(element);

            });

        }, {
            threshold: 0.3
        });

        priceElements.forEach(price => priceObserver.observe(price));

    }


    /*=========================================
      SIMPLE CARD HOVER
    =========================================*/

    document.querySelectorAll(`
        .pricing-card,
        .setup-card,
        .seo-card,
        .maintenance-card,
        .branding-card,
        .integration-card,
        .admin-card,
        .amc-card
    `).forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = "transform .3s ease";
            card.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});