# The Daily Sentinel — Monday, 23 November 2026

My entry for make.fun's **news-image-20261123** bounty: one image that sums
up the world's news of Monday 23 November 2026.

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/sunqincang/news-image-20261123-entry/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/sunqincang/news-image-20261123-entry/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

Bounty: https://make.fun/bounty/news-image-20261123

## The image

A vintage newspaper front page, *The Daily Sentinel* (Global Edition),
dated **MONDAY, NOVEMBER 23, 2026**. It carries five of the day's stories:

- **HUANG RETURNS TO NVIDIA** — the board reinstates Jensen Huang as
  president and chief executive, ending a period of uncertainty at the
  company (lead story, with photograph).
- **COP31 ENDS WITHOUT DEAL** — the COP31 climate talks in Antalya close
  without an overarching pact, as divisions over fossil fuels prevent
  consensus.
- **UKRAINE GRID UNDER FIRE** — U.N. officials warn that attacks on
  Ukraine's energy grid threaten heat, water and daily life as winter
  approaches.
- **QUAKE SHAKES VANUATU REGION** — a powerful earthquake in the Vanuatu
  region, with monitoring agencies tracking the impact.
- **AI SAFETY SUMMIT ISSUES GLOBAL CALL** — Barbados and the United
  Nations urge a more inclusive global framework for AI safety and
  capacity-building.

## How it runs

`main.ts` (Node 22, standard library only) holds the finished front page
as `entry.png`, validates it against the competition's limits (at most
1 MiB, at most 1024×1024 pixels, PNG or JPEG by its first bytes — the
shipped file is a JPEG under the `entry.png` name, which the rules
allow), and copies it byte for byte to `$MAKEFUN_OUTPUT_DIR/entry.png`
(default `/output/entry.png`). It runs offline and writes identical
bytes on every run.

## License

MIT — see [LICENSE](LICENSE).
