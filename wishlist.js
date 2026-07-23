import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("wishlistContainer");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

async function loadWishlist() {

    if (wishlist.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;padding:50px;">
                ❤️ No Products in Wishlist
            </h2>
        `;

        return;
    }

    try {

        const snapshot = await getDocs(collection(db, "products"));

        let html = "";

        snapshot.forEach((doc) => {

            const product = {
                id: doc.id,
                ...doc.data()
            };

            if (!wishlist.includes(product.id)) return;

            html += `

<div class="product-card"
onclick="location.href='product.html?id=${product.id}'">

    ${product.featured ? `<span class="featured-badge">Featured</span>` : ""}

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

        if (html === "") {

            container.innerHTML = `
                <h2 style="text-align:center;padding:50px;">
                    ❤️ No Products in Wishlist
                </h2>
            `;

        } else {

            container.innerHTML = html;

        }

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <h2 style="text-align:center;color:red;padding:50px;">
                Error Loading Wishlist
            </h2>
        `;

    }

}

loadWishlist();