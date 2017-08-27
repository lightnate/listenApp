import axios from 'axios'
const musicAxios = axios.create({
  baseURL: 'https://api.imjad.cn/'
})

export default {
  getMusic(id, type, fn) {
    musicAxios.get(('/cloudmusic/'), {
      params: {
        id,
        type
      }
    }).then(res => {
      switch (type) {
        case 'song':
          fn(res.data.data[0].url)
          break
        case 'lyric':
          fn(res.data.nolyric ? '' : res.data.lrc.lyric)
          break
        case 'album':
          fn(res.data)
      }
    })
  },
  searchMusic(keyword, fn) {
    musicAxios.get(('/cloudmusic/'), {
      params: {
				type: 'search',
        s: keyword
      }
    }).then(res => {
        fn(res.data.result)
    })
  }
}
