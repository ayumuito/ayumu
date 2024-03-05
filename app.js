// app.js

const express = require('express');
const app = express();
const port = 3000;

// ミドルウェアの設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// サンプルの勤怠データ
let attendanceData = [];

// 勤怠一覧を取得するエンドポイント
app.get('/attendance', (req, res) => {
    res.json(attendanceData);
});

// 勤怠を追加するエンドポイント
app.post('/attendance', (req, res) => {
    const { name, status } = req.body;
    const newAttendance = {
        id: attendanceData.length + 1,
        name,
        status,
        timestamp: new Date().toISOString()
    };
    attendanceData.push(newAttendance);
    res.json(newAttendance);
});

// サーバーの起動
app.listen(port, () => {
    console.log(`勤怠アプリがポート ${port} で起動しました。`);
});
