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
    toastError('Jadwal tidak ditemukan!', 'Error');
    setTimeout(() => history.back(), 1000);
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

// ============================================
// DELETE SCHEDULE FUNCTIONALITY
// ============================================

const deleteBtn = document.getElementById('deleteBtn');
const confirmModal = document.getElementById('confirmModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Function to show the modal
function showModal() {
    confirmModal.style.display = 'flex';
    setTimeout(() => confirmModal.classList.add('show'), 10);
}

// Function to hide the modal
function hideModal() {
    confirmModal.classList.remove('show');
    setTimeout(() => confirmModal.style.display = 'none', 300);
}

if (deleteBtn && confirmModal) {
    // Show modal when delete button is clicked
    deleteBtn.addEventListener('click', showModal);

    // Hide modal when cancel button is clicked
    cancelDeleteBtn.addEventListener('click', hideModal);

    // Hide modal when clicking on the overlay
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            hideModal();
        }
    });

    // Handle the final delete confirmation
    confirmDeleteBtn.addEventListener('click', () => {
        // Hapus jadwal menggunakan fungsi global
        deleteSchedule(scheduleId);
        
        // Sembunyikan modal
        hideModal();
        
        // Tampilkan notifikasi sukses
        toastSuccess('Jadwal berhasil dihapus!', 'Success');
        
        // Redirect ke halaman utama setelah 1 detik
        setTimeout(() => {
            window.location.href = '../home.html';
        }, 1000);
    });
}
