-- 알공스마트리 LMS (공부방용) 데이터베이스 스키마
-- Phase 1: 핵심 기능 구현을 위한 기본 스키마

-- ============================================
-- 1. 사용자 관련 테이블
-- ============================================

-- 사용자 테이블 (교사, 학생)
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role ENUM('teacher', 'student') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 학생 정보 확장 테이블
CREATE TABLE IF NOT EXISTS students (
  student_id INT PRIMARY KEY,
  teacher_id INT,
  grade INT,
  parent_name VARCHAR(100),
  parent_phone VARCHAR(20),
  status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE SET NULL,
  INDEX idx_teacher (teacher_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. 단원 관련 테이블
-- ============================================

-- 스마트 파닉스 40단원 테이블
CREATE TABLE IF NOT EXISTS units (
  unit_id INT PRIMARY KEY AUTO_INCREMENT,
  unit_number INT UNIQUE NOT NULL COMMENT '단원 번호 (1~40)',
  unit_title VARCHAR(200) NOT NULL COMMENT '단원 제목 (예: "It Is an Apple")',
  learning_goals TEXT COMMENT '학습 목표',
  target_words JSON COMMENT '목표 단어 목록',
  sentence_patterns JSON COMMENT '문장 패턴',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_unit_number (unit_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. 과제 미션 관련 테이블
-- ============================================

-- 과제 미션 테이블 (확장됨)
CREATE TABLE IF NOT EXISTS mission_assignments (
  mission_id INT PRIMARY KEY AUTO_INCREMENT,
  mission_name VARCHAR(50) NOT NULL COMMENT '과제명 (16자 이내)',
  unit_id INT NOT NULL,
  teacher_id INT NOT NULL,
  
  -- 과제 유형 및 세부 설정 (Phase 1 확장)
  mission_type ENUM('lecture', 'activity', 'ai_chat', 'library', 'mixed') DEFAULT 'mixed' COMMENT '과제 유형',
  lecture_sessions JSON COMMENT '선택된 강의 차시 [1,2,3,4,5,6]',
  activity_types JSON COMMENT '선택된 액티비티 ["listening","reading","speaking","writing"]',
  ai_chat_enabled BOOLEAN DEFAULT FALSE COMMENT 'AI 대화 활성화',
  library_book_ids JSON COMMENT '선택된 도서 ID 목록 ["book_001","book_002"]',
  
  -- 기존 필드
  target_students JSON NOT NULL COMMENT '전송 대상 학생 ID 목록',
  reward_stone INT DEFAULT 0 COMMENT '보상 스톤',
  reward_gold INT DEFAULT 0 COMMENT '보상 골드',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  class_mode BOOLEAN DEFAULT FALSE COMMENT '수업 모드 여부',
  
  -- 메타 정보
  estimated_time INT COMMENT '예상 소요 시간 (분)',
  status ENUM('draft', 'active', 'completed', 'cancelled') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_unit (unit_id),
  INDEX idx_teacher (teacher_id),
  INDEX idx_dates (start_date, end_date),
  INDEX idx_status (status),
  INDEX idx_mission_type (mission_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. 영어도서관 관련 테이블 (신규)
-- ============================================

-- 도서 정보 테이블
CREATE TABLE IF NOT EXISTS library_books (
  book_id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100),
  level INT NOT NULL COMMENT '레벨 (1~5)',
  category VARCHAR(50) COMMENT '카테고리: fiction, non-fiction, phonics',
  description TEXT,
  estimated_time INT COMMENT '예상 읽기 시간 (분)',
  cover_image_url TEXT,
  content_url TEXT COMMENT '도서 콘텐츠 URL',
  quiz_id VARCHAR(50) COMMENT '독후 퀴즈 연결 ID',
  unit_relation JSON COMMENT '연계 단원 정보 [1,2,7]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_level (level),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. 학습 진행도 관련 테이블 (확장됨)
-- ============================================

-- 학생 학습 진행도 테이블 (확장됨)
CREATE TABLE IF NOT EXISTS student_progress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  mission_id INT,
  unit_id INT,
  
  -- 진행 유형 및 세부 정보 (Phase 1 확장)
  progress_type ENUM('lecture', 'activity', 'ai_chat', 'library') NOT NULL,
  lecture_session INT COMMENT '완료한 강의 차시 (1~6)',
  activity_type VARCHAR(20) COMMENT '완료한 액티비티 유형: listening, reading, speaking, writing',
  book_id VARCHAR(50) COMMENT '완료한 도서 ID',
  reading_time INT COMMENT '도서 읽기 시간 (초)',
  
  -- 진행 상태
  completion_rate DECIMAL(5,2) DEFAULT 0.00 COMMENT '완료율 (0~100)',
  score INT COMMENT '획득 점수',
  time_spent INT COMMENT '학습 소요 시간 (초)',
  completed_at TIMESTAMP NULL COMMENT '완료 일시',
  
  -- 메타 정보
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (mission_id) REFERENCES mission_assignments(mission_id) ON DELETE SET NULL,
  FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES library_books(book_id) ON DELETE SET NULL,
  INDEX idx_student (student_id),
  INDEX idx_mission (mission_id),
  INDEX idx_unit (unit_id),
  INDEX idx_progress_type (progress_type),
  INDEX idx_completed (completed_at),
  UNIQUE KEY unique_progress (student_id, mission_id, progress_type, lecture_session, activity_type, book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. AI 대화 관련 테이블
-- ============================================

-- AI 대화 세션 테이블
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  session_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  mission_id INT,
  unit_id INT,
  conversation_type VARCHAR(50) DEFAULT 'textbook' COMMENT '대화 유형: textbook',
  messages JSON COMMENT '대화 메시지 목록',
  total_turns INT DEFAULT 0 COMMENT '총 발화 횟수',
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (mission_id) REFERENCES mission_assignments(mission_id) ON DELETE SET NULL,
  FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON DELETE CASCADE,
  INDEX idx_student (student_id),
  INDEX idx_mission (mission_id),
  INDEX idx_completed (completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. 독후 퀴즈 관련 테이블
-- ============================================

-- 독후 퀴즈 테이블
CREATE TABLE IF NOT EXISTS library_quizzes (
  quiz_id VARCHAR(50) PRIMARY KEY,
  book_id VARCHAR(50) NOT NULL,
  questions JSON NOT NULL COMMENT '퀴즈 문제 목록',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES library_books(book_id) ON DELETE CASCADE,
  INDEX idx_book (book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 독후 퀴즈 응답 테이블
CREATE TABLE IF NOT EXISTS library_quiz_responses (
  response_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  quiz_id VARCHAR(50) NOT NULL,
  book_id VARCHAR(50) NOT NULL,
  answers JSON NOT NULL COMMENT '학생 답안',
  score INT COMMENT '점수',
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES library_quizzes(quiz_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES library_books(book_id) ON DELETE CASCADE,
  INDEX idx_student (student_id),
  INDEX idx_quiz (quiz_id),
  INDEX idx_book (book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. 초기 데이터 삽입 (예시)
-- ============================================

-- 40단원 기본 데이터 삽입
INSERT INTO units (unit_number, unit_title) VALUES
(1, 'It Is an Apple'),
(2, 'It Is a Dog'),
(3, 'This Is a Hat'),
(4, 'This Is a Jet'),
(5, 'I See a Mouse'),
(6, 'I See a Panda'),
(7, 'Look at the Sun'),
(8, 'Look at the Watch'),
(9, 'Where Is the Cap?'),
(10, 'Where Is the Man?'),
(11, 'The Jet Is Here'),
(12, 'I Have a Wig'),
(13, 'I Can Hit the Bell'),
(14, 'A Fox Is in the Box'),
(15, 'There Is a Bug'),
(16, 'I Can Run Fast'),
(17, 'I Like to Bake a Cake'),
(18, 'What Is Your Name?'),
(19, 'Let\'s Hike'),
(20, 'Let\'s Fly a Kite'),
(21, 'Look at My Nose'),
(22, 'Look at the Hole'),
(23, 'Listen to the Tune'),
(24, 'I Like June'),
(25, 'What Color Is the Flag?'),
(26, 'I See a Crab'),
(27, 'I Love My Glass'),
(28, 'Where Is the Dress?'),
(29, 'Can You Swim?'),
(30, 'I Hear a Bang'),
(31, 'Look at the Ship'),
(32, 'This Is My Thumb'),
(33, 'I Like the Bee'),
(34, 'Let\'s Do It'),
(35, 'It Rains Every Day'),
(36, 'I Feel Joy'),
(37, 'I See a Cow'),
(38, 'Look at the Girl'),
(39, 'I Love My Car'),
(40, 'Look at the Moon')
ON DUPLICATE KEY UPDATE unit_title = VALUES(unit_title);

-- ============================================
-- 9. 뷰 생성 (편의를 위한 뷰)
-- ============================================

-- 학생 과제 현황 뷰
CREATE OR REPLACE VIEW v_student_mission_status AS
SELECT 
  sp.student_id,
  u.name AS student_name,
  ma.mission_id,
  ma.mission_name,
  ma.mission_type,
  ma.start_date,
  ma.end_date,
  sp.progress_type,
  sp.completion_rate,
  sp.completed_at,
  CASE 
    WHEN sp.completed_at IS NOT NULL THEN 'completed'
    WHEN CURDATE() > ma.end_date THEN 'overdue'
    WHEN CURDATE() >= ma.start_date THEN 'in_progress'
    ELSE 'pending'
  END AS status
FROM student_progress sp
JOIN mission_assignments ma ON sp.mission_id = ma.mission_id
JOIN users u ON sp.student_id = u.user_id
WHERE u.role = 'student';

-- ============================================
-- 스키마 생성 완료
-- ============================================
