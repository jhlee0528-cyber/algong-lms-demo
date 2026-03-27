<template>
  <div class="container">
    <!-- Header -->
    <div>
      <h4 class="headline">학생 정보 수정</h4>
      <span class="subtitle">학급, 번호, 이름, 교과서 등 학생 정보를 수정할 수 있습니다.</span>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-label">전체 학생</p>
        <h2 class="stat-value">{{ totalStudents }}</h2>
        <p class="stat-desc">등록된 학생 수</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">학급 수</p>
        <h2 class="stat-value">{{ totalClasses }}</h2>
        <p class="stat-desc">활성 학급</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">교과서 종류</p>
        <h2 class="stat-value">{{ totalBooks }}</h2>
        <p class="stat-desc">사용 중인 교과서</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">최근 업데이트</p>
        <h2 class="stat-value date">{{ lastUpdate }}</h2>
        <p class="stat-desc">마지막 수정일</p>
      </div>
    </div>

    <!-- Search + Filters -->
    <div class="filter-row">
      <div class="search-wrap">
        <span class="search-icon">&#128269;</span>
        <input :value="search" @input="search = $event.target.value" class="search-input" placeholder="이름 또는 번호로 검색" />
      </div>
      <div class="filter-divider"></div>
      <select v-model="filterGrade" class="filter-select">
        <option value="">전체 학년</option>
        <option v-for="g in grades" :key="g" :value="g">{{ g }}학년</option>
      </select>
      <select v-model="filterClass" class="filter-select">
        <option value="">전체 반</option>
        <option v-for="c in classes" :key="c" :value="c">{{ c }}반</option>
      </select>
      <select v-model="filterBook" class="filter-select">
        <option value="">전체 교과서</option>
        <option v-for="b in books" :key="b" :value="b">{{ b }}</option>
      </select>
      <button class="add-btn" @click="openAdd">학생 추가</button>
    </div>

    <!-- Delete Modal -->
    <div v-if="deleteModal" class="modal-backdrop" @click.self="closeDeleteModal">
      <div class="modal-box delete-modal-box">
        <div class="delete-icon-wrap">
          <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e05555" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <h4 class="delete-title">학생 삭제</h4>
        <p class="delete-desc">
          <strong>{{ deleteTargetName }}</strong> 학생을 삭제하시겠습니까?<br />
          이 작업은 되돌릴 수 없습니다.
        </p>
        <hr class="delete-divider" />
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">취소</button>
          <button class="delete-confirm-btn" @click="confirmDelete">삭제</button>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div v-if="addModal" class="modal-backdrop" @click.self="closeAddModal">
      <div class="modal-box">
        <div class="modal-header">
          <h4 class="modal-title">학생 추가</h4>
          <button class="modal-close" @click="closeAddModal">&#10005;</button>
        </div>
        <div class="modal-body">
          <div class="field-row">
            <div class="field">
              <label>학년</label>
              <select v-model="addForm.grade" class="modal-select">
                <option value="">선택</option>
                <option v-for="g in [3, 4, 5, 6]" :key="g" :value="g">{{ g }}학년</option>
              </select>
            </div>
            <div class="field">
              <label>반</label>
              <input v-model="addForm.classNum" class="modal-input" type="number" min="1" @input="clampAddMin('classNum')" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>번호</label>
              <input v-model="addForm.num" class="modal-input" type="number" min="1" @input="clampAddMin('num')" />
            </div>
            <div class="field">
              <label>이름</label>
              <input v-model="addForm.name" class="modal-input" type="text" />
            </div>
          </div>
          <div class="field full">
            <label>교과서</label>
            <select v-model="addForm.publisher" class="modal-select">
              <option value="">선택</option>
              <option v-for="b in books" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeAddModal">취소</button>
          <button
            class="save-btn"
            :class="{ 'save-btn-disabled': !isAddFormValid }"
            :disabled="!isAddFormValid"
            @click="saveAdd"
          >저장</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-box">
        <div class="modal-header">
          <h4 class="modal-title">학생 정보 수정</h4>
          <button class="modal-close" @click="closeModal">&#10005;</button>
        </div>
        <div class="modal-body">
          <div class="field-row">
            <div class="field">
              <label>학년</label>
              <select v-model="editForm.grade" class="modal-select">
                <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
              </select>
            </div>
            <div class="field">
              <label>반</label>
              <input v-model="editForm.classNum" class="modal-input" type="number" min="1" @input="clampMin('classNum')" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>번호</label>
              <input v-model="editForm.num" class="modal-input" type="number" min="1" @input="clampMin('num')" />
            </div>
            <div class="field">
              <label>이름</label>
              <input v-model="editForm.name" class="modal-input modal-input-readonly" type="text" readonly />
            </div>
          </div>
          <div class="field full">
            <label>교과서</label>
            <select v-model="editForm.publisher" class="modal-select">
              <option value="">선택</option>
              <option v-for="b in books" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">취소</button>
          <button class="save-btn" @click="saveEdit">저장</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="table-style">
        <thead>
          <tr>
            <th>학년</th>
            <th>반</th>
            <th>번호</th>
            <th>이름</th>
            <th>교과서</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in pagedStudents" :key="s._id || i">
            <td>{{ s.grade }}학년</td>
            <td>{{ s.classNum }}반</td>
            <td>{{ String(s.num).padStart(2, '0') }}번</td>
            <td class="name-bold">{{ s.name }}</td>
            <td>{{ s.publisher }}</td>
            <td>
              <div class="btn-group">
                <button class="edit-btn" @click="openEdit(s, i)">수정</button>
                <button class="delete-btn" @click="openDelete(s, i)">삭제</button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredStudents.length === 0">
            <td colspan="6" class="empty-msg">검색 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="currentPage = 1">&#171;</button>
      <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">&#8249;</button>
      <button
        v-for="p in pageRange"
        :key="p"
        class="page-btn"
        :class="{ 'page-btn-active': p === currentPage }"
        @click="currentPage = p"
      >{{ p }}</button>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">&#8250;</button>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages">&#187;</button>
    </div>
  </div>
