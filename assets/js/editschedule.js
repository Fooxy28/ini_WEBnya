/**
 * ================================================
 * EDIT SCHEDULE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman edit jadwal
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// LOAD SCHEDULE DATA
// ============================================

// Ambil ID jadwal dari URL parameter
const scheduleId = getUrlParam('id');

// Ambil data jadwal berdasarkan ID
const schedule = getScheduleById(scheduleId);

// ============================================
// POPULATE FORM WITH EXISTING DATA
// ============================================

// Isi form dengan data jadwal yang ada
if (schedule) {
    document.getElementById('name').value = schedule.name;
    document.getElementById('note').value = schedule.note;
    document.getElementById('start').value = schedule.start;
    document.getElementById('end').value = schedule.end;
} else {
    // Jika jadwal tidak ditemukan
    toastError('Jadwal tidak ditemukan!', 'Error');
    setTimeout(() => history.back(), 1000);
}

// ============================================
// FORM SUBMISSION
// ============================================

// Event listener untuk submit form edit jadwal
document.getElementById('editScheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Buat object jadwal yang sudah diupdate
    const updatedSchedule = {
        id: scheduleId, // Pertahankan ID yang sama
        name: document.getElementById('name').value,
        note: document.getElementById('note').value,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value
    };

    // Simpan perubahan ke storage
    saveSchedule(updatedSchedule);
    
    // Tampilkan pesan sukses dan redirect ke halaman detail
    toastSuccess('Jadwal berhasil diperbarui!', 'Berhasil');
    setTimeout(() => {
        // Kembali ke detail page yang asli (melewati edit page)
        history.go(-1);
    }, 1000);
});
