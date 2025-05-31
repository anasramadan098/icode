const categoriesDivs = document.querySelector('#portfolio .categories')



fetch('./js/port.json').then(data => data.json()).then(allData => {
    allData.forEach(data => {
        createCardImgFrom(data)
    })
    createCategoriesFrom(allData);
}).catch((r) => console.log(r));


function createCategoriesFrom(data) {
    data.forEach(info => {
        const category = info.category;
        let itFound = false;
        // Check If IT's Created Or Not
        categoriesDivs.querySelectorAll('span').forEach(span => {
            if (span.dataset.category.toLowerCase() == category.toLowerCase()) {
                itFound = true;
            }
        })

        if (!itFound) {

            // Create Span
            const span = document.createElement('span');
            span.className = 'category';
            span.dataset.category = category.toLowerCase();
            span.textContent = category.toUpperCase();
        
            // Event
            span.addEventListener('click' , () => {     
                const cards = document.querySelectorAll('section.portfolio .card') ;
                console.log(span.dataset.category == 'all' , "ALL")
                if (span.dataset.category.toLowerCase() == 'all') {
                    cards.forEach(card => {
                        card.classList.remove('hide')
                        card.classList.add('move-to-front');
                    });
                } else {
                    cards.forEach(card => {
                    console.log(card.dataset.category.toLowerCase() , span.dataset.category.toLowerCase() , "AS")
                    if (card.dataset.category.toLowerCase() == span.dataset.category.toLowerCase()) {
                        card.classList.remove('hide');
                        card.classList.add('move-to-front');
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('move-to-front');
                    }
                });
                }  
            })
    
            categoriesDivs.appendChild(span);

        }
    })


}

function createCardImgFrom(data) {
    // Create Card Div
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.category = data.category;

    // Img Div
    const imgDiv = document.createElement('div');
    imgDiv.className = 'img';

    // Img
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.alt;

    // Arrow Button
    const a = document.createElement('a');
    a.href = data.link;
    a.target = '_blank';
    a.className = 'arrow-button';

    const i = document.createElement('i');
    i.className = 'fas fa-arrow-left';

    // Append Steps
    a.appendChild(i);

    imgDiv.appendChild(img);
    imgDiv.appendChild(a);


    // Create H3
    const h3 = document.createElement('h3');
    const h3Link = document.createElement('a');
    h3Link.target = '_blank';
    h3Link.href = data.link;
    h3Link.textContent = data.text;

    h3.appendChild(h3Link);

    card.appendChild(imgDiv);
    card.appendChild(h3);

    document.querySelector('#portfolio .cards').appendChild(card);
}