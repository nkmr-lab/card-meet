# Card Game Meeting

## こちらのリンクからアクセスできます。是非試してください！

https://vps4.nkmr.io/card-meet/

![image](https://github.com/user-attachments/assets/15331691-0646-40c8-8e6b-c1af25877f85)


## デモ動画

https://youtu.be/MF0oLgMDnJ4

## 概要

「そろそろ発言しない？」「他の話題に移ろう！」といった内容が書かれたカードを出し合うゲームによって、参加者に積極的な発言を促すWeb会議システムです。

## 利用方法
- 英数字と一部の記号でROOM NAMEを入力し、CREATE ROOMボタンを押してください。ROOM TYPEはSFUのままにしておくことをおすすめします。
- 既に作成されている部屋に入室する場合も同様に、その部屋の作成時に入力されたROOM NAMEを入力しボタンを押してください。
- カメラやマイクの許可を行ってください。誤って許可しないと選択してしまった場合は、各ブラウザの使用方法に従って再度許可するか、https://vps4.nkmr.io/card-meet/にアクセスし直してください。
- リロードすると画面が表示されなくなるため注意してください。その場合も、https://vps4.nkmr.io/card-meet/にアクセスし直してください。
- 部屋に接続したら、NAME, MIC., CAMERA, DISPLAY等を設定してください。
- DISPLAYは画面共有する画面の選択を指します。現在、CAMERAとDISPLAYを同時に共有することはできません。
- 右上に配置されている![image](https://github.com/user-attachments/assets/fe5449f3-69dc-410e-a619-c009aa0b3341)ボタンを押すと、その時点での参加者全員にカードが配られます。
- カードは同時に場に２枚まで存在でき、３枚目が提出されると既に提出されていた２枚の内１枚が、参加者の誰かにランダムに再配布されます！


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
