import { BASE_URL } from './config.js'

export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`)

    if(!res.ok){
        throw new Error('Không lấy được danh sách người dùng')
    }

    return await res.json()
}

export async function updateUser(id, data) {
    const res = await fetch(`${BASE_URL}/users/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error('Không thể cập nhật người dùng')
    }

    return await res.json()
}

export async function deleteUser(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`,{
        method: 'DELETE'
    })

    if(!res.ok){
        throw new Error('Không thể xóa người dùng')
    }

    return true
}