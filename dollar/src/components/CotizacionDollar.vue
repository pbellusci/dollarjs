<template>
  <div class="hello">
    <h2> Venta {{venta}}</h2>
    <h2> Compra {{compra}}</h2>
    <h3> Ultimo Update {{date_updated}}</h3>

    <div v-if="loading"> Cargando Datos... </div>
    <div v-if="error"> Error en la conexion ({{count_errores}})</div>
    <button v-on:click="cotizar" v-if="!loading && interval_id == null"> Cotizar </button>
    <button v-on:click="detener" v-if="!loading"> Detener </button>
  </div>
</template>

<script>
import Cotizacion from '@/services/Cotizacion'
export default {
  name: 'CotizacionDollar',
  data () {
    return {
      venta: 1,
      compra: 2,
      date_updated: '15:05 10/2/2017',
      loading: false,
      error: false,
      count_errores: 0,
      stop_process: false,
      interval_id: null
    }
  },
  methods: {
    start_cotizar () {
      this.interval_id = setInterval(this.cotizar(), 2000)
    },
    cotizar (event) {
      console.log('Cotizando...')
      this.loading = true
      this.error = false
      return new Promise((resolve) => {
        resolve(Cotizacion.cotizacion())
      }).then((xhr) => {
        this.venta = xhr.data.venta
        this.compra = xhr.data.compra
        this.loading = false
        this.count_errores = 0
      }).catch(() => {
        this.count_errores++
        this.loading = false
        this.error = true
      })
    },
    detener () {
      this.stop_process = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
