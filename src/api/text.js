import request from '../utils/httpInstance'
export function getNewSongs()
{
    return request.get("/top/song");
}