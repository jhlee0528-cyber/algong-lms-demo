<template>
  <!-- 단원 미션 설정 (비활성) -->
  <div>
    <div style="padding: 40px; padding-bottom: 30px">
      <p style="font-family: notosans; font-size: 25px">
        {{ setnum(lessoninfo.index + 1) }}. {{ lessoninfo.name }}
      </p>
    </div>
    <div style="width: 830px; margin-left: 35px">
      <div style="width: 100%">
        <div style="width: 40%; height: 300px; float: left">
          <p
            style="
              font-size: 19px;
              font-family: notosans;
              padding: 30px;
              padding-left: 40px;
            "
          >
            {{ langlist[$store.state.lang]["진행률"] }}
          </p>
          <div style="margin-left: 65px">
            <v-progress-circular
              style="font-size: 40px; font-family: notosans"
              size="180"
              width="10"
              color="#3480D8"
              :model-value="progresses[lessoninfo.index]"
              >{{ progresses[lessoninfo.index] }}%</v-progress-circular
            >
          </div>
        </div>
        <div
          style="
            float: left;
            border-right: 3px solid #cae3ff;
            height: 300px;
            margin-top: 35px;
          "
        ></div>
        <div style="width: 59%; height: 300px; float: left">
          <p
            style="
              font-size: 19px;
              font-family: notosans;
              padding: 30px;
              padding-left: 40px;
              padding-bottom: 10px;
            "
          >
            {{ langlist[$store.state.lang]["학습 내용"] }}
          </p>
          <div style="width: 100%; margin-top: 10px">
            <div style="width: 30%; float: left; margin-left: 30px">
              <p
                style="
                  color: #636363;
                  font-size: 17px;
                  font-family: notosans;
                  margin-left: 10px;
                "
              >
                {{ langlist[$store.state.lang]["단어"] }}
              </p>
              <div
                id="contentscontainer"
                style="
                  background-color: #f1f8ff;
                  width: 95%;
                  height: 210px;
                  margin-top: 7px;
                  border-radius: 10px;
                  border: 1px solid #cae3ff;
                  overflow-y: scroll;
                "
              >
                <p
                  style="
                    padding: 10px;
                    padding-left: 15px;
                    font-family: notosansmedium;
                  "
                  v-for="(j, i) in lessondetail.words"
                  :key="i"
                >
                  {{ j.content }}
                </p>
              </div>
            </div>
            <div style="width: 60%; float: left; margin-left: 5px">
              <p
                style="
                  color: #636363;
                  font-size: 17px;
                  font-family: notosans;
                  margin-left: 10px;
                "
              >
                {{ langlist[$store.state.lang]["문장"] }}
              </p>
              <div
                id="contentscontainer"
                style="
                  background-color: #f1f8ff;
                  width: 110%;
                  height: 210px;
                  margin-top: 7px;
                  border-radius: 10px;
                  border: 1px solid #cae3ff;
                  overflow-y: scroll;
                "
              >
                <p
                  style="
                    padding: 10px;
                    padding-left: 15px;
                    font-family: notosansmedium;
                  "
                  v-for="(j, i) in lessondetail.sentences"
                  :key="i"
                >
                  {{ j.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 370px"></div>
      <div
        v-show="currentmission !== false"
        style="
          width: 100%;
          height: 150px;
          border-radius: 15px;
          background-color: #f1f8ff;
          border: 1px solid #cae3ff;
        "
      >
        <div
          style="
            float: left;
            font-family: notosansmedium;
            font-size: 16px;
            margin-top: 45px;
            margin-left: 30px;
          "
        >
          <p v-show="$store.state.lang === 'ko'">
            {{ currentmission.lesson }}단원 교사 미션이 설정되어 있습니다.
          </p>
          <p v-show="$store.state.lang !== 'ko'">
            The teacher mission for Lesson {{ currentmission.lesson }} is set
            up.
          </p>
          <!-- <p v-show="$store.state.lang !== 'ko'">
            {{
              langlist[$store.state.lang]["이미 교사 미션이 설정되어 있습니다."]
            }}
          </p> -->
          <p style="margin-top: 5px">
            {{
              langlist[$store.state.lang][
                "'수업 보기' 화면에서 상세 내용을 확인해주세요."
              ]
            }}
          </p>
        </div>
        <div style="float: right; margin-top: 55px; margin-right: 20px">
          <v-btn
            @click="goclassmanage()"
            width="170"
            height="50"
            variant="outlined"
            style="
              background-color: #258bff;
              color: white;
              font-family: notosansmedium;
              font-size: 14px;
              border-radius: 10px;
            "
            >{{ langlist[$store.state.lang]["수업보기 바로가기"] }}</v-btn
          >
          <v-btn
            @click="deletemission()"
            width="170"
            height="50"
            variant="outlined"
            style="
              border: 1px solid #636363;
              background-color: white;
              color: #636363;
              font-family: notosansmedium;
              font-size: 14px;
              border-radius: 10px;
              margin-left: 10px;
            "
            >{{ langlist[$store.state.lang]["교사 미션 삭제"] }}</v-btn
          >
        </div>
      </div>
      <div
        v-show="currentmission === false"
        style="width: 100%; margin-top: 0px"
      >
        <p style="font-family: notosans; font-size: 20px; color: #3480d8">
          ★&nbsp;&nbsp;{{ langlist[$store.state.lang]["교사 미션 생성"] }}
        </p>
        <div
          v-show="targetmissions.length === 0"
          style="
            margin-top: 15px;
            border: 1px solid #cae3ff;
            background-color: #f1f8ff;
            height: 750px;
            border-radius: 20px;
          "
        >
          <div style="padding: 30px">
            <p style="float: left; font-size: 21px; font-family: notosans">
              Step1
            </p>
            <p
              style="
                float: left;
                color: #3480d8;
                font-family: notosans;
                margin-left: 10px;
                margin-top: 8px;
              "
            >
              {{ langlist[$store.state.lang]["미션 선택"] }}
            </p>
          </div>
          <div
            style="
              width: 790px;
              height: 1px;
              background-color: #cae3ff;
              margin-left: 20px;
              margin-top: 20px;
            "
          ></div>
          <div
            id="step1"
            style="width: 800px; margin-left: 30px; margin-top: 30px"
          >
            <div id="step1-1" style="width: 51%; float: left">
              <div>
                <div
                  style="
                    float: left;
                    width: 15px;
                    height: 15px;
                    border-radius: 50px;
                    background-color: #258bff;
                    color: white;
                    text-align: center;
                    font-size: 11px;
                    margin-top: 5px;
                  "
                >
                  1
                </div>
                <p
                  style="
                    float: left;
                    font-size: 16px;
                    margin-left: 5px;
                    font-family: notosans;
                  "
                >
                  {{ langlist[$store.state.lang]["필수 : 액티비티 2~4개"] }}
                </p>
              </div>
              <div
                style="
                  background-color: white;
                  width: 100%;
                  height: 150px;
                  border-radius: 15px;
                  margin-top: 35px;
                  border: 1px solid #cae3ff;
                "
              >
                <div
                  style="
                    width: 25%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    @click="missionclick(0)"
                    class="listening planet"
                    :class="{
                      listeningclicked: missions[0].selected === true,
                    }"
                  ></div>
                  <p class="planettext">
                    {{ langlist[$store.state.lang]["듣기"] }}
                  </p>
                </div>
                <div
                  style="
                    width: 25%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    @click="missionclick(1)"
                    class="reading planet"
                    :class="{
                      readingclicked: missions[1].selected === true,
                    }"
                  ></div>
                  <p class="planettext">
                    {{ langlist[$store.state.lang]["읽기"] }}
                  </p>
                </div>
                <div
                  style="
                    width: 25%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    class="speaking planet"
                    @click="missionclick(2)"
                    :class="{
                      speakingclicked: missions[2].selected === true,
                    }"
                  ></div>
                  <p class="planettext">
                    {{ langlist[$store.state.lang]["말하기"] }}
                  </p>
                </div>
                <div
                  style="
                    width: 25%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    @click="missionclick(3)"
                    class="writing planet"
                    :class="{
                      writingclicked: missions[3].selected === true,
                    }"
                  ></div>
                  <p class="planettext">
                    {{ langlist[$store.state.lang]["쓰기"] }}
                  </p>
                </div>
              </div>
              <div
                style="
                  font-size: 12px;
                  margin-left: 5px;
                  margin-top: 5px;
                  font-family: notosans;
                "
              >
                <p style="float: left; color: #6da4e2">
                  {{ langlist[$store.state.lang]["미션 순서"] }}
                </p>
                <p style="float: left; margin-left: 10px; color: #a3b5d0">
                  {{
                    langlist[$store.state.lang][
                      "듣기-읽기-말하기-쓰기-AI 대화 순으로 자동 설정됩니다."
                    ]
                  }}
                </p>
              </div>
            </div>
            <div
              id="step1-2"
              style="width: 31%; float: left; margin-left: 10px"
            >
              <div>
                <div
                  style="
                    float: left;
                    width: 15px;
                    height: 15px;
                    border-radius: 50px;
                    background-color: #258bff;
                    color: white;
                    text-align: center;
                    font-size: 11px;
                    margin-top: 5px;
                  "
                >
                  2
                </div>
                <p
                  style="
                    float: left;
                    font-size: 16px;
                    margin-left: 5px;
                    font-family: notosans;
                  "
                >
                  {{ langlist[$store.state.lang]["선택 : AI대화 1개"] }}
                </p>
              </div>
              <div
                style="
                  background-color: white;
                  width: 145%;
                  height: 150px;
                  border-radius: 15px;
                  margin-top: 35px;
                  border: 1px solid #cae3ff;
                "
              >
                <div
                  style="
                    width: 30%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    class="book planet"
                    @click="missionclick(4)"
                    :class="{
                      bookclicked: missions[4].selected === true,
                    }"
                    style="margin-left: 23px"
                  ></div>
                  <p class="planettext" style="font-size: 14px">
                    {{ langlist[$store.state.lang]["교과서 대화"] }}
                  </p>
                </div>
                <div
                  style="
                    width: 34%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    class="conicon planet"
                    @click="missionclick(5)"
                    :class="{
                      coniconclicked: missions[5].selected === true,
                    }"
                    style="margin-left: 23px"
                  ></div>
                  <p class="planettext" style="font-size: 14px">
                    {{ langlist[$store.state.lang]["GPT 교과 주제대화"] }}
                  </p>
                </div>
                <div
                  style="
                    width: 34%;
                    height: 100%;
                    float: left;
                    text-align: center;
                  "
                >
                  <div
                    class="tomytomy planet"
                    @click="missionclick(6)"
                    :class="{
                      tomytomyclicked: missions[6].selected === true,
                    }"
                    style="margin-left: 23px"
                  ></div>
                  <p class="planettext" style="font-size: 14px">
                    {{ langlist[$store.state.lang]["GPT 교과 자유대화"] }}
                  </p>
                </div>
              </div>
              <div
                style="
                  font-size: 12px;
                  margin-left: 5px;
                  margin-top: 5px;
                  font-family: notosans;
                  width: 170%;
                "
              >
                <p style="float: left; color: #6da4e2">
                  {{ langlist[$store.state.lang]["GPT 교과 자유대화"] }}
                </p>
                <p style="float: left; margin-left: 10px; color: #a3b5d0">
                  {{
                    langlist[$store.state.lang][
                      "교사 설정 주제가 있다면, 교사 설정 주제로 진행됩니다."
                    ]
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- step2 -->
          <div
            id="step2"
            style="width: 800px; margin-left: 15px; margin-top: 270px"
          >
            <div style="padding: 10px; padding-left: 12px">
              <p style="float: left; font-size: 21px; font-family: notosans">
                Step2
              </p>
              <p
                style="
                  float: left;
                  color: #3480d8;
                  font-family: notosans;
                  margin-left: 10px;
                  margin-top: 8px;
                "
              >
                {{ langlist[$store.state.lang]["횟수 설정"] }}
              </p>
            </div>
            <div
              style="
                width: 100%;
                height: 1px;
                background-color: #cae3ff;
                margin-top: 40px;
              "
            ></div>
            <div
              id="step2-content"
              style="width: 800px; margin-left: 15px; margin-top: 17px"
            >
              <div>
                <div
                  style="
                    float: left;
                    width: 15px;
                    height: 15px;
                    border-radius: 50px;
                    background-color: #258bff;
                    color: white;
                    text-align: center;
                    font-size: 11px;
                    margin-top: 5px;
                  "
                >
                  1
                </div>
                <p
                  style="
                    float: left;
                    font-size: 16px;
                    margin-left: 5px;
                    font-family: notosans;
                  "
                >
                  {{ langlist[$store.state.lang]["미션별 횟수 설정 (1-3회)"] }}
                </p>
              </div>
            </div>
            <div
              id="step2-content2"
              style="
                width: 790px;
                margin-left: 5px;
                background-color: white;
                border: 1px solid #cae3ff;
                border-radius: 20px;
                height: 200px;
                margin-top: 50px;
              "
            >
              <!-- {{ selectedmissions() }} -->
              <div
                style="
                  width: 730px;
                  height: 150px;
                  margin-left: 30px;
                  margin-top: 35px;
                "
              >
                <v-row
                  style="width: 730px; height: 150px; text-align: center"
                  justify="center"
                >
                  <div
                    v-show="missions[0].selected === true"
                    style="width: 15%; height: 100%; float: left"
                  >
                    <div class="listening planet" style="width: 75%"></div>
                    <p class="planettext">
                      {{ langlist[$store.state.lang]["듣기"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 1px;
                        margin-top: 5px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 0)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[0].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 0)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missions[1].selected === true"
                    style="
                      width: 15%;
                      height: 100%;
                      float: left;
                      margin-left: 10px;
                    "
                  >
                    <div class="reading planet" style="width: 75%"></div>
                    <p class="planettext">
                      {{ langlist[$store.state.lang]["읽기"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 1px;
                        margin-top: 5px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 1)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[1].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 1)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missions[2].selected === true"
                    style="
                      width: 15%;
                      height: 100%;
                      float: left;
                      margin-left: 10px;
                    "
                  >
                    <div class="speaking planet" style="width: 75%"></div>
                    <p class="planettext">
                      {{ langlist[$store.state.lang]["말하기"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 1px;
                        margin-top: 5px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 2)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[2].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 2)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missions[3].selected === true"
                    style="
                      width: 15%;
                      height: 100%;
                      float: left;
                      margin-left: 10px;
                    "
                  >
                    <div class="writing planet" style="width: 75%"></div>
                    <p class="planettext">
                      {{ langlist[$store.state.lang]["쓰기"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 1px;
                        margin-top: 5px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 3)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[3].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 3)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missions[4].selected === true"
                    style="
                      width: 20%;
                      height: 100%;
                      float: left;
                      margin-top: -5px;
                    "
                  >
                    <div
                      class="book planet"
                      style="width: 60%; margin-left: 35px"
                    ></div>
                    <p
                      :class="{
                        aitexttextbook: $store.state.lang === 'ko',
                        aitexttextbookvt: $store.state.lang !== 'ko',
                      }"
                    >
                      {{ langlist[$store.state.lang]["교과서 대화"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 20px;
                        margin-top: 135px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 4)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[4].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 4)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missions[5].selected === true"
                    style="
                      width: 20%;
                      height: 100%;
                      float: left;
                      margin-top: -5px;
                    "
                  >
                    <div
                      class="conicon planet"
                      style="width: 55%; margin-left: 33px"
                    ></div>
                    <p
                      :class="{
                        aitextsubject: $store.state.lang === 'ko',
                        aitextsubjectvt: $store.state.lang !== 'ko',
                      }"
                    >
                      {{ langlist[$store.state.lang]["GPT 교과 주제대화"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 20px;
                        margin-top: 135px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 5)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[5].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 5)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-show="missions[6].selected === true"
                    style="
                      width: 20%;
                      height: 100%;
                      float: left;
                      margin-top: -5px;
                      text-align: center;
                    "
                  >
                    <div
                      class="tomytomy planet"
                      style="width: 55%; margin-left: 33px"
                    ></div>
                    <p
                      :class="{
                        aitextfree: $store.state.lang === 'ko',
                        aitextfreevt: $store.state.lang !== 'ko',
                      }"
                      style=""
                    >
                      {{ langlist[$store.state.lang]["GPT 교과 자유대화"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 20px;
                        margin-top: 135px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 6)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 2px">
                          {{ missions[6].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 6)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-show="missionscheck() === true"
                    style="
                      width: 16%;
                      height: 100%;
                      float: left;
                      margin-top: -5px;
                      margin-left: -13px;
                    "
                  >
                    <div
                      class="custommission planet"
                      style="width: 80%; margin-left: 30px"
                    ></div>
                    <p
                      :class="{
                        aitextpersonal: $store.state.lang === 'ko',
                        aitextpersonalvt: $store.state.lang !== 'ko',
                      }"
                      style="font-size: 14px; margin-top: 11px"
                    >
                      {{ langlist[$store.state.lang]["개별 맞춤 미션"] }}
                    </p>
                    <div
                      id="plusminusbtn"
                      style="
                        width: 109px;
                        height: 30px;
                        margin-left: 21px;
                        margin-top: 132px;
                        border: 1px solid #cae3ff;
                        font-family: notosans;
                      "
                    >
                      <div
                        class="minusbtn"
                        @click="missioncount('minus', 7)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-right: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -3px;
                            color: #3480d8;
                          "
                        >
                          -
                        </p>
                      </div>
                      <div style="float: left; text-align: center; width: 50px">
                        <p style="margin-top: 3px">
                          {{ missions[7].count }}
                        </p>
                      </div>
                      <div
                        class="plusbtn"
                        @click="missioncount('plus', 7)"
                        style="
                          width: 28px;
                          height: 100%;
                          float: left;
                          text-align: center;
                          border-left: 1px solid #cae3ff;
                        "
                      >
                        <p
                          style="
                            font-size: 20px;
                            margin-top: -1px;
                            color: #3480d8;
                          "
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                </v-row>
                <!-- <div style="position: absolute; left: 50%; height: 100%">
                  
                </div> -->
              </div>
            </div>
            <div
              style="
                font-family: notosansmedium;
                font-size: 14px;
                margin-left: 15px;
                margin-top: 15px;
              "
            >
              <div>
                <p style="float: left; color: #6da4e2">
                  {{ langlist[$store.state.lang]["GPT 대화 횟수"] }}
                </p>
                <p style="float: left; margin-left: 10px">
                  {{
                    langlist[$store.state.lang][
                      "미션 1회는 5턴 대화입니다. 예를 들어, 2회 설정 시 10턴 대화 미션이 설정됩니다."
                    ]
                  }}
                </p>
              </div>
              <br />
              <div style="margin-top: 7px">
                <p style="float: left; color: #6da4e2">
                  {{ langlist[$store.state.lang]["개별 맞춤 미션"] }}
                </p>
                <p style="float: left; margin-left: 10px">
                  {{
                    langlist[$store.state.lang][
                      "액티비티 학습 결과를 바탕으로 맞춤 학습 미션을 제시합니다."
                    ]
                  }}
                </p>
              </div>
            </div>
          </div>
          <v-row
            style="margin-top: 100px; font-family: notosans"
            justify="center"
          >
            <v-btn
              @click="initmissions()"
              style="
                border: 1px solid #3480d8;
                background-color: white;
                color: #3480d8;
                font-size: 15px;
                border-radius: 15px;
              "
              width="200"
              height="60"
              variant="outlined"
              >{{ langlist[$store.state.lang]["초기화"] }}</v-btn
            >
            <v-btn
              @click="missionestimate()"
              width="200"
              height="60"
              variant="outlined"
              style="
                margin-left: 20px;
                border: 1px solid white;
                background-color: #3480d8;
                color: white;
                font-size: 15px;
                border-radius: 15px;
              "
              >{{ langlist[$store.state.lang]["미션 견적내기"] }}</v-btn
            >
          </v-row>
        </div>

        <!-- step3 -->
        <div v-show="targetmissions.length > 0">
          <lessonresult
            :targetmissions="targetmissions"
            :lessonindex="lessoninfo.index + 1"
          ></lessonresult>
        </div>
      </div>
      <div style="height: 30px" v-show="currentmission !== false"></div>
      <div style="height: 150px" v-show="currentmission === false"></div>
      <div style="width: 100%; margin-top: 40px">
        <div style="width: 100%">
          <div>
            <div class="docicon"></div>
            <p
              style="
                float: left;
                font-family: notosans;
                font-size: 20px;
                margin-left: 5px;
                color: #3480d8;
              "
            >
              {{ langlist[$store.state.lang]["교사 미션 기록"] }}
            </p>
          </div>
          <br />
          <br />
          <p
            style="
              margin-top: -15px;
              margin-left: 5px;
              font-family: notosansregular;
              font-size: 15px;
            "
          >
            {{
              langlist[$store.state.lang][
                "'완료' 처리된 미션을 확인할 수 있습니다."
              ]
            }}
          </p>
        </div>
      </div>
      <div style="height: 15px"></div>
      <table
        style="
          width: 100%;
          text-align: center;
          border-bottom: 1px solid #cae3ff;
          border-spacing: 0;
        "
      >
        <tr>
          <td class="tabletd" style="border-top-left-radius: 10px">no</td>
          <td class="tabletd">{{ langlist[$store.state.lang]["날짜"] }}</td>
          <td class="tabletd">{{ langlist[$store.state.lang]["단원"] }}</td>
          <td class="tabletd" style="width: 350px">
            {{ langlist[$store.state.lang]["주제"] }}
          </td>
          <td class="tabletd">{{ langlist[$store.state.lang]["보상"] }}</td>
          <td
            class="tabletd"
            style="
              border-right: 1px solid #cae3ff;
              border-top-right-radius: 10px;
              width: 90px;
            "
          >
            {{ langlist[$store.state.lang]["평균 미션 진행률"] }}
          </td>
        </tr>
        <tr v-for="(j, i) in missionhistory" :key="i">
          <td class="tabletd2">{{ (i + 1).toString().padStart(2, "0") }}</td>
          <td class="tabletd2">{{ missiondate(j.date) }}</td>
          <td class="tabletd2">{{ missionLesson(j.lesson) }}</td>
          <td class="tabletd2">{{ missiontopic(j.content) }}</td>
          <td class="tabletd2">
            <div
              v-html="
                missionreward(
                  j.listenStone,
                  j.readStone,
                  j.speakStone,
                  j.writeStone,
                  j.gold
                )
              "
            ></div>
          </td>
          <td class="tabletd2 tabletd2last">{{ j.progress }}%</td>
        </tr>
      </table>
      <div style="height: 30px"></div>
    </div>
    <v-dialog persistent width="500" v-model="deletemissionmodal">
      <div
        v-show="deletemissionmodal2 === false"
        style="
          width: 500px;
          height: 300px;
          background-color: white;
          text-align: center;
          font-family: notosansregular;
          border-radius: 15px;
        "
      >
        <p style="margin-top: 50px; font-family: notosans; font-size: 25px">
          {{ langlist[$store.state.lang]["미션 삭제"] }}
        </p>
        <p style="font-size: 18px; color: red; margin-top: 30px">
          {{
            langlist[$store.state.lang][
              "현재 진행중인 미션과 개별 미션 기록이 삭제됩니다."
            ]
          }}
        </p>
        <p style="font-size: 18px; color: red">
          {{
            langlist[$store.state.lang]["학습한 내역은 정상적으로 기록됩니다."]
          }}
        </p>
        <v-row style="margin-top: 50px" justify="center">
          <v-btn
            variant="outlined"
            @click="deletemissioncancel()"
            width="200"
            height="50"
            style="
              background-color: white;
              border: 1px solid #636363;
              color: black;
              font-size: 18px;
              font-family: notosansregular;
              border-radius: 15px;
              margin-right: 20px;
            "
          >
            {{ langlist[$store.state.lang]["취소"] }}
          </v-btn>
          <v-btn
            variant="outlined"
            @click="deletemissioncheckcheck()"
            width="200"
            height="50"
            style="
              background-color: #258bff;
              color: white;
              font-size: 18px;
              font-family: notosansregular;
              border-radius: 15px;
            "
          >
            {{ langlist[$store.state.lang]["확인"] }}
          </v-btn>
        </v-row>
      </div>
      <div
        v-show="deletemissionmodal2 === true"
        style="
          width: 500px;
          height: 300px;
          background-color: white;
          text-align: center;
          font-family: notosansregular;
          border-radius: 15px;
        "
      >
        <p style="margin-top: 50px; font-family: notosans; font-size: 25px">
          {{ langlist[$store.state.lang]["삭제 성공"] }}
        </p>
        <p style="font-size: 18px; color: black; margin-top: 30px">
          {{ langlist[$store.state.lang]["교사 미션이 삭제되었습니다."] }}
        </p>
        <p style="font-size: 18px; color: black">
          {{
            langlist[$store.state.lang][
              "원활한 이용을 위해 모든 반 학생 접속을 종료합니다."
            ]
          }}
        </p>
        <v-row style="margin-top: 50px" justify="center">
          <v-btn
            variant="outlined"
            @click="deletemissioncheck()"
            width="200"
            height="50"
            style="
              background-color: #258bff;
              color: white;
              font-size: 18px;
              font-family: notosansregular;
              border-radius: 15px;
            "
          >
            {{ langlist[$store.state.lang]["확인"] }}
          </v-btn>
        </v-row>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import {
  lessondetailinfo,
  getnewmission,
  getcurrentmission,
  userInfo,
} from "../../api/api-list";
import lessonresult from "./lessonresult.vue";
import { deleteteachermission, getstudentslist } from "../../api/api-list-2";

import { classsetting_vt } from "../../assets/translate/vt";
import { classsetting_ko } from "../../assets/translate/ko";

export default {
  data() {
    return {
      langlist: {
        ko: classsetting_ko,
        vt: classsetting_vt,
      },
      lessondetail: { words: [], sentences: [] },
      missions: [],
      targetmissions: [],
      // targetmissions: [
      //   {
      //     index: 0,
      //     category: "listening",
      //     kor: "듣기",
      //     selected: false,
      //     count: 1,
      //     required: true,
      //   },
      //   {
      //     index: 1,
      //     category: "reading",
      //     kor: "읽기",
      //     selected: false,
      //     count: 1,
      //     required: true,
      //   },
      //   {
      //     index: 2,
      //     category: "speaking",
      //     kor: "말하기",
      //     selected: false,
      //     count: 1,
      //     required: true,
      //   },
      //   {
      //     index: 3,
      //     category: "writing",
      //     kor: "쓰기",
      //     selected: false,
      //     count: 1,
      //     required: true,
      //   },

      //   {
      //     index: 5,
      //     category: "aifreetalk",
      //     kor: "GPT 교과 주제대화",
      //     selected: false,
      //     count: 1,
      //     required: false,
      //   },

      //   {
      //     index: 7,
      //     category: "personal",
      //     kor: "개별 맞춤 미션",
      //     selected: false,
      //     count: 1,
      //     required: false,
      //   },
      // ],
      isestimated: false,
      missionhistory: [],
      currentmission: {
        lesson: -1,
      },
      userinfo2: {},
      deletemissionmodal: false,
      deletemissionmodal2: false,
    };
  },
  components: {
    lessonresult,
  },
  async created() {
    this.missions = [
      {
        index: 0,
        category: "listening",
        kor: this.langlist[this.$store.state.lang]["듣기"],
        selected: false,
        count: 1,
        time: 40,
        required: true,
      },
      {
        index: 1,
        category: "reading",
        kor: this.langlist[this.$store.state.lang]["읽기"],
        selected: false,
        count: 1,
        time: 50,
        required: true,
      },
      {
        index: 2,
        category: "speaking",
        kor: this.langlist[this.$store.state.lang]["말하기"],
        selected: false,
        count: 1,
        time: 80,
        required: true,
      },
      {
        index: 3,
        category: "writing",
        kor: this.langlist[this.$store.state.lang]["쓰기"],
        selected: false,
        count: 1,
        time: 60,
        required: true,
      },
      {
        index: 4,
        category: "booktalk",
        kor: this.langlist[this.$store.state.lang]["교과서 대화"],
        selected: false,
        count: 1,
        time: 30,
        required: false,
      },
      {
        index: 5,
        category: "aibooktalk",
        kor: this.langlist[this.$store.state.lang]["GPT 교과 주제대화"],
        selected: false,
        count: 1,
        time: 50,
        required: false,
      },
      {
        index: 6,
        category: "aifreetalk",
        kor: this.langlist[this.$store.state.lang]["GPT 교과 자유대화"],
        selected: false,
        count: 1,
        time: 50,
        required: false,
      },
      {
        index: 7,
        category: "personal",
        kor: this.langlist[this.$store.state.lang]["개별 맞춤 미션"],
        selected: false,
        count: 1,
        time: 60,
        required: false,
      },
    ];

    const res = await lessondetailinfo(this.lessoninfo.index + 1);
    const lessondetail = res.data.data;
    this.lessondetail.words = lessondetail.filter(
      (item) => item.category === "word"
    );
    this.lessondetail.sentences = lessondetail.filter(
      (item) => item.category === "sentence"
    );

    const res2 = await getnewmission();
    this.missionhistory = res2.data.data;

    const res3 = await getcurrentmission();
    this.currentmission = res3.data.data;
    window.addEventListener("init", this.handleinit);
    window.addEventListener("openmission", this.handleopenmission);

    const userinfo = (await userInfo()).data.data;
    this.userinfo2 = userinfo;

    this.socket = this.$socket;

    const info = {
      userId: userinfo.id,
      schoolCode: userinfo.schoolCode,
      grade: userinfo.grade,
      classNum: userinfo.classNum,
    };

    this.socket.on("accessSuccess", (message) => {});
    this.socket.emit("access", JSON.stringify(info));
  },
  props: {
    progresses: {
      type: Array,
    },
    lessoninfo: {
      required: true,
    },
    userinfo: {
      required: true,
    },
  },
  methods: {
    handleopenmission(event) {
      const lesson = event.detail.lesson;
      this.currentmission = {};
      this.currentmission.lesson = lesson;
    },
    handleinit(event) {
      this.targetmissions = [];
    },
    initmissions() {
      for (let i = 0; i < this.missions.length; i++) {
        this.missions[i].selected = false;
        this.missions[i].count = 1;
      }
    },
    setnum(n) {
      return n.toString().padStart(2, "0");
    },
    missionclick(index) {
      if (index > 3) {
        for (let i = 4; i < 7; i++) {
          if (i === index) {
            continue;
          }
          this.missions[i].selected = false;
        }
      }
      this.missions[index].selected = !this.missions[index].selected;
    },
    selectedmissions() {
      const missions = this.missions.filter((item) => item.selected === true);
      return missions.sort((a, b) => a.index < b.index);
    },
    missioncount(type, index) {
      if (type == "plus") {
        if (this.missions[index].count === 3) {
          return;
        }
        this.missions[index].count += 1;
      } else {
        if (this.missions[index].count === 1) {
          return;
        }
        this.missions[index].count -= 1;
      }
    },
    missionestimate() {
      // window.dispatchEvent(
      //   new CustomEvent("error", {
      //     detail: {
      //       status: true,
      //       text: [
      //         "현재 교사미션 오류가 있어, 시스템 점검중입니다.",
      //         "이용에 불편을 드려 죄송합니다.",
      //         "빠르게 복구 후, 공지드리겠습니다. 감사합니다.",
      //       ],
      //     },
      //   })
      // );

      // return;

      const target = this.selectedmissions();

      const requires = target.filter((item) => item.required === true);

      if (requires.length < 2) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "필수 미션을 2개 이상 설정해주세요."
                ],
              ],
            },
          })
        );
      } else {
        this.targetmissions = this.selectedmissions();
        this.targetmissions.push(this.missions[this.missions.length - 1]);
        this.isestimated = true;
      }
    },
    missionscheck() {
      const missions = this.missions.filter((item) => item.selected === true);
      const temp = missions.filter((item) => item.required === true);
      if (temp.length < 2) {
        return false;
      } else {
        return true;
      }
    },
    missiondate(text) {
      const date = new Date(text);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const day2 = date.getDay();

      const langlist = this.langlist[this.$store.state.lang];

      const arr = [
        langlist["일"],
        langlist["월"],
        langlist["화"],
        langlist["수"],
        langlist["목"],
        langlist["금"],
        langlist["토"],
      ];
      return `${year}.${month.toString().padStart(2, "0")}.${day
        .toString()
        .padStart(2, "0")} (${arr[day2]})`;
    },
    missionLesson(lesson) {
      if (this.$store.state.lang === "ko") {
        return `${lesson}단원`;
      } else {
        return `lesson ${lesson}`;
      }
    },
    missiontopic(data) {
      const langlist = this.langlist[this.$store.state.lang];

      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "listening") {
          arr.push(
            `${langlist["듣기"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "reading") {
          arr.push(
            `${langlist["읽기"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "speaking") {
          arr.push(
            `${langlist["말하기"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "writing") {
          arr.push(
            `${langlist["쓰기"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "book") {
          arr.push(
            `${langlist["AI 대화"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "gpt") {
          arr.push(
            `${langlist["AI 대화"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
        if (data[i].type === "free") {
          arr.push(
            `${langlist["AI 대화"]} ${data[i].requireNum}${langlist["회"]}`
          );
          continue;
        }
      }

      return arr.join(", ");
    },
    missionreward(a, b, c, d, e) {
      const langlist = this.langlist[this.$store.state.lang];

      const stone_sum = `<p>${langlist["스톤"]} ${a + b + c + d}</p>`;
      const gold = `<p style="margin-top:5px">${langlist["골드"]} ${e}</p>`;

      let arr = [];
      if (a + b + c + d) {
        arr.push(stone_sum);
      }

      if (e) {
        arr.push(gold);
      }

      return arr.join("");
    },
    goclassmanage() {
      this.$router.push({ path: "/view-class/main" });
    },
    deletemission() {
      this.deletemissionmodal = true;
    },
    deletemissioncancel() {
      this.deletemissionmodal = false;
    },
    async deletemissioncheckcheck() {
      const res = await getstudentslist();
      const students = res.data.data;
      for (let i = 0; i < students.length; i++) {
        this.socket.emit("deleteCompleteTeacherMission", { id: students[i] });
      }

      await deleteteachermission();
      this.deletemissionmodal2 = true;
      this.currentmission = false;
    },
    async deletemissioncheck() {
      this.socket.emit(
        "userConnectionTerminate",
        JSON.stringify({
          schoolCode: this.userinfo2.schoolCode,
          grade: this.userinfo2.grade,
          classNum: this.userinfo2.classNum,
        })
      );
      this.deletemissionmodal = false;
      this.deletemissionmodal2 = false;
      setTimeout(() => {
        location.reload(true);
      }, 500);
    },
  },
  watch: {
    async lessoninfo() {
      const res = await lessondetailinfo(this.lessoninfo.index + 1);
      const lessondetail = res.data.data;
      this.lessondetail.words = lessondetail.filter(
        (item) => item.category === "word"
      );
      this.lessondetail.sentences = lessondetail.filter(
        (item) => item.category === "sentence"
      );
    },
  },
};
</script>

<style scoped>
#contentscontainer::-webkit-scrollbar {
  width: 10px;
}

#contentscontainer::-webkit-scrollbar-thumb {
  background-color: #cae3ff;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.tabletd {
  padding: 15px;
  border: 1px solid #cae3ff;
  font-family: notosans;
  font-size: 14px;
  color: #636363;
  border-right: none;
  border-bottom: none;
  background-color: #f1f8ff;
}

.tabletd2 {
  padding: 20px;
  border: 1px solid #cae3ff;
  font-family: notosansregular;
  font-size: 14px;
  border-right: none;
  border-bottom: none;
}

.listening {
  background-image: url("../../assets/image/ListeningPlanet.png");
}

.reading {
  background-image: url("../../assets/image/ReadingPlanet.png");
}

.speaking {
  background-image: url("../../assets/image/SpeakingPlanet.png");
}

.writing {
  background-image: url("../../assets/image/WritingPlanet.png");
}

.book {
  background-image: url("../../assets/image/book.png");
}

.conicon {
  background-image: url("../../assets/image/conicon.png");
}

.tomytomy {
  background-image: url("../../assets/image/tomytomy.png");
}

.custommission {
  background-image: url("../../assets/image/CustomMission.png");
}

.listeningclicked {
  background-image: url("../../assets/image/ListeningPlanetClicked.png");
}

.readingclicked {
  background-image: url("../../assets/image/ReadingPlanetClicked.png");
}

.speakingclicked {
  background-image: url("../../assets/image/SpeakingPlanetClicked.png");
}

.writingclicked {
  background-image: url("../../assets/image/WritingPlanetClicked.png");
}

.bookclicked {
  background-image: url("../../assets/image/bookClicked.png");
}

.coniconclicked {
  background-image: url("../../assets/image/coniconClicked.png");
}

.tomytomyclicked {
  background-image: url("../../assets/image/tomytomyClicked.png");
}

.planet {
  background-size: 100%;
  width: 75px;
  height: 75px;
  border-radius: 80px;
  cursor: pointer;
  float: left;
  margin-left: 15px;
  margin-top: 20px;
}

.planet:hover {
  filter: brightness(0.5);
}

.planettext {
  margin-top: 100px;
  font-size: 15px;
  font-family: notosans;
}

.aitext {
  float: left;
  margin-left: 35px;
  font-size: 13px;
  font-family: notosans;
}

.aitexttextbook {
  float: left;
  margin-left: 40px;
  font-size: 14px;
  font-family: notosans;
  margin-top: 11px;
}

.aitexttextbookvt {
  float: left;
  margin-left: 30px;
  font-size: 14px;
  font-family: notosans;
  margin-top: 11px;
}

.aitextsubject {
  float: left;
  font-size: 14px;
  margin-top: 11px;
  margin-left: 23px;
  font-family: notosans;
}

.aitextsubjectvt {
  float: left;
  margin-left: 35px;
  font-size: 14px;
  font-family: notosans;
  margin-top: 11px;
}

.aitextfree {
  float: left;
  font-size: 14px;
  margin-top: 11px;
  margin-left: 23px;
  font-family: notosans;
}

.aitextfreevt {
  float: left;
  font-size: 14px;
  margin-top: 11px;
  margin-left: 45px;
  font-family: notosans;
}

.aitextpersonal {
  float: left;
  font-size: 14px;
  margin-top: 11px;
  margin-left: 35px;
  font-family: notosans;
}

.aitextpersonalvt {
  float: left;
  font-size: 14px;
  margin-top: 11px;
  margin-left: 45px;
  font-family: notosans;
}

.minusbtn {
  cursor: pointer;
}

.plusbtn {
  cursor: pointer;
}

.docicon {
  background-image: url("../../assets/image/docicon.png");
  background-size: 100%;
  width: 29px;
  height: 27px;
  float: left;
  margin-top: 1px;
}

.tabletd2last {
  border-right: 1px solid #cae3ff;
}
</style>