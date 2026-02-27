const Footer = () => (
  <footer className="border-t border-white/10 mt-16 py-10">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan
                          flex items-center justify-center text-sm">
            🎵
          </div>
          <div>
            <p className="text-sm font-bold text-white">Suno Tag Generator</p>
            <p className="text-xs text-white/40">by REDSOYU AI · Polynésie</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-white/40">
          <a href="https://ai.redsoyu.com" target="_blank" rel="noopener noreferrer"
             className="hover:text-brand-cyan transition-colors">
            ai.redsoyu.com
          </a>
          <a href="https://suno.com" target="_blank" rel="noopener noreferrer"
             className="hover:text-brand-cyan transition-colors">
            suno.com
          </a>
          <span>© 2025 REDSOYU AI</span>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
