/**
 * ================================================
 * EDIT TASK PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman edit tugas
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
// INITIALIZE CUSTOM DROPDOWN
// ============================================

// Inisialisasi custom dropdown untuk Task Group
const dropdownWrapper = document.querySelector('.custom-dropdown-wrapper');
initCustomDropdown(dropdownWrapper);

// ============================================
// POPULATE FORM WITH EXISTING DATA
// ============================================

// Isi form dengan data tugas yang ada
if (task) {
    // Set nilai untuk dropdown group
    document.getElementById('group').value = task.group;
    document.getElementById('selectedGroupText').textContent = task.group;
    
    // Isi field lainnya
    document.getElementById('name').value = task.name;
    document.getElementById('description').value = task.description;
    document.getElementById('start').value = task.start;
    document.getElementById('end').value = task.end;
} else {
    // Jika tugas tidak ditemukan
    toastError('Tugas tidak ditemukan!', 'Error');
    setTimeout(() => history.back(), 1000);
}

// ============================================
// FORM SUBMISSION
// ============================================

// Event listener untuk submit form edit tugas
document.getElementById('editTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Buat object tugas yang sudah diupdate
    const updatedTask = {
        id: taskId, // Pertahankan ID yang sama
        group: document.getElementById('group').value,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value,
        progress: task.progress, // Pertahankan nilai progress original
        status: task.status // Pertahankan status original
    };

    // Simpan perubahan ke storage
    saveTask(updatedTask);
    
    // Tampilkan pesan sukses dan redirect ke halaman detail
    toastSuccess('Tugas berhasil diperbarui!', 'Berhasil');
    setTimeout(() => {
        // Gunakan history.go(-2) untuk kembali ke detail page yang asli (melewati edit page)
        // Kemudian replace dengan detail page yang terupdate
        history.go(-1);
    }, 1000);
});
