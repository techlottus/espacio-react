
export const dataStudyRecordWihtoutInfoMock = {
  information: {
    phone: '5512345678',
    optionsTypeRecord: [
      {
        active: false,
        text: 'Constancia de Término 100%',
        value: '1'
      },
      {
        active: false,
        text: 'Créditos Constancia SEDENA',
        value: '2'
      },
      {
        active: false,
        text: 'Constancia con Promedio',
        value: '3'
      },
      {
        active: false,
        text: 'Constancia Ciclo Actual',
        value: '4'
      },
      {
        active: false,
        text: 'Constancia DGP',
        value: '5'
      }
    ],
    optionsTypeDelivery: [
      {
        active: false,
        text: 'Entrega en Campus',
        value: '1'
      },
      {
        active: false,
        text: 'Únicamente en Formato Digital',
        value: '2'
      }
    ],
    optionsCampusDelivery: [
      {
        active: false,
        text: 'ATIZAPÁN',
        value: '1'
      },
      {
        active: false,
        text: 'CHALCO',
        value: '2'
      },
      {
        active: false,
        text: 'COACALCO',
        value: '3'
      },
      {
        active: false,
        text: 'CUAUTITLÁN',
        value: '4'
      },
      {
        active: false,
        text: 'ECATEPEC',
        value: '5'
      },
      {
        active: false,
        text: 'HAVRE',
        value: '6'
      },
      {
        active: false,
        text: 'IXTAPALUCA',
        value: '7'
      },
      {
        active: false,
        text: 'IZTAPALAPA',
        value: '8'
      },
      {
        active: false,
        text: 'LOS REYEZ',
        value: '9'
      },
      {
        active: false,
        text: 'NEZA',
        value: '10'
      },
      {
        active: false,
        text: 'TOLUCA',
        value: '11'
      },
      {
        active: false,
        text: 'TOREO',
        value: '12'
      },
      {
        active: false,
        text: 'ZONA ROSA',
        value: '13'
      }
    ]
  },
  data: {
    phone: null,
    selectTypeRecord: null,
    selectTypeDelivery: null,
    selectCampusDelivery: null,
    isCheck: false,
    comments: null
  },
  document: null,
  modal: [
    {
      label: '100% créditos',
      value: '100Creditos',
      description: 'Este documento informa que el alumno cuenta con el 100% de sus créditos aprobados e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, número de acuerdo o clave de centro de trabajo, el horario en el cual asistió el alumno, el periodo de fechas en el cual concluyo los estudios y el promedio general obtenido.',
      imageUrl: 'https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276'
    },
    {
      label: 'SEDENA',
      value: 'sedena',
      description: 'Este documento está dirigido a la Secretaría de la Defensa Nacional (SEDENA) de acuerdo con las características del oficio solicitado por el alumno e incluye datos generales del alumno y datos de carácter académico, como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, etc.',
      imageUrl: 'https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276'
    },
    {
      label: 'Promedio',
      value: 'promedio',
      description: 'Este documento indica que el alumno se encuentra cursando un cuatrimestre e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, RVOE, número de acuerdo o clave de centro de trabajo, las fechas del ciclo y horario en el cual está cursando y las fechas del periodo vacacional y el promedio actual.',
      imageUrl: 'https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276'
    },
    {
      label: 'Ciclo Actual',
      value: 'cicloActual',
      description: 'Este documento indica que el alumno se encuentra cursando un cuatrimestre e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, RVOE, número de acuerdo o clave de centro de trabajo, las fechas del ciclo y horario en el cual está cursando y las fechas del periodo vacacional.',
      imageUrl: 'https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276'
    },
    {
      label: 'DGP',
      value: 'dgp',
      description: 'Este documento está dirigido a la dirección general de profesiones e incluye datos de carácter académico, como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, número de acuerdo en la que ha concluido sus estudió el alumno; si como, los datos generales del alumno, forma de titulación y promedio final.',
      imageUrl: 'https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276'
    }
  ]
}