const mysql = require('mysql2/promise');    // mysqlパッケージ読み込み

// 引数で受け取ったDB_CONFIGを基にコネクションプールを作成し、execute関数とend関数を返す関数
module.exports = function(DB_CONFIG) {
    // コネクションプールを作成
    const cnPool = mysql.createPool(DB_CONFIG);

    // クエリ実行用関数
    async function execute(sql, params) {
        const cn = await cnPool.getConnection();    // コネクション取得
        try {
            return await cn.query(sql, params);     // SQL文実行
        } catch(e) {
            throw e;                                // エラーならthrowで例外を呼び出しもとに投げる
        } finally {
            cn.release();                           // 最後に接続を返却
        }
    }

    // コネクションプール終了用関数
    async function end() {
        try {
            await cnPool.end();                     // プールを削除
        } catch(e) {
            throw e;                                // エラーならthrowで例外を呼び出しもとに投げる
        }
    }

    // クロージャ返却
    return {execute, end};
}