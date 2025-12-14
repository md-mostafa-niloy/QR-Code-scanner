# 📱 QR Code Generator & Scanner

[![Visernic Limited](https://img.shields.io/badge/Developed%20by-Visernic%20Limited-blue?style=for-the-badge)](https://visernic.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](#)

A high-performance, privacy-focused, and fully responsive **QR Code Generator and Scanner** web application. This tool allows users to generate fully customizable QR codes with brand logos and scan existing codes instantly using a device camera or file upload.

---

## 🖼️ Project Screenshot

![Project Banner](assets/img/social-banner.png)
*(Ensure you have a screenshot or banner image at `assets/img/social-banner.png`)*

---

## ✨ Key Features

### 🛠️ QR Code Generator
Create professional QR codes tailored to your brand identity.
- **Custom Content:** Supports URLs, text, email, and other data types.
- **Advanced Styling:**
  - **4 Unique Patterns:** Square, Rounded, Dots, and Minimal (Classy).
  - **Color Customization:** Change background and dot colors to match brand themes.
- **Logo Integration:** Upload your company logo (PNG/JPG) to embed it directly into the center of the QR code.
- **High-Quality Export:** Download generated codes in **PNG**, **JPG**, or **WEBP** formats.

### 📷 QR Code Scanner
A powerful scanner built directly into the browser.
- **Camera Support:** Instantly scans codes using the device's webcam or rear camera.
- **File Upload:** Supports scanning static images (screenshots or saved files) via drag-and-drop.
- **Smart Detection:** Automatically detects URLs and provides a direct "Open Link" button.
- **Clipboard Support:** One-click copy functionality for scanned text.

### ⚡ Performance & Privacy
- **Client-Side Processing:** All QR generation and scanning happen locally in the user's browser. **No data is sent to any server.**
- **Responsive Design:** Built with **Tailwind CSS**, ensuring a seamless experience on Desktops, Tablets, and Mobile devices.
- **SEO Optimized:** Includes Open Graph tags and meta descriptions for better search engine visibility.

---

## 🛠️ Technology Stack

This project uses modern web technologies to ensure speed and compatibility.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Structure** | HTML5 | Semantic markup for accessibility and SEO. |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development. |
| **Logic** | JavaScript (ES6+) | Core application logic and event handling. |
| **Generator Lib** | `qr-code-styling` | Library for creating complex SVG QR codes. |
| **Scanner Lib** | `html5-qrcode` | Library for camera access and image decoding. |
| **Icons** | FontAwesome | Vector icons for UI elements. |

---

## 📂 Project Structure

The project follows a clean, industry-standard directory structure.

```text
QR-Code-scanner/
│
├── index.html              # Main application entry point
├── README.md               # Project documentation
│
└── assets/                 # Static resources
    ├── css/
    │   └── style.css       # Custom overrides and animations
    │
    ├── js/
    │   └── script.js       # Main application logic (Generator & Scanner)
    │
    └── img/
        ├── favicon.ico     # Browser tab icon
        └── social-banner.png # Project preview image
````
---

# QR Code Scanner

A simple QR Code scanner project built with HTML, CSS, and JavaScript. This project allows you to scan QR codes using your device's camera.

## 🚀 Installation & Usage

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/md-mostafa-niloy/QR-Code-scanner.git
````
### 2. Navigate to the Directory
Bash

cd QR-Code-scanner

# Project Title

## Overview

This project is a static web application built using HTML and JavaScript. You can run it by simply opening the `index.html` file in your browser. 

### Recommended: 
For the best experience (especially with camera permissions), it’s recommended to use a local server like **Live Server** in Visual Studio Code.

## Run the Application

To run the application, follow these steps:

1. Open the `index.html` file directly in your browser.

   OR

2. Use a local server (e.g., Live Server in VS Code) for an enhanced experience, especially when accessing camera permissions.

---

## 🤝 Contributing

Contributions are welcome! If you encounter any bugs or have an idea for a new feature, feel free to contribute by following these steps:

1. **Fork the project** to your own GitHub account.
2. Create a new **feature branch**:  
   `git checkout -b feature/AmazingFeature`
3. **Commit your changes**:  
   `git commit -m 'Add some AmazingFeature'`
4. **Push to your branch**:  
   `git push origin feature/AmazingFeature`
5. **Open a Pull Request** to propose your changes.

---

## 👤 Author & Credits

This project is maintained by [Visernic Limited](https://visernic.com).

- **Website**: [https://visernic.com](https://visernic.com)
- **GitHub**: [@md-mostafa-niloy](https://github.com/md-mostafa-niloy)

---

## 📄 Copyright

Copyright © 2025 Visernic Limited. All Rights Reserved.
