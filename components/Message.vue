<template>
  <section>
    <input v-model="message" type="text" />
    <p>{{ message }}</p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Message extends Vue {
  public message: string = '메시지를 입력해주세요'
}
</script>
