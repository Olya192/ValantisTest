import md5 from 'js-md5'

const host = 'http://api.valantis.store:40000/'


export async function getProduct(action, params) {

    const response = await fetch(host, {
        method: "POST",
        body: JSON.stringify({
            action: action,
            params: params,
        }),
        headers: {
            "content-type": "application/json",
            "X-Auth": md5("Valantis_20240310"),
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

