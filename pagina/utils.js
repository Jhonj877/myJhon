   // Product data
        const fruits = [
            {
                id: 1,
                name: 'Manzanas Rojas',
                price: 2.99,
                category: 'frutas',
                image: 'https://placehold.co/300x300/ff6b6b/ffffff?text=Manzanas',
                description: 'Manzanas frescas y jugosas, perfectas para snacks saludables.',
                rating: 4.8
            },
            {
                id: 2,
                name: 'Plátanos',
                price: 1.49,
                category: 'frutas',
                image: 'https://placehold.co/300x300/ffe66d/000000?text=Plátanos',
                description: 'Plátanos maduros y dulces, ideales para batidos y postres.',
                rating: 4.6
            },
            {
                id: 3,
                name: 'Naranjas',
                price: 3.29,
                category: 'citricos',
                image: 'https://placehold.co/300x300/ff9f43/ffffff?text=Naranjas',
                description: 'Naranjas jugosas y llenas de vitamina C, perfectas para zumo.',
                rating: 4.9
            },
            {
                id: 4,
                name: 'Fresas',
                price: 4.99,
                category: 'bayas',
                image: 'https://placehold.co/300x300/f95757/ffffff?text=Fresas',
                description: 'Fresas frescas y dulces, ideales para postres y meriendas.',
                rating: 4.7
            },
            {
                id: 5,
                name: 'Uvas Verdes',
                price: 3.79,
                category: 'frutas',
                image: 'https://placehold.co/300x300/95e1d3/000000?text=Uvas',
                description: 'Uvas verdes crujientes y refrescantes, perfectas para picar.',
                rating: 4.5
            },
            {
                id: 6,
                name: 'Mangos',
                price: 2.49,
                category: 'tropicales',
                image: 'https://placehold.co/300x300/ffbe0b/000000?text=Mangos',
                description: 'Mangos maduros y jugosos, con un sabor tropical delicioso.',
                rating: 4.8
            },
            {
                id: 7,
                name: 'Piña',
                price: 3.99,
                category: 'tropicales',
                image: 'https://placehold.co/300x300/fcbf49/000000?text=Piña',
                description: 'Piña fresca y dulce, perfecta para ensaladas y postres.',
                rating: 4.6
            },
            {
                id: 8,
                name: 'Kiwi',
                price: 2.79,
                category: 'citricos',
                image: 'https://placehold.co/300x300/83c5be/000000?text=Kiwi',
                description: 'Kiwi fresco y lleno de vitamina C, ideal para meriendas saludables.',
                rating: 4.4
            }
        ];

        // State
        let cart = [];
        let selectedCategory = 'all';
        let searchTerm = '';

        // DOM Elements
        const productsGrid = document.getElementById('productsGrid');
        const searchInput = document.getElementById('searchInput');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const closeCartBtn = document.getElementById('closeCartBtn');
        const overlay = document.getElementById('overlay');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.getElementById('cartCount');

        // Display products
        function displayProducts() {
            productsGrid.innerHTML = '';
            
            const filteredFruits = fruits.filter(fruit => {
                const matchesCategory = selectedCategory === 'all' || fruit.category === selectedCategory;
                const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
            });
            
            if (filteredFruits.length === 0) {
                productsGrid.innerHTML = `
                    <div class="no-products">
                        <div class="no-products-icon">🛒</div>
                        <h3 class="no-products-title">No se encontraron productos</h3>
                        <p class="no-products-text">Intenta cambiar los filtros o buscar con otros términos.</p>
                    </div>
                `;
                return;
            }
            
            filteredFruits.forEach(fruit => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${fruit.image}" alt="${fruit.name}" class="product-image">
                        <div class="rating">
                            <span class="star">⭐</span>
                            <span>${fruit.rating}</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${fruit.name}</h3>
                        <p class="product-description">${fruit.description}</p>
                        <div class="product-footer">
                            <span class="product-price">$${fruit.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn" data-id="${fruit.id}">
                                ➕ Añadir
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
                
                // Add event listener to the add to cart button
                const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
                addToCartBtn.addEventListener('click', () => {
                    addToCart(fruit);
                });
            });
        }

        // Add to cart
        function addToCart(fruit) {
            const existingItem = cart.find(item => item.id === fruit.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...fruit, quantity: 1});
            }
            updateCart();
        }

        // Remove from cart
        function removeFromCart(fruitId) {
            const existingItem = cart.find(item => item.id === fruitId);
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== fruitId);
            }
            updateCart();
        }

        // Update cart
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items in modal
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
                
                // Add event listeners to quantity buttons
                const decreaseBtn = cartItem.querySelector('.quantity-decrease');
                const increaseBtn = cartItem.querySelector('.quantity-increase');
                
                decreaseBtn.addEventListener('click', () => {
                    removeFromCart(item.id);
                });
                
                increaseBtn.addEventListener('click', () => {
                    addToCart(item);
                });
            });
            
            // Update total
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            displayProducts();
            
            // Category buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    selectedCategory = button.dataset.category;
                    displayProducts();
                });
            });
            
            // Search input
            searchInput.addEventListener('input', () => {
                searchTerm = searchInput.value;
                displayProducts();
            });
            
            // Cart button
            cartBtn.addEventListener('click', () => {
                cartModal.classList.add('open');
                overlay.classList.add('active');
            });
            
            // Close cart button
            closeCartBtn.addEventListener('click', () => {
                cartModal.classList.remove('open');
                overlay.classList.remove('active');
            });
            
            // Close cart when clicking overlay
            overlay.addEventListener('click', () => {
                cartModal.classList.remove('open');
                overlay.classList.remove('active');
            });
        });