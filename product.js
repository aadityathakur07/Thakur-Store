import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// URL se Product ID lo
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("productDetails");

async function loadProduct() {

    if (!productId) {

        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
            Product Not Found
        </h2>`;

        return;

    }

    try {

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            container.innerHTML = `
            <h2 style="text-align:center;padding:40px;">
                Product Not Found
            </h2>`;

            return;

        }

        const product = docSnap.data();

        container.innerHTML = `

<div class="product-details-container">

    <div class="product-image">

        <img src="${product.image}" alt="${product.title}">

    </div>

    <div class="product-info">

        <h1>${product.title}</h1>

        <p>⭐ ${product.rating}</p>

        <h2>₹${product.price}
        <span class="old-price">₹${product.oldPrice}</span>
        </h2>

        <p>${product.description}</p>

        <div class="product-buttons">

            <a href="${product.amazonLink}" target="_blank">
                <button>Buy on Amazon</button>
            </a>

            <a href="${product.flipkartLink}" target="_blank">
                <button>Buy on Flipkart</button>
            </a>

        </div>

    </div>

</div>

`;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
        <h2 style="text-align:center;color:red;padding:40px;">
            Error Loading Product
        </h2>`;

    }

}

loadProduct();