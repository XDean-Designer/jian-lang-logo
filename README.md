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

1. 在 GitHub 创建仓库（例如 `jianlang-assets`）
2. 推送代码到 `main` 分支
3. 设置环境变量并构建：

```bash
# 仓库名为 jianlang-assets 时
set NEXT_PUBLIC_BASE_PATH=/jianlang-assets
npm run build
```

4. 将 `out/` 目录内容推送到 `gh-pages` 分支，或使用 GitHub Actions 自动部署
5. 在仓库 Settings → Pages 中启用 GitHub Pages

### 使用 GitHub Actions（推荐）

仓库已包含 `.github/workflows/deploy.yml`，推送至 `main` 后会自动构建并部署。

若仓库名不是 `jianlang-assets`，请修改 workflow 中的 `NEXT_PUBLIC_BASE_PATH` 为你的仓库名（格式：`/仓库名`）。

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
