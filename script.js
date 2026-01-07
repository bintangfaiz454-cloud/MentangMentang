// State Management
let uploadedImage = null;
let currentStep = 'edit';
let previewImageUrl = '';

// Initialize App
function initApp() {
  renderUI();
  attachEventListeners();
}

// Render UI
function renderUI() {
  const app = document.getElementById('app');
  
  if (currentStep === 'edit') {
    app.innerHTML = `
      <div class="container">
        <div class="content-wrapper">
          <div class="header">
            <img src="https://i.ibb.co.com/RG0ZphBC/1766816264161.png" alt="Logo" class="logo" onerror="this.style.display='none'">
            <h1>TREND MENTANG-MENTANG CREATOR</h1>
            <p>Image Generator Tool</p>
          </div>

          <div class="credit">Created by BINTANG</div>

          <div class="step-indicator">
            <div class="step active"></div>
            <div class="step"></div>
          </div>

          <label class="image-placeholder" id="imagePlaceholder">
            <input type="file" id="imageInput" accept="image/*" />
            ${previewImageUrl ? 
              `<img src="${previewImageUrl}">` : 
              `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <p>Your image will appear here</p>`
            }
          </label>

          <div class="input-group">
            <label>Text Atas</label>
            <input type="text" id="topText" placeholder="Type your message here..." />
          </div>

          <div class="input-group">
            <label>Text Bawah</label>
            <input type="text" id="bottomText" placeholder="Type your message here..." />
          </div>

          <button class="btn btn-primary" id="generateBtn">
            ✏️ GENERATE IMAGE
          </button>

          <div class="support-section">
            <div class="support-text">Support kami</div>
            <a href="https://whatsapp.com/channel/0029VbBoeHKGZNCj6vM2vV0H" target="_blank" class="wa-button">
              <span class="wa-icon">📱</span>
              <span>WhatsApp Channel</span>
            </a>
          </div>
        </div>
      </div>
    `;
  } else {
    app.innerHTML = `
      <div class="container">
        <div class="content-wrapper">
          <div class="header">
            <img src="https://i.ibb.co.com/RG0ZphBC/1766816264161.png" alt="Logo" class="logo" onerror="this.style.display='none'">
            <h1>TREND MENTANG-MENTANG CREATOR</h1>
            <p>Image Generator Tool</p>
          </div>

          <div class="credit">Created by BINTANG</div>

          <div class="step-indicator">
            <div class="step"></div>
            <div class="step active"></div>
          </div>

          <div class="preview-area">
            <canvas id="previewCanvas"></canvas>
            <div class="download-overlay">
              <button class="download-btn" id="downloadBtn">
                <span>⬇️</span>
                <span>Download Image</span>
              </button>
            </div>
          </div>

          <button class="btn btn-secondary" id="backBtn">
            ← Kembali Edit
          </button>

          <div class="support-section">
            <div class="support-text">Support kami</div>
            <a href="https://whatsapp.com/channel/0029VbBoeHKGZNCj6vM2vV0H" target="_blank" class="wa-button">
              <span class="wa-icon">📱</span>
              <span>WhatsApp Channel</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }
  
  attachEventListeners();
}

// Attach Event Listeners
function attachEventListeners() {
  const imageInput = document.getElementById('imageInput');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const backBtn = document.getElementById('backBtn');

  if (imageInput) {
    imageInput.addEventListener('change', handleImageUpload);
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', handleGenerate);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
  }

  if (backBtn) {
    backBtn.addEventListener('click', handleBack);
  }
}

// Handle Image Upload
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        uploadedImage = img;
        previewImageUrl = event.target.result;
        renderUI();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Generate Meme Image
function generateMeme(topText, bottomText) {
  if (!uploadedImage) {
    alert('⚠️ Silakan upload foto terlebih dahulu!');
    return false;
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 800;
  canvas.height = (uploadedImage.height / uploadedImage.width) * 800;

  // Draw image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

  const topTextUpper = topText.toUpperCase();
  const bottomTextUpper = bottomText.toUpperCase();

  const barHeight = canvas.height * 0.08;
  const centerY = canvas.height * 0.55;
  const gap = canvas.height * 0.015;

  const topBarY = centerY - barHeight - gap;
  const bottomBarY = centerY + gap;

  // Draw gradient bars
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.15, 'rgba(0,0,0,0.85)');
  gradient.addColorStop(0.85, 'rgba(0,0,0,0.85)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, topBarY, canvas.width, barHeight);
  ctx.fillRect(0, bottomBarY, canvas.width, barHeight);

  // Draw text
  const fontSize = canvas.width * 0.04;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 8;

  ctx.fillText(topTextUpper, canvas.width / 2, topBarY + barHeight / 2);
  ctx.fillText(bottomTextUpper, canvas.width / 2, bottomBarY + barHeight / 2);

  ctx.shadowBlur = 0;
  
  return canvas;
}

// Handle Generate Button
function handleGenerate() {
  const topText = document.getElementById('topText').value;
  const bottomText = document.getElementById('bottomText').value;
  
  const canvas = generateMeme(topText, bottomText);
  
  if (canvas) {
    currentStep = 'preview';
    renderUI();
    
    // Copy canvas to preview
    const previewCanvas = document.getElementById('previewCanvas');
    const previewCtx = previewCanvas.getContext('2d');
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;
    previewCtx.drawImage(canvas, 0, 0);
  }
}

// Handle Download
function handleDownload() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'mentang-mentang-meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Handle Back to Edit
function handleBack() {
  currentStep = 'edit';
  renderUI();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

