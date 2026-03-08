interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export default function BrandMark({ className = '', compact = false }: BrandMarkProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border-[3px] border-black bg-[#ffcb00] font-bold uppercase tracking-[0.08em] text-black ${compact ? 'h-10 min-w-[72px] px-4 text-base' : 'h-12 min-w-[88px] px-5 text-lg'} ${className}`}
      aria-label="MTN"
    >
      MTN
    </div>
  );
}

