<template>
<div class="DevicesMap">
  <div ref="map" class="DevicesMap__map"></div>
  <router-view ref="panel"></router-view>
</div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import router from '@/router';

export default {
  name: 'DevicesMap',
  components: {},
  data() {
    return {
      devices: [
        {
          id: 1,
          position: {
            lat: -25.363,
            lng: 131.044,
          },
        },
      ],
    };
  },
  methods: {
    mapInit(google) {
      const mapCenter = {
        lat: -25.363,
        lng: 131.044,
      };

      const map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: mapCenter,
        gestureHandling: 'cooperative',
      });

      // Markers
      const {
        devices,
      } = this;
      devices.forEach((device) => {
        const {
          id: markerId,
          position,
        } = device;
        const marker = new google.maps.Marker({
          position,
          map,
        });
        const handleMarkerClick = this.handleMarkerClick.bind(this, markerId);
        marker.addListener('click', handleMarkerClick);
      });
    },
    handleMarkerClick(id) {
      router.push({
        name: 'DeviceDetail',
        params: {
          id,
        },
      });
    },
    handlePanelEvents() {
      const {
        panel,
      } = this.$refs;
      if (panel) {
        // Bind to close when panel exists
        this.$refs.panel.$once('close', this.handlePanelClose);
      }
    },
    handlePanelClose() {
      router.push({
        name: 'Devices',
      });
    },
  },
  mounted() {
    console.log('Mounted map');
    GoogleMapsLoader.key = 'AIzaSyAKxqIqxT8V5OjEZduJVQMn__JUQHxnQWY';
    GoogleMapsLoader.load(this.mapInit);

    // Bind to panel close on route change and direct visit
    // TODO: Refactor this
    this.handlePanelEvents();
    this.$watch(() => this.$route, () => {
      console.log('Changed Route');
      this.handlePanelEvents();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.DevicesMap {
    display: flex;
    height: 100%;

    &__map {
        flex-grow: 1;
    }
    &__panel {
        width: 300px;
        background-color: #fff;
    }
}
</style>
