# Debate Vizualization System

## こちらのリンクからアクセスできます！

## デモ動画

[![DebateVizSystem_Youtube_Link](https://github.com/user-attachments/assets/06283ef3-4071-4a8b-96ef-449d2e996478)](https://youtu.be/ybbw3yxqi90)

## 概要

「そろそろ発言しない？」「他の話題に移ろう！」といった内容が書かれたカードを出し合うゲームによって、参加者に積極的な発言を促すWeb会議システムです。


## 動作環境

- **対応ブラウザ**: Chromeでのみ動作を確認しています。
- **注意事項**: ローカル環境で動作させるには、FirebaseのAPI Key等を環境変数に設定していただく必要があります。

## 技術
- コンテナ:Docker
- フロントエンド:Next.js/TypeScript, Tailwind css
- 音声映像通信:Skyway SDK
- バックエンド:FastAPI/Python
- データベース:Firebase, Mysql/Server Sent Events

## 是非試してください！



こちらで公開しています
https://vps4.nkmr.io/card-meet/

現在確認されているバグ
- firefoxで退出処理が発火しない
