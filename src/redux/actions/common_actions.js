export const GET_SETTING = 'GET_SETTING'

export const get_setting = setting => {
    return ({
        type: GET_SETTING,
        payload: {setting},
    })
}
