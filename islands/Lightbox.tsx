import { useEffect, useState } from "preact/hooks";

interface Active {
  src?: string;
  alt: string;
}

// Enlarge-on-click viewer for Gallery tiles. Attaches a delegated listener for
// any `[data-lightbox]` element, so the grid stays fully server-rendered.
// Renders nothing until a tile is clicked.
export default function Lightbox() {
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-lightbox]",
      );
      if (!trigger) return;
      e.preventDefault();
      setActive({
        src: trigger.dataset.src || undefined,
        alt: trigger.dataset.alt || "",
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active.alt || "Image viewer"}
      class="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/80 p-6 backdrop-blur-sm"
      onClick={() => setActive(null)}
    >
      <button
        type="button"
        aria-label="Close"
        class="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-surface transition-colors hover:bg-surface/10"
        onClick={() => setActive(null)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <figure
        class="max-h-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {active.src
          ? (
            <img
              src={active.src}
              alt={active.alt}
              class="max-h-[80vh] w-auto rounded-lg object-contain shadow-lg"
            />
          )
          : (
            <div class="flex aspect-4/3 w-[80vw] max-w-2xl items-center justify-center rounded-lg bg-surface-container-low px-6 text-center text-on-surface-variant">
              {active.alt}
            </div>
          )}
        {active.alt && (
          <figcaption class="mt-3 text-center text-sm text-surface/80">
            {active.alt}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
