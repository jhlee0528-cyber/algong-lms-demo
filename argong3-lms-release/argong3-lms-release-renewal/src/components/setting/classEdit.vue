<template>
  <div class="container">
    <div>
      <h4 class="headline">담당 학급 수정</h4>
      <span class="subtitle">담당 학급 정보를 수정할 수 있습니다.</span>
    </div>

    <!-- 삭제 확인 모달 -->
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
        <h4 class="delete-title">학급 삭제</h4>
        <p class="delete-desc">
          <strong>{{ deleteTarget.grade }}학년 {{ deleteTarget.classNum }}반</strong>을 담당 학급에서 삭제하시겠습니까?<br />
          이 작업은 되돌릴 수 없습니다.
        </p>
        <hr class="delete-divider" />
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">취소</button>
          <button class="delete-confirm-btn" @click="confirmDelete">삭제</button>
        </div>
      </div>
    </div>

    <!-- 추가 모달 -->
    <div v-if="addModal" class="modal-backdrop" @click.self="closeAddModal">
      <div class="modal-box">
        <div class="modal-header">
          <h4 class="modal-title">학급 추가</h4>
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
              <input v-model="addForm.classNum" class="modal-input" type="number" min="1" @input="clampMin" />
            </div>
          </div>
          <div class="field full">
            <label>출판사</label>
            <select v-model="addForm.publisher" class="modal-select">
              <option value="">선택</option>
              <option v-for="(label, code) in PUBLISHER_MAP" :key="code" :value="code">{{ label }}</option>
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

    <!-- 현재 담당 학급 -->
    <div class="section">
      <div class="section-header">
        <h5 class="section-title">현재 담당 학급</h5>
        <button class="add-btn" @click="openAddModal">+ 학급 추가</button>
      </div>
      <div class="table-wrap">
        <table class="table-style">
          <thead>
            <tr>
              <th>학년</th>
              <th>반</th>
              <th>출판사</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td>{{ row.grade }}학년</td>
              <td>{{ row.classNum }}반</td>
              <td>{{ publisherLabel(row.publisher) }}</td>
              <td>
                <button class="delete-btn" @click="openDeleteModal(row)">삭제</button>
              </td>
            </tr>
            <tr v-if="rows.length === 0">
              <td colspan="4" class="empty-msg">담당 학급 정보가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { classlist } from '../../api/api-list';
import { addAssignClass, deleteAssignClass } from '../../api/api-list-2';

const PUBLISHER_MAP = {
  CJ: '천재(함순애)', CJL: '천재(이동환)', CJK: '천재(김태은)',
  DA: '동아', VS: '비상', MN: '미래엔',
  YBMC: 'YBM(최희경)', YBMK: 'YBM(김혜리)', IC: '아이스크림',
};

export default {
  async created() {
    await this.fetchClassList();
  },
  data() {
    return {
      PUBLISHER_MAP,
      classList: [[], [], [], []],
      publisherList: [[], [], [], []],
      addModal: false,
      addForm: { grade: '', classNum: '', publisher: '' },
      deleteModal: false,
      deleteTarget: { grade: null, classNum: null },
    };
  },
  computed: {
    rows() {
      const result = [];
      for (let gi = 0; gi < 4; gi++) {
        const gradeClasses = this.classList[gi] || [];
        for (let ci = 0; ci < gradeClasses.length; ci++) {
          result.push({
            grade: gi + 3,
            classNum: gradeClasses[ci],
            publisher: (this.publisherList[gi] || [])[ci] || '',
          });
        }
      }
      return result;
    },
    isAddFormValid() {
      const f = this.addForm;
      return f.grade !== '' && f.classNum !== '' && Number(f.classNum) >= 1 && f.publisher !== '';
    },
  },
  methods: {
    async fetchClassList() {
      try {
        const res = await classlist();
        const data = res?.data?.data;
        if (data) {
          this.classList = data.classList;
          this.publisherList = data.publisherList;
        }
      } catch (e) {
        console.error('담당 학급 조회 실패', e);
      }
    },
    publisherLabel(code) {
      if (!code) return '-';
      return PUBLISHER_MAP[code.toUpperCase()] || code;
    },
    clampMin() {
      const val = Number(this.addForm.classNum);
      if (val < 1 || isNaN(val)) this.addForm.classNum = 1;
    },
    openAddModal() {
      this.addForm = { grade: '', classNum: '', publisher: '' };
      this.addModal = true;
    },
    closeAddModal() {
      this.addModal = false;
    },
    async saveAdd() {
      const body = {
        grade: Number(this.addForm.grade),
        classNum: Number(this.addForm.classNum),
        publisher: this.addForm.publisher,
      };
      try {
        await addAssignClass(body);
        await this.fetchClassList();
      } catch (e) {
        console.error('학급 추가 실패', e);
      }
      this.closeAddModal();
    },
    openDeleteModal(row) {
      this.deleteTarget = { grade: row.grade, classNum: row.classNum };
      this.deleteModal = true;
    },
    closeDeleteModal() {
      this.deleteModal = false;
      this.deleteTarget = { grade: null, classNum: null };
    },
    async confirmDelete() {
      const body = {
        grade: this.deleteTarget.grade,
        classNum: this.deleteTarget.classNum,
      };
      try {
        await deleteAssignClass(body);
        await this.fetchClassList();
      } catch (e) {
        console.error('학급 삭제 실패', e);
      }
      this.closeDeleteModal();
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

.section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-family: notosans;
  font-size: 16px;
  color: #1a1a1a;
}

.add-btn {
  height: 40px;
  padding: 0 20px;
  background: #d6eaff;
  color: #3d90ef;
  border-radius: 10px;
  font-size: 14px;
  font-family: notosans;
  white-space: nowrap;
  cursor: pointer;
  border: none;
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

.save-btn-disabled {
  background: #b0c9e8;
  cursor: not-allowed;
}

.save-btn-disabled:hover {
  background: #b0c9e8;
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
</style>
