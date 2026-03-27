<template>
  <div v-if="book" class="modal">
    <div class="modal-content scrollbar">
      <div class="modal-head flex">
        <div class="info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M1 4.05561C1 3.77565 1.10864 3.50715 1.30203 3.30919C1.49541 3.11122 1.7577 3.00001 2.03119 3.00001H7.8787C9.56571 3.00001 11.0644 3.83042 12.0034 5.11263C12.4835 4.45572 13.1067 3.92264 13.8235 3.55586C14.5403 3.18909 15.3309 2.99875 16.1323 3.00001H21.9688C22.2423 3.00001 22.5046 3.11122 22.698 3.30919C22.8914 3.50715 23 3.77565 23 4.05561V18.8341C23 19.1141 22.8914 19.3826 22.698 19.5805C22.5046 19.7785 22.2423 19.8897 21.9688 19.8897H15.7721C15.3658 19.8897 14.9635 19.9716 14.5882 20.1308C14.2129 20.2899 13.8719 20.5232 13.5846 20.8172L12.7294 21.6913C12.536 21.889 12.274 22 12.0007 22C11.7274 22 11.4653 21.889 11.272 21.6913L10.4168 20.8172C10.1295 20.5232 9.78849 20.2899 9.41316 20.1308C9.03783 19.9716 8.63555 19.8897 8.2293 19.8897H2.03119C1.7577 19.8897 1.49541 19.7785 1.30203 19.5805C1.10864 19.3826 1 19.1141 1 18.8341V4.05561ZM10.9695 18.5864L10.975 11.4463L10.9723 8.27523C10.9715 7.43582 10.6453 6.63105 10.0652 6.03776C9.48512 5.44448 8.69868 5.11122 7.8787 5.11122H3.06237V17.7785H8.22792C9.19782 17.7785 10.1481 18.0585 10.9695 18.5864ZM13.0374 8.27804L13.0319 18.5836C13.8529 18.0573 14.802 17.7783 15.7707 17.7785H20.9363V5.11122H16.1309C15.3105 5.11122 14.5236 5.44487 13.9435 6.03876C13.3633 6.63265 13.0374 7.43815 13.0374 8.27804Z"
              fill="#3D90EF"
            />
          </svg>
          <!-- <h2>{{ langlist[$store.state.lang]["도서정보"] }}</h2> -->
          <h2 class="headline">
            {{ langlist[$store.state.lang]["독서활동"] }}
          </h2>
        </div>
        <span class="close" @click="closeModal"></span>
      </div>

      <div class="flex cont">
        <div>
          <div class="cont-book" :style="backgroundVars(book)"></div>
          <button @click="reader()" v-show="plan === true" class="btn">
            {{ langlist[$store.state.lang]["e-book 보기"] }}
          </button>
          <button v-show="plan === false" class="btn2">e-book 보기</button>
          <p v-show="plantext === false" class="red-sm">
            {{
              langlist[$store.state.lang][
                "e-book 보기는 프리미엄 플랜만 제공됩니다."
              ]
            }}
          </p>
        </div>

        <div class="detail">
          <p class="text">e-future Classic Readers</p>
          <h2 class="title">{{ book.book_name }}</h2>
          <table class="book-modal-table">
            <tr>
              <th>
                {{ langlist[$store.state.lang]["작가"] }}
              </th>
              <td>{{ book.author }}</td>
              <th>
                {{ langlist[$store.state.lang]["레벨 분류"] }}
              </th>
              <td>
                {{ booklevel(book.level_seq) }}
              </td>
            </tr>
            <tr>
              <th>
                {{ langlist[$store.state.lang]["추천대상"] }}
              </th>
              <td>
                <p v-show="$store.state.lang === 'ko'">3학년 이상</p>
                <p v-show="$store.state.lang !== 'ko'">Students</p>
              </td>
              <th>CEFR</th>
              <td>
                {{ book.cefr }}
              </td>
            </tr>
            <tr>
              <th>
                {{ langlist[$store.state.lang]["총 단어수"] }}
              </th>
              <td>
                <p v-show="$store.state.lang === 'ko'">
                  {{ book.word_count }}개
                </p>
                <p v-show="$store.state.lang !== 'ko'">
                  {{ book.word_count }}
                </p>
              </td>
              <th>
                {{ langlist[$store.state.lang]["페이지수"] }}
              </th>
              <td>{{ book.total_page }}p</td>
            </tr>
            <tr>
              <th>
                {{ langlist[$store.state.lang]["학습활동"] }}
              </th>
              <td colspan="3">
                <LearningActivity :bookinfo="book" />
              </td>
            </tr>
          </table>
          <!-- <p
            style="
              color: #258bff;
              font-size: 13px;
              margin-top: 10px;
              margin-left: 130px;
            "
          >
            {{
              langlist[$store.state.lang][
                "*현재 Read 학습만 제공되며, 다른 활동은 순차적으로 오픈될 예정입니다."
              ]
            }}
          </p> -->
        </div>
      </div>

      <!-- 줄거리 요약 -->
      <div v-show="$store.state.lang === 'ko'" class="cont">
        <h4>{{ langlist[$store.state.lang]["줄거리 요약"] }}</h4>
        <div class="lightblue_bg">
          <p>
            {{ story[book["no."]] || "-" }}
          </p>
        </div>
      </div>

      <div v-if="detail === true">
        <div class="line3"></div>

        <!-- 독서 활동 상세 -->
        <div class="details cont">
          <h4>{{ langlist[$store.state.lang]["독서 활동 상세"] }}</h4>

          <div class="border-style1">
            <p style="width: 33%">{{ langlist[$store.state.lang]["활동"] }}</p>
            <p style="width: 30%">{{ langlist[$store.state.lang]["결과"] }}</p>
            <p>{{ langlist[$store.state.lang]["일시"] }}</p>
          </div>

          <section>
            <div class="header" :class="{ open: detailsVisible.read }">
              <div>
                <v-chip class="read" variant="outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.2106 4H11.1092L10.7209 4.1664L9.99985 4.87639L9.27877 4.1664L8.89049 4H2.78905L2.23438 4.55468V15.6482L2.78905 16.2029H8.65753L9.61157 17.1458H10.3881L11.3422 16.2029H17.2106L17.7653 15.6482V4.55468L17.2106 4ZM9.44517 15.4485L9.24549 15.2599L8.89049 15.0935H3.34373V5.10935H8.65753L9.47845 5.93027L9.44517 15.4485ZM16.656 15.0935H11.1092L10.7209 15.2599L10.5656 15.4041V5.8859L11.3422 5.10935H16.656V15.0935ZM7.78114 7.32806H4.45308V8.43741H7.78114V7.32806ZM7.78114 11.7655H4.45308V12.8748H7.78114V11.7655ZM4.45308 9.54676H7.78114V10.6561H4.45308V9.54676ZM15.5466 7.32806H12.2186V8.43741H15.5466V7.32806ZM12.2186 9.54676H15.5466V10.6561H12.2186V9.54676ZM12.2186 11.7655H15.5466V12.8748H12.2186V11.7655Z"
                      fill="#3480D8"
                    />
                  </svg>
                  Read
                </v-chip>
              </div>
              <div v-if="summaryInfo.readCount === 0" class="no-data">
                <p style="margin-left: -273px">
                  {{ langlist[$store.state.lang]["활동 내역이 없습니다."] }}
                </p>
              </div>
              <p v-if="summaryInfo.readCount > 0">
                {{ summaryInfo.readCount
                }}{{ langlist[$store.state.lang]["회독"] }}
              </p>
              <!-- v-if="read.length" -->
              <!-- <div v-else class="no-data">활동 내역이 없습니다.</div> -->
              <button
                v-if="summaryInfo.readCount > 0"
                @click="toggleDetails('read')"
              >
                <!-- v-if="read.length" -->
                {{
                  detailsVisible.read
                    ? langlist[$store.state.lang]["접기"]
                    : langlist[$store.state.lang]["더보기"]
                }}
              </button>
            </div>

            <section class="details-content" v-show="detailsVisible.read">
              <div v-for="(j, i) in readHistory" :key="i" class="flex">
                <p>
                  {{ (i - readHistory.length) * -1
                  }}{{ langlist[$store.state.lang]["회차 완독"] }}
                </p>
                <p>{{ readHistory[i] }}</p>
              </div>
            </section>
          </section>

          <section>
            <div class="header" :class="{ open: detailsVisible.quiz }">
              <div>
                <v-chip class="quiz" variant="outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.27075 7.5135C9.26723 7.66033 9.20641 7.79996 9.1013 7.90255C8.99619 8.00514 8.85513 8.06254 8.70825 8.0625C8.14575 8.0625 8.14575 7.49925 8.14575 7.49925V7.4925C8.14615 7.45892 8.14815 7.42538 8.15175 7.392C8.18493 7.10228 8.29355 6.82635 8.46675 6.59175C8.80725 6.132 9.41925 5.79525 10.4055 5.8125C11.118 5.82525 11.7503 6.12375 12.1463 6.615C12.549 7.11525 12.6848 7.7925 12.4178 8.45925C12.1463 9.138 11.532 9.408 11.1788 9.5625L11.1413 9.57975C10.9313 9.672 10.8315 9.72 10.7715 9.768L10.7708 9.76875V10.3117C10.7709 10.4609 10.7117 10.604 10.6063 10.7096C10.5008 10.8152 10.3578 10.8745 10.2086 10.8746C10.0594 10.8747 9.91633 10.8156 9.81077 10.7101C9.70521 10.6047 9.64585 10.4617 9.64575 10.3125V9.75C9.64575 9.35775 9.83475 9.07725 10.068 8.88975C10.2555 8.73975 10.4918 8.63625 10.6575 8.56275L10.686 8.55C11.0925 8.37075 11.286 8.25975 11.3738 8.04075C11.4253 7.92301 11.4429 7.79322 11.4246 7.666C11.4063 7.53879 11.3528 7.41922 11.2703 7.32075C11.1038 7.1145 10.7985 6.94425 10.386 6.9375C9.68475 6.9255 9.45225 7.15125 9.37125 7.2615C9.31761 7.33431 9.28306 7.4194 9.27075 7.509V7.5135ZM10.2083 13.125C10.4072 13.125 10.5979 13.046 10.7386 12.9053C10.8792 12.7647 10.9583 12.5739 10.9583 12.375C10.9583 12.1761 10.8792 11.9853 10.7386 11.8447C10.5979 11.704 10.4072 11.625 10.2083 11.625C10.0093 11.625 9.81857 11.704 9.67792 11.8447C9.53727 11.9853 9.45825 12.1761 9.45825 12.375C9.45825 12.5739 9.53727 12.7647 9.67792 12.9053C9.81857 13.046 10.0093 13.125 10.2083 13.125ZM4.02075 4.875C4.02075 4.37772 4.2183 3.90081 4.56993 3.54917C4.92156 3.19754 5.39847 3 5.89575 3H14.5208C14.767 3 15.0108 3.0485 15.2383 3.14273C15.4658 3.23695 15.6725 3.37506 15.8466 3.54917C16.0207 3.72328 16.1588 3.92998 16.253 4.15747C16.3473 4.38495 16.3958 4.62877 16.3958 4.875V15.5625C16.3958 15.7117 16.3365 15.8548 16.231 15.9602C16.1255 16.0657 15.9824 16.125 15.8333 16.125H5.14575C5.14575 16.3239 5.22477 16.5147 5.36542 16.6553C5.50607 16.796 5.69684 16.875 5.89575 16.875H15.8333C15.9824 16.875 16.1255 16.9343 16.231 17.0398C16.3365 17.1452 16.3958 17.2883 16.3958 17.4375C16.3958 17.5867 16.3365 17.7298 16.231 17.8352C16.1255 17.9407 15.9824 18 15.8333 18H5.89575C5.39847 18 4.92156 17.8025 4.56993 17.4508C4.2183 17.0992 4.02075 16.6223 4.02075 16.125V4.875ZM5.14575 4.875V15H15.2708V4.875C15.2708 4.67609 15.1917 4.48532 15.0511 4.34467C14.9104 4.20402 14.7197 4.125 14.5208 4.125H5.89575C5.69684 4.125 5.50607 4.20402 5.36542 4.34467C5.22477 4.48532 5.14575 4.67609 5.14575 4.875Z"
                      fill="#10D298"
                    />
                  </svg>
                  Quiz
                </v-chip>
              </div>
              <div
                v-if="
                  summaryInfo.racingRecord.perfect +
                    summaryInfo.racingRecord.good +
                    summaryInfo.racingRecord.notbad ===
                  0
                "
                class="no-data"
              >
                <p style="margin-left: -273px">
                  {{ langlist[$store.state.lang]["활동 내역이 없습니다."] }}
                </p>
              </div>
              <div
                v-if="
                  summaryInfo.racingRecord.perfect +
                    summaryInfo.racingRecord.good +
                    summaryInfo.racingRecord.notbad >
                  0
                "
                style="display: flex"
              >
                <!-- v-if="quizData.length" -->
                <p>
                  <span class="dot green"></span>P:{{
                    summaryInfo.racingRecord.perfect
                  }}
                </p>
                <p>
                  <span class="dot blue"></span>G:{{
                    summaryInfo.racingRecord.good
                  }}
                </p>
                <p>
                  <span class="dot orange"></span>NB:{{
                    summaryInfo.racingRecord.notbad
                  }}
                </p>
              </div>
              <!-- <div v-else class="no-data">활동 내역이 없습니다.</div> -->
              <button
                v-if="
                  summaryInfo.racingRecord.perfect +
                    summaryInfo.racingRecord.good +
                    summaryInfo.racingRecord.notbad >
                  0
                "
                @click="toggleDetails('quiz')"
              >
                <!-- v-if="quizData.length" -->
                {{
                  detailsVisible.quiz
                    ? langlist[$store.state.lang]["접기"]
                    : langlist[$store.state.lang]["더보기"]
                }}
              </button>
            </div>

            <section class="details-content" v-show="detailsVisible.quiz">
              <div v-for="(j, i) in quizHistory" :key="i" class="flex">
                <p v-if="j.score === 100">
                  <span class="dot green"></span>Perfect :
                  {{ langlist[$store.state.lang]["완벽 이해"] }}
                </p>
                <p v-if="j.score < 100 && j.score > 66">
                  <span class="dot blue"></span>Good :
                  {{ langlist[$store.state.lang]["보통"] }}
                </p>
                <p v-if="j.score <= 66">
                  <span class="dot orange"></span>Not bad :
                  {{ langlist[$store.state.lang]["이해 부족"] }}
                </p>
                <p>{{ j.date }}</p>
              </div>
            </section>
          </section>

          <section>
            <div class="header" :class="{ open: detailsVisible.record }">
              <div>
                <v-chip class="record" variant="outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.29175 6.125C7.29175 5.2962 7.62099 4.50134 8.20704 3.91529C8.79309 3.32924 9.58795 3 10.4167 3C11.2455 3 12.0404 3.32924 12.6265 3.91529C13.2125 4.50134 13.5417 5.2962 13.5417 6.125V10.5C13.5417 11.3288 13.2125 12.1237 12.6265 12.7097C12.0404 13.2958 11.2455 13.625 10.4167 13.625C9.58795 13.625 8.79309 13.2958 8.20704 12.7097C7.62099 12.1237 7.29175 11.3288 7.29175 10.5V6.125ZM10.4167 4.25C9.91947 4.25 9.44255 4.44754 9.09092 4.79917C8.73929 5.15081 8.54175 5.62772 8.54175 6.125V10.5C8.54175 10.9973 8.73929 11.4742 9.09092 11.8258C9.44255 12.1775 9.91947 12.375 10.4167 12.375C10.914 12.375 11.3909 12.1775 11.7426 11.8258C12.0942 11.4742 12.2917 10.9973 12.2917 10.5V6.125C12.2917 5.62772 12.0942 5.15081 11.7426 4.79917C11.3909 4.44754 10.914 4.25 10.4167 4.25ZM5.41675 9.875C5.58251 9.875 5.74148 9.94085 5.85869 10.0581C5.9759 10.1753 6.04175 10.3342 6.04175 10.5C6.04175 11.6603 6.50268 12.7731 7.32316 13.5936C8.14363 14.4141 9.25643 14.875 10.4167 14.875C11.5771 14.875 12.6899 14.4141 13.5103 13.5936C14.3308 12.7731 14.7917 11.6603 14.7917 10.5C14.7917 10.3342 14.8576 10.1753 14.9748 10.0581C15.092 9.94085 15.251 9.875 15.4167 9.875C15.5825 9.875 15.7415 9.94085 15.8587 10.0581C15.9759 10.1753 16.0417 10.3342 16.0417 10.5C16.042 11.8838 15.5322 13.2192 14.6097 14.2507C13.6873 15.2822 12.417 15.9375 11.0417 16.0912V17.375C11.0417 17.5408 10.9759 17.6997 10.8587 17.8169C10.7415 17.9342 10.5825 18 10.4167 18C10.251 18 10.092 17.9342 9.97481 17.8169C9.8576 17.6997 9.79175 17.5408 9.79175 17.375V16.0912C8.41651 15.9375 7.1462 15.2822 6.22376 14.2507C5.30132 13.2192 4.79148 11.8838 4.79175 10.5C4.79175 10.3342 4.8576 10.1753 4.97481 10.0581C5.09202 9.94085 5.25099 9.875 5.41675 9.875Z"
                      fill="#F88D10"
                    />
                  </svg>
                  Record
                </v-chip>
              </div>
              <div v-if="summaryInfo.recordScore === -1" class="no-data">
                {{ langlist[$store.state.lang]["활동 내역이 없습니다."] }}
              </div>
              <div>
                <p v-if="summaryInfo.recordScore > -1">
                  {{ langlist[$store.state.lang]["발음 정확도"] }} :
                  {{ summaryInfo.recordScore }}%
                </p>
              </div>
              <button
                v-if="summaryInfo.recordScore > -1"
                @click="toggleDetails('record')"
              >
                <!-- v-if="quizData.length" -->
                {{
                  detailsVisible.record
                    ? langlist[$store.state.lang]["접기"]
                    : langlist[$store.state.lang]["더보기"]
                }}
              </button>
            </div>

            <section class="details-content" v-show="detailsVisible.record">
              <div v-for="(j, i) in repeatHistory" :key="i" class="flex">
                <p>
                  {{ langlist[$store.state.lang]["발음 정확도"] }} :
                  {{ j.totalScore }}%
                </p>
                <p>{{ j.date }}</p>
              </div>
            </section>
          </section>
        </div>

        <div class="line3"></div>

        <!-- Record 활동 상세 -->
        <div class="record cont">
          <h4>Record {{ langlist[$store.state.lang]["평가 상세"] }}</h4>
          <sentenceRadarChart :userData="sentenceHistory.radar" />
          <table class="record-table" cellpadding="0" cellspacing="0">
            <tr>
              <th width="540px">{{ langlist[$store.state.lang]["활동"] }}</th>
              <th>{{ langlist[$store.state.lang]["날짜"] }}</th>
              <th>{{ langlist[$store.state.lang]["정확도"] }}</th>
            </tr>
            <tr v-for="(j, i) in sentenceHistory.sentences" :key="i">
              <td>
                <div class="grid-wrap">
                  <p>
                    <span
                      v-for="(k, n) in Object.getOwnPropertyNames(j.sentence)"
                      :key="n"
                      :class="{
                        'text-o': j.sentence[k] <= 50,
                        'text-b': j.sentence[k] >= 80,
                      }"
                    >
                      {{ k }}&nbsp;
                    </span>
                  </p>
                  <svg
                    @click="audioPlay(j.audio_url)"
                    style="cursor: pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <circle cx="20" cy="20" r="16" fill="#3D90EF" />
                    <path
                      d="M28.3131 18.3077C29.5586 19.0922 29.5586 20.9078 28.3131 21.6923L17.5659 28.4613C16.234 29.3001 14.5 28.343 14.5 26.769L14.5 13.231C14.5 11.657 16.234 10.6999 17.5659 11.5387L28.3131 18.3077Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </td>
              <td>
                {{ j.date.split(" ")[0] }}<br />{{ j.date.split(" ")[1] }}
              </td>
              <td>{{ j.totalScore }}%</td>
            </tr>
            <!-- <tr>
              <td>
                <div class="grid-wrap">
                  <p>
                    "If you give me a dress as golden as the sun, a second dress
                    as silvery as the moon, a third dress that twinkles like the
                    stars, and finally a suit made from the hides of every
                    animal in the kingdom, I will marry you."
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <circle cx="20" cy="20" r="16" fill="#3D90EF" />
                    <path
                      d="M28.3131 18.3077C29.5586 19.0922 29.5586 20.9078 28.3131 21.6923L17.5659 28.4613C16.234 29.3001 14.5 28.343 14.5 26.769L14.5 13.231C14.5 11.657 16.234 10.6999 17.5659 11.5387L28.3131 18.3077Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </td>
              <td>2024.07.07<br />18:07:00</td>
              <td>50%</td>
            </tr> -->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LearningActivity from "./LearningActivity.vue";
