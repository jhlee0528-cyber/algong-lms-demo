/**
 * 독후 퀴즈 컴포넌트
 * 도서 읽기 후 퀴즈를 풀 수 있는 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { useLibraryBook } from '../../hooks/useLibraryBooks';
import { useQuizByBookId, useSubmitQuiz } from '../../hooks/useQuiz';
import { createLibraryProgress } from '../../api/library';
import type { LibraryQuiz, QuizResponse } from '../../types/quiz';

interface QuizComponentProps {
  bookId: string;
  studentId: number;
  onComplete?: (score: number) => void;
  onClose?: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  bookId,
  studentId,
  onComplete,
  onClose,
}) => {
  const [quiz, setQuiz] = useState<LibraryQuiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string | number }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: book } = useLibraryBook({ book_id: bookId });
  const { data: quizData } = useQuizByBookId(bookId);
  const submitQuiz = useSubmitQuiz();

  useEffect(() => {
    if (quizData) {
      setQuiz(quizData);
    } else if (book?.quiz_id) {
      // 퀴즈가 없는 경우 샘플 데이터 사용 (개발용)
      const sampleQuiz: LibraryQuiz = {
        quiz_id: book.quiz_id,
        book_id: bookId,
        questions: [
          {
            question_id: 'q1',
            question_text: '이 책의 주인공은 누구인가요?',
            question_type: 'multiple_choice',
            options: ['Alice', 'Bob', 'Charlie', 'Diana'],
            correct_answer: 0,
            explanation: '주인공은 Alice입니다.',
          },
          {
            question_id: 'q2',
            question_text: '이 책의 주제는 무엇인가요?',
            question_type: 'multiple_choice',
            options: ['우정', '모험', '가족', '성장'],
            correct_answer: 1,
            explanation: '이 책은 모험을 주제로 다룹니다.',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setQuiz(sampleQuiz);
    }
  }, [book, bookId, quizData]);

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (quiz && currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    setLoading(true);

    // 정답 채점
    let correctCount = 0;
    const responses: QuizResponse[] = quiz.questions.map((question) => {
      const userAnswer = answers[question.question_id];
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) correctCount++;

      return {
        question_id: question.question_id,
        answer: userAnswer || '',
        is_correct: isCorrect,
      };
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);

    setScore(calculatedScore);
    setShowResult(true);

    // 결과 저장
    try {
      // 퀴즈 결과 저장
      if (quiz) {
        await submitQuiz.mutateAsync({
          studentId,
          quizId: quiz.quiz_id,
          bookId,
          responses,
          score: calculatedScore,
        });
      }

      // 도서 읽기 진행도 저장
      await createLibraryProgress({
        student_id: studentId,
        book_id: bookId,
        reading_time: 0, // TODO: 실제 읽기 시간
        completed: true,
        quiz_score: calculatedScore,
      });
    } catch (error) {
      console.error('퀴즈 결과 저장 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!quiz) {
    return (
      <div className="text-center py-8 text-gray-500">
        퀴즈를 불러오는 중...
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const allAnswered = quiz.questions.every((q) => answers[q.question_id] !== undefined);

  if (showResult) {
    const correctCount = quiz.questions.filter(
      (q) => answers[q.question_id] === q.correct_answer
    ).length;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">퀴즈 결과</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-orange-600 mb-2">{score}점</div>
          <div className="text-lg text-gray-600">
            {correctCount}/{quiz.questions.length} 문제 정답
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question.question_id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div
                key={question.question_id}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">
                      {index + 1}. {question.question_text}
                    </div>
                    {question.question_type === 'multiple_choice' && question.options && (
                      <div className="text-sm text-gray-600">
                        선택한 답: {question.options[userAnswer as number] || '-'}
                        <br />
                        정답: {question.options[question.correct_answer as number]}
                      </div>
                    )}
                    {question.explanation && (
                      <div className="text-xs text-gray-500 mt-2">{question.explanation}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 justify-end">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              닫기
            </button>
          )}
          <button
            onClick={() => {
              onComplete?.(score);
              onClose?.();
            }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            완료
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">독후 퀴즈</h3>
        <div className="text-sm text-gray-600">
          {currentIndex + 1} / {quiz.questions.length}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-semibold text-gray-800 mb-4">
          {currentQuestion.question_text}
        </div>

        {currentQuestion.question_type === 'multiple_choice' && currentQuestion.options && (
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  answers[currentQuestion.question_id] === index
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.question_id}`}
                  value={index}
                  checked={answers[currentQuestion.question_id] === index}
                  onChange={() => handleAnswer(currentQuestion.question_id, index)}
                  className="w-4 h-4 text-orange-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {currentQuestion.question_type === 'true_false' && (
          <div className="space-y-2">
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                answers[currentQuestion.question_id] === 1
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.question_id}`}
                value={1}
                checked={answers[currentQuestion.question_id] === 1}
                onChange={() => handleAnswer(currentQuestion.question_id, 1)}
                className="w-4 h-4 text-orange-600"
              />
              <span className="text-gray-700">맞음</span>
            </label>
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                answers[currentQuestion.question_id] === 0
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.question_id}`}
                value={0}
                checked={answers[currentQuestion.question_id] === 0}
                onChange={() => handleAnswer(currentQuestion.question_id, 0)}
                className="w-4 h-4 text-orange-600"
              />
              <span className="text-gray-700">틀림</span>
            </label>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <div className="flex gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              취소
            </button>
          )}
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || loading}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? '제출 중...' : '제출하기'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
