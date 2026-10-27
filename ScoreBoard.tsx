import React from 'react';
import { sounds } from './soundEffects.ts';

interface ScoreBoardProps {
  correctCount: number;
  incorrectCount: number;
  remainingCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onOpenSummary: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  correctCount,
  incorrectCount,
  remainingCount,
  isMuted,
  onToggleMute,
  onRestart,
  onOpenSummary,
}) => {
  return (
    <header className="w-full bg-slate-900/80 border-b border-sky-900/40 backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Zone: 1-line wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-xl shadow-md shadow-amber-950/40">
            ⚽
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap">
              Pasapalabra Fútbol
            </h1>
            <p className="text-[11px] text-sky-300 font-medium whitespace-nowrap">
              Ճիշտ է, թե՞ սխալ · Verdadero o Falso (A1–A2)
            </p>
          </div>
        </div>

        {/* Central Counters: Pasapalabra TV score badges */}
        <div className="flex items-center gap-2 sm:gap-4 mx-auto md:mx-0">
          {/* Aciertos (Green) */}
          <div
            title="Aciertos / Ճիշտ պատասխաններ"
            className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl px-2.5 py-1 text-emerald-300 shadow-inner"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold hidden sm:inline">Aciertos:</span>
            <span className="text-sm sm:text-base font-black tabular-nums font-mono text-white">
              {correctCount}
            </span>
          </div>

          {/* Fallos (Red) */}
          <div
            title="Fallos / Սխալ պատասխաններ"
            className="flex items-center gap-1.5 bg-rose-950/60 border border-rose-500/50 rounded-xl px-2.5 py-1 text-rose-300 shadow-inner"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-xs font-semibold hidden sm:inline">Fallos:</span>
            <span className="text-sm sm:text-base font-black tabular-nums font-mono text-white">
              {incorrectCount}
            </span>
          </div>

          {/* Pendientes (Remaining) */}
          <div
            title="Pendientes por responder / Մնացած հարցեր"
            className="flex items-center gap-1.5 bg-sky-950/60 border border-sky-500/50 rounded-xl px-2.5 py-1 text-sky-300 shadow-inner"
          >
            <span className="text-xs font-semibold hidden sm:inline">Pendientes:</span>
            <span className="text-sm sm:text-base font-black tabular-nums font-mono text-sky-100">
              {remainingCount}
            </span>
          </div>

          {/* Zen / No Timer Tag */}
          <div
            title="Modo sin límite de tiempo"
            className="hidden lg:flex items-center gap-1 bg-slate-800/60 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-300"
          >
            <span>⏳</span>
            <span>Sin tiempo</span>
          </div>
        </div>

        {/* Action Controls: Sound / Overview / Restart */}
        <div className="flex items-center gap-2">
          {/* Mute button */}
          <button
            type="button"
            onClick={onToggleMute}
            title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-sm"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Summary / List Modal */}
          <button
            type="button"
            onClick={onOpenSummary}
            title="Ver todas las preguntas y respuestas"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Preguntas</span>
          </button>

          {/* Restart button */}
          <button
            type="button"
            onClick={onRestart}
            title="Reiniciar partida"
            className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-colors cursor-pointer shadow flex items-center gap-1"
          >
            <span>🔄</span>
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
