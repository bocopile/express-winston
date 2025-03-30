module.exports = {
    apps: [
        {
            name: 'express-winston', // pm2 name
            script: './index.js', // // 앱 실행 스크립트
            exec_mode: 'cluster', // fork, cluster 모드 중 선택
            env: {
                NODE_ENV: 'development',
                PORT: 4000,
                REPOSITORY : '',
                LOG_PATH:  '/Users/bkshin/IdeaProjects/logs'
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 4000, // 프로덕션 포트 변경
                REPOSITORY : '',
                LOG_PATH:  '/Users/bkshin/IdeaProjects/logs'
            }
        },
    ]
};
