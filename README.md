# OTYA AI

OTYA AIは、Google Gemini APIを利用したChatGPT風チャットAIです。  
Gemini APIのAPIキーを用意するだけで、シンプルなChat UIでAIと会話できます。

## 特徴

- Google Gemini API使用
- ChatGPT風のシンプルなUI
- ローカルで動作（Next.js/Reactベース）

## セットアップ方法

1. このリポジトリをクローン
2. `.env.local` ファイルを作成し、下記を追加  
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=あなたのGeminiAPIキー
   ```
3. 依存パッケージをインストール  
   ```
   npm install
   ```
4. 開発サーバー起動  
   ```
   npm run dev
   ```
5. ブラウザで `http://localhost:3000` にアクセス

## 技術構成

- Next.js (React)
- TypeScript
- Tailwind CSS（UI用）

## 今後の拡張

- Gemini Proのカスタマイズ
- レスポンスストリーミング対応