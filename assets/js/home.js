/**
 * ================================================
 * HOME PAGE SCRIPT
 * ================================================
 * File ini menangani semua logika di halaman dashboard utama
 * Termasuk: rendering kalender, task groups, progress overview, 
 * dan daftar jadwal
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// Ambil dan tampilkan informasi user yang sedang login
const currentUser = getCurrentUser();
if (currentUser) {
    document.getElementById('home-username').textContent = currentUser.username;
    const avatarImg = document.getElementById('home-avatar');
    avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=random`;
}

// ============================================
// CALENDAR FUNCTIONALITY
// ============================================

// Global state untuk calendar - ambil dari sessionStorage atau gunakan tanggal hari ini
let savedDate = sessionStorage.getItem('selectedCalendarDate');
let selectedDate = savedDate ? new Date(savedDate) : new Date();

/**
 * Fungsi untuk render kalender
 * Menampilkan semua tanggal dalam bulan yang dipilih
 */
function renderCalendar() {
    const container = document.getElementById('calendarStrip');
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    // Gunakan selectedDate untuk menentukan bulan yang akan di-render
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let html = '';
    
    // Loop untuk setiap hari dalam bulan
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayName = days[date.getDay()];
        const dayNum = i;
        
        // Cek apakah tanggal ini adalah tanggal yang dipilih
        const isSelected = (
            date.getDate() === selectedDate.getDate() && 
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
        
        const activeClass = isSelected ? 'active' : '';
        
        html += `
            <div class="date-item ${activeClass}" onclick="selectDate('${date.toISOString()}')">
                <span class="date-num">${dayNum}</span>
                <span class="date-day">${dayName}</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

/**
 * Fungsi untuk memilih tanggal
 * @param {string} dateStr - Tanggal dalam format ISO string
 */
function selectDate(dateStr) {
    selectedDate = new Date(dateStr);
    sessionStorage.setItem('selectedCalendarDate', dateStr); // Simpan tanggal yang dipilih
    renderCalendar();
    renderSchedules(); // Update daftar jadwal sesuai tanggal yang dipilih
}

// Enable Mouse Wheel Scroll untuk kalender horizontal
const calendarContainer = document.getElementById('calendarStrip');
if(calendarContainer) {
    calendarContainer.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            calendarContainer.scrollLeft += evt.deltaY;
        }
    });
}

// Enable Mouse Wheel Scroll untuk semua elemen horizontal-scroll
const horizontalScrollElements = document.querySelectorAll('.horizontal-scroll');
horizontalScrollElements.forEach(element => {
    element.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            element.scrollLeft += evt.deltaY;
        }
    });
});

// Initialize notification system
initNotifications();

// Render kalender pertama kali
renderCalendar();

// ============================================
// DATA FETCHING
// ============================================

// Ambil semua data tasks dan schedules dari sessionStorage
const tasks = getTasks();
const schedules = getSchedules();

// ============================================
// PROGRESS OVERVIEW SECTION
// ============================================

/**
 * Fungsi untuk render bagian Progress Overview
 * Menampilkan rata-rata progress dan daftar tugas yang sedang berjalan
 */
function renderProgressOverview() {
    // Hitung rata-rata progress dari semua task
    const totalProgress = tasks.reduce((acc, curr) => acc + (parseInt(curr.progress) || 0), 0);
    const avgProgress = tasks.length ? Math.round(totalProgress / tasks.length) : 0;
    
    // Update teks progress
    const dailyText = document.getElementById('dailyProgressText');
    if(dailyText) dailyText.innerText = `${avgProgress}%`;

    // Update lingkaran progress visual
    const progressCircle = document.querySelector('.progress-circle');
    if(progressCircle) {
        progressCircle.style.background = `conic-gradient(#fff ${avgProgress}%, rgba(255,255,255,0.3) 0)`;
    }

    // Render daftar "In Progress" - Task dengan due date paling dekat
    const nearestTasks = tasks
        .filter(t => t.status !== 'done') // Hanya task yang belum selesai
        .sort((a, b) => new Date(a.end) - new Date(b.end)) // Urutkan berdasarkan tanggal
        .slice(0, 5); // Ambil 5 teratas

    const inProgressListEl = document.getElementById('inProgressList');
    
    if (inProgressListEl) {
        if (nearestTasks.length === 0) {
            inProgressListEl.innerHTML = '<p class="text-muted" style="padding:10px;">Tidak ada tugas aktif.</p>';
        } else {
            inProgressListEl.innerHTML = nearestTasks.map((task, index) => {
                const colors = ['bg-pink', 'bg-green', 'bg-purple', 'bg-orange'];
                const colorClass = colors[index % colors.length];
                
                return `
                <div class="card-item ${colorClass}" onclick="window.location.href='task/detailtask.html?id=${task.id}'" style="cursor: pointer;">
                    <div class="card-icon bg-white">📋</div>
                    <div class="card-content">
                        <small>${task.group || 'General'}</small>
                        <h5>${task.name}</h5>
                        <div class="progress-bar-container">
                            <div class="progress-bar bg-white" style="width: ${task.progress}%"></div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }
    }
}

// Render progress overview pertama kali
renderProgressOverview();

// ============================================
// TASK GROUPS SECTION
// ============================================

/**
 * Fungsi untuk render bagian Task Groups
 * Menampilkan semua grup task dengan progress masing-masing
 */
function renderTaskGroups() {
    // Kelompokkan tasks berdasarkan group
    const groups = {};
    tasks.forEach(task => {
        const g = task.group || 'Lainnya';
        if (!groups[g]) groups[g] = { count: 0, totalProgress: 0 };
        groups[g].count++;
        groups[g].totalProgress += (parseInt(task.progress) || 0);
    });

    const taskGroupsListEl = document.getElementById('taskGroupsList');
    if (taskGroupsListEl) {
        const groupKeys = Object.keys(groups);

        if (groupKeys.length === 0) {
            taskGroupsListEl.innerHTML = '<p class="text-muted">Belum ada grup.</p>';
        } else {
            taskGroupsListEl.innerHTML = groupKeys.map((groupName, index) => {
                const group = groups[groupName];
                const avg = Math.round(group.totalProgress / group.count);
                
                // Mapping warna untuk setiap grup
                const colors = ['bg-pink', 'bg-purple', 'bg-green', 'bg-orange'];
                const colorClass = colors[index % colors.length];
                
                let chartColor = '#ff6b6b'; // Default pink
                if(colorClass === 'bg-purple') chartColor = '#6c5ce7';
                if(colorClass === 'bg-green') chartColor = '#00b894';
                if(colorClass === 'bg-orange') chartColor = '#fdcb6e';

                return `
                <div class="group-card" onclick="window.location.href='task/taskmenu.html?group=${encodeURIComponent(groupName)}'" style="cursor:pointer;">
                    <div class="card-icon ${colorClass}">📁</div>
                    <div>
                        <h5>${groupName}</h5>
                        <small class="text-muted">${group.count} Tugas</small>
                    </div>
                    <div class="ml-auto">
                        <div class="mini-progress-circle" style="position:relative; width:40px; height:40px; border-radius:50%; background: conic-gradient(${chartColor} ${avg}%, #eee 0); display:flex; align-items:center; justify-content:center;">
                            <div style="position:absolute; width:32px; height:32px; background:white; border-radius:50%;"></div>
                            <span style="position:relative; z-index:1; font-size:0.8rem; font-weight:bold;">${avg}%</span>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }
    }
}

// Render task groups pertama kali
renderTaskGroups();

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
    
    // Re-render semua komponen yang bergantung pada data task
    renderProgressOverview();
    renderTaskGroups();
    renderTasks(document.querySelector('.filter-btn.active').innerText);
}

// ============================================
// TASK LIST RENDERING
// ============================================

/**
 * Helper function untuk menentukan kategori task
 * @param {Object} task - Object task
 * @returns {string} - Kategori: 'Selesai', 'On Progress', atau 'Todo'
 */
function getTaskCategory(task) {
    if (task.status === 'done') return 'Selesai';
    
    const now = new Date();
    const end = new Date(task.end);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Task dengan deadline <= 3 hari dianggap "On Progress"
    if (diffDays <= 3) return 'On Progress';
    return 'Todo';
}

/**
 * Fungsi untuk render daftar tasks dengan filter
 * @param {string} filter - Filter kategori: 'Semua', 'Todo', 'On Progress', atau 'Selesai'
 */
function renderTasks(filter = 'Semua') {
    // Update state tombol filter yang aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnText = btn.innerText;
        const filterMatch = (filter === 'On Progress' && btnText === 'On Progres') || (btnText === filter);
        
        if(filterMatch) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const taskListEl = document.getElementById('taskList');
    let filteredTasks = tasks;

    // Filter tasks berdasarkan kategori yang dipilih
    if (filter === 'Todo') {
        filteredTasks = tasks.filter(t => getTaskCategory(t) === 'Todo');
    } else if (filter === 'On Progress') {
        filteredTasks = tasks.filter(t => getTaskCategory(t) === 'On Progress');
    } else if (filter === 'Selesai') {
        filteredTasks = tasks.filter(t => getTaskCategory(t) === 'Selesai');
    } else {
        // Filter 'Semua' - tidak menampilkan task yang sudah selesai
        filteredTasks = tasks.filter(t => t.status !== 'done');
    }
    
    // Urutkan tasks: yang belum selesai di atas, baru yang sudah selesai
    filteredTasks.sort((a, b) => {
        // Task yang belum selesai (status !== 'done') prioritas lebih tinggi
        if (a.status === 'done' && b.status !== 'done') return 1;
        if (a.status !== 'done' && b.status === 'done') return -1;
        // Jika sama-sama selesai atau belum, urutkan berdasarkan tanggal deadline
        return new Date(a.end) - new Date(b.end);
    })

    // Render daftar tasks
    if (filteredTasks.length === 0) {
        taskListEl.innerHTML = '<p class="text-muted">Tidak ada tugas untuk kategori ini.</p>';
    } else {
        taskListEl.innerHTML = filteredTasks.map(task => {
            const category = getTaskCategory(task);
            
            // Tentukan kelas status untuk styling
            let statusClass = 'status-todo';
            if (category === 'On Progress') { statusClass = 'status-progress'; }
            if (category === 'Selesai') { statusClass = 'status-done'; }
            
            const group = task.group || 'General';
            const groupIcon = '📋';

            // Format tanggal dan waktu
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
                            <span class="task-title-link" onclick="event.stopPropagation(); window.location.href='task/detailtask.html?id=${task.id}'">${task.name}</span>
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
            `;
        }).join('');
    }
}

// Render tasks pertama kali dengan filter 'Semua'
renderTasks('Semua');

// ============================================
// SCHEDULE LIST RENDERING
// ============================================

/**
 * Fungsi untuk render daftar jadwal berdasarkan tanggal yang dipilih
 */
function renderSchedules() {
    const allSchedules = getSchedules();
    const scheduleListEl = document.getElementById('scheduleList');
    
    // Filter jadwal yang sesuai dengan tanggal yang dipilih
    const filteredSchedules = allSchedules.filter(s => {
        const sDate = new Date(s.start);
        return (
            sDate.getDate() === selectedDate.getDate() &&
            sDate.getMonth() === selectedDate.getMonth() &&
            sDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    // Render daftar jadwal
    if (filteredSchedules.length === 0) {
        scheduleListEl.innerHTML = '<p class="text-muted">Tidak ada jadwal untuk tanggal ini.</p>';
    } else {
        scheduleListEl.innerHTML = filteredSchedules.map(schedule => `
            <div class="schedule-item" onclick="window.location.href='schedule/detailschedule.html?id=${schedule.id}'">
                <div class="schedule-time">
                    ${new Date(schedule.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    <br>
                    <span style="color:#ccc; font-weight:normal;">- ${new Date(schedule.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div class="schedule-info flex-grow">
                    <h5>${schedule.name}</h5>
                    <p>${schedule.location || 'No Location'}</p>
                </div>
                <div style="color:#4facfe;">🔔</div>
            </div>
        `).join('');
    }
}

// Render schedules pertama kali
renderSchedules();
