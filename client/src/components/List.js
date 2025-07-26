import React from 'react'

import {default as api} from '../store/apiSlice'
export default function List() {

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()

    let Transactions;

    if(isFetching){
        Transactions = <div>Fetching</div>
    }else if(isSuccess){
        Transactions = data.map((v,i) => <Transaction key={i} category={v}></Transaction>)
    }else if(isError){
        Transactions = <div>Error</div>

    }else{
        console.log("erro")
    }

    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 text-md font-bold text-xl'>History</h1>
            {Transactions}
        </div>
    )
}


function Transaction({ category }) {
    if (!category) return null
    console.log(category)
    return (
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{ borderRight: `8px solid ${category.color}` }}>
            <button className='px-3'><box-icon name='trash'></box-icon></button>
            <span className='block w-full'>{category.name}</span>
        </div>
    )
}
