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
  let fechasJson
  try {
    fechasJson = await fetchAsync(
      `https://apis.digital.gob.cl/fl/feriados/${currentYear}`
    )
  } catch (e) {
    fechasJson = []
    //console.log(e)
  }
  let feriados = []
  await Promise.all(
    fechasJson.map((fecha) => {
      feriados.push(fecha.fecha.substring(5, 10))
    })
  )
  //console.log(feriados)
  return feriados
}

function getVacacionesInvierno() {
  const fromDate = moment(new Date(new Date().getFullYear(), 6, 1)).startOf(
    "week"
  )
  const toDate = fromDate.clone().add(2, "weeks")
  let vacaciones = []
  for (let dia = fromDate; dia.isBefore(toDate); dia.add(1, "days")) {
    vacaciones.push(dia.format("MM-DD"))
  }
  return vacaciones
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
  const inicioClases = new Date(new Date().getFullYear(), 2, 1)

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
  let tiempoUso = []
  for (let m = 0; m < 11; m++) {
    const dm = diasMes[m]
    const deltaT = Tmax[m] - Tmin[m]
    for (let d = 0; d < dm; d++) {
      let qmi = 0
      for (let h = 0; h < 24; h++) {
        for (let qm = 0; qm < divisionesHorarias; qm++) {
          if (t >= fecha) {
            return { series, tiempoUso }
          }
          t = new Date(ti.getTime() + (i * 1000 * 3600) / divisionesHorarias)
          series.tiempo.push(moment(t).format("YYYY-MM-DD HH:mm"))

          const temperaturaBasal =
            Tmin[m] +
            Math.sin((qmi * Math.PI) / (divisionesHorarias * 24)) * deltaT +
            faker.datatype.number({ min: -1, max: 1, precision: 0.1 })
          const mesdia =
            zeroPad(t.getMonth() + 1, 2) + "-" + zeroPad(t.getDate(), 2)
          //console.log(qmi)
          if (
            horario[ds][qmi] === 0 ||
            feriados.indexOf(mesdia) != -1 ||
            t < inicioClases
          ) {
            // recreo o fuera de clases
            tiempoUso.push(0)
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
            tiempoUso.push(1)
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
                : humedad
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
  return { series, tiempoUso }
}

function normalDist(mean, stdDev) {
  return (
    (1 / (Math.sqrt(2 * Math.PI) * stdDev)) *
    Math.exp(-Math.pow(Math.abs(mean - x), 2) / (2 * Math.pow(stdDev, 2)))
  )
}

function getProblemas(indicadores) {
  let res = []
  problemas.map((problema) => {
    Object.keys(problema.criterio).map((criterio) => {
      const valorCriterio = problema.criterio[criterio]
      //console.log(problema.nombre, valorCriterio, indicadores[criterio])
      if (
        indicadores[criterio] < valorCriterio &&
        res.indexOf(problema.id) == -1
      ) {
        res.push(problema.id)
      }
    })
  })
  return res
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
  const fromDate = moment(new Date()).subtract(3, "days").toDate()
  Object.keys(limitValues).map((type) => {
    let it = 0
    const tiempoReducido = series.tiempo.slice(-500)
    series[type].slice(-500).map((value) => {
      let t = tiempoReducido[it]
      if (moment(t) >= fromDate) {
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
const mejoras = [
  {
    id: 1,
    nombre: "Ventilacion Natural",
    icono: new URL(
      "../assets/img/icono_mejora_ventilacion.svg",
      import.meta.url
    ).href,
    descripcion:
      "La apertura de puertas y ventanas, antes, durantes y después de clases ayuda a renovar el aire y por tanto mantener los niveles de humedad y CO2 debajo de los niveles recomendados",
    advertencias: [
      "La ventilación durante la clase en invierno puede bajar la temperatura y afectar negativamente el confort",
      "Su uso en espacios climatizados (con calefacción o con aire acondicionado) incrementará muy significativamente el consumo de energía",
    ],
    recomendaciones: [
      "Ventile las salas entre clases durante el invierno, y mantenga ventanas abiertas durante el verano",
      "La tasa de producción de humedad y CO2 aumenta significativamente con la actividad física activa",
    ],
    inversion: 0,
    operacional: 0,
  },
  {
    id: 2,
    nombre: "Ventilacion Mecánica",
    icono: new URL("../assets/img/icono_mejora_vent_mec.svg", import.meta.url)
      .href,
    descripcion:
      "La tasa de renovación de aire para mantener una sala corréctamente ventilada según estándares internacionales sólo se puede conseguir con ventilación mecánica, que es un sistema que inyecta aire fresco al interior de la sala por medio de ventilador/es.",
    advertencias: [
      "Estos sistemas significarán un incremento de su consumo energético, pero la energía requerida por ventilador es muy baja en comparación con la calefacción y aire acondicionado",
    ],
    recomendaciones: [
      "Considere implementar sistemas centralizados, pueden significar un ahorro económico relevante en edificios con muchas salas",
      "Si es que tiene sistemas de calefacción o aire acondicionado, considere implementar el sistema con recuperación de calor. En caso contrario, el consumo de energía se podría triplicar fácilmente.",
      "Considere implementar sistemas con control automático en base al nivel de humedad y CO2, ya que estos mejoran el nivel de consumo de energía y entregan la cantidad de aire necesaria para mantener el confort en sus niveles óptimos",
      "Intente que el chorro de aire no impacte nunca directamente a los alumnos mediante el uso de difusores y localizaciones adecuadas de los puntos de inyección",
    ],
    inversion: 4,
    operacional: 1,
  },
  {
    id: 3,
    nombre: "Aire acondicionado",
    icono: new URL("../assets/img/icono_mejora_ac.svg", import.meta.url).href,
    descripcion:
      "El aire acondicionado es una tecnología que extrae calor de la sala (unidad interior) y lo inyecta en el aire de afuera (unidad exterior). El aire acondicionado es una de las dos maneras de producir frío para climatización (Aparte de la ventilación evaporativa). La mayoría de modelos admite también la producción de calor. Hay de muchos tipos, puede ser centralizado o decentralizado, puede entregar el frío/calor a través de ductos de ventilación o a través de un evaporador/condensador interior, puede tener variación de potencia o ser de potencia constante, etc.",
    advertencias: [
      "Aunque estos dispositivos son energéticamente eficientes, el consumo en salas de clase con muchos alumnos, o en espacios mal aislados, puede incrementar significativaente el consumo de energía",
      "Normalmente esta tecnología hace recircular el aire, no lo renueva, por tanto no reduce las tasas de CO2 y humedad al interior del aula",
      "La potencia eléctrica de estos sistemas podrían exigir una ampliación de empalme para el establecimiento",
    ],
    recomendaciones: [
      "Considere implementar sistemas centralizados, pueden significar un ahorro económico relevante en edificios con muchas salas",
      "Utilice el sistema con las ventanas cerradas en todo momento. Si los niveles de CO2 y humedad aumentan, utilice un sistema de ventilación con recuperación de calor para no incrementar el consumo de energía",
      "Nunca regule el termostato por debajo de 24 grados, ya que esto puede aumentar el consumo de energía. En lo posible, deje el control con protección, sin posibilidad de operación manual desde el aula",
      "Limpie filtros al menos cada 6 meses y haga mantenciones recomendadas por el instalador al menos una vez por año, de esta forma los sistemas se mantendrán en condiciones óptimas",
      "Intente que el chorro de aire no impacte nunca directamente a los alumnos mediante el uso de difusores y localizaciones adecuadas de los puntos de inyección",
    ],
    inversion: 5,
    operacional: 4,
  },
  {
    id: 4,
    nombre: "Calefacción",
    icono: new URL(
      "../assets/img/icono_mejora_calefaccion.svg",
      import.meta.url
    ).href,
    descripcion:
      "La calefacción es un sistema que calienta el aula de clases. Existen muchas soluciones tecnológicas, tales como calefactores eléctricos, a leña, de combustibles, solar, geotérmica, entre otros. La eficiencia de cada tecnología puede ser muy variable, y los costos operativos también, por lo que instalar un sistema de calefacción usualmente es una decisión ue debe ser calculada y es una decisión estratégica relevante en el consumo de energía del establecimiento.",
    advertencias: [
      "La eficiencia y el costo de las fuentes de energía pueden ser muy variables y una mala decisión puede significar un incremento muy significativo del consumo de energía y de su costo",
      "Normalmente esta tecnología hace recircular el aire, no lo renueva, por tanto no reduce las tasas de CO2 y humedad al interior del aula",
      "La potencia eléctrica de los sistemas que funcionan con electricidad podrían exigir una ampliación de empalme para el establecimiento",
      "Si una sala está correctamente aislada, la tasa de generación de calor podrían evitar la necesidad de un sistema de calefacción",
    ],
    recomendaciones: [
      "Considere implementar sistemas centralizados, pueden significar un ahorro económico relevante en edificios con muchas salas",
      "Utilice el sistema con las ventanas cerradas en todo momento. Si los niveles de CO2 y humedad aumentan, utilice un sistema de ventilación con recuperación de calor para no incrementar el consumo de energía",
      "Nunca regule el termostato por encima de 21 grados, ya que esto puede aumentar el consumo de energía. En lo posible, deje el control con protección, sin posibilidad de operación manual desde el aula",
      "Haga mantenciones recomendadas por el instalador para evitar riesgo de incendios y otros problemas",
      "Si el sistema contempla flujos de aire, intente que el chorro de aire no impacte nunca directamente a los alumnos mediante el uso de difusores y localizaciones adecuadas de los puntos de inyección",
    ],
    inversion: 4,
    operacional: 3,
  },
  {
    id: 5,
    nombre: "Mejora envolvente",
    icono: new URL("../assets/img/icono_mejora_envolvente.svg", import.meta.url)
      .href,
    descripcion:
      "Por envolvente se entiende al conjunto de partes que dejan pasar el calor desde o hacia la sala de clases, y se compone de : suelo, muros, techo, ductos, ventanas y puertas. Una envolvente correctamente diseñada mantiene la sala más fresca en verano y lo hace reduciendo la radiación solar, reduciendo las infiltraciones de aire caliente y reduciendo la transmisión de cielo y paredes. Mientras que en invierno, un buena envolvente deja pasar la radiación solar, mientras que evita la conducción a través de muros y cielo, y también evita las infiltraciones de aire frío.",
    advertencias: [
      "Mejorar la envolvente muchas veces significa incrementar la hermeticidad de la sala. Y como los alumnos generan humedad y CO2, sin un sistema de ventilación mecánica, esto significará un disconfort muy elevado",
    ],
    recomendaciones: [
      "Considere instalar un sistema de ventilación mecánica para evitar la sensación de encierro",
      "Por órden de costo-beneficio, las medidas son: sello de puertas y ventanas, aislación del techo, protección solar, aislación de muros, recambio de ventanas",
    ],
    inversion: 5,
    operacional: 0,
  },
  {
    id: 6,
    nombre: "Absorbedor acústico",
    icono: new URL("../assets/img/icono_mejora_absorbedor.svg", import.meta.url)
      .href,
    descripcion:
      "Un absorbedor acústico es una solución que reduce la reberveración mediante la absorción del sonido. Los absorvedores existen en distintos formatos y materiales, y pueden ser instalados en techo o muros",
    advertencias: [""],
    recomendaciones: [
      "Instale soluciones sin fibra de vidrio ni materiales que puedan ser nocivos en su respiración",
    ],
    inversion: 5,
    operacional: 0,
  },
  {
    id: 7,
    nombre: "Aislante acústico",
    icono: new URL(
      "../assets/img/icono_mejora_aislante_acust.svg",
      import.meta.url
    ).href,
    descripcion:
      "Un aislante acústico es una solución que reduce el ruido que ingresa desde el exterior de la sala. Las soluciones de aislación existen en distintos formatos y materiales, y pueden ser instaladas en techo, muros y ventanas, siendo estas últimas las más caras por m2",
    advertencias: [
      "Si va a cerrar ventanas para aislar del ruido, considere la ventilación mecánica para evitar concentraciones de CO2 y humedad",
    ],
    recomendaciones: [
      "Aisle sólo los muros más livianos por dónde pasa el sonido, los muros más pesados ya son bastante aislantes al paso del ruido",
      "Aisle orificios y mantenga ventanas cerradas si hay problemas de ruido",
    ],
    inversion: 3,
    operacional: 0,
  },
  {
    id: 8,
    nombre: "Recambio luminaria",
    icono: new URL(
      "../assets/img/icono_mejora_iluminacion.svg",
      import.meta.url
    ).href,
    descripcion:
      "Existen múltiples tipos de luminarias, y cada una tiene sus ventajas y desventajas. La mejor solución actual por temas de eficiencia energética es la luminaria LED, pero incluso dentro de la luminaria LED existen múltiples soluciones. Incluso, podría haber alguna solucion que no requiriera el cambio de los soquetes. También hay soluciones específicas para iluminación de pizarras, y son distintas a la luminaria de uso general",
    advertencias: [
      "Seleccionar un tipo inadecuado de luminaria puede generar encandilamiento o incrementar su consumo de energía",
    ],
    recomendaciones: [
      "Utilice luminarias LED de uso general frío para el espacio. La luz fría genera activación, mientras que luz cálida genera calma",
    ],
    inversion: 3,
    operacional: 1,
  },
]
const problemas = [
  {
    id: 1,
    nombre: "Exceso de humedad y/o CO2",
    descripcion:
      "El exceso de humedad incrementa el tiempo de remanencia de virus y bacterias en el aire y puede incluso generar ambientes propicios para la proliferación de hongos que afectan el sistema respiratorio y le quitan vida útil a la infraestructura. Por otro lado, el exceso de CO2 desplaza la cantidad de oxígeno disponible para la respiración. El oxígeno es necesario para cualquier actividad muscular o cerebral. Si el cerebro no recibe suficiente oxígeno disminuye su capacidad de atención y retención de manera muy pronunciada.",
    criterio: {
      co2: 70,
      humedad: 70,
    },
    mejoras: [1, 2],
  },
  {
    id: 2,
    nombre: "Temperatura muy alta",
    descripcion:
      "Una temperatura por encima del nivel de confort agita el sistema respiratorio y cardiaco para incrementar la exudación y bajar la temperatura del cuerpo. Este trabajo adicional incrementa el consumo energético instantáneo, lo que reduce la energía disponible para otras actividades, como poner atención. Finalmente el incremento de gasto energético sumado a la falta de foco termina por generar la sensación de somnolencia.",
    criterio: {
      calor: 70,
    },
    mejoras: [5, 3],
  },
  {
    id: 3,
    nombre: "Temperatura muy baja",
    descripcion:
      "La temperatura por debajo del nivel de confort hace que parte de la actividad cerebral se concentre en guardar el calor, y or otra parte el aire frío irrita las vías pulmonares, facilitando el contagio entre los habitantes del aula.",
    criterio: {
      frio: 70,
    },
    mejoras: [5, 4],
  },
  {
    id: 4,
    nombre: "Baja inteligibilidad",
    descripcion:
      "Usualmente las salas que tienen paredes poco porososas y muy pesadas suelen ser espacios con alta reverberación y baja inteligibilidad. Esto quiere decir que si el profesor habla, lo más probable es que la persona de la última fila entienda muy poco o nada de lo que se está diciendo.",
    criterio: {
      inteligibilidad: 70,
    },
    mejoras: [6],
  },
  {
    id: 5,
    nombre: "Baja iluminacion en plano y/o en pizarra",
    descripcion:
      "La iluminación en el plano afecta el esfuerzo que debe hacer el ojo para extraer la información de los cuadernos. Una iluminación deficiente incremeta el estrés ocular y genera una disminución notoria la eficiencia de tareas que requieren alta pscicomotricidad (como escribir o dibujar). Mientras que la iluminación en la pizarra afecta cómo se percibe el contenido expuesto por el profesor, sobre todo a las personas que no están en la primera fila.",
    criterio: {
      iluminacionPlano: 200,
      iluminacionPizarra: 200,
    },
    mejoras: [8],
  },
  {
    id: 6,
    nombre: "Exceso de ruido desde el exterior",
    descripcion:
      "Una mala aislación acústica del exterior hace que el ruido al interior del aula sea muy fuerte. Esto hace que el mensaje del profesor sea menos inteligible y que requiera más esfuerzo de su parte para ser escuchado en todas partes. Las aberturas en muros, como ventanas o ductos pueden ser buenos conductores acústicos.",
    criterio: {
      ruidoExterior: 0.5,
    },
    mejoras: [7],
  },
]

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

const limitValues = {
  calor: [24, 27, 30],
  frio: [18, 16, 14],
  humedad: [60, 75, 90],
  co2: [1000, 1500, 2000],
  ruido: [40, 50, 60],
}
function parseConfort(series, horario) {
  const results = {
    calor: [0, 0, 0, 0],
    frio: [0, 0, 0, 0],
    humedad: [0, 0, 0, 0],
    co2: [0, 0, 0, 0],
    ruido: [0, 0, 0, 0],
  }

  let nUso
  Object.keys(series).map((type) => {
    let it = 0
    nUso = 0
    if (type === "tiempo") return
    series[type].map((value) => {
      if (horario[it] == 1) {
        nUso++
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
      }
      it++
    })
  })
  Object.keys(results).map((type) => {
    let it = 0
    results[type][0] = (results[type][0] / nUso) * 100
    results[type][1] = (results[type][1] / nUso) * 100
    results[type][2] = (results[type][2] / nUso) * 100
    results[type][3] = (results[type][3] / nUso) * 100
  })
  return results
}
const generateFullData = async (nb, nf, nc, np) => {
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
  //console.log(niveles)
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
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  ]

  //const ventSeries = generateRandomSeries(horarioDefault, true, new Date())
  //const unventSeries = generateRandomSeries(horarioDefault, false, new Date())
  const feriadosLegales = await getFeriados()
  const vacacionesInvierno = getVacacionesInvierno()
  const feriados = feriadosLegales.concat(vacacionesInvierno)

  //console.log(feriados)
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
                vano: 0,
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
                vano: 0,
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
            iluminacionPlano: faker.datatype.number({ min: 50, max: 300 }),
            iluminacionPizarra: faker.datatype.number({ min: 50, max: 300 }),
            inteligibilidad: faker.datatype.number({
              min: 0,
              max: 80,
            }),
            luminaria: {
              tipo: "tubo T8",
              cantidad: faker.datatype.number({ min: 18, max: 22 }),
            },
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

        const seriesData = generateRandomSeries(
          horarioDefault,
          Math.random() > 0.7,
          new Date(),
          feriados
        )
        //console.log(seriesData)

        niveles[cii - 1].sala = classroom

        classroom.estructura.muros.cielo.soleado = fi < nf ? false : true
        classroom.estructura.muros.cielo.condicion =
          fi < nf ? "al interior" : "al exterior"
        classroom.series = seriesData.series
        classroom.tiempoUso = seriesData.tiempoUso
        //console.log(seriesData.series)
        const classAlerts = parseAlerts(classroom.nombre, seriesData.series)

        classroom.alertas = classAlerts

        //alerts.push(classAlerts)
        alerts = alerts.concat(classAlerts)

        classroom.mensajes.alerts = classAlerts.length

        classroom.estado = parseConfort(classroom.series, classroom.tiempoUso)

        classroom.estado.general = getGeneralConfort(classroom.estado)

        classroom.indicadoresMejoras = {
          iluminacionPlano: classroom.datosIniciales.iluminacionPlano,
          iluminacionPizarra: classroom.datosIniciales.iluminacionPizarra,
          inteligibilidad: classroom.datosIniciales.inteligibilidad,
          frio: getScore(classroom.estado.frio),
          calor: getScore(classroom.estado.calor),
          humedad: getScore(classroom.estado.calor),
          co2: getScore(classroom.estado.co2),
          ruido: getScore(classroom.estado.ruido),
        }

        classroom.problemas = getProblemas(classroom.indicadoresMejoras)

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
            apellidoPaterno: faker.name.lastName(),
            apellidoMaterno: faker.name.lastName(),
            ausentismo: faker.random.numeric({ min: 0, max: 5 }),
            isActive: Math.random() > 0.3,
          }
          person.padre = {
            nombre: faker.name.firstName({ sex: "male" }),
            apellido: person.apellidoPaterno,
          }
          person.madre = {
            nombre: faker.name.firstName({ sex: "female" }),
            apellido: person.apellidoMaterno,
          }
          person.apoderado = faker.random.numeric({ min: 0, max: 1 })
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
    mejoras,
    problemas,
  }
}

export default generateFullData
