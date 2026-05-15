gsap.registerPlugin(ScrollTrigger);

// markers animation (guard existence)
const markers = document.querySelectorAll('.part li .marker');
if (markers && markers.length) {
    markers.forEach(e => {
        gsap.to(e, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
        });
    });

    gsap.to(markers, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        stagger: {
            amount: 1,
            from: 'random'
        }
    });
}

const memberSection = document.querySelector('section.member');
const memberSide = document.querySelector('section.member .side');

// Use matchMedia to pin only on desktop
const mm = gsap.matchMedia();
mm.add('(min-width: 974px)', () => {
    if (!memberSection || !memberSide) return;

    const slideTl = gsap.timeline({
        scrollTrigger: {
            trigger: memberSection,
            scroller: 'body',
            pin: memberSide,
            start: 'top top',
            end: 'bottom 150%',
            invalidateOnRefresh: true,
            pinSpacing: true
        }
    });

    return () => {
        slideTl.scrollTrigger?.kill();
        slideTl.kill();
    };
});