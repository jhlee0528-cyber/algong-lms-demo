/**
 * 과제 선택 관련 타입 정의
 */

import type { LectureSession, ActivityType } from './mission';
import type { LibraryBookListItem } from './library';

export type TaskType = 'lecture' | 'activity' | 'ai_chat' | 'library';

export interface LectureTask {
  type: 'lecture';
  sessions: LectureSession[]; // 선택된 차시 (1~6)
}

export interface ActivityTask {
  type: 'activity';
  activities: ActivityType[]; // 선택된 액티비티 유형
}

export interface AiChatTask {
  type: 'ai_chat';
  enabled: boolean;
}

export interface LibraryTask {
  type: 'library';
  book_ids: string[]; // 선택된 도서 ID 목록
  books?: LibraryBookListItem[]; // 선택된 도서 상세 정보 (UI용)
}

export type Task = LectureTask | ActivityTask | AiChatTask | LibraryTask;

export interface TaskSelection {
  lecture?: LectureTask;
  activity?: ActivityTask;
  ai_chat?: AiChatTask;
  library?: LibraryTask;
}

export interface TaskTimeEstimate {
  lecture: number; // 분
  activity: number; // 분
  ai_chat: number; // 분
  library: number; // 분
  total: number; // 분
}

/**
 * 과제 선택 카드의 상태
 */
export interface TaskCardState {
  selected: boolean;
  expanded: boolean;
  details: {
    lecture?: {
      sessions: LectureSession[];
      allSelected: boolean;
    };
    activity?: {
      activities: ActivityType[];
      allSelected: boolean;
    };
    ai_chat?: {
      enabled: boolean;
    };
    library?: {
      book_ids: string[];
      books: LibraryBookListItem[];
      totalTime: number;
    };
  };
}
