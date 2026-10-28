(() => {
const header = document.querySelector('header');
if (header) {
    let lastScrollY = window.scrollY;
    let direction = 0;
    let directionDistance = 0;
    let scrollUpdateScheduled = false;

    const updateHeader = () => {
        const currentScrollY = Math.max(0, window.scrollY);
        const difference = currentScrollY - lastScrollY;

        if (currentScrollY <= 2) {
            header.classList.remove('is-hidden');
            direction = 0;
            directionDistance = 0;
        } else if (difference !== 0) {
            const nextDirection = Math.sign(difference);

            if (nextDirection !== direction) {
                direction = nextDirection;
                directionDistance = 0;
            }

            directionDistance += Math.abs(difference);

            if (directionDistance >= 4) {
                header.classList.toggle('is-hidden', direction > 0);
                directionDistance = 0;
            }
        }

        lastScrollY = currentScrollY;
        scrollUpdateScheduled = false;
    };

    window.addEventListener('scroll', () => {
        if (scrollUpdateScheduled) return;
        scrollUpdateScheduled = true;
        window.requestAnimationFrame(updateHeader);
    }, { passive: true });
}

const sideNav = document.querySelector('.side-nav');
const menuToggler = document.querySelector('.menuToogller');
const closeMenu = sideNav?.querySelector('.close');

if (sideNav && menuToggler) {
    if (!sideNav.id) sideNav.id = 'siteSideNav';
    menuToggler.setAttribute('role', 'button');
    menuToggler.setAttribute('tabindex', '0');
    menuToggler.setAttribute('aria-label', 'Open contact menu');
    menuToggler.setAttribute('aria-controls', sideNav.id);
    menuToggler.setAttribute('aria-expanded', 'false');

    const setMenuOpen = (isOpen) => {
        sideNav.classList.toggle('is-open', isOpen);
        menuToggler.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
        if (isOpen) header?.classList.remove('is-hidden');
    };

    menuToggler.addEventListener('click', () => {
        setMenuOpen(!sideNav.classList.contains('is-open'));
    });
    menuToggler.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setMenuOpen(!sideNav.classList.contains('is-open'));
        }
    });

    closeMenu?.setAttribute('role', 'button');
    closeMenu?.setAttribute('tabindex', '0');
    closeMenu?.setAttribute('aria-label', 'Close contact menu');
    closeMenu?.addEventListener('click', () => setMenuOpen(false));
    closeMenu?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setMenuOpen(false);
        }
    });

    sideNav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuOpen(false);
    });
}

const ticker = document.querySelector('section.text-slider');
const tickerList = ticker?.querySelector('.list');
if (ticker && tickerList) {
    ticker.append(tickerList.cloneNode(true));
}



// document.querySelectorAll('a').forEach(a => {
//     a.addEventListener('click' , () => {
//         if (a.href.includes('#')) {
//             const target = a.getAttribute('href');
//             const targetElement = document.querySelector(target.replace('/' , ''));
//             if (targetElement) {
//                 clearInterval(scroller);
//                 scrollTo(0, targetElement.offsetTop);
//             }
//         }
//     })
// })



// Active Class
// document.querySelectorAll('section.why .benifits .benifit').forEach( e => {
//     e.addEventListener('mouseenter', () => {
//         document.querySelectorAll('section.why .benifits .benifit').forEach( e => e.classList.remove('active'));
//         e.classList.add('active');
//     })
// }); 

activeClasses(document.querySelectorAll('section.why .benifits .benifit') , 'mouseenter');
activeClasses(document.querySelectorAll('section.portfolio .categories .category') , 'click');

function activeClasses(elements , event) {
elements.forEach( e => {
    e.addEventListener(event, () => {
        elements.forEach( e => e.classList.remove('active'));
        e.classList.add('active');
    })
});
}



// FAQ
function toggleFAQ() {
    const faqs = document.querySelectorAll('.faq');
  
    faqs.forEach(faq => {
      const accordionItems = faq.querySelectorAll('.accordion-item');
  
      accordionItems.forEach((accordionItem , index) => {
        const accordionHeader = accordionItem.querySelector('.accordion-header');
        const accordionBody = accordionItem.querySelector('.accordion-body p');
  
        accordionHeader.addEventListener('click', (e) => {
            // Remove All Active Classes
            accordionItems.forEach((item , i) => {
                if (i !== index) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-body p').style.height = '0';
                    item.querySelector('.accordion-header').querySelector('i').className = "fas fa-plus";
                }
            });

            accordionItem.classList.toggle('active');
  
            // Smoothly expand or collapse the answer
            const bodyHeight = accordionBody.scrollHeight;
            if (accordionItem.classList.contains('active')) {
                // Change The Icon From Plus To Minus
                accordionHeader.querySelector('i').className = "fas fa-minus";
                accordionBody.style.height = `${bodyHeight + 20}px`;
            } else {
                accordionHeader.querySelector('i').className = "fas fa-plus";
                accordionBody.style.height = '0';
            }
        });
      });
    });
}
  
// Call the function to initialize the FAQ functionality
toggleFAQ();
})();
