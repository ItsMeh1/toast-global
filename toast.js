class ToastSystem {
  constructor() {
    this.containers = {};
    this._loadLucide();
  }

  _loadLucide() {
    if (!document.getElementById('lucide-cdn')) {
      const script = document.createElement('script');
      script.id = 'lucide-cdn';
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => { if (window.lucide) window.lucide.createIcons(); };
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

  _getIconName(type) {
    switch(type) {
      case 'success': return 'check-circle-2';
      case 'warning': return 'alert-triangle';
      case 'error':   return 'alert-circle';
      default:        return 'info';
    }
  }

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
    color = null,
    answers = [],      // NEW: Array of strings for buttons like ["Yes", "No"]
    onAnswer = null    // NEW: Function to run when a button is clicked
  }) {
    const container = this._getContainer(position);
    const toast = document.createElement('div');
    
    toast.className = `toast toast-theme-${theme} toast-${type}`;
    if (onClick && answers.length === 0) toast.style.cursor = 'pointer';

    const iconName = icon || this._getIconName(type);

    // Build the Answer Buttons HTML if they exist
    let answersHtml = '';
    if (answers && answers.length > 0) {
      answersHtml = `<div class="toast-prompt-actions">` +
        answers.map((ans, index) => 
          // data-index is +1 so it matches your requirement (1 for first button, 2 for second, etc.)
          `<button class="toast-prompt-btn" data-index="${index + 1}">${ans}</button>`
        ).join('') +
      `</div>`;
    }

    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-header">
          <div class="toast-icon"><i data-lucide="${iconName}"></i></div>
          <span class="toast-text">${message}</span>
        </div>
        ${answersHtml}
      </div>
      ${dismissible ? '<button class="toast-close" aria-label="Close"><i data-lucide="x" style="width:16px;height:16px;"></i></button>' : ''}
    `;

    if (color) {
      toast.style.borderColor = color;
      const iconWrapper = toast.querySelector('.toast-icon');
      if (iconWrapper) iconWrapper.style.color = color;
    }

    container.appendChild(toast);

    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 2.25 } });

    setTimeout(() => toast.classList.add('show'), 10);

    // Timer logic
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

    // Attach button click listeners for the prompts
    if (answers.length > 0 && onAnswer) {
      const btns = toast.querySelectorAll('.toast-prompt-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation(); // Stops the main toast click event
          const index = parseInt(btn.getAttribute('data-index'), 10);
          onAnswer(index, toast); // Fires your function with index 1, 2, or 3!
          this.dismiss(toast);    // Automatically closes the toast after they answer
        });
      });
    }

    if (dismissible) {
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismiss(toast);
      });
    }

    if (onClick && answers.length === 0) {
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
