/**
 * UNBEATABLE MASTER SEO ENGINE v7.0
 * One script to rule them all – injects meta, geo, OG, Twitter, and a mega @graph.
 * Auto‑detects page type and tailors everything.
 * Deploy on EVERY HTML page AND in InfinityFree root for PHP-generated pages.
 */
(function() {
    'use strict';

    // =============================================================
    // 1. BRAND CONFIGURATION – EDIT THESE TO MATCH YOUR BUSINESS
    // =============================================================
    const BRAND = {
        name: 'Noctis Technologies',
        url: 'https://www.noctistechnologies.gt.tc',
        phone: '+919543128730',
        email: 'mr.samimmanuel.j@gmail.com',
        address: {
            street: 'Mangalam',
            city: 'Tirupur',
            state: 'Tamil Nadu',
            postalCode: '641604',
            country: 'India'
        },
        geo: { lat: '11.1075', lng: '77.3398' },
        price: '1999',
        currency: 'INR',
        ratingValue: '4.9',
        reviewCount: '47',
        founder: 'Sam Immanuel J',
        seniorDev: 'Esther Jebarani',
        areasServed: [
            'Tirupur', 'Dindigul', 'Coimbatore', 'Erode', 'Salem', 'Madurai',
            'Chennai', 'Tiruchirappalli', 'Tanjore', 'Kanyakumari', 'Vellore',
            'Ranipet', 'Kancheepuram', 'Thoothukudi', 'Virudhunagar', 'Ramanathapuram',
            'Sivaganga', 'Pudukkottai', 'Nagapattinam', 'Thanjavur', 'Namakkal',
            'Dharmapuri', 'Krishnagiri', 'Hosur', 'Bangalore', 'Hyderabad', 'Mumbai',
            'Delhi', 'Pune', 'Ahmedabad', 'Kolkata', 'Surat', 'Jaipur', 'Lucknow',
            'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Vijayawada',
            'Goa', 'Chandigarh', 'Noida', 'Gurugram', 'Kerala', 'Kochi', 'Trivandrum',
            'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand',
            'Germany', 'France', 'Netherlands', 'Singapore', 'Malaysia', 'Dubai', 'UAE',
            'Saudi Arabia', 'South Africa', 'Kenya', 'Nigeria'
        ],
        services: [
            'Website Development', 'UI/UX Design', 'E‑Commerce Development',
            'Landing Page Development', 'Portfolio Website', 'AI Solutions',
            'SEO Optimization', 'Web Applications', 'Business Automation',
            'Website Redesign', 'Digital Consultation', 'Branding & Creative',
            'Admin Panel Development', 'Website Maintenance'
        ],
        faqs: [
            {
                q: 'What services does Noctis Technologies provide?',
                a: 'We provide website development, UI/UX design, landing pages, business websites, web applications, AI solutions, automation, SEO optimization, website redesign, maintenance, and custom software development.'
            },
            {
                q: 'How much does a website cost?',
                a: 'Our website packages start from ₹1,999. The final price depends on your business requirements, features, pages, and integrations. We also provide a free consultation to recommend the best solution.'
            },
            {
                q: 'How long does it take to complete a website?',
                a: 'Most websites are completed within 3–15 business days, depending on the project size, required features, content availability, and revision requests.'
            },
            {
                q: 'Can you redesign my existing website?',
                a: 'Yes. We redesign outdated websites with modern UI/UX, improved speed, mobile responsiveness, SEO enhancements, and updated functionality while preserving your business identity.'
            },
            {
                q: 'Do you provide support after launch?',
                a: 'Yes. We provide ongoing maintenance, security updates, performance optimization, bug fixes, feature enhancements, and technical support to keep your website running smoothly.'
            }
        ]
    };

    // =============================================================
    // 2. PAGE DETECTION
    // =============================================================
    const path = window.location.pathname.toLowerCase();
    let pageType = 'home';
    if (path.includes('about')) pageType = 'about';
    else if (path.includes('solutions')) pageType = 'solutions';
    else if (path.includes('portfolio')) pageType = 'portfolio';
    else if (path.includes('pricing')) pageType = 'pricing';
    else if (path.includes('team')) pageType = 'team';
    else if (path.includes('contact')) pageType = 'contact';
    else if (path.includes('services')) pageType = 'services';

    // =============================================================
    // 3. DYNAMIC TITLE & DESCRIPTION
    // =============================================================
    let title, desc;
    switch (pageType) {
        case 'about':
            title = 'About Noctis Technologies | Founder Sam Immanuel J – Premium Web Development';
            desc = 'Learn about Noctis Technologies, founded by Sam Immanuel J. We deliver modern websites, AI solutions, and digital experiences for businesses in Tirupur, Dindigul, Tamil Nadu, and worldwide.';
            break;
        case 'solutions':
            title = 'AI & Website Solutions | Noctis Technologies – Digital Transformation';
            desc = 'Explore AI‑powered digital solutions, business websites, e‑commerce, booking systems, admin panels, and complete digital transformation services. Starting at ₹1,999.';
            break;
        case 'portfolio':
            title = 'Portfolio | Noctis Technologies – Web Design & Development Projects';
            desc = 'Showcase of modern websites, e‑commerce platforms, educational portals, and responsive business projects developed by Noctis Technologies.';
            break;
        case 'pricing':
            title = 'Website Pricing from ₹1,999 | Noctis Technologies – Transparent & Affordable';
            desc = 'Explore transparent website development pricing from ₹1,999. Compare SEO, branding, domain, email, admin panels, integrations, and maintenance plans.';
            break;
        case 'team':
            title = 'Core Team | Noctis Technologies – Web Development, UI/UX, Backend & Support';
            desc = 'Meet the Core Team behind Noctis Technologies – experts in web development, UI/UX, backend engineering, finance, and customer success.';
            break;
        case 'contact':
            title = 'Contact Noctis Technologies | Get a Free Quote for Your Website';
            desc = 'Contact us for website development, UI/UX design, SEO, branding, maintenance, and custom digital solutions. Serving Tirupur, Dindigul, and global clients.';
            break;
        case 'services':
            title = 'Services | Noctis Technologies – AI, Website Development & Digital Solutions';
            desc = 'Discover AI solutions, premium website development, web applications, UI/UX design, SEO, business automation, and digital consultation. Starting at ₹1,999.';
            break;
        default: // home
            title = '#1 Web Design in Tirupur & Dindigul | Noctis Technologies – Starting ₹1,999';
            desc = 'Get premium, responsive websites starting at just ₹1,999. Noctis Technologies is the leading web development agency serving Tirupur, Dindigul, Tamil Nadu, and 50+ countries worldwide. Free quote today!';
    }

    // =============================================================
    // 4. INJECT META TAGS
    // =============================================================
    function injectMetaTags() {
        const metas = [
            { name: 'title', content: title },
            { name: 'description', content: desc },
            { name: 'keywords', content: BRAND.services.join(', ') + ', Noctis Technologies, Web Design Tirupur, Website Development Dindigul, Digital Solutions India, Website Cost ₹1999' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'geo.region', content: 'IN-TN' },
            { name: 'geo.position', content: BRAND.geo.lat + ';' + BRAND.geo.lng },
            { name: 'ICBM', content: BRAND.geo.lat + ', ' + BRAND.geo.lng },
            { name: 'geo.placename', content: BRAND.address.city + ', ' + BRAND.address.state },
            { property: 'og:title', content: title },
            { property: 'og:description', content: desc },
            { property: 'og:url', content: window.location.href },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: BRAND.name },
            { property: 'og:image', content: BRAND.url + '/og-image.jpg' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:price:amount', content: BRAND.price },
            { property: 'og:price:currency', content: BRAND.currency },
            { property: 'og:availability', content: 'instock' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: desc },
            { name: 'twitter:image', content: BRAND.url + '/og-image.jpg' },
            { httpEquiv: 'content-language', content: 'en, ta' },
            { name: 'revisit-after', content: '7 days' }
        ];

        metas.forEach(meta => {
            let el;
            if (meta.name) {
                el = document.querySelector(`meta[name="${meta.name}"]`);
                if (!el) {
                    el = document.createElement('meta');
                    el.name = meta.name;
                    document.head.appendChild(el);
                }
                el.content = meta.content;
            } else if (meta.property) {
                el = document.querySelector(`meta[property="${meta.property}"]`);
                if (!el) {
                    el = document.createElement('meta');
                    el.setAttribute('property', meta.property);
                    document.head.appendChild(el);
                }
                el.content = meta.content;
            } else if (meta.httpEquiv) {
                el = document.querySelector(`meta[http-equiv="${meta.httpEquiv}"]`);
                if (!el) {
                    el = document.createElement('meta');
                    el.httpEquiv = meta.httpEquiv;
                    document.head.appendChild(el);
                }
                el.content = meta.content;
            }
        });

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.href.split('?')[0];
    }

    // =============================================================
    // 5. INJECT MEGA JSON-LD @GRAPH
    // =============================================================
    function injectSchema() {
        // Remove existing conflicting schemas
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
            try {
                const content = JSON.parse(script.textContent);
                if (content['@type'] === 'Organization' || content['@type'] === 'WebSite' ||
                    content['@type'] === 'WebPage' || content['@type'] === 'BreadcrumbList' ||
                    content['@type'] === 'OfferCatalog' || content['@type'] === 'Offer' ||
                    content['@type'] === 'Product' || content['@type'] === 'ProfessionalService' ||
                    content['@type'] === 'Service' || content['@type'] === 'FAQPage' ||
                    content['@type'] === 'AboutPage' || content['@type'] === 'ContactPage' ||
                    content['@type'] === 'CollectionPage' || content['@type'] === 'Person' ||
                    content['@type'] === 'LocalBusiness' || content['@type'] === 'ItemList') {
                    script.remove();
                }
            } catch (e) {}
        });

        const origin = BRAND.url;
        const currentUrl = window.location.href;
        const graph = [];

        // --- UNIVERSAL ENTITIES ---
        // 1. LocalBusiness
        graph.push({
            "@type": "LocalBusiness",
            "name": BRAND.name,
            "url": origin,
            "image": origin + "/favicon.svg",
            "telephone": BRAND.phone,
            "email": BRAND.email,
            "priceRange": "₹₹",
            "paymentAccepted": "UPI, Credit Card, Debit Card, Net Banking, Cash",
            "openingHours": "Mo-Su 09:00-21:00",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": BRAND.address.street,
                "addressLocality": BRAND.address.city,
                "addressRegion": BRAND.address.state,
                "postalCode": BRAND.address.postalCode,
                "addressCountry": BRAND.address.country
            },
            "geo": { "@type": "GeoCoordinates", "latitude": BRAND.geo.lat, "longitude": BRAND.geo.lng },
            "areaServed": BRAND.areasServed
        });

        // 2. Product
        graph.push({
            "@type": "Product",
            "name": "Professional Business Website",
            "description": "Fully responsive, SEO‑optimized, and mobile‑friendly website starting at ₹1,999.",
            "brand": { "@type": "Brand", "name": BRAND.name },
            "offers": {
                "@type": "Offer",
                "price": BRAND.price,
                "priceCurrency": BRAND.currency,
                "availability": "https://schema.org/InStock",
                "validFrom": "2025-01-01",
                "url": origin + "/pricing.html"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": BRAND.ratingValue,
                "reviewCount": BRAND.reviewCount,
                "bestRating": "5",
                "worstRating": "1"
            }
        });

        // 3. Service
        graph.push({
            "@type": "Service",
            "name": "Digital Technology Solutions",
            "description": "Premium websites, AI, UI/UX, e‑commerce, and automation for businesses in Tirupur, Dindigul, Tamil Nadu, and worldwide.",
            "serviceType": BRAND.services,
            "provider": { "@type": "LocalBusiness", "name": BRAND.name },
            "areaServed": "Worldwide"
        });

        // 4. FAQPage
        graph.push({
            "@type": "FAQPage",
            "mainEntity": BRAND.faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        });

        // 5. BreadcrumbList
        const breadcrumbItems = [{ "@type": "ListItem", "position": 1, "name": "Home", "item": origin }];
        let pageName = 'Home';
        switch (pageType) {
            case 'about': pageName = 'About'; break;
            case 'services': pageName = 'Services'; break;
            case 'solutions': pageName = 'Solutions'; break;
            case 'portfolio': pageName = 'Portfolio'; break;
            case 'pricing': pageName = 'Pricing'; break;
            case 'team': pageName = 'Team'; break;
            case 'contact': pageName = 'Contact'; break;
        }
        if (pageType !== 'home') {
            breadcrumbItems.push({ "@type": "ListItem", "position": 2, "name": pageName, "item": currentUrl });
        }
        graph.push({ "@type": "BreadcrumbList", "itemListElement": breadcrumbItems });

        // --- PAGE‑SPECIFIC ENTITIES ---
        switch (pageType) {
            case 'about':
                graph.push({
                    "@type": "AboutPage",
                    "name": "About Noctis Technologies",
                    "description": "Learn about our mission, values, and the team behind Noctis Technologies.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                graph.push({
                    "@type": "Person",
                    "name": BRAND.founder,
                    "jobTitle": "Founder & Developer",
                    "worksFor": { "@type": "Organization", "name": BRAND.name }
                });
                graph.push({
                    "@type": "Person",
                    "name": BRAND.seniorDev,
                    "jobTitle": "Senior Developer",
                    "worksFor": { "@type": "Organization", "name": BRAND.name }
                });
                break;

            case 'solutions':
                graph.push({
                    "@type": "WebPage",
                    "name": "Digital Solutions",
                    "description": "AI‑powered tools, business automation, web applications, and custom software.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                break;

            case 'portfolio':
                graph.push({
                    "@type": "CollectionPage",
                    "name": "Portfolio",
                    "description": "Explore our recent work: business websites, e‑commerce, AI applications, and custom digital solutions.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                graph.push({
                    "@type": "CreativeWork",
                    "name": "Central & Stores – E-Commerce Website",
                    "description": "A modern digital shopping experience designed for a growing retail business.",
                    "author": { "@type": "Organization", "name": BRAND.name }
                });
                graph.push({
                    "@type": "CreativeWork",
                    "name": "Justin Scholarship Portal",
                    "description": "A streamlined digital experience designed to simplify scholarship assistance.",
                    "author": { "@type": "Organization", "name": BRAND.name }
                });
                break;

            case 'pricing':
                graph.push({
                    "@type": "WebPage",
                    "name": "Pricing",
                    "description": "Transparent website development pricing starting at ₹1,999. SEO, branding, domain, email, admin panels, integrations, and maintenance.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                graph.push({
                    "@type": "OfferCatalog",
                    "name": "Noctis Technologies Pricing – Complete Digital Services",
                    "url": currentUrl,
                    "description": "Transparent pricing for website development, SEO, branding, domain, email, admin panels, integrations, and maintenance.",
                    "provider": { "@type": "LocalBusiness", "name": BRAND.name }
                });
                break;

            case 'team':
                graph.push({
                    "@type": "WebPage",
                    "name": "Our Team",
                    "description": "Meet the passionate developers, finance experts, and customer success professionals behind Noctis Technologies.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });

                // 1. Sam Immanuel J
                graph.push({
                    "@type": "Person",
                    "name": "Sam Immanuel J",
                    "givenName": "Sam",
                    "familyName": "Immanuel J",
                    "alternateName": ["Sam Thomas", "Sam Tirupur", "Sam J"],
                    "jobTitle": "Founder & Lead Developer",
                    "description": "Passionate about building premium websites with modern technologies, responsive user interfaces, and exceptional digital experiences. Leads the development team at Noctis Technologies.",
                    "worksFor": { "@type": "Organization", "name": BRAND.name },
                    "memberOf": { "@type": "Organization", "name": BRAND.name },
                    "url": origin + "/team.html",
                    "sameAs": [
                        "https://www.linkedin.com/in/sam-immanuel-j",
                        "https://www.instagram.com/thomaz.pvt"
                    ],
                    "knowsAbout": ["HTML", "CSS", "JavaScript", "Responsive UI", "UI/UX", "Website Architecture"]
                });

                // 2. Esther Jebarani
                graph.push({
                    "@type": "Person",
                    "name": "Esther Jebarani J",
                    "givenName": "Esther",
                    "familyName": "Jebarani J",
                    "jobTitle": "Backend Developer",
                    "description": "Experienced backend developer specializing in secure, scalable, and high-performance server-side applications. Focused on reliability, database management, and API development.",
                    "worksFor": { "@type": "Organization", "name": BRAND.name },
                    "memberOf": { "@type": "Organization", "name": BRAND.name },
                    "url": origin + "/team.html",
                    "sameAs": [
                        "https://www.linkedin.com/in/esther-jebarani",
                        "https://www.instagram.com/im_s_ther"
                    ],
                    "knowsAbout": ["Backend", "Database", "API", "Security", "Performance"]
                });

                // 3. Milton Prabhu
                graph.push({
                    "@type": "Person",
                    "name": "Milton Prabhu J",
                    "givenName": "Milton",
                    "familyName": "Prabhu J",
                    "jobTitle": "Finance Manager",
                    "description": "Responsible for financial planning, budgeting, operational strategy, and maintaining sustainable financial growth while supporting business decision-making.",
                    "worksFor": { "@type": "Organization", "name": BRAND.name },
                    "memberOf": { "@type": "Organization", "name": BRAND.name },
                    "url": origin + "/team.html",
                    "sameAs": [
                        "https://www.linkedin.com/in/milton-prabhu",
                        "https://www.instagram.com/mr.dusky_boy_"
                    ],
                    "knowsAbout": ["Finance", "Accounting", "Planning", "Management", "Operations"]
                });

                // 4. Pradeep Kumar
                graph.push({
                    "@type": "Person",
                    "name": "Pradeep Kumar N",
                    "givenName": "Pradeep",
                    "familyName": "Kumar N",
                    "jobTitle": "Customer Service Executive",
                    "description": "Dedicated to delivering excellent customer support, building strong client relationships, resolving queries efficiently, and ensuring customer satisfaction.",
                    "worksFor": { "@type": "Organization", "name": BRAND.name },
                    "memberOf": { "@type": "Organization", "name": BRAND.name },
                    "url": origin + "/team.html",
                    "sameAs": [
                        "https://www.linkedin.com/in/pradeep-kumar-n",
                        "https://www.instagram.com/_bloody_eye_"
                    ],
                    "knowsAbout": ["Communication", "Support", "CRM", "Problem Solving", "Customer Care"]
                });
                break;

            case 'contact':
                graph.push({
                    "@type": "ContactPage",
                    "name": "Contact Us",
                    "description": "Get a free consultation for your website, AI, or digital project. Serving Tirupur, Dindigul, and global clients.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                graph.push({
                    "@type": "ContactPoint",
                    "telephone": BRAND.phone,
                    "email": BRAND.email,
                    "contactType": "Sales",
                    "availableLanguage": ["English", "Tamil"],
                    "hoursAvailable": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "09:00",
                        "closes": "21:00"
                    }
                });
                break;

            case 'services':
                graph.push({
                    "@type": "WebPage",
                    "name": "Services",
                    "description": "Full range of digital services: custom websites, AI solutions, UI/UX design, e‑commerce platforms, and business automation.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
                break;

            default: // home
                graph.push({
                    "@type": "WebPage",
                    "name": "Home",
                    "description": "Noctis Technologies delivers premium website development, UI/UX design, AI-powered digital solutions, business websites, and e-commerce platforms.",
                    "url": currentUrl,
                    "isPartOf": { "@type": "WebSite", "name": BRAND.name, "url": origin }
                });
        }

        // Inject the graph
        const megaScript = document.createElement('script');
        megaScript.type = 'application/ld+json';
        megaScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph
        });
        document.head.appendChild(megaScript);

        console.log(`🔥 SEO Master injected ${graph.length} entities on ${pageType} page.`);
    }

    // =============================================================
    // 6. HYPER-LOCAL H1 INJECTION (IP-based city detection)
    // =============================================================
    function injectLocalizedHeading() {
        try {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data.city) {
                        const h1 = document.querySelector('h1');
                        if (h1 && !h1.innerHTML.includes(data.city)) {
                            const span = document.createElement('span');
                            span.style.cssText = 'display:block; font-size:0.7em; font-weight:300; color:var(--primary); margin-top:8px;';
                            span.textContent = `Serving businesses in ${data.city}, ${data.region || 'Tamil Nadu'} & worldwide.`;
                            h1.parentNode.insertBefore(span, h1.nextSibling);
                        }
                    }
                })
                .catch(() => {});
        } catch (e) {}
    }

    // =============================================================
    // 7. ENGAGEMENT BEACONS
    // =============================================================
    function injectBeacons() {
        let startTime = Date.now();
        let maxScroll = 0;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                const dwell = Date.now() - startTime;
                navigator.sendBeacon('/seo-engine.php?dwell=' + dwell);
            }
        });

        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = Math.round((window.scrollY / docHeight) * 100);
            if (pct > maxScroll) {
                maxScroll = pct;
                if ([25, 50, 75, 100].includes(pct)) {
                    navigator.sendBeacon('/seo-engine.php?scroll=' + pct);
                }
            }
        });
    }

    // =============================================================
    // 8. PREFETCH CRITICAL PAGES
    // =============================================================
    function prefetchResources() {
        const pages = ['/', '/services.html', '/pricing.html', '/portfolio.html', '/contact.html'];
        pages.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // =============================================================
    // 9. INITIATE
    // =============================================================
    function init() {
        injectMetaTags();
        injectSchema();
        injectLocalizedHeading();
        injectBeacons();
        prefetchResources();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
