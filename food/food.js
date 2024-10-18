// Wait for the DOM to load before executing code
document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();  // Initialize the "Add to Cart" buttons
    updateCartCount(getCart()); // Update the cart count on page load
});

// Handle the "Add to Cart" button click
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const parent = this.parentElement;
            const name = parent.querySelector('h3').innerText;
            const price = parent.querySelector('p').innerText;

            let itemName = name;
            const itemPrice = parseFloat(price.replace('₱', ''));

            // Check if the item is "Flavored Fries" to prompt for flavor
            if (itemName === 'Flavored Fries') {
                let flavor = prompt("Choose a flavor: BBQ, Cheese, Sour Cream");

                // Use switch statement to handle flavor selection
                switch (flavor) {
                    case 'BBQ':
                    case 'Cheese':
                    case 'Sour Cream':
                        itemName += ` (${flavor})`; // Append valid flavor to the item name
                        break;
                    default:
                        alert("No valid flavor selected! Please choose BBQ, Cheese, or Sour Cream.");
                        return; // Exit if invalid flavor
                }
            }

            const item = {
                name: itemName,
                price: itemPrice
            };

            addToCart(item);  // Call the addToCart function
        });
    });
}

// Add to cart function
function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " would you like to add?", "1");

    if (quantity === null) { // Canceled
        return;
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    const cost = item.price * quantity;

    if (existingItem) {
        existingItem.quantity += quantity; // Update the quantity
    } else {
        cart.push({ ...item, quantity }); // Add new item to the cart
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " added to cart! \nCost: ₱ " + cost);
}

// Get current cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cartFood");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return []; // Return an empty array if no cart exists
    }
}

// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cartFood", JSON.stringify(cart));
    updateCartCount(cart); // Update the cart count after saving
}

// Update the cart count in the HTML
function updateCartCount(cart) {
    const cartCountElement = document.getElementById("cart-count");

    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity; // Sum the quantities
    });

    cartCountElement.innerText = totalQuantity; // Update the displayed cart count
}
