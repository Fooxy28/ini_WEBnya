/**
 * ================================================
 * ADD TASK PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman tambah tugas
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// INITIALIZE CUSTOM DROPDOWN
// ============================================

// Inisialisasi custom dropdown untuk Task Group
const dropdownWrapper = document.querySelector('.custom-dropdown-wrapper');
initCustomDropdown(dropdownWrapper);

// ============================================
// FORM SUBMISSION
// ============================================

// Event listener untuk submit form tambah tugas
document.getElementById('addTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Buat object tugas baru
    const newTask = {
        group: document.getElementById('group').value,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value
    };

    // Simpan tugas ke storage
    saveTask(newTask);
    
    // Tampilkan pesan sukses dan redirect ke task menu
    toastSuccess('Tugas berhasil ditambahkan!', 'Berhasil');
    setTimeout(() => {
        window.location.href = 'taskmenu.html';
    }, 1000);
});
