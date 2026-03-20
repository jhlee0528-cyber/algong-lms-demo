/**
 * AI 문제 만들기 페이지
 * 7단계 플로우로 AI 문제 생성
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StepStudentSelect, { type Student } from '../components/aiquiz/StepStudentSelect';
import StepTypeSelect, { type QuestionType } from '../components/aiquiz/StepTypeSelect';
import StepCountSelect from '../components/aiquiz/StepCountSelect';
import StepGenerating from '../components/aiquiz/StepGenerating';
import StepQuestionList from '../components/aiquiz/StepQuestionList';
import StepReview from '../components/aiquiz/StepReview';
import StepSaveFile from '../components/aiquiz/StepSaveFile';
import { getRandomQuestions, getQuestionsByType, type QuizQuestion } from '../data/mockQuestions';

const AIQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Student selection
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  // Step 2: Question type
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

  // Step 3: Question count
  const [selectedCount, setSelectedCount] = useState(10);

  // Step 5: Generated questions and selection
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  // Mock students data (20 students)
  const students: Student[] = useMemo(() => {
    const names = [
      '김민수', '이지은', '박준호', '최서연', '정현우',
      '강소영', '윤도현', '임수진', '한지훈', '오나은',
      '신동욱', '배미래', '조성민', '홍예린', '송태현',
      '유하늘', '문지원', '양준혁', '백서아', '남도윤',
    ];
    return names.map((name, idx) => ({
      id: idx + 1,
      name,
      grade: Math.floor(Math.random() * 3) + 1,
    }));
  }, []);

  const selectedStudentNames = useMemo(() => {
    return students
      .filter(s => selectedStudents.includes(s.id))
      .map(s => s.name);
  }, [students, selectedStudents]);

  // Step navigation handlers
  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Next = () => {
    setCurrentStep(4);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleStep4Complete = () => {
    // Generate questions based on type and count
    const questions = selectedType === 'mixed'
      ? getRandomQuestions(selectedCount)
      : getQuestionsByType(selectedType || 'vocabulary', selectedCount);

    setGeneratedQuestions(questions);
    setSelectedQuestions(questions.map(q => q.id)); // Auto-select all
    setCurrentStep(5);
  };

  const handleStep5Next = () => {
    setCurrentStep(6);
  };

  const handleStep5Back = () => {
    // Go back to step 3 to regenerate
    setCurrentStep(3);
  };

  const handleStep6Complete = () => {
    setCurrentStep(7);
  };

  const handleSave = (fileName: string, format: 'pdf' | 'docx' | 'hwp') => {
    console.log('Saving file:', fileName, format);
    // In a real app, this would trigger file download
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedStudents([]);
    setSelectedType(null);
    setSelectedCount(10);
    setGeneratedQuestions([]);
    setSelectedQuestions([]);
  };

  const handleClose = () => {
    navigate('/learning-materials');
  };

  // Progress indicator
  const progressPercent = (currentStep / 7) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <h1 className="text-3xl font-bold text-gray-800">AI 문제 만들기</h1>
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕ 닫기
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Step {currentStep} / 7</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className={currentStep >= 1 ? 'text-purple-600 font-semibold' : ''}>학생</span>
              <span className={currentStep >= 2 ? 'text-purple-600 font-semibold' : ''}>유형</span>
              <span className={currentStep >= 3 ? 'text-purple-600 font-semibold' : ''}>개수</span>
              <span className={currentStep >= 4 ? 'text-purple-600 font-semibold' : ''}>생성</span>
              <span className={currentStep >= 5 ? 'text-purple-600 font-semibold' : ''}>선택</span>
              <span className={currentStep >= 6 ? 'text-purple-600 font-semibold' : ''}>검수</span>
              <span className={currentStep >= 7 ? 'text-purple-600 font-semibold' : ''}>저장</span>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          {currentStep === 1 && (
            <StepStudentSelect
              students={students}
              selectedStudents={selectedStudents}
              onStudentsChange={setSelectedStudents}
              onNext={handleStep1Next}
            />
          )}

          {currentStep === 2 && (
            <StepTypeSelect
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onNext={handleStep2Next}
              onBack={handleStep2Back}
            />
          )}

          {currentStep === 3 && (
            <StepCountSelect
              selectedCount={selectedCount}
              onCountChange={setSelectedCount}
              onNext={handleStep3Next}
              onBack={handleStep3Back}
            />
          )}

          {currentStep === 4 && (
            <StepGenerating
              questionCount={selectedCount}
              onComplete={handleStep4Complete}
            />
          )}

          {currentStep === 5 && (
            <StepQuestionList
              questions={generatedQuestions}
              selectedQuestions={selectedQuestions}
              onQuestionsChange={setSelectedQuestions}
              onNext={handleStep5Next}
              onBack={handleStep5Back}
            />
          )}

          {currentStep === 6 && (
            <StepReview
              questionCount={selectedQuestions.length}
              onComplete={handleStep6Complete}
            />
          )}

          {currentStep === 7 && (
            <StepSaveFile
              questionCount={selectedQuestions.length}
              studentNames={selectedStudentNames}
              onSave={handleSave}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIQuizPage;
