# 時計アプリ（PWA）

iPhone向けに最適化されたプログレッシブウェブアプリ（PWA）の時計アプリケーションです。

## 機能

- **デジタル時計表示**: 時刻、日付、曜日を日本語で表示
- **アナログ時計表示**: スムーズに動く針のアナログ時計
- **表示切替**: ボタン一つでデジタル/アナログを切り替え
- **PWA対応**: ホーム画面に追加してネイティブアプリのように使用可能
- **オフライン対応**: Service Workerによるオフライン動作
- **iPhone最適化**:
  - ノッチ対応（Safe Area対応）
  - タッチ操作最適化
  - レスポンシブデザイン
  - スタンドアロンモード対応

## セットアップ

### 1. アイコンの生成

PWAとして機能させるには、アイコン画像が必要です。

1. ブラウザで `icons/generate-icons.html` を開く
2. 表示された各サイズのアイコンをダウンロード
3. ダウンロードしたPNGファイルを `icons/` ディレクトリに配置

または、お好みのツールで以下のサイズのアイコンを作成してください：
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### 2. ローカルサーバーで実行

PWAの機能を完全にテストするには、HTTPSまたはlocalhostで実行する必要があります。

#### 方法1: Python（Python 3がインストールされている場合）

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開く

#### 方法2: Node.js（npmがインストールされている場合）

```bash
npx serve .
```

または

```bash
npm install -g http-server
http-server
```

### 3. iPhoneでのインストール

1. SafariでアプリのURLを開く
2. 共有ボタン（四角と上矢印のアイコン）をタップ
3. 「ホーム画面に追加」を選択
4. アプリ名を確認して「追加」をタップ

これで、ホーム画面からネイティブアプリのように起動できます！

## プロジェクト構造

```
.
├── index.html              # メインHTMLファイル
├── manifest.json           # PWAマニフェスト
├── service-worker.js       # Service Worker（オフライン対応）
├── src/
│   ├── index.js           # メインJavaScript
│   └── styles.css         # スタイルシート
└── icons/
    ├── generate-icons.html # アイコン生成ツール
    └── *.png              # 各サイズのアイコン（生成後）
```

## 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**:
  - CSS Variables
  - Flexbox
  - CSS Grid
  - メディアクエリ
  - グラデーション
- **JavaScript (ES6+)**:
  - requestAnimationFrame（スムーズなアニメーション）
  - Service Worker API
  - Web App Manifest
- **PWA機能**:
  - App Manifest
  - Service Worker
  - オフライン対応
  - インストール可能

## ブラウザ対応

- Safari（iOS 11.3+）
- Chrome（Android/iOS）
- Edge
- Firefox

## カスタマイズ

### 色の変更

`src/styles.css` の `:root` セクションでCSS変数を編集：

```css
:root {
    --bg-gradient-start: #0f0c29;
    --bg-gradient-mid: #302b63;
    --bg-gradient-end: #24243e;
    --accent-color: #4facfe;
}
```

### キャッシュの更新

`service-worker.js` の `CACHE_NAME` を変更してバージョンアップ：

```javascript
const CACHE_NAME = 'clock-app-v2';
```

## ライセンス

MIT

## 作成者

Created with Claude Code
