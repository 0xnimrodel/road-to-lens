import { useQuery } from '@apollo/client'
import recommendedProfilesQuery from '../src/queries/recommendedProfilesQuery.js'
import Profile from '../src/components/Profile.js'
import Search from '../src/components/Search.js'
import Header from '../src/components/Header.js'

export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery)

  if (loading) return 'Loading..'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {/* <Header/> */}
      <div className='flex justify-center mt-8'>
        <Search />
      </div>
      <div className='pt-12'>
        {data.recommendedProfiles.map((profile, index) => {
          console.log(`Profile ${index}:`, profile)
          return (
            <Profile
              key={profile.id}
              profile={profile}
              displayFullProfile={false}
            />
          )
        })}
      </div>
    </div>
  )
}
