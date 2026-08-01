// ==============================
// TIMER LATIHAN
// ==============================

let sisaWaktu =
    (Number(localStorage.getItem("waktu")) || 5) * 60;

const timer = document.getElementById("timer");

function updateTimer() {

    const menit = Math.floor(sisaWaktu / 60);
    const detik = sisaWaktu % 60;

    timer.textContent =
        String(menit).padStart(2, "0") +
        ":" +
        String(detik).padStart(2, "0");

    if (sisaWaktu <= 0) {

        clearInterval(intervalTimer);

        selesaiKarenaWaktu();

        return;

    }

    sisaWaktu--;

}

const intervalTimer = setInterval(updateTimer, 1000);

updateTimer();