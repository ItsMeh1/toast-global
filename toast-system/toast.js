class ToastSystem {
  constructor() {
    this.container = null;
    this._init();
  }

  // Creates the container on the DOM if it doesn't exist
  _init() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    this.container = container;
  }

  /**
   * Triggers a new toast message
   * @param {Object} options 
   * @param {string} options.message - The text to display
   * @param {string} [options.type='info'] - 'info', 'success', 'warning', 'error'
   * @param {string} [options.theme='basic'] - 'basic', 'glass', 'retro', 'cyber'
   * @param {number} [options.duration=4000] - Time in ms before auto-dismissing
   */
  show({ message, type = 'info', theme = 'basic', duration = 4000 }) {
    const toast = document.createElement('div');
    
    // Apply classes
    toast.className = `toast toast-theme-${theme} toast-${type}`;
    
    // Structure content
    toast.innerHTML = `
      <span class="toast-text">${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    // Append to container
    this.container.appendChild(toast);

    // Trigger slide-in animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Setup Auto-Dismiss
    let dismissTimeout = setTimeout(() => {
      this.dismiss(toast);
    }, duration);

    // Setup Manual Close Button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      this.dismiss(toast);
    });
  }

  // Dismiss animation handles removal cleanly
  dismiss(toast) {
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}

// Export a single global instance
const toast = new ToastSystem();
window.toast = toast; // Attaches to window object for ease of access across scripts
