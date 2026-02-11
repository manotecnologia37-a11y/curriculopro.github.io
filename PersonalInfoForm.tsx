
import React from 'react';

interface HeaderProps {
  className?: string;
  onTemplatesClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onTemplatesClick }) => {
  return (
    <header className={`bg-white border-b sticky top-0 z-50 px-8 py-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <i className="fas fa-file-invoice text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">AI Resume Pro</h1>
          <p className="text-xs text-indigo-600 font-semibold tracking-wider uppercase">Construa o seu futuro</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <button 
          onClick={(e) => { e.preventDefault(); onTemplatesClick?.(); }}
          className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Modelos
        </button>
        <button 
          onClick={(e) => e.preventDefault()}
          className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Dicas de Carreira
        </button>
        <button 
          onClick={(e) => e.preventDefault()}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          Entrar
        </button>
      </div>
    </header>
  );
};

export default Header;
