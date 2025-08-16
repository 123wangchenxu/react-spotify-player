import request from '../utils/httpInstance'
export function getSongDetail(hash)
{
    return request.get('/privilege/lite',{
        params:
        {
            hash
        }
    })
}
export function SearchLyrics(hash)
{
    return request.get('/search/lyric',{
        params:
        {
            hash
        }
    })
}
export function getLyrics(id,accesskey)
{
    return request.get('/lyric',{
        params:
        {
            id,
            accesskey,
            fmt:'lrc',
            decode:true
        }
    })
}