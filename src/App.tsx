import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [colours, setColours] = useState<string[]>(['#fff', '#fff', '#fff']);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const [highestStreak, setHighestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const generateColour = () => {
    let rn = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padEnd(2, '0');
    return `#${rn()}${rn()}${rn()}`;
  };

  const updateColours = () => {
    let colours: string[] = Array.from(Array(3)).map(generateColour);
    let index = Math.floor(Math.random() * 2);

    setColours(colours);
    setCorrectIndex(index);
  };

  const verifySelection = (selectedIndex: number) => {
    let success = selectedIndex === correctIndex;

    if (success) {
      setMessage('Correct!');
      updateColours();
      setCurrentStreak(currentStreak + 1);
    } else {
      setMessage('Wrong, dumb dumbs');

      if (currentStreak > highestStreak) setHighestStreak(currentStreak);
      localStorage.setItem('HIGHEST_STREAK', String(currentStreak));
      setCurrentStreak(0);
    }
  };

  useEffect(() => {
    updateColours();
    let defaultStreak;
    if (
      (defaultStreak = localStorage.getItem('HIGHEST_STREAK')) !== undefined
    ) {
      setHighestStreak(Number(defaultStreak));
    }
  }, []);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1>Colour guesser!</h1>
      </div>
      <div
        style={{
          width: 200,
          height: 200,
          backgroundColor: colours[correctIndex],
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {colours.map((colour, i) => (
          <button
            style={{
              padding: 8,
              fontSize: '1.2em',
            }}
            onClick={() => {
              verifySelection(i);
            }}
          >
            {colour}
          </button>
        ))}
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <p>{message}</p>
        <h2>Current streak: {currentStreak}</h2>
        <h3>Highest: {highestStreak}</h3>
      </div>
    </div>
  );
}

export default App;
