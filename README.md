# Card Game Meeting

## こちらのリンクからアクセスできます。是非試してください！

https://vps4.nkmr.io/card-meet/

## デモ動画

https://youtu.be/MF0oLgMDnJ4

## 概要

「そろそろ発言しない？」「他の話題に移ろう！」といった内容が書かれたカードを出し合うゲームによって、参加者に積極的な発言を促すWeb会議システムです。
右上に配置されている![image](https://github.com/user-attachments/assets/84abe50f-00c9-491e-a6f1-f0aa96182734)ボタンを押すと、その時点での参加者全員にカードが配られます。
カードは同時に場に２枚まで存在でき、３枚目が提出されると既に提出されていた２枚の内１枚が、参加者の誰かにランダムに再配布されます！


## 動作環境

- **対応ブラウザ**: Chromeでのみ動作を確認しています。
- **注意事項**: ローカル環境で動作させるには、FirebaseのAPI Key等を環境変数に設定していただく必要があります。

## 技術
- コンテナ:Docker
- フロントエンド:Next.js/TypeScript, Tailwind css
- 音声映像通信:Skyway SDK
- バックエンド:FastAPI/Python
- データベース:Firebase, Mysql/Server Sent Events


### 現在確認されているバグ
- firefoxで退出処理が発火しない
  - イベントリスナが機能していない様子
