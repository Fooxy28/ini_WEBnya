/**
 * ================================================
 * ADD SCHEDULE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman tambah jadwal
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// SET INITIAL DATE FROM CALENDAR
// ============================================

// Cek apakah ada tanggal yang dipilih dari kalender di home page
const savedDateStr = sessionStorage.getItem('selectedCalendarDate');
const now = new Date();
let initialDate = now;

if (savedDateStr) {
    // Gunakan tanggal dari sessionStorage, tapi gunakan waktu saat ini
    const savedDate = new Date(savedDateStr);
    savedDate.setHours(now.getHours());
    savedDate.setMinutes(now.getMinutes());
    initialDate = savedDate;
}

// ============================================
// FORMAT DATE FOR INPUT FIELD
// ============================================

// Format tanggal untuk input datetime-local
const year = initialDate.getFullYear();
const month = String(initialDate.getMonth() + 1).padStart(2, '0');
const day = String(initialDate.getDate()).padStart(2, '0');
const hours = String(initialDate.getHours()).padStart(2, '0');
const minutes = String(initialDate.getMinutes()).padStart(2, '0');
const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

// Set nilai default untuk field start date
document.getElementById('start').value = formattedDateTime;

// ============================================
// FORM SUBMISSION
// ============================================

// Event listener untuk submit form tambah jadwal
document.getElementById('addScheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Buat object jadwal baru
    const newSchedule = {
        name: document.getElementById('name').value,
        note: document.getElementById('note').value,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value
    };

    // Simpan jadwal ke storage
    saveSchedule(newSchedule);
    
    // Tampilkan pesan sukses dan redirect ke home
    alert('Jadwal berhasil ditambahkan!');
    window.location.href = '../home.html';
});
