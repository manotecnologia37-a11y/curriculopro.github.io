
import React from 'react';
import { Project } from '../../types';

interface Props {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const addProject = () => {
    onChange([...projects, { id: crypto.randomUUID(), title: '', description: '', link: '' }]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Projetos e Portfólio</h3>
        <button
          onClick={addProject}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3 relative">
            <button 
              onClick={() => removeProject(proj.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500"
            >
              <i className="fas fa-trash-alt text-xs"></i>
            </button>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Título do Projeto</label>
              <input
                type="text"
                value={proj.title}
                onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                placeholder="Ex: App de Gestão de Gastos"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Link (GitHub/Demo)</label>
              <input
                type="text"
                value={proj.link}
                onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                placeholder="github.com/usuario/projeto"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pequena Descrição</label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                rows={2}
                placeholder="Tecnologias utilizadas e propósito do projeto..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
