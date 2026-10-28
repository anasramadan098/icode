gsap.registerPlugin(ScrollTrigger);
// Text Plugin
gsap.registerPlugin(TextPlugin);
// Cursor

const cursor = document.querySelector('.cursor');

document.body.addEventListener('mousemove', (e) => {
    gsap.to(cursor , {
        x: e.pageX - 10,
        y: e.pageY - 10,
        ease: 'elastic.out',
        overwrite: true,
    })
})

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.from( cursor , {
            scale:0,
            ease: 'elastic.out',
            overwrite: true,
        })
    })
    link.addEventListener('mouseleave', () => {
        gsap.from(cursor , {
            scale:1,
            ease: 'elastic.out',
            overwrite: true,
        })
    })
})


const welcomeServices = [
    'Web Development',
    'App Development',
    'SEO',
    'Digital Marketing',
    'Content Writing',
    'Graphic Designing',
];

const serviceSpan = document.querySelector('section.welcome .serviceSpanAnimation');

// Animate
setInterval(() => {
    const randomService = welcomeServices[Math.floor(Math.random() * welcomeServices.length)];
    
    serviceSpan.textContent = randomService;
    
}, 2600);

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


// Side Nav
const sideNav = document.querySelector('.side-nav');
const menuToogller = document.querySelector('.menuToogller');
tl = gsap.timeline({paused: true});

tl.to(sideNav, {
    x : 0,
    duration: .6,
    ease: 'power.inOut'
})

tl.from(sideNav.querySelector('.close') , {
    y : 30,
    opacity : 0,
    duration: .3,
    ease: 'power.Out',
})

tl.from(sideNav.querySelectorAll('.boxes .box') , {
    y : 30,
    opacity : 0,
    duration: .3,
    delay:.2,
    ease: 'power.Out',
    stagger: .3
})

sideNav.querySelector('.close').addEventListener('click' , () => {
    tl.reverse();

})

menuToogller.addEventListener('click' , () => {
    tl.play();
})


document.querySelectorAll('section:not(.welcome, .text-slider, .expertise, .benifits-parts , .collaborate)').forEach( section => { 

    // Get The The Section Parent To The Title In Var
    const title = section.querySelector('.title');
    
    gsap.from(title, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'easeOut',
        // scrub : .1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        }
    })
});



const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: "",
        scroller: 'body',
        start: "top -5%",
        end: "bottom 0%",
    },
    
});
const aboutSection = document.querySelector('section.about');

animateTheMultipleElements('section.about .benifits .cards .card' , aboutSection , 'easeinear')


gsap.from(aboutSection.querySelector('.text .head') , {
    y : -100,
    opacity: 0,
    duration: .7,
    ease: 'easeinear',
    scrollTrigger: {
        trigger: aboutSection,
        start: "top 60%",
    },
})

gsap.from(aboutSection.querySelector('.text a') , {
    y : -100,
    opacity: 0,
    duration: .7,
    ease: 'easeinear',
    scrollTrigger: {
        trigger: aboutSection,
        start: "top 60%",
    },
})


const mm = gsap.matchMedia();

// Computer Screen
mm.add('(min-width: 974px) ' , () => {
    aboutTl.to(aboutSection , {
        scrollTrigger: {
            trigger: "",
            scroller: 'body',
            pin: "section.about .text",
            start: "top 5%",
            end: "bottom -3%",
          },
        }
    )
})





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
function animateTheMultipleElements(elements , trigger , ease = 'back.in()') {

    gsap.from(elements , {
        y : 100,
        opacity : 0,
        delay : .2,
        duration : .7,
        stagger: {
            amount : 1,
            from : 'random',
        },
        ease :ease,
    });

    gsap.to(elements , {
        y : 0,
        opacity : 1,
        scrollTrigger : {
            trigger: trigger,
            start: 'top 80%',
        },
    });

}