import GoogleAds from './GoogleAds'
import PostCard from './PostCard'

const Feed = () => {
  return (
    <div>
      <div className="ad-class">
        <GoogleAds slot="8829841232" />
      </div>
      <h1 className='text-3xl font-bold px-3'>Feed</h1>
      <PostCard myPosts={false} />
    </div>
  )
}

export default Feed