/**
 * ================================================
 * PROFILE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman profil user
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// LOAD & DISPLAY USER DATA
// ============================================

// Ambil data user dari sessionStorage
const userJson = sessionStorage.getItem('currentUser');

if (userJson) {
    // Parse data user
    const user = JSON.parse(userJson);
    
    // Tampilkan informasi user di halaman
    document.getElementById('usernameDisplay').textContent = user.username || 'Tidak ada';
    document.getElementById('emailDisplay').textContent = user.account || user.email || 'Belum diatur'; 
    document.getElementById('birthdateDisplay').textContent = user.birthdate || 'Belum diatur';
    document.getElementById('genderDisplay').textContent = user.gender || 'Belum diatur';
    
    // Generate avatar menggunakan UI Avatars API
    const avatarImg = document.getElementById('avatarImg');
    avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random&size=128`;
    
} else {
    // Jika tidak ada user yang login, redirect ke halaman login
    window.location.href = '../index.html';
}

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

// Event listener untuk tombol logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    logout(); // Fungsi logout dari script.js
});
