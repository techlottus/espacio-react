import { types } from "../../types/types"

export const setStudyRecordInformation = (info) => {
  return {
    type: types.procedureStudyRecordInfo, 
    payload: {
      information: {
        ...info
      }
    }
  }
}

export const setStudyRecordDocument = (file) => {
  return {
    type: types.procedureStudyRecordDoc, 
    payload: {
      document: file
    }
  }

}

export const setStudyRecordModal = (modal) => {
  return {
    type: types.procedureStudyRecordModal, 
    payload: {
      modal
    }
  }

}

export const setStudyRecordData = (data) => {
  return {
    type: types.procedureStudyRecordData, 
    payload: {
      data: {
        phone: data.phone || null,
        selectTypeRecord: data.selectTypeRecord || null,
        selectTypeDelivery: data.selectTypeDelivery || null,
        selectCampusDelivery: data.selectCampusDelivery || null,
        isCheck: data.isCheck || false,
        comments: data.comments || null,
      }
    }
  }
}

export const setStudyRecordExtra = (extra) => {
  return {
    type: types.proceduresStudyRecordExtra,
    payload:{
      extra:{
        cost: extra.cost || null,
        detailId: extra.detailId || null
      }
    }
  }
}

export const setStudyRecordReset = () => {
  return {
    type: types.procedureStudyRecordReset, 
    payload: {}
  }

}