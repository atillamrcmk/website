import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface RecipeStep {
  title: string;
  description: string;
  chips: string[];
}

interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  closeLabel: string;
  steps: RecipeStep[];
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-light-text backdrop-blur-md">
      {label}
    </span>
  );
}

export default function RecipeModal({ open, onClose, title, subtitle, closeLabel, steps }: RecipeModalProps) {
  const headingId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !mounted) return null;
  if (typeof document === 'undefined') return null;

  // Render into body to avoid being constrained by transformed/overflow parents.
  return createPortal(
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby={headingId} aria-describedby={descId}>
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label={closeLabel}
      />

      <div className="pointer-events-none absolute inset-0 grid place-items-center p-4">
        <div className="pointer-events-auto w-full max-w-3xl rounded-[24px] border border-white/10 bg-dark-bg/90 shadow-2xl shadow-black/40 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
            <div className="min-w-0">
              <h2 id={headingId} className="break-words text-2xl font-bold text-light-text sm:text-3xl">
                <span className="gradient-text">{title}</span>
              </h2>
              <p id={descId} className="mt-2 break-words text-sm leading-relaxed text-light-muted">
                {subtitle}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-light-text transition-all hover:border-accent-from/35 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, idx) => (
                <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-light-muted">{String(idx + 1).padStart(2, '0')}</div>
                      <div className="mt-1 text-base font-semibold text-light-text">{s.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-light-muted">{s.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <Chip key={c} label={c} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


