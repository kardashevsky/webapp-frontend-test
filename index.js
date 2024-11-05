// Функция для сбора всех данных MiniApp в объект
export function collectMiniAppData() {
  return {
    initData: Telegram.WebApp.initData || null,
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || null,
    version: Telegram.WebApp.version || null,
    platform: Telegram.WebApp.platform || null,
    colorScheme: Telegram.WebApp.colorScheme || null,
    themeParams: Telegram.WebApp.themeParams || {},
    isExpanded: Telegram.WebApp.isExpanded || false,
    viewportHeight: Telegram.WebApp.viewportHeight || 0,
    viewportStableHeight: Telegram.WebApp.viewportStableHeight || 0,
    headerColor: Telegram.WebApp.headerColor || null,
    backgroundColor: Telegram.WebApp.backgroundColor || null,
    bottomBarColor: Telegram.WebApp.bottomBarColor || null,
    isClosingConfirmationEnabled: Telegram.WebApp.isClosingConfirmationEnabled || false,
    isVerticalSwipesEnabled: Telegram.WebApp.isVerticalSwipesEnabled || false,
    buttons: {
      backButton: Telegram.WebApp.BackButton || null,
      mainButton: Telegram.WebApp.MainButton || null,
      secondaryButton: Telegram.WebApp.SecondaryButton || null,
      settingsButton: Telegram.WebApp.SettingsButton || null,
    },
    features: {
      hapticFeedback: Telegram.WebApp.HapticFeedback || null,
      cloudStorage: Telegram.WebApp.CloudStorage || null,
      biometricManager: Telegram.WebApp.BiometricManager || null
    }
  };
}

// Функция для отображения данных MiniApp на странице
function displayMiniAppData() {
  const data = collectMiniAppData();
  const dataOutput = document.getElementById('data-output');
  dataOutput.textContent = JSON.stringify(data, null, 2);
}

// Инициализация отображения данных MiniApp
displayMiniAppData();

// Добавление вибрации на кнопку
document.getElementById('vibrateButton').addEventListener('click', () => {
  if (Telegram.WebApp.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('light');
  }
});
