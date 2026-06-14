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
  message: "System upgraded!", // The alert text to display
  type: "success",             // Alert type: 'info' | 'success' | 'warning' | 'error'
  theme: "stealth",            // Look: 'basic' | 'glass' | 'retro' | 'cyber' | 'stealth' | 'brutalist' | 'sunset' | 'arcade' | 'bubblegum' | 'hologram'
  position: "top-right",       // Corner: 'top-right/left/center' or 'bottom-right/left/center'
  duration: 5000,              // Time in milliseconds before disappearing (0 = stays forever)
  dismissible: true,           // Shows (true) or hides (false) the close 'X' button
  pauseOnHover: true,          // Pauses the timer countdown when mouse hovers over it
  onClick: (e, t) => {}        // Function that triggers when someone clicks the toast
});
```
> [!TIP]
> It is recommended to explore styles since there are many, and new ones are added many times.
- `message` The message you want the toast to show.
- `type` The type of notification it is. Either info, success, a warning, or an error.
- `theme` The theme of the toast. You can change this to match your site's style. Many more are being added.
- `position` The toast's position on the screen.
- `duration` The amount of time, in milliseconds, the toast will remain showing. 1 second = 1000 milliseconds.
- `dismissible` Whether you can or can't dismiss the toast notification.
- `pauseOnHover` Wheather or not the duration timer will pause when the user hovers over the toast notification.
- `onClick` A customizable function you can run when the user clicks the toast.

You can also use these variables which are **not** required, but give you high levels of customization.
- `color` Overrides the toast's color. Must be a HEX code & must be passed as a string.
- `icon` Overrides the toast's icon. Must be a Lucide icon & must be passed as a string.

> [!TIP]
> You can also ask the user questions & recieve responses with the `onAnswer()` extension.

```javascript
toast.show({
  message: "Choose an answer",
  type: "warning",
  theme: "arcade",       // The new flash-style theme!
  position: "top-center",
  duration: 0,           // 0 means it waits for their answer
  dismissible: false,    // Force them to click an answer
  icon: "skull",         // Custom skull icon

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
The way to initiate a prompt is simple. First, use the message variable to set the question.
```javascript
message: "Whatever your question is, it goes here!"
```
Then you can create the answers with the answer variable.
```javascript
answers: ["Answer #1, Index #1", "Answer #2, Index #2", "Answer #3, Index #3"]
```
You can then detect when an answer is selected with teh onAnswer function. This function only runs when the user clicks one of the answer buttons.
>[!TIP]
>The index number of the answer is the answers number in the answers table. For example, in the following answers table:
>```javascript
>answers: ["yes", "no", "maybe"]
>```
>The answer `yes` is index #1 since it is the first answer in the table.

A working onAnswer function looks like this. You can use if statements to figure out which button was clicked, and call your own functions off of that.
```javascript
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
```
>[!TIP]
>Toasts automatically go away on button click. If you want a toast to remain on the users screen until they answer, then you can set the duration to 0, and the system will automatically handle everything else.


Thanks for using `toast-global`! You can test & play around with settings at the [`toast-global` playground.](https://itsmeh1.github.io/toast-global/)
##
Created with ❤️ by ItsMeh1. Uses Lucide Icons.
<br>
`version 1.9`
