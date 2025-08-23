import request from '../utils/httpInstance'
export function getEverydayRecommend()
{
    return request.get('/everyday/recommend',{
        params:
        {
            platform:'android'
        }
    })
}
export function getSingerImage(hash)
{
    return request.get('images/audio',{
        params:
        {
            hash
        }
    })
}
export function getPlayListTag()
{
    return request.get('/playlist/tags')
}
export function getKoreaSongs()
{
    return request.get('/top/playlist',{
        params:{
            category_id:23,
            withsong:1
        }
    })
}
export function get80Songs() {
  return request.get("/theme/playlist/track",{
    params:{
        theme_id:24
    }
  });
}
export function getKoreaListSong(id)
{
    return request.get('/playlist/track/all',{
        params:
        {
            id
        }
    })
}