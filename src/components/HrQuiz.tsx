import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { HR_QUIZ_QUESTIONS } from '../utils/hr-calculations';

export const HrQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ = HR_QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = HR_QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing answer after submission

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
    setHasAnsweredCurrent(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnsweredCurrent(selectedAnswers[currentQuestionIndex + 1] !== undefined);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setHasAnsweredCurrent(false);
    setIsQuizCompleted(false);
  };

  // Calculate total score
  const correctCount = Object.entries(selectedAnswers).filter(([qIdxStr, optIdx]) => {
    const qIndex = parseInt(qIdxStr, 10);
    return HR_QUIZ_QUESTIONS[qIndex]?.options[optIdx]?.isCorrect;
  }).length;

  const currentAnswerIndex = selectedAnswers[currentQuestionIndex];
  const isCurrentSelectionCorrect =
    currentAnswerIndex !== undefined && currentQ.options[currentAnswerIndex]?.isCorrect;

  return (
    <section id="quiz-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Uji Pengetahuan Tempat Kerja</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Kuis HR: Mitos vs Fakta Manajemen SDM
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Jawab 3 pertanyaan interaktif seputar praktik kerja modern. Temukan wawasan berbasis riset ilmiah di setiap jawabannya.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          {!isQuizCompleted ? (
            <div>
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs text-slate-500">
                <span className="font-semibold text-blue-700 uppercase tracking-wider">
                  Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
                </span>
                <div className="flex items-center gap-1">
                  {HR_QUIZ_QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentQuestionIndex
                          ? 'w-8 bg-blue-700'
                          : idx < currentQuestionIndex
                          ? 'w-4 bg-emerald-500'
                          : 'w-4 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Statement */}
              <div className="mb-6">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Topik Kajian
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentQ.statement}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">Konteks: </span>
                  {currentQ.context}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3 mb-6" role="radiogroup" aria-label="Pilihan Jawaban Kuis">
                {currentQ.options.map((option, idx) => {
                  const isSelected = currentAnswerIndex === idx;
                  const isSubmitted = hasAnsweredCurrent;

                  let optionStyle =
                    'bg-slate-50/70 border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-800';

                  if (isSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm transition-all cursor-pointer ${optionStyle} ${
                        !isSubmitted ? 'active:scale-[0.99]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                          isSelected && !isSubmitted
                            ? 'bg-blue-700 text-white'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}>
                          {idx === 0 ? 'A' : 'B'}
                        </span>
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>

                      {isSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback Panel */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-5 rounded-xl border mb-6 transition-all ${
                    isCurrentSelectionCorrect
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/90 border-rose-200 text-rose-900'
                  }`}
                  data-testid="quiz-instant-feedback"
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {isCurrentSelectionCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800">Jawaban Anda Tepat!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span className="text-rose-800">Kurang Tepat!</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentQ.explanation}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{currentQ.sourceOrFact}</span>
                  </div>
                </div>
              )}

              {/* Action Button: Next or Finish */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={!hasAnsweredCurrent}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                >
                  <span>
                    {currentQuestionIndex < totalQuestions - 1
                      ? 'Lanjut Pertanyaan Berikutnya'
                      : 'Lihat Hasil Akhir Kuis'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Final Score Screen */
            <div className="text-center py-4" data-testid="quiz-final-score-screen">
              
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Kuis Selesai!
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Skor Anda: <span className="text-blue-700 font-mono">{correctCount}</span> dari {totalQuestions}
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                {correctCount === 3
                  ? 'Luar biasa! Anda memiliki wawasan manajemen SDM modern yang sangat tajam dan berbasis bukti.'
                  : correctCount === 2
                  ? 'Bagus sekali! Pemahaman Anda tentang dinamika retensi dan tempat kerja sudah di atas rata-rata.'
                  : 'Hasil yang baik untuk refleksi! Banyak mitos SDM konvensional yang kini telah dibantah oleh riset modern.'}
              </p>

              {/* Detailed Review Breakdown */}
              <div className="mt-8 text-left space-y-4 max-w-2xl mx-auto">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Ringkasan Kunci Pembelajaran:
                </h4>

                {HR_QUIZ_QUESTIONS.map((q, qIdx) => {
                  const userAnswerIdx = selectedAnswers[qIdx];
                  const isCorrect = userAnswerIdx !== undefined && q.options[userAnswerIdx]?.isCorrect;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">
                          0{q.id}. {q.statement.substring(0, 60)}...
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Benar (+1)' : 'Meleset (0)'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              {/* Retry Button */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
