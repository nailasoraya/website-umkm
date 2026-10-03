const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `Paket: ${data.get("paket")}`,
    `Topik: ${data.get("topik")}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");
});

const whatsapp = document.getElementById("whatsapp");
const previewKontak = document.getElementById("preview-kontak");

whatsapp.addEventListener("input", function () {
    previewKontak.textContent =
        whatsapp.value
        ? `Nomor WhatsApp: ${whatsapp.value}`
        : "";
});