import service from '@/utils/request'

export const getUserInfo = (params) => {
    return service({
        url: '/user/getUserInfo',
        method: 'get',
        params
    })
}

export const updateUserInfo = (data) => {
    return service({
        url: '/user/updateUserInfo',
        method: 'post',
        data
    })
}

export const uploadAvatar = (formData) => {
    return service({
        url: '/user/uploadAvatar',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
