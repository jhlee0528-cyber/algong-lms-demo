import React, { useState, useEffect } from 'react';
import { getLessonsByLevel, Lesson } from '../../data/curriculum';
import { LevelCode } from '../../types/smartree';

interface CurriculumBrowserProps {
  onStartQuiz?: (lessonId: string) => void;
}

const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({ onStartQuiz }) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('SA1');
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const lessons = getLessonsByLevel(selectedLevel);

  // 음성 목록 로드 (일부 브라우저에서는 비동기로 로드됨)
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    // Chrome에서는 voiceschanged 이벤트를 기다려야 함
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // 기존 재생 중인 음성 중지
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1.1; // 여성 목소리에 가깝게 피치 조정
      
      // 여성 목소리 선택
      const voices = speechSynthesis.getVoices();
      // 영어 여성 목소리 찾기 (다양한 플랫폼 지원)
      const femaleVoice = voices.find(
        (voice) =>
          voice.lang.startsWith('en') &&
          (voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('zira') || // Microsoft Zira (여성)
            voice.name.toLowerCase().includes('samantha') || // Apple Samantha (여성)
            voice.name.toLowerCase().includes('karen') || // macOS Karen (여성)
            voice.name.toLowerCase().includes('susan') || // macOS Susan (여성)
            voice.name.toLowerCase().includes('victoria') || // macOS Victoria (여성)
            voice.name.toLowerCase().includes('google uk english female') ||
            voice.name.toLowerCase().includes('google us english female') ||
            voice.name.toLowerCase().includes('google australian english female'))
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        // 여성 목소리를 찾지 못한 경우, 영어 음성 중에서 선택
        // (일부 브라우저에서는 성별 정보가 없을 수 있음)
        const englishVoice = voices.find((voice) => voice.lang.startsWith('en-US'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 레벨 선택 */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-600 font-medium">레벨 선택:</span>
        <div className="flex flex-wrap gap-2">
          {['SA1', 'SA2', 'SA3', 'SA4', 'SA5', 'SA6'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as LevelCode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === level
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 레슨 목록 */}
      <div className="space-y-3">
        {lessons.length > 0 ? (
          lessons.map((lesson) => {
            const isExpanded = expandedLesson === lesson.lessonId;

            return (
              <div
                key={lesson.lessonId}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
              >
                {/* 레슨 헤더 */}
                <button
                  onClick={() => setExpandedLesson(isExpanded ? null : lesson.lessonId)}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {lesson.lessonNumber}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{lesson.title}</div>
                      <div className="text-sm text-gray-500">
                        {lesson.words.length}개 단어 · {lesson.stories.length}개 문장
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

                {/* 레슨 상세 */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t bg-gray-50">
                    {/* 단어 목록 */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        📗 단어 ({lesson.words.length}개)
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.words.map((word) => (
                          <button
                            key={word.english}
                            onClick={() => playAudio(word.english)}
                            className="px-3 py-2 bg-white rounded-lg border hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center gap-2"
                          >
                            <span className="font-medium text-gray-800">{word.english}</span>
                            {word.korean && (
                              <span className="text-gray-500 text-sm">({word.korean})</span>
                            )}
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 스토리 */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        📖 스토리 ({lesson.stories.length}문장)
                      </h4>
                      <div className="bg-white rounded-lg border p-3 space-y-2">
                        {lesson.stories.map((story, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 p-1 rounded"
                          >
                            <button
                              onClick={() => playAudio(story)}
                              className="p-1 hover:bg-blue-100 rounded"
                            >
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              </svg>
                            </button>
                            <span className="text-sm">{story}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => onStartQuiz?.(lesson.lessonId)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        이 레슨으로 퀴즈 시작
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                        🃏 플래시카드 학습
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedLevel} 레벨의 레슨이 아직 준비되지 않았습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumBrowser;
