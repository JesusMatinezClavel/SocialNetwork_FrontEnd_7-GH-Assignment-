const root = 'http://localhost:4000/api'

export const loginService = async (loginData) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(loginData)
    }
    try {
        const response = await fetch(`${root}/auth/login`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

export const getOwnProfileService = async (profileData) => {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'Application/json'
        },
    }
    try {
        const response = await fetch(`${root}/users/profile`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}
