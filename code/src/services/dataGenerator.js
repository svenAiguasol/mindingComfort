import { faker } from "@faker-js/faker"
import { number } from "echarts"
import moment from "moment"

faker.setLocale("es")

const diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getNextChar(char) {
  return String.fromCharCode(char.charCodeAt(0) + 1)
}
function getNextNChar(char, n) {
  return String.fromCharCode(char.charCodeAt(0) + n)
}

async function fetchAsync(url) {
  let response = await fetch(url)
  let data = await response.json()
  return data
}
function getGeneralConfort(estados) {
  let res = [0, 0, 0, 0]
  Object.keys(estados).map((type) => {
    if (type !== "general") {
      estados[type].map((estado, index) => {
        res[index] += (estado * 1) / 5
      })
    }
  })
  return res
}
function getNestedConfort(root) {
  let res = {}
  root.map((obj) => {
    Object.keys(obj.estado).map((type) => {
      if (Object.keys(res).indexOf(type) === -1) {
        res[type] = [0, 0, 0, 0]
      }
      obj.estado[type].map((estado, index) => {
        res[type][index] += estado / root.length
      })
    })
  })
  return res
}

function generateRandomConforts() {
  const bad = faker.datatype.number({ min: 0, max: 1000 })
  const semibad = faker.datatype.number({ min: 0, max: 1000 })
  const semigood = faker.datatype.number({ min: 0, max: 1000 })
  const good = faker.datatype.number({ min: 0, max: 1000 })
  const total = bad + semibad + semigood + good
  return [
    (good / total) * 100,
    (semigood / total) * 100,
    (semibad / total) * 100,
    (bad / total) * 100,
  ]
}

async function getFeriados() {
  const currentYear = moment(new Date()).year()
  const fechasJson = await fetchAsync(
    `https://apis.digital.gob.cl/fl/feriados/${currentYear}`
  )
  let feriados = []
  await Promise.all(
    fechasJson.map((fecha) => {
      feriados.push(fecha.fecha.substring(5, 10))
    })
  )
  //console.log(feriados)
  return feriados
}

