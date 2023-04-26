const styles = {
    gameCard: {
      display: 'flex',
      flexDirection: 'column',
      width: '20rem'
    },
    gameImage: {
      width: '100%',
      height: 'auto'
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

const GameCard = ({ game }) => {
    return (
      <div style={styles.gameCard}>
        <img src={game.image} alt={game.title} style={styles.gameImage} />
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