import * as bookinfo from "../../assets/bookinfo/bookinfo.json";
import * as story from "../../assets/bookinfo/story.json";
import {
  schoolinfo,
  getBookPopupDetail,
  getBookPopupSummary,
  getBookPopupRepeatDetail,
} from "../../api/api-list-2";

import { library_modal_ko } from "../../assets/translate/ko";
import { library_modal_vt } from "../../assets/translate/vt";
import { reactive } from "vue";
import sentenceRadarChart from "../charts/SentenceRadarChart.vue";

export default {
  async created() {
    this.payCheck();
  },
  async mounted() {
    if (this.detail === true) {
      const data = (await getBookPopupSummary(this.userId, this.book.bookCode))
        .data.data;

      const { readCount, racingRecord, recordScore } = data;

      let quizData = {
        perfect: 0,
        good: 0,
        notbad: 0,
      };

      quizData.perfect = racingRecord.filter(
        (item) => item.score === 100
      ).length;
      quizData.good = racingRecord.filter(
        (item) => item.score < 100 && item.score > 66
      ).length;
      quizData.notbad = racingRecord.filter((item) => item.score < 66).length;

      this.summaryInfo = { readCount, racingRecord: quizData, recordScore };

      const data2 = (
        await getBookPopupRepeatDetail(this.userId, this.book.bookCode)
      ).data.data;

      const { accuracy, fluency, prosody, sentences } = data2;

      const radar = [accuracy, fluency, prosody];

      if (sentences) {
        this.sentenceHistory = {
          radar,
          sentences: sentences.reverse(),
        };
      }
    }
  },
  setup() {},
  data() {
    return {
      detailsVisible: {
        read: false,
        quiz: false,
        record: false,
      },
      summaryInfo: {
        readCount: 0,
        racingRecord: [],
        recordScore: -1,
      },
      langlist: {
        ko: library_modal_ko,
        vt: library_modal_vt,
      },
      story: story,
      plan: false,
      plantext: true,
      freebooks: ["LSR001", "SRT001", "MFC001", "ECR081"],
      readHistory: [],
      quizHistory: [],
      repeatHistory: [],
      sentenceHistory: {
        radar: [0, 0, 0, 0, 0],
        sentences: [],
      },
      audio: new Audio(),
    };
  },
  components: {
    LearningActivity,
    sentenceRadarChart,
  },
  props: {
    book: {
      required: true,
    },
    detail: Boolean,
    userId: String,
  },
  methods: {
    async toggleDetails(activity) {
      this.detailsVisible[activity] = !this.detailsVisible[activity];

      if (this.detailsVisible[activity]) {
        if (activity === "read") {
          if (this.summaryInfo.readCount > 0 && !this.readHistory.length) {
            const data = (
              await getBookPopupDetail(this.userId, this.book.bookCode, "read")
            ).data.data;

            this.readHistory = data.reverse();
          } else {
            return;
          }
        } else if (activity === "quiz") {
          const { perfect, good, notbad } = this.summaryInfo.racingRecord;

          if (!this.quizHistory.length && perfect + good + notbad > 0) {
            const data = (
              await getBookPopupDetail(
                this.userId,
                this.book.bookCode,
                "racing"
              )
            ).data.data;

            const data2 = data.reverse();

            this.quizHistory = data2;
          } else {
            return;
          }
        } else if (activity === "record") {
          if (
            !this.repeatHistory.length &&
            this.summaryInfo.recordScore !== -1
          ) {
            const data = (
              await getBookPopupDetail(
                this.userId,
                this.book.bookCode,
                "repeat"
              )
            ).data.data;

            const data2 = data.reverse();

            this.repeatHistory = data2;
          } else {
            return;
          }
        } else {
          return;
        }
      }
    },
    closeModal() {
      this.readHistory = [];
      this.quizHistory = [];
      this.repeatHistory = [];
      this.summaryInfo = {
        readCount: 0,
        racingRecord: [],
        recordScore: -1,
      };
      this.sentenceHistory = {
        radar: [0, 0, 0, 0, 0],
        sentences: [],
      };
      this.$store.state.bookDetailModal = false;
    },
    booklevel(seq) {
      if (seq == -1) {
        return "Level K";
      } else if (seq == 0) {
        return "Starter";
      } else {
        return `Level ${seq}`;
      }
    },
    backgroundVars(info) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${info.book_code}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
    async payCheck() {
      const res = await schoolinfo();
      if (
        res.data.data.payPlan === "p" ||
        res.data.data.payPlan === "pm" ||
        this.freebooks.includes(this.book.book_code)
      ) {
        this.plan = true;
      } else {
        this.plan = false;
        this.plantext = false;
      }
    },
    reader() {
      const bookCode = this.book.book_code;
      sessionStorage.setItem("ebookcode", bookCode);

      const url = `${window.location.origin}/e-book-reader`;
      window.open(url);
      //var child = window.open(url);

      //const bookCode = this.book.book_code;

      // child.onload = function () {
      //   child.postMessage({ type: "bookcode", data: bookCode }, url);
      // };
    },
    audioPlay(url) {
      if (!url) {
        return;
      }

      if (!url.includes("voice-library-recordings")) {
        return;
      }
      this.audio.pause();

      this.audio.src = url;
      this.audio.play();
    },
  },
  watch: {
    book(newbook) {},
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: fixed;
  width: 990px;
  height: 700px;
  background-color: #fefefe;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  overflow-y: auto;
}

.modal-head {
  padding: 30px 0 15px;
  border-bottom: 1px solid #cae3ff;
  margin: 0 50px;
  font-size: 24px;
}
.modal-head .info {
  display: flex;
  justify-content: start;
  align-items: center;
}
.modal-head .info h2 {
  margin: 6px;
  font-size: 24px;
}
.close {
  float: right;
  width: 40px;
  height: 40px;
  background: url(../../assets/image/Btn_Close.png);
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.cont {
  width: 100%;
  padding: 30px 50px 40px;
}
.detail .text {
  color: #9a9a9a;
  font-size: 16px;
  margin-top: 0;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.cont-book {
  width: 210px;
  height: 300px;
  border-radius: 10px;
  background-image: var(--bg-image);
  background-size: cover;
  background-repeat: no-repeat;
}
button.btn {
  display: block;
  margin: 20px auto 10px;
  padding: 8px 24px;
  color: #fff;
  background-color: #258bff;
  border-radius: 5px;
  font-size: 14px;
}
button.btn2 {
  display: block;
  margin: 20px auto 10px;
  padding: 8px 24px;
  color: #fff;
  background-color: #d0e6ff;
  border-radius: 5px;
  font-size: 14px;
}
button.btn:hover {
  filter: brightness(0.7);
}
.cont p.red-sm {
  color: #f34c4c;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.6px;
}

.book-modal-table {
  border: 1px solid #cae3ff;
  border-radius: 16px;
  width: 650px;
  text-align: center;
  border-spacing: 0;
  margin-top: 25px;
  overflow: hidden;

  th,
  td {
    border-bottom: 1px solid #cae3ff;
  }

  tr:last-child th,
  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(1) th:nth-child(3),
  tr:nth-child(2) th:nth-child(3),
  tr:nth-child(3) th:nth-child(3) {
    border-left: 1px solid #cae3ff;
  }
}
.book-modal-table th {
  width: 115px;
  padding: 7px 20px;
  background: #f1f8ff;
  color: #66686b;
  font-size: 16px;
  border-right: 1px solid #cae3ff;
}
.book-modal-table td {
  width: 210px;
  padding: 7px 20px;
  color: #292929;
  font-size: 16px;
}

.record-table {
  width: 100%;
  padding: 0;
  border: 1px solid #88c0ff;
  border-radius: 10px;
  margin-top: 40px;
  overflow: hidden;
}
.record-table th {
  padding: 10px 30px;
  background: #f1f8ff;
  color: #9a9a9a;
  font-size: 16px;
}
.record-table th {
  border-right: 1px solid #88c0ff;
}
.record-table td {
  padding: 20px 30px;
  text-align: center;
  border-top: 1px solid #88c0ff;
  border-right: 1px solid #88c0ff;
  color: #292929;
  position: relative;
}
.grid-wrap {
  padding: 0 30px;
  display: grid;
  grid-template-columns: 420px 40px;
  align-items: center;
  gap: 40px;
}
.record-table th:last-child,
.record-table td:last-child {
  border-right: none;
}
.lightblue_bg {
  background-color: #f1f8ff;
  border-radius: 14px;
  padding: 25px;
  width: 100%;
  height: 150px;
  margin-top: 15px;
}
.details {
  gap: 10px;
  display: flex;
  flex-direction: column;
}
.line3 {
  width: 100%;
  height: 10px;
  box-shadow: 0px 10px 2px 0px rgba(217, 217, 217, 0.3);
}
.border-style1 {
  border: 1px solid #88c0ff;
  padding: 8px 40px;
  border-radius: 10px;
  display: flex;
  color: #525252;
  font-size: 16px;
}
.details .header {
  background: #f1f8ff;
  border: 1px solid #88c0ff;
  padding: 8px 30px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details .header.open {
  border-radius: 10px 10px 0 0;
}
.details .header > * {
  width: 33%;
  text-align: left;
}
.details .header button {
  text-align: right;
  color: #5fa2ee;
  font-size: 14px;
}
.details .details-content {
  border: 1px solid #88c0ff;
  display: block;
  padding: 12px 22% 12px 34.5%;
  border-top: none;
  color: #292929;
  gap: 10px;
  display: flex;
  flex-direction: column;
  color: #292929;
  border-radius: 0 0 10px 10px;
}
span.dot {
  position: relative;
  margin-left: 20px;
}
span.dot::before {
  content: "";
  width: 9px;
  height: 9px;
  border-radius: 10px;
  display: block;
  position: absolute;
  left: -15px;
  top: 8px;
}
span.dot.green::before {
  background: #10d298;
}
span.dot.blue::before {
  background: #3d90ef;
}
span.dot.orange::before {
  background: #f88d10;
}
span.text-o {
  color: #f88d10;
}
span.text-g {
  color: #10d298;
}
span.text-b {
  color: #3d90ef;
}
.no-data {
  color: #bababa;
  font-size: 16px;
}
p {
  font-size: 16px;
}
h4 {
  padding-bottom: 10px;
}
.chip-wrap {
  display: flex;
  gap: 10px;
  justify-content: left;
  margin-left: 30px;
  padding: 10px 0;
}
.v-chip {
  border-radius: 25px;
  background: #fff;
  color: #292929;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.6px;
  padding: 0 15px !important;
}
.v-chip.read {
  border: 1px solid #3480d8;
}
.v-chip.read-speak {
  border: 1px solid #15cbf3;
}
.v-chip.quiz {
  border: 1px solid #10d298;
}
.v-chip.record {
  border: 1px solid #f88d10;
}
</style>
