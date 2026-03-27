<template>
  <footer>
    <ul class="privacy">
      <li>
        <a
          target="_blank"
          href="https://argame3.blob.core.windows.net/policy/argong3PrivacyPolicy.html"
          >{{ langlist[store.state.lang]["개인정보처리방침"] }}</a
        >
      </li>
      <li>
        <a
          target="_blank"
          href="https://argame3.blob.core.windows.net/policy/%EC%95%8C%EA%B3%B5%20%EC%84%9C%EB%B9%84%EC%8A%A4%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80_v1.html"
          >{{ langlist[store.state.lang]["이용약관"] }}</a
        >
      </li>
      <li>
        <a
          target="_blank"
          href="https://dnsoft.notion.site/6107f152447b45008772588e07d55d3a"
          >{{ langlist[store.state.lang]["운영정책"] }}</a
        >
      </li>
    </ul>
    <ul class="info">
      <li>{{ langlist[store.state.lang]["사업자 등록번호"] }} : 108-9605434</li>
      <li>
        {{ langlist[store.state.lang]["통신판매업신고번호"] }} :
        {{ langlist[store.state.lang]["2023-서울금천-제0177 호"] }}
      </li>
    </ul>
    <ul class="info">
      <li>{{ langlist[store.state.lang]["이메일"] }} : support@dnsoft.co.kr</li>
      <li>{{ langlist[store.state.lang]["연락처"] }} : 02-837-8313</li>
      <li>{{ langlist[store.state.lang]["팩스"] }} : 02-6280-8326</li>
      <li>
        {{ langlist[store.state.lang]["주소"] }}
        :
        {{
          langlist[store.state.lang][
            "서울시 금천구 디지털 9길 46 이엔씨드림타워 7차 503호"
          ]
        }}
      </li>
    </ul>
    <h3>ⓒ {{ year }} DNSOFT co. ltd. All rights reserved</h3>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { footer_ko } from "../../assets/translate/ko";
import { footer_vt } from "../../assets/translate/vt";
import store from "../../store";

const year = ref(new Date().getFullYear());

const langlist = ref({
  ko: footer_ko,
  vt: footer_vt,
});
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  min-height: 220px;
  min-width: 1360px;
  padding: 30px 0;
  background-color: white;
  text-align: center;

  ul li {
    letter-spacing: 0;
    line-height: 2.2;
    color: var(--main-black2);
  }

  h3 {
    margin-top: 20px;
  }
}

footer ul {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

footer ul.privacy {
  margin-bottom: 15px;
  li {
    font-size: 16px;
    font-weight: 600;
  }
  a {
    color: var(--main-black2);
    &:hover {
      border-bottom: 1px solid var(--main-black2);
    }
  }
}
footer ul.info {
  li {
    position: relative;
    font-size: 14px;
    font-family: notosansmedium;

    &::before {
      content: "|";
      color: #d4d4d4;
      position: absolute;
      left: -10px;
    }

    &:first-child::before {
      display: none;
    }
  }
}
</style>
