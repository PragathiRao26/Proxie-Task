// app.js
const products = [
    { id: 1, name: 'Sneaker', category: 'Shoes', price: 50, description: 'Comfortable sneakers', imageUrl: 'images/sneaker.jpg' },
    { id: 2, name: 'Elegant Leather Handbag', category: 'Accessories', price: 120, description: 'Sophisticated leather handbag', imageUrl: 'images/leather bag.jpg' },
    { id: 3, name: 'Classic Aviator Sunglasses', category: 'Accessories', price: 80, description: 'Timeless aviator sunglasses', imageUrl: 'images/sunglasses.jpg' },
    { id: 4, name: 'Cozy Knit Sweater', category: 'Clothing', price: 65, description: 'Soft knit sweater for chilly evenings', imageUrl: 'images/knit sweater.jpg' },
    { id: 5, name: 'Sporty Running Shoes', category: 'Shoes', price: 90, description: 'Lightweight and breathable running shoes', imageUrl: 'images/running shoes.jpg' },
    { id: 6, name: 'Vintage Pocket Watch', category: 'Accessories', price: 150, description: 'Classic pocket watch for collectors', imageUrl: 'images/pocket watch.jpg' },
    // Add more product objects here...
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const itemsPerPage = 3; // Number of products per page
let currentPage = 1; // Current page number
let filteredProducts = []; // Filtered products array
let totalPages = 1; // Total number of pages

function renderProduct(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="product-details">
            <h3 class="title">${product.name}</h3>
            <p class="description" style="display: none;">${product.description}</p>
            <span class="price" style="display: none;">$${product.price}</span>
        </div>
    `;
    productGrid.appendChild(card);

    // Event listener for hovering over the product card
    card.addEventListener('mouseenter', function() {
        const description = card.querySelector('.description');
        const price = card.querySelector('.price');
        description.style.display = 'block';
        price.style.display = 'block';
    });

    // Event listener for moving away from the product card
    card.addEventListener('mouseleave', function() {
        const description = card.querySelector('.description');
        const price = card.querySelector('.price');
        description.style.display = 'none';
        price.style.display = 'none';
    });
}


function renderProductsOnPage(pageNumber) {
    productGrid.innerHTML = ''; // Clear the existing products
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsOnPage = filteredProducts.slice(startIndex, endIndex);
    productsOnPage.forEach(renderProduct);
}

function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    renderProductsOnPage(currentPage);
    updatePaginationButtons();
}

// Function to filter products based on search input
function filterProducts(searchTerm) {
    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    goToPage(1); // Display the first page of filtered products
}

// Event listener for search input
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        filterProducts(searchTerm);
    } else {
        filteredProducts = products; // Reset filtered products to all products
        totalPages = Math.ceil(products.length / itemsPerPage);
        goToPage(1); // Reset pagination if search input is empty
    }
});

// Initial render
filterProducts(''); // Display all products initially
updatePaginationButtons();

// Event listener for previous page button
prevButton.addEventListener('click', function() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

// Event listener for next page button
nextButton.addEventListener('click', function() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
});
