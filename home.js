import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const featuredContainer = document.getElementById("featuredProducts");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadFeaturedProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        featuredContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const product = {
                id: doc.id,
                ...doc.data()
            };

            if (!product.featured) return;

            const wish = wishlist.includes(product.id);

            featuredContainer.innerHTML += `

            <div class="product-card">

                <img src="${product.image}" alt="${product.title}">

                <h3>${product.title}</h3>

                <p>${product.description}</p>

                <h2>₹${product.price}</h2>

                <div class="product-buttons">

                    <button class="wishlist-btn"
                        data-id="${product.id}">

                        ${wish ? "❤️" : "🤍"}

                    </button>

                    <button class="cart-btn"
                        data-id="${product.id}">

                        🛒 Add To Cart

                    </button>

                </div>

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

        wishlistLogic();
        cartLogic();

    } catch (err) {

        console.error(err);

    }

}

function wishlistLogic() {

    document.querySelectorAll(".wishlist-btn").forEach((btn) => {

        btn.onclick = () => {

            const id = btn.dataset.id;

            if (wishlist.includes(id)) {

                wishlist = wishlist.filter(item => item !== id);

            } else {

                wishlist.push(id);

            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            loadFeaturedProducts();

        };

    });

}

function cartLogic() {

    document.querySelectorAll(".cart-btn").forEach((btn) => {

        btn.onclick = () => {

            const id = btn.dataset.id;

            if (!cart.includes(id)) {

                cart.push(id);

                localStorage.setItem("cart", JSON.stringify(cart));

                alert("✅ Added To Cart");

            } else {

                alert("Already in cart");

            }

        };

    });

}

loadFeaturedProducts();