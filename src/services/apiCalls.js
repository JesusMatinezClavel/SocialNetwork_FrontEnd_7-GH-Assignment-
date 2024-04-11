const root = 'http://localhost:4000/api'


// Auth Calls
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

// User Calls
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

export const getUserByIdService = async (token, userId) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/users/${userId}`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

// Posts Calls
export const getAllPostsService = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/posts`, options)
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

export const getPostByIdService = async (token, postId) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/posts/${postId}`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

// Chats Calls
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

export const getChatByIdService = async (token, chatId) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/chats/${chatId}`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}


export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("profileImg", file)

    const options = {
        method: "POST",
        body: formData,
    };

    console.log(file);

    try {
        const response = await fetch(`${root}/files/upload`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const getFile = async (file) => {
    const options = {
        method: 'GET',
    }
    try {
        const response = await fetch(`${root}/files/${file}`, options)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const blob = await response.blob()

        const url = window.URL.createObjectURL(blob)

        return url
    } catch (error) {
        return error
    }
}

