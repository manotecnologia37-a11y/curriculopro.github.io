
import React from 'react';
import { TemplateId } from '../../types';

interface Props {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const templates: { id: TemplateId; name: string; icon: string; desc: string }[] = [
  { id: 'professional', name: 'Profissional', icon: 'fa-address-card', desc: 'Layout clássico baseado no seu PDF' },
  { id: 'modern', name: 'Moderno', icon: 'fa-columns', desc: 'Layout dividido com barra lateral' },
  { id: 'minimal', name: 'Minimalista', icon: 'fa-minus', desc: 'Limpo, focado em tipografia' },
  { id: 'classic', name: 'Clássico', icon: 'fa-font', desc: 'Tradicional e executivo' },
  { id: 'creative', name: 'Criativo', icon: 'fa-paint-brush', desc: 'Moderno com blocos de cores' },
];

const TemplateSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Escolha um Modelo</h3>
        <p className="text-xs text-slate-500">O conteúdo será adaptado automaticamente ao layout selecionado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-start gap-3 text-left ${
              selectedId === tpl.id 
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-100' 
                : 'border-slate-100 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedId === tpl.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              <i className={`fas ${tpl.icon} text-lg`}></i>
            </div>
            <div>
              <p className="font-bold text-slate-800">{tpl.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">{tpl.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
