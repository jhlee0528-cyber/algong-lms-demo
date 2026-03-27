const SET_PUBLISHER = (state, value) => {
  state.publisher = value
}

const SET_LINEDATA_AVERAGE = (state, value) => {
  state.lineDataAverage = value
}

const SET_LINEDATA = (state, value) => {
  state.lineData = value
}

const SET_RADARDATA = (state, value) => {
  state.radarData = value
}

const SET_RADARDATA_AVERAGE = (state, value) => {
  state.radarDataAverage = value
}

const SET_CHECK_MSG = async (state, res) => {
  if (res.data == true) {
    state.isagree = true
  } else {
    state.iswrong = true
  }
}

const SET_PRON_RADARDATA = async(state, value) => {
  state.pronRadarData = value
}

const SET_CURRENT_BRANCH = (state, value) => {
  state.currentBranch = value
}

export {
  SET_PUBLISHER,
  SET_LINEDATA_AVERAGE,
  SET_LINEDATA,
  SET_RADARDATA,
  SET_RADARDATA_AVERAGE,
  SET_CHECK_MSG,
  SET_PRON_RADARDATA,
  SET_CURRENT_BRANCH
}
