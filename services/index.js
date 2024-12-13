async function getCurrencies() {
    const response = await fetch(`https://labirentapp.testgrande.com/api/Clients/GetCurrencies`)
    const data = await response.json()
    return data
}

export { getCurrencies }