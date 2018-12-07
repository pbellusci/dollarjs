const Cors = require('cors')
const Express = require('express')
const BodyParser = require('body-parser')
const Rp = require('request-promise')
const cheerio = require('cheerio')

const app = Express()
app.use(BodyParser.json())
app.use(Cors())

app.listen(8081)

app.get('/consume', (req, res) => {
  var $url = 'https://hb.bbv.com.ar/fnet/mod/inversiones/NL-dolareuro.jsp'
  Rp($url)
    .then((html) => {
      var $ = cheerio.load(html)
      var compra = $('table tr').eq(1).find('td').eq(1).text()
      var venta = $('table tr').eq(1).find('td').eq(2).text()
      res.send({ error: false, compra: compra, venta: venta })
    })
    .catch((err) => {
      res.send({ error: true, msg: err })
    })
})
