const cards = document.getElementById(`cards`);
const templateCard = document.getElementById(`template-card`).content;
const fragment = document.createDocumentFragment();
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

cards.addEventListener('click', e => {
    addToCart(e);
})

const fetchData = async () => {
    try{
        const res = await fetch('data.json');
        const data = await res.json();
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(product => {
        templateCard.querySelector('h3').textContent = product.productName;
        templateCard.querySelector('p').textContent = '$' + product.price;
        templateCard.querySelector('img').setAttribute("src", product.image);
        templateCard.querySelector('.addToCart').dataset.id = product.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
}

const addToCart = event => {
    if(event.target.classList.contains('addToCart')){
        setCart(event.target.parentElement.parentElement);
    }
    event.stopPropagation();
}

const setCart = objeto => {
    localStorage.getItem('carrito', JSON.stringify(carrito));
    const producto = {
        id: objeto.querySelector('button').dataset.id , 
        title: objeto.querySelector('h3').textContent ,
        precio: objeto.querySelector('p').textContent ,
        image: objeto.querySelector('img').src,
        cantidad: 1 
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto};

    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}