</template>

<script>
import { getAiepSchool, getAiepStudents, updateAiepStudent, deleteAiepStudent, createAiepStudent } from '../../api/api-list-2';
import { schoolinfo } from '../../api/api-list-2';

const PUBLISHER_MAP = {
  CJ: '천재(함순애)', CJL: '천재(이동환)', CJK: '천재(김태은)',
  DA: '동아', VS: '비상', MN: '미래엔',
  YBMC: 'YBM(최희경)', YBMK: 'YBM(김혜리)', IC: '아이스크림',
};

const PUBLISHER_REVERSE_MAP = Object.fromEntries(
  Object.entries(PUBLISHER_MAP).map(([code, name]) => [name, code])
);

export default {
  async created() {
    try {
      const [schoolRes, studentsRes, schoolinfoRes] = await Promise.all([
        getAiepSchool(),
        getAiepStudents(),
        schoolinfo(),
      ]);

      if (schoolinfoRes?.data?.data) {
        this.schoolCode = schoolinfoRes.data.data.schoolCode;
      }

      if (schoolRes?.data?.result) {
        const d = schoolRes.data.data;
        this.totalStudents = d.totalStudents;
        this.totalClasses  = d.totalClasses;
        this.totalBooks    = d.totalPublishers;
        this.lastUpdate    = d.lastAiepStudentUpdate;
      }

      if (studentsRes?.data?.result) {
        this.students = studentsRes.data.data.map((s) => ({
          _id: s._id,
          id: s.id,
          grade: s.grade,
          classNum: s.classNum,
          num: s.attendanceNumber,
          name: s.name,
          publisher: PUBLISHER_MAP[s.publisher] || s.publisher,
        }));
      }
    } catch (e) {
      console.error('학생 정보 수정 로드 실패', e);
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      search: '',
      filterGrade: '',
      filterClass: '',
      filterBook: '',
      totalStudents: 0,
      totalClasses: 0,
      totalBooks: 0,
      lastUpdate: '-',
      books: ['천재(함순애)', '천재(이동환)', '천재(김태은)', '동아', '비상', '미래엔', 'YBM(최희경)', 'YBM(김혜리)', '아이스크림'],
      deleteModal: false,
      deleteTargetId: null,
      deleteTargetName: '',
      addModal: false,
      addForm: { grade: '', classNum: '', num: '', name: '', publisher: '' },
      editModal: false,
      editTargetIdx: null,
      editForm: { id: '', grade: '', classNum: '', num: '', name: '', publisher: '' },
      students: [],
      schoolCode: '',
    };
  },
  methods: {
    openEdit(student, idx) {
      this.editTargetIdx = idx;
      this.editForm = { ...student };
      this.editModal = true;
    },
    closeModal() {
      this.editModal = false;
      this.editTargetIdx = null;
    },
    openDelete(student) {
      this.deleteTargetId = student.id;
      this.deleteTargetName = student.name;
      this.deleteModal = true;
    },
    closeDeleteModal() {
      this.deleteModal = false;
      this.deleteTargetId = null;
      this.deleteTargetName = '';
    },
    async confirmDelete() {
      try {
        const res = await deleteAiepStudent(this.deleteTargetId);
        if (res?.data?.result) {
          const idx = this.students.findIndex((s) => s.id === this.deleteTargetId);
          if (idx !== -1) {
            this.students.splice(idx, 1);
            this.totalStudents = this.students.length;
          }
        }
      } catch (e) {
        console.error('학생 삭제 실패', e);
      }
      this.closeDeleteModal();
    },
    openAdd() {
      this.addForm = { grade: '', classNum: '', num: '', name: '', publisher: '' };
      this.addModal = true;
    },
    closeAddModal() {
      this.addModal = false;
    },
    clampAddMin(field) {
      const val = Number(this.addForm[field]);
      if (val < 1 || isNaN(val)) this.addForm[field] = 1;
    },
    async saveAdd() {
      const f = this.addForm;
      const body = {
        name: f.name,
        grade: Number(f.grade),
        classNum: Number(f.classNum),
        attendanceNumber: Number(f.num),
        publisher: PUBLISHER_REVERSE_MAP[f.publisher] || f.publisher,
        schoolCode: this.schoolCode,
      };
      try {
        await createAiepStudent(body);
        const studentsRes = await getAiepStudents();
        if (studentsRes?.data?.result) {
          this.students = studentsRes.data.data.map((s) => ({
            _id: s._id,
            id: s.id,
            grade: s.grade,
            classNum: s.classNum,
            num: s.attendanceNumber,
            name: s.name,
            publisher: PUBLISHER_MAP[s.publisher] || s.publisher,
          }));
          this.totalStudents = this.students.length;
        }
      } catch (e) {
        console.error('학생 추가 실패', e);
      }
      this.closeAddModal();
    },
    clampMin(field) {
      const val = Number(this.editForm[field]);
      if (val < 1 || isNaN(val)) this.editForm[field] = 1;
    },
    async saveEdit() {
      const f = this.editForm;
      const body = {
        id: f.id,
        name: f.name,
        grade: Number(f.grade),
        classNum: Number(f.classNum),
        attendanceNumber: Number(f.num),
        publisher: PUBLISHER_REVERSE_MAP[f.publisher] || f.publisher,
      };
      try {
        const res = await updateAiepStudent(body);
        if (res?.data?.result) {
          const idx = this.students.findIndex((s) => s.id === f.id);
          if (idx !== -1) this.students.splice(idx, 1, { ...this.students[idx], ...f });
        }
      } catch (e) {
        console.error('학생 정보 수정 실패', e);
      }
      this.closeModal();
    },
  },
  watch: {
    search() { this.currentPage = 1; },
    filterGrade() { this.currentPage = 1; },
    filterClass() { this.currentPage = 1; },
    filterBook() { this.currentPage = 1; },
  },
  computed: {
    grades() {
      return [...new Set(this.students.map((s) => s.grade))].sort((a, b) => a - b);
    },
    classes() {
      return [...new Set(this.students.map((s) => s.classNum))].sort((a, b) => a - b);
    },
    totalPages() {
      return Math.ceil(this.filteredStudents.length / this.pageSize);
    },
    pagedStudents() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredStudents.slice(start, start + this.pageSize);
    },
    pageRange() {
      const total = this.totalPages;
      const size = 5;
      let start = Math.max(1, Math.min(this.currentPage - 2, total - size + 1));
      const end = Math.min(total, start + size - 1);
      const range = [];
      for (let i = start; i <= end; i++) range.push(i);
      return range;
    },
    isAddFormValid() {
      const f = this.addForm;
      return f.grade !== '' && f.classNum !== '' && f.num !== '' && f.name.trim() !== '' && f.publisher !== '';
    },
    filteredStudents() {
      return this.students.filter((s) => {
        const matchSearch =
          !this.search ||
          s.name.includes(this.search) ||
          String(s.num).includes(this.search);
        const matchGrade = !this.filterGrade || s.grade === Number(this.filterGrade);
        const matchClass = !this.filterClass || s.classNum === Number(this.filterClass);
        const matchBook = !this.filterBook || s.publisher === this.filterBook;
        return matchSearch && matchGrade && matchClass && matchBook;
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1017px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.subtitle {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: #888;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.stat-label {
  font-size: 13px;
  color: #888;
}

.stat-value {
  font-size: 36px;
  font-family: notosans;
  color: #1a1a1a;
  line-height: 1.1;
}

.stat-value.date {
  font-size: 26px;
}

.stat-desc {
  font-size: 12px;
  color: #aaa;
}

/* Filters */
.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.filter-divider {
  width: 80px;
  flex-shrink: 0;
}

.search-wrap {
  position: relative;
  width: 220px;
  flex-shrink: 0;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #aaa;
  pointer-events: none;
  line-height: 1;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 36px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  font-family: notosansregular;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333;
}

.search-input:focus {
  border-color: #3d90ef;
}

.filter-select {
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  cursor: pointer;
  outline: none;
  font-family: notosansregular;
}

.add-btn {
  height: 48px;
  padding: 0 28px;
  background: #d6eaff;
  color: #3d90ef;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosans;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  flex-shrink: 0;
}

.add-btn:hover {
  background: #c0ddff;
}

/* Table */
.table-wrap {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #cae3ff;
}

.table-style {
  width: 100%;
  border-spacing: 0;
  text-align: center;
}

.table-style thead {
  background-color: #f1f8ff;
}

.table-style th {
  padding: 14px 12px;
  font-size: 14px;
  color: #66686b;
  font-family: notosans;
}

.table-style td {
  padding: 16px 12px;
  font-size: 14px;
  color: #292929;
  border-bottom: 1px solid #cae3ff;
  font-family: notosansregular;
}

.table-style tr:last-child td {
  border-bottom: none;
}

.name-bold {
  font-family: notosans;
  font-weight: 600;
}

.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.edit-btn {
  padding: 6px 18px;
  background: #e8f7ed;
  color: #2d9e56;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-family: notosans;
  cursor: pointer;
}

.edit-btn:hover {
  background: #d4f0dc;
}

.delete-btn {
  padding: 6px 18px;
  background: #fff0e8;
  color: #e07a3a;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-family: notosans;
  cursor: pointer;
}

.delete-btn:hover {
  background: #fde3d0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-family: notosansregular;
  color: #555;
  cursor: pointer;
}

.page-btn:hover:not(:disabled) {
  border-color: #3d90ef;
  color: #3d90ef;
}

.page-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-btn-active {
  background: #3d90ef;
  border-color: #3d90ef;
  color: #fff;
  font-family: notosans;
}

.page-btn-active:hover {
  background: #3d90ef !important;
  color: #fff !important;
}

.empty-msg {
  padding: 40px;
  color: #aaa;
  font-size: 14px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-box {
  background: #fff;
  border-radius: 16px;
  padding: 32px 36px;
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-family: notosans;
  font-size: 20px;
  color: #1a1a1a;
}

.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  line-height: 1;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-row {
  display: flex;
  gap: 16px;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.full {
  width: 100%;
}

.field label {
  font-size: 13px;
  color: #666;
  font-family: notosansregular;
}

.modal-input,
.modal-select {
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosansregular;
  outline: none;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.modal-input:focus,
.modal-select:focus {
  border-color: #3d90ef;
}

.modal-input-readonly {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  height: 44px;
  padding: 0 24px;
  border: 1px solid #3d90ef;
  background: #fff;
  color: #3d90ef;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosans;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #f0f7ff;
}

.save-btn {
  height: 44px;
  padding: 0 24px;
  background: #3d90ef;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosans;
  cursor: pointer;
}

.save-btn:hover {
  background: #2f7dd4;
}

/* Delete Modal */
.delete-modal-box {
  width: 360px;
  text-align: center;
  gap: 16px;
}

.delete-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #fde8e8;
  border-radius: 50%;
  margin: 0 auto;
}

.delete-icon {
  width: 32px;
  height: 32px;
}

.delete-title {
  font-family: notosans;
  font-size: 20px;
  color: #1a1a1a;
}

.delete-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  font-family: notosansregular;
}

.delete-divider {
  border: none;
  border-top: 1px solid #efefef;
  margin: 4px 0;
}

.delete-confirm-btn {
  height: 44px;
  padding: 0 24px;
  background: #f76b6b;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosans;
  cursor: pointer;
}

.delete-confirm-btn:hover {
  background: #e05555;
}

.save-btn-disabled {
  background: #b0c9e8;
  cursor: not-allowed;
}

.save-btn-disabled:hover {
  background: #b0c9e8;
}
</style>
