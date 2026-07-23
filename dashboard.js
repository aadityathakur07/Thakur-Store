import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const tableBody = document.getElementById("productTableBody");

async function loadProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        tableBody.innerHTML = "";

snapshot.forEach((document) => {

    const id = document.id;
    const product = document.data();

            tableBody.innerHTML += `

            <tr>

                <td>
                    <img src="${product.image}" width="60">
                </td>

                <td>${product.title}</td>

                <td>${product.category}</td>

                <td>₹${product.price}</td>

                <td>⭐ ${product.rating}</td>

                <td>${product.featured ? "✅" : "❌"}</td>

                <td>

<button onclick="editProduct('${id}')">Edit</button>
<button onclick="deleteProduct('${id}')">
    Delete
</button>
                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadProducts();

window.deleteProduct = async function(id) {

    const ok = confirm("Delete this product?");

    if (!ok) return;

    try {

        await deleteDoc(doc(db, "products", id));

        alert("Product Deleted");

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

    }

};
window.editProduct = async function(id) {

    const snapshot = await getDocs(collection(db, "products"));

snapshot.forEach((docSnap) => {
if (docSnap.id === id) {
const product = docSnap.data();
            document.getElementById("productId").value = id;

            document.getElementById("title").value = product.title;
            document.getElementById("category").value = product.category;
            document.getElementById("price").value = product.price;
            document.getElementById("oldPrice").value = product.oldPrice;
            document.getElementById("rating").value = product.rating;
            document.getElementById("image").value = product.image;
            document.getElementById("amazonLink").value = product.amazonLink;
            document.getElementById("flipkartLink").value = product.flipkartLink;
            document.getElementById("description").value = product.description;
            document.getElementById("featured").checked = product.featured;

            document.getElementById("saveBtn").innerText = "Update Product";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

};