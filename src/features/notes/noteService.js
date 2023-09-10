import axios from 'axios'

const API_URL = 'http://localhost:3333/api/pages'

const createNote = async(noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${API_URL}/create-note`, noteData, config)
    return res.data
}

const getNotes = async(token, page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/note/${page}`, config)
    return res.data
}

const checkNote = async(token, note) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/${note}/checked`, config)
    return res.data
}

const deleteNote = async(token, note) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/${note}/delete-note`, config)
    return res.data
}

const noteService = {
    createNote,
    getNotes,
    checkNote,
    deleteNote
}

export default noteService