// src/components/Layout/Header.jsx
const Header = ({ onRefresh }) => (
  <header className="bg-gradient-to-r from-teal-600 to-teal-400 text-white shadow-md">
    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎵</span>
        <div>
          <h1 className="text-xl font-bold leading-tight">Suno Tag Creator</h1>
          <p className="text-teal-100 text-xs">Te Hotu Mana — L'outil des musiciens de Polynésie</p>
        </div>
      </div>
      <button
        onClick={onRefresh}
        className="bg-white/20 hover:bg-white/30 text-white text-sm 
                   px-4 py-2 rounded-full transition-all border border-white/30"
      >
        🌺 Tahiti
      </button>
    </div>
  </header>
);

export default Header;
