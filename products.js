import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let allProducts = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let currentCategory = "All";

// ======================
// Load Products
// ======================

async function loadProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        allProducts = [];

        snapshot.forEach((doc) => {

            allProducts.push({
                id: doc.id,
                ...doc.data()
            });

        });

        renderProducts(allProducts);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;color:red;">
            Error Loading Products
        </h2>`;

    }

}

// ======================
// Render Products
// ======================

function renderProducts(products) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
            No Products Found
        </h2>`;

        return;

    }

    products.forEach((product) => {

        container.innerHTML += `

<div class="product-card"
onclick="location.href='product.html?id=${product.id}'">

<button class="wishlist-btn" data-id="${product.id}">
    ${wishlist.includes(product.id) ? "❤️" : "🤍"}
</button>
${product.featured ?
`<span class="featured-badge">Featured</span>` : ""}

<img src="${product.image}" alt="${product.title}">

<h3>${product.title}</h3>

<p>${product.description}</p>

<div class="price-box">

<span class="price">₹${product.price}</span>

<span class="old-price">₹${product.oldPrice}</span>

</div>

<p>⭐ ${product.rating}</p>

<div class="product-buttons">

<a href="${product.amazonLink}" target="_blank">
<button>Amazon</button>
</a>

<a href="${product.flipkartLink}" target="_blank">
<button>Flipkart</button>
</a>

</div>

</div>

`;

    });

document.querySelectorAll(".wishlist-btn").forEach((btn) => {

    btn.addEventListener("click", (e) => {

        e.stopPropagation();

        const id = btn.dataset.id;

        if (wishlist.includes(id)) {

            wishlist = wishlist.filter(item => item !== id);

        } else {

            wishlist.push(id);

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        filterProducts();

    });

});

}

// ======================
// Filter
// ======================

function filterProducts() {

    let keyword = "";

    if (searchInput) {
        keyword = searchInput.value.toLowerCase();
    }

    const filtered = allProducts.filter((product) => {

        const matchSearch =

            product.title.toLowerCase().includes(keyword) ||

            product.category.toLowerCase().includes(keyword);

        const matchCategory =

            currentCategory === "All" ||

            product.category === currentCategory;

        return matchSearch && matchCategory;

    });

    renderProducts(filtered);

}

// ======================
// Search
// ======================

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}

// ======================
// Category Buttons
// ======================

filterButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        filterButtons.forEach((b) =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        currentCategory = btn.dataset.category;

        filterProducts();

    });

});

loadProducts();