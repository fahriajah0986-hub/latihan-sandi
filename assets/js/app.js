const btnMulai = document.getElementById("mulai");

btnMulai.addEventListener("click", function () {

    const nama = document.getElementById("nama").value.trim();
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const waktu = parseInt(document.getElementById("waktu").value);

    // Validasi nama
    if (nama === "") {
        alert("Nama peserta harus diisi.");
        return;
    }

    // Validasi jumlah soal
    if (isNaN(jumlah) || jumlah < 1) {
        alert("Jumlah soal harus lebih dari 0.");
        return;
    }

    // Validasi waktu
    if (isNaN(waktu) || waktu < 1) {
        alert("Waktu harus lebih dari 0 menit.");
        return;
    }

   // Simpan data
localStorage.setItem("namaPeserta", nama);
localStorage.setItem("jumlahSoal", jumlah);
localStorage.setItem("waktu", waktu);

    // Pindah halaman
    window.location.href = "latihan.html";

});