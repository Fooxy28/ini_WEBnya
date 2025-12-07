/**
 * Notification Manager
 * Handles notification generation, display, and interactions
 */

// Global notification state
let notificationDropdownVisible = false;

/**
 * Generate notifications based on tasks and schedules
 * @returns {Array} Array of notification objects
 */
function generateNotifications() {
    const notifications = [];
    const tasks = getTasks();
    const schedules = getSchedules();
    const now = new Date();

    // Check for tasks due today
    tasks.forEach(task => {
        if (task.status === 'Completed') return; // Skip completed tasks
        
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        // Task due today
        if (dueDate.getTime() === today.getTime()) {
            notifications.push({
                type: 'deadline',
                icon: '⚠️',
                title: 'Task Due Today',
                message: `"${task.title}" is due today!`,
                time: formatNotificationTime(task.dueDate),
                data: task
            });
        }
        // Task overdue
        else if (dueDate < today) {
            notifications.push({
                type: 'deadline',
                icon: '🔴',
                title: 'Overdue Task',
                message: `"${task.title}" is overdue!`,
                time: formatNotificationTime(task.dueDate),
                data: task
            });
        }
        // Task due tomorrow
        else {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (dueDate.getTime() === tomorrow.getTime()) {
                notifications.push({
                    type: 'task',
                    icon: '📋',
                    title: 'Task Due Tomorrow',
                    message: `"${task.title}" is due tomorrow`,
                    time: formatNotificationTime(task.dueDate),
                    data: task
                });
            }
        }
    });

    // Check for upcoming schedules (within 10 minutes or today)
    schedules.forEach(schedule => {
        const scheduleDateTime = new Date(`${schedule.date}T${schedule.time}`);
        const diffMs = scheduleDateTime - now;
        const diffMins = Math.floor(diffMs / 60000);

        // Schedule starting within 10 minutes
        if (diffMins > 0 && diffMins <= 10) {
            notifications.push({
                type: 'schedule',
                icon: '⏰',
                title: 'Upcoming Schedule',
                message: `"${schedule.title}" starts in ${diffMins} minute${diffMins > 1 ? 's' : ''}`,
                time: formatNotificationTime(scheduleDateTime),
                data: schedule
            });
        }
        // Schedule happening today (but not within 10 mins)
        else if (diffMins > 10) {
            const scheduleDate = new Date(schedule.date);
            const today = new Date();
            scheduleDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            if (scheduleDate.getTime() === today.getTime()) {
                notifications.push({
                    type: 'schedule',
                    icon: '📅',
                    title: 'Today\'s Schedule',
                    message: `"${schedule.title}" at ${schedule.time}`,
                    time: formatNotificationTime(scheduleDateTime),
                    data: schedule
                });
            }
        }
    });

    // Sort notifications by time (most urgent first)
    notifications.sort((a, b) => {
        // Priority order: deadline > schedule > task
        const typeOrder = { 'deadline': 0, 'schedule': 1, 'task': 2 };
        return typeOrder[a.type] - typeOrder[b.type];
    });

    return notifications;
}

/**
 * Format notification time to readable string
 * @param {Date|String} date - Date to format
 * @returns {String} Formatted time string
 */
