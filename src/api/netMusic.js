import netMusicApi from './netMusicApi.js'

export default {
    searchMusic(keyword,fn) {
        let song = {},
            songs = []
        netMusicApi.searchMusic(keyword, result => {
            for(let i = 0;i < result.songs.length; i++){
                song = {
                    //专辑信息
                    al: {
                        id: result.songs[i].al.id,
                        name: result.songs[i].al.name,
                        picUrl: result.songs[i].al.picUrl
                    },
                    //歌手信息
                    ar: [{
                        id: result.songs[i].ar[0].id,
                        name: result.songs[i].ar[0].name
                    }],
                    //歌曲id
                    id: result.songs[i].id,
                    //歌曲名称
                    name: result.songs[i].name
                }
                songs.push(song)
            }
            fn(songs)
        })
    },
    getUrl(id, fn) {
        netMusicApi.getMusic(id, 'song', url =>{
            fn(url)
        })
    },
    getLyric(id, fn) {
        netMusicApi.getMusic(id, 'lyric', lyric => {
            if(lyric){
                let lyrics=[]
                lyric = lyric.split('\n') //以\n为单位把lyric划分字符串数组
                
                for(let i = 0; i < lyric.length; i++){
                    let repeatLyrics = []
                     //提取歌词
                    let _lyric = lyric[i].slice(lyric[i].lastIndexOf(']') + 1).trim()

                    //提取时间
                    let timeStrArr = lyric[i].match(/\d+:\d+\.\d+/g)
                    if(timeStrArr && timeStrArr.length > 0){
                        let timeNumArr = []
                        //将字符串时间格式转换为秒数
                        timeStrArr.forEach((value,index) => {
                            timeNumArr[index] = Number(value.split(':')[0]) * 60 + Number(value.split(':')[1])
                        })
                       
                        for(let i = 0; i < timeNumArr.length; i++){
                            repeatLyrics.push({
                                time: timeNumArr[i],
                                lyric: _lyric
                            })
                        }
                    }
                    //将每句歌词按照time进行排序
                    for(let i = 0;i < repeatLyrics.length;i++){
                        if(lyrics.length === 0){
                            lyrics.push(repeatLyrics[0])
                        }else{
                            for(let j = 0; j < lyrics.length; j++){
                                if(repeatLyrics[i].time < lyrics[j].time){
                                    lyrics.splice(j, 0 , repeatLyrics[i])
                                    break
                                }
                                if(j === lyrics.length - 1){
                                    lyrics.push(repeatLyrics[i])
                                    break
                                }
                            }
                        }
                        
                    }
                }
                fn(lyrics)
            }else{
                fn('')
            }
            
        })
    },
    getAlbum(id, fn){
        netMusicApi.getMusic(id, 'album', album =>{
            fn(album)
        })
    }
}