<script setup lang="ts">
export type ProgressStatus = 'ahead' | 'onTrack' | 'behind'

interface Props {
  status: ProgressStatus
  weeksDiff: number
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm'
})

const baseClasses = props.size === 'sm'
  ? 'text-xs px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-0.5'
  : 'text-sm px-2 py-1 rounded-full font-medium inline-flex items-center gap-1'
</script>

<template>
  <span
    v-if="status === 'ahead'"
    :class="`${baseClasses} bg-green-100 text-green-700`"
  >
    🚀 {{ weeksDiff }}주 선행
  </span>
  <span
    v-else-if="status === 'behind'"
    :class="`${baseClasses} bg-yellow-100 text-yellow-700`"
  >
    ⚠️ {{ weeksDiff }}주 지연
  </span>
  <span
    v-else
    :class="`${baseClasses} bg-blue-100 text-blue-700`"
  >
    ✅ 정상
  </span>
</template>
