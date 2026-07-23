import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const form = document.getElementById("productForm");

const imageFile = document.getElementById("imageFile");
const imageInput = document.getElementById("image");
const uploadStatus = document.getElementById("uploadStatus");

imageFile.addEventListener("change", async () => {

    const file = imageFile.files[0];

    if (!file) return;

    uploadStatus.innerText = "Uploading Image...";

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "thakurstore");

    try {

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/u5hscbmz/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();

        imageInput.value = data.secure_url;

        uploadStatus.innerHTML = "✅ Image Uploaded Successfully";

    } catch (err) {

        console.error(err);

        uploadStatus.innerHTML = "❌ Upload Failed";

    }

});

form.addEventListener("submit", async (e) => {

    e.preventDefault();

const productId = document.getElementById("productId").value;
const saveBtn = document.getElementById("saveBtn");

    const product = {

        title: document.getElementById("title").value,

        category: document.getElementById("category").value,

        price: Number(document.getElementById("price").value),

        oldPrice: Number(document.getElementById("oldPrice").value),

        rating: Number(document.getElementById("rating").value),

        image: document.getElementById("image").value,

        amazonLink: document.getElementById("amazonLink").value,

        flipkartLink: document.getElementById("flipkartLink").value,

        description: document.getElementById("description").value,

        featured: document.getElementById("featured").checked

    };

    try {

if (productId) {

    await updateDoc(doc(db, "products", productId), product);

    alert("✅ Product Updated Successfully!");

} else {

    await addDoc(collection(db, "products"), product);

    alert("✅ Product Saved Successfully!");

}

form.reset();

document.getElementById("productId").value = "";

saveBtn.innerText = "Save Product";
    } catch (error) {

        console.error(error);

        alert("❌ Error Saving Product");

    }

});