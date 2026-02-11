
import React, { useState } from 'react';
import { optimizeSummary } from '../../services/geminiService';

interface Props {
  summary: string;
  jobTitle: string;
  onChange: (summary: string) => void;
}

const SummaryForm: React.FC<Props> = ({ summary, jobTitle, onChange }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!summary || !jobTitle) {
      alert("Por favor, preencha o resumo atual e o cargo desejado para que a IA possa ajudar.");
      return;
    }
    setIsOptimizing(true);
    const optimized = await optimizeSummary(summary, jobTitle);
    onChange(optimized);
    setIsOptimizing(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Resumo Profissional</h3>
          <p className="text-xs text-slate-500">Destaque suas principais conquistas e objetivos.</p>
        </div>
        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
            isOptimizing 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          <i className={`fas ${isOptimizing ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i>
          {isOptimizing ? 'Otimizando...' : 'Otimizar com IA'}
        </button>
      </div>

      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder="Escreva um pouco sobre sua trajetória, habilidades e o que você busca profissionalmente..."
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
      />

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex gap-3">
          <i className="fas fa-lightbulb text-blue-400 mt-1"></i>
          <div>
            <p className="text-sm font-semibold text-blue-800">Dica da IA</p>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Mencione o tempo de experiência relevante e suas 3 habilidades mais fortes. Evite frases genéricas como "sou uma pessoa motivada".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
