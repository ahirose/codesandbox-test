// PWA時計アプリケーション

// Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// DOM要素の取得
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const dayElement = document.getElementById('day');
const analogClock = document.getElementById('analogClock');
const digitalClock = document.querySelector('.digital-clock');
const toggleBtn = document.getElementById('toggleBtn');
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

// 曜日の日本語配列
const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];

// 表示モード（デジタル: false, アナログ: true）
let isAnalogMode = false;

// 数字を2桁にフォーマット
const formatNumber = (num) => num.toString().padStart(2, '0');

// デジタル時計の更新
const updateDigitalClock = () => {
    const now = new Date();

    const hours = formatNumber(now.getHours());
    const minutes = formatNumber(now.getMinutes());
    const seconds = formatNumber(now.getSeconds());

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    dateElement.textContent = `${year}年${month}月${date}日`;
    dayElement.textContent = days[now.getDay()];
};

// アナログ時計の更新
const updateAnalogClock = () => {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // 秒針（スムーズな動き）
    const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    // 分針（スムーズな動き）
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

    // 時針（スムーズな動き）
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

// 時計の初期化と更新
const initializeClock = () => {
    // 初期表示
    updateDigitalClock();
    updateAnalogClock();

    // アニメーション用のクラス追加（初期描画後）
    setTimeout(() => {
        hourHand.classList.add('initialized');
        minuteHand.classList.add('initialized');
        secondHand.classList.add('initialized');
    }, 100);

    // 毎フレーム更新（アナログ時計のスムーズな動きのため）
    const updateClock = () => {
        if (isAnalogMode) {
            updateAnalogClock();
        } else {
            updateDigitalClock();
        }
        requestAnimationFrame(updateClock);
    };

    requestAnimationFrame(updateClock);
};

// 表示切り替え
const toggleClockMode = () => {
    isAnalogMode = !isAnalogMode;

    if (isAnalogMode) {
        digitalClock.classList.add('hidden');
        analogClock.classList.add('active');
        toggleBtn.textContent = 'デジタル表示に切替';
    } else {
        digitalClock.classList.remove('hidden');
        analogClock.classList.remove('active');
        toggleBtn.textContent = 'アナログ表示に切替';
    }
};

// イベントリスナー
toggleBtn.addEventListener('click', toggleClockMode);

// スリープ復帰時の対応
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateDigitalClock();
        updateAnalogClock();
    }
});

// アプリケーション起動
initializeClock();

// インストール可能性の検出
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // デフォルトのインストールプロンプトを防止
    e.preventDefault();
    // 後で使用するためにイベントを保存
    deferredPrompt = e;
    console.log('PWAインストール可能');
});

// インストール後の処理
window.addEventListener('appinstalled', () => {
    console.log('PWAがインストールされました');
    deferredPrompt = null;
});
