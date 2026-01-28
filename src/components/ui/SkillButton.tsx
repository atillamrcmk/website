import type { ReactNode } from 'react';

interface SkillButtonProps {
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  ariaControls?: string;
}

export default function SkillButton({ active, label, icon, onClick, ariaControls }: SkillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={active}
      aria-controls={ariaControls}
      className={[
        'group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left backdrop-blur-md transition-all',
        'focus:outline-none focus:ring-2 focus:ring-accent-from/60 focus:ring-offset-2 focus:ring-offset-dark-bg',
        active
          ? 'border-accent-from/40 bg-gradient-to-r from-accent-from/10 to-accent-to/10 shadow-lg shadow-accent-from/10'
          : 'border-white/10 bg-white/[0.04] hover:border-accent-from/30 hover:bg-white/[0.05]',
      ].join(' ')}
    >
      <span
        className={[
          'grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all',
          active ? 'bg-gradient-to-br from-accent-from/20 to-accent-to/10 border-accent-from/30' : 'group-hover:border-accent-from/25',
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-light-text">{label}</span>
      </span>
      <span className="ml-auto grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent-from/80 transition-all group-hover:border-accent-from/25">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
}


