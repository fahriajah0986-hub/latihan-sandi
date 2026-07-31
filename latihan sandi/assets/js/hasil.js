// ==============================
// HASIL LATIHAN
// ==============================

// Ambil data
const hasilLatihan =
    JSON.parse(localStorage.getItem("hasilLatihan")) || [];

const nama = localStorage.getItem("namaPeserta") || "-";
const benar = Number(localStorage.getItem("benar")) || 0;
const salah = Number(localStorage.getItem("salah")) || 0;
const nilai = Number(localStorage.getItem("nilai")) || 0;

// Ambil elemen
const namaPeserta = document.getElementById("namaPeserta");
const jumlahBenar = document.getElementById("jumlahBenar");
const jumlahSalah = document.getElementById("jumlahSalah");
const nilaiPeserta = document.getElementById("nilaiPeserta");
const tabelHasil = document.getElementById("tabelHasil");

// Ringkasan
namaPeserta.textContent = nama;
jumlahBenar.textContent = benar;
jumlahSalah.textContent = salah;
nilaiPeserta.textContent = nilai;

// ==============================
// Membuat tampilan sandi
// ==============================

function buatSoalSandi(item) {

    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.gap = "4px";

    // ==========================
    // KOTAK
    // ==========================

    if (item.tipe === "kotak") {

        for (const huruf of item.soal) {

            if (kotak3[huruf]) {

                const img = document.createElement("img");

                img.src = kotak3[huruf];
                img.width = 30;
                img.height = 30;
                img.alt = huruf;

                container.appendChild(img);

            }

        }

    }

    // ==========================
    // GUDEP SEDIA
    // ==========================

    else {

        for (const huruf of item.soal) {

            if (gudepSedia[huruf]) {

                const span = document.createElement("span");

                span.textContent = gudepSedia[huruf];

                span.style.display = "inline-block";
                span.style.padding = "5px 8px";
                span.style.margin = "2px";
                span.style.border = "1px solid #0f766e";
                span.style.borderRadius = "6px";
                span.style.background = "#ecfeff";
                span.style.fontWeight = "600";
                span.style.color = "#0f766e";

                container.appendChild(span);

            }

        }

    }

    return container;

}

// ==============================
// Isi tabel
// ==============================

hasilLatihan.forEach((item) => {

    const tr = document.createElement("tr");

    // Nomor
    const tdNo = document.createElement("td");
    tdNo.textContent = item.nomor;

    // Soal
    const tdSoal = document.createElement("td");
    tdSoal.appendChild(buatSoalSandi(item));

    // Jawaban Peserta
    const tdJawaban = document.createElement("td");
    tdJawaban.textContent =
        item.jawabanPeserta || item.jawaban || "-";

    // Jawaban Benar
    const tdBenar = document.createElement("td");
    tdBenar.textContent =
        item.jawabanBenar || item.soal;

    tdBenar.style.fontWeight = "600";
    tdBenar.style.color = "#0f766e";

    // Status
    const tdStatus = document.createElement("td");

    if (item.benar) {

        tdStatus.textContent = "✅ Benar";

    } else {

        tdStatus.textContent = "❌ Salah";

    }

    tr.appendChild(tdNo);
    tr.appendChild(tdSoal);
    tr.appendChild(tdJawaban);
    tr.appendChild(tdBenar);
    tr.appendChild(tdStatus);

    tabelHasil.appendChild(tr);

});