function generateRandomSeries(horario, ventNat, fecha, feriados) {
  const series = {
    tiempo: [],
    temperatura: [],
    temperaturaAlumnos: [],
    co2: [],
    humedad: [],
    ruido: [],
  }
  const divisionesHorarias = 4
  let ds = new Date(new Date().getFullYear(), 0, 1).getDay() //0 sunday, 1 monday
  ds = ds === 0 ? 6 : ds - 1 // nuestro 0 es monday

  //console.log(feriados)
  const inicioClases = new Date(new Date().getFullYear(), 3, 1)

  const Tmin = [
    16.9, 14.95442271, 14.65378886, 13.703468073, 8.469565143, 4.765463221,
    5.265463221, 7.769565143, 9.503468073, 13.55378886, 16.45442271, 15.6,
  ]
  const Tmax = [
    29.2, 30.2923946, 27.01880299, 25.62291101, 22.1312252, 17.33472257,
    17.03472257, 21.1312252, 24.62291101, 28.01880299, 29.8923946, 29.6,
  ]
  const hums = [
    44.5, 52.11521079, 57.36239402, 65.35417798, 77.53754961, 85.23055485,
    66.53055485, 67.93754961, 67.05417798, 61.06239402, 45.31521079, 47.6,
  ]
  const maxAlumnos = 5
  const co2Max = 4000
  let temperaturaAlumnos = 0
  let humedad = 0
  let co2 = 400
  let ruido = 0
  var ti = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
  let t
  let i = 0
  for (let m = 0; m < 11; m++) {
    const dm = diasMes[m]
    const deltaT = Tmax[m] - Tmin[m]
    for (let d = 0; d < dm; d++) {
      let qmi = 0
      for (let h = 0; h < 24; h++) {
        for (let qm = 0; qm < divisionesHorarias; qm++) {
          if (t >= fecha) {
            return series
          }
          t = new Date(ti.getTime() + (i * 1000 * 3600) / divisionesHorarias)
          series.tiempo.push(moment(t).format("YYYY-MM-DD HH:mm"))
          //console.log(t)
          //console.log(t < inicioClases)
          const temperaturaBasal =
            Tmin[m] +
            Math.sin((qmi * Math.PI) / (divisionesHorarias * 24)) * deltaT +
            faker.datatype.number({ min: -1, max: 1, precision: 0.1 })
          const mesdia =
            zeroPad(t.getMonth() + 1, 2) + "-" + zeroPad(t.getDate(), 2)
          //console.log(mesdia)
          //console.log(feriados.indexOf(mesdia))
          if (
            horario[ds][qmi] === 0 ||
            feriados.indexOf(mesdia) != -1 ||
            t < inicioClases
          ) {
            // recreo o fuera de clases
            temperaturaAlumnos =
              temperaturaAlumnos > 0
                ? ventNat
                  ? 0
                  : temperaturaAlumnos - 0.25
                : 0
            humedad =
              humedad > hums[m]
                ? ventNat
                  ? hums[m] + faker.datatype.number({ min: -10, max: 10 })
                  : humedad - 25
                : hums[m] + faker.datatype.number({ min: -10, max: 10 })
            co2 =
              co2 <= 650
                ? 420 + faker.datatype.number({ min: -20, max: 20 })
                : ventNat
                ? 420 + faker.datatype.number({ min: -20, max: 20 })
                : co2 - 250
            ruido = faker.datatype.number({ min: 0, max: 20 })
          } else {
            // en clases
            temperaturaAlumnos =
              temperaturaAlumnos <= maxAlumnos
                ? temperaturaAlumnos + 0.25
                : temperaturaAlumnos
            co2 =
              co2 < co2Max
                ? co2 + 250
                : co2 + faker.datatype.number({ min: -20, max: 20 })
            humedad =
              humedad < 85
                ? humedad + 10 + faker.datatype.number({ min: -5, max: 5 })
                : humedad + faker.datatype.number({ min: -3, max: 3 })
            ruido = faker.datatype.number({ min: 20, max: 60 })
          }
          //series.temperaturaAlumnos.push(temperaturaAlumnos)
          series.temperatura.push(temperaturaBasal + temperaturaAlumnos)
          series.humedad.push(humedad)
          series.ruido.push(ruido)
          series.co2.push(co2)
          qmi++
          i++
        }
      }
      ds = ds == 6 ? 0 : ds + 1
    }
  }

  return series
}

function normalDist(mean, stdDev) {
  return (
    (1 / (Math.sqrt(2 * Math.PI) * stdDev)) *
    Math.exp(-Math.pow(Math.abs(mean - x), 2) / (2 * Math.pow(stdDev, 2)))
  )
}

function parseAlerts(idSala, series) {
  const limitValues = {
    temperatura: [8, 28],
    humedad: [-5, 90],
    co2: [-5, 2000],
    ruido: [-5, 55],
  }
  const alerts = {
    temperatura: "",
    humedad: "",
    co2: "",
    ruido: "",
  }

  Object.keys(limitValues).map((type) => {
    let it = 0
    series[type].map((value) => {
      let t = series.tiempo[it]
      if (t >= moment(new Date()).subtract(3, "day").toDate()) {
        const limit = limitValues[type]
        if (value < limit[0] || value > limit[1]) {
          alerts[type] = {
            tiempo: t,
            idSala,
            type:
              type == "temperatura"
                ? value < limit[0]
                  ? "frio"
                  : "calor"
                : type,
            value,
          }
        }
      }
      it++
    })
  })
  let response = []
  Object.keys(alerts).map((type) => {
    alerts[type] ? response.push(alerts[type]) : null
  })
  return response
}

const materialidades = ["hormigón", "albañilería", "tabiquería liviana"]
const cielos = ["cielo falso", "cielo hormigón", "cielo madera"]
const condiciones = ["al interior", "al exterior"]
const suelos = ["baldosa", "madera", "hormigón descubierto"]

