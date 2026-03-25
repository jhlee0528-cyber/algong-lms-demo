/**
 * 영어도서관 관련 타입 정의
 */

export type BookCategory = 'fiction' | 'non-fiction' | 'phonics';

export type BookLevel = 1 | 2 | 3 | 4 | 5;

export interface LibraryBook {
  book_id: string;
  title: string;
  author?: string | null;
  level: BookLevel;
  category: BookCategory | null;
  description?: string | null;
  estimated_time: number | null; // 분 단위
  cover_image_url: string | null;
  content_url: string | null;
  quiz_id: string | null;
  unit_relation: number[] | null; // 연계 단원 번호 목록
  created_at: string;
  updated_at: string;
}

export interface LibraryBookListItem {
  book_id: string;
  title: string;
  level: BookLevel;
  category: BookCategory | null;
  estimated_time: number | null;
  cover_image_url: string | null;
}

export interface LibraryBookFilter {
  level?: BookLevel;
  category?: BookCategory;
  search?: string; // 도서명 또는 키워드 검색
  page?: number;
  limit?: number;
}

export interface LibraryBookListResponse {
  books: LibraryBookListItem[];
  total: number;
  page: number;
  limit: number;
}
