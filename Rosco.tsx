import React from 'react';
import { Question, LetterStatus } from './types.ts';

interface RoscoProps {
  questions: Question[];
  currentQuestionId: number;
  letterStatuses: Record<number, LetterStatus>;
  onSelectLetter: (questionId: number) => void;
}

export const Rosco: React.FC<RoscoProps> = ({
  questions,
  currentQuestionId,
  letterStatuses,
  onSelectLetter
}) => {
  const total = questions.length; // 27 letters

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[490px] lg:max-w-[530px] aspect-square mx-auto select-none">
      {/* Stadium / TV Glow Ring Behind Rosco */}
      <div className="absolute inset-8 rounded-full border border-sky-400/20 bg-radial from-sky-900/40 via-sky-950/20 to-transparent pointer-events-none" />
      <div className="absolute inset-14 rounded-full border border-sky-500/10 pointer-events-none" />

      {/* Center ambient indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center opacity-10">
          <span className="text-7xl sm:text-8xl font-black tracking-widest text-sky-200">⚽</span>
        </div>
      </div>

      {/* 27 Circular Letter Nodes */}
      {questions.map((q, index) => {
        // Calculate position in circle: starts at top (-90 deg), rotates clockwise
        const angleDeg = -90 + (index * 360) / total;
        const angleRad = (angleDeg * Math.PI) / 180;
        
        // Radius in percentage from center (50, 50)
        const radius = 42; 
        const leftPercent = 50 + radius * Math.cos(angleRad);
        const topPercent = 50 + radius * Math.sin(angleRad);

        const status = letterStatuses[q.id] || 'pending';
        const isCurrent = q.id === currentQuestionId;

        // Styling based on status
        let bgClasses = 'bg-linear-to-b from-sky-600 to-blue-800 text-white shadow-md shadow-blue-900/40 border border-sky-300/40 hover:from-sky-500 hover:to-blue-700';
        let statusBadge = null;

        if (status === 'correct') {
          bgClasses = 'bg-linear-to-b from-emerald-500 to-green-700 text-white shadow-lg shadow-emerald-950/50 border border-emerald-300 hover:from-emerald-400 hover:to-green-600';
          statusBadge = (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-black shadow">
              ✓
            </span>
          );
        } else if (status === 'incorrect') {
          bgClasses = 'bg-linear-to-b from-rose-500 to-red-700 text-white shadow-lg shadow-red-950/50 border border-rose-300 hover:from-rose-400 hover:to-red-600';
          statusBadge = (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-red-700 rounded-full flex items-center justify-center text-[9px] font-black shadow">
              ✕
            </span>
          );
        } else if (status === 'passed') {
          bgClasses = 'bg-linear-to-b from-amber-400 to-amber-600 text-slate-950 shadow-md shadow-amber-950/40 border border-amber-200 hover:from-amber-300 hover:to-amber-500 font-bold';
          statusBadge = (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-slate-900 text-amber-300 rounded-full flex items-center justify-center text-[8px] font-bold shadow">
              ↩
            </span>
          );
        }

        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onSelectLetter(q.id)}
            title={`Letra ${q.letter} (#${q.id}) · ${status.toUpperCase()}`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`
              absolute z-10 
              w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 
              rounded-full flex items-center justify-center
              font-extrabold text-xs sm:text-sm md:text-base tracking-tight
              transition-all duration-200 active:scale-95 cursor-pointer
              ${bgClasses}
              ${isCurrent ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-950 scale-125 z-30 animate-pulse shadow-yellow-500/50' : 'hover:scale-110'}
            `}
          >
            <span>{q.letter}</span>
            {statusBadge}
          </button>
        );
      })}
    </div>
  );
};
