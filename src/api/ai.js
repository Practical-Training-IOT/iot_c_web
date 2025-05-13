import service from '@/utils/request'

export const getAiHistory = (params) => {
    return service({
        url: '/ai/history',
        method: 'get',
        params
    })
}

export const aiChange = (data) => {
    return service({
        url: '/ai/change',
        method: 'post',
        data
    })
}

export const getAiOneHistory = (data) => {
    return service({
        url: '/ai/oneHistory',
        method: 'post',
        data
    })
}

export const aiChat = (data) => {
    return service({
        url: '/ai/chat',
        method: 'post',
        data
    })
}