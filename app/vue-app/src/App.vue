<template>
  <div class="share-cycle-app">
    <header class="sc-header">
      <h1><span class="text-primary">DB</span> <span class="muted">share-cycle</span></h1>

      <div v-if="$apollo.loading">
        Loading...
      </div>
    </header>
    <Map
      :center="[51.33600, 12.37499]"
      :stations="stations"
      :vehicles="vehicles"
    />
  </div>
</template>

<script>
import Map from './components/Map';
import gql from 'graphql-tag';


const GET_STATIONS_AND_VEHICLES = gql `
    query {
    stations: getStationListing {
        list: edges {
            details: node {
                id
                polygon {
                    long: longitude
                    lat: latitude
                }
            }
        }
    }
    vehicles: getVehicleListing {
        list: edges {
            details: node {
                id
                type: vehicle_type
                name: key
                position {
                    long: longitude
                    lat: latitude
                }
            }
        }
    }
    }
`

export default {
    name: 'App',
    components: {
        Map
    },
    data () {
        return {
            apiData: {
                stations: [],
                vehicles: []
            }
        };
    },
    apollo: {
        apiData: {
            query: GET_STATIONS_AND_VEHICLES,
            update: res => res,
            error(error) { // Catch the error
                console.log(error);
            }
        }
    },
    computed: {
        stations () {
            return this.apiData && this.apiData.stations && this.apiData.stations.list
                ? this.apiData.stations.list.map(data => {
                return {
                    ...data.details,
                    polygon: data.details.polygon.map(p => [p.lat, p.long])
                }
            }) : []
        },
        vehicles () {
            return this.apiData && this.apiData.vehicles && this.apiData.vehicles.list
                ? this.apiData.vehicles.list.map(data => {
                return {
                    ...data.details,
                    position: [data.details.position.lat, data.details.position.long]
                }
            }) : []
        }
    }
};
</script>

<style lang="scss">
@import "main";

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.share-cycle-app {
    font-family: sans-serif;

    .text-primary {
        color: $primary !important;
    }

    .sc-header {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        padding: 1rem 1.5rem;
        margin: .5rem;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
        z-index: 15;
        color: $gray-30;

        h1 {
            font-size: 1.5rem;
        }
    }

    .sc-map {
        position: relative;
        z-index: 1;
    }
}

</style>
