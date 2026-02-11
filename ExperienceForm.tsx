
import React from 'react';
import { PersonalInfo } from '../../types';

interface Props {
  data: PersonalInfo;
  onChange: (info: Partial<PersonalInfo>) => void;
  themeColor: string;
  onThemeChange: (color: string) => void;
}

const PersonalInfoForm: React.FC<Props> = ({ data, onChange, themeColor, onThemeChange }) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    '#1e3a8a', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#1f2937'
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative group">
          <div 
            className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-400 transition-colors"
            onClick={() => document.getElementById('photo-input')?.click()}
          >
            {data.photo ? (
              <img src={data.photo} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-2">
                <i className="fas fa-camera text-slate-400 text-xl mb-1"></i>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Foto</p>
              </div>
            )}
          </div>
          <input 
            id="photo-input" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handlePhotoChange} 
          />
          {data.photo && (
            <button 
              onClick={(e) => { e.stopPropagation(); onChange({ photo: undefined }); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs shadow-md"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="flex-1 w-full space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nome Completo</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Ex: João Silva"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cargo Desejado</label>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => onChange({ jobTitle: e.target.value })}
              placeholder="Ex: Desenvolvedor Full Stack"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="joao@exemplo.com"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Telefone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Localização</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="São Paulo, SP"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">LinkedIn (URL)</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/joaosilva"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Cor de Destaque do Currículo</label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onThemeChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === color ? 'border-indigo-400 ring-2 ring-indigo-200 ring-offset-2' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
