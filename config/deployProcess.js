const fs = require("fs");
const path = require("path");

const DEFAULT_ENV = "local";
const env = process.env.NODE_ENV || DEFAULT_ENV;

// package.json 배포용 파일 정보 생성
function packageInfo(content) {
    const jsonContent = JSON.parse(content);
    delete jsonContent.scripts;
    delete jsonContent.dependencies;
    delete jsonContent.devDependencies;

    jsonContent.scripts = {
        start: "node ./index.js"
    };

    jsonContent.bin = {};

    jsonContent.publishConfig = {
        registry: process.env.repository
    };
    return jsonContent;
}

(() => {
    const packagePath = path.resolve("./package.json");
    const distPath = path.resolve("./dist");
    const distPackagePath = path.join(distPath, "package.json");

    if (!fs.existsSync(packagePath)) throw new Error("File Not Exists");

    // dist 폴더가 없으면 생성
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    const content = fs.readFileSync(packagePath, {
        encoding: "utf8"
    });

    // package.json 배포용 파일 정보 생성
    const jsonContent = packageInfo(content);
    fs.writeFileSync(distPackagePath, JSON.stringify(jsonContent), {
        encoding: "utf8"
    });

    // config/ecosystem.config.js 파일만 복사
    const ecosystemConfigSource = path.resolve("./config/ecosystem.config.cjs");
    const ecosystemConfigDestination = path.join(distPath, "ecosystem.config.cjs");

    const DockerfileSource = path.resolve("./config/Dockerfile");
    const DockerfileDestination = path.join(distPath, "Dockerfile");

    fs.copyFileSync(ecosystemConfigSource, ecosystemConfigDestination);
    fs.copyFileSync(DockerfileSource,DockerfileDestination);
})();
