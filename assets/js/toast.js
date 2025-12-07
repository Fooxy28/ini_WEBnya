/**
 * ================================================
 * CUSTOM TOAST NOTIFICATION SYSTEM
 * ================================================
 * Modern toast notification untuk menggantikan alert() browser
 * Fitur: auto-dismiss, progress bar, multiple types, animations
 */

// ============================================
// TOAST CONFIGURATION
// ============================================

const TOAST_CONFIG = {
    duration: 4000, // Default duration in milliseconds
    position: 'top-right', // top-right, top-left, bottom-right, bottom-left
    maxToasts: 3, // Maximum number of toasts shown at once
};

// Toast types configuration
const TOAST_TYPES = {
    success: {
        icon: '✓',
        defaultTitle: 'Success'
    },
    error: {
        icon: '✕',
        defaultTitle: 'Error'
    },
    warning: {
        icon: '⚠',
        defaultTitle: 'Warning'
    },
    info: {
        icon: 'ℹ',
        defaultTitle: 'Info'
    }
};

// ============================================
// TOAST CONTAINER INITIALIZATION
// ============================================

let toastContainer = null;
let activeToasts = [];

/**
 * Initialize toast container
 */
function initToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// ============================================
// TOAST CREATION FUNCTIONS
// ============================================

/**
 * Show a toast notification
 * @param {String} type - Type of toast (success, error, warning, info)
 * @param {String} message - Main message to display
 * @param {String} title - Optional title (uses default if not provided)
 * @param {Number} duration - Optional duration in ms (uses default if not provided)
 */
function showToast(type = 'info', message = '', title = null, duration = null) {
    // Initialize container if not exists
    initToastContainer();

    // Validate type
    if (!TOAST_TYPES[type]) {
        console.error(`Invalid toast type: ${type}`);
        type = 'info';
    }

    // Use default title if not provided
    if (!title) {
        title = TOAST_TYPES[type].defaultTitle;
    }

    // Use default duration if not provided
    if (!duration) {
        duration = TOAST_CONFIG.duration;
    }

    // Remove oldest toast if max limit reached
    if (activeToasts.length >= TOAST_CONFIG.maxToasts) {
        removeToast(activeToasts[0]);
    }

    // Create toast element
    const toast = createToastElement(type, title, message, duration);
    
    // Add to container
    toastContainer.appendChild(toast);
    activeToasts.push(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove after duration
    const autoRemoveTimer = setTimeout(() => {
        removeToast(toast);
    }, duration);

    // Store timer reference for manual removal
    toast.autoRemoveTimer = autoRemoveTimer;

    return toast;
}

/**
 * Create toast element
 * @param {String} type - Toast type
 * @param {String} title - Toast title
 * @param {String} message - Toast message
 * @param {Number} duration - Toast duration
 * @returns {HTMLElement} Toast element
 */
function createToastElement(type, title, message, duration) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Create icon
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.textContent = TOAST_TYPES[type].icon;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'toast-content';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'toast-title';
    titleEl.textContent = title;
    
    const messageEl = document.createElement('p');
    messageEl.className = 'toast-message';
    messageEl.textContent = message;
    
    content.appendChild(titleEl);
    content.appendChild(messageEl);
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => removeToast(toast);
    
    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'toast-progress';
    progress.style.width = '100%';
    
    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(content);
    toast.appendChild(closeBtn);
    toast.appendChild(progress);
    
    // Animate progress bar
    setTimeout(() => {
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = '0%';
    }, 10);
    
    return toast;
}

/**
 * Remove a toast
 * @param {HTMLElement} toast - Toast element to remove
 */
function removeToast(toast) {
    if (!toast || !toast.parentElement) return;
    
    // Clear auto-remove timer
    if (toast.autoRemoveTimer) {
        clearTimeout(toast.autoRemoveTimer);
    }
    
    // Remove from active toasts array
    const index = activeToasts.indexOf(toast);
    if (index > -1) {
        activeToasts.splice(index, 1);
    }
    
    // Add hide animation
    toast.classList.add('hide');
    toast.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 400);
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Show success toast
 * @param {String} message - Message to display
 * @param {String} title - Optional title
 * @param {Number} duration - Optional duration
 */
function toastSuccess(message, title = null, duration = null) {
    return showToast('success', message, title, duration);
}

/**
 * Show error toast
 * @param {String} message - Message to display
 * @param {String} title - Optional title
 * @param {Number} duration - Optional duration
 */
function toastError(message, title = null, duration = null) {
    return showToast('error', message, title, duration);
}

/**
 * Show warning toast
 * @param {String} message - Message to display
 * @param {String} title - Optional title
 * @param {Number} duration - Optional duration
 */
function toastWarning(message, title = null, duration = null) {
    return showToast('warning', message, title, duration);
}

/**
 * Show info toast
 * @param {String} message - Message to display
 * @param {String} title - Optional title
 * @param {Number} duration - Optional duration
 */
function toastInfo(message, title = null, duration = null) {
    return showToast('info', message, title, duration);
}

/**
 * Clear all active toasts
 */
function clearAllToasts() {
    activeToasts.forEach(toast => removeToast(toast));
}

// ============================================
// CUSTOM ALERT REPLACEMENT
// ============================================

/**
 * Custom alert replacement using toast
 * @param {String} message - Alert message
 * @param {String} type - Optional type (default: info)
 */
function customAlert(message, type = 'info') {
    return showToast(type, message);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToastContainer);
} else {
    initToastContainer();
}
