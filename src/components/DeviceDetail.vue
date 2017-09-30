<template>
  <div class="DevicesMap__panel">
    <div class="DeviceDetail">
      {{ id }}
      <button type="button" @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceDetail',
  props: {
    id: {
      type: [Number, String],
      default: () => undefined,
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('close', {
        markerId: this.id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.DeviceDetail {
  .DevicesMap {

  }
}
</style>
