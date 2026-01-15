/**
 * 영어도서관 관련 API 엔드포인트
 */

import apiClient from './client';
import type {
  GetLibraryBooksRequest,
  GetLibraryBooksResponse,
  GetLibraryBookRequest,
  CreateLibraryProgressRequest,
  CreateLibraryProgressResponse,
  LibraryBook,
} from '../types';

/**
 * 도서 목록 조회
 */
export async function getLibraryBooks(
  params?: GetLibraryBooksRequest
): Promise<GetLibraryBooksResponse> {
  try {
    const response = await apiClient.get<GetLibraryBooksResponse>(
      '/library/books',
      { params }
    );
    return response.data;
  } catch (error) {
    // API 호출 실패 시 더미 데이터 반환
    console.warn('도서 목록 API 호출 실패, 더미 데이터 사용:', error);
    return generateDummyLibraryBooks(params);
  }
}

/**
 * 더미 도서 데이터 생성
 */
function generateDummyLibraryBooks(
  params?: GetLibraryBooksRequest
): GetLibraryBooksResponse {
  const dummyBooks = [
    {
      book_id: 'book_001',
      title: 'The Cat in the Hat',
      author: 'Dr. Seuss',
      level: 1,
      category: 'fiction',
      estimated_time: 15,
      cover_image_url: null,
    },
    {
      book_id: 'book_002',
      title: 'Green Eggs and Ham',
      author: 'Dr. Seuss',
      level: 1,
      category: 'fiction',
      estimated_time: 12,
      cover_image_url: null,
    },
    {
      book_id: 'book_003',
      title: 'The Very Hungry Caterpillar',
      author: 'Eric Carle',
      level: 1,
      category: 'fiction',
      estimated_time: 10,
      cover_image_url: null,
    },
    {
      book_id: 'book_004',
      title: 'Where the Wild Things Are',
      author: 'Maurice Sendak',
      level: 2,
      category: 'fiction',
      estimated_time: 18,
      cover_image_url: null,
    },
    {
      book_id: 'book_005',
      title: 'Goodnight Moon',
      author: 'Margaret Wise Brown',
      level: 1,
      category: 'fiction',
      estimated_time: 8,
      cover_image_url: null,
    },
    {
      book_id: 'book_006',
      title: 'The Giving Tree',
      author: 'Shel Silverstein',
      level: 2,
      category: 'fiction',
      estimated_time: 20,
      cover_image_url: null,
    },
    {
      book_id: 'book_007',
      title: 'Brown Bear, Brown Bear, What Do You See?',
      author: 'Bill Martin Jr.',
      level: 1,
      category: 'fiction',
      estimated_time: 10,
      cover_image_url: null,
    },
    {
      book_id: 'book_008',
      title: 'Chicka Chicka Boom Boom',
      author: 'Bill Martin Jr.',
      level: 1,
      category: 'phonics',
      estimated_time: 12,
      cover_image_url: null,
    },
    {
      book_id: 'book_009',
      title: 'The Snowy Day',
      author: 'Ezra Jack Keats',
      level: 2,
      category: 'fiction',
      estimated_time: 15,
      cover_image_url: null,
    },
    {
      book_id: 'book_010',
      title: 'The Little Engine That Could',
      author: 'Watty Piper',
      level: 2,
      category: 'fiction',
      estimated_time: 18,
      cover_image_url: null,
    },
    {
      book_id: 'book_011',
      title: 'If You Give a Mouse a Cookie',
      author: 'Laura Numeroff',
      level: 2,
      category: 'fiction',
      estimated_time: 15,
      cover_image_url: null,
    },
    {
      book_id: 'book_012',
      title: 'The Rainbow Fish',
      author: 'Marcus Pfister',
      level: 2,
      category: 'fiction',
      estimated_time: 16,
      cover_image_url: null,
    },
    {
      book_id: 'book_013',
      title: 'Corduroy',
      author: 'Don Freeman',
      level: 2,
      category: 'fiction',
      estimated_time: 17,
      cover_image_url: null,
    },
    {
      book_id: 'book_014',
      title: 'The Tale of Peter Rabbit',
      author: 'Beatrix Potter',
      level: 3,
      category: 'fiction',
      estimated_time: 20,
      cover_image_url: null,
    },
    {
      book_id: 'book_015',
      title: 'Madeline',
      author: 'Ludwig Bemelmans',
      level: 3,
      category: 'fiction',
      estimated_time: 18,
      cover_image_url: null,
    },
    {
      book_id: 'book_016',
      title: 'Curious George',
      author: 'H.A. Rey',
      level: 2,
      category: 'fiction',
      estimated_time: 15,
      cover_image_url: null,
    },
    {
      book_id: 'book_017',
      title: 'The Story of Ferdinand',
      author: 'Munro Leaf',
      level: 3,
      category: 'fiction',
      estimated_time: 19,
      cover_image_url: null,
    },
    {
      book_id: 'book_018',
      title: 'Make Way for Ducklings',
      author: 'Robert McCloskey',
      level: 3,
      category: 'non-fiction',
      estimated_time: 22,
      cover_image_url: null,
    },
    {
      book_id: 'book_019',
      title: 'The Polar Express',
      author: 'Chris Van Allsburg',
      level: 4,
      category: 'fiction',
      estimated_time: 25,
      cover_image_url: null,
    },
    {
      book_id: 'book_020',
      title: 'Where the Sidewalk Ends',
      author: 'Shel Silverstein',
      level: 4,
      category: 'fiction',
      estimated_time: 30,
      cover_image_url: null,
    },
  ];

  // 필터링 적용
  let filteredBooks = [...dummyBooks];

  // 레벨 필터
  if (params?.level) {
    filteredBooks = filteredBooks.filter((book) => book.level === params.level);
  }

  // 카테고리 필터
  if (params?.category) {
    filteredBooks = filteredBooks.filter((book) => book.category === params.category);
  }

  // 검색어 필터
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
    );
  }

  // 페이지네이션
  const page = params?.page || 1;
  const limit = params?.limit || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return {
    books: paginatedBooks,
    total: filteredBooks.length,
    page,
    limit,
  };
}

/**
 * 도서 상세 조회
 */
export async function getLibraryBook(
  params: GetLibraryBookRequest
): Promise<LibraryBook> {
  const response = await apiClient.get<LibraryBook>(
    `/library/books/${params.book_id}`
  );
  return response.data;
}

/**
 * 도서 읽기 진행도 기록
 */
export async function createLibraryProgress(
  data: CreateLibraryProgressRequest
): Promise<CreateLibraryProgressResponse> {
  const response = await apiClient.post<CreateLibraryProgressResponse>(
    '/library/progress',
    data
  );
  return response.data;
}

/**
 * 학생의 도서 읽기 이력 조회
 */
export async function getStudentLibraryProgress(
  studentId: number,
  params?: {
    start_date?: string;
    end_date?: string;
    completed?: boolean;
  }
): Promise<LibraryBook[]> {
  const response = await apiClient.get<LibraryBook[]>(
    `/library/students/${studentId}/progress`,
    { params }
  );
  return response.data;
}