function getGeneralScore() {
  const ponds = {
    calor: 0.25,
    frio: 0.2,
    co2: 0.25,
    humedad: 0.15,
    ruido: 0.15,
  }
}

function getScore(arr) {
  const ponds = [1, 0.5, 0.15, 0]
  return (
    arr[0] * ponds[0] +
    arr[1] * ponds[1] +
    arr[2] * ponds[2] +
    arr[3] * ponds[3]
  )
}

const zeroPad = (num, places) => String(num).padStart(places, "0")

function getNDiasLaborables(feriados) {
  let dias = []
  for (let m = 0; m < 11; m++) {
    let nDiasLaborables = 0
    for (let d = 0; d < diasMes[m]; d++) {
      const mesdia = zeroPad(m + 1, 2) + "-" + zeroPad(d + 1, 2)
      if (feriados.indexOf(mesdia) != -1) {
        nDiasLaborables++
      }
    }
    dias.push(nDiasLaborables)
  }
  return dias
}

function getRandomCosineMonth(m, range, randomRange) {
  return (
    range[0] +
    Math.abs(Math.cos((Math.PI * m) / 11)) * (range[1] - range[0]) +
    faker.datatype.number({
      min: randomRange[0],
      max: randomRange[1],
      precision: randomRange[2],
    })
  )
}

