class PopupSystem {
  constructor() {
    this.overlay = null;
  }

  _createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'popup-overlay';
    document.body.appendChild(this.overlay);
  }

  /**
   * Display an interactive modal popup globally centered on screen
   * @param {Object} options
   * @param {string} options.title - Header title text
   * @param {string} options.message - Descriptive text body
   * @param {string} [options.theme='basic'] - Global layout design theme profile
   * @param {Array<Object>} [options.inputs=[]] - Config array: [{ type: 'text', name: 'user', label: 'User', placeholder: '...' }]
   * @param {Array<string>} [options.buttons=['OK']] - List of strings generating command triggers
   * @param {Function} [options.onSubmit=null] - Execution callback: (buttonIndex, data) => {}
   */
  show({
    title,
    message,
    theme = 'basic',
    inputs = [],
    buttons = ['OK'],
    onSubmit = null
  }) {
    if (!this.overlay) this._createOverlay();

    // Reset layout inside overlay canvas
    this.overlay.innerHTML = '';

    const popupBox = document.createElement('div');
    popupBox.className = `popup-box popup-theme-${theme}`;

    // Render Input Fields markup if passed down inside array
    let formHtml = '';
    if (inputs && inputs.length > 0) {
      formHtml = `<div class="popup-form">` +
        inputs.map(field => `
          <div class="popup-field">
            ${field.label ? `<label>${field.label}</label>` : ''}
            <input 
              type="${field.type || 'text'}" 
              class="popup-input" 
              data-name="${field.name}" 
              placeholder="${field.placeholder || ''}" 
              value="${field.value || ''}"
            />
          </div>
        `).join('') +
      `</div>`;
    }

    // Render operational action buttons (1-indexed mapping system)
    const actionsHtml = `<div class="popup-actions">` +
      buttons.map((btnText, i) => `
        <button class="popup-btn" data-index="${i + 1}">${btnText}</button>
      `).join('') +
    `</div>`;

    // Package layout core
    popupBox.innerHTML = `
      <div class="popup-header">
        <h2 class="popup-title">${title}</h2>
      </div>
      <p class="popup-message">${message}</p>
      ${formHtml}
      ${actionsHtml}
    `;

    this.overlay.appendChild(popupBox);

    // Fade in overlay animations smoothly
    setTimeout(() => this.overlay.classList.add('show'), 10);

    // Register operational callback event hooks
    const actionButtons = popupBox.querySelectorAll('.popup-btn');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        
        // Harvest any active input fields form state
        const formData = {};
        const inputElements = popupBox.querySelectorAll('.popup-input');
        inputElements.forEach(input => {
          const key = input.getAttribute('data-name');
          formData[key] = input.value;
        });

        // Fire out custom callback
        if (onSubmit) {
          onSubmit(index, formData);
        }

        this.dismiss();
      });
    });
  }

  dismiss() {
    if (this.overlay) {
      this.overlay.classList.remove('show');
      // Completely wipe internal layout assets when transition closes safely
      this.overlay.addEventListener('transitionend', () => {
        this.overlay.innerHTML = '';
      }, { once: true });
    }
  }
}

const popup = new PopupSystem();
window.popup = popup;
export default popup;
