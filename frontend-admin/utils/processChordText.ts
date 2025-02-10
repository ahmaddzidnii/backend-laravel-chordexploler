export const processChordText = (text: string): string => {
  const chordPattern =
    /^([A-G][b#]?)((maj|min|m|dim|aug|sus[24]?|add|M)?(\d{0,2}|7sus4|7sus2|7b5|7#5|7b9|7#9|7b13|13|11|9|6\/9|5)?(\/[A-G][b#]?)?)?$/;

  const isValidChord = (chord: string): boolean => {
    // Clean up the chord string
    const cleanChord = chord.trim();
    // Split for slash chord checking
    const [baseChord, bassNote] = cleanChord.split("/");

    // Check if it's a valid base chord
    const isBaseValid =
      /^[A-G][b#]?(maj|min|m|dim|aug|sus[24]?|add|M)?(\d{0,2}|7sus4|7sus2|7b5|7#5|7b9|7#9|7b13|13|11|9|6\/9|5)?$/.test(
        baseChord
      );

    // If there's a bass note, check if it's valid
    if (bassNote) {
      const isBassValid = /^[A-G][b#]?$/.test(bassNote);
      return isBaseValid && isBassValid;
    }

    return isBaseValid;
  };

  const lines = text.trim().split("\n");
  const result: string[] = [];

  for (const line of lines) {
    let processedLine = "";
    let i = 0;

    while (i < line.length) {
      if (line[i] === "[") {
        const endBracket = line.indexOf("]", i);
        if (endBracket !== -1) {
          const chord = line.slice(i + 1, endBracket);
          if (isValidChord(chord)) {
            processedLine += `<span class="c" data-chord="${chord}">
                  <span>${chord}</span>
                </span>`;
          }
          i = endBracket + 1;
          continue;
        }
      }
      processedLine += line[i];
      i++;
    }

    result.push(`<p class="row">${processedLine}</p>`);
  }

  return result.join("\n");
};

export const processChordTextNew = (text: string): string => {
  const chordPattern =
    /\{([A-G][b#]?(maj|min|m|dim|aug|sus[24]?|add|M)?(\d{0,2}|7sus4|7sus2|7b5|7#5|7b9|7#9|7b13|13|11|9|6\/9|5)?(\/[A-G][b#]?)?)\}/g;

  return text
    .replace(chordPattern, (_match, chord) => {
      return `<span data-chord="${chord}" class="relative" style="color: #fb923c;">${chord}</span>`;
    })
    .replace(/\n/g, "\n");
};
