const root = 'https://localhost:4000/api'

export const loginService = async (loginData) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(loginData)
    }
    try {
        const response = await (`${root}/auth/login`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}