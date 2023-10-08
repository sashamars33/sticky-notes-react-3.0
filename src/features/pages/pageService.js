import axios from 'axios'

const API_URL = 'https://shy-red-perch-veil.cyclic.app/api/pages'

const createPage = async(pageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${API_URL}/create-page`, pageData, config)
    console.log(res.data)
    return res.data
}

const getPages = async(token, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/${user}`, config)
    return res.data
}

const setSelected = async(token, page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/${page}/select`, config)
    return res.data
}

const resetPages = async(token, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/${user}/deselect`, config)
    return res.data
}

const deletePage = async(token, page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/${page}/delete-page`, config)
    return res.data
}

const pageService = {
    createPage,
    getPages,
    setSelected,
    resetPages,
    deletePage
}

export default pageService