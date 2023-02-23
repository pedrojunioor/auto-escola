import './Home.scss'
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
export const Home = () => {
  return (
    <div className='home-container'>
      <AspectRatio.Root ratio={6 / 3}>
        <img
          className="Image"
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          alt="Landscape photograph by Tobias Tullius"
        />
      </AspectRatio.Root>
    </div>
  )
}