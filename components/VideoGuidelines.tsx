import type { VideoCategory } from "@/lib/types";

type Props = {
  category: VideoCategory;
};

export function VideoGuidelines({ category }: Props) {
  return (
    <aside className="sticky top-[88px] space-y-6 self-start">
      <div>
        <p className="section-label">{category.subtitle}</p>
        <h1 className="text-3xl font-black leading-tight">{category.title}</h1>
      </div>

      <div className="space-y-2 text-sm text-muted">
        {category.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {category.guidelines.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold">使用说明</p>
          <ul className="space-y-2 text-sm text-muted">
            {category.guidelines.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-brand/50">—</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="glass-panel glass-panel-tint p-4 text-sm text-muted">
        <p className="mb-1 font-bold text-[#333]">下载说明</p>
        <p>在线预览后，点击「下载 MP4」获取原始视频文件。</p>
      </div>
    </aside>
  );
}
