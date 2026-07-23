import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Get Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("productDetails");

async function loadProduct() {

    console.log("Current URL:", window.location.href);
    console.log("Product ID:", productId);

    if (!productId) {

        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
            Invalid Product URL
        </h2>`;

        return;

    }

    try {

        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        console.log("Document Exists:", productSnap.exists());

        if (!productSnap.exists()) {

            container.innerHTML = `
            <h2 style="text-align:center;padding:40px;">
                Product Not Found
            </h2>`;

            return;

        }

        const product = productSnap.data();
        console.log(product);

        container.innerHTML = `

<div class="product-details-container">

    <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
    </div>

    <div class="product-info">

        <h1>${product.title}</h1>

        <p>⭐ ${product.rating}</p>

        <h2>
            ₹${product.price}
            <span class="old-price">₹${product.oldPrice}</span>
        </h2>

        <p>${product.description}</p>

        <div class="product-buttons">

            <button id="wishlistBtn">❤️ Wishlist</button>

            <button id="cartBtn">🛒 Add To Cart</button>

        </div>

        <br>

        <a href="${product.amazonLink}" target="_blank">
            <button>Buy on Amazon</button>
        </a>

        <a href="${product.flipkartLink}" target="_blank">
            <button>Buy on Flipkart</button>
        </a>

    </div>

</div>

`;

        // Wishlist
        document.getElementById("wishlistBtn").onclick = () => {

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            if (!wishlist.includes(productId)) {

                wishlist.push(productId);

                localStorage.setItem("wishlist", JSON.stringify(wishlist));

                alert("❤️ Added to Wishlist");

            } else {

                alert("Already in Wishlist");

            }

        };

        // Cart
        document.getElementById("cartBtn").onclick = () => {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (!cart.includes(productId)) {

                cart.push(productId);

                localStorage.setItem("cart", JSON.stringify(cart));

                alert("🛒 Added to Cart");

            } else {

                alert("Already in Cart");

            }

        };

    } catch (error) {

        console.error(error);

        container.innerHTML = `
        <h2 style="text-align:center;color:red;padding:40px;">
            Error Loading Product
        </h2>`;

    }

}

loadProduct();