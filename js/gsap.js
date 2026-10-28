(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const contentSelector = [
        '.cards > .card',
        '.boxes > .box',
        '.benifits > .benifit',
        '.categories > .category',
        '.parts > .part',
        '.steps > .step',
        '.faq .accordion-item',
        '.service-holder .row > .img',
        '.service-holder .row > .list'
    ].join(', ');

    const animationProfiles = {
        about: { title: { x: -30 }, content: { x: 38 } },
        approach: { title: { y: 24 }, content: { scale: 0.9, y: 18 } },
        team: { title: { scale: 0.94 }, content: { y: 34, rotation: 1.5 } },
        services: { title: { x: 28 }, content: { scale: 0.86 } },
        expertise: { title: { y: -24 }, content: { x: -32, y: 12 } },
        why: { title: { scale: 0.92, y: 12 }, content: { x: 42 } },
        join: { title: { x: -24 }, content: { y: 40 } },
        how: { title: { y: 30 }, content: { x: -36, y: 8 } },
        portfolio: { title: { scale: 0.9 }, content: { scale: 0.82, y: 22 } },
        testimonials: { title: { x: 26 }, content: { y: 22, scale: 0.95 } },
        'benifits-parts': { title: { y: -22 }, content: { x: 34 } },
        'key-benifit': { title: { x: -28 }, content: { y: 32, rotation: -1.5 } },
        'faqSection': { title: { y: 18 }, content: { x: 30 } },
        'service-holder': { title: { x: 30 }, content: { y: 28, scale: 0.96 } },
        contact: { title: { scale: 0.94 }, content: { x: -28, y: 16 } },
        collaborate: { title: { y: 26, scale: 0.94 }, content: { y: 34 } },
        default: { title: { y: 24 }, content: { y: 28 } }
    };

    function animateOnScroll(elements, trigger, motion, options = {}) {
        const targets = gsap.utils.toArray(elements).filter(Boolean);

        if (targets.length === 0 || !trigger || prefersReducedMotion) return;

        gsap.from(targets, {
            autoAlpha: 0,
            ...motion,
            duration: options.duration ?? 0.6,
            stagger: options.stagger ?? 0.08,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
                trigger,
                start: 'top 84%',
                once: true,
                invalidateOnRefresh: true
            }
        });
    }

    const welcomeServices = [
        'مواقع تعريفية احترافية',
        'صفحات هبوط عالية التحويل',
        'متاجر إلكترونية متكاملة',
        'أنظمة حجوزات ذكية (فنادق/مطاعم)',
        'أنظمة ERP و CRM مخصصة'
    ];
    const serviceLabel = document.querySelector('section.welcome .serviceSpanAnimation');

    if (serviceLabel && !prefersReducedMotion) {
        serviceLabel.textContent = welcomeServices[0];

        const serviceTimeline = gsap.timeline({ repeat: -1 });
        welcomeServices.forEach((service) => {
            serviceTimeline.to(serviceLabel, {
                autoAlpha: 0,
                y: -8,
                duration: 0.2,
                delay: 2,
                ease: 'power1.in'
            });
            serviceTimeline.call(() => {
                serviceLabel.textContent = service;
            });
            serviceTimeline.fromTo(serviceLabel, {
                autoAlpha: 0,
                y: 8
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    document.querySelectorAll('.link-drop-menu').forEach((link) => {
        const dropdown = link.querySelector('.drop-down');
        if (!dropdown) return;

        link.addEventListener('mouseenter', () => {
            gsap.killTweensOf(dropdown);
            dropdown.classList.add('show');
            gsap.fromTo(dropdown, {
                autoAlpha: 0,
                y: -8
            }, {
                autoAlpha: 1,
                y: 0,
                duration: prefersReducedMotion ? 0 : 0.2,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(dropdown, {
                autoAlpha: 0,
                y: -8,
                duration: prefersReducedMotion ? 0 : 0.15,
                ease: 'power1.in',
                overwrite: 'auto',
                onComplete: () => {
                    if (link.matches(':hover')) return;
                    dropdown.classList.remove('show');
                    gsap.set(dropdown, { clearProps: 'opacity,visibility,transform' });
                }
            });
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        if (section.matches('.scroll-intro, .welcome, .text-slider')) return;

        const profileName = Object.keys(animationProfiles).find((name) =>
            name !== 'default' && section.classList.contains(name)
        );
        const profile = animationProfiles[profileName] ?? animationProfiles.default;
        const title = section.querySelector('.title, h2');
        if (title) {
            animateOnScroll(title, section, profile.title, { stagger: 0 });
        }

        animateOnScroll(section.querySelectorAll(contentSelector), section, profile.content, {
            stagger: section.matches('.portfolio, .approach, .team') ? 0.12 : 0.08
        });
    });

    window.addEventListener('portfolio:ready', () => {
        const portfolio = document.querySelector('section.portfolio');
        if (!portfolio) return;

        animateOnScroll(
            portfolio.querySelectorAll('.categories > .category'),
            portfolio,
            animationProfiles.portfolio.content,
            { stagger: 0.06 }
        );
        animateOnScroll(
            portfolio.querySelectorAll('.cards > .card'),
            portfolio,
            animationProfiles.portfolio.content,
            { stagger: 0.12 }
        );
    });

    const aboutSection = document.querySelector('section.about');
    const aboutText = aboutSection?.querySelector('.text');

    if (aboutSection && aboutText && !prefersReducedMotion) {
        gsap.matchMedia().add('(min-width: 974px)', () => {
            const pinTrigger = ScrollTrigger.create({
                trigger: aboutSection,
                pin: aboutText,
                start: 'top top',
                end: 'bottom -3%',
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            });

            return () => pinTrigger.kill();
        });
    }
})();
