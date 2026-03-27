<template>
  <div class="card">
    <p>{{ question }}</p>
    <div v-if="hasCategories" class="chip-container2">
      <template
        v-for="(category, categoryIndex) in options"
        :key="categoryIndex"
      >
        <div class="category-title">{{ category.title }}</div>
        <div class="flex-container">
          <div
            class="chip"
            v-for="(option, optionIndex) in category.options"
            :key="optionIndex"
          >
            <input
              type="checkbox"
              :id="`option-${questionIndex}-${categoryIndex}-${optionIndex}`"
              :value="option"
              v-model="selectedValue"
              @change="handleChange(option)"
            />
            <label
              :for="`option-${questionIndex}-${categoryIndex}-${optionIndex}`"
              >{{ option }}</label
            >
          </div>
        </div>
        <textarea
          v-if="
            category.title === '온라인 커뮤니티/카페' &&
            (selectedValue.includes('교직원 카페') || teacherCafeTextValue)
          "
          v-model="teacherCafeTextValue"
          placeholder="교직원 카페명을 입력해주세요."
          class="community-input"
          maxlength="255"
        />
        <textarea
          v-if="
            category.title === '온라인 커뮤니티/카페' &&
            (selectedValue.includes('교사 커뮤니티') || teacherCommunityTextValue)
          "
          v-model="teacherCommunityTextValue"
          placeholder="교사 커뮤니티명을 입력해주세요."
          class="community-input"
          maxlength="255"
        />
      </template>
    </div>

    <div v-else class="chip-container">
      <div class="chip" v-for="(option, index) in options" :key="index">
        <input
        :type="isSingleChoice ? 'radio' : 'checkbox'"
        :id="`option-${questionIndex}-${index}`"
        :value="option"
        v-model="selectedValue"
        :name="isSingleChoice ? `question-${questionIndex}` : undefined"
        @change="handleChange(option)"
      />
        <label :for="`option-${questionIndex}-${index}`">{{ option }}</label>
      </div>
    </div>
    <textarea
      v-if="isOtherChecked"
      v-model="otherTextValue"
      placeholder="기타 내용을 입력해주세요."
      class="input"
      maxlength="255"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    options: Array,
    questionIndex: Number,
    selectedRoles: {
      type: Array,
      required: true,
    },
    isOtherChecked: Boolean,
    otherText: String,
    teacherCafeText: {
      type: String,
      default: "",
    },
    teacherCommunityText: {
      type: String,
      default: "",
    },
    isTeacherCafeChecked: {
      type: Boolean,
      default: false,
    },
    isTeacherCommunityChecked: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:selectedRoles",
    "update:isOtherChecked",
    "update:otherText",
    "update:teacherCafeText",
    "update:teacherCommunityText",
    "update:isTeacherCafeChecked",
    "update:isTeacherCommunityChecked",
  ],
  computed: {
    hasCategories() {
      return (
        Array.isArray(this.options) &&
        this.options.length > 0 &&
        typeof this.options[0] === "object" &&
        this.options[0] !== null &&
        "title" in this.options[0]
      );
    },
    isSingleChoice() {
      return this.questionIndex === 2;
    },
    selectedValue: {
      get() {
        if (this.isSingleChoice) {
          return this.selectedRoles.length > 0 ? this.selectedRoles[0] : '';
        }
        return this.selectedRoles;
      },
      set(value) {
        if (this.isSingleChoice) {
          this.$emit('update:selectedRoles', [value]);
        } else {
          this.$emit('update:selectedRoles', value);
        }
      }
    },
    otherTextValue: {
      get() {
        return this.otherText;
      },
      set(value) {
        this.$emit("update:otherText", value);
      },
    },
    teacherCafeTextValue: {
      get() {
        return this.teacherCafeText;
      },
      set(value) {
        this.$emit("update:teacherCafeText", value);
      },
    },
    teacherCommunityTextValue: {
      get() {
        return this.teacherCommunityText;
      },
      set(value) {
        this.$emit("update:teacherCommunityText", value);
      },
    },
  },

  methods: {
    handleChange(option) {
      if (option === "기타 (주관식)") {
        this.$emit("update:isOtherChecked", this.selectedValue.includes("기타 (주관식)"));
        if (!this.selectedValue.includes("기타 (주관식)")) {
          this.$emit("update:otherText", "");
        }
      }

      if (option === "교직원 카페") {
        this.$emit("update:isTeacherCafeChecked", this.selectedValue.includes("교직원 카페"));
        if (!this.selectedValue.includes("교직원 카페")) {
          this.$emit("update:teacherCafeText", "");
        }
      }

      if (option === "교사 커뮤니티") {
        this.$emit("update:isTeacherCommunityChecked", this.selectedValue.includes("교사 커뮤니티"));
        if (!this.selectedValue.includes("교사 커뮤니티")) {
          this.$emit("update:teacherCommunityText", "");
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  height: auto;
  padding: 25px 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.card p {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
}
.chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: auto;
}
.chip-container2 {
  .category-title {
    font-size: 12px;
    color: #5676b1;
    margin: 10px 0;
  }
  .flex-container {
    display: flex;
    gap: 10px;
    width: auto;
  }
}
.chip {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}
.chip input,
.chip label {
  width: 100%;
  padding: 0 30px;
  display: block;
}
textarea {
  width: 100%;
  margin-top: 15px;
  border: 1px solid #9bbeff;
  padding: 15px;
  font-size: 14px;
  border-radius: 16px;
  resize: none;
}
textarea:focus {
  outline: none;
  border: 2px solid #9bbeff;
}
input[type="checkbox"],
input[type="radio"] {
  display: none;
}
input[type="textarea"] {
  border: none;
  border: solid 1px #f5f5f5;
}
input[type="radio"] + label,
input[type="checkbox"] + label {
  -webkit-transition: all 500ms ease;
  transition: all 500ms ease;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  background: #fff;
  color: #474747;
  border: 1px solid #9bbeff;
  padding: 5px 20px;
  white-space: nowrap;
  display: inline-block;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label {
  -webkit-transition: all 500ms ease;
  transition: all 500ms ease;
  background-color: #9bbeff;
  color: white;
  border-color: #9bbeff;
}
.community-input {
  width: 230px;
  height: 60px;
  margin-right: 10px;
}
.input {
  width: 100%;
  height: 80px;
  margin-right: 10px;
}
</style>
