// ==============================
// LATIHAN SANDI PRAMUKA
// ==============================

// Elemen HTML
const soalContainer = document.getElementById("soal");
const jawabanInput = document.getElementById("jawaban");
const btnSelanjutnya = document.getElementById("selanjutnya");

const nomorSoal = document.getElementById("nomorSoal");
const totalSoal = document.getElementById("totalSoal");
const namaPeserta = document.getElementById("namaPeserta");

// ==============================
// Data Peserta
// ==============================

namaPeserta.textContent =
    "Peserta : " + (localStorage.getItem("namaPeserta") || "-");

const jumlahSoal =
    Number(localStorage.getItem("jumlahSoal")) || 10;

totalSoal.textContent = "/ " + jumlahSoal;

// ==============================
// Acak Array
// ==============================

function acakArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// ==============================
// Membuat Daftar Soal Campuran
// ==============================

const semuaKata = acakArray(kata);

const jumlahKotak = Math.ceil(jumlahSoal / 2);
const jumlahGudep = jumlahSoal - jumlahKotak;

const soalKotak = semuaKata
    .slice(0, jumlahKotak)
    .map(k => ({
        tipe: "kotak",
        kata: k.toUpperCase()
    }));

const soalGudep = semuaKata
    .slice(jumlahKotak, jumlahKotak + jumlahGudep)
    .map(k => ({
        tipe: "gudep",
        kata: k.toUpperCase()
    }));

let daftarSoal = acakArray([
    ...soalKotak,
    ...soalGudep
]);

// ==============================
// Statistik
// ==============================

let nomor = 0;
let benar = 0;
let salah = 0;

let hasilLatihan = [];

let soalSekarang = null;

// ==============================
// Tampilkan Kotak
// ==============================

function tampilkanKotak(kataSoal) {

    soalContainer.innerHTML = "";

    for (const huruf of kataSoal) {

        if (kotak3[huruf]) {

            const img = document.createElement("img");

            img.src = kotak3[huruf];
            img.alt = huruf;
            img.width = 60;
            img.height = 60;
            img.style.margin = "5px";

            soalContainer.appendChild(img);

        }

    }

}

// ==============================
// Tampilkan Gudep Sedia
// ==============================

function tampilkanGudep(kataSoal) {

    soalContainer.innerHTML = "";

    for (const huruf of kataSoal) {

        if (gudepSedia[huruf]) {

            const span = document.createElement("span");

            span.textContent = gudepSedia[huruf];

            span.style.display = "inline-block";
            span.style.margin = "6px";
            span.style.padding = "10px 15px";
            span.style.fontSize = "28px";
            span.style.fontWeight = "bold";
            span.style.border = "2px solid #0f766e";
            span.style.borderRadius = "8px";
            span.style.background = "#f0fdfa";
            span.style.color = "#0f766e";

            soalContainer.appendChild(span);

        }

    }

}

// ==============================
// Ambil Soal Berikutnya
// ==============================

function mulaiLatihan() {

    if (daftarSoal.length === 0) {

        selesaiLatihan();
        return;

    }

    soalSekarang = daftarSoal.shift();

    nomor++;

    nomorSoal.textContent = "Soal " + nomor;

    if (soalSekarang.tipe === "kotak") {

        tampilkanKotak(soalSekarang.kata);

    } else {

        tampilkanGudep(soalSekarang.kata);

    }

}

// ==============================
// Cek Jawaban
// ==============================

function cekJawaban() {

    const jawaban =
        jawabanInput.value.trim().toUpperCase();

    if (jawaban === "") {

        alert("Silakan isi jawaban terlebih dahulu.");
        jawabanInput.focus();
        return;

    }

    const status =
        jawaban === soalSekarang.kata;

    if (status) {

        benar++;

    } else {

        salah++;

    }

   hasilLatihan.push({

    nomor: nomor,

    tipe: soalSekarang.tipe,

    soal: soalSekarang.kata,

    jawabanPeserta: jawaban,

    jawabanBenar: soalSekarang.kata,

    benar: status

});

    jawabanInput.value = "";
    jawabanInput.focus();

    mulaiLatihan();

}

// ==============================
// Selesai
// ==============================

function selesaiLatihan() {

    localStorage.setItem(
        "hasilLatihan",
        JSON.stringify(hasilLatihan)
    );

    localStorage.setItem("benar", benar);
    localStorage.setItem("salah", salah);

    localStorage.setItem(
        "nilai",
        Math.round((benar / jumlahSoal) * 100)
    );

    window.location.href = "hasil.html";

}

// ==============================
// Event
// ==============================

btnSelanjutnya.addEventListener("click", cekJawaban);

jawabanInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        cekJawaban();

    }

});

// ==============================
// Mulai
// ==============================

mulaiLatihan();