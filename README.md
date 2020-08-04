## 主な目的
- vuexfireとvuex-smart-moduleで構築したそれぞれのstoreをうまい具合に共存させられるよう実装してみる
- $ firebase init からfunctionsの作成・デプロイまでの流れを把握する
- ちょっと何かのライブラリを試したい or 簡単なアプリを構築したい時などにfirebase * vue * tsで既にCRUD実装済のものがあるとテンプレっぽく使えて便利そう

## 使ってるもの
- cloud
  - firestore
  - cloudFunctions

- dev
  - fuexfire
  - vue-property-decorator
  - vuex-smart-module etc...

## local動作環境の設定
1. firebaseにプロジェクト作成(blazeプラン)
1. firebaseコンソールからアプリを追加。.env を apps/ に作成し、appid等、認証用のパラメータを定義
1. 加えて .env にリージョンを定義。 functions/ にも同様に .env を作成しリージョンを定義
1. 
```
$ npm install -g firebase-tools
$ firebase login
$ firebase use プロジェクトID
$ cd functions
$ npm ci
$ npm run deploy
```
同様にapps側でもnpm ci
```
$ npm run serve
```


## デモ  
![vuexfire_sample](https://user-images.githubusercontent.com/29123042/89304689-b489c900-d6a8-11ea-903d-67a051edae3a.gif)
