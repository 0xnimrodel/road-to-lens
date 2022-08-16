import { useQuery } from '@apollo/client'
import recommendedProfilesQuery from '../src/queries/recommendedProfilesQuery'
import Profile from '../src/components/Profile'
import Search from '../src/components/Search'
import Header from '../src/components/Header'

export default function Home() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery)

  if (loading) return 'Loading..'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <Header />
      <div className='pt-24'>
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
