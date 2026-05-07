// ======================
// CEK LOGIN
// ======================
const currentPage = window.location.pathname.split("/").pop();
const publicPages = ["index.html", ""];

if (!publicPages.includes(currentPage)) {
  const userLogin = localStorage.getItem("userLogin");

  if (!userLogin) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
  }
}

// ======================
// LOGIN
// ======================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      alert("Login berhasil!");
      window.location.href = "dashboard.html";
    } else {
      alert("Email / Password salah!");
    }
  });
}

// ======================
// DASHBOARD GREETING
// ======================
const greeting = document.getElementById("greeting-message");
const userInfo = document.getElementById("user-info");

if (greeting) {
  const hour = new Date().getHours();
  let message = "Selamat Datang";

  if (hour < 12) message = "Selamat Pagi";
  else if (hour < 17) message = "Selamat Siang";
  else message = "Selamat Malam";

  greeting.textContent = message;

  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (user && userInfo) {
    userInfo.textContent = `${user.nama} (${user.role})`;
  }
}

// ======================
// LOGOUT
// ======================
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("userLogin");
    alert("Logout berhasil");
    window.location.href = "index.html";
  });
}

// ======================
// MODAL LOGIN PAGE
// ======================
const forgotBtn = document.getElementById("forgot-password-btn");
const registerBtn = document.getElementById("register-btn");

if (forgotBtn) {
  forgotBtn.addEventListener("click", () => {
    document.getElementById("forgot-modal").style.display = "block";
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    document.getElementById("register-modal").style.display = "block";
  });
}

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.getElementById("forgot-modal").style.display = "none";
    document.getElementById("register-modal").style.display = "none";
  });
});

// ======================
// STOCK TABLE
// ======================
const stokBody = document.getElementById("stok-table-body");

function renderStockTable() {
  if (!stokBody) return;

  stokBody.innerHTML = "";

  dataBahanAjar.forEach((item, index) => {
    stokBody.innerHTML += `
      <tr>
        <td><img src="${item.cover}" width="60"></td>
        <td>${item.kodeLokasi}</td>
        <td>${item.kodeBarang}</td>
        <td>${item.namaBarang}</td>
        <td>${item.jenisBarang}</td>
        <td>${item.edisi}</td>
        <td>${item.stok}</td>
        <td>
          <button onclick="hapusStock(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

if (stokBody) renderStockTable();

// ======================
// TAMBAH STOCK
// ======================
const addStockBtn = document.getElementById("add-stock-btn");
const stockFormSection = document.getElementById("add-stock-form-section");
const cancelBtn = document.getElementById("cancel-add-btn");
const newStockForm = document.getElementById("new-stock-form");

if (addStockBtn) {
  addStockBtn.addEventListener("click", () => {
    stockFormSection.classList.remove("hidden-form");
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    stockFormSection.classList.add("hidden-form");
  });
}

if (newStockForm) {
  newStockForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("coverNew");
    const file = fileInput.files[0];

    const newItem = {
      kodeLokasi: document.getElementById("kodeLokasiNew").value,
      kodeBarang: document.getElementById("kodeBarangNew").value,
      namaBarang: document.getElementById("namaBarangNew").value,
      jenisBarang: document.getElementById("jenisBarangNew").value,
      edisi: document.getElementById("edisiNew").value,
      stok: document.getElementById("stokNew").value,
      cover: URL.createObjectURL(file),
    };

    dataBahanAjar.push(newItem);

    renderStockTable();
    alert("Stock berhasil ditambahkan");

    newStockForm.reset();
    stockFormSection.classList.add("hidden-form");
  });
}

// ======================
// HAPUS STOCK
// ======================
function hapusStock(index) {
  if (confirm("Yakin hapus data ini?")) {
    dataBahanAjar.splice(index, 1);
    renderStockTable();
  }
}

// ======================
// TRACKING
// ======================
const trackingForm = document.getElementById("tracking-form");

if (trackingForm) {
  trackingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomor = document.getElementById("nomor-do").value.trim();
    const data = dataTracking[nomor];

    if (data) {
      document.getElementById("tracking-result").classList.remove("hidden");

      document.getElementById("nama-penerima").textContent =
        `Nama Penerima: ${data.nama}`;

      document.getElementById("nomor-do-display").textContent = data.nomorDO;
      document.getElementById("status-pengiriman").textContent = data.status;
      document.getElementById("ekspedisi-detail").textContent = data.ekspedisi;
      document.getElementById("tanggal-kirim-detail").textContent =
        data.tanggalKirim;
      document.getElementById("paket-detail").textContent = data.paket;
      document.getElementById("total-pembayaran-detail").textContent =
        data.totalPembayaran;
      const perjalananList = document.getElementById("perjalanan-list");
      perjalananList.innerHTML = "";

      data.perjalanan.forEach((item) => {
        perjalananList.innerHTML += `
          <li>
            <strong>${item.waktu}</strong><br>
            ${item.keterangan}
          </li>
        `;
      });
    } else {
      alert("Nomor Delivery Order tidak ditemukan!");
    }
  });
}
