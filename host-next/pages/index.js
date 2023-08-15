import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('navbar/Navbar'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
  webpack: (config, options) => {
    config.experiments = { topLevelAwait: true };
    // if failer show message
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    return config;
  }
});

export default function Home() {
  const router = useRouter();

  const handleToNavigate = () => {
    router.push('/about');
  }
  return (
    <div>
      <Navbar/>
      <div className='flex gap-4 items-center p-5'>
        <h1 className='text-xl text-violet-600'>
          host 2 next
          <button onClick={handleToNavigate}>
            To about
          </button>
        </h1>
      </div>
    </div>
  )
}
