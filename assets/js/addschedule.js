/**
 * ================================================
 * ADD SCHEDULE PAGE SCRIPT
 * ================================================
 * File ini menangani logika halaman tambah jadwal,
 * termasuk fungsionalitas jadwal berulang.
 */

// ============================================
// INITIALIZATION & AUTH CHECK
// ============================================

// Cek autentikasi user
checkAuth();

// ============================================
// DOM ELEMENTS
// ============================================

const addScheduleForm = document.getElementById('addScheduleForm');
const startDateInput = document.getElementById('start');
const repeatDropdown = document.getElementById('repeatDropdown');
const repeatHiddenInput = document.getElementById('repeat');
const selectedRepeatText = document.getElementById('selectedRepeatText');
const dayPickerWrapper = document.getElementById('dayPickerWrapper');

// ============================================
// INITIALIZE DEFAULT DATE
// ============================================

function setInitialDateTime() {
    const savedDateStr = sessionStorage.getItem('selectedCalendarDate');
    const now = new Date();
    let initialDate = now;

    if (savedDateStr) {
        const savedDate = new Date(savedDateStr);
        savedDate.setHours(now.getHours());
        savedDate.setMinutes(now.getMinutes());
        initialDate = savedDate;
    }

    const year = initialDate.getFullYear();
    const month = String(initialDate.getMonth() + 1).padStart(2, '0');
    const day = String(initialDate.getDate()).padStart(2, '0');
    const hours = String(initialDate.getHours()).padStart(2, '0');
    const minutes = String(initialDate.getMinutes()).padStart(2, '0');
    
    startDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
}

// ============================================
// CUSTOM DROPDOWN & DAY PICKER LOGIC
// ============================================

function setupEventListeners() {
    // Logic for custom repeat dropdown
    if (repeatDropdown) {
        const options = repeatDropdown.querySelector('.custom-dropdown-options');

        // Make the entire card clickable to open the dropdown
        repeatDropdown.addEventListener('click', (e) => {
            // Cek agar tidak toggle saat klik option
            if (!e.target.closest('.custom-dropdown-options')) {
                repeatDropdown.classList.toggle('open');
            }
        });

        // Handle option selection
        options.addEventListener('click', (e) => {
            if (e.target.classList.contains('custom-dropdown-option')) {
                const value = e.target.getAttribute('data-value');
                const text = e.target.textContent;

                repeatHiddenInput.value = value;
                selectedRepeatText.textContent = text;
                repeatDropdown.classList.remove('open');

                // Show/hide day picker
                if (value === 'daily') {
                    dayPickerWrapper.classList.remove('hidden-select');
                } else {
                    dayPickerWrapper.classList.add('hidden-select');
                }
            }
        });
    }

    // Global click to close dropdown
    document.addEventListener('click', (e) => {
        if (repeatDropdown && !repeatDropdown.contains(e.target)) {
            repeatDropdown.classList.remove('open');
        }
    });

    // Form submission
    addScheduleForm.addEventListener('submit', handleFormSubmit);
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const note = document.getElementById('note').value;
    const startStr = document.getElementById('start').value;
    const endStr = document.getElementById('end').value;
    const repeatOption = repeatHiddenInput.value;

    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    
    if (endDate <= startDate) {
        toastError('Waktu selesai harus setelah waktu mulai.', 'Error');
        return;
    }

    if (repeatOption === 'weekly') {
        for (let i = 0; i < 4; i++) {
            const newStart = new Date(startDate.getTime());
            newStart.setDate(startDate.getDate() + (i * 7));
            const newEnd = new Date(endDate.getTime());
            newEnd.setDate(endDate.getDate() + (i * 7));
            saveSchedule(createScheduleObject(name, note, newStart, newEnd));
        }
    } else if (repeatOption === 'daily') {
        const selectedDayNodes = document.querySelectorAll('#dayPickerWrapper input[type="checkbox"]:checked');
        if (selectedDayNodes.length === 0) {
            toastError('Pilih setidaknya satu hari untuk jadwal harian.', 'Error');
            return;
        }
        const dailySelectedDays = Array.from(selectedDayNodes).map(node => node.value);

        for (let i = 0; i < 30; i++) {
            const newStart = new Date(startDate.getTime());
            newStart.setDate(startDate.getDate() + i);

            if (dailySelectedDays.includes(String(newStart.getDay()))) {
                const newEnd = new Date(endDate.getTime());
                // Calculate duration to maintain it across different days
                const duration = endDate.getTime() - startDate.getTime();
                newEnd.setTime(newStart.getTime() + duration);
                saveSchedule(createScheduleObject(name, note, newStart, newEnd));
            }
        }
    } else {
        saveSchedule(createScheduleObject(name, note, startDate, endDate));
    }
    
    toastSuccess('Jadwal berhasil ditambahkan!', 'Berhasil');
    setTimeout(() => {
        window.location.href = '../home.html';
    }, 1000);
}

/**
 * Helper to create a schedule object and format dates
 */
function createScheduleObject(name, note, startDate, endDate) {
    return {
        name: name,
        note: note,
        start: startDate.toISOString().slice(0, 16),
        end: endDate.toISOString().slice(0, 16)
    };
}

// ============================================
// INITIALIZE SCRIPT
// ============================================

setInitialDateTime();
setupEventListeners();
