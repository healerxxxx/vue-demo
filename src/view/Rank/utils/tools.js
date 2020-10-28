export const newClassifyData = {
  loading: false,
  data: null
}

export const newClassifyBasketData = {
  index: 0,
  0: {
    loading: false,
    data: null,
    type: 1
  },
  1: {
    loading: false,
    data: null,
    type: 2
  },
  2: {
    loading: false,
    data: null,
    type: 3
  },
  3: {
    loading: false,
    data: null,
    type: 4
  },
  4: {
    loading: false,
    data: null,
    type: 5
  }
}

export const lastIndex = {
  1: {
    leagueIndex: 0
  },
  2: {
    leagueIndex: 0
  }
}

export function getLeagueInfoObject (navIndex, classifyIndex) {
  return {
    navIndex: navIndex,
    classifyIndex: classifyIndex
  }
}

export function initSystemStatusHeight () {
  let h = 0
  if (/hongcai/gi.test(window.navigator.userAgent)) {
    h = 20
  }
  try {
    const _h = window.localStorage.getItem('systemStatusHeight')
    if (_h) {
      h = parseInt(_h)
    }
  } catch (error) {
  }
  return h
}
