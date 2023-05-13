import GameCard from '../components/GameCard'

const GameList = ({games, onRemoveClick }) => {
    const gameListStyle = {
        display: 'flex',
        gap: '1rem'
    }

    return (
      <div style={gameListStyle}>
        {games.map(game => (
          <GameCard key={game.id} game={game} onRemoveClick={onRemoveClick}/>
        ))}
      </div>
    );
}

export default GameList