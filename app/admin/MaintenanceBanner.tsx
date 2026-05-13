import Link from "next/link";

export default function MaintenanceBanner() {
  return (
    <div className="flex items-center justify-between gap-3 bg-amber-50 border-b border-amber-200 px-6 py-2.5">
      <div className="flex items-center gap-2 text-sm text-amber-800">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <span className="font-semibold">Mode maintenance actif</span>
        <span className="text-amber-600 hidden sm:inline">— Le site est inaccessible aux visiteurs. Vous seul voyez les pages.</span>
      </div>
      <Link
        href="/admin/maintenance"
        className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2 shrink-0"
      >
        Désactiver →
      </Link>
    </div>
  );
}
