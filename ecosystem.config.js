module.exports = {
    apps: [
        {
            name: 'express-winston', // pm2 name
            script: 'app.js', // // 앱 실행 스크립트
            exec_mode: 'cluster', // fork, cluster 모드 중 선택
            env: {
                // 개발 환경설정
                NODE_ENV: 'development',
                Server_PORT:4000
            }
        },
    ]
};
