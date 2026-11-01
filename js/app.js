"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Americano", kategori: "Kopi", harga: 15000, stok: 50, unggulan: true },
  { nama: "Matcha Latte", kategori: "Non-kopi", harga: 23000, stok: 25, unggulan: true },
  { nama: "Butterscotch Latte", kategori: "Kopi", harga: 27000, stok: 10, unggulan: false },
  { nama: "Salted Caramel Latte", kategori: "Non-kopi", harga: 28000, stok: 0, unggulan: true }
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));


function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 20) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
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

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const labelUnggulan = produk.unggulan ? "Best Seller" : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <div class="product-tittle">
          ${produk.unggulan ? `<span class="badge-unggulan">${labelUnggulan}</span>` : ""}
          <h3>${produk.nama}</h3>
        </div>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);