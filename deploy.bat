@echo off
echo 正在部署到 GitHub Pages...

rem 构建项目
echo 正在构建项目...
call npm run build

rem 检查构建是否成功
if not exist "dist" (
    echo 构建失败，dist 目录不存在！
    exit /b 1
)

rem 创建临时分支
echo 正在准备 gh-pages 分支...
set "tempBranch=temp-deploy-%RANDOM%"
git checkout --orphan %tempBranch%

rem 复制构建文件到根目录
echo 正在准备部署文件...
xcopy /E /Y dist\* .

rem 添加 .nojekyll 文件
echo. > .nojekyll

rem 提交更改
echo 正在提交部署文件...
git add -A
git commit -m "部署到 GitHub Pages: %DATE% %TIME%"

rem 强制推送到 gh-pages 分支
echo 正在推送到 gh-pages 分支...
git push -f origin %tempBranch%:gh-pages

rem 清理
echo 正在清理...
git checkout -f main
git branch -D %tempBranch%

echo 部署完成！
echo 网站将在几分钟后可通过以下地址访问：
echo https://Zuria-q.github.io/AI-sys3
echo 请确保在 GitHub 仓库设置中启用了 GitHub Pages，并设置为从 gh-pages 分支构建。

pause
