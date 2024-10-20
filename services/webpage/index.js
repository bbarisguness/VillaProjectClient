const apiUrl = process.env.NEXT_PUBLIC_API_URL
const companyId = process.env.NEXT_PUBLIC_COMPANY_ID

async function getFrequentlyAskedQuestions(page = 1) {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?CompanyId=${companyId}&Language=tr&MenuId=35d6fdfa-2928-47dd-4de2-08dce9d46910`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}


export { getFrequentlyAskedQuestions }