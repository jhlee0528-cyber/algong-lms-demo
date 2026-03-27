<template>
  <div class="flex-column-gap">
    <p style="margin-left: 10px">
      수준별 학습을 바탕으로
      <span class="bold-text">추가 맞춤 학습</span>을 진행합니다. 학생
      화면에서는 단계입니다
      <span class="bold-text">‘매스헌터’ > ‘업그레이드’</span> 단계입니다.
    </p>

    <WrapContent style="width: 880px; padding: 24px 30px">
      <div style="display: flex; flex-direction: column; gap: 25px">
        <h4 class="headline2">맞춤 학습 현황</h4>
        <div class="grid-container">
          <div class="bg-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M4.572 24.488H12.572M20 11.6093H28M20 5.756H28M4 8.68267H8.572M8.572 8.68267H13.1427M8.572 8.68267V4M8.572 8.68267V13.3653M20.8 28L24.0333 24.688M24.0333 24.688L27.2653 21.3773M24.0333 24.688L20.8 21.3773M24.0333 24.688L27.2653 28"
                  stroke="#3D90EF"
                  stroke-width="2.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h5 class="blue-text">{{ questionClearCount }}</h5>
            <p>총 문제풀이</p>
          </div>
          <div class="bg-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M26 11.3333V24C26 24.5304 25.7893 25.0391 25.4142 25.4142C25.0391 25.7893 24.5304 26 24 26H4C3.46957 26 2.96086 25.7893 2.58579 25.4142C2.21071 25.0391 2 24.5304 2 24V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H18"
                  stroke="#04BB84"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.66797 11.3307L15.3346 16.6641L25.3346 2.66406"
                  stroke="#04BB84"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h5 class="green-text">
              {{ answerPercentageInfo.totalScore || 0 }}%
            </h5>
            <p>정답률</p>
          </div>
          <div class="bg-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="29"
                viewBox="0 0 26 29"
                fill="none"
              >
                <path
                  d="M15.9199 4.75476L17.8933 2.78143C18.1409 2.53369 18.4349 2.33717 18.7585 2.20309C19.0821 2.06901 19.429 2 19.7793 2C20.1296 2 20.4764 2.06901 20.8 2.20309C21.1236 2.33717 21.4176 2.53369 21.6653 2.78143L23.5506 4.66676C24.0505 5.16684 24.3314 5.84499 24.3314 6.5521C24.3314 7.2592 24.0505 7.93736 23.5506 8.43743L21.5773 10.4108M15.9199 4.75476L3.09861 17.5748C2.65592 18.0175 2.3831 18.6018 2.32794 19.2254L2.00528 22.8788C1.98795 23.073 2.01342 23.2686 2.07991 23.4519C2.1464 23.6352 2.25228 23.8017 2.39009 23.9396C2.5279 24.0776 2.69429 24.1836 2.87752 24.2503C3.06076 24.3169 3.25638 24.3426 3.45061 24.3254L7.10394 24.0028C7.72851 23.9482 8.31389 23.6754 8.75728 23.2321L21.5773 10.4108M15.9199 4.75476L21.5773 10.4108"
                  stroke="#FF5A83"
                  stroke-width="2.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.0285 16.5278C23.0129 15.9648 23.465 15.5 24.0282 15.5H24.9718C25.535 15.5 25.9871 15.9648 25.9715 16.5278L25.777 23.5278C25.762 24.069 25.3189 24.5 24.7774 24.5H24.2226C23.6811 24.5 23.238 24.069 23.223 23.5278L23.0285 16.5278Z"
                  fill="#FF5A83"
                />
                <rect
                  x="23"
                  y="26"
                  width="3"
                  height="3"
                  rx="1"
                  fill="#FF5A83"
                />
              </svg>
            </div>
            <h5 class="pink-text">{{ needReviewCount }}</h5>
            <p>복습 필요</p>
          </div>
          <div class="bg-card">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M15.9199 4.75476L17.8933 2.78143C18.1409 2.53369 18.4349 2.33717 18.7585 2.20309C19.0821 2.06901 19.429 2 19.7793 2C20.1296 2 20.4764 2.06901 20.8 2.20309C21.1236 2.33717 21.4176 2.53369 21.6653 2.78143L23.5506 4.66676C24.0505 5.16684 24.3314 5.84499 24.3314 6.5521C24.3314 7.2592 24.0505 7.93736 23.5506 8.43743L21.5773 10.4108M15.9199 4.75476L3.09861 17.5748C2.65592 18.0175 2.3831 18.6018 2.32794 19.2254L2.00528 22.8788C1.98795 23.073 2.01342 23.2686 2.07991 23.4519C2.1464 23.6352 2.25228 23.8017 2.39009 23.9396C2.5279 24.0776 2.69429 24.1836 2.87752 24.2503C3.06076 24.3169 3.25638 24.3426 3.45061 24.3254L7.10394 24.0028C7.72851 23.9482 8.31389 23.6754 8.75728 23.2321L21.5773 10.4108M15.9199 4.75476L21.5773 10.4108"
                  stroke="#9164FA"
                  stroke-width="2.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 23.5714L21 27L27 18"
                  stroke="#9164FA"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h5 class="purple-text">{{ reviewCount }}</h5>
            <p>복습 완료</p>
          </div>
        </div>

        <div class="card" style="gap: 0">
          <p class="card-title">레벨별 성취도</p>
          <canvas id="levelChart"></canvas>
        </div>
        <div style="display: flex; gap: 25px">
          <div class="card">
            <p class="card-title">난이도별 풀이 비율</p>
            <div
              style="
                display: flex;
                gap: 70px;
                align-items: center;
                justify-content: center;
              "
            >
              <canvas id="difficultyChart"></canvas>
              <ul class="canvas-legend">
                <li>상 ({{ difficultyData[0] || 0 }}%)</li>
                <li>중 ({{ difficultyData[1] || 0 }}%)</li>
                <li>하 ({{ difficultyData[2] || 0 }}%)</li>
              </ul>
            </div>
          </div>
          <div class="card">
            <p class="card-title">난이도별 성취도</p>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div>
                <div class="info">
                  <span>상</span>
                  <span>{{ answerPercentageInfo.topScore || 0 }}%</span>
                </div>
                <div
                  class="chart_blue-bg"
                  style="width: 328px; height: 12px; background: #eee"
                >
                  <div
                    class="chart_bar"
                    :style="{
                      width: `${answerPercentageInfo.topScore || 0}%`,
                    }"
                    style="background: #ff5a83"
                  ></div>
                </div>
              </div>
              <div>
                <div class="info">
                  <span>중</span>
                  <span>{{ answerPercentageInfo.midScore || 0 }}%</span>
                </div>
                <div
                  class="chart_blue-bg"
                  style="width: 328px; height: 12px; background: #eee"
                >
                  <div
                    class="chart_bar"
                    :style="{
                      width: `${answerPercentageInfo.midScore || 0}%`,
                    }"
                    style="background: #ffac4b"
                  ></div>
                </div>
              </div>
              <div>
                <div class="info">
                  <span>하</span>
                  <span>{{ answerPercentageInfo.botScore || 0 }}%</span>
                </div>
                <div
                  class="chart_blue-bg"
                  style="width: 328px; height: 12px; background: #eee"
                >
                  <div
                    class="chart_bar"
                    :style="{
                      width: `${answerPercentageInfo.botScore || 0}%`,
                    }"
                    style="background: #10d298"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapContent>

    <WrapContent style="width: 880px; padding: 24px 30px">
      <div class="content-header">
        <h4 class="headline2">상세 학습 결과</h4>
        <div style="display: flex; align-items: center; gap: 20px">
          <button @click="toggleAll" style="display: flex; align-items: center">
            {{
              results.every((result) => result.isOpen)
                ? "전체 접기"
                : "전체 펼치기"
            }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                :d="
                  results.every((result) => result.isOpen)
                    ? 'M12.822 8.18645C12.4243 7.61244 11.5757 7.61244 11.178 8.18645L5.29315 16.6805C4.83367 17.3437 5.30833 18.25 6.11514 18.25H17.8849C18.6917 18.25 19.1663 17.3437 18.7069 16.6805L12.822 8.18645Z'
                    : 'M12.822 17.8136C12.4243 18.3876 11.5757 18.3876 11.178 17.8136L5.29315 9.31949C4.83367 8.65629 5.30833 7.75 6.11514 7.75L17.8849 7.75C18.6917 7.75 19.1663 8.65629 18.7069 9.3195L12.822 17.8136Z'
                "
                fill="#525252"
              />
            </svg>
          </button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 25px">
        <div class="search-bar">
          <div style="display: flex; gap: 50px; padding: 15px 20px 25px">
            <div>
              <p>난이도</p>
              <div class="checkbox-wrap">
                <div>
                  <input
                    @click="autoLevelControl()"
                    v-model="levelAllToggle"
                    type="checkbox"
                    id="allLevel"
                    name=""
                    value="all"
                  />
                  <label for="allLevel">전체</label>
                </div>
                <div>
                  <input
                    v-model="levelToggle[2]"
                    type="checkbox"
                    id="high"
                    name=""
                    value="high"
                  />
                  <label for="high">상</label>
                </div>
                <div>
                  <input
                    v-model="levelToggle[1]"
                    type="checkbox"
                    id="medium"
                    name=""
                    value="medium"
                  />
                  <label for="medium">중</label>
                </div>
                <div>
                  <input
                    v-model="levelToggle[0]"
                    type="checkbox"
                    id="low"
                    name=""
                    value="low"
                  />
                  <label for="low">하</label>
                </div>
              </div>
            </div>
            <div>
              <p>정답여부</p>
              <div class="checkbox-wrap">
                <div>
                  <input
                    @click="autoAnswerControl()"
                    v-model="answerAllToggle"
                    type="checkbox"
                    id="all"
                    name=""
                    value="all"
                  />
                  <label for="all">전체</label>
                </div>
                <div>
                  <input
                    v-model="answerToggle[0]"
                    type="checkbox"
                    id="correct"
                    name=""
                    value="correct"
                  />
                  <label for="correct">정답</label>
                </div>
                <div>
                  <input
                    v-model="answerToggle[2]"
                    type="checkbox"
                    id="incorrect"
                    name=""
                    value="incorrect"
                  />
                  <label for="incorrect">오답</label>
                </div>
                <div>
                  <input
                    v-model="answerToggle[1]"
                    type="checkbox"
                    id="retry"
                    name=""
                    value="retry"
                  />
                  <label for="retry">즉시 다시 풀어서 맞춤</label>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 15px 20px">
            <button class="searchBtn" @click="questionSearch()">검색</button>
          </div>
        </div>

        <section class="flex-column-gap">
          <article v-for="(result, index) in results" :key="index">
            <div class="article-header" @click="toggleArticle(index)">
              <h5>{{ result.title }}</h5>
              <div class="toggle-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    :d="
                      result.isOpen
                        ? 'M8.83224 4.24929C8.43646 3.65517 7.56354 3.65517 7.16776 4.24928L2.54032 11.1956C2.0976 11.8602 2.57402 12.75 3.37256 12.75L12.6274 12.75C13.426 12.75 13.9024 11.8602 13.4597 11.1956L8.83224 4.24929Z'
                        : 'M8.83224 12.7507C8.43646 13.3448 7.56354 13.3448 7.16776 12.7507L2.54032 5.80442C2.0976 5.13984 2.57402 4.25 3.37256 4.25L12.6274 4.25C13.426 4.25 13.9024 5.13984 13.4597 5.80442L8.83224 12.7507Z'
                    "
                    fill="#525252"
                  />
                </svg>
              </div>
            </div>
            <div class="article-content">
              <div style="display: flex; justify-content: space-between">
                <div class="summary">
                  <p class="total-questions">
                    총 문제수: {{ result.questionLength }}개
                  </p>
                  <p class="filter-results">
                    필터 결과: {{ result.filterLength }}건
                  </p>
                </div>

                <div class="progress-bar">
                  <div class="info" style="margin-top: 10px">
                    <span>정답률</span>
                    <span>{{ result.answerPercent || 0 }}%</span>
                  </div>
                  <div
                    class="chart_blue-bg"
                    style="
                      width: 328px;
                      height: 8px;
                      background: #eee;
                      margin-top: 5px;
                    "
                  >
                    <div
                      class="chart_bar"
                      :class="{
                        answerTop: result.answerPercent > 66,
                        answerMid:
                          result.answerPercent > 33 &&
                          result.answerPercent <= 66,
                        answerBot: result.answerPercent <= 33,
                      }"
                      :style="{
                        width: `${result.answerPercent}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <div v-show="result.isOpen">
                <div class="line-border"></div>

                <div class="question-list">
                  <div class="title">
                    <h5>풀이한 문제</h5>
                    <div class="icon">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6.4"
                            stroke="#10D298"
                            stroke-width="1.2"
                          />
                        </svg>
                        맞춘 문제
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M7.78349 2.875C7.87972 2.70833 8.12028 2.70833 8.21651 2.875L14.2787 13.375C14.3749 13.5417 14.2546 13.75 14.0622 13.75H1.93782C1.74537 13.75 1.62509 13.5417 1.72132 13.375L7.78349 2.875Z"
                            stroke="#FFAC4B"
                            stroke-width="1.5"
                          />
                        </svg>
                        즉시 다시 풀어서 맞춘 문제
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M1.89453 2L13.9389 14.0444"
                            stroke="#FF5A83"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M13.9375 2L1.8931 14.0444"
                            stroke="#FF5A83"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                        </svg>
                        틀린 문제
                      </p>
                    </div>
                  </div>
                  <div class="list-container">
                    <!-- 문제풀이 ver. 상 -->
                    <div
                      v-for="(question, i) in result.questions[currentPage - 1]"
                      :key="i"
                      class="item"
                    >
                      <div class="item-header">
                        <div
                          style="display: flex; align-items: center; gap: 10px"
                        >
                          <div
                            :class="{
                              leveltop: question.level === 3,
                              levelmid: question.level === 2,
                              levelbot: question.level === 1,
                            }"
                          >
                            {{ levelText(question.level) }}
                          </div>
                          <span>{{ question.time }}초 소요</span>
                        </div>
                        <span>{{
                          dayjs(question.date).format("YYYY.MM.DD(dd) HH:mm:ss")
                        }}</span>
                      </div>
                      <div class="item-content">
                        <button
                          class="answerImage"
                          @click.stop="showAimg(question.date)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.5 7.17069C0.500152 6.10895 0.753688 5.06257 1.23954 4.11853C1.72539 3.17449 2.42952 2.36004 3.29341 1.74288C4.1573 1.12571 5.15601 0.723658 6.20652 0.570124C7.25704 0.41659 8.32903 0.516013 9.3334 0.860128C10.3378 1.20424 11.2455 1.78311 11.9812 2.54863C12.7168 3.31415 13.2592 4.2442 13.5632 5.2615C13.8671 6.27879 13.9239 7.35395 13.7288 8.39761C13.5338 9.44127 13.0924 10.4233 12.4415 11.2621L15.2659 14.0867C15.4178 14.244 15.5019 14.4546 15.5 14.6733C15.4981 14.892 15.4104 15.1011 15.2558 15.2557C15.1011 15.4104 14.892 15.4981 14.6733 15.5C14.4547 15.5019 14.2441 15.4178 14.0868 15.2659L11.2623 12.4413C10.2762 13.2069 9.09505 13.6805 7.85316 13.8081C6.61126 13.9358 5.35848 13.7123 4.23726 13.1632C3.11604 12.6141 2.17138 11.7614 1.51071 10.7021C0.850038 9.64271 0.499861 8.41921 0.5 7.17069ZM8.00512 4.66882C8.00512 4.44765 7.91727 4.23553 7.76088 4.07913C7.60449 3.92273 7.39239 3.83487 7.17122 3.83487C6.95006 3.83487 6.73795 3.92273 6.58156 4.07913C6.42518 4.23553 6.33732 4.44765 6.33732 4.66882V6.33674H4.66951C4.44835 6.33674 4.23624 6.4246 4.07985 6.581C3.92347 6.73739 3.83561 6.94951 3.83561 7.17069C3.83561 7.39187 3.92347 7.60399 4.07985 7.76039C4.23624 7.91678 4.44835 8.00465 4.66951 8.00465H6.33732V9.67256C6.33732 9.89374 6.42518 10.1059 6.58156 10.2623C6.73795 10.4187 6.95006 10.5065 7.17122 10.5065C7.39239 10.5065 7.60449 10.4187 7.76088 10.2623C7.91727 10.1059 8.00512 9.89374 8.00512 9.67256V8.00465H9.67293C9.89409 8.00465 10.1062 7.91678 10.2626 7.76039C10.419 7.60399 10.5068 7.39187 10.5068 7.17069C10.5068 6.94951 10.419 6.73739 10.2626 6.581C10.1062 6.4246 9.89409 6.33674 9.67293 6.33674H8.00512V4.66882Z"
                              fill="#3D90EF"
                            />
                          </svg>
                        </button>
                        <div style="height: 160px; width: 100%">
                          <img
                            style="width: 100%"
                            :src="question.q_imgURL"
                            alt=""
                          />
                          <!-- 객관식 보기 추가 -->
                          <div style="display: flex; justify-content: center">
                            <div v-if="question.options.length !== 0">
                              <div
                                v-for="(text, textIndex) in question.options"
                                :key="textIndex"
                                style="
                                  color: black;
                                  font-size: 12px;
                                  display: flex;
                                  justify-content: center;
                                  flex-direction: column;
                                  float: left;
                                "
                              >
                                <p
                                  style="color: black"
                                  v-if="
                                    question.answer !==
                                    (textIndex + 1).toString()
                                  "
                                >
                                  {{ numbers[textIndex] }}
                                  {{ text }}&nbsp;&nbsp;
                                </p>
                                <b
                                  v-if="
                                    question.answer ===
                                    (textIndex + 1).toString()
                                  "
                                  >{{ numbers[textIndex] }}
                                  {{ text }}&nbsp;&nbsp;</b
                                >
                              </div>
                            </div>
                            <div v-if="question.options.length === 0">
                              <div
                                style="
                                  color: black;
                                  font-size: 12px;
                                  display: flex;
                                  justify-content: center;
                                  flex-direction: column;
                                "
                              >
                                <b>정답: {{ question.answer }}</b>
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          class="answerImage"
                          v-show="a_imgURL === question.date"
                          style="
                            width: 400px;
                            position: absolute;
                            background-color: white;
                            border: 1px solid #cae3ff;
                            border-radius: 10px;
                            z-index: 9999;
                            margin-top: -150px;
                            margin-left: 230px;
                          "
                          :src="question.a_imgURL"
                          alt=""
                        />
                      </div>
                      <div class="item-bottom">
                        <svg
                          v-show="question.retry === 0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#10D298"
                            stroke-width="2"
                          />
                        </svg>
                        <svg
                          v-show="question.retry === 1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_18932_8921)">
                            <path
                              d="M11.5 3L21.8923 21H1.1077L11.5 3Z"
                              stroke="#FFAC4B"
                              stroke-width="2"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_18932_8921">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          v-show="question.retry > 1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2 2L21.799 21.799"
                            stroke="#FF5A83"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M21.8008 2L2.00179 21.799"
                            stroke="#FF5A83"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <div v-if="question.clear === true">
                          <p
                            v-for="(
                              submitAnswer, submitAnswerIndex
                            ) in question.submitAnswers.slice(0, 2)"
                            :key="submitAnswerIndex"
                          >
                            학생제출: {{ submitAnswer }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="result.questions.length > 0" class="pagination">
                    <v-pagination
                      color="blue"
                      v-model="currentPage"
                      :length="result.questions.length"
                      :size="30"
                      total-visible="7"
                      next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left"
                    ></v-pagination>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </WrapContent>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { Chart, registerables } from "chart.js";
import WrapContent from "../../../components/common/WrapContent.vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getUpgradeResult } from "../../../api/math-api-list";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import weekday from "dayjs/plugin/weekday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.locale("ko");

const store = useStore();
const route = useRoute();
const info = ref(route.path.split("/"));

const id = ref(info.value[3]);
const semester = ref(parseInt(info.value[4]));
const unit = ref(parseInt(info.value[5]));

Chart.register(...registerables);

const difficultyData = ref([]); // 난이도별 풀이 비율 데이터

const currentPage = ref(1);

const answerPercentageInfo = ref({});
const questions = ref([]);
const questionClearCount = ref(0);
const needReviewCount = ref(0);
const reviewCount = ref(0);
const results = ref([]);
const originalResults = ref([]);

// const toggleArticle = (index) => {
//   results.value[index].isOpen = !results.value[index].isOpen;
//   if (results.value[index].isOpen === true) {
//     for (let i = 0; i < results.value.length; i++) {
//       if (i === index) {
//         continue;
//       } else {
//         results.value[i].isOpen = false;
//         currentPage.value = 1;
//       }
//     }
//   }
// };
const toggleArticle = (index) => {
  results.value[index].isOpen = !results.value[index].isOpen;
};

const toggleAll = () => {
  const allOpen = results.value.every((result) => result.isOpen);
  results.value.forEach((result) => {
    result.isOpen = !allOpen;
  });
};

const a_imgURL = ref("");

const numbers = ref(["①", "②", "③", "④", "⑤"]);

const levelText = (num) => {
  let arr = ["하", "중", "상"];

  return arr[num - 1];
};

const showAimg = (str) => {
  if (a_imgURL.value === str) {
    a_imgURL.value = "";
  } else {
    a_imgURL.value = str;
  }
};

const autoLevelControl = () => {
  if (levelAllToggle.value === true) {
    levelAllToggle.value = false;
    levelToggle.value = [false, false, false];
  } else {
    levelAllToggle.value = true;
    levelToggle.value = [true, true, true];
  }
};

const levelAllToggle = ref(true);
const levelToggle = ref([true, true, true]);

watch(
  levelToggle,
  (newVal) => {
    if (newVal.filter((item) => item === true).length === 3) {
      levelAllToggle.value = true;
    } else {
      levelAllToggle.value = false;
    }
  },
  { deep: true }
);

const answerAllToggle = ref(true);
const answerToggle = ref([true, true, true]);

const autoAnswerControl = () => {
  if (answerAllToggle.value === true) {
    answerAllToggle.value = false;
    answerToggle.value = [false, false, false];
  } else {
    answerAllToggle.value = true;
    answerToggle.value = [true, true, true];
  }
};

watch(
  answerToggle,
  (newVal) => {
    if (newVal.filter((item) => item === true).length === 3) {
      answerAllToggle.value = true;
    } else {
      answerAllToggle.value = false;
    }
  },
  { deep: true }
);

onBeforeMount(async () => {});

onMounted(async () => {
  document.addEventListener("click", (event) => {
    if (event.target.className !== "answerImage") {
      a_imgURL.value = "";
    }
  });

  const data = (
    await getUpgradeResult({
      id: id.value,
      semester: semester.value,
      unit: unit.value,
    })
  ).data.data;

  const levelPercent = data.levelClearPercentage;

  questions.value = data.clearQuestionList;
  answerPercentageInfo.value = data.answerPercentage;
  questionClearCount.value = data.clearQuestionCnt;
  reviewCount.value = data.completeReviewQuestionCnt;
  needReviewCount.value = data.needReviewQuestionCnt;
  const badgeData = data.badgeData;

  difficultyData.value = [levelPercent.top, levelPercent.mid, levelPercent.bot];

  const ctxLevel = document.getElementById("levelChart").getContext("2d");

  // 뱃지 레벨별 성취도 차트
  new Chart(ctxLevel, {
    type: "bar",
    data: {
      labels: ["Lv.1", "Lv.2", "Lv.3", "Lv.4", "Lv.5"],
      datasets: [
        {
          label: "레벨별 성취도",
          data: badgeData,
          backgroundColor: "rgba(135, 206, 250, 0.5)",
          barThickness: 20,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false, // 가로선 제거
          },
        },
        y: {
          grid: {
            display: false, // 세로선 제거
          },
          ticks: {
            stepSize: 20,
            max: 100,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  if (difficultyData.value.length) {
    const ctxDifficulty = document
      .getElementById("difficultyChart")
      .getContext("2d");

    // 난이도별 풀이 비율 차트
    new Chart(ctxDifficulty, {
      type: "doughnut",
      data: {
        labels: ["상", "중", "하"],
        datasets: [
          {
            label: "난이도별 풀이 비율",
            data: difficultyData.value,
            backgroundColor: ["#FF5A83", "#FFAC4B", "#10d298"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right",
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              boxHeight: 10,
              padding: 20,
              pointStyle: "circle",
              font: {
                size: 18,
              },
              color: "#292929",
            },
          },
        },
      },
    });
  }

  const caculateAnswerPercent = (arr) => {
    const lessonWeightTable = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];
    const levelScoreTable = [
      [1, 0.5, 0],
      [1.5, 0.8, 0],
      [2, 1.2, 0],
    ];

    let allScore = 0;
    let stuScore = 0;

    for (let i = 0; i < arr.length; i++) {
      const target = arr[i];
      allScore +=
        levelScoreTable[target.level - 1][0] *
        lessonWeightTable[target.lesson - 1];
      stuScore +=
        levelScoreTable[target.level - 1][target.retry] *
        lessonWeightTable[target.lesson - 1];
    }

    if (!allScore) {
      return 0;
    }

    return Math.round((stuScore / allScore) * 100);
  };

  data.clearQuestionList = data.clearQuestionList.map((el) => {
    const targetIndex = el.q_img_index.split("_")[2];
    const grade = targetIndex[0];
    const semester = targetIndex[1];
    const unit = targetIndex[2].padStart(2, "0");
    const q_imgURL = `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/question/${el.q_img_index}.png`;
    const a_imgURL = `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/answer/${el.a_img_index}.png`;

    if (el.options.length) {
      el.submitAnswers = el.submitAnswers.map((element) => {
        return `${element}번 (${el.options[parseInt(element - 1)]})`;
      });
    }

    const res = {
      ...el,
      q_imgURL,
      a_imgURL,
    };

    return res;
  });

  // 문제 차시 단위로 필터 작업
  const unitInfo = data.unitInfo.map((item) => {
    const targetQuestions = data.clearQuestionList.filter(
      (el) => el.lesson === item.lesson
    );

    let answerPercent = 0;
    if (targetQuestions.length) {
      answerPercent = caculateAnswerPercent(targetQuestions);
    }

    const chunks = [];
    const chunkSize = 9;

    for (let i = 0; i < targetQuestions.length; i += chunkSize) {
      chunks.push(targetQuestions.slice(i, i + chunkSize));
    }

    const response = {
      ...item,
      title: `${item.lesson}차시: ${item.lessonTitle}`,
      questions: chunks,
      answerPercent,
      questionLength: targetQuestions.length,
      filterLength: targetQuestions.length,
      isOpen: false,
    };

    return response;
  });

  results.value = unitInfo;
  originalResults.value = unitInfo;
});

const questionSearch = () => {
  let levelArr = [];
  let answerArr = [];

  for (let i = 0; i < 3; i++) {
    if (levelToggle.value[i]) {
      levelArr.push(i + 1);
    }

    if (answerToggle.value[i]) {
      answerArr.push(i);
    }
  }

  if (!levelArr.length && !answerArr.length) {
    return;
  } else {
    currentPage.value = 1;

    const res = originalResults.value;

    results.value = res.map((item) => {
      const targetQuestions = item.questions.flatMap((item) => item);

      const questionRes = targetQuestions.filter((el) =>
        levelArr.includes(el.level)
      );
      const questionRes2 = questionRes.filter((el) =>
        answerArr.includes(el.retry)
      );

      const chunks = [];
      const chunkSize = 9;

      for (let i = 0; i < questionRes2.length; i += chunkSize) {
        chunks.push(questionRes2.slice(i, i + chunkSize));
      }

      const response = {
        ...item,
        questions: chunks,
        filterLength: questionRes2.length,
      };

      return response;
    });
  }
};
</script>

<style scoped>
.flex-column-gap {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.bold-text {
  font-weight: 700;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.card {
  display: flex;
  width: 100%;
  min-height: 264px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  border: 1px solid #cae3ff;
  border-radius: 10px;
}
.card-title {
  font-size: 16px;
  font-weight: 700;
}
.bg-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f8ff;
  border: 1px solid #cae3ff;
  width: 190px;
  height: 160px;
  gap: 6px;
  border-radius: 10px;
}
.bg-card .icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
}
.bg-card h5 {
  font-size: 28px;
  font-weight: 700;
}
.bg-card .blue-text {
  color: #3d90ef;
}
.bg-card .green-text {
  color: #04bb84;
}
.bg-card .pink-text {
  color: #ff5a83;
}
.bg-card .purple-text {
  color: #9164fa;
}
.bg-card p {
  color: #9a9a9a;
  font-size: 16px;
  font-weight: 700;
}
.search-bar {
  background: #dbecff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-bar p {
  font-size: 16px;
  font-weight: 700;
  color: #292929;
}
.search-bar button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  background: #258bff;
  color: #fff;
  border-radius: 6px;
}
.checkbox-wrap {
  display: flex;
  gap: 20px;
  margin-top: 14px;
  font-size: 14px;
}
.checkbox-wrap > div {
  display: flex;
  gap: 5px;
  align-items: center;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border: 1px solid #88c0ff;
  border-radius: 2px;
  cursor: pointer;
  height: 20px;
  outline: 0;
  width: 20px;
}
input[type="checkbox"]::after {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  content: "";
  display: none;
  height: 40%;
  left: 40%;
  position: relative;
  top: 20%;
  transform: rotate(45deg);
  width: 25%;
}
input[type="checkbox"]:checked {
  background: #3d90ef;
}
input[type="checkbox"]:checked::after {
  display: block;
}
canvas#levelChart {
  /* width: 100% !important; */
  height: 250px !important;
}
canvas#difficultyChart {
  width: 150px !important;
  height: 150px !important;
}
.canvas-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #292929;
}
.canvas-legend li {
  position: relative;
  list-style: none;
}
.canvas-legend li::before {
  content: "";
  width: 8px;
  height: 8px;
  background: #ff5a83;
  display: block;
  border-radius: 50px;
  position: absolute;
  left: -15px;
  top: 8px;
}
.canvas-legend li:first-child:before {
  background: #ff5a83;
}
.canvas-legend li:nth-child(2)::before {
  background: #ffac4b;
}
.canvas-legend li:nth-child(3)::before {
  background: #10d298;
}

.leveltop {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ff5a83;
}

.levelmid {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ffac4b;
}

.levelbot {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #10d298;
}

.answerBot {
  background: #f399af;
}

.answerMid {
  background: #fdce96;
}

.answerTop {
  background: #90e4cb;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cae3ff;
  padding: 10px 20px;
  background: #eaf4ff;
  cursor: pointer;
  border-radius: 9px 9px 0 0;
}

.article-header h5 {
  font-size: 18px;
  font-weight: 700;
  color: #525252;
}

.article-content {
  border: 1px solid #cae3ff;
  padding: 15px 20px 25px;
  border-radius: 0 0 9px 9px;
  border-top: none;
}

.progress-bar {
  width: 328px;
}

.info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.info span {
  font-size: 14px;
}

.chart_blue-bg {
  width: 328px;
  height: 8px;
  background: #eee;
}

.average-score {
  font-size: 16px;
  font-weight: 500;
  color: #292929;
}

.score-highlight {
  color: #3d90ef;
  font-weight: 600;
}
.chart-blue-bg {
  width: 328px;
  height: 12px;
  background: #eee;
}

.chart-bar {
  height: 100%;
}
.chart-bar.high {
  width: 60%;
  background: #ff5a83;
}
.chart-bar.medium {
  width: 80%;
  background: #10d298;
}
.chart-bar.low {
  width: 90%;
  background: #ffac4b;
}

.line-border {
  border-top: 1px solid #cae3ff;
  display: flex;
  margin: 30px 0;
}

.summary {
  display: flex;
  align-items: center;
  gap: 50px;
}
.total-questions {
  font-size: 16px;
  color: #292929;
}
.filter-results {
  font-size: 16px;
  color: #3d90ef;
}

.question-list .title {
  display: flex;
  align-items: center;
  gap: 20px;
}
.question-list h5 {
  font-size: 16px;
  font-weight: 700;
}
.question-list .icon {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9a9a9a;
  font-size: 14px;
}
.question-list .icon p {
  display: flex;
  align-items: center;
  gap: 5px;
}
.question-list .list-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 15px 0;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cae3ff;
  padding: 10px;
  border-radius: 9px 9px 0 0;
  background: #eaf4ff;
}
.item-header span {
  font-size: 12px;
}
.level {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ff5a83;
}
.item-content {
  position: relative;
  border-right: 1px solid #cae3ff;
  border-left: 1px solid #cae3ff;
  padding: 8px 10px;
  height: 172px;
}
.item-content p {
  color: #ccc;
  font-size: 12px;
}
.item-content button {
  position: absolute;
  top: 7px;
  right: 7px;
}
.item-bottom {
  display: flex;
  height: 44px;
  align-items: center;
  gap: 10px;
  border: 1px solid #cae3ff;
  padding: 0 10px;
  border-radius: 0 0 9px 9px;
  background: #f1f8ff;
  font-size: 12px;
}
.pagination {
  margin-top: 20px;
}
.v-pagination__item,
.v-pagination__prev,
.v-pagination__next {
  border: 1px solid #cae3ff;
  border-radius: 6px;
}
.v-btn__content {
  color: #292929;
}
.v-pagination__item--is-active {
  background: #3d90ef;
}
.v-pagination__item--is-active .v-btn__content {
  color: #fff;
}

.searchBtn:hover {
  filter: brightness(0.7);
}
</style>
