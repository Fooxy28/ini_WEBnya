/**
 * ================================================
 * LOGIN PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman login
 */

// Event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai input dari form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validasi: pastikan username dan password tidak kosong
    if (!username.trim() || !password.trim()) {
        alert('Username dan password tidak boleh kosong!');
        return;
    }
    
    // Validasi login menggunakan fungsi dari script.js
    const result = login(username, password);
    
    if(result.success) {
        // Redirect ke halaman home jika login berhasil
        window.location.href = 'pages/home.html';
    } else {
        // Tampilkan pesan error spesifik sesuai hasil login
        alert(result.message);
    }
});
