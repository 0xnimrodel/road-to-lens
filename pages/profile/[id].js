import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import fetchProfileQuery from '../../src/queries/fetchProfileQuery.js'
import Profile from '../../src/components/Profile.js'
import PostItem from '../../src/components/PostItem.js'

export default function ProfilePage() {
  const router = useRouter()
  const { id } = router.query
  
  console.log('fetching profile for', id)

  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: id },
      publicationsRequest: {
        profileId: id,
        publicationTypes: ['POST'],
      },
      reactionRequest: {
        profileId: id,
      }
    },
  })

  console.log('data from api', data)

  if (loading) return 'Loading..'
  if (error) return `Error! ${error.message}`


  return (
    <div className='flex flex-col p-8 items-center'>
      <Profile profile={data?.profile} displayFullProfile={true} />
      {data?.publications?.items.map((post, idx) => {
        return <PostItem key={idx} post={post} />
      })}
    </div>
  )
}
