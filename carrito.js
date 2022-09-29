const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const fragment = document.createDocumentFragment();

let carrito = {}
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito();
    }
})


const pintarCarrito = () => {
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelector('img').setAttribute("src", producto.image);
        templateCarrito.querySelectorAll('td')[1].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad;
        templateCarrito.querySelector('span').textContent = (producto.price * producto.cantidad);


        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
    

    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito);
}
