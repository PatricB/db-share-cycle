<template>
  <div class="sc-map">
    <l-map
      ref="lMap"
      :zoom="zoom"
      :center="lCenter"
      :options="mapOptions"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-control-zoom position="bottomright" />
      <l-polygon
        v-for="station in mapStations"
        :key="station.id"
        :lat-lngs="station.polygon"
        color="#b51880"
        :weight="5"
        @click="zoomToStation(station)"
      >
        <l-tooltip
          v-if="station.markerCount"
          :options="{permanent: true, direction: 'right', offset: [25 , -20]}"
        >
          <strong>{{ station.markerCount }}</strong>
        </l-tooltip>
      </l-polygon>
      <l-marker
        v-for="vehicle in mapVehicles"
        :key="vehicle.id"
        :lat-lng="vehicle.position"
        :icon="markerIcon"
      >
        <l-popup :content="vehicle.name" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, Icon } from 'leaflet';
import { LMap, LMarker, LControlZoom, LPolygon, LPopup, LTileLayer, LTooltip} from 'vue2-leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    name: 'Map',
    tag: 'sc-map',
    components: {
        LControlZoom,
        LMap,
        LMarker,
        LPolygon,
        LPopup,
        LTileLayer,
        LTooltip
    },
    props: {
        center: {
            type: Array,
            default: () => [0, 0],
            validator: (value) => !!latLng(value)
        },
        stations: {
            type: Array,
            default: () => []
        },
        vehicles: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            zoom: 17,
            url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            mapOptions: {
                zoomSnap: 0.5,
                zoomControl: false // disable default zoom control to show it at another position
            },
            markerIcon: new Icon({
                iconUrl: process.env.VUE_APP_ASSETS_PATH + '/img/marker_circle.svg',
                iconSize: [18, 18],
                iconAnchor: [9, 9]
            })
        };
    },
    computed: {
        lCenter () {
            return latLng(this.center);
        },
        mapStations () {
            return this.stations.filter(s => typeof s.polygon === 'object').map(s => {
                return {
                    ...s,
                    markerCount: this.mapVehicles.reduce(
                        (total, v) => {
                            return v.position && s.polygon
                            && this.isPointInsidePolygon(v.position, s.polygon) ? total + 1 : total
                        }, 0
                    )
                };
            });
        },
        mapVehicles () {
            return this.vehicles.filter(v => !!latLng(v.position)).map(v => {
                return { ...v, name: v.type ? `${v.type} "${v.name}"` : `"${v.name}"` };
            });
        }
    },
    methods: {
        zoomToStation(station) {
            this.$refs.lMap.setBounds(station.polygon)
        },
        isPointInsidePolygon(pointLatLng, polyPoints) {
            const _pointLatLng = latLng(pointLatLng);

            let inside = false;
            for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
                const xi = latLng(polyPoints[i]).lat, yi = latLng(polyPoints[i]).lng;
                const xj = latLng(polyPoints[j]).lat, yj = latLng(polyPoints[j]).lng;

                const intersect = ((yi > _pointLatLng.lng) !== (yj > _pointLatLng.lng))
                    && (_pointLatLng.lat < (xj - xi) * (_pointLatLng.lng - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }

            return inside;
        }
    }
};
</script>

<style lang="scss">
@import "../main";
@import "~leaflet/dist/leaflet.css";

.sc-map {
    width: 100%;
    height: 100vh;

    .leaflet-popup-content-wrapper {
        border-radius: 2px;
    }

    .leaflet-popup-tip {
        width: 14px;
        height: 14px;
    }

    .leaflet-container a.leaflet-popup-close-button {
        background: $gray-90;
        padding: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: $danger;
        position: absolute;
        top: -5px;
        right: -5px;
    }
}

</style>
