import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("cartContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadCart() {

    const snapshot = await getDocs(collection(db, "products"));

    let products = [];

    snapshot.forEach(doc => {

        products.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderCart(products);

}

function renderCart(products) {

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;padding:40px;">
                🛒 Your Cart is Empty
            </h2>
        `;

        return;

    }

    let total = 0;

    cart.forEach(id => {

        const product = products.find(p => p.id === id);

        if (!product) return;

        total += Number(product.price);

        container.innerHTML += `
        <div class="cart-item">

            <img src="${product.image}" width="120">

            <div>

                <h3>${product.title}</h3>

                <p>₹${product.price}</p>

                <button class="remove-btn"
                    data-id="${product.id}">
                    Remove
                </button>

            </div>

        </div>
        `;

    });

    container.innerHTML += `
        <div class="cart-total">
            <h2>Total : ₹${total}</h2>
        </div>
    `;

    document.querySelectorAll(".remove-btn").forEach(btn => {

        btn.onclick = () => {

            cart = cart.filter(id => id !== btn.dataset.id);

            localStorage.setItem("cart", JSON.stringify(cart));

            loadCart();

        };

    });

}

loadCart();