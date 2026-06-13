class ToastSystem {
  constructor() {
    this.containers = {};
  }

  // Gets or dynamically creates a container targeting a specific screen position
  _getContainer(position) {
    if (!this.containers[position]) {
      let container = document.querySelector(`.toast-container.${position}`);
      if (!container) {
        container = document.createElement('div');
        container.className = `toast-container ${position}`;
        document.body.appendChild(container);
      }
      this.containers[position] = container;
    }
    return this.containers[position];
  }

  /**
   * Fire a highly-configurable toast notification
   * @param {Object} options
   * @param {string} options.message - The alert content text
   * @param {string} [options.type='info'] - 'info' | 'success' | 'warning' | 'error'
   * @param {string} [options.theme='basic'] - 'basic' | 'glass' | 'retro' | 'cyber' | 'stealth' | 'brutalist' | 'sunset'
   * @param {string} [options.position='top-right'] - 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
   * @param {number} [options.duration=4000] - Lifespan in milliseconds (set to 0 to keep open indefinitely)
   * @param {boolean} [options.dismissible=true] - Shows or hides manual close 'X' button
   * @param {boolean} [options.pauseOnHover=true] - Halts the expiration timer when mouse pointer enters toast
   * @param {Function} [options.onClick=null] - Executed callback when user clicks anywhere on the toast body
   */
  show({
    message,
    type = 'info',
    theme = 'basic',
    position = 'top-right',
    duration = 4000,
    dismissible = true,
    pauseOnHover = true,
    onClick = null
  }) {
    const container = this._getContainer(position);
    const toast = document.createElement('div');
    
    toast.className = `toast toast-theme-${theme} toast-${type}`;
    if (onClick) toast.style.cursor = 'pointer';

    // Conditionally attach the close button markup
    toast.innerHTML = `
      <span class="toast-text">${message}</span>
      ${dismissible ? '<button class="toast-close" aria-label="Close">&times;</button>' : ''}
    `;

    container.appendChild(toast);

    // Fade-in trigger
    setTimeout(() => toast.classList.add('show'), 10);

    // Timer management state variables
    let remainingTime = duration;
    let startTime = Date.now();
    let dismissTimeout = null;

    const startTimer = () => {
      if (duration > 0) {
        startTime = Date.now();
        dismissTimeout = setTimeout(() => this.dismiss(toast), remainingTime);
      }
    };

    const pauseTimer = () => {
      clearTimeout(dismissTimeout);
      remainingTime -= Date.now() - startTime;
    };

    // Setup lifecycle features based on configuration rules
    startTimer();

    if (duration > 0 && pauseOnHover) {
      toast.addEventListener('mouseenter', pauseTimer);
      toast.addEventListener('mouseleave', startTimer);
    }

    if (dismissible) {
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering onClick callback mistakenly
        this.dismiss(toast);
      });
    }

    if (onClick) {
      toast.addEventListener('click', (e) => {
        onClick(e, toast);
      });
    }
  }

  dismiss(toast) {
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}

const toast = new ToastSystem();
window.toast = toast;
