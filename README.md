# 📋 Web Task and Schedule Management

Aplikasi web modern untuk mengelola tugas dan jadwal harian Anda dengan antarmuka yang intuitif dan responsif.

## 📝 Deskripsi

Web Task and Schedule Management adalah aplikasi berbasis web yang membantu pengguna untuk mencatat, memantau, dan mengelola tugas serta jadwal mereka secara efektif. Dengan antarmuka yang bersih dan mudah digunakan, pengguna dapat dengan mudah melihat progress harian mereka dan mengatur prioritas tugas.

## ✨ Fitur Utama

### 🔐 Autentikasi & Profil
- **Login & Registrasi**: Sistem autentikasi yang aman dengan validasi lengkap
- **Manajemen Profil**: Edit informasi pribadi, tanggal lahir, dan jenis kelamin
- **Avatar Dinamis**: Avatar otomatis berdasarkan nama pengguna

### 📊 Dashboard Interaktif
- **Progress Overview**: Tampilan ringkasan progress tugas harian
- **Task Groups**: Pengelompokan tugas berdasarkan kategori (Kuliah, Project, Pribadi)
- **Calendar Strip**: Navigasi kalender horizontal untuk melihat jadwal
- **Visual Progress**: Chart progress dengan indikator visual yang menarik

### ✅ Manajemen Tugas (Task)
- Menambahkan tugas baru dengan detail lengkap
- Mengedit dan menghapus tugas existing
- Filter tugas berdasarkan status (Todo, On Progress, Selesai)
- Filter berdasarkan grup/kategori
- Slide-to-complete gesture untuk menandai tugas selesai
- Auto-categorization berdasarkan deadline

### 📅 Manajemen Jadwal (Schedule)
- Menambahkan jadwal kegiatan dengan waktu mulai dan selesai
- Menampilkan jadwal berdasarkan tanggal yang dipilih
- Mengedit dan menghapus jadwal
- Notifikasi visual untuk jadwal hari ini

### 🎨 Desain & UX
- Desain responsif untuk berbagai ukuran layar
- Smooth animations dan transitions
- Color-coded task groups untuk identifikasi cepat
- Intuitive navigation dengan back button support

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik halaman web
- **CSS3**: Styling modern dengan flexbox dan grid layout
- **JavaScript (Vanilla)**: Logika aplikasi tanpa framework
- **LocalStorage**: Penyimpanan data user
- **SessionStorage**: Penyimpanan data tasks dan schedules
- **Font Awesome**: Icon library untuk UI elements

## 📂 Struktur Proyek

```
ini_WEBnya/
├── index.html                 # Halaman Login (Landing Page)
├── README.md                  # Dokumentasi proyek
│
├── assets/                    # Folder aset statis
│   ├── css/                   # Stylesheets
│   │   ├── style.css         # Style utama aplikasi
│   │   └── taskmenu.css      # Style khusus task menu
│   │
│   └── js/                    # JavaScript files
│       ├── script.js         # Global functions & utilities
│       ├── login.js          # Login page logic
│       ├── register.js       # Registration page logic
│       ├── home.js           # Dashboard logic
│       ├── profile.js        # Profile page logic
│       ├── editprofile.js    # Edit profile logic
│       ├── addtask.js        # Add task logic
│       ├── edittask.js       # Edit task logic
│       ├── detailtask.js     # Task detail logic
│       ├── taskmenu.js       # Task menu & filtering
│       ├── addschedule.js    # Add schedule logic
│       ├── editschedule.js   # Edit schedule logic
│       └── detailschedule.js # Schedule detail logic
│
└── pages/                     # Halaman-halaman aplikasi
    ├── register.html         # Halaman registrasi
    ├── home.html             # Dashboard utama
    ├── profile.html          # Halaman profil user
    ├── editprofile.html      # Halaman edit profil
    │
    ├── task/                 # Halaman task management
    │   ├── addtask.html      # Form tambah tugas
    │   ├── edittask.html     # Form edit tugas
    │   ├── detailtask.html   # Detail tugas
    │   └── taskmenu.html     # Menu & daftar tugas
    │
    └── schedule/             # Halaman schedule management
        ├── addschedule.html  # Form tambah jadwal
        ├── editschedule.html # Form edit jadwal
        └── detailschedule.html # Detail jadwal
```

## 🚀 Cara Menjalankan

### Prasyarat
- Browser modern (Chrome, Firefox, Edge, Safari)
- Tidak memerlukan instalasi server atau dependencies

### Langkah-langkah

1. **Clone repository** ini ke komputer lokal Anda:
   ```bash
   git clone https://github.com/Fooxy28/ini_WEBnya.git
   ```

2. **Buka folder proyek**:
   ```bash
   cd ini_WEBnya
   ```

3. **Jalankan aplikasi**:
   - Buka file `index.html` di browser web pilihan Anda
   - Atau gunakan Live Server di VS Code untuk development

4. **Login atau Daftar**:
   - Klik "Daftar" untuk membuat akun baru
   - Atau login jika sudah memiliki akun

## 💡 Panduan Penggunaan

### Membuat Akun Baru
1. Klik link "Daftar" di halaman login
2. Isi form registrasi (Username, Account, Password)
3. Password minimal 6 karakter
4. Klik "Daftar" untuk membuat akun

### Mengelola Tugas
1. **Tambah Tugas**: Klik tombol "+" di halaman Task Menu
2. **Filter Tugas**: Gunakan filter "Semua", "Todo", "On Progress", "Selesai"
3. **Complete Task**: Slide task ke kanan dan klik checkmark
4. **Edit Task**: Klik pada task untuk melihat detail, lalu klik icon edit

### Mengelola Jadwal
1. **Tambah Jadwal**: Klik tanggal di calendar, lalu klik "+"
2. **Lihat Jadwal**: Jadwal otomatis muncul sesuai tanggal yang dipilih
3. **Edit Jadwal**: Klik jadwal untuk melihat detail, lalu edit

## 🎯 Fitur Unggulan

### Smart Task Categorization
Tugas otomatis dikategorikan berdasarkan deadline:
- **Todo**: Deadline lebih dari 3 hari
- **On Progress**: Deadline 3 hari atau kurang
- **Selesai**: Tugas yang sudah diselesaikan

### Visual Progress Tracking
- Circle chart untuk progress keseluruhan
- Progress bar untuk setiap task group
- Color-coded status indicators

### Responsive Calendar
- Horizontal scroll calendar
- Mouse wheel support
- Active date highlighting

## 🔧 Konfigurasi

### Data Storage
Aplikasi menggunakan browser storage:
- **LocalStorage**: Menyimpan data user accounts
- **SessionStorage**: Menyimpan tasks, schedules, dan current user session

### Clear Data
Untuk reset aplikasi, buka Browser Console (F12) dan jalankan:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 👥 Kontributor

- **Developer**: Fooxy28
- **Project**: Tugas Evaluasi Desain Perangkat Lunak

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik - Mata Kuliah Evaluasi Desain Perangkat Lunak.

## 🐛 Bug Reports & Feature Requests

Jika menemukan bug atau memiliki saran fitur, silakan buat issue di repository GitHub.

## 📞 Kontak

- GitHub: [@Fooxy28](https://github.com/Fooxy28)
- Repository: [ini_WEBnya](https://github.com/Fooxy28/ini_WEBnya)

---

**Happy Task Managing! 🎉**
