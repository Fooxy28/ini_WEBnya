/**
 * ================================================
 * DETAIL TASK PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman detail tugas
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// LOAD TASK DATA
// ============================================

// Ambil ID tugas dari URL parameter
const taskId = getUrlParam('id');

// Ambil data tugas berdasarkan ID
const task = getTaskById(taskId);

// ============================================
// DISPLAY TASK DETAILS
// ============================================

if (!task) {
    // Jika tugas tidak ditemukan
    toastError('Tugas tidak ditemukan!', 'Error');
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
    
    /**
     * Helper function untuk mendapatkan icon dan warna grup
     * @param {string} group - Nama grup
     * @returns {Object} - Object dengan property icon dan color
     */
    const getGroupIcon = (group) => {
        switch(String(group).toLowerCase()) {
            case 'project': return { icon: '🗂️', color: 'var(--project-bg, #ffe0e0)' };
            case 'personal': return { icon: '👤', color: 'var(--personal-bg, #e0e0ff)' };
            case 'study': return { icon: '📚', color: 'var(--study-bg, #ffe0cc)' };
            default: return { icon: '👜', color: '#f0f0f0' };
        }
    };

    // Dapatkan informasi icon dan warna grup
    const groupInfo = getGroupIcon(task.group);
    
    // Tampilkan informasi tugas di halaman
    document.getElementById('taskName').textContent = task.name;
    
    // Set icon dan warna grup
    const groupIconEl = document.getElementById('taskGroupIcon');
    groupIconEl.textContent = groupInfo.icon;
    groupIconEl.style.backgroundColor = groupInfo.color;
    
    // Tampilkan detail lainnya
    document.getElementById('taskGroup').textContent = task.group;
    document.getElementById('taskDesc').textContent = task.description || 'Tidak ada deskripsi.';
    document.getElementById('taskStart').textContent = formatDate(task.start);
    document.getElementById('taskEnd').textContent = formatDate(task.end);

    // Set link untuk tombol edit
    document.getElementById('editBtn').href = `edittask.html?id=${taskId}`;
}
