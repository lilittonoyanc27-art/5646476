import React, { useState } from 'react';
import { Question, LetterStatus, AnswerRecord } from './types.ts';
import { sounds } from './soundEffects.ts';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  letterStatuses: Record<number, LetterStatus>;
  answers: Record<number, AnswerRecord>;
  onSelectQuestion: (questionId: number) => void;
  onRestartAll: () => void;
  onRetryIncorrect: () => void;
  isGameComplete: boolean;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  questions,
  letterStatuses,
  answers,
  onSelectQuestion,
  onRestartAll,
  onRetryIncorrect,
  isGameComplete,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'pending'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const correctCount = Object.values(letterStatuses).filter((s) => s === 'correct').length;
  const incorrectCount = Object.values(letterStatuses).filter((s) => s === 'incorrect').length;
  const pendingCount = questions.length - correctCount - incorrectCount;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  const filteredQuestions = questions.filter((q) => {
    const status = letterStatuses[q.id] || 'pending';
    if (filter === 'correct') return status === 'correct';
    if (filter === 'incorrect') return status === 'incorrect';
    if (filter === 'pending') return status === 'pending' || status === 'passed';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-sky-500/40 rounded-2xl shadow-2xl shadow-sky-950/80 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-linear-to-r from-sky-950 via-slate-900 to-sky-950 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⚽</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isGameComplete ? '¡El Rosco Completado! 🎉' : 'Revisión de preguntas · Հարցերի ցանկ'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-sky-300">
              {isGameComplete
                ? 'Ամբողջ ռոսկոն ավարտված է։ Հիանալի աշխատանք։'
                : '27 preguntas de fútbol en español y armenio (Nivel A1–A2)'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 bg-slate-950/60 border-b border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Aciertos / Ճիշտ</div>
            <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono">
              {correctCount}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Fallos / Սխալ</div>
            <div className="text-lg sm:text-2xl font-black text-rose-400 font-mono">
              {incorrectCount}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Pendientes</div>
            <div className="text-lg sm:text-2xl font-black text-sky-400 font-mono">
              {pendingCount}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Puntuación</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono">
              {scorePercent}%
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-semibold ${
                filter === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Todas ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-semibold ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Aciertos ({correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-semibold ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Fallos ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-semibold ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Pendientes ({pendingCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-800/50">
          {filteredQuestions.map((q) => {
            const status = letterStatuses[q.id] || 'pending';
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="pt-3 first:pt-0 group hover:bg-slate-800/30 p-2.5 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Letter circular badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 border ${
                      status === 'correct'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : status === 'incorrect'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : status === 'passed'
                        ? 'bg-amber-500 text-slate-950 border-amber-300'
                        : 'bg-sky-700 text-white border-sky-400'
                    }`}
                  >
                    {q.letter}
                  </div>

                  {/* Question details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-sky-400 uppercase">
                        #{q.id} · {q.partTitleEs}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] font-bold text-slate-300">
                        {q.isTrue ? 'Verdadero (Ճիշտ է)' : 'Falso (Սխալ է)'}
                      </span>
                    </div>

                    {/* Spanish sentence */}
                    <p className="text-sm sm:text-base font-bold text-white mb-1">
                      🇪🇸 {q.textEs}
                    </p>

                    {/* Armenian sentence */}
                    <p className="text-xs sm:text-sm font-medium text-amber-200 mb-2">
                      🇦🇲 {q.textHy}
                    </p>

                    {/* Explanation toggle / display */}
                    {(q.explanationEs || q.explanationHy) && (
                      <div className="mt-1 text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                        <div className="text-[11px] font-semibold text-emerald-400">
                          {q.explanationEs}
                        </div>
                        <div className="text-[11px] text-amber-300">
                          {q.explanationHy}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Jump button */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectQuestion(q.id);
                      onClose();
                    }}
                    className="shrink-0 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Ir al Rosco
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onRestartAll();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              🔄 Jugar de nuevo · Խաղալ նորից
            </button>

            {incorrectCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  onRetryIncorrect();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                ⚡ Repetir fallos · Կրկնել սխալները ({incorrectCount})
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer ml-auto"
          >
            Continuar en el Rosco · Շարունակել
          </button>
        </div>
      </div>
    </div>
  );
};
