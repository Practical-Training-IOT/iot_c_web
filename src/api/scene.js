import service from '@/utils/request'

export const sceneList = () => {
    return service({
        url: '/scene/sceneList',
        method: 'get',
    })
}

export const sceneDetail = (params) => {
    return service({
        url: '/scene/sceneDetail',
        method: 'get',
        params
    })
}

export const sceneUpdateEnabled = (data) => {
    return service({
        url: '/scene/sceneUpdateEnabled',
        method: 'post',
        data
    })
}
