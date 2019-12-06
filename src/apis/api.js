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
        localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const refresh_token = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await api.post(
            'token-refresh/',
            {token}
        )
        const result = await response.data
        localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
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
        alert("주문 생성에 실패했습니다!\n에러 메시지: " + err.toString())
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

export const completeOrderPayment = async (order_id, paid_amount) => {
    try {
        const response = await api.post(
            'api/completeOrderPayment/',
            {order_id, paid_amount}
        )
        const result = await response.data
        return result
    } catch (err) {
        alert("결제가 완료되었으나, 주문 승인에 실패했습니다! 두드림퀵 카카오 플러스친구로 문의해주세요.\n에러 메시지: " + err.toString())
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

export const getUserDefaultLocations = async () => {
    try {
        const header = await get_header()
        if (header.Authorization) {
            const response = await api.post(
                'api/getUserDefaultLocations/',
                {},
                {headers: header}
            )
            const result = await response.data
            return result
        } else {
            return null
        }
    } catch (err) {
        console.log(err)
    }
}

export const addUserLocation = async (name, location, location_detail, phone) => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/addUserLocation/',
            {name, location, location_detail, phone},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const deleteUserLocation = async location_id => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/deleteUserLocation/',
            {location_id},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const setDefaultLocation = async (target, location_id) => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/setDefaultLocation/',
            {target, location_id},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getNews = async () => {
    try {
        const response = await api.get(
            'api/getNews/'
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const findUsername = async username => {
    try {
        const response = await api.post(
            'api/findUsername/',
            {username}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
    }
}

export const resetPassword = async username => {
    try {
        const response = await api.post(
            'api/resetPassword/',
            {username}
        )
        const result = await response.data
        return result
    } catch (err) {
        if (err.toString().includes("User does not exist.")) {
            alert("이메일 주소를 찾을 수 없습니다!")
        } else {
            alert("이메일을 전송할 수 없습니다. 에러 메시지: " + err.toString())
        }
    }
}

export const editUserInfo = async (username, password) => {
    try {
        const header = await get_header()
        const response = await api.post(
            'api/editUserInfo/',
            {username, password},
            {headers: header}
        )
        const result = response.data
        return result
    } catch (err) {
        alert(err)
    }
}

export const getNoticeModal = async () => {
    try {
        const response = await api.get('api/getNoticeModal/')
        const result = response.data
        return result
    } catch (err) {
        console.log(err)
    }
}
