const buildUrl = "Build";
const loaderUrl = buildUrl + "/Build.loader.js";
const config = {
  dataUrl: buildUrl + "/Build.data.br",
  frameworkUrl: buildUrl + "/Build.framework.js.br",
  codeUrl: buildUrl + "/Build.wasm.br",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "TestTemplate",
  productVersion: "1.0",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const progressBarFill = document.querySelector("#progress-bar-fill");
const canvasOverlay = document.querySelector("#canvas-overlay");

let scaleToFit;

try {
  scaleToFit = !!JSON.parse("1");
} catch (e) {
  scaleToFit = false;
}

let fitGameScreen = () => {
  if (scaleToFit == true)
    fit(container, 500, 500, 1080, 2340);
};

window.addEventListener('resize', fitGameScreen);

let myGameInstance = null;

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFill.style.width = `${100 * progress}%`;

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;
    canvasOverlay.style.display = "none";
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
