# 剑琅联盟 · 品牌资源站

剑琅联盟品牌 Logo 与视觉资源下载站。首版提供 6 类 Logo 资源，支持透明底 PNG 多尺寸下载（256 / 512 / 1024 / 2048 px）。

## 本地开发

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 构建

```bash
npm run build
```

构建产物在 `out/` 目录。

## 部署到 GitHub Pages

### 一键部署（推荐）

1. 在 [GitHub 新建仓库](https://github.com/new)（例如 `jianlang-assets`），**不要**勾选 README / .gitignore
2. 在本项目目录执行（将 `YOUR_USERNAME` 和仓库名替换为你的）：

```powershell
cd "d:\剑琅资源站"
git remote add origin https://github.com/YOUR_USERNAME/jianlang-assets.git
git push -u origin main
```

3. 打开仓库 **Settings → Pages → Build and deployment**，Source 选 **GitHub Actions**
4. 推送后 Actions 会自动构建并部署，约 2–5 分钟完成

**公网地址：** `https://YOUR_USERNAME.github.io/jianlang-assets/`

> 仓库名即 URL 路径。若仓库名不是 `jianlang-assets`，无需改代码——workflow 会自动设置 `NEXT_PUBLIC_BASE_PATH` 为 `/仓库名`。

### 本地预览 GitHub Pages 路径

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/jianlang-assets"
npm run build
npx serve out
```

访问 `http://localhost:3000/jianlang-assets/`

### 使用 GitHub Actions（已配置）

仓库已包含 `.github/workflows/deploy.yml`，推送至 `main` 后会自动构建并部署。

## 项目结构

```
app/                  # 页面路由
components/           # UI 组件
content/              # （预留）CMS 内容
lib/data.ts           # Logo 分类与资源配置
logo资源/             # Logo 源 PNG（手动维护）
public/assets/logos/  # 生成的多尺寸 PNG
scripts/              # 资源处理脚本
```

## 资源更新

Logo 源文件位于 `logo资源/` 目录（含浅色版与 `深1–4.png` 深色版），运行 `npm run prepare-assets:force` 从本地源生成 PNG 变体（256 / 512 / 1024 / 2048 px）。

## 技术栈

- Next.js 16 (Static Export)
- React 19
- Tailwind CSS 4
