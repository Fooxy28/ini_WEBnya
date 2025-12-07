/**
 * ================================================
 * TASK MENU PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman menu tugas
 * Termasuk: filter berdasarkan status dan grup, 
 * rendering daftar tugas, dan fitur complete task
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// GLOBAL VARIABLES
// ============================================

// State untuk filter saat ini
let currentFilter = 'Semua'; // Filter berdasarkan status: Semua, Todo, On Progress, Selesai
let currentGroup = 'all'; // Filter berdasarkan grup

// Ambil semua data tasks dari storage
const tasks = getTasks();

// ============================================
// INITIALIZATION FUNCTION
// ============================================

/**
 * Fungsi inisialisasi utama
 * Dipanggil saat halaman pertama kali dimuat
 */
function init() {
    // Inisialisasi dropdown untuk filter grup
    initTaskMenuDropdown();
    
    // Cek apakah ada parameter grup dari URL (dari home page)
    const urlGroup = getUrlParam('group');
    if (urlGroup) {
        currentGroup = urlGroup;
        // Re-initialize untuk update tampilan text dropdown
        initTaskMenuDropdown(); 
    }

    // Render daftar tugas pertama kali
    renderTasks();
}

// ============================================
// DROPDOWN INITIALIZATION
// ============================================

/**
 * Fungsi untuk inisialisasi custom dropdown Task Group
 */
function initTaskMenuDropdown() {
    const wrapper = document.querySelector('.custom-dropdown-wrapper');
    if (!wrapper) return;
    
    const optionsContainer = document.getElementById('groupOptions');
    const textDisplay = document.getElementById('selectedGroupName');

    // Ambil semua grup unik dari tasks
    const groups = ['all', ...new Set(tasks.map(t => t.group || 'Lainnya'))];

    // Populate dropdown options
    optionsContainer.innerHTML = groups.map(g => 
        `<div class="custom-dropdown-option" data-value="${g}">${g === 'all' ? 'Semua Group' : g}</div>`
    ).join('');

    // Set tampilan awal dropdown
    textDisplay.textContent = currentGroup === 'all' ? 'Semua Group' : currentGroup;

    // Event listener untuk membuka dropdown
    const display = wrapper.querySelector('.custom-dropdown-display');
    display.addEventListener('click', () => {
        wrapper.classList.toggle('open');
    });

    // Event listener untuk memilih option dari dropdown
    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('custom-dropdown-option')) {
            const selectedValue = e.target.getAttribute('data-value');
            
            // Update state dan tampilan
            currentGroup = selectedValue;
            textDisplay.textContent = e.target.textContent;
            
            // Tutup dropdown
            wrapper.classList.remove('open');
            
            // Re-render tasks dengan filter grup baru
            renderTasks();
        }
    });

    // Global click listener untuk menutup dropdown saat klik di luar
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
}

// ============================================
// FILTER FUNCTIONS
// ============================================

/**
 * Fungsi untuk set filter berdasarkan status
 * @param {string} filter - Filter status: 'Semua', 'Todo', 'On Progress', 'Selesai'
 */
function setFilter(filter) {
    // Update state filter
    currentFilter = filter;
    
    // Update tampilan tombol filter yang aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnText = btn.innerText;
        // Handle perbedaan "On Progres" vs "On Progress"
        const filterMatch = (filter === 'On Progress' && btnText === 'On Progres') || (btnText === filter);
        
        if(filterMatch) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Re-render tasks dengan filter baru
    renderTasks();
}

/**
 * Helper function untuk menentukan kategori task berdasarkan deadline
 * @param {Object} task - Object task
 * @returns {string} - Kategori: 'Selesai', 'On Progress', atau 'Todo'
 */
function getTaskCategory(task) {
    // Jika status sudah done, kategorikan sebagai Selesai
    if (task.status === 'done') return 'Selesai';
    
    // Hitung selisih hari dari sekarang ke deadline
    const now = new Date();
    const end = new Date(task.end);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Task dengan deadline <= 3 hari dianggap "On Progress"
    if (diffDays <= 3) return 'On Progress';
    return 'Todo';
}

/**
 * Helper function untuk mendapatkan icon berdasarkan grup
 * @param {string} group - Nama grup
 * @returns {string} - Emoji icon
 */
