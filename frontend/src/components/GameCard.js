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


  return (
    <div style={styles.gameCard}>
      <div style={styles.imageContainer}>
        <img src={game.image} alt={game.title} style={styles.gameImage} />
        <button style={styles.imageButton} onClick = {handleRemoveClick}>X</button>
      </div>
      <div style={styles.gameDetails}>
        <h2 style={styles.gameTitle}>{game.title}</h2>
        <div style={styles.gameTags}>
          {game.tags.map(tag => (
            <span key={tag} style={styles.gameTag}>{tag}</span>
          ))}
        </div>
        <p>{game.description}</p>
      </div>
    </div>
  );
}

export default GameCard