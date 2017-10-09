<template>
  <div class="DevicesMap__panel">
    <div class="DeviceDetail">

      <div class="ScrollablePanel">
        <div class="ScrollablePanel__header">

          <div class="DeviceDetail__actions">
            <button type="button" @click="close">Close</button>
          </div>

        </div>
        <div class="ScrollablePanel__content ComponentScroll">

          <ul class="Attributes__list">
            <li>
              <div class="AttributesItem">
                <div class="AttributesItem__label">
                  Device ID <span class="fa fa-key"></span>
                </div>
                <div class="AttributesItem__content">
                  da01741f
                </div>
              </div>
            </li>
            <li>
              <div class="AttributesItem">
                <div class="AttributesItem__label">
                  Battery Level
                </div>
                <div class="AttributesItem__content">
                  {{ batteryLevel }}% <span class="fa" :class="batteryLevelIconClassObject"></span>
                </div>
              </div>
            </li>
            <li>
              <div class="AttributesItem">
                <div class="AttributesItem__label">
                  Last Activity
                </div>
                <div class="AttributesItem__content">
                  21 hours ago
                </div>
              </div>
            </li>
            <li>
              <div class="AttributesItem">
                <div class="AttributesItem__label">
                  Supplier
                </div>
                <div class="AttributesItem__content">
                  SigFox
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>

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
      batteryLevel: 78,
    };
  },
  computed: {
    batteryLevelIconClassObject() {
      const {
        batteryLevel,
      } = this;
      const fullAmount = 80;
      const availableLevels = 4;
      const levelIdPrecise = (batteryLevel * availableLevels) / fullAmount;
      const levelId = Math.floor(Math.min(availableLevels, levelIdPrecise));
      const classObject = {};
      classObject[`fa-battery-${levelId}`] = true;
      return classObject;
    },
  },
  methods: {
    close() {
      this.$emit('close', {
        markerId: this.id,
      });
    },
  },
  mounted() {
    console.log('Mounted DeviceDetail');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~|/font-awesome/css/font-awesome.css';
$spacing: .5rem;

.DeviceDetail {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__actions {
    margin-bottom: 0.5rem;
  }
  .DevicesMap {
  }
}

.Attributes {
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;

    > li {
      border-top: 1px solid #efefef;
    }
  }
}
.AttributesItem {
  display: flex;
  flex-direction: column;
  padding: $spacing;

  &__label {
    font-size: .75rem;
    font-weight: 600;
    margin-bottom: .5rem;
  }
  &__content {
    flex-grow: 1;
  }
}

.ScrollablePanel {
  display: flex;
  flex-direction: column;

  &__header {

  }
  &__content {
    flex-grow: 1;
  }
}
</style>
