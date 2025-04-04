function addToCart(name, price, image, size, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, image, size, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" width="100">
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${itemTotal.toFixed(2)}</p>
            <button onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    let cartActions = document.querySelector('.cart-actions');
    let totalContainer = document.getElementById('cart-total');
    if (!totalContainer) {
        totalContainer = document.createElement('div');
        totalContainer.id = 'cart-total';
        cartActions.parentNode.insertBefore(totalContainer, cartActions);
    }
    const shippingFee = 8
    totalContainer.innerHTML = `<h3>Subtotal: $${totalPrice.toFixed(2)}</h3> <br> <h4>Shipping Fee: $8</h4> <br> <h5>Total: $${(totalPrice + shippingFee).toFixed(2)}</h5>`;
}


function removeFromCart(name, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.name === name && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}


if (document.getElementById('cart-items')) {
    displayCart();
    document.getElementById('clear-cart').addEventListener('click', clearCart);
}


let addToCartBtn = document.querySelector('.butt');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function (event) {
        event.preventDefault();
        let name = document.querySelector('h1').innerText;
        let price = parseFloat(document.querySelector('h4').innerText.replace('$', ''));
        let image = document.querySelector('.col-2 img').src;
        let size = document.querySelector('select').value;
        let quantity = parseInt(document.querySelector('input[type=number]').value) || 1;
        
        if (size === "Select Size") {
            alert("Please select a size");
            return;
        }
        
        addToCart(name, price, image, size, quantity);
    });
}
