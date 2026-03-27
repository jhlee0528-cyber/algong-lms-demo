<template>
  <div class="container">
    <div>
      <h4 class="headline">
        {{ langlist[$store.state.lang]["계약 정보"] }}
      </h4>
      <span class="text">
        {{
          langlist[$store.state.lang][
            "학교 계약 정보를 한눈에 확인할 수 있습니다."
          ]
        }}
      </span>
    </div>

    <div class="card">
      <h6 class="headline2">{{ langlist[$store.state.lang]["학교 정보"] }}</h6>

      <table>
        <tr>
          <th class="tabletd tabletopleft">
            {{ langlist[$store.state.lang]["교육청"] }}
          </th>
          <th class="tabletd">
            {{ langlist[$store.state.lang]["학교 이름"] }}
          </th>
          <th class="tabletd">{{ langlist[$store.state.lang]["코드"] }}</th>
          <th class="tabletd">
            {{ langlist[$store.state.lang]["결제 상태"] }}
          </th>
          <th class="tabletd">
            {{ langlist[$store.state.lang]["계정발급 상태"] }}
          </th>
          <th class="tabletd">{{ langlist[$store.state.lang]["요금제"] }}</th>
          <th class="tabletd tabletopright">
            {{ langlist[$store.state.lang]["결제방법"] }}
          </th>
        </tr>
        <tr>
          <td>
            {{ schoolinfo.office || "-" }}
          </td>
          <td>
            {{ schoolinfo.schoolName }}
            {{ langlist[$store.state.lang]["초등학교"] }}
          </td>
          <td>{{ schoolinfo.schoolCode }}</td>
          <td>{{ schoolinfo.payStatus || "-" }}</td>
          <td>{{ schoolinfo.accountStatus || "-" }}</td>
          <td>{{ getPlan(schoolinfo.payPlan) }}</td>
          <td>
            {{ schoolinfo.payType || "-" }}
          </td>
        </tr>
      </table>
    </div>

    <div class="card">
      <h6 class="headline2">
        {{ langlist[$store.state.lang]["계약 상세"] }}
      </h6>

      <table>
        <tr>
          <th>
            {{ langlist[$store.state.lang]["계약 시작일"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["계약 만료일"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["특이사항"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["계약 학생 수"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["현재 학생 수"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["학급수"] }}
          </th>
        </tr>
        <tr v-for="(j, i) in contracts" :key="i">
          <td>
            {{ j.startDate }}
          </td>
          <td>{{ j.endDate }}</td>
          <td>{{ vacationtext(j.vacation) }}</td>
          <td>{{ j.contractStudentNumber }}</td>
          <td>{{ j.currentStudentNumber }}</td>
          <td>
            {{ j.classCount }}
          </td>
        </tr>
      </table>
    </div>

    <div class="card">
      <h6 class="headline2">
        {{ langlist[$store.state.lang]["학급 정보"] }}
      </h6>

      <table>
        <tr>
          <th>
            {{ langlist[$store.state.lang]["학년"] }}
          </th>
          <th>{{ langlist[$store.state.lang]["반"] }}</th>
          <th>{{ langlist[$store.state.lang]["출판사"] }}</th>
          <th>
            {{ langlist[$store.state.lang]["학생 수"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["영어교사"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["담임교사"] }}
          </th>
        </tr>
        <tr v-for="(j, i) in classes" :key="i">
          <td>
            {{ j.grade }}
          </td>
          <td>{{ j.classNum }}</td>
          <td>{{ j.publisher }}</td>
          <td>{{ j.student }}</td>
          <td>{{ j.teacher }}</td>
          <td>
            {{ j.teacher }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { schoolinfo, contractinfo, classinfo } from "../../api/api-list-2.js";
import { setting_contract_vt } from "../../assets/translate/vt";
import { setting_contract_ko } from "../../assets/translate/ko";

export default {
  async created() {
    const res = await schoolinfo();
    const res2 = await contractinfo();
    const res3 = await classinfo();

    this.schoolinfo = res.data.data;
    this.contracts = [res2.data.data];
    this.classes = res3.data.data;
  },
  data() {
    return {
      langlist: {
        ko: setting_contract_ko,
        vt: setting_contract_vt,
      },
      schoolinfo: "",
      contracts: [],
      classes: [],
    };
  },
  methods: {
    vacationtext(bool) {
      if (!bool) {
        return this.langlist[this.$store.state.lang]["방학기간 서비스 이용"];
      } else {
        return this.langlist[this.$store.state.lang][
          "방학기간 서비스 이용 중단"
        ];
      }
    },
    getPlan(res) {
      if (!res) {
        return "-";
      } else if (res === "s" || res === "m") {
        return "Standard";
      } else if (res === "b") {
        return "Basic";
      } else {
        return "Premium";
      }
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
  gap: 30px;
}
.card {
  width: 100%;
  padding: 32px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
table {
  width: 100%;
  text-align: center;
  border: 1px solid #cae3ff;
  overflow: hidden;
  border-spacing: 0;
  border-radius: 16px;

  th,
  td {
    padding: 15px;
  }

  th {
    font-family: notosans;
    font-size: 14px;
    border-right: none;
    background-color: #f1f8ff;
    color: #66686b;

    &:first-child {
      border-top-left-radius: 15px;
    }
    &:last-child {
      border-top-right-radius: 15px;
    }
  }

  td {
    font-family: notosansregular;
    font-size: 14px;
    color: #292929;
    border-bottom: 1px solid #cae3ff;
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>
