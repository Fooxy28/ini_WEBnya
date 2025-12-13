/**
 * ================================================
 * MAIN SCRIPT - GLOBAL FUNCTIONS
 * ================================================
 * File ini berisi semua fungsi global yang digunakan
 * di seluruh aplikasi, termasuk:
 * - Data Management (Tasks & Schedules)
 * - Authentication Functions
 * - Helper Functions
 * - Custom Dropdown Initialization
 */

// ============================================
// DATA INITIALIZATION
// ============================================

/**
 * Fungsi untuk inisialisasi data dummy jika belum ada
 * Data disimpan di sessionStorage
 */
function initData() {
    // Inisialisasi dummy tasks jika belum ada
    if (!sessionStorage.getItem('tasks')) {
        const dummyTasks = [
            {
                id: 't1',
                group: 'Kuliah',
                name: 'Mengerjakan Tugas RPL',
                description: 'Membuat prototype website task management.',
                start: '2025-12-03T08:00',
                end: '2025-12-05T23:59',
                status: 'progress',
                progress: 50
            },
            {
                id: 't2',
                group: 'Pribadi',
                name: 'Beli Kopi',
                description: 'Stok kopi habis, beli di supermarket.',
                start: '2025-12-03T10:00',
                end: '2025-12-03T12:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't3',
                group: 'Project',
                name: 'Desain UI Dashboard',
                description: 'Membuat desain UI untuk aplikasi mobile.',
                start: '2025-12-04T09:00',
                end: '2025-12-06T17:00',
                status: 'done',
                progress: 100
            },
            {
                id: 't4',
                group: 'Kuliah',
                name: 'Belajar EDPL',
                description: 'Mempelajari materi untuk persiapan UAS.',
                start: '2025-12-06T19:00',
                end: '2025-12-09T21:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't5',
                group: 'Pribadi',
                name: 'Jogging Pagi',
                description: 'Lari pagi di sekitaran kos.',
                start: '2025-12-07T06:00',
                end: '2025-12-08T07:00',
                status: 'progress',
                progress: 30
            },
            {
                id: 't6',
                group: 'Kuliah',
                name: 'Presentasi Basis Data',
                description: 'Presentasi projek akhir mata kuliah Basis Data.',
                start: '2025-12-07T09:00',
                end: '2025-12-10T16:00',
                status: 'progress',
                progress: 65
            },
            {
                id: 't7',
                group: 'Project',
                name: 'Coding Backend API',
                description: 'Membuat REST API untuk aplikasi mobile.',
                start: '2025-12-05T10:00',
                end: '2025-12-12T18:00',
                status: 'progress',
                progress: 40
            },
            {
                id: 't8',
                group: 'Pribadi',
                name: 'Belanja Bulanan',
                description: 'Beli kebutuhan sehari-hari di supermarket.',
                start: '2025-12-08T14:00',
                end: '2025-12-15T16:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't9',
                group: 'Kuliah',
                name: 'Review Materi Kalkulus',
                description: 'Mengulang materi integral dan diferensial.',
                start: '2025-12-06T20:00',
                end: '2025-12-08T22:00',
                status: 'progress',
                progress: 80
            },
            {
                id: 't10',
                group: 'Project',
                name: 'Testing Aplikasi',
                description: 'Melakukan unit testing dan integration testing.',
                start: '2025-12-09T08:00',
                end: '2025-12-14T17:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't11',
                group: 'Pribadi',
                name: 'Kunjungan Dokter',
                description: 'Cek kesehatan rutin di klinik.',
                start: '2025-12-10T10:00',
                end: '2025-12-10T11:30',
                status: 'todo',
                progress: 0
            },
            {
                id: 't12',
                group: 'Kuliah',
                name: 'Buat Laporan Praktikum',
                description: 'Menulis laporan praktikum jaringan komputer.',
                start: '2025-12-07T13:00',
                end: '2025-12-11T20:00',
                status: 'progress',
                progress: 55
            },
            {
                id: 't13',
                group: 'Project',
                name: 'Deploy ke Production',
                description: 'Deploy aplikasi ke server production.',
                start: '2025-12-12T09:00',
                end: '2025-12-16T15:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't14',
                group: 'Pribadi',
                name: 'Olahraga Sore',
                description: 'Main futsal dengan teman-teman.',
                start: '2025-12-08T16:00',
                end: '2025-12-08T18:00',
                status: 'done',
                progress: 100
            },
            {
                id: 't15',
                group: 'Kuliah',
                name: 'Diskusi Kelompok',
                description: 'Diskusi tugas kelompok mata kuliah EDPL.',
                start: '2025-12-09T14:00',
                end: '2025-12-09T17:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't16',
                group: 'Project',
                name: 'Code Review',
                description: 'Review code dari tim developer.',
                start: '2025-12-07T10:00',
                end: '2025-12-09T12:00',
                status: 'progress',
                progress: 70
            },
            {
                id: 't17',
                group: 'Pribadi',
                name: 'Baca Buku',
                description: 'Membaca buku "Clean Code" chapter 5-7.',
                start: '2025-12-10T19:00',
                end: '2025-12-13T21:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't18',
                group: 'Kuliah',
                name: 'Quiz Algoritma',
                description: 'Persiapan quiz mata kuliah Algoritma.',
                start: '2025-12-08T08:00',
                end: '2025-12-08T09:30',
                status: 'done',
                progress: 100
            }
        ];
        sessionStorage.setItem('tasks', JSON.stringify(dummyTasks));
    }

    // Inisialisasi dummy schedules jika belum ada
    if (!sessionStorage.getItem('schedules')) {
        const dummySchedules = [
            {
                id: 's1',
                name: 'Rapat Organisasi',
                note: 'Membahas proker bulan depan.',
                location: 'Ruang Rapat A',
                start: '2025-12-04T14:00',
                end: '2025-12-04T16:00'
            },
            {
                id: 's2',
                name: 'Kelas EDPL',
                note: 'Presentasi tugas kelompok.',
                location: 'Lab Komputer 2',
                start: '2025-12-05T10:00',
                end: '2025-12-05T12:00'
            },
            {
                id: 's3',
                name: 'Tutor Sebaya',
                note: 'Membahas materi kalkulus.',
                location: 'Perpustakaan',
                start: '2025-12-08T15:00',
                end: '2025-12-08T17:00'
            },
            {
                id: 's4',
                name: 'Meeting Client',
                note: 'Presentasi progress project ke client.',
                location: 'Cafe Downtown',
                start: '2025-12-07T13:00',
                end: '2025-12-07T15:00'
            },
            {
                id: 's5',
                name: 'Kelas Basis Data',
                note: 'Materi normalisasi database.',
                location: 'Ruang 301',
                start: '2025-12-07T08:00',
                end: '2025-12-07T10:00'
            },
            {
                id: 's6',
                name: 'Workshop Design Thinking',
                note: 'Workshop tentang metodologi design thinking.',
                location: 'Auditorium',
                start: '2025-12-09T09:00',
                end: '2025-12-09T12:00'
            },
            {
                id: 's7',
                name: 'Sprint Planning',
                note: 'Planning sprint untuk 2 minggu ke depan.',
                location: 'Online - Zoom',
                start: '2025-12-10T10:00',
                end: '2025-12-10T12:00'
            },
            {
                id: 's8',
                name: 'Kelas Algoritma',
                note: 'Quiz dan pembahasan dynamic programming.',
                location: 'Ruang 205',
                start: '2025-12-08T08:00',
                end: '2025-12-08T10:00'
            },
            {
                id: 's9',
                name: 'Seminar Teknologi',
                note: 'Seminar tentang AI dan Machine Learning.',
                location: 'Aula Utama',
                start: '2025-12-11T13:00',
                end: '2025-12-11T16:00'
            },
            {
                id: 's10',
                name: 'Review Code dengan Tim',
                note: 'Code review bersama tim development.',
                location: 'Meeting Room B',
                start: '2025-12-07T10:00',
                end: '2025-12-07T12:00'
            },
            {
                id: 's11',
                name: 'Konsultasi Dosen',
                note: 'Konsultasi tugas akhir dengan dosen pembimbing.',
                location: 'Ruang Dosen Lt.3',
                start: '2025-12-12T14:00',
                end: '2025-12-12T15:00'
            },
            {
                id: 's12',
                name: 'Latihan Futsal',
                note: 'Latihan rutin tim futsal kampus.',
                location: 'Lapangan Futsal',
                start: '2025-12-08T16:00',
                end: '2025-12-08T18:00'
            }
        ];
        sessionStorage.setItem('schedules', JSON.stringify(dummySchedules));
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Fungsi untuk generate ID unik
 * @param {string} prefix - Prefix untuk ID (contoh: 't' untuk task, 's' untuk schedule)
 * @returns {string} - ID unik dengan format: prefix + timestamp + random
 */
function generateId(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Fungsi untuk mengambil parameter dari URL
 * @param {string} param - Nama parameter yang ingin diambil
 * @returns {string|null} - Nilai parameter atau null jika tidak ada
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ============================================
// TASK MANAGEMENT FUNCTIONS
// ============================================

/**
 * Fungsi untuk mengambil semua tasks dari sessionStorage
 * @returns {Array} - Array of task objects
 */
function getTasks() {
    const tasks = sessionStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Fungsi untuk mengambil task berdasarkan ID
 * @param {string} id - ID task yang ingin diambil
 * @returns {Object|undefined} - Task object atau undefined jika tidak ditemukan
 */
function getTaskById(id) {
    const tasks = getTasks();
    return tasks.find(t => t.id === id);
}

/**
 * Fungsi untuk menyimpan task (create atau update)
 * Jika task memiliki ID, maka akan di-update
 * Jika tidak, maka akan dibuat task baru dengan ID baru
 * @param {Object} task - Task object yang akan disimpan
 */
function saveTask(task) {
    const tasks = getTasks();
    
    if (task.id) {
        // Mode Update - Cari task berdasarkan ID dan update
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
        }
    } else {
        // Mode Create - Buat ID baru dan tambahkan ke awal array
        task.id = generateId('t');
        tasks.unshift(task);
    }
    
    // Simpan kembali ke sessionStorage
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Fungsi untuk menghapus task berdasarkan ID
 * @param {string} id - ID task yang akan dihapus
 */
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

// ============================================
// SCHEDULE MANAGEMENT FUNCTIONS
// ============================================

/**
 * Fungsi untuk mengambil semua schedules dari sessionStorage
 * @returns {Array} - Array of schedule objects
 */
function getSchedules() {
    const schedules = sessionStorage.getItem('schedules');
    return schedules ? JSON.parse(schedules) : [];
}

/**
 * Fungsi untuk mengambil schedule berdasarkan ID
 * @param {string} id - ID schedule yang ingin diambil
 * @returns {Object|undefined} - Schedule object atau undefined jika tidak ditemukan
 */
function getScheduleById(id) {
    const schedules = getSchedules();
    return schedules.find(s => s.id === id);
}

/**
 * Fungsi untuk menyimpan schedule (create atau update)
 * Jika schedule memiliki ID, maka akan di-update
 * Jika tidak, maka akan dibuat schedule baru dengan ID baru
 * @param {Object} schedule - Schedule object yang akan disimpan
 */
function saveSchedule(schedule) {
    const schedules = getSchedules();
    
    if (schedule.id) {
        // Mode Update - Cari schedule berdasarkan ID dan update
        const index = schedules.findIndex(s => s.id === schedule.id);
        if (index !== -1) {
            schedules[index] = schedule;
        }
    } else {
        // Mode Create - Buat ID baru dan tambahkan ke array
        schedule.id = generateId('s');
        schedules.push(schedule);
    }
    
    // Simpan kembali ke sessionStorage
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
}

/**
 * Fungsi untuk menghapus schedule berdasarkan ID
 * @param {string} id - ID schedule yang akan dihapus
 */
function deleteSchedule(id) {
    let schedules = getSchedules();
    schedules = schedules.filter(s => s.id !== id);
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
}

// ============================================
// AUTHENTICATION FUNCTIONS (Dummy Implementation)
// ============================================

/**
 * Fungsi untuk login user
 * Ini adalah implementasi dummy untuk prototype
 * @param {string} username - Username user
 * @param {string} password - Password user
 * @returns {Object} - Object dengan property success (boolean) dan message (string)
 */
function login(username, password) {
    // Ambil data users dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cek apakah username terdaftar
    const userExists = users.find(u => u.username === username);
    
    if (!userExists) {
        // Username tidak ditemukan
        return {
            success: false,
            message: 'Username tidak terdaftar! Silakan daftar terlebih dahulu.'
        };
    }
    
    // Cari user berdasarkan username dan password
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login berhasil - Simpan user yang login ke sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return {
            success: true,
            message: 'Login berhasil!'
        };
    }
    
    // Password salah
    return {
        success: false,
        message: 'Password salah! Silakan coba lagi.'
    };
}

/**
 * Fungsi untuk mengambil data user yang sedang login
 * @returns {Object|null} - User object atau null jika tidak ada yang login
 */
function getCurrentUser() {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Fungsi untuk logout user
 * Menghapus data user dari sessionStorage dan redirect ke halaman login
 */
function logout() {
    sessionStorage.removeItem('currentUser');
    // Redirect ke halaman login
    // Note: Path bisa disesuaikan berdasarkan lokasi halaman
    window.location.href = '../../index.html';
}

/**
 * Fungsi untuk cek autentikasi
 * Akan redirect ke login jika user belum login
 * (Kecuali untuk halaman login dan register)
 */
function checkAuth() {
    const user = sessionStorage.getItem('currentUser');
    const path = window.location.pathname;
    
    // Skip cek untuk halaman login dan register
    if (!user && !path.includes('index.html') && !path.includes('register.html')) {
        // Untuk prototype, kita tidak strict enforce redirect
        // Bisa diaktifkan untuk production
        // window.location.href = '/index.html';
    }
}

// ============================================
// CUSTOM DROPDOWN INITIALIZATION
// ============================================

/**
 * Fungsi untuk inisialisasi custom dropdown
 * @param {HTMLElement} dropdownWrapper - Element wrapper dari dropdown
 */
function initCustomDropdown(dropdownWrapper) {
    const display = dropdownWrapper.querySelector('.custom-dropdown-display');
    const hiddenInput = dropdownWrapper.querySelector('input[type="hidden"]');
    const optionsContainer = dropdownWrapper.querySelector('.custom-dropdown-options');
    const options = optionsContainer.querySelectorAll('.custom-dropdown-option');
    const selectedText = dropdownWrapper.querySelector('#selectedGroupText');

    // Toggle dropdown
    display.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            hiddenInput.value = value;
            if (selectedText) {
                selectedText.textContent = value;
            }
            optionsContainer.style.display = 'none';
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });
}

// ============================================
// AUTO-INITIALIZE ON LOAD
// ============================================

// Inisialisasi data saat halaman dimuat
initData();
