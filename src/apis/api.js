import {api, get_header} from './config'


export const sign_up = async (username, password) => {
    try {
        const response = await api.post(
            'api/sign_up/',
            {username, password}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const authenticate_user = async (username, password) => {
    try {
        const response = await api.post(
            'token-auth/',
            {username, password}
        )
        const result = await response.data
        await localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        await localStorage.removeItem('token')
        throw err
    }
}

export const refresh_token = async () => {
    try {
        const token = await localStorage.getItem('token')
        const response = await api.post(
            'token-refresh/',
            {token}
        )
        const result = await response.data
        await localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        await localStorage.removeItem('token')
        throw err
    }
}

export const get_current_user = async () => {
    try {
        const headers = await get_header()
        const response = await api.get(
            'api/current_user/',
            {headers: headers}
        )
        const result = response.data
        return result
    } catch (err) {
        console.log(err)
        await localStorage.removeItem('token')
        throw err
    }
}

export const addOrder = async order_data => {
    try {
        const response = await api.post(
            'api/addOrder/',
            {...order_data}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const makeOrderPaid = async order_id => {
    try {
        const response = await api.post(
            'api/makeOrderPaid/',
            {order_id}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const validateIMPPayment = async (imp_uid, price_dodream) => {
    try {
        const response = await api.post(
            'api/validateIMPPayment/',
            {imp_uid, price_dodream}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getOrderPrice = async (sender_address, receiver_address) => {
    try {
        const response = await api.post(
            'api/getOrderPrice/',
            {sender_address, receiver_address}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getLocationList = async () => {
    try {
        const response = await api.get(
            'api/getLocationList/'
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getNoticeList = async () => {
    try {
        const response = await api.get(
            'api/getNoticeList/'
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getFAQList = async () => {
    try {
        const response = await api.get(
            'api/getFAQList/'
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getUserLocationList = async () => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/getUserLocationList/',
            {},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const addUserLocation = async user_location_name => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/addUserLocation/',
            {user_location_name},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const setDefaultLocation = async (target, location) => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/setDefaultLocation/',
            {target, location},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}