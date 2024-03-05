// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendanceForm');
    const attendanceList = document.getElementById('attendanceList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const status = formData.get('status');

        fetch('/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, status })
        })
        .then(response => response.json())
        .then(data => {
            console.log('勤怠情報が追加されました:', data);
            renderAttendance(data);
            form.reset();
        })
        .catch(error => console.error('エラー:', error));
    });

    function renderAttendance(attendance) {
        const div = document.createElement('div');
        div.textContent = `${attendance.name} (${attendance.status}) - ${new Date(attendance.timestamp).toLocaleString()}`;
        attendanceList.appendChild(div);
    }

    // 初期の勤怠情報を取得して表示
    fetch('/attendance')
    .then(response => response.json())
    .then(data => {
        console.log('初期の勤怠情報:', data);
        data.forEach(renderAttendance);
    })
    .catch(error => console.error('エラー:', error));
});
