export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <span className="font-brand text-5xl md:text-6xl text-white/80">
          Arey
        </span>
        <div className="mt-6 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#8b6f6f]/60 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
