// --- GLOBAL VARIABLES ---
let qrCode;
let uploadedLogo = null;
let currentStyle = {
    dots: "square",
    corner: "square"
};
let html5QrCode;
let isCameraOn = false;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function() {
    initQRGenerator();
    setupEventListeners();
});

// --- GENERATOR FUNCTIONS ---

function initQRGenerator() {
    const canvasContainer = document.getElementById("canvas-container");
    if (!canvasContainer) return;

    // Initialize with default settings
    qrCode = new QRCodeStyling({
        width: 280,
        height: 280,
        type: "svg",
        data: "https://visernic.com",
        image: "",
        dotsOptions: { color: "#000000", type: "square" },
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 10 },
        cornersSquareOptions: { type: "square" }
    });
    
    // Clear placeholder text and append canvas
    document.getElementById("preview-text").style.display = 'none';
    qrCode.append(canvasContainer);
}

function setupEventListeners() {
    // Generator: Live update on text input
    const dataInput = document.getElementById("qr-data");
    if(dataInput) {
        dataInput.addEventListener("keyup", debounce(updateQRCode, 300));
    }

    // Generator: Logo Upload
    const imageInput = document.getElementById("qr-image");
    if(imageInput) {
        imageInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedLogo = e.target.result;
                    updateQRCode();
                }
                reader.readAsDataURL(file);
            } else {
                uploadedLogo = null;
                updateQRCode();
            }
        });
    }

    // Scanner: Image Upload Input handling
    const scanInput = document.getElementById("scan-image-input");
    if(scanInput) {
        scanInput.addEventListener("change", handleScanImageUpload);
    }
}

// Debounce function to limit calls during typing
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function called by style buttons in HTML
function setStyle(styleName) {
    // Update UI active state
    document.querySelectorAll('.style-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${styleName}`).classList.add('active');

    // Map style names to config options
    switch(styleName) {
        case 'square':
            currentStyle = { dots: 'square', corner: 'square' };
            break;
        case 'rounded':
            currentStyle = { dots: 'rounded', corner: 'extra-rounded' };
            break;
        case 'dots':
            currentStyle = { dots: 'dots', corner: 'dot' };
            break;
        case 'classy':
            currentStyle = { dots: 'classy', corner: 'square' };
            break;
    }
    updateQRCode();
}

function updateQRCode() {
    if (!qrCode) return;
    const dataVal = document.getElementById("qr-data").value || "https://visernic.com";

    qrCode.update({
        data: dataVal,
        dotsOptions: { type: currentStyle.dots },
        cornersSquareOptions: { type: currentStyle.corner },
        image: uploadedLogo
    });
}

// --- SCANNER FUNCTIONS ---

// 1. Handle Image Upload Scan
function handleScanImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // If camera is running, stop it first
    if (isCameraOn) {
        stopCameraScan();
    }

    const html5QrCodeUpload = new Html5Qrcode("reader");
    html5QrCodeUpload.scanFile(file, true)
        .then(decodedText => {
            onScanSuccess(decodedText);
            html5QrCodeUpload.clear(); // cleanup
        })
        .catch(err => {
            alert("Could not scan QR code from image. Please try another image.");
            console.error("Error scanning file:", err);
            html5QrCodeUpload.clear();
        });
}

// 2. Handle Camera Scan
async function startCameraScan() {
    const cameraContainer = document.getElementById("camera-container");
    const uploadFrame = document.getElementById("upload-frame");
    const startBtn = document.getElementById("start-camera-btn");
    const stopBtn = document.getElementById("stop-camera-btn");

    // Update UI for camera mode
    uploadFrame.classList.add('hidden');
    cameraContainer.classList.remove('hidden');
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');

    // Initialize scanner if not exists
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }

    try {
        // This request automatically triggers browser permission prompt
        await html5QrCode.start(
            { facingMode: "environment" }, // Use back camera by default
            {
                fps: 10,    // Sets the framerate to 10 frame per second
                qrbox: { width: 250, height: 250 }  // Sets up scanning box area
            },
            (decodedText, decodedResult) => {
                // Success callback
                onScanSuccess(decodedText);
                stopCameraScan(); // Stop camera automatically after successful scan
            },
            (errorMessage) => {
                // Error callback (scanning... ignore typical frame errors)
            }
        );
        isCameraOn = true;
    } catch (err) {
        alert("Camera permission denied or error starting camera.");
        console.error("Error starting camera:", err);
        stopCameraScan(); // Revert UI on error
    }
}

function stopCameraScan() {
    if (html5QrCode && isCameraOn) {
        html5QrCode.stop().then(() => {
            isCameraOn = false;
            resetScannerUI();
        }).catch((err) => {
             console.error("Error stopping camera:", err);
             // Force UI reset even if stop fails gracefully
             isCameraOn = false;
             resetScannerUI();
        });
    } else {
        resetScannerUI();
    }
}

function resetScannerUI() {
    document.getElementById("camera-container").classList.add('hidden');
    document.getElementById("upload-frame").classList.remove('hidden');
    document.getElementById("start-camera-btn").classList.remove('hidden');
    document.getElementById("stop-camera-btn").classList.add('hidden');
}


// --- COMMON SCAN RESULT HANDLERS ---

function onScanSuccess(decodedText) {
    // Hide Placeholder, Show Result
    document.getElementById("scan-placeholder").classList.add("hidden");
    document.getElementById("scan-content").classList.remove("hidden");
    
    // Set Decoded Text
    document.getElementById("result-text").innerText = decodedText;

    // Handle Link Button
    const linkBtn = document.getElementById("result-link");
    if (isValidHttpUrl(decodedText)) {
        linkBtn.href = decodedText;
        linkBtn.classList.remove("hidden");
        linkBtn.classList.add("inline-flex");
    } else {
        linkBtn.classList.add("hidden");
        linkBtn.classList.remove("inline-flex");
    }
}

function isValidHttpUrl(string) {
    let url;
    try { url = new URL(string); } catch (_) { return false; }
    return url.protocol === "http:" || url.protocol === "https:";
}

function copyResult() {
    const text = document.getElementById("result-text").innerText;
    if(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied successfully!");
        }, () => {
            alert("Failed to copy text.");
        });
    }
}