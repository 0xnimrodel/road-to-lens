import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { SEARCH } from '../queries/searchQuery.js'
import client from '../apollo-client'
import { useQuery, useMutation, gql } from '@apollo/client'

export default function Search() {
  const [searchResult, setsearchResult] = useState([])
  const [searchQuery, setsearchQuery] = useState('')

  const search = async (value) => {
    console.log('searching', value)
    const result = await client.query({
      query: gql(SEARCH),
      variables: {
        request: {
          query: value,
          type: 'PROFILE',
          limit: 10,
        },
      },
    })

    console.log(result.data.search.items)
    return result.data.search.items
  }

  const handleSearchChange = async (event) => {
    const value = event.target.value
    setsearchQuery(value)
    const result = await search(value)

    if (value === '') {
      setsearchResult([])
    } else {
      setsearchResult(result)
      console.log('result from lens', result)
    }
  }

  const clearInput = () => {
    setsearchResult([])
    setsearchQuery('')
  }

  return (
    <div className='mt-8 max-w-2xl m-auto'>
      <input
        className='h-8 p-4 text-sm w-full border border-gray-200 rounded-lg focus:outline-none'
        placeholder='Search'
        onChange={handleSearchChange}
      />
      {searchResult.length != 0 && (
        <div className='border dark:border-gray-700 bg-white dark:bg-gray-900'>
          <div className='w-24 h-6'>
            {searchResult.map((value, key) => {
              return (
                <div
                  key={key}
                  className='py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  {value.handle}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {/* <button
        onClick={search}
        className='flex items-center border-gray-200 bg-gray-100 hover:bg-red-400 hover:border-red-200 absolute right-0 inset-y-0 border px-6 rounded-r-lg transition group'
      >
        <SearchIcon className='w-4 h-4 text-gray-600 group-hover:text-red-50' />
      </button> */}
    </div>
  )
}
