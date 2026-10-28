(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateOnScroll(targets, trigger, options = {}) {
        const elements = gsap.utils.toArray(targets).filter(Boolean);
        const triggerElement = typeof trigger === 'string'
            ? document.querySelector(trigger)
            : trigger;

        if (elements.length === 0 || !triggerElement) return;

        gsap.from(elements, {
            autoAlpha: 0,
            y: prefersReducedMotion ? 0 : options.y ?? 28,
            duration: prefersReducedMotion ? 0.2 : options.duration ?? 0.65,
            stagger: prefersReducedMotion ? 0 : options.stagger ?? 0.1,
            ease: options.ease ?? 'power2.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: triggerElement,
                start: options.start ?? 'top 82%',
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

    if (serviceLabel) {
        serviceLabel.textContent = welcomeServices[0];

        const serviceTimeline = gsap.timeline({ repeat: -1 });
        welcomeServices.forEach((service) => {
            serviceTimeline.to(serviceLabel, {
                autoAlpha: 0,
                y: prefersReducedMotion ? 0 : -8,
                duration: prefersReducedMotion ? 0.12 : 0.2,
                delay: 2,
                ease: 'power1.in'
            });
            serviceTimeline.call(() => {
                serviceLabel.textContent = service;
            });
            serviceTimeline.fromTo(serviceLabel, {
                autoAlpha: 0,
                y: prefersReducedMotion ? 0 : 8
            }, {
                autoAlpha: 1,
                y: 0,
                duration: prefersReducedMotion ? 0.18 : 0.3,
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

    const excludedTitleSections = [
        'welcome',
        'text-slider',
        'expertise',
        'benifits-parts',
        'collaborate'
    ];

    document.querySelectorAll('section').forEach((section) => {
        if (excludedTitleSections.some((className) => section.classList.contains(className))) return;
        const title = section.querySelector('.title');
        if (title) animateOnScroll(title, section, { y: 24, stagger: 0 });
    });

    const aboutSection = document.querySelector('section.about');
    const aboutText = aboutSection?.querySelector('.text');

    if (aboutSection) {
        animateOnScroll(aboutSection.querySelectorAll('.benifits .cards .card'), aboutSection, {
            start: 'top 68%',
            stagger: 0.12
        });
        animateOnScroll(aboutSection.querySelector('.text > .btn'), aboutSection, {
            start: 'top 68%',
            stagger: 0
        });
    }

    if (aboutSection && aboutText && !prefersReducedMotion) {
        const media = gsap.matchMedia();
        media.add('(min-width: 974px)', () => {
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

    const servicesSection = document.querySelector('section.services');
    if (servicesSection) {
        animateOnScroll(servicesSection.querySelectorAll('.boxes .box'), servicesSection, {
            stagger: 0.12
        });
    }

    const expertiseSection = document.querySelector('section.expertise');
    if (expertiseSection) {
        animateOnScroll(expertiseSection.querySelector('.holder .text'), expertiseSection);
        animateOnScroll(expertiseSection.querySelectorAll('.holder .boxes .box'), expertiseSection, {
            stagger: 0.12
        });
    }

    const whySection = document.querySelector('section.why');
    if (whySection) {
        animateOnScroll(whySection.querySelectorAll('.benifits .benifit'), whySection, {
            stagger: 0.1
        });
        animateOnScroll(whySection.querySelector('.img img'), whySection, { y: 20 });
    }

    const sectionAnimations = [
        ['section.join', '.boxes .box'],
        ['section.how', '.cards .card'],
        ['section.portfolio', '.categories .category, .cards .card'],
        ['section.testimonials', '.final-rate p, .final-rate .imgs .img'],
        ['section.key-benifit', '.boxes .box']
    ];

    sectionAnimations.forEach(([sectionSelector, targetsSelector]) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;
        animateOnScroll(section.querySelectorAll(targetsSelector), section, {
            stagger: 0.1
        });
    });

    const collaborateSection = document.querySelector('section.collaborate');
    if (collaborateSection) {
        animateOnScroll(collaborateSection.querySelector('h2'), collaborateSection, {
            y: 18,
            stagger: 0
        });
    }
})();