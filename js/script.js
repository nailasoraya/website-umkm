// Tombol Promo
const promoButton = document.querySelector("#promoButton");

if (promoButton) {
    promoButton.addEventListener("click", () => {
        promoButton.textContent = "Promo. Beli 2 gratis tester!";
        console.log("Promo Secangkir Jeda berhasil ditampilkan");
    });
}

const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const menuTerbuka = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", menuTerbuka);
    });
}