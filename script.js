// 1. Toggle Menu for Mobile Navigation
var MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
    MenuItems.style.maxHeight = "0px";
}

function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

// 2. Account Page Toggle Form (Login & Register)
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register() {
    if (RegForm && LoginForm && Indicator) {
        RegForm.classList.add("active-form");
        LoginForm.classList.remove("active-form");
        Indicator.style.transform = "translateX(110px)";
    }
}

function login() {
    if (RegForm && LoginForm && Indicator) {
        LoginForm.classList.add("active-form");
        RegForm.classList.remove("active-form");
        Indicator.style.transform = "translateX(0px)";
    }
}

// 3. Product Page Sorting Logic (Low to High, High to Low)
const priceSortSelect = document.getElementById("priceSort");
const productRow = document.getElementById("productRow");

if (priceSortSelect && productRow) {
    priceSortSelect.addEventListener("change", function () {
        let cards = Array.from(productRow.getElementsByClassName("col-4"));
        let sortValue = this.value;

        cards.sort((a, b) => {
            let priceA = parseFloat(a.getAttribute("data-price"));
            let priceB = parseFloat(b.getAttribute("data-price"));

            if (sortValue === "low-high") {
                return priceA - priceB;
            } else if (sortValue === "high-low") {
                return priceB - priceA;
            } else {
                return 0; // Default order
            }
        });

        cards.forEach(card => productRow.appendChild(card));
    });
}

// 4. Live Search & Home Page Redirect Search Handler
const searchInput = document.getElementById("searchInput");

if (productRow) {
    let products = Array.from(productRow.getElementsByClassName("col-4"));

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        applySearch(searchQuery.toLowerCase());
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            applySearch(searchInput.value.toLowerCase());
        });
    }

    function applySearch(filterText) {
        products.forEach(product => {
            const productName = product.getAttribute("data-name") || "";
            if (productName.includes(filterText)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    }
}