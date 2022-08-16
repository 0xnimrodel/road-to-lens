import Link from 'next/link'
import Layout from './Layout'
export default function Profile({ profile, displayFullProfile }) {
  return (
    
      <div className='px-8 py-2'>
        <Link href={`/profile/${profile?.id}`}>
          <div className='max-w-md mx-auto bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
            <div className='md:flex'>
              <div className='md:shrink-0'>
                {profile?.picture ? (
                  <img
                    src={
                      profile.picture.original
                        ? profile.picture.original.url
                        : profile.picture.uri
                    }
                    className='h-48 w-full object-cover md:h-full md:w-48'
                  />
                ) : (
                  <div
                    style={{
                      backgrondColor: 'gray',
                    }}
                    className='h-48 w-full object-cover md:h-full md:w-48'
                  />
                )}
              </div>
              <div className='p-8'>
                <div className='uppercase tracking-wide text-sm text-indigo-500 dark:text-lime-500 font-semibold'>
                  {profile?.handle}
                  {displayFullProfile &&
                    profile?.name &&
                    ' (' + profile?.name + ')'}
                </div>
                <div className='block mt-1 text-sm leading-tight font-medium text-black dark:text-neutral-400 hover:underline'>
                  {profile?.bio}
                </div>
                <div className='mt-2 text-sm text-slate-900 dark:text-neutral-300'>
                  {profile?.ownedBy}
                </div>
                <p className='mt-2 text-xs text-slate-500 dark:text-neutral-100'>
                  following: {profile?.stats.totalFollowing} followers:{' '}
                  {profile?.stats.totalFollowers}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
}
