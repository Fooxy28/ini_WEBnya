/**
 * ================================================
 * EDIT PROFILE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman edit profil user
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// Ambil data user saat ini
const user = getCurrentUser();

// ============================================
// INITIALIZE FORM
// ============================================

// Inisialisasi custom dropdown untuk jenis kelamin
const dropdownWrapper = document.querySelector('.custom-dropdown-wrapper');
initCustomDropdown(dropdownWrapper, 'gender', 'selectedGenderText');

// ============================================
// POPULATE FORM WITH EXISTING DATA
// ============================================

// Isi form dengan data user yang ada
if (user) {
    // Isi field username
    document.getElementById('username').value = user.username || '';
    
    // Isi field email/account
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.value = user.account || user.email || '';
    }
    
    // Isi field tanggal lahir (handle case jika belum diset)
    const birthdateField = document.getElementById('birthdate');
    if (birthdateField) {
        birthdateField.value = user.birthdate || '';
    }
    
    // Set nilai jenis kelamin
    const genderField = document.getElementById('gender');
    const genderText = document.getElementById('selectedGenderText');
    if (genderField && genderText) {
        const gender = user.gender || 'Pilih Jenis Kelamin';
        genderField.value = gender;
        genderText.textContent = gender;
    }

} else {
    // Jika user tidak ditemukan (seharusnya tidak terjadi karena checkAuth)
    alert('User tidak ditemukan!');
    window.location.href = '../index.html';
}

// ============================================
// FORM SUBMISSION
// ============================================

// Event listener untuk submit form edit profil
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const usernameValue = document.getElementById('username').value;
    const emailField = document.getElementById('email');
    const emailValue = emailField ? emailField.value : (user.account || user.email || '');
    const birthdateField = document.getElementById('birthdate');
    const birthdateValue = birthdateField ? birthdateField.value : (user.birthdate || '');
    const genderField = document.getElementById('gender');
    const genderValue = genderField ? genderField.value : (user.gender || '');
    
    // Buat object user yang sudah diupdate
    const updatedUser = {
        ...user, // Spread operator untuk mengambil semua property user yang lama
        username: usernameValue,
        account: emailValue, // Simpan ke field 'account'
        email: emailValue,   // Tetap simpan ke 'email' untuk backward compatibility
        birthdate: birthdateValue,
        gender: genderValue
    };

    // Update data user di sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update juga di localStorage (array users)
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Cari user berdasarkan username (lebih aman karena username unik)
    const userIndex = allUsers.findIndex(u => u.username === user.username);
    
    if (userIndex > -1) {
        // Update data user di array
        allUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
    }

    // Tampilkan pesan sukses dan redirect ke halaman profil
    alert('Profil berhasil diperbarui!');
    window.location.href = 'profile.html';
});
