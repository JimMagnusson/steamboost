import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";

const styles = {
    gameCard: {
      display: 'flex',
      flexDirection: 'column',
      width: '20rem'
    },
    imageContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto'
    },
    gameImage: {
      width: '100%',
      height: 'auto'
    },
    imageButton: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      backgroundColor: '#f2f2f2',
      border: 'none',
      borderRadius: '50%',
      padding: '0.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    gameDetails: {
      padding: '1rem',
      backgroundColor: '#f2f2f2'
    },
    gameTitle: {
      marginTop: 0
    },
    gameTags: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    gameTag: {
      fontWeight: 'bold'
    }
};

function GameCard({ game, onRemoveClick }) {
  function handleRemoveClick() {
    onRemoveClick(game.title)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const screenshots = game.screenshots.map((src) => ({
    src,
    alt: "Screenshot",
    type: "image",
  }));

  const videos = game.videos.map(item =>  ({
    src: item.src,
    alt: "Video",
    type: "video",
    thumbnail: item.thumbnail
  }));

  // First two items in the carousel are videos (if there are any), rest of videos is put at the end
  //const n = (videos.length > 2) ? 2 : videos.length 
  const firstVideos = (videos.length <= 2) ? videos : videos.slice(0,2)
  const lastVideos = (videos.length <= 2) ? [] : videos.slice(2,videos.length)



  const carouselItems = [...firstVideos, ...screenshots, ...lastVideos]

  // Need to adjust renderThumbs to make video thumbnails appear in the carousel thumbnails.
  const customRenderThumbs = () => {
    return carouselItems.map((item, index) => (
      <div key={index}>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt} />
        ) : (
          <img src={item.thumbnail} alt={item.alt} />
        )}
      </div>
    ));
  };

  const slicedTags = game.tags.slice(0,4) // only show first 4 tags

  return (
    <div style={styles.gameCard}>
      <div style={styles.imageContainer}>
        <img src={game.image} alt={game.title} style={styles.gameImage} />
        <button style={styles.imageButton} onClick={handleRemoveClick}>X</button>
      </div>
      <div style={styles.gameDetails}>
        <h2 style={styles.gameTitle}>{game.title}</h2>
        <div style={styles.gameTags}>
          {slicedTags.map(tag => (
            <span key={tag} style={styles.gameTag}>{tag}</span>
          ))}
        </div>
        <p>{game.description}</p>
      </div>

      <Carousel showStatus={false} infiniteLoop={true} autoPlay={false} renderThumbs={customRenderThumbs} >
        {carouselItems.map((item, index) => (
        <div key={index}>
          {item.type === "image" ? (
            <img src={item.src} alt={item.alt} />
          ) : (
            <ReactPlayer url={item.src} width="100%" height="100%" controls={true} />
          )}
        </div>
        ))}
      </Carousel>
    </div>
  );
}

export default GameCard