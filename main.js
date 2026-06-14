import toast from './toast.js';
import popup from './popup.js';

/**
 * Automatically injects the required CSS files into the document head
 * so users don't have to manually link them in their HTML.
 */
function injectStyles() {
  // Get the base path of the current script (handles relative paths perfectly)
  const scriptUrl = import.meta.url;
  const baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);

  const styles = ['toast.css', 'popup.css'];

  styles.forEach(styleFile => {
    const fullUrl = `${baseUrl}${styleFile}`;
    
    // Prevent duplicate injections if main.js is loaded multiple times
    if (!document.querySelector(`link[href="${fullUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullUrl;
      document.head.appendChild(link);
    }
  });
}

// Run the style injection immediately
injectStyles();

// Bind the scripts
window.ui = {
  toast: toast,
  popup: popup
};

export { toast, popup }; // Export scripts
