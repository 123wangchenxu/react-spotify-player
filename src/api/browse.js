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