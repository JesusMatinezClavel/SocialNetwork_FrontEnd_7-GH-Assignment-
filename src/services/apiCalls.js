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

export const logoutService = async (token) => {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/auth/logout`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

export const registerService = async (registerData) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(registerData)
    }
    try {
        const response = await fetch(`${root}/auth/register`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

export const getOwnProfileService = async (token) => {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
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

export const getOwnPostsService = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/posts/own`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

export const getOwnChatsService = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/chats/own`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}
