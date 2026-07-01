import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-8 pb-24 pt-32 text-center">
      <p className="mb-2 text-sm font-medium text-brand">404</p>
      <h1 className="mb-4 text-2xl font-bold">页面未找到</h1>
      <p className="mb-8 text-muted">您访问的资源分类不存在或已移除。</p>
      <Link href="/" className="btn-primary btn-primary-sm focus-ring">
        返回资源库
      </Link>
    </div>
  );
}
