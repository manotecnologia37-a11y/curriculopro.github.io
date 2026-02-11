
import React, { useState } from 'react';
import { Skill } from '../../types';

interface Props {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    onChange([...skills, { id: crypto.randomUUID(), name: newSkill.trim(), level: 3 }]);
    setNewSkill('');
  };

  const updateSkillLevel = (id: string, level: number) => {
    onChange(skills.map(s => s.id === id ? { ...s, level } : s));
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Habilidades e Competências</h3>
        <p className="text-xs text-slate-500">Adicione habilidades técnicas e comportamentais.</p>
      </div>

      <form onSubmit={addSkill} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Ex: React, Gestão de Equipes, Inglês..."
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <i className="fas fa-plus"></i>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex flex-col p-3 bg-slate-50 border border-slate-200 rounded-lg group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-700">{skill.name}</span>
              <button 
                onClick={() => removeSkill(skill.id)}
                className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <i className="fas fa-times-circle text-sm"></i>
              </button>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => updateSkillLevel(skill.id, lvl)}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    lvl <= skill.level ? 'bg-indigo-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
               <span className="text-[9px] text-slate-400 font-bold uppercase">Nível</span>
               <span className="text-[9px] text-indigo-500 font-bold uppercase">
                 {skill.level === 1 ? 'Básico' : skill.level === 5 ? 'Especialista' : 'Intermediário'}
               </span>
            </div>
          </div>
        ))}
      </div>
      
      {skills.length === 0 && (
         <div className="py-10 text-center">
            <div className="bg-slate-50 inline-block p-4 rounded-full mb-2">
               <i className="fas fa-tools text-slate-300 text-2xl"></i>
            </div>
            <p className="text-sm text-slate-400 font-medium">Sua lista de habilidades está vazia.</p>
         </div>
      )}
    </div>
  );
};

export default SkillsForm;
