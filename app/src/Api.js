import md5 from 'js-md5'

const host = 'https://api.valantis.store:41000/'
let date = new Date()
date = date.toISOString().split('T')[0].replaceAll('-', '')


export async function getProduct(action, params) {

    console.log('date', date)

    const response = await fetch(host, {
        method: "POST",
        body: JSON.stringify({
            action: action,
            params: params,
        }),
        headers: {
            "content-type": "application/json",
            "X-Auth": md5(`Valantis_${date}`),
        }
    });

    if (response.status === 200) {
        return response.json()
    } else {
        const error = await response.text()
        console.log('error', error)
        console.log('getProd')
        console.log('action', action, params)
        getProduct(action, params)
    }
}

