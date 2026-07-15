"use client";

// Dev-only helper: floating button that hard-reloads the page with a
// cache-busting query param, for checking fresh CSS from a remote browser.
// Renders nothing in production builds.
export default function DevReload() {
  if (process.env.NODE_ENV !== "development") return null;

  const hardReload = () => {
    const u = new URL(window.location.href);
    u.searchParams.set("bust", Date.now().toString());
    window.location.replace(u.toString());
  };

  return (
    <button
      type="button"
      onClick={hardReload}
      title="Hard reload (cache-busted), or Ctrl+Shift+R"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-[#0e0e0e] px-4 py-2 text-[12px] text-white shadow-lg hover:bg-[#2a2a2a]"
    >
      ⟳ Hard reload
    </button>
  );
}
