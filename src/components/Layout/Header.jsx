const Header = ({ version, source, onRefresh }) => (
  <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎵 Suno Meta Tag Generator
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Tags v{version} · Source: {source}
        </p>
      </div>
      <button
        onClick={onRefresh}
        className="text-xs text-gray-400 hover:text-white border border-gray-700
                   hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all"
      >
        🔄 Refresh
      </button>
    </div>
  </header>
);

export default Header;
