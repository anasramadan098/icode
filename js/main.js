

const parent = document.querySelector('section.text-slider');
const list = parent.querySelector('.list');

const clone = list.cloneNode(true);
parent.append(clone)


setInterval(() => {
    scrollTo(0 , scrollY);
}, 500);



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
