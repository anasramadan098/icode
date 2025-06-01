const cursor = document.querySelector('.cursor');

document.body.addEventListener('mousemove', (e) => {
    gsap.to(cursor , {
        x: e.pageX - 10 ,
        y: e.pageY - 10 ,
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