function getGroupIcon(group) {
    switch(group.toLowerCase()) {
        case 'project': return '🗂️';
        case 'personal': return '👤';
        case 'study': return '📚';
        default: return '📋';
    }
}

// ============================================
// RENDER TASKS FUNCTION
// ============================================

/**
 * Fungsi utama untuk render daftar tugas
 * Menerapkan filter berdasarkan grup dan status
 */
function renderTasks() {
    const taskListEl = document.getElementById('taskList');
    
    let filteredTasks = tasks;

    // Filter berdasarkan grup
    if (currentGroup !== 'all') {
        filteredTasks = filteredTasks.filter(t => (t.group || 'Lainnya') === currentGroup);
    }

    // Filter berdasarkan kategori/status
    if (currentFilter === 'Todo') {
        filteredTasks = filteredTasks.filter(t => getTaskCategory(t) === 'Todo');
    } else if (currentFilter === 'On Progress') {
        filteredTasks = filteredTasks.filter(t => getTaskCategory(t) === 'On Progress');
    } else if (currentFilter === 'Selesai') {
        filteredTasks = filteredTasks.filter(t => getTaskCategory(t) === 'Selesai');
    }

    // Render hasil filter
    if (filteredTasks.length === 0) {
        taskListEl.innerHTML = '<p class="text-muted" style="text-align: center;">Tidak ada tugas.</p>';
    } else {
        taskListEl.innerHTML = filteredTasks.map(task => {
            const category = getTaskCategory(task);
            
            // Tentukan kelas status untuk styling
            let statusClass = 'status-todo';
            if (category === 'On Progress') { statusClass = 'status-progress'; }
            if (category === 'Selesai') { statusClass = 'status-done'; }
            
            const group = task.group || 'General';
            const groupIcon = getGroupIcon(group);

            // Format tanggal: DD/Mon/YY
            const date = new Date(task.end);
            const formattedDate = `${date.getDate()}/${date.toLocaleString('id-ID', { month: 'short' })}/${String(date.getFullYear()).slice(-2)}`;
            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            const isDone = task.status === 'done';
            const completedClass = isDone ? 'completed' : '';

            return `
            <div class="task-item-container ${completedClass}" id="task-container-${task.id}">
                <div class="task-card-content" onclick="toggleSlide('${task.id}')">
                    <div class="new-task-card">
                        <div class="new-task-header">
                            <span class="new-task-group">${group}</span>
                            <div class="card-icon" style="background-color: var(--${group.toLowerCase()}-bg, #ffe0e0);">${groupIcon}</div>
                        </div>
                        <h4 class="new-task-title">
                            <span class="task-title-link" onclick="event.stopPropagation(); window.location.href='detailtask.html?id=${task.id}'">${task.name}</span>
                        </h4>
                        <div class="new-task-footer">
                            <div class="new-task-meta">
                                <span>🕒 ${formattedTime}</span>
                                <span>${formattedDate}</span>
                            </div>
                            <span class="new-task-status ${statusClass}" id="status-text-${task.id}">${category}</span>
                        </div>
                    </div>
                </div>
                <div class="task-complete-indicator" onclick="completeTask('${task.id}')">
                    ✓
                </div>
            </div>
        `}).join('');
    }
}

// ============================================
// TASK INTERACTION FUNCTIONS
// ============================================

/**
 * Toggle slide untuk menampilkan tombol complete
 * @param {string} taskId - ID dari task yang akan di-toggle
 */
function toggleSlide(taskId) {
    // Jangan slide jika task sudah selesai
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status === 'done') return;

    const container = document.getElementById(`task-container-${taskId}`);
    if (container) {
        container.classList.toggle('revealed');
    }
}

/**
 * Fungsi untuk menandai task sebagai selesai
 * @param {string} taskId - ID dari task yang akan diselesaikan
 */
function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const container = document.getElementById(`task-container-${taskId}`);
    
    // Tandai task sebagai selesai
    task.status = 'done';
    task.progress = 100;
    
    // Slide kembali
    if(container) {
        container.classList.remove('revealed');
    }
    
    // Simpan perubahan ke storage
    saveTask(task);
    
    // Re-render daftar tugas untuk reflect perubahan
    renderTasks();
}

// ============================================
// START INITIALIZATION
// ============================================

// Panggil fungsi init saat halaman dimuat
init();

// Initialize notification system
initNotifications();
