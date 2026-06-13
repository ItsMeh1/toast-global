# 🍞 Universal Global Toast System

A lightweight, zero-dependency global notification framework featuring beautiful CSS presets ranging from modern minimalist styles to liquid glass and retro designs.

## 🚀 Quick Start

### 1. Download the package
In this repo, click the green `Code` button and click `Download ZIP`. An alternative is running this in your project's root directory:
```terminal
git clone https://github.com/ItsMeh1/toast-global.git
```

### 2. Include the assets
> [!WARNING]
> If you did **not** place the `toast-global` package inside of your root directory, then link the CSS and Javascript to the file's actual path.

Link the CSS in your `<head>`

```html
<link rel="stylesheet" href="/toast-global/toast.css">
```
Load the Javascript at the end of your `<body>`
```html
<script src="/toast-global/toast.js"></script>
```
If you followed those steps correctly, then you should have successfully linked the `toast-global` assets to your project.
## ⚙️ Usage

### 1. Triggering a toast anywhere
You can easily trigger a toast from anywhere with the linked assets.
```javascript
// A simple success notification
toast.show({
  message: "Profile updated successfully!",
  type: "success"
});
```

### 2. Layout &  Variations
You can easily mix & match styles to match your needs.
```javascript
toast.show({
  message: "Connection established safely.",
  type: "info",      // 'info' | 'success' | 'warning' | 'error'
  theme: "glass",    // 'basic' | 'glass' | 'retro' | 'cyber'
  duration: 5000     // Duration in milliseconds
});
```
> [!TIP]
> It is recommended to explore styles since there are many, and new ones are added many times.
- `message` The message you want the toast to show.
- `type` The type of notification it is. Either info, success, a warning, or an error.
- `theme` The theme of the toast. You can change this to match your site's style.
- `duration` The amount of time, in milliseconds, the toast will remain showing. 1 second = 1000 milliseconds.

##
Created with ❤️ by ItsMeh1
