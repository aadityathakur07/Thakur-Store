window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});
// ==========================
// NAVBAR SCROLL
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ==========================
// SCROLL TO TOP
// ==========================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
    

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements = document.querySelectorAll(

".featured, .about, .why, .offer, .newsletter, footer"

);

const reveal = () => {

    revealElements.forEach((el) => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            el.classList.add("active");

            el.classList.add("reveal");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();

const searchBtn = document.getElementById("searchBtn");
const searchPopup = document.getElementById("searchPopup");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");
const searchGo = document.getElementById("searchGo");

if (searchBtn && searchPopup) {

    searchBtn.addEventListener("click", () => {

        searchPopup.classList.add("active");
        searchInput.focus();

    });

}

if (closeSearch) {

    closeSearch.addEventListener("click", () => {

        searchPopup.classList.remove("active");

    });

}

if (searchGo) {

    searchGo.addEventListener("click", () => {

        const value = searchInput.value.trim();

        if (value !== "") {

            window.location.href =
                `products.html?search=${encodeURIComponent(value)}`;

        }

    });

}

searchInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        searchGo.click();

    }

});

// ======================
// Navbar Count
// ======================

function updateNavbarCounts() {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const wishlistCount = document.getElementById("wishlistCount");
    const cartCount = document.getElementById("cartCount");

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

updateNavbarCounts();