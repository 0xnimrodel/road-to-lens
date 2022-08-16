import React, { useEffect, useRef, useState } from 'react'
import { SEARCH } from '../queries/searchQuery'
import apolloClient from '../apollo-client'
import ProfilePreview from './ProfilePreview'

function Search() {
  const [searchResult, setSearchResult] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
        clearInput()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownRef])

  const searchLensProfile = async (value) => {
    console.log('searching', value)
    const result = await apolloClient.query({
      query: SEARCH,
      variables: {
        request: {
          query: value,
          type: 'PROFILE',
          limit: 5,
        },
      },
    })

    if (result.data && result.data.search.items.length > 0) {
      console.log('result from lens', result.data.search.items)
      setIsOpen(true)
      return result.data.search.items
    }

    return []
  }

  const handleSearch = async (event) => {
    const value = event.target.value
    setSearchQuery(value)

    if (value.length === 0) {
      setSearchResult([])
    } else {
      const result = await searchLensProfile(value)
      setSearchResult(result)
    }
  }

  const clearInput = () => {
    setSearchResult([])
    setSearchQuery('')
  }

  return (
    <div className='w-80'> 
      <div aria-hidden='true' className='max-w-xs mr-12'>
        <input
          className='h-8 p-4 text-sm w-full border border-gray-200 rounded-lg focus:outline-none dark:text-neutral-200 dark:border-neutral-600'
          placeholder='Search'
          onChange={handleSearch}
          value={searchQuery}
        />

        {isOpen && (
          <div
            className='flex absolute flex-col mt-2 w-full sm:max-w-md '
            ref={dropdownRef}
          >
            {searchQuery.length > 0 && (
              <div className='rounded-none sm:rounded-xl border dark:border-neutral-600 bg-white dark:bg-neutral-800 overflow-y-auto py-2 max-h-[80vh] dark:text-neutral-200'>
                {searchResult.map((profile, index) => {
                  return (
                    <ProfilePreview
                      key={index}
                      profile={profile}
                      component='search'
                    />
                  )
                })}
                {searchResult.length === 0 && (
                  <div className='py-2 px-4'>No matching profiles</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
