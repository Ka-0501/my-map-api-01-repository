const mysql = require('./mysql');       // mysql.jsを読み込み
const route = require('./routeServer'); // routeServer.jsを読み込み
const log4js = require('log4js');
const express = require('express');     // expressパッケージ読みこみ
const app = express();                  // appオブジェクト生成
const api1 = express.Router();          // api1というコンテキストパス設定用ルーター
const port = 3000;                      // サーバで使うポート番号

const logger = log4js.getLogger();      // デフォルトのロガー取得
logger.level = "info";                  // 基本のログレベルをinfoに設定（緑のログが出るようになる）

// DB接続情報オブジェクト定義
const DB_CONFIG = {
    host: "localhost",      // 接続先のホスト（自分のPCなのでlocalhost）
    user: "root",           // ユーザ（rootユーザ）
    password: "",           // ユーザのパスワード（設定していないので空文字）
    database: "mapdb"       // DB名（アンケートDB用のmoba3db1）
};
const db = mysql(DB_CONFIG);

app.use(express.json());                // JSONデータを受け取れるようにする
app.use(log4js.connectLogger(logger));  // appにログを設定
app.use('/api1/', api1);                // api1をルーターとしてappに登録

// トップ画面
api1.get('/', (req, res) => {
    res.send('Hello');  // レスポンスとして文字列のHelloを返す
});

// 店舗一覧の取得
api1.get('/stores/', async (req, res) => {
    try {
        const [rs, fields] = await db.execute('SELECT * FROM stores;');     // SELECT文を実行して結果をretとfieldsに保存
        res.json(rs);                                                       // retの内容をJSONとして返却
    } catch(e) {
        res.status(400).json({error: '店舗一覧情報の取得に失敗しました。'});      // レスポンスのステータスを400に設定してからエラーメッセージのJSONを返却
        logger.error(e);                                                    // ログにもerror()として例外を出力
    }
});

// 店舗の検索
api1.get('/store/', async (req,res) => {

    const sql = "SELECT * FROM stores WHERE ";
    const queryParams = req.query;                  // クエリパラメータを取得
    const keys = Object.keys(queryParams);          // クエリパラメータ名の配列を取得
    let responseText = '';                          // パラメータ名と値を動的に使用

    for (let i=0; i<keys.length; i++) {
        const key = keys[i];
        const value = queryParams[key];

        if(i < keys.length - 1){                //次のキーが存在するかチェック
            responseText += `${key} LIKE '%${value}%' AND `;
        }
        else {
            responseText += `${key} LIKE '%${value}%';`;
        }
    }

    try {
        const [rs, fields] = await db.execute(sql + responseText);  // SELECT文を実行して結果をretとfieldsに保存
        res.send(rs);                                                   // retの内容をJSONとして返却
    } 
    catch(e) {
        res.status(400).json({error: `${responseText}に関する店舗情報の取得に失敗しました。`});  // レスポンスのステータスを400に設定してからエラーメッセージのJSONを返却
        logger.error(e);                                               // ログにもerror()として例外を出力
    }
});



// サーバの起動（第1引数には受付のポート番号、第2引数には起動時の初期処理）
app.listen(port, () => {
    logger.info(`app listening on port ${port}`);
 });

