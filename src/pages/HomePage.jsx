import { useState } from 'react';
import Hero from '../components/Hero';
import TileList from '../components/TileList';
import PrimaryButton from '../components/PrimaryButton';
import homeTiles from '../data/homeTiles';
import './HomePage.css';

const TILES_STEP = 3;

function HomePage() {
  const [visibleCount, setVisibleCount] = useState(TILES_STEP);
  const hasMore = visibleCount < homeTiles.length;

  return (
    <div className="home-page">
      <Hero />
      <TileList tiles={homeTiles.slice(0, visibleCount)} />

      {hasMore && (
        <div className="home-more">
          <PrimaryButton onClick={() => setVisibleCount((count) => count + TILES_STEP)}>
            View more
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default HomePage;
