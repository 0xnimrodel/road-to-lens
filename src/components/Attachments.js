import dynamic from 'next/dynamic'

const Video = dynamic(() => import('./Video'), {
  loading: () => <div className='rounded-lg aspect-w-16 aspect-h-12 shimmer' />,
})

export default function Attachments({ attachments }) {

  return (
    <div className='grid grid-flow-col gap-2 pt-3 ' >
      {attachments.map((attachment, idx) => {
        return attachment.original.mimeType === 'video/mp4' ? (
          <Video key={idx} src={attachment.original.url} />
        ) : (
          <div className={attachments.length > 1 ? 'max-h-72 overflow-hidden rounded-lg border dark:border-none' : 'overflow-hidden rounded-lg border dark:border-none'}>
            <img
            key={idx}
            className='rounded-lg object-cover dark:border-none dark:shadow-lg cursor-pointer'
            loading='lazy'
            onClick={() => window.open(attachment.original.url, '_blank')}
            src={attachment.original.url}
            alt={attachment.original.url}
          />
          </div>
        )
      })}
    </div>
  )
}
