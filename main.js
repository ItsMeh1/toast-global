import toast from './toast.js';
import popup from './popup.js';

/**
 * Automatically injects the required CSS files into the document head
 */
function injectStyles() {
  const scriptUrl = import.meta.url;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
  const styles = ['toast.css', 'popup.css'];

  styles.forEach(styleFile => {
    const fullUrl = `${baseUrl}${styleFile}`;
    if (!document.querySelector(`link[href="${fullUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullUrl;
      document.head.appendChild(link);
    }
  });
}

// 1. Inject Styles immediately
injectStyles();

// 2. Bind safely to global namespace
window.ui = {
  toast: toast,
  popup: popup
};

// 3. Dispatch a readiness event so scripts know they can execute!
window.dispatchEvent(new CustomEvent('ui-ready'));

export { toast, popup };
