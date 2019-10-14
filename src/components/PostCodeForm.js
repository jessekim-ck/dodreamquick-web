import React from 'react'
import DaumPostCode from "react-daum-postcode"


const PostCodeForm = props => {

    const on_select_address = on_complete => data => {
        let address = data.address
        let extra_address = ''

        if (data.userSelectedType === 'R') {
            address = data.roadAddress
        } else {
            address = data.jibunAddress
        }

        if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extra_address += data.bname
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extra_address += (extra_address !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            if (extra_address !== '') {
                extra_address += ' (' + extra_address + ')'
            }
        } else {
            extra_address = ''
        }

        const full_address = address + extra_address

        on_complete(full_address)
    }

    return (
        <div>
            <DaumPostCode onComplete={on_select_address(props.on_complete)}/>
        </div>
    )
}

export default PostCodeForm