

// step 1
function getAuthToken() {
    return fetch('https://accept.paymobsolutions.com/api/auth/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: 'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SnVZVzFsSWpvaWFXNXBkR2xoYkNJc0ltTnNZWE56SWpvaVRXVnlZMmhoYm5RaUxDSndjbTltYVd4bFgzQnJJam8wTkRVd2ZRLmY3cnJkRWxsdmE4a1pQUGVvd2ZuRjFlenVYUWZFaWVSSy1PQmc3NTNZckhaalp2RkVRNmZmeVR4ZW8xUDBWVDZnbThjQlpTSFF4cndCNS10ZFFJUzlB'
        })
    })
        .then(res => res.json());
}

// step 2
function createOrderRegistration(data) {
    console.log(data);
    return fetch('https://accept.paymobsolutions.com/api/ecommerce/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auth_token: data.token,
            delivery_needed: false,
            merchant_id: data.merchant_id,
            amount_cents: '77777', // add the amount 200 = 2 EGP
            currency: 'EGP',
            merchant_order_id: 'TEST1005', // should change in every order registeration
            items: [],
            shipping_data: {      // Mandatory if the delivery is needed
                apartment: 803,
                email: 'claudette09@exa.com',
                floor: '10',
                first_name: 'Muhammad',
                last_name: 'Ibrahim',
                street: '20 taha',
                building: '20',
                phone_number: '+201068198542',
                postal_code: '22828',
                city: 'New Cairo',
                country: 'EG',
                state: 'Cairo'
            }
        })
    })
        .then(res => res.json());
}

// step 3
function getPaymentKey(data) {
    console.log(data);
    return fetch('https://accept.paymobsolutions.com/api/acceptance/payment_keys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auth_token: data.token,
            amount_cents: '77777', // add the amount 200 = 2 EGP
            currency: 'EGP',
            expiration: 3600,
            order_id: data.order_id,
            billing_data: {      // Mandatory if the delivery is needed
                apartment: 803,
                email: 'claudette09@exa.com',
                floor: '10',
                first_name: 'Muhammad',
                last_name: 'Ibrahim',
                street: '20 taha',
                building: '20',
                phone_number: '+201068198542',
                postal_code: '22828',
                city: 'New Cairo',
                country: 'EG',
                state: 'Cairo'
            },
            // 7209 for card
            // 7503 fro kiosk
            integration_id: 7503 // from weaccept website

        })
    })
        .then(res => res.json());
}

// kiosk step 4
function createKioskPayRequest(data) {
    return fetch('https://accept.paymobsolutions.com/api/acceptance/payments/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "source": {
                    "identifier": "AGGREGATOR",
                    "subtype": "AGGREGATOR"
                },
                "payment_token": data.paymentKey

            })
        })
        .then(res => res.json());
}

export { getAuthToken, createOrderRegistration, getPaymentKey, createKioskPayRequest };