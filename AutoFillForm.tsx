
import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experiences, educations, skills, projects, themeColor, templateId } = data;

  const sectionTitleStyle = {
    color: themeColor,
    borderBottom: `1px solid ${themeColor}40`,
  };

  // --- TEMPLATE PROFESSIONAL (O mais equilibrado) ---
  const renderProfessional = () => (
    <div className="p-10 min-h-[1050px] bg-white font-sans text-slate-800">
      <header className="mb-8 border-b-2 pb-6" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{personalInfo.fullName || 'Seu Nome'}</h1>
            <p className="text-lg font-medium" style={{ color: themeColor }}>{personalInfo.jobTitle}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
               {personalInfo.email && <span><i className="fas fa-envelope mr-2"></i>{personalInfo.email}</span>}
               {personalInfo.phone && <span><i className="fas fa-phone mr-2"></i>{personalInfo.phone}</span>}
               {personalInfo.location && <span><i className="fas fa-map-marker-alt mr-2"></i>{personalInfo.location}</span>}
            </div>
          </div>
          {personalInfo.photo && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
              <img src={personalInfo.photo} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </header>

      <div className="space-y-6">
        {summary && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={sectionTitleStyle}>Resumo</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={sectionTitleStyle}>Experiência</h3>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between font-bold text-slate-800 text-sm">
                  <span>{exp.position}</span>
                  <span className="text-slate-500">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-tight">{exp.company}</div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={sectionTitleStyle}>Educação</h3>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="avoid-break">
                  <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={sectionTitleStyle}>Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded border border-slate-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>

        {projects.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={sectionTitleStyle}>Projetos</h3>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id} className="avoid-break">
                  <h4 className="text-sm font-bold text-slate-800">{proj.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{proj.link}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // --- TEMPLATE MODERN (Barra Lateral Clássica) ---
  const renderModern = () => (
    <div className="flex min-h-[1050px] bg-white font-sans border-t-8" style={{ borderColor: themeColor }}>
      <aside className="w-[30%] bg-slate-50 p-8 border-r border-slate-100 space-y-8">
        <div className="text-center">
          {personalInfo.photo && (
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white shadow-md">
              <img src={personalInfo.photo} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{personalInfo.fullName}</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-widest">{personalInfo.jobTitle}</p>
        </div>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">Contato</h3>
          <div className="space-y-3 text-[11px] text-slate-600">
            {personalInfo.email && <p className="flex items-start gap-2 truncate"><i className="fas fa-envelope mt-1"></i> {personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-start gap-2"><i className="fas fa-phone mt-1"></i> {personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-start gap-2"><i className="fas fa-map-marker-alt mt-1"></i> {personalInfo.location}</p>}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">Habilidades</h3>
          <div className="space-y-4">
            {skills.map(skill => (
              <div key={skill.id}>
                <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-700">
                  <span>{skill.name}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(skill.level / 5) * 100}%`, backgroundColor: themeColor }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <main className="flex-1 p-10 space-y-8">
        {summary && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Sobre Mim</h3>
            <p className="text-sm text-slate-600 leading-relaxed italic">{summary}</p>
          </section>
        )}

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Experiência</h3>
          <div className="space-y-8">
            {experiences.map(exp => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-bold text-slate-800">{exp.position}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: themeColor }}>{exp.company}</p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Educação</h3>
          <div className="space-y-4">
            {educations.map(edu => (
              <div key={edu.id} className="avoid-break">
                <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                <p className="text-xs text-slate-500 font-medium">{edu.institution}</p>
                <p className="text-[10px] text-slate-300 mt-1 uppercase">{edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  // --- TEMPLATE MINIMAL (Totalmente Limpo) ---
  const renderMinimal = () => (
    <div className="p-16 min-h-[1050px] bg-white font-sans text-slate-900">
      <header className="mb-12 border-b-2 pb-8" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-light tracking-tight text-slate-800">{personalInfo.fullName}</h1>
        <p className="text-lg text-slate-500 mt-1">{personalInfo.jobTitle}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 text-xs font-medium text-slate-400">
           <span>{personalInfo.email}</span>
           <span>{personalInfo.phone}</span>
           <span>{personalInfo.location}</span>
        </div>
      </header>

      <div className="space-y-12 max-w-2xl">
        <section>
          <p className="text-lg leading-relaxed text-slate-600 font-light italic">{summary}</p>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-8">Experiência Profissional</h3>
          <div className="space-y-10">
            {experiences.map(exp => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-bold">{exp.position}</h4>
                  <span className="text-xs text-slate-400">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-medium text-slate-400 mb-3">{exp.company}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-50">
           <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Educação</h3>
              {educations.map(edu => (
                <div key={edu.id} className="mb-4">
                  <h4 className="text-sm font-bold">{edu.degree}</h4>
                  <p className="text-xs text-slate-400">{edu.institution} | {edu.endDate}</p>
                </div>
              ))}
           </section>
           <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Habilidades</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {skills.map(skill => (
                  <span key={skill.id} className="text-xs text-slate-600">{skill.name}</span>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE CLASSIC (Estilo Executivo) ---
  const renderClassic = () => (
    <div className="p-14 min-h-[1050px] bg-white font-serif">
      <header className="border-b border-slate-800 pb-6 text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 uppercase">{personalInfo.fullName}</h1>
        <div className="text-xs text-slate-600 flex justify-center gap-6 italic">
          <span>{personalInfo.location}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.email}</span>
        </div>
      </header>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xs font-bold border-b border-slate-400 mb-3 uppercase tracking-wider pb-1">Perfil</h3>
          <p className="text-sm text-slate-800 leading-relaxed text-justify">{summary}</p>
        </section>

        <section>
          <h3 className="text-xs font-bold border-b border-slate-400 mb-5 uppercase tracking-wider pb-1">Experiência</h3>
          <div className="space-y-6">
            {experiences.map(exp => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                  <span className="text-xs font-bold">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 mb-2 italic">{exp.company}</p>
                <p className="text-sm text-slate-800 leading-relaxed text-justify whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-10">
            <section>
              <h3 className="text-xs font-bold border-b border-slate-400 mb-3 uppercase tracking-wider pb-1">Educação</h3>
              {educations.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                  <p className="text-xs text-slate-600 italic">{edu.institution}</p>
                  <p className="text-[10px] text-slate-400">{edu.endDate}</p>
                </div>
              ))}
            </section>
            <section>
              <h3 className="text-xs font-bold border-b border-slate-400 mb-3 uppercase tracking-wider pb-1">Habilidades</h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2">
                     <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                     {skill.name}
                  </div>
                ))}
              </div>
            </section>
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE CREATIVE (Moderno com Cor) ---
  const renderCreative = () => (
    <div className="min-h-[1050px] bg-white flex flex-col font-sans">
      <header className="p-12 text-white flex justify-between items-center" style={{ backgroundColor: themeColor }}>
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-1">{personalInfo.fullName}</h1>
          <p className="text-xl opacity-80 font-light uppercase tracking-widest">{personalInfo.jobTitle}</p>
        </div>
        {personalInfo.photo && (
          <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white">
            <img src={personalInfo.photo} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-10 space-y-10">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3" style={{ color: themeColor }}>
                Experiência <div className="h-0.5 flex-1 bg-slate-100"></div>
            </h3>
            <div className="space-y-8">
              {experiences.map(exp => (
                <div key={exp.id} className="avoid-break">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xl font-bold text-slate-800">{exp.position}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold mb-3" style={{ color: themeColor }}>{exp.company}</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {projects.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3" style={{ color: themeColor }}>
                  Projetos <div className="h-0.5 flex-1 bg-slate-100"></div>
              </h3>
              <div className="grid grid-cols-1 gap-5">
                {projects.map(proj => (
                  <div key={proj.id} className="avoid-break bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                    <p className="text-xs text-indigo-500 mb-2 truncate">{proj.link}</p>
                    <p className="text-sm text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="w-72 bg-slate-50 p-10 space-y-10 border-l border-slate-100">
           <section>
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Contato</h3>
             <div className="space-y-4 text-xs text-slate-600">
                <p className="flex items-center gap-3 break-all"><i className="fas fa-envelope opacity-50"></i>{personalInfo.email}</p>
                <p className="flex items-center gap-3"><i className="fas fa-phone opacity-50"></i>{personalInfo.phone}</p>
                <p className="flex items-center gap-3"><i className="fas fa-map-marker-alt opacity-50"></i>{personalInfo.location}</p>
             </div>
           </section>

           <section>
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Abilities</h3>
             <div className="flex flex-wrap gap-2">
               {skills.map(skill => (
                 <span key={skill.id} className="px-3 py-1 bg-white shadow-sm text-slate-700 text-[10px] font-bold rounded-lg border border-slate-100">
                   {skill.name}
                 </span>
               ))}
             </div>
           </section>

           <section>
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Educação</h3>
             <div className="space-y-4">
               {educations.map(edu => (
                 <div key={edu.id} className="p-3 bg-white rounded-lg border border-slate-100">
                   <h4 className="text-[11px] font-bold text-slate-900 leading-tight mb-1">{edu.degree}</h4>
                   <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{edu.institution}</p>
                 </div>
               ))}
             </div>
           </section>
        </aside>
      </div>
    </div>
  );

  return (
    <div 
      className="resume-preview w-full max-w-[800px] bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 print:shadow-none print:max-w-none print:w-full print:rounded-none mx-auto"
      style={{ 
        borderTop: templateId === 'creative' ? 'none' : `8px solid ${themeColor}`
      }}
    >
      {templateId === 'professional' && renderProfessional()}
      {templateId === 'modern' && renderModern()}
      {templateId === 'minimal' && renderMinimal()}
      {templateId === 'classic' && renderClassic()}
      {templateId === 'creative' && renderCreative()}
    </div>
  );
};

export default ResumePreview;
