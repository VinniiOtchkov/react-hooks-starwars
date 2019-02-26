import React from 'react';
import useHttp from '../hooks/http';

import Summary from './Summary';

const Character = props => {
  const url = `https://swapi.co/api/people/${props.selectedChar}`;

  const [isLoading, fetchedData] = useHttp(url, [props.selectedChar]);

  const loadedCharacter = fetchedData
    ? {
        id: props.selectedChar,
        name: fetchedData.name,
        height: fetchedData.height,
        colors: {
          hair: fetchedData.hair_color,
          skin: fetchedData.skin_color
        },
        gender: fetchedData.gender,
        movieCount: fetchedData.films.length
      }
    : null;

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    const {
      name,
      gender,
      height,
      hair,
      colors: { skin },
      movieCount
    } = loadedCharacter;
    content = (
      <Summary
        name={name}
        gender={gender}
        height={height}
        hairColor={hair}
        skinColor={skin}
        movieCount={movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
