export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const log_in = current_user => {
    return ({
        type: LOG_IN,
        payload: {...current_user},
    })
}

export const log_out = () => {
    return ({
        type: LOG_OUT,
        payload: {},
    })
}
