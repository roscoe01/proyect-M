const items = document.getElementById(`items`)
const templateCard = document.getElementById(`template-card`).content
const fragment = document.createDocumentFragment();



document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch('data.json');
        const data = await res.json();
        pintarMangas(data);
    } catch (error) {
        console.log(error);
    }
}


const pintarMangas = data => {
    data.forEach(product => {
        if(product.category === 'Manga'){
        templateCard.querySelector('h3').textContent = product.productName;
        templateCard.querySelector('p').textContent = '$' + product.price;
        templateCard.querySelector('img').setAttribute("src", product.image);
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }});
    items.appendChild(fragment);
}