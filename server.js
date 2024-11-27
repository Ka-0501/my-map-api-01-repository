const log4js = require('log4js');
const express = require('express');
const app = express();
const port = 3000;

const logger = log4js.getLogger();
logger.level = "info";

app.use(log4js.connectLogger(logger));

// パス / にアクセスされた時の処理（引数のreqはリクエスト、resはレスポンス）
app.get('/', (req,res) => {
    res.send('Hello');
});

// サーバの起動（第1引数には受付のポート番号、第2引数には起動時の初期処理）
app.listen(port, () => {
   logger.info('app listening on port ${port}');
});

