class ToastSystem {
  constructor() {
    this.containers = {};
    this._loadLucide();
  }

  // Inject Lucide icons script into the head automatically
  _loadLucide() {
    if (!document.getElementById('lucide-cdn')) {
      const script = document.createElement('script');
      script.id = 'lucide-cdn';
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => {
        if (window.lucide) window.lucide.createIcons();
      };
      document.head.appendChild(script);
    }
  }

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

  // Default fallback icons mapping
  _getIconName(type) {
    switch(type) {
      case 'success': return 'check-circle-2';
      case 'warning': return 'alert-triangle';
      case 'error':   return 'alert-circle';
      default:        return 'info';
    }
  }

  /**
   * Fire a toast notification
   * @param {Object} options
   * @param {string} options.message
   * @param {string} [options.type='info']
   * @param {string} [options.theme='basic']
   * @param {string} [options.position='top-right']
   * @param {number} [options.duration=4000]
   * @param {boolean} [options.dismissible=true]
   * @param {boolean} [options.pauseOnHover=true]
   * @param {Function} [options.onClick=null]
   * @param {string} [options.icon=null] - Overrides default icon with any Lucide icon name (e.g., 'zap', 'heart')
   * @param {string} [options.color=null] - Overrides default type colors with any valid CSS color (hex, rgb, etc.)
   */
  show({
    message,
    type = 'info',
    theme = 'basic',
    position = 'top-right',
    duration = 4000,
    dismissible = true,
    pauseOnHover = true,
    onClick = null,
    icon = null,
    color = null
  }) {
    const container = this._getContainer(position);
    const toast = document.createElement('div');
    
    toast.className = `toast toast-theme-${theme} toast-${type}`;
    if (onClick) toast.style.cursor = 'pointer';

    // 🌟 OVERRIDE LOGIC: Use custom icon if provided, otherwise fallback to type icon
    const iconName = icon || this._getIconName(type);

    // Build toast structure
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon"><i data-lucide="${iconName}"></i></div>
        <span class="toast-text">${message}</span>
      </div>
      ${dismissible ? '<button class="toast-close" aria-label="Close"><i data-lucide="x" style="width:16px;height:16px;"></i></button>' : ''}
    `;

    // 🌟 OVERRIDE LOGIC: Apply custom colors dynamically if provided
    if (color) {
      // Direct borders (Basic, Stealth, etc.)
      toast.style.borderColor = color;
      toast.style.borderLeftColor = color;
      
      // Target the icon container specifically
      const iconWrapper = toast.querySelector('.toast-icon');
      if (iconWrapper) iconWrapper.style.color = color;

      // Handle custom glowing/tinted effects if using the Glass theme
      if (theme === 'glass') {
        toast.style.background = `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`;
        toast.style.border = `1px solid ${color}4d`; // Adds 30% alpha transparency to the hex border
        toast.style.boxShadow = `0 8px 32px 0 ${color}26`; // Adds 15% alpha transparency to the glow shadow
      }
    }

    container.appendChild(toast);

    // Process newly appended icons with Lucide
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { 'stroke-width': 2.25 } });
    }

    setTimeout(() => toast.classList.add('show'), 10);

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

    startTimer();

    if (duration > 0 && pauseOnHover) {
      toast.addEventListener('mouseenter', pauseTimer);
      toast.addEventListener('mouseleave', startTimer);
    }

    if (dismissible) {
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismiss(toast);
      });
    }

    if (onClick) {
      toast.addEventListener('click', (e) => onClick(e, toast));
    }
  }

  dismiss(toast) {
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => toast.remove());
  }
}

const toast = new ToastSystem();
window.toast = toast;
export default toast;
