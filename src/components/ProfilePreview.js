// components/Post.js
import Image from 'next/image'
import Link from 'next/link'

function getImage(profile) {
  return profile.picture?.original?.url
    ? profile.picture?.original?.url
    : profile.picture?.uri
    ? profile.picture?.uri
    : `https://avatar.tobi.sh/${profile.handle}.png`
}

export default function ProfilePreview({ profile, component }) {
  
  return (
    <div
      className={component === 'search' ? 'py-2 px-4 hover:bg-gray-700' : ''}
    >
      <div className='flex justify-between items-center '>
        <Link
          href={`/profile/${profile?.id ? profile.id : profile?.profileId}`}
        >
          <a href={`/profile/${profile?.id ? profile.id : profile?.profileId}`}>
            <div className='flex items-center space-x-3'>
              <img
                src={getImage(profile)}
                loading='lazy'
                className='w-10 h-10 bg-gray-200 rounded-full border'
                height={40}
                width={40}
                alt={profile.name}
              />
              <div>
                <div className='flex gap-1 items-center max-w-sm truncate'>
                  <div className='text-md'>
                    {profile.name ?? profile.handle}
                  </div>
                </div>
                <span className='text-lime-500 text-xs'>@{profile.handle}</span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
