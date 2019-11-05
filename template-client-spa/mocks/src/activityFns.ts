export function prefix(location: any, ...prefixes: any) {
  return prefixes.some((item: string) => location.href.indexOf(`${location.origin}/${item}`) !== -1);
}

export function enabled(location: any) {
  return prefix(location, '%SINGLE_SPA_APP%');
}
