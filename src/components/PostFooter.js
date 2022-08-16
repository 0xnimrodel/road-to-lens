import { HeartIcon as HeartIconOutlined } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { CollectionIcon as CollectionIconOutlined } from '@heroicons/react/outline'
import { CollectionIcon as CollectionIconSolid } from '@heroicons/react/solid'
import { SwitchHorizontalIcon } from '@heroicons/react/outline'
import { ChatAlt2Icon } from '@heroicons/react/outline'

export default function PostFooter({ post }) {
  /**
   * 
    post.stats.totalAmountOfCollects
    post.stats.totalAmountOfComments
    post.stats.totalAmountOfMirrors
    post.stats.totalUpvotes

    post.hasCollectedByMe

    post.id (publicationId)

    post.collectModule.__typeName -> FreeCollectModuleSettings

   */

  return (
    <div className='flex h-10 mt-4 text-slate-500 dark:text-neutral-400'>
      <div className='flex items-center'>
        <div className='icon'>
          <ChatAlt2Icon width={20} />
        </div>
        <p className='text-xs ml-1'>{post?.stats?.totalAmountOfComments}</p>
      </div>
      <div className='flex items-center ml-8'>
        <div className='icon'>
          <SwitchHorizontalIcon width={20} />
        </div>
        <p className='text-xs ml-1'>{post?.stats?.totalAmountOfMirrors}</p>
      </div>
      <div className='flex items-center ml-8'>
        <div className='icon'>
          <HeartIconOutlined width={20} />
        </div>
        <p className='text-xs ml-1'>{post?.stats?.totalUpvotes}</p>
      </div>
      {post?.collectModule?.__typename !== 'RevertCollectModuleSettings' && (
        <div className='flex items-center ml-8'>
          <div className='icon'>
            {post.hasCollectedByMe ? (
              <CollectionIconSolid width={20} />
            ) : (
              <CollectionIconOutlined width={20} />
            )}
          </div>
          <p className='text-xs ml-1'>{post?.stats?.totalAmountOfCollects}</p>
        </div>
      )}
    </div>
  )
}
