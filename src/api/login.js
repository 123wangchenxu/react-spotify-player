import request from "../utils/httpInstance";
export function getCode(mobile)
{
    return request.get("/captcha/sent",{
        params:
        {
            mobile
        }
    });
}
export function getLogin(mobile,code)
{
    return request.get("/login/cellphone",{
        params:
        {
            mobile,
            code
        }
    });
}