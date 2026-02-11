
import React, { useState } from 'react';
import { Experience } from '../../types';
import { improveBulletPoints } from '../../services/geminiService';

interface Props {
  experiences: Experience[];
  jobTitle: string;
  onChange: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<Props> = ({ experiences, jobTitle, onChange }) => {
  const [activeId, setActiveId] = useState<string | null>(experiences[0]?.id || null);
  const [isImproving, setIsImproving] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experiences, newExp]);
    setActiveId(newExp.id);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(experiences.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const handleImproveDescription = async (id: string, description: string, position: string) => {
    if (!description || !position) return;
    setIsImproving(id);
    const improved = await improveBulletPoints(description, position);
    updateExperience(id, { description: improved });
    setIsImproving(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Experiência Profissional</h3>
        <button
          onClick={addExperience}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fas fa-briefcase text-slate-400"></i>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700">{exp.position || 'Nova Experiência'}</p>
                  <p className="text-xs text-slate-500">{exp.company || 'Nome da Empresa'}</p>
                </div>
              </div>
              <i className={`fas fa-chevron-${activeId === exp.id ? 'up' : 'down'} text-slate-400 text-xs`}></i>
            </button>

            {activeId === exp.id && (
              <div className="p-6 space-y-4 bg-white border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Empresa</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Google, Tech Corp, etc."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cargo</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="Engenheiro de Software"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Início</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="Jan 2020"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fim</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder={exp.current ? "Atualmente" : "Jun 2022"}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? 'Atual' : '' })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold text-slate-600">Cargo Atual</label>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Descrição das Atividades</label>
                    <button
                      onClick={() => handleImproveDescription(exp.id, exp.description, exp.position)}
                      disabled={isImproving === exp.id || !exp.description}
                      className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest hover:text-indigo-800 disabled:text-slate-400"
                    >
                      <i className={`fas ${isImproving === exp.id ? 'fa-spinner fa-spin' : 'fa-wand-sparkles'} mr-1`}></i>
                      Melhorar com IA
                    </button>
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    rows={4}
                    placeholder="Descreva suas responsabilidades, ferramentas utilizadas e principais resultados alcançados..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <i className="fas fa-trash-alt"></i> Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <i className="fas fa-briefcase text-slate-200 text-4xl mb-3"></i>
            <p className="text-sm text-slate-400 font-medium">Nenhuma experiência adicionada.</p>
            <button onClick={addExperience} className="mt-4 text-indigo-600 font-bold text-xs uppercase">
              Adicionar Agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
