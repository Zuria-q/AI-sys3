@echo off
echo 开始部署到GitHub Pages...

REM 确保dist目录存在
if not exist "dist" (
  echo 错误: dist目录不存在，请先运行npm run build
  exit /b 1
)

REM 创建404.html (与index.html相同，用于处理客户端路由)
echo 创建404.html...
copy dist\index.html dist\404.html /Y

REM 创建.nojekyll文件（防止GitHub Pages忽略以下划线开头的文件）
echo 创建.nojekyll文件...
echo. > dist\.nojekyll

REM 复制favicon.ico到dist目录
echo 复制favicon.ico...
copy public\favicon.ico dist\favicon.ico /Y

REM 切换到gh-pages分支
echo 切换到gh-pages分支...
git checkout gh-pages

REM 删除旧文件
echo 删除旧文件...
git rm -rf .
git checkout HEAD -- .gitignore

REM 从dist目录复制文件
echo 复制构建文件到gh-pages分支...
xcopy dist\* . /E /Y

REM 提交并推送到GitHub
echo 提交更改...
git add .
git commit -m "更新GitHub Pages部署"

echo 推送到GitHub...
git push origin gh-pages

REM 返回到main分支
echo 返回到main分支...
git checkout main

echo 部署完成！
echo 请访问 https://zuria-q.github.io/AI-sys3/ 查看部署结果。
