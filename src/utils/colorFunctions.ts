export function getComplimentaryColorHue(baseHue: number): number {
  const hueStep = 180;
  const starterHue = baseHue;
  const complimentaryHue = (starterHue + hueStep) % 360;
  const formattedComplimentaryHue = Number(complimentaryHue.toFixed(2));

  return formattedComplimentaryHue;
}

export function getTriadicColorHues(baseHue: number): number[] {
  const hueStep = 120;
  const starterHue = baseHue;

  const triadColors: number[] = [];
  for (let index = 1; index < 3; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    triadColors.push(formattedHue);
  }

  return triadColors;
}

export function getTetradColorHues(baseHue: number): number[] {
  const hueStep = 90;
  const starterHue = baseHue;

  const tetradColors = [];
  for (let index = 1; index < 4; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    tetradColors.push(formattedHue);
  }

  return tetradColors;
}

export function getAnalogousColorHues(baseHue: number): number[] {
  const hueStep = 30;
  const starterHue = baseHue;

  const analogousColors = [];
  for (let index = 1; index < 3; index++) {
    const newHue = (starterHue + index * hueStep) % 360;
    const formattedHue = Number(newHue.toFixed(2));

    analogousColors.push(formattedHue);
  }

  return analogousColors;
}

export function generateColorID(): string {
  return crypto.randomUUID();
}
