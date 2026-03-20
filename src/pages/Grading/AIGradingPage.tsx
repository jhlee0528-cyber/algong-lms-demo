/**
 * AI 자동채점 페이지
 * 사진 채점 플로우: 학생 선택 → 사진 업로드 → AI 분석 → 결과
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { availableStudents, sampleGradingResult } from '../../data/mockAIGrading';
import PhotoUploadStep from '../../components/grading/PhotoUploadStep';
import AIAnalyzingStep from '../../components/grading/AIAnalyzingStep';
import AIGradingResultComponent from '../../components/grading/AIGradingResult';

type Step = 'select-student' | 'upload-photo' | 'analyzing' | 'result';

const AIGradingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('select-student');
  const [selectedStudent, setSelectedStudent] = useState<typeof availableStudents[0] | null>(null);

  const handleStudentSelect = (studentId: number) => {
    const student = availableStudents.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setCurrentStep('upload-photo');
    }
  };

  const handleUseSample = () => {
    setCurrentStep('analyzing');
  };

  const handleAnalysisComplete = () => {
    setCurrentStep('result');
  };

  const handleSendToParent = () => {
    alert('학부모에게 결과를 전송했습니다! (데모)');
  };

  const handleGradeAnother = () => {
    setSelectedStudent(null);
    setCurrentStep('select-student');
  };

  const handleBack = () => {
    if (currentStep === 'upload-photo') {
      setSelectedStudent(null);
      setCurrentStep('select-student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => navigate('/grading/quick')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <span>←</span>
            <span>돌아가기</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            📸 AI 자동채점 (사진)
          </h1>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          {currentStep === 'select-student' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  1단계: 학생 선택
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  채점할 학생을 선택하세요
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                  >
                    <div className="font-bold text-gray-800">{student.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {student.grade}학년 · {student.level}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'upload-photo' && (
            <PhotoUploadStep
              selectedStudent={selectedStudent}
              onUseSample={handleUseSample}
              onBack={handleBack}
            />
          )}

          {currentStep === 'analyzing' && (
            <AIAnalyzingStep onComplete={handleAnalysisComplete} />
          )}

          {currentStep === 'result' && (
            <AIGradingResultComponent
              result={sampleGradingResult}
              onSendToParent={handleSendToParent}
              onGradeAnother={handleGradeAnother}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGradingPage;
