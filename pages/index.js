import { useQuery } from '@apollo/client'
import recommendedProfilesQuery from '../queries/recommendedProfilesQuery.js'
import Profile from '../components/Profile.js'
import Search from '../components/Search.js'
import SearchBar from '../components/Search2.js'


export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery)

  if (loading) return 'Loading..'
  if (error) return `Error! ${error.message}`

  return (
    <>
      <SearchBar/>
      <div>
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
    </>
  )
}
