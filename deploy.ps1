# GitHub Pages 部署脚本

# 确保在项目根目录下运行
$currentDir = Get-Location
$projectName = Split-Path -Leaf $currentDir

Write-Host "正在部署 $projectName 到 GitHub Pages..." -ForegroundColor Cyan

# 1. 构建项目
Write-Host "正在构建项目..." -ForegroundColor Yellow
npm run build

# 检查构建是否成功
if (-not (Test-Path ".\dist")) {
    Write-Host "构建失败，dist 目录不存在！" -ForegroundColor Red
    exit 1
}

# 2. 创建或切换到 gh-pages 分支
Write-Host "正在准备 gh-pages 分支..." -ForegroundColor Yellow

# 检查是否有未提交的更改
$hasChanges = git status --porcelain
if ($hasChanges) {
    Write-Host "警告：有未提交的更改。请先提交或暂存更改。" -ForegroundColor Yellow
    Write-Host "继续操作将忽略这些更改，仅部署已构建的文件。" -ForegroundColor Yellow
    $confirmation = Read-Host "是否继续? (y/n)"
    if ($confirmation -ne "y") {
        Write-Host "部署已取消。" -ForegroundColor Red
        exit 1
    }
}

# 创建临时分支
$tempBranch = "temp-deploy-$(Get-Random)"
git checkout --orphan $tempBranch

# 3. 复制构建文件到根目录
Write-Host "正在准备部署文件..." -ForegroundColor Yellow
Get-ChildItem -Path ".\dist" | Copy-Item -Destination "." -Recurse -Force

# 4. 添加 .nojekyll 文件（防止 GitHub Pages 使用 Jekyll 处理）
New-Item -Path ".\.nojekyll" -ItemType File -Force | Out-Null

# 5. 提交更改
Write-Host "正在提交部署文件..." -ForegroundColor Yellow
git add -A
git commit -m "部署到 GitHub Pages: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 6. 强制推送到 gh-pages 分支
Write-Host "正在推送到 gh-pages 分支..." -ForegroundColor Yellow
git push -f origin $tempBranch:gh-pages

# 7. 清理
Write-Host "正在清理..." -ForegroundColor Yellow
git checkout -f main
git branch -D $tempBranch

Write-Host "部署完成！" -ForegroundColor Green
Write-Host "网站将在几分钟后可通过以下地址访问：" -ForegroundColor Cyan
Write-Host "https://你的用户名.github.io/$projectName" -ForegroundColor Cyan
Write-Host "请确保在 GitHub 仓库设置中启用了 GitHub Pages，并设置为从 gh-pages 分支构建。" -ForegroundColor Yellow
