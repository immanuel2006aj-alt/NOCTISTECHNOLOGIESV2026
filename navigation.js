document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const progress = document.querySelector(".scroll-progress");

    /* Mobile Menu */
    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                menuToggle.classList.contains("active")
            );

        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded","false");

            });

        });

    }

    /* Sticky Header + Progress */

    window.addEventListener("scroll", () => {

        if(header){

            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        }

        if(progress){

            const percent =
                (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            progress.style.width = percent + "%";

        }

    });

    /* Active Page */

    const current =
        location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a, .mobile-menu a")
    .forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle("active", href === current);

    });

    /* ESC */

    document.addEventListener("keydown", e => {

        if(e.key === "Escape" && mobileMenu){

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded","false");

        }

    });

    /* Resize */

    window.addEventListener("resize", () => {

        if(window.innerWidth > 992 && mobileMenu){

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded","false");

        }

    });

});