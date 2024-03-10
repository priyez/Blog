import React from 'react';
import axios from 'axios';
import { SiSpotify } from 'react-icons/si';

import useSWR from 'swr';

interface SpotifyData {
  isPlaying: boolean;
  songUrl: string;
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const SpotifyCard: React.FC = () => {
  const { data, error } = useSWR<SpotifyData>('/api/spotify', fetcher);

  if (error) {
    // TODO: Make notification dialog popup
    console.log(error);
  }

  return (
    <div className='text-slate-400 bg-neutral-900 border border-neutral-800 rounded-lg  md:w-[30%]  fixed flex w-full bottom-0 left-0'>
      <a
        target='_blank'
        rel='noreferrer'
        href={data?.isPlaying ? data.songUrl : 'https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk'}
        className='relative flex items-center space-x-2 py-4 pl-2 transition-shadow hover:shadow-md w-full'
      >
        <div className='w-15'>
          {data?.isPlaying ? (
            <img className='w-14 shadow-sm' src={data?.albumImageUrl} alt={data?.album} />
          ) : (
            <SiSpotify size={30} color={'#1ED760'} />
          )}
        </div>

        <div className='flex-1'>
          <p className='component font-bold text-md w-48 lg:w-72 truncate'>
            {data?.isPlaying ? <p>{data.title}</p> : 'Currently not listening'}
          </p>
          <p className='font-dark text-sm text-semibold'>
            {data?.isPlaying ? `Artist: ${data.artist}` : 'Spotify'}
          </p>
          <p className='font-dark text-xs text-semibold w-48 lg:w-72 truncate'>
            {data?.isPlaying ? `Album: ${data.album}` : ''}
          </p>
        </div>

        <div className='absolute right-1.5 top-1.5'>
          {data?.isPlaying ? <SiSpotify size={20} color={'#1ED760'} /> : <></>}
        </div>
      </a>
    </div>
  );
};

export default SpotifyCard;
