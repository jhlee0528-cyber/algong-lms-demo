<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size * 1.11"
    viewBox="0 0 18 20"
    fill="none"
    :style="{ cursor: 'pointer' }"
  >
    <path
      d="M0.899933 4.00599C0.899933 2.51493 2.10868 1.30618 3.59973 1.30618H14.3989C15.89 1.30618 17.0987 2.51492 17.0987 4.00598V14.0673C17.0987 14.7532 16.8377 15.4134 16.3685 15.9138L14.5519 17.8516C14.0415 18.396 13.3285 18.7049 12.5823 18.7049H3.59973C2.10867 18.7049 0.899933 17.4961 0.899933 16.0051V4.00599Z"
      :stroke="color"
      stroke-width="1.79987"
    />
    <path
      d="M12.2188 19.6085V15.8373C12.2188 14.5119 13.2932 13.4375 14.6186 13.4375H18.004"
      :stroke="color"
      stroke-width="1.79987"
      stroke-linejoin="round"
    />
    <rect
      x="4.30934"
      y="5.51247"
      width="9.38502"
      height="0.899933"
      rx="0.449967"
      :stroke="color"
      stroke-width="0.899933"
    />
    <rect
      x="4.30934"
      y="9.96559"
      width="9.38502"
      height="0.899933"
      rx="0.449967"
      :stroke="color"
      stroke-width="0.899933"
    />
    <rect
      x="4.30934"
      y="14.4265"
      width="4.88535"
      height="0.899933"
      rx="0.449967"
      :stroke="color"
      stroke-width="0.899933"
    />
  </svg>
</template>

<script>
export default {
  name: 'DetailIcon',
  props: {
    size: {
      type: Number,
      default: 18
    },
    color: {
      type: String,
      default: '#3D90EF'
    }
  }
}
</script> 