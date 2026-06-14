# 🍞 Universal Global UI Suite (Toast & Popups)

A lightweight, zero-dependency interface toolkit featuring **10 beautiful CSS presets** ranging from modern minimalist layouts to premium glassmorphism and retro pixel styles. Built for standard web applications, responsive websites, and rapid game UI loops.

## 🚀 Quick Start

### 1. Download the Package

Clone the repository directly into your project's directory structure:

```bash
git clone https://github.com/ItsMeh1/toast-global.git
```

### 2. Single-Line Setup (Auto-CSS Injection)

We've built a smart auto-injector directly into our architecture! You do not need to manually link any CSS stylesheets in your HTML `<head>`. Simply load the main orchestrator script at the bottom of your `<body>`:

```html
<script type="module" src="./main.js"></script>
```

> [!NOTE]
> Make sure your path correctly targets wherever you have placed the files. The system will automatically locate and inject `toast.css` and `popup.css` at runtime!

## ⚙️ Toast Alerts (`ui.toast`)

Once imported, both the Toast and Popup engines are safely bound to the global `ui` namespace.

### 1. Triggering a Basic Alert

```js
ui.toast.show({
  message: "Profile updated successfully!",
  type: "success"
});
```

### 2. Full Parameter Configuration Matrix

Mix and match properties to align custom alerts precisely with your interface state:

```js
ui.toast.show({
  message: "Choose an answer",
  type: "warning",
  theme: "arcade",       // The new flash-style theme!
  position: "top-center",
  duration: 0,           // 0 means it waits for their answer
  dismissible: false,    // Force them to click an answer
  icon: "skull",         // Custom skull icon
  color: ""              // Custom toast color.

  // The buttons you want to show. Each one is going to be an answer that the user can choose. The 1st answers index is 1, then 2, and so on so forth.
  answers: ["Yes", "No", "Maybe"],

  // The function that runs when they click a button
  onAnswer: (index) => {
    if (index === 1) {
      console.log("User clicked YES.");
      // Run your rebirth code here
    } 
    else if (index === 2) {
      console.log("User clicked NO.");
    } 
    else if (index === 3) {
      console.log("User clicked MAYBE.");
    }
  }
});
```

## 🎨 10 Visual Themes

Explore and swap design layouts dynamically:

* basic
* glass
* stealth
* brutalist
* sunset
* cyber
* retro
* arcade
* hologram
* bubblegum

### 3. Interactive Prompts

Gather immediate decision results using our 1-based index mapping rule system.

```js
ui.toast.show({
  message: "Are you sure you want to rebirth?",
  type: "warning",
  theme: "arcade",
  duration: 0,
  answers: ["Yes", "No", "Maybe"],
  onAnswer: (index) => {
    if (index === 1) console.log("User clicked YES. Initiating rebirth sequence...");
    if (index === 2) console.log("User clicked NO.");
    if (index === 3) console.log("User clicked MAYBE.");
  }
});
```

> [!TIP]
> Toasts automatically clean up, run exit transitions, and completely clear themselves from the screen DOM as soon as an option button is selected.

## 🛸 Interactive Popups Engine (`ui.popup`)

For layered input forms, screen-blocking confirmations, or deep user configuration windows, invoke the modal popups engine. Modals are smoothly centered on the viewport.

### 1. Triggering an Input Form Modal

```js
ui.popup.show({
  // 1. The bold title header text displayed at the top of the modal (Required)
  title: "ADMINISTRATIVE CONTROL PANEL",

  // 2. Body description text showing instructions or information
  message: "Please enter your administrative verification details.",

  // 3. Visual design preset: 'basic' | 'glass' | 'stealth' | 'brutalist' | 'sunset' | 'cyber' | 'retro' | 'arcade' | 'hologram' | 'bubblegum'
  theme: "hologram",

  // 4. Configures a collection of text input form elements within the popup
  inputs: [
    {
      type: "text",             // Input field type: 'text' | 'password' | 'number' | 'email'
      name: "adminId",          // Unique key identifier used to retrieve the value inside onSubmit
      label: "Operator ID",     // Visual label printed directly above this specific field
      placeholder: "Admin_Zero",// Faded placeholder text shown when the input box is empty
      value: ""                 // Default string value loaded initially inside the input box
    },
    {
      type: "password",
      name: "securityToken",
      label: "Access Token",
      placeholder: "••••••••",
      value: ""
    }
  ],

  // 5. Array of buttons aligned at the bottom of the popup (Uses 1-based index mapping)
  buttons: ["AUTHENTICATE", "CANCEL", "HELP"],

  // 6. Triggered callback function executed immediately when any command button is clicked
  onSubmit: (index, data) => {
    console.log(`User clicked action index: ${index}`); // Passes 1-based index (e.g., 1 = "AUTHENTICATE", 2 = "CANCEL", etc.)
    console.log("Form values harvested:", data);       // Object containing keyed values: { adminId: "...", securityToken: "..." }
    // Note: The popup will automatically dismiss and run exit transitions on-click!
  }
});
```

## 🧪 Interactive Sandbox

Test all configurations, themes, prompt choices, and inputs in real-time, then inspect the instantly generated source codes!

Learn more at the [docs](https://itsmeh1.github.io/toast-global)!

---

Created with ❤️ by **ItsMeh1**. Powered dynamically via **Lucide Icons**.

`v2.0`
