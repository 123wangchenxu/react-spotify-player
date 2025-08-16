import request from '../utils/httpInstance'
export function getAlbum(page,pageSize)
{
    return request.get('/top/album',{
        params:
        {
            page,
            pageSize,
            type:4
        }
    })
}