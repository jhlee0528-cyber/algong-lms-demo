// 학생 데이터 타입
export type TrafficLightStatus = 'green' | 'orange' | 'red'

export interface Student {
  id: number
  name: string
  progress: number // 학습진행률 (%)
  accuracy: number // 정답률 (%)
  learningTime: number // 학습시간 (분)
  readingBooks: number // 독서량 (권)
  status: TrafficLightStatus
}

// 20명 학생 더미 데이터 (자연스러운 값 설정)
// 신호등 상태: 진행률 70% 이상=정상(11명), 40~69%=주의(5명), 40% 미만=관리필요(4명)
export const students: Student[] = [
  // 정상 (11명) - 진행률 70% 이상
  { id: 1, name: '김민수', progress: 85, accuracy: 88, learningTime: 245, readingBooks: 12, status: 'green' },
  { id: 2, name: '이지은', progress: 92, accuracy: 94, learningTime: 285, readingBooks: 15, status: 'green' },
  { id: 4, name: '최서연', progress: 78, accuracy: 82, learningTime: 220, readingBooks: 10, status: 'green' },
  { id: 6, name: '강소영', progress: 88, accuracy: 90, learningTime: 260, readingBooks: 13, status: 'green' },
  { id: 8, name: '임수진', progress: 81, accuracy: 85, learningTime: 235, readingBooks: 11, status: 'green' },
  { id: 10, name: '오나은', progress: 76, accuracy: 80, learningTime: 215, readingBooks: 9, status: 'green' },
  { id: 12, name: '배미래', progress: 90, accuracy: 92, learningTime: 275, readingBooks: 14, status: 'green' },
  { id: 14, name: '홍예린', progress: 94, accuracy: 96, learningTime: 295, readingBooks: 15, status: 'green' },
  { id: 16, name: '유하늘', progress: 73, accuracy: 78, learningTime: 205, readingBooks: 8, status: 'green' },
  { id: 18, name: '서아린', progress: 86, accuracy: 89, learningTime: 250, readingBooks: 12, status: 'green' },
  { id: 19, name: '권민준', progress: 79, accuracy: 83, learningTime: 228, readingBooks: 10, status: 'green' },

  // 주의 (5명) - 진행률 40~69%
  { id: 3, name: '박준호', progress: 58, accuracy: 65, learningTime: 165, readingBooks: 6, status: 'orange' },
  { id: 7, name: '윤도현', progress: 62, accuracy: 68, learningTime: 180, readingBooks: 7, status: 'orange' },
  { id: 11, name: '신동욱', progress: 48, accuracy: 55, learningTime: 135, readingBooks: 4, status: 'orange' },
  { id: 15, name: '송태헌', progress: 65, accuracy: 70, learningTime: 190, readingBooks: 7, status: 'orange' },
  { id: 17, name: '문지호', progress: 52, accuracy: 60, learningTime: 150, readingBooks: 5, status: 'orange' },

  // 관리필요 (4명) - 진행률 40% 미만
  { id: 5, name: '정현우', progress: 35, accuracy: 45, learningTime: 95, readingBooks: 2, status: 'red' },
  { id: 9, name: '한지훈', progress: 28, accuracy: 38, learningTime: 75, readingBooks: 1, status: 'red' },
  { id: 13, name: '조성민', progress: 32, accuracy: 42, learningTime: 85, readingBooks: 2, status: 'red' },
  { id: 20, name: '장수빈', progress: 38, accuracy: 48, learningTime: 105, readingBooks: 3, status: 'red' },
]

// 신호등 색상 헬퍼 함수
export const getStatusColor = (status: TrafficLightStatus): string => {
  switch (status) {
    case 'green': return 'bg-algong-green'
    case 'orange': return 'bg-algong-orange'
    case 'red': return 'bg-algong-red'
  }
}

// 신호등 라벨 헬퍼 함수
export const getStatusLabel = (status: TrafficLightStatus): string => {
  switch (status) {
    case 'green': return '정상'
    case 'orange': return '주의'
    case 'red': return '관리필요'
  }
}
