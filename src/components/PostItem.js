// components/Post.js
import Link from 'next/link'
import Image from 'next/image'
import ProfilePreview from './ProfilePreview'
import { getPublication } from './GetComments'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Attachments from './Attachments'
import moment from 'moment'
import { Interweave } from 'interweave'
import { UrlMatcher } from 'interweave-autolink'
import PostFooter from './PostFooter'

export default function PostItem({ post }) {
  /**
   * 
    -Profile Image/Avatar 
    -Profile Name 
    -Post title
    -post description
    -Post Resource (Image / text or Video or Music)
    -time when it was created
    -comments
    
    post.profile.name
    post.profile.picture.original.url
    post.metadata.name
    post.metadata.content
    post.metadata.description
    post.createdAt

    post.metadata.media[] -> original.mimeType
    post.metadata.media[] -> original.url

    post.stats.totalAmountOfCollects
    post.stats.totalAmountOfComments
    post.stats.totalAmountOfMirrors

    post.id (publicationId)

   */
  // if(post.stats.totalAmountOfComments > 0) {
  //   console.log(post.id)
  //   getPublication(post.id)
  //  }
  //  console.log(post.stats.totalAmountOfComments)

  const [readMore, setReadMore] = useState(
    post?.metadata?.content?.length > 450
  )

  const sliceAttachments = (attachments) => {
    const result = attachments?.some(
      (e) => e.original?.mimeType === 'video/mp4'
    )
      ? attachments?.slice(0, 1)
      : attachments?.slice(0, 4)
    return result
  }

  return (
    <div className='pb-1 max-w-md md:max-w-2xl ' style={{ width: '42rem' }}>
      <div className='max-w-md mx-auto dark:bg-neutral-800 dark:shadow-neutral-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'>
        <div className='flex justify-between mb-4'>
          <ProfilePreview profile={post?.profile} />
          <p className='text-xs text-slate-500 dark:text-zinc-400 whitespace-pre-line'>
            {moment(post?.createdAt).format('lll')}
          </p>
        </div>
        <div className={readMore ? 'line-clamp-5 text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-400 dark:to-neutral-900' : ''}>
          <div className='colored-link'>
            <Interweave
              content={post?.metadata?.content}
              escapeHtml
              allowList={['b', 'i', 'a', 'br', 'code', 'span']}
              newWindow
              matchers={[new UrlMatcher('url', { validateTLD: false })]}
            />
          </div>
        </div>
        {readMore && (
            <button
              type="button"
              className="mt-2 text-sm font-bold dark:text-neutral-200"
              onClick={() => setReadMore(!readMore)}
            >
              Read more
            </button>
          )}
        {post?.metadata?.media?.length > 0 && (
          <Attachments attachments={sliceAttachments(post?.metadata?.media)} />
        )}
        <PostFooter post={post} />
      </div>
    </div>
  )
}
