gsap.registerPlugin(ScrollTrigger);
// Text Plugin
// Cursor




const welcomeServices = [
  'مواقع تعريفية احترافية',
  'صفحات هبوط عالية التحويل',
  'متاجر إلكترونية متكاملة',
  'أنظمة حجوزات ذكية (فنادق/مطاعم)',
  'أنظمة ERP و CRM مخصصة'
];

const serviceSpan = document.querySelector('section.welcome .serviceSpanAnimation');

// Animate (guard existence)
if (serviceSpan) {
    setInterval(() => {
        const randomService = welcomeServices[Math.floor(Math.random() * welcomeServices.length)];
        serviceSpan.textContent = randomService;
    }, 2600);
}

// IMGs
// document.querySelectorAll('img').forEach( img => {
//     img.addEventListener('mouseover', () => {
//         gsap.from( cursor , {
//             scale:5,
//             ease: 'elastic.out',
//             opacity: .5,
//             overwrite: true,
//         })
//     })
//     img.addEventListener('mouseout', () => {
//         gsap.from(cursor , {
//             scale:1,
//             ease: 'elastic.out',
//             opacity: 1,
//             overwrite: true,
//         })
//     })
// })




document.querySelectorAll('.link-drop-menu').forEach(link => {

    const dropDown = link.querySelector('.drop-down');

    
    link.addEventListener('mouseenter', () => {

        dropDown.classList.add('show');
        gsap.from( dropDown , {
            duration: .3,
            y: -20,
            opacity: 0,
            ease: 'ease-in-out'
        })
    })
    link.addEventListener('mouseleave', () => {
        dropDown.classList.remove('show');
    })
})


// Side Nav (guard existence)
const sideNav = document.querySelector('.side-nav');
const menuToogller = document.querySelector('.menuToogller');
let tl = null;
if (sideNav && menuToogller) {
    tl = gsap.timeline({ paused: true });

    tl.to(sideNav, {
        x: 0,
        duration: 0.6,
        ease: 'power.inOut'
    });

    const closeBtn = sideNav.querySelector('.close');
    if (closeBtn) {
        tl.from(closeBtn, {
            y: 30,
            opacity: 0,
            duration: 0.3,
            ease: 'power.Out',
        });
        closeBtn.addEventListener('click', () => tl.reverse());
    }

    const boxes = sideNav.querySelectorAll('.boxes .box');
    if (boxes.length) {
        tl.from(boxes, {
            y: 30,
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: 'power.Out',
            stagger: 0.3
        });
    }

    menuToogller.addEventListener('click', () => tl.play());
}


document.querySelectorAll('section:not(.welcome, .text-slider, .expertise, .benifits-parts , .collaborate)').forEach(section => {
    const title = section.querySelector('.title');
    if (!title) return;

    gsap.from(title, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'easeOut',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
        }
    });
});



const aboutSection = document.querySelector('section.about');
const aboutText = aboutSection?.querySelector('.text');

if (aboutSection) {
    animateTheMultipleElements('section.about .benifits .cards .card', aboutSection, 'easeinear');

    const aboutHead = aboutSection.querySelector('.text .head');
    if (aboutHead) {
        gsap.from(aboutHead, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: 'easeinear',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 60%'
            }
        });
    }

    const aboutLink = aboutSection.querySelector('.text a');
    if (aboutLink) {
        gsap.from(aboutLink, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: 'easeinear',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 60%'
            }
        });
    }
}


const mm = gsap.matchMedia();

// Desktop only: pin the about text section (disable on small screens)
mm.add('(min-width: 974px)', () => {
    if (!aboutSection || !aboutText) return;

    const desktopTl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            scroller: 'body',
            pin: aboutText,
            start: 'top top',
            end: 'bottom -3%',
            pinSpacing: true,
            invalidateOnRefresh: true
        }
    });

    return () => {
        desktopTl.scrollTrigger?.kill();
        desktopTl.kill();
    };
});





