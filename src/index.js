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

// 前回の秒数を記録（エフェクト発動用）
let lastSecond = -1;

// 数字を2桁にフォーマット
const formatNumber = (num) => num.toString().padStart(2, '0');

// 派手なエフェクトを発動
const triggerEffect = () => {
    // 時刻表示のパルスとグローエフェクト
    timeElement.classList.add('effect-active');
    setTimeout(() => timeElement.classList.remove('effect-active'), 500);

    // 時計全体の波紋エフェクト
    const clockWrapper = document.querySelector('.clock-wrapper');
    clockWrapper.classList.add('effect-active');
    setTimeout(() => clockWrapper.classList.remove('effect-active'), 1000);

    // 背景のフラッシュエフェクト
    document.body.classList.add('effect-active');
    setTimeout(() => document.body.classList.remove('effect-active'), 500);

    // パーティクルエフェクトを生成（ランダムな位置から）
    createParticles();

    // アナログ時計の中心点にエフェクト
    if (isAnalogMode) {
        const centerDot = document.querySelector('.center-dot');
        centerDot.classList.add('tick');
        setTimeout(() => centerDot.classList.remove('tick'), 600);
    }
};

// パーティクルを生成
const createParticles = () => {
    const particleCount = 12;
    const colors = ['#ff6b6b', '#ffa500', '#ffd700', '#90ee90', '#4facfe', '#9370db', '#ff69b4'];

    // 時計の中心座標を取得
    const clockWrapper = document.querySelector('.clock-wrapper');
    const rect = clockWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // ランダムな色
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        // 中心から放射状に飛び散る
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        // アニメーション終了後に削除
        setTimeout(() => particle.remove(), 1000);
    }
};

// デジタル時計の更新
const updateDigitalClock = () => {
    const now = new Date();

    const hours = formatNumber(now.getHours());
    const minutes = formatNumber(now.getMinutes());
    const seconds = formatNumber(now.getSeconds());
    const secondsNum = now.getSeconds();

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    dateElement.textContent = `${year}年${month}月${date}日`;
    dayElement.textContent = days[now.getDay()];

    // 秒が変わったら派手なエフェクトを発動
    if (secondsNum !== lastSecond) {
        lastSecond = secondsNum;
        triggerEffect();
    }
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

    // 秒が変わったら派手なエフェクトを発動
    if (seconds !== lastSecond) {
        lastSecond = seconds;
        triggerEffect();
    }
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
