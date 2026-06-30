import { BASE_URL } from './config.js'

export async function getProducts(){
    const res = await fetch(`${BASE_URL}/products`)

    if(!res.ok){
        throw new Error('Không lấy được danh sách sản phẩm')
    }

    return await res.json()
}

export async function getProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`)

    if(!res.ok){
        throw new Error('Không tìm thấy sản phẩm')
    }

    return await res.json()
}

export async function createProduct(product) {
    const res = await fetch(`${BASE_URL}/products`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })

    if(!res.ok){
        throw new Error('Không thể thêm sản phẩm')
    }

    return await res.json()
}

export async function updateProduct(id, product) {
    const res = await fetch(`${BASE_URL}/products/${id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    if(!res.ok){
        throw new Error('Không thể cập nhật sản phẩm')
    }

    return await res.json()
}

export async function deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`,{
        method: 'DELETE'
    })

    if(!res.ok){
        throw new Error('Không thể xóa sản phẩm')
    }

    return await res.json()
}