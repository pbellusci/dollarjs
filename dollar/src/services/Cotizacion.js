import Api from '@/services/Api'

export default {
  cotizacion () {
    return Api().get('consume')
  }
}
