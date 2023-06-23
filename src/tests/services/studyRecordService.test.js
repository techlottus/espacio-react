import '@testing-library/jest-dom';
import {getStudyRecordHttp} from '../../services/procedures/studyRecordService';
import mockAxios from "jest-mock-axios";



describe('Test Service Study Record Axios',() => {

  afterEach(() => {
    mockAxios.reset();
  });

  test('should init component',async() => {
    const info = {
      "data": {
        "proofOfStudies": [
          {
            "label": "Constancia de Término 100%",
            "value": 11111111,
            "detailId": "1204",
            "cost": 480
          },
          {
            "label": "Créditos Constancia SEDENA",
            "value": 22222222,
            "detailId": "1204",
            "cost": 480
          },
          {
            "label": "Constancia con Promedio",
            "value": 33333333,
            "detailId": "1111",
            "cost": 590
          },
          {
            "label": "Constancia Ciclo Actual",
            "value": 44444444,
            "detailId": "1204",
            "cost": 480
          },
          {
            "label": "Constancia DGP",
            "value": 55555555,
            "detailId": "1204",
            "cost": 480
          }
        ],
        "delivery": [
          {
            "label": "Entrega en Campus",
            "value": 1
          },
          {
            "label": "Únicamente en Formato Digital",
            "value": 2
          }
        ],
        "campus": [
          {
            "label": "ATIZAPÁN",
            "value": 1
          },
          {
            "label": "CHALCO",
            "value": 2
          },
          {
            "label": "COACALCO",
            "value": 3
          },
          {
            "label": "CUAUTITLÁN",
            "value": 4
          },
          {
            "label": "ECATEPEC",
            "value": 5
          },
          {
            "label": "HAVRE",
            "value": 6
          },
          {
            "label": "IXTAPALUCA",
            "value": 7
          },
          {
            "label": "IZTAPALAPA",
            "value": 8
          },
          {
            "label": "LOS REYEZ",
            "value": 9
          },
          {
            "label": "NEZA",
            "value": 10
          },
          {
            "label": "TOLUCA",
            "value": 11
          },
          {
            "label": "TOREO",
            "value": 12
          },
          {
            "label": "ZONA ROSA",
            "value": 13
          }
        ],
        "modal": [
          {
            "label": "100% créditos",
            "value": "100Creditos",
            "description": "Este documento informa que el alumno cuenta con el 100% de sus créditos aprobados e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, número de acuerdo o clave de centro de trabajo, el horario en el cual asistió el alumno, el periodo de fechas en el cual concluyo los estudios y el promedio general obtenido.",
            "imageUrl": "https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276"
          },
          {
            "label": "SEDENA",
            "value": "sedena",
            "description": "Este documento está dirigido a la Secretaría de la Defensa Nacional (SEDENA) de acuerdo con las características del oficio solicitado por el alumno e incluye datos generales del alumno y datos de carácter académico, como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, etc.",
            "imageUrl": "https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276"
          },
          {
            "label": "Promedio",
            "value": "promedio",
            "description": "Este documento indica que el alumno se encuentra cursando un cuatrimestre e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, RVOE, número de acuerdo o clave de centro de trabajo, las fechas del ciclo y horario en el cual está cursando y las fechas del periodo vacacional y el promedio actual.",
            "imageUrl": "https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276"
          },
          {
            "label": "Ciclo Actual",
            "value": "cicloActual",
            "description": "Este documento indica que el alumno se encuentra cursando un cuatrimestre e incluye los datos generales del alumno, en número matrícula, datos académicos como el nombre de la institución, el nombre del programa, RVOE, número de acuerdo o clave de centro de trabajo, las fechas del ciclo y horario en el cual está cursando y las fechas del periodo vacacional.",
            "imageUrl": "https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276"
          },
          {
            "label": "DGP",
            "value": "dgp",
            "description": "Este documento está dirigido a la dirección general de profesiones e incluye datos de carácter académico, como el nombre de la institución, el nombre del programa, el nombre campus, RVOE, número de acuerdo en la que ha concluido sus estudió el alumno; si como, los datos generales del alumno, forma de titulación y promedio final.",
            "imageUrl": "https://www.enroll-u.com/_i/4/0/ebf3756e-4c23-11e9-9d80-0231b47980f0.png?w=276&h=276&fit=crop&s=276"
          }
        ]
      }
    };
    mockAxios.get.mockResolvedValueOnce(info)
    await getStudyRecordHttp();
    //console.log('data: ',data);
  })
});