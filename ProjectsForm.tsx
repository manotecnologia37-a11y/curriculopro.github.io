
import React, { useState } from 'react';
import { Education } from '../../types';

interface Props {
  educations: Education[];
  onChange: (educations: Education[]) => void;
}

const EducationForm: React.FC<Props> = ({ educations, onChange }) => {
  const [activeId, setActiveId] = useState<string | null>(educations[0]?.id || null);

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange([...educations, newEdu]);
    setActiveId(newEdu.id);
  };

  const removeEducation = (id: string) => {
    onChange(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(educations.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Formação Acadêmica</h3>
        <button
          onClick={addEducation}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveId(activeId === edu.id ? null : edu.id)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fas fa-graduation-cap text-slate-400"></i>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700">{edu.degree || 'Nova Formação'}</p>
                  <p className="text-xs text-slate-500">{edu.institution || 'Instituição'}</p>
                </div>
              </div>
              <i className={`fas fa-chevron-${activeId === edu.id ? 'up' : 'down'} text-slate-400 text-xs`}></i>
            </button>

            {activeId === edu.id && (
              <div className="p-6 space-y-4 bg-white border-t">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Instituição</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="USP, FGV, Harvard..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Título/Grau</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Bacharelado, MBA..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Área de Estudo</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      placeholder="Administração, TI..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Início</label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      placeholder="Jan 2018"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fim (ou previsão)</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      placeholder="Dez 2022"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <i className="fas fa-trash-alt"></i> Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
