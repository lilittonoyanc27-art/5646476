import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, LetterStatus, AnswerRecord } from './types.ts';
import { QUESTIONS } from './questions.ts';
import { sounds } from './soundEffects.ts';
import { Rosco } from './Rosco.tsx';
import { QuestionCard } from './QuestionCard.tsx';
import { ScoreBoard } from './ScoreBoard.tsx';
import { SummaryModal } from './SummaryModal.tsx';

const STORAGE_KEY = 'pasapalabra_futbol_game_state_v1';

export default function App() {
  const [currentId, setCurrentId] = useState<number>(1);
  const [letterStatuses, setLetterStatuses] = useState<Record<number, LetterStatus>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.letterStatuses) return parsed.letterStatuses;
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) return parsed.answers;
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => sounds.isMuted());
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ letterStatuses, answers, currentId })
      );
    } catch {
      // ignore
    }
  }, [letterStatuses, answers, currentId]);

  // Current question object
  const currentQuestion = useMemo(
    () => QUESTIONS.find((q) => q.id === currentId) || QUESTIONS[0],
    [currentId]
  );

  // Counters
  const correctCount = useMemo(
    () => Object.values(letterStatuses).filter((s) => s === 'correct').length,
    [letterStatuses]
  );
  const incorrectCount = useMemo(
    () => Object.values(letterStatuses).filter((s) => s === 'incorrect').length,
    [letterStatuses]
  );
  const remainingCount = QUESTIONS.length - correctCount - incorrectCount;
  const isGameComplete = correctCount + incorrectCount === QUESTIONS.length;

  // Trigger victory sound once when finished
  useEffect(() => {
    if (isGameComplete && QUESTIONS.length > 0) {
      sounds.playVictory();
      setShowCongratsBanner(true);
    }
  }, [isGameComplete]);

  // Find next unanswered or passed question in circular order
  const findNextUnanswered = useCallback(
    (fromId: number): number => {
      const total = QUESTIONS.length;
      const startIndex = QUESTIONS.findIndex((q) => q.id === fromId);

      // First try to find next question that is pending or passed
      for (let i = 1; i <= total; i++) {
        const nextIndex = (startIndex + i) % total;
        const q = QUESTIONS[nextIndex];
        const status = letterStatuses[q.id];
        if (!status || status === 'pending' || status === 'passed') {
          return q.id;
        }
      }

      // If all are answered, just return next circular index
      return QUESTIONS[(startIndex + 1) % total].id;
    },
    [letterStatuses]
  );

  // Handle answering Verdadero (true) or Falso (false)
  const handleAnswer = (userAnswer: boolean) => {
    const isCorrect = userAnswer === currentQuestion.isTrue;
    const newStatus: LetterStatus = isCorrect ? 'correct' : 'incorrect';

    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }

    setLetterStatuses((prev) => ({
      ...prev,
      [currentQuestion.id]: newStatus,
    }));

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        userAnswer,
        isCorrect,
        answeredAt: Date.now(),
      },
    }));
  };

  // Handle Pasapalabra (skip to next, come back later)
  const handlePasapalabra = () => {
    sounds.playPass();
    setLetterStatuses((prev) => {
      // If it wasn't answered yet, mark as 'passed'
      const currentStatus = prev[currentQuestion.id];
      if (currentStatus !== 'correct' && currentStatus !== 'incorrect') {
        return {
          ...prev,
          [currentQuestion.id]: 'passed',
        };
      }
      return prev;
    });

    const nextId = findNextUnanswered(currentQuestion.id);
    setCurrentId(nextId);
  };

  // Next and Previous navigation
  const handleNext = () => {
    sounds.playClick();
    const nextId = findNextUnanswered(currentQuestion.id);
    setCurrentId(nextId);
  };

  const handlePrev = () => {
    sounds.playClick();
    const total = QUESTIONS.length;
    const currIndex = QUESTIONS.findIndex((q) => q.id === currentId);
    const prevIndex = (currIndex - 1 + total) % total;
    setCurrentId(QUESTIONS[prevIndex].id);
  };

  // Direct select from Rosco
  const handleSelectLetter = (qId: number) => {
    sounds.playClick();
    setCurrentId(qId);
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
  };

  // Restart all
  const handleRestart = () => {
    if (window.confirm('¿Deseas reiniciar la partida? · Ցանկանո՞ւմ եք վերսկսել խաղը:')) {
      setLetterStatuses({});
      setAnswers({});
      setCurrentId(1);
      setShowCongratsBanner(false);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  // Retry only incorrect questions
  const handleRetryIncorrect = () => {
    setLetterStatuses((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const numKey = Number(key);
        if (next[numKey] === 'incorrect') {
          delete next[numKey];
        }
      });
      return next;
    });

    setAnswers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        const numKey = Number(key);
        if (next[numKey] && !next[numKey].isCorrect) {
          delete next[numKey];
        }
      });
      return next;
    });

    setShowCongratsBanner(false);
    // Jump to first unanswered
    const firstIncorrect = QUESTIONS.find(
      (q) => letterStatuses[q.id] === 'incorrect'
    );
    if (firstIncorrect) {
      setCurrentId(firstIncorrect.id);
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        handleAnswer(true);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleAnswer(false);
      } else if (e.key === 'p' || e.key === 'P' || e.key === ' ') {
        e.preventDefault();
        handlePasapalabra();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, handleAnswer, handlePasapalabra, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      {/* Top Bar HUD */}
      <ScoreBoard
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        remainingCount={remainingCount}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestart={handleRestart}
        onOpenSummary={() => setShowSummaryModal(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* Game Completed Banner */}
        {showCongratsBanner && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/60 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  ¡Rosco terminado! 27 de 27 preguntas completadas
                </h2>
                <p className="text-xs sm:text-sm text-emerald-300">
                  Ճիշտ: <strong className="text-white">{correctCount}</strong> · Սխալ: <strong className="text-white">{incorrectCount}</strong> ({Math.round((correctCount / QUESTIONS.length) * 100)}%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSummaryModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow cursor-pointer transition-all"
              >
                Ver resultados · Արդյունքներ
              </button>
              {incorrectCount > 0 && (
                <button
                  type="button"
                  onClick={handleRetryIncorrect}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs sm:text-sm border border-rose-500/40 cursor-pointer transition-all"
                >
                  Reintentar fallos · Կրկնել սխալները
                </button>
              )}
            </div>
          </div>
        )}

        {/* 2-Column Responsive Layout: El Rosco + Active Question Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: The Iconic Circular Rosco Ring */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between text-xs text-sky-400 font-semibold mb-2 px-2">
              <span className="flex items-center gap-1.5">
                <span>El Rosco</span>
                <span className="text-slate-400">· 27 letras</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Toca cualquier letra para saltar
              </span>
            </div>

            {/* Circular Ring Container */}
            <div className="w-full p-2 sm:p-4 rounded-3xl bg-slate-900/40 border border-sky-500/10 shadow-inner flex items-center justify-center">
              <Rosco
                questions={QUESTIONS}
                currentQuestionId={currentId}
                letterStatuses={letterStatuses}
                onSelectLetter={handleSelectLetter}
              />
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Ճիշտ (Correcto)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Սխալ (Fallo)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Անցած (Pasapalabra)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                <span>Չպատասխանած (Pendiente)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Question Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <QuestionCard
              question={currentQuestion}
              status={letterStatuses[currentQuestion.id] || 'pending'}
              lastAnswer={answers[currentQuestion.id]}
              onAnswer={handleAnswer}
              onPasapalabra={handlePasapalabra}
              onNext={handleNext}
              onPrev={handlePrev}
              totalAnswered={correctCount + incorrectCount}
              totalQuestions={QUESTIONS.length}
            />

            {/* Quick Keyboard Shortcuts Guide */}
            <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-slate-500 mt-4">
              <span>Ստեղնաշար / Teclado:</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">V</kbd> = Verdadero</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">F</kbd> = Falso</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Espacio</kbd> = Pasapalabra</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">← / →</kbd> = Navegar</span>
            </div>
          </div>
        </div>
      </main>

      {/* Summary & Review Modal */}
      <SummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        questions={QUESTIONS}
        letterStatuses={letterStatuses}
        answers={answers}
        onSelectQuestion={(qId) => {
          setCurrentId(qId);
          setShowSummaryModal(false);
        }}
        onRestartAll={() => {
          setLetterStatuses({});
          setAnswers({});
          setCurrentId(1);
          setShowCongratsBanner(false);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            // ignore
          }
        }}
        onRetryIncorrect={handleRetryIncorrect}
        isGameComplete={isGameComplete}
      />
    </div>
  );
}
