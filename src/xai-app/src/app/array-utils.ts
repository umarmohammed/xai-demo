export function zip(...args: any[]) {
  const zipHead = () =>
    args.reduce((acc, curr) => ({ ...acc, ...curr[0] }), {});

  if (args[0].length === 1) {
    return [zipHead()];
  }

  return [zipHead(), ...zip(...args.map((arg) => arg.slice(1)))];
}