function getNestedResults(nestedObjs) {
  let results = {
    pasado: {
      salud: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //presencia
      notas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //promedio general
      mental: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //puntaje 0-5
    },
    presente: {
      salud: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      notas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      mental: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    ausentismoTotal: 0,
  }
  for (let k = 0; k < nestedObjs.length; k++) {
    //console.log(nestedObjs[k].results)
    for (let m = 0; m < 12; m++) {
      results.pasado.salud[m] += nestedObjs[k].results.pasado.salud[m]
      results.pasado.notas[m] += nestedObjs[k].results.pasado.notas[m]
      results.pasado.mental[m] += nestedObjs[k].results.pasado.mental[m]
      results.presente.salud[m] += nestedObjs[k].results.presente.salud[m]
      results.presente.notas[m] += nestedObjs[k].results.presente.notas[m]
      results.presente.mental[m] += nestedObjs[k].results.presente.mental[m]
    }
    results.ausentismoTotal += nestedObjs[k].results.ausentismoTotal
  }
  for (let m = 0; m < 12; m++) {
    results.pasado.salud[m] = results.pasado.salud[m] / nestedObjs.length
    results.pasado.notas[m] = results.pasado.notas[m] / nestedObjs.length
    results.pasado.mental[m] = results.pasado.mental[m] / nestedObjs.length
    results.presente.salud[m] = results.presente.salud[m] / nestedObjs.length
    results.presente.notas[m] = results.presente.notas[m] / nestedObjs.length
    results.presente.mental[m] = results.presente.mental[m] / nestedObjs.length
  }
  return results
}
function generateRandomResults(diasLaborables, npersonas) {
  let results = {
    pasado: {
      salud: [], //presencia
      notas: [], //promedio general
      mental: [], //puntaje 0-5
    },
    presente: {
      salud: [],
      notas: [],
      mental: [],
    },
    ausentismoTotal: 0,
  }
  const presenciaRange = [90, 95]
  const notasRange = [5, 5.5]
  const mentalRange = [3, 4]
  const currMonth = new Date().getMonth()
  for (let m = 0; m < 12; m++) {
    const presencia = getRandomCosineMonth(m, presenciaRange, [-2, 2, 0.1])
    const notas = getRandomCosineMonth(m, notasRange, [-1, 1, 0.1])
    const mental = getRandomCosineMonth(m, mentalRange, [-1, 1, 0.1])
    if (m < currMonth) {
      results.presente.salud.push(presencia)
      results.presente.notas.push(notas)
      results.presente.mental.push(mental)
      results.ausentismoTotal +=
        diasLaborables[m] * npersonas * (1 - presencia / 100)
    }
    results.pasado.salud.push(
      presencia + faker.datatype.number({ min: -20, max: 5 })
    )
    results.pasado.notas.push(
      notas + faker.datatype.number({ min: -1.5, max: 0.5, precision: 0.1 })
    )
    results.pasado.mental.push(
      mental + faker.datatype.number({ min: -2, max: 0.5, precision: 0.1 })
    )
  }
  return results
}

function parseConfort(series) {
  const limitValues = {
    calor: [24, 27, 30],
    frio: [18, 16, 14],
    humedad: [60, 75, 90],
    co2: [1000, 1500, 2000],
    ruido: [40, 50, 60],
  }
  const results = {
    calor: [0, 0, 0, 0],
    frio: [0, 0, 0, 0],
    humedad: [0, 0, 0, 0],
    co2: [0, 0, 0, 0],
    ruido: [0, 0, 0, 0],
  }

  Object.keys(series).map((type) => {
    let it = 0
    if (type === "tiempo") return
    series[type].map((value) => {
      if (type == "temperatura") {
        if (value < limitValues["calor"][0]) {
          results["calor"][0]++
        } else if (
          value >= limitValues["calor"][0] &&
          value <= limitValues["calor"][1]
        ) {
          results["calor"][1]++
        } else if (
          value >= limitValues["calor"][1] &&
          value <= limitValues["calor"][2]
        ) {
          results["calor"][2]++
        } else {
          results["calor"][3]++
        }
        if (value > limitValues["frio"][0]) {
          results["frio"][0]++
        } else if (
          value <= limitValues["frio"][0] &&
          value >= limitValues["frio"][1]
        ) {
          results["frio"][1]++
        } else if (
          value <= limitValues["frio"][1] &&
          value >= limitValues["frio"][2]
        ) {
          results["frio"][2]++
        } else {
          results["frio"][3]++
        }
      } else {
        if (value < limitValues[type][0]) {
          results[type][0]++
        } else if (
          value >= limitValues[type][0] &&
          value <= limitValues[type][1]
        ) {
          results[type][1]++
        } else if (
          value >= limitValues[type][1] &&
          value <= limitValues[type][2]
        ) {
          results[type][2]++
        } else {
          results[type][3]++
        }
      }
    })
  })
  Object.keys(results).map((type) => {
    let it = 0
    results[type][0] = (results[type][0] / series["tiempo"].length) * 100
    results[type][1] = (results[type][1] / series["tiempo"].length) * 100
    results[type][2] = (results[type][2] / series["tiempo"].length) * 100
    results[type][3] = (results[type][3] / series["tiempo"].length) * 100
  })
  return results
}
const generateFullData = async (nb, nf, nc, np) => {
  const mejorasActivas = [
    {
      nombre: "Iluminación en pizarra",
      score: 4,
      tipo: "iluminacion",
      descripcion: "",
    },
    {
      nombre: "Iluminación LED",
      score: 4,
      tipo: "iluminacion",
      descripcion: "",
    },
    {
      nombre: "Iluminación en pizarra",
      score: 4,
      tipo: "iluminacion",
      descripcion: "",
    },
  ]
  let school = {
    edificios: [],
    estadoSensores: {
      ok: 0,
      notOk: 0,
    },
  }

  const totalSalas = nb * nf * nc // para ciclo completo 1 letra al menos son 14 salas considerando prekinder y kinder
  const nivelesPosibles = [
    { nombre: "prekinder", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "kinder", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "primero básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "segundo básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "tercero básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "cuarto básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "quinto básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "sexto básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "séptimo básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "octavo básico", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "primero medio", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "segundo medio", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "tercero medio", cantidad: 0, letra: "A", niveles: [] },
    { nombre: "cuarto medio", cantidad: 0, letra: "A", niveles: [] },
  ]

  let niveles = []
  let j = 0
  for (let i = 0; i < totalSalas; i++) {
    nivelesPosibles[j].cantidad++
    const nuevoNivel = {
      nombre:
        nivelesPosibles[j].nombre +
        " " +
        getNextNChar(nivelesPosibles[j].letra, nivelesPosibles[j].cantidad - 1),
    }
    nivelesPosibles[j].niveles.push(nuevoNivel)
    niveles.push(nuevoNivel)

    j = j < nivelesPosibles.length - 1 ? j + 1 : 0
  }
  const totalAlumnos = totalSalas * np
  console.log(niveles)
  let cursos = []
  let students = []
  let teachers = []
  let classrooms = []
  let alerts = []
  let letter = "@"
  let cii = 0
  let fii = 0

  const horarioDefault = [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  ]

  //const ventSeries = generateRandomSeries(horarioDefault, true, new Date())
  //const unventSeries = generateRandomSeries(horarioDefault, false, new Date())
  const feriados = await getFeriados()
  const diasLaborables = getNDiasLaborables(feriados)
  for (let bi = 0; bi < nb; bi++) {
    letter = getNextChar(letter)
    const name = "Sala " + letter
    let building = {
      id: bi,
      nombre: "Edificio " + letter,
      orientacion: faker.datatype.number({ min: 0, max: 180 }),
      pisos: [],
    }
    let tipo_suelo = suelos[faker.datatype.number({ min: 0, max: 2 })]
    let tipo_cielo = cielos[faker.datatype.number({ min: 0, max: 2 })]
    for (let fi = 0; fi < nf; fi++) {
      fii++
      let piso = {
        id: fii,
        nombre: "Piso " + (fi + 1),
        salas: [],
      }
      for (let ci = 0; ci < nc; ci++) {
        cii++
        let classroom = {
          id: cii,
          nombre: "Sala " + letter + (fi + 1) + zeroPad(ci + 1, 2),
          estudiantes: [],
          sensorOK: Math.random() > 1 / (nc + 5),
          /*estado: 
          {
            calor: generateRandomConforts(),
            frio: generateRandomConforts(),
            co2: generateRandomConforts(),
            humedad: generateRandomConforts(),
            ruido: generateRandomConforts(),
          },*/
          horario: horarioDefault,
          alertas: [],
          curso: niveles[cii - 1].nombre,
          mensajes: {
            //alerts: faker.datatype.number({ min: 0, max: 50 }),
            enfermos: faker.datatype.number({ min: 0, max: 10 }),
            licencias: faker.datatype.number({ min: 0, max: 5 }),
            estres: faker.datatype.number({ min: 0, max: 10 }),
            notas: faker.datatype.number({ min: -1, max: 1, precision: 0.1 }),
          },
          estructura: {
            muros: {
              N: {
                solucion:
                  materialidades[faker.datatype.number({ min: 0, max: 2 })],
                vano: faker.datatype.number({ min: 0, max: 45 }),
                condicion:
                  condiciones[faker.datatype.number({ min: 0, max: 1 })],
                soleado: faker.datatype.boolean(),
                ventanasPracticables: faker.datatype.boolean(),
                aislacionTermica: faker.datatype.boolean(),
                largo: faker.datatype.number({
                  min: 5,
                  max: 6,
                  precision: 0.1,
                }),
                alto: 2.8,
              },
              E: {
                solucion:
                  materialidades[faker.datatype.number({ min: 0, max: 2 })],
                vano: faker.datatype.number({ min: 0, max: 45 }),
                condicion:
                  condiciones[faker.datatype.number({ min: 0, max: 1 })],
                soleado: faker.datatype.boolean(),
                ventanasPracticables: faker.datatype.boolean(),
                aislacionTermica: faker.datatype.boolean(),
                largo: faker.datatype.number({
                  min: 8,
                  max: 9,
                  precision: 0.1,
                }),
                alto: 2.8,
              },
              S: {
                solucion:
                  materialidades[faker.datatype.number({ min: 0, max: 2 })],
                vano: faker.datatype.number({ min: 0, max: 45 }),
                condicion:
                  condiciones[faker.datatype.number({ min: 0, max: 1 })],
                soleado: faker.datatype.boolean(),
                ventanasPracticables: faker.datatype.boolean(),
                aislacionTermica: faker.datatype.boolean(),
                largo: faker.datatype.number({
                  min: 5,
                  max: 6,
                  precision: 0.1,
                }),
                alto: 2.8,
              },
              O: {
                solucion:
                  materialidades[faker.datatype.number({ min: 0, max: 2 })],
                vano: faker.datatype.number({ min: 0, max: 45 }),
                condicion:
                  condiciones[faker.datatype.number({ min: 0, max: 1 })],
                soleado: faker.datatype.boolean(),
                ventanasPracticables: faker.datatype.boolean(),
                aislacionTermica: faker.datatype.boolean(),
                largo: faker.datatype.number({
                  min: 8,
                  max: 9,
                  precision: 0.1,
                }),
                alto: 2.8,
              },
              cielo: {
                solucion: tipo_cielo,
                vano: 0,
                condicion: "",
                soleado: "",
                ventanasPracticables: false,
                aislacionTermica: false,
                largo: "-",
                alto: "-",
              },
              suelo: {
                solucion: tipo_suelo,
                vano: 0,
                condicion: "al terreno",
                soleado: "",
                ventanasPracticables: false,
                aislacionTermica: false,
                largo: "-",
                alto: "-",
              },
            },
            orientacion: 0,
          },
          datosIniciales: {
            iluminacionPlano: faker.datatype.number({ min: 50, max: 400 }),
            iluminacionPizarra: faker.datatype.number({ min: 100, max: 400 }),
            inteligibilidad: faker.datatype.number({
              min: 0,
              max: 100,
            }),
            luminaria: "tubo T8",
            calefaccion: {
              estado: false,
              tipo: "",
              marca: "",
              modelo: "",
              potencia: "",
            },
            aireAcondicionado: {
              estado: false,
              tipo: "",
              marca: "",
              modelo: "",
              potencia: "",
            },
          },
        }

        const series = generateRandomSeries(
          horarioDefault,
          Math.random() > 0.7,
          new Date(),
          feriados
        )

        niveles[cii - 1].sala = classroom

        classroom.estructura.muros.cielo.soleado = fi < nf ? false : true
        classroom.estructura.muros.cielo.condicion =
          fi < nf ? "al interior" : "al exterior"
        classroom.series = series

        const classAlerts = parseAlerts(classroom.nombre, series)

        classroom.alertas = classAlerts

        alerts.push(classAlerts)

        classroom.mensajes.alerts = classAlerts.length

        classroom.estado = parseConfort(classroom.series)

        classroom.estado.general = getGeneralConfort(classroom.estado)

        classroom.sensorOK
          ? school.estadoSensores.ok++
          : school.estadoSensores.notOk++

        let teacher = {
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          licencias: faker.random.numeric({ min: 0, max: 2 }),
          stress: faker.random.numeric({ min: 0, max: 5 }),
        }
        teachers.push(teacher)
        piso.salas.push(classroom)
        classrooms.push(classroom)
        for (let pi = 0; pi < np; pi++) {
          let person = {
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            ausentismo: faker.random.numeric({ min: 0, max: 5 }),
          }
          classroom.estudiantes.push(person)
          students.push(person)
        }
        classroom.results = generateRandomResults(
          diasLaborables,
          classroom.estudiantes.length
        )
        niveles[cii - 1].profesorJefe = teacher
        niveles[cii - 1].alumnos = classroom.estudiantes
      }
      piso.estado = getNestedConfort(piso.salas)
      piso.results = getNestedResults(piso.salas)
      building.pisos.push(piso)
    }
    building.estado = getNestedConfort(building.pisos)
    building.results = getNestedResults(building.pisos)
    school.edificios.push(building)
  }
  school.results = getNestedResults(school.edificios)
  school.estado = getNestedConfort(school.edificios)

  for (let i = 0; i < nivelesPosibles.length; i++) {
    let nivel = nivelesPosibles[i]
    let nivelConfort = school.estado[nivel]
  }

  return {
    school,
    students,
    teachers,
    classrooms,
    alerts,
    niveles: nivelesPosibles,
  }
}

export default generateFullData
