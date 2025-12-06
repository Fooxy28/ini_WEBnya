/**
 * ================================================
 * REGISTER PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman registrasi
 */

// Event listener untuk form registrasi
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai input dari form
    const username = document.getElementById('username').value.trim();
    const account = document.getElementById('account').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validasi: pastikan semua field terisi
    if (!username || !account || !password || !confirmPassword) {
        alert('Semua field harus diisi!');
        return;
    }
    
    // Validasi: pastikan password dan confirm password sama
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak sama!');
        return;
    }
    
    // Validasi: pastikan password minimal 6 karakter
    if (password.length < 6) {
        alert('Password minimal 6 karakter!');
        return;
    }
    
    // Ambil data users dari localStorage (atau buat array kosong jika belum ada)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cek apakah username sudah terdaftar
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        alert('Username sudah terdaftar! Silakan gunakan username lain.');
        return;
    }
    
    // Cek apakah account sudah terdaftar
    const accountExists = users.find(u => u.account === account);
    if (accountExists) {
        alert('Account sudah terdaftar! Silakan gunakan account lain.');
        return;
    }
    
    // Buat object user baru
    const newUser = {
        username: username,
        account: account,
        password: password,
        registeredAt: new Date().toISOString()
    };
    
    // Tambahkan user baru ke array
    users.push(newUser);
    
    // Simpan ke localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Tampilkan pesan sukses
    alert('Registrasi berhasil! Silakan login.');
    
    // Redirect ke halaman login
    window.location.href = '../index.html';
});
