gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.part li .marker').forEach(e => {
    gsap.to(e , {
        scale: 1,
        opacity : 1,
        duration : .2,
    })
})

gsap.to('.part li .marker' , {
    scale: 1,
    opacity : 1,
    duration : .2,
    stagger: {
        amount : 1,
        from : 'random',
    },
})


const slideTl = gsap.timeline(  {
    scrollTrigger: {
        trigger: "",
        scroller: 'body',
        pin: "section.member .side",
        start: "top top",
        end: "bottom 150%",
    },
});