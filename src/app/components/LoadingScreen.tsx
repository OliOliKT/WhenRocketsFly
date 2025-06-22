
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
      <p className="text-lg font-semibold">Loading space exploration timeline...</p>
    </div>
  );
}