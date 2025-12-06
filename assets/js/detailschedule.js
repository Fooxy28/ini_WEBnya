/**
 * ================================================
 * DETAIL SCHEDULE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman detail jadwal
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
// DISPLAY SCHEDULE DETAILS
// ============================================

if (!schedule) {
    // Jika jadwal tidak ditemukan
    alert('Jadwal tidak ditemukan!');
    history.back();
} else {
    /**
     * Helper function untuk format tanggal
     * @param {string} dateStr - String tanggal
     * @returns {string} - Format: 01 Okt, 2025
     */
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('id-ID', { month: 'short' })}, ${date.getFullYear()}`;
    };
    
    // Tampilkan informasi jadwal di halaman
    document.getElementById('scheduleName').textContent = schedule.name;
    document.getElementById('scheduleNote').textContent = schedule.note || 'Tidak ada catatan.';
    document.getElementById('scheduleStart').textContent = formatDate(schedule.start);
    document.getElementById('scheduleEnd').textContent = formatDate(schedule.end);

    // Set link untuk tombol edit
    document.getElementById('editBtn').href = `editschedule.html?id=${scheduleId}`;
}
