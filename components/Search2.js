import React, { useEffect, useRef, useState } from 'react'
import { gql } from '@apollo/client'
import { SEARCH } from '../queries/searchQuery'
import client from '../apollo-client'
import Link from 'next/link'
import { useRouter } from 'next/router'

function SearchBar() {
  const { push, pathname, query } = useRouter()
  const [searchResult, setsearchResult] = useState([])
  const [searchQuery, setsearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  let searchUsersLoading = false

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
        clearInput()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)

    // Reload only if ref or handler changes
  }, [dropdownRef])

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
    return result.data
  }

  const handleSearchChange = async (event) => {
    const value = event.target.value
    setsearchQuery(value)
    const result = await search(value)

    if (value === '') {
      setsearchResult([])
    } else {
      setsearchResult(result)
      setIsOpen(true)
      console.log('result from lens api', result)
    }
  }

  const handleKeyDown = (e) => {
    e.preventDefault()
    push(`/search?q=${searchQuery}&type=profiles`)
    setsearchQuery('')
  }

  const clearInput = () => {
    setsearchResult([])
    setsearchQuery('')
  }

  return (
    <div>
      <div aria-hidden='true' className='mt-8 max-w-2xl m-auto'>
        <input
          className='h-8 p-4 text-sm w-full border border-gray-200 rounded-lg focus:outline-none'
          placeholder='Search'
          onChange={handleSearchChange}
          value={searchQuery}
        />

        {searchQuery.length > 0 && isOpen && (
          <div
            className='flex absolute flex-col mt-2 w-full sm:max-w-md'
            ref={dropdownRef}
          >
            <div className='rounded-none sm:rounded-xl border bg-white overflow-y-auto py-2 max-h-[80vh]'>
              {searchUsersLoading ? (
                <div className='py-2 px-4 space-y-2 text-sm font-bold text-center'>
                  <div>Searching users</div>
                </div>
              ) : (
                <>
                  {searchResult?.search?.items?.map((profile) => (
                    <div
                      key={profile?.handle}
                      className='py-2 px-4 hover:bg-gray-100'
                    >
                      <Link href={`/profile/${profile?.profileId}`}>
                        <a
                          href={`/profile/${profile?.profileId}`}
                          onClick={() => setsearchQuery('')}
                        >
                          <div className='flex justify-between items-center'>
                            <Link href={`/profile/${profile?.profileId}`}>
                              <a href={`/profile/${profile?.profileId}`}>
                                <div className='flex items-center space-x-3'>
                                  <img
                                    src={
                                      profile?.picture?.original?.url
                                        ? profile?.picture?.original?.url
                                        : `https://avatar.tobi.sh/${profile?.handle}.png`
                                    }
                                    loading='lazy'
                                    className='w-10 h-10 bg-gray-200 rounded-full border'
                                    height={40}
                                    width={40}
                                    alt={profile?.handle}
                                  />
                                  <div>
                                    <div className='flex gap-1 items-center max-w-sm truncate'>
                                      <div className='text-md'>
                                        {profile?.name ?? profile?.handle}
                                      </div>
                                    </div>
                                    <span className='text-gray-400 text-xs'>
                                      @{profile?.handle}
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                  {searchResult?.search?.items?.length === 0 && (
                    <div className='py-2 px-4'>No matching users</div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
