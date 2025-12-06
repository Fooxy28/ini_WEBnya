// Data Management Logic

// Initialize Data if empty
function initData() {
    if (!sessionStorage.getItem('tasks')) {
        const dummyTasks = [
            {
                id: 't1',
                group: 'Kuliah',
                name: 'Mengerjakan Tugas RPL',
                description: 'Membuat prototype website task management.',
                start: '2025-12-03T08:00',
                end: '2025-12-05T23:59',
                status: 'progress', // todo, progress, done
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
                name: 'Desain UI',
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
                end: '2025-12-06T21:00',
                status: 'todo',
                progress: 0
            },
            {
                id: 't5',
                group: 'Pribadi',
                name: 'Jogging',
                description: 'Lari pagi di sekitaran kos.',
                start: '2025-12-07T06:00',
                end: '2025-12-07T07:00',
                status: 'todo',
                progress: 0
            }
        ];
        sessionStorage.setItem('tasks', JSON.stringify(dummyTasks));
    }

    if (!sessionStorage.getItem('schedules')) {
        const dummySchedules = [
            {
                id: 's1',
                name: 'Rapat Organisasi',
                note: 'Membahas proker bulan depan.',
                start: '2025-12-04T14:00',
                end: '2025-12-04T16:00'
            },
            {
                id: 's2',
                name: 'Kelas EDPL',
                note: 'Presentasi tugas kelompok.',
                start: '2025-12-05T10:00',
                end: '2025-12-05T12:00'
            },
            {
                id: 's3',
                name: 'Tutor Sebaya',
                note: 'Membahas materi kalkulus.',
                start: '2025-12-08T15:00',
                end: '2025-12-08T17:00'
            }
        ];
        sessionStorage.setItem('schedules', JSON.stringify(dummySchedules));
    }
}

// Helper: Generate ID
function generateId(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper: Get URL Parameter
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// --- TASK FUNCTIONS ---

function getTasks() {
    const tasks = sessionStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function getTaskById(id) {
    const tasks = getTasks();
    return tasks.find(t => t.id === id);
}

function saveTask(task) {
    const tasks = getTasks();
    if (task.id) {
        // Update
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
        }
    } else {
        // Create
        task.id = generateId('t');
        tasks.unshift(task);
    }
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- SCHEDULE FUNCTIONS ---

function getSchedules() {
    const schedules = sessionStorage.getItem('schedules');
    return schedules ? JSON.parse(schedules) : [];
}

function getScheduleById(id) {
    const schedules = getSchedules();
    return schedules.find(s => s.id === id);
}

function saveSchedule(schedule) {
    const schedules = getSchedules();
    if (schedule.id) {
        // Update
        const index = schedules.findIndex(s => s.id === schedule.id);
        if (index !== -1) {
            schedules[index] = schedule;
        }
    } else {
        // Create
        schedule.id = generateId('s');
        schedules.push(schedule);
    }
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
}

function deleteSchedule(id) {
    let schedules = getSchedules();
    schedules = schedules.filter(s => s.id !== id);
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
}

// --- AUTH FUNCTIONS (Dummy) ---
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function getCurrentUser() {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    // Optional: Clear all data on logout? User asked for refresh clear, but session storage persists.
    // Let's keep data for the session.
    window.location.href = '../../index.html'; // Adjust path based on location, usually handled in UI
}

function checkAuth() {
    // Simple check to redirect if not logged in (skip for login/register pages)
    const user = sessionStorage.getItem('currentUser');
    const path = window.location.pathname;
    if (!user && !path.includes('index.html') && !path.includes('register.html')) {
        // Redirect to login. 
        // Note: Path handling needs to be robust.
        // For prototype, we might skip strict enforcement or handle it in each page.
    }
}

// Initialize on load
initData();

function initCustomDropdown(wrapper, inputId, textId) {
    const display = wrapper.querySelector('.custom-dropdown-display');
    const optionsContainer = wrapper.querySelector('.custom-dropdown-options');
    const hiddenInput = inputId ? document.getElementById(inputId) : wrapper.querySelector('input[type="hidden"]');
    const textDisplay = textId ? document.getElementById(textId) : wrapper.querySelector('span[id^="selected"]');

    if (!display || !optionsContainer || !hiddenInput || !textDisplay) return;

    display.addEventListener('click', () => {
        wrapper.classList.toggle('open');
    });

    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('custom-dropdown-option')) {
            const selectedValue = e.target.getAttribute('data-value');
            const selectedText = e.target.textContent;

            textDisplay.textContent = selectedText;
            hiddenInput.value = selectedValue;
            
            wrapper.classList.remove('open');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
}
