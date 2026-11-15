"use strict";

console.log("P10 JavaScript aktif");

const produkUmkm = [
  { nama: "Americano", kategori: "Kopi", harga: 15000, stok: 50, unggulan: true },
  { nama: "Matcha Latte", kategori: "Non-kopi", harga: 23000, stok: 25, unggulan: true },
  { nama: "Butterscotch Latte", kategori: "Kopi", harga: 27000, stok: 10, unggulan: false },
  { nama: "Salted Caramel Latte", kategori: "Non-kopi", harga: 28000, stok: 0, unggulan: true }
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}
console.log(formatRupiah(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 15) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Non-kopi":
      return "Produk Non-kopi pilihan";
    default:
      return "Produk UMKM";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
  const badgeUnggulan = produk.unggulan
    ? '<span class="badge-unggulan">Unggulan</span>'
    : '';

  return `
    <article class="js-product-card">
      ${badgeUnggulan}
      <h3>${produk.nama}</h3>
      <p class="category-note">${kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
      <p>${labelAksi}</p>
    </article>
  `;
}

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  card.append(title, category, price, stock);
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });
  card.append(removeButton);
  return card;
}


function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;

  return empty;
}
renderProduk();



produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

function renderProdukDinamis() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProdukDinamis);

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});