import { BRAND } from "@/lib/types";

export function Footer() {
  return (
    <footer className="glass-footer mt-auto">
      <div className="mx-auto max-w-7xl px-8 py-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {BRAND.name} · 品牌资源仅供内部及授权合作方使用
        </p>
      </div>
    </footer>
  );
}
