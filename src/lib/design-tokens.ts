export const GRAIN_FINE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75 0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23f)' opacity='0.11'/%3E%3C/svg%3E")`

export const GRAIN_MEDIUM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35 0.40' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23m)' opacity='0.07'/%3E%3C/svg%3E")`

export const GRAIN_COARSE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.08 0.12' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23c)' opacity='0.055'/%3E%3C/svg%3E")`

export const PAPER_STYLE: React.CSSProperties = {
  backgroundColor: "#FBF9F4",
  backgroundImage: `${GRAIN_COARSE}, ${GRAIN_MEDIUM}, ${GRAIN_FINE}`,
  backgroundBlendMode: "multiply, multiply, overlay",
}