function formatNotificationTime(date) {
    const d = new Date(date);
    const now = new Date();
    const diffMs = d - now; // Changed to calculate future time
    const diffMins = Math.floor(Math.abs(diffMs) / 60000);
    const diffHours = Math.floor(Math.abs(diffMs) / 3600000);
    const diffDays = Math.floor(Math.abs(diffMs) / 86400000);

    // Future time
    if (diffMs > 0) {
        if (diffMins < 60) return `In ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
        if (diffHours < 24) return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        if (diffDays < 7) return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
    // Past time
    else {
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    
    return d.toLocaleDateString();
}

/**
 * Render notification dropdown
 */
function renderNotificationDropdown() {
    const notifications = generateNotifications();
    const notificationList = document.querySelector('.notification-list');
    const notificationCount = document.querySelector('.notification-count');
    const notificationBadge = document.querySelector('.notification-badge');
    const notificationDot = document.querySelector('.notification-dot');

    // Update count
    if (notificationCount) {
        notificationCount.textContent = notifications.length;
    }

    // Update badge
    if (notifications.length > 0) {
        if (notificationBadge) {
            notificationBadge.textContent = notifications.length > 9 ? '9+' : notifications.length;
            notificationBadge.classList.add('show');
        }
        if (notificationDot) {
            notificationDot.classList.add('show');
        }
    } else {
        if (notificationBadge) {
            notificationBadge.classList.remove('show');
        }
        if (notificationDot) {
            notificationDot.classList.remove('show');
        }
    }

    // Clear existing notifications
    if (notificationList) {
        notificationList.innerHTML = '';

        if (notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="notification-empty">
                    <div class="notification-empty-icon">🔔</div>
                    <p>No new notifications</p>
                </div>
            `;
        } else {
            notifications.forEach(notification => {
                const notificationItem = document.createElement('div');
                notificationItem.className = 'notification-item';
                notificationItem.innerHTML = `
                    <div class="notification-icon-wrapper ${notification.type}">
                        ${notification.icon}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${notification.time}</div>
                    </div>
                `;
                notificationList.appendChild(notificationItem);
            });
        }
    }
}

/**
 * Toggle notification dropdown visibility
 */
function toggleNotificationDropdown() {
    const dropdown = document.querySelector('.notification-dropdown');
    const overlay = document.querySelector('.notification-overlay');

    if (!dropdown || !overlay) return;

    notificationDropdownVisible = !notificationDropdownVisible;

    if (notificationDropdownVisible) {
        dropdown.classList.add('show');
        overlay.classList.add('show');
        renderNotificationDropdown(); // Refresh notifications when opening
    } else {
        dropdown.classList.remove('show');
        overlay.classList.remove('show');
    }
}

/**
 * Close notification dropdown
 */
function closeNotificationDropdown() {
    const dropdown = document.querySelector('.notification-dropdown');
    const overlay = document.querySelector('.notification-overlay');

    if (dropdown) dropdown.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    notificationDropdownVisible = false;
}

/**
 * Initialize notification system
 */
function initNotifications() {
    // Initial render
    renderNotificationDropdown();

    // Setup click handler for notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNotificationDropdown();
        });
    }

    // Setup click handler for overlay (close dropdown)
    const overlay = document.querySelector('.notification-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeNotificationDropdown);
    }

    // Setup mark all as read button
    const markAllRead = document.querySelector('.mark-all-read');
    if (markAllRead) {
        markAllRead.addEventListener('click', () => {
            closeNotificationDropdown();
            // In future: can implement actual "read" status tracking
        });
    }

    // Refresh notifications every minute
    setInterval(() => {
        if (notificationDropdownVisible) {
            renderNotificationDropdown();
        } else {
            // Just update the badge count
            const notifications = generateNotifications();
            const notificationBadge = document.querySelector('.notification-badge');
            const notificationDot = document.querySelector('.notification-dot');
            
            if (notifications.length > 0) {
                if (notificationBadge) {
                    notificationBadge.textContent = notifications.length > 9 ? '9+' : notifications.length;
                    notificationBadge.classList.add('show');
                }
                if (notificationDot) {
                    notificationDot.classList.add('show');
                }
            } else {
                if (notificationBadge) {
                    notificationBadge.classList.remove('show');
                }
                if (notificationDot) {
                    notificationDot.classList.remove('show');
                }
            }
        }
    }, 60000); // Update every 60 seconds
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.notification-dropdown');
    const notificationIcon = document.querySelector('.notification-icon');
    
    if (dropdown && notificationIcon && 
        !dropdown.contains(e.target) && 
        !notificationIcon.contains(e.target) && 
        notificationDropdownVisible) {
        closeNotificationDropdown();
    }
});