const servicesSection = document.querySelector('section.services');



// gsap.from('section.services .boxes' , {
//     opacity : 1,
//     y : 100,
//     duration: 1,
//     ease: 'easeinear',
//     scrollTrigger : {
//         trigger: servicesSection,
//         start: "top 80%",
//     },
// })
animateTheMultipleElements(document.querySelectorAll('section.services .boxes .box') , 'section.services' , 'easeinear');

gsap.from(servicesSection.querySelector('.text'), {
    y : -100,
    opacity : 0,
    duration: .7,
    ease: 'power2.in',
    scrollTrigger : {
        trigger: servicesSection,
        start: "top 80%",
    },
        
})



gsap.from('section.expertise .holder .text' , {
    y : 100,
    opacity : 0,
    duration: 1,
    ease: 'power2.in',
    scrollTrigger : {
        trigger: 'section.expertise',
        start: "top 80%",
    },
})

animateTheMultipleElements('section.expertise .holder .boxes .box' , 'section.expertise');
// gsap.from('section.expertise .holder .boxes .box' , {
//     y : 100,
//     opacity : 0,
//     duration: 1,
//     stagger:.3,
//     ease: 'easeOutExpo',
//     scrollTrigger : {
//         trigger: 'section.expertise',
//         start: "top 80%",
//     },
// } )

animateTheMultipleElements(document.querySelectorAll('section.why .benifits .benifit') , 'section.why');


gsap.from('section.why .img img' , {
    x : -100,
    opacity : 0,
    duration: 1,
    ease: 'easeOut',
    scrollTrigger : {
        trigger: 'section.why',
        start: "top 80%",
    },
})


// gsap.from('section.join .boxes .box' , {
//     y : 0,
//     opacity : 0,
// })

// gsap.to('section.join .boxes .box' , {
//     y : 100,
//     opacity : 1,
//     duration: 1,
//     stagger:.3,
//     ease: 'easeOut',
//     scrollTrigger : {
//         trigger: 'section.join',
//         start: "top 80%",
//     },
// })

animateTheMultipleElements('section.join .boxes .box' , 'section.join');



// gsap.to('section.how .cards .card' , {
//     y : -100,
//     opacity : 1,
//     duration: 1,
//     stagger:.3,
//     ease: 'easeOut',
//     scrollTrigger : {
//         trigger: 'section.how',
//         start: "top 80%",
//     },
// })

animateTheMultipleElements('section.how .cards .card' , 'section.how');


animateTheMultipleElements('section.portfolio .categories .category' , 'section.portfolio' , 'power2.in');


gsap.from('section.testimonials .final-rate p' , {
    x: -100,
    y : 100,
    opacity : 0,
    duration: 1,
    ease: 'power2.in',
    scrollTrigger : {
        trigger: 'section.testimonials',
        start: 'top 80%',
    },
})

animateTheMultipleElements('section.testimonials .final-rate .imgs .img' , 'section.testimonials' , 'power2.in');
animateTheMultipleElements('section.key-benifit .boxes .box' , 'section.key-benifit');

gsap.from('section.collaborate h2' , {
    x: -100,
    opacity : 0,
    scale : 2,
    duration: 1,
    ease: 'power2.in',
    scrollTrigger : {
        trigger: 'section.collaborate',
        start: 'top 80%',
    },
})
function animateTheMultipleElements(elements, trigger, ease = 'back.in()') {
    const targets = gsap.utils.toArray(elements);
    const triggerElement = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;

    if (!targets.length || !triggerElement) return;

    gsap.from(targets, {
        y: 100,
        opacity: 0,
        delay: 0.2,
        duration: 0.7,
        stagger: {
            amount: 1,
            from: 'random'
        },
        ease
    });

    gsap.to(targets, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: triggerElement,
            start: 'top 80%',
            invalidateOnRefresh: true
        }
    });
}