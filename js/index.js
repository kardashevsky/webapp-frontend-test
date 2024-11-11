function fit(container, minRatioW, minRatioH, maxRatioW, maxRatioH) {
  let currentR = window.innerWidth / window.innerHeight;

  let minR = minRatioW / minRatioH;
  let maxR = maxRatioW / maxRatioH;

  let clampedR = Math.min(Math.max(currentR, minR), maxR);

  let width = window.innerWidth;
  let height = width / clampedR;

  if (height > window.innerHeight) {
    width = Math.min(width, Math.ceil(window.innerHeight * clampedR));
  }

  height = Math.floor(width / clampedR);
  
  container.style.width = width + "px";
  container.style.height = height + "px";
}

const buildUrl = "Build";
const loaderUrl = buildUrl + "/BuildDecompressionFallback.loader.js";
const config = {
  dataUrl: buildUrl + "/BuildDecompressionFallback.data.unityweb",
  frameworkUrl: buildUrl + "/BuildDecompressionFallback.framework.js.unityweb",
  codeUrl: buildUrl + "/BuildDecompressionFallback.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "TestTemplate",
  productVersion: "1.0",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const progressBarFill = document.querySelector("#progress-bar-fill");
const progressPercentage = document.querySelector("#progress-percentage");
const canvasOverlay = document.querySelector("#canvas-overlay");

let scaleToFit;

try {
  scaleToFit = !!JSON.parse("1");
} catch (e) {
  scaleToFit = false;
}

let fitGameScreen = () => {
  if (scaleToFit == true)
    fit(container, 500, 500, 375, 703);
};

window.addEventListener('resize', fitGameScreen);

let myGameInstance = null;

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFill.style.width = `${100 * progress}%`;
    progressPercentage.textContent = `${Math.round(100 * progress)}%`;

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;

    progressBarFill.style.width = '100%';
    progressPercentage.textContent = '100%';

    setTimeout(() => {
      canvasOverlay.style.display = "none";
    }, 500);
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
}
