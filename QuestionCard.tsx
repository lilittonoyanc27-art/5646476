import React, { useState, useEffect } from 'react';
import { Question, LetterStatus, AnswerRecord } from './types.ts';
import { sounds } from './soundEffects.ts';

interface QuestionCardProps {
  question: Question;
  status: LetterStatus;
  lastAnswer?: AnswerRecord;
  onAnswer: (userAnswer: boolean) => void;
  onPasapalabra: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalAnswered: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  status,
  lastAnswer,
  onAnswer,
  onPasapalabra,
  onNext,
  onPrev,
  totalAnswered,
  totalQuestions,
}) => {
  const [showArmenian, setShowArmenian] = useState<boolean>(false);
  const [autoShowArmenian, setAutoShowArmenian] = useState<boolean>(false);

  // Reset translation display when question changes, unless autoShowArmenian is enabled
  useEffect(() => {
    setShowArmenian(autoShowArmenian);
  }, [question.id, autoShowArmenian]);

  const handleToggleArmenian = () => {
    sounds.playClick();
    setShowArmenian((prev) => !prev);
  };

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.speakSpanish(question.textEs);
  };

  const isAnswered = status === 'correct' || status === 'incorrect';

  return (
    <div className="w-full bg-slate-900/95 border border-sky-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-sky-950/60 backdrop-blur-md flex flex-col justify-between">
      {/* Top Header: Part info & Letter badge */}
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-sky-600 to-blue-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-sky-700/50 border border-sky-300">
              {question.letter}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-sky-400 font-semibold">
                {question.partTitleEs}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {question.partTitleHy}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            <span className="text-xs font-mono font-bold text-slate-400 tabular-nums">
              #{question.id} / {totalQuestions}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
              Nivel A1–A2
            </span>
          </div>
        </div>

        {/* Spanish Statement Box (Interactive: Click to Reveal Armenian) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <span>🇪🇸</span> Frase en español:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePronounce}
                title="Escuchar pronunciación en español"
                className="text-xs text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 cursor-pointer"
              >
                <span>🔊</span>
                <span>Escuchar</span>
              </button>
            </div>
          </div>

          {/* Clickable Card Box */}
          <button
            type="button"
            onClick={handleToggleArmenian}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative group ${
              showArmenian
                ? 'bg-sky-950/40 border-sky-500/50 shadow-inner'
                : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 hover:border-sky-500/40'
            }`}
          >
            <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed pr-6">
              «{question.textEs}»
            </p>

            <div className="mt-2.5 flex items-center justify-between text-xs text-sky-400/90 font-medium">
              <span className="flex items-center gap-1">
                <span className="inline-block transition-transform duration-200 group-hover:scale-110">
                  {showArmenian ? '📖' : '👆'}
                </span>
                <span>
                  {showArmenian
                    ? 'Սեղմեք թարգմանությունը թաքցնելու համար'
                    : 'Սեղմեք հայերեն թարգմանությունը տեսնելու համար (Haz clic para ver armenio)'}
                </span>
              </span>
              <span className="text-[11px] underline opacity-80 group-hover:opacity-100">
                {showArmenian ? 'Ocultar' : 'Ver traducción'}
              </span>
            </div>
          </button>
        </div>

        {/* Revealed Armenian Translation Box */}
        {showArmenian && (
          <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
              <span>🇦🇲</span>
              <span>Հայերեն թարգմանություն (Traducción en armenio):</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-amber-100 leading-snug">
              «{question.textHy}»
            </p>
          </div>
        )}

        {/* Feedback Section (if already answered) */}
        {isAnswered && (
          <div
            className={`mb-4 p-4 rounded-xl border animate-fadeIn ${
              status === 'correct'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">
                {status === 'correct' ? '🎉' : '⚠️'}
              </span>
              <span className="font-extrabold text-sm sm:text-base">
                {status === 'correct'
                  ? '¡Correcto! — Ճիշտ պատասխան'
                  : '¡Incorrecto! — Սխալ պատասխան'}
              </span>
              <span className="text-xs opacity-75 ml-auto">
                {question.isTrue ? 'Verdadero (Ճիշտ է)' : 'Falso (Սխալ է)'}
              </span>
            </div>

            {(question.explanationEs || question.explanationHy) && (
              <div className="mt-2 text-xs sm:text-sm space-y-1 pt-2 border-t border-white/10 text-slate-200">
                {question.explanationEs && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">ES:</span>
                    <span>{question.explanationEs}</span>
                  </div>
                )}
                {question.explanationHy && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-300 font-bold shrink-0">HY:</span>
                    <span>{question.explanationHy}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Zone: Verdadero / Falso / Pasapalabra */}
      <div className="mt-2 pt-3 border-t border-slate-800">
        {!isAnswered ? (
          <div className="space-y-2.5">
            <div className="text-center text-xs font-semibold text-slate-400 mb-1">
              ¿Es verdadera o falsa? · Ճի՞շտ է, թե՞ սխալ.
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* VERDADERO BUTTON */}
              <button
                type="button"
                onClick={() => onAnswer(true)}
                className="py-3 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/60 transition-all transform active:scale-95 flex flex-col items-center justify-center cursor-pointer border border-emerald-400/30"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">✓</span>
                  <span>Verdadero</span>
                </div>
                <span className="text-xs font-normal opacity-90">Ճիշտ է</span>
              </button>

              {/* FALSO BUTTON */}
              <button
                type="button"
                onClick={() => onAnswer(false)}
                className="py-3 px-4 rounded-xl bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-950/60 transition-all transform active:scale-95 flex flex-col items-center justify-center cursor-pointer border border-rose-400/30"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">✕</span>
                  <span>Falso</span>
                </div>
                <span className="text-xs font-normal opacity-90">Սխալ է</span>
              </button>
            </div>

            {/* PASAPALABRA (SKIP / TURN) BUTTON */}
            <button
              type="button"
              onClick={onPasapalabra}
              className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-md shadow-amber-950/40 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <span>↩</span>
              <span>¡Pasapalabra!</span>
              <span className="text-xs font-semibold opacity-90">· Անցնել (կվերադառնանք)</span>
            </button>
          </div>
        ) : (
          /* Next Question / Continue playing buttons */
          <div className="space-y-2">
            <button
              type="button"
              onClick={onNext}
              className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-black text-base shadow-lg shadow-sky-950/60 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-sky-400/40"
            >
              <span>Siguiente pregunta · Հաջորդ հարցը</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Bottom Helper Controls: Prev / Next / Auto-show Armenian */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 mt-2 border-t border-slate-800/60">
          <button
            type="button"
            onClick={onPrev}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800"
          >
            <span>←</span>
            <span>Anterior</span>
          </button>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-300 select-none">
            <input
              type="checkbox"
              checked={autoShowArmenian}
              onChange={(e) => setAutoShowArmenian(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0 cursor-pointer"
            />
            <span className="text-[11px]">Միշտ բացել հայերենը (Auto-traducción)</span>
          </label>

          <button
            type="button"
            onClick={onNext}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800"
          >
            <span>Siguiente</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
