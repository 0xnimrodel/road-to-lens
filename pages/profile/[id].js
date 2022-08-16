import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import profileQuery from '../../src/queries/profileQuery'
import Profile from '../../src/components/Profile'
import PostItem from '../../src/components/PostItem'
import Layout from '../../src/components/Layout'

export default function ProfilePage() {
  const router = useRouter()
  const { id } = router.query

  console.log('fetching profile for', id)

  const { loading, error, data } = useQuery(profileQuery, {
    variables: {
      request: { profileId: id },
      publicationsRequest: {
        profileId: id,
        publicationTypes: ['POST'],
      },
      reactionRequest: {
        profileId: id,
      },
    },
  })

  console.log('data from api', data)

  if (loading) return 'Loading..'
  if (error) return `Error! ${error.message}`

  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <Profile profile={data?.profile} displayFullProfile={true} />
        {data?.publications?.items.map((post, idx) => {
          return <PostItem key={idx} post={post} />
        })}
      </div>
    </Layout>
  )
}
