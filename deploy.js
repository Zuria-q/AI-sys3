// 部署脚本 - 将React应用部署到GitHub Pages
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// 获取__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 错误处理函数
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit', shell: 'powershell.exe' });
    return true;
  } catch (error) {
    console.error(`执行命令失败: ${command}`);
    console.error(error.message);
    return false;
  }
}

// 先构建项目
console.log('构建项目...');
runCommand('npm run build');

// 检查dist目录是否存在
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('构建失败，无法找到dist目录');
  process.exit(1);
}

// 检查index.html是否存在
if (!fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
  console.error('构建失败，无法找到index.html');
  process.exit(1);
}

// 创建404.html (与index.html相同，用于处理客户端路由)
console.log('创建404.html...');
try {
  const indexContent = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'dist', '404.html'), indexContent);
} catch (error) {
  console.error('创建404.html失败:', error.message);
  process.exit(1);
}

// 创建.nojekyll文件（防止GitHub Pages忽略以下划线开头的文件）
console.log('创建.nojekyll文件...');
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');

// 保存当前分支名称
let currentBranch;
try {
  currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
} catch (error) {
  console.error('无法获取当前分支名称');
  process.exit(1);
}

// 提交到gh-pages分支
console.log('部署到GitHub Pages...');

// 保存当前工作目录的更改
runCommand('git add .');
runCommand('git commit -m "保存当前工作进度"');

// 检查gh-pages分支是否存在
const branches = execSync('git branch', { encoding: 'utf8' });
if (!branches.includes('gh-pages')) {
  console.log('创建gh-pages分支...');
  runCommand('git checkout --orphan gh-pages');
  runCommand('git rm -rf .');
} else {
  runCommand('git checkout gh-pages');
  runCommand('git rm -rf .');
}

// 复制dist目录的内容到gh-pages分支
console.log('复制构建文件到gh-pages分支...');
const distPath = path.join(__dirname, 'dist');
const files = fs.readdirSync(distPath, { withFileTypes: true });

for (const file of files) {
  const srcPath = path.join(distPath, file.name);
  const destPath = path.join(__dirname, file.name);
  
  if (file.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    // 递归复制目录
    const subFiles = fs.readdirSync(srcPath, { withFileTypes: true });
    for (const subFile of subFiles) {
      const subSrcPath = path.join(srcPath, subFile.name);
      const subDestPath = path.join(destPath, subFile.name);
      
      if (subFile.isDirectory()) {
        fs.mkdirSync(subDestPath, { recursive: true });
        // 递归复制子目录
        const deepSubFiles = fs.readdirSync(subSrcPath, { withFileTypes: true });
        for (const deepSubFile of deepSubFiles) {
          const deepSubSrcPath = path.join(subSrcPath, deepSubFile.name);
          const deepSubDestPath = path.join(subDestPath, deepSubFile.name);
          
          if (deepSubFile.isDirectory()) {
            fs.mkdirSync(deepSubDestPath, { recursive: true });
            // 对于更深层次的目录，我们可能需要更复杂的递归，但这里简化处理
            const finalFiles = fs.readdirSync(deepSubSrcPath);
            for (const finalFile of finalFiles) {
              const finalSrcPath = path.join(deepSubSrcPath, finalFile);
              const finalDestPath = path.join(deepSubDestPath, finalFile);
              if (!fs.statSync(finalSrcPath).isDirectory()) {
                fs.copyFileSync(finalSrcPath, finalDestPath);
              }
            }
          } else {
            fs.copyFileSync(deepSubSrcPath, deepSubDestPath);
          }
        }
      } else {
        fs.copyFileSync(subSrcPath, subDestPath);
      }
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

// 提交并推送到GitHub
runCommand('git add .');
runCommand('git commit -m "更新GitHub Pages部署"');
runCommand('git push origin gh-pages');

// 返回到原始分支
runCommand(`git checkout ${currentBranch}`);

console.log('部署完成！访问 https://zuria-q.github.io/AI-sys3/ 查看部署结果。');
