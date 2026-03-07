# Notes for Claude

## Project Overview

Adameuqrot is a **Gana-Pierde (Misère) Spanish checkers** engine with neural network evaluation, endgame tablebases, and a web interface. Based on the Torquemada engine, adapted for the gana-pierde variant.

### Gana-Pierde Rule Changes
In this variant, the player with no legal moves **wins** (instead of losing). Capturing all opponent pieces means the opponent **wins** (they achieved their goal of losing pieces). All other rules (mandatory captures, longest capture rule, king movement, promotion) remain identical to standard Spanish checkers.

Terminal conditions (inverted from standard):
1. **No legal moves** → side to move WINS
2. **All pieces captured** → that side WINS (losing pieces is the goal)

## Directory Layout

- **Engine** (`/home/alvaro/claude/adameuqrot`): C++ source
- **EGTB Generator** (`/home/alvaro/claude/damas-gp`): Gana-pierde tablebase generator

### Source Modules

| Directory | Purpose |
|-----------|---------|
| `core/` | Board representation (32-bit bitboards), move generation, notation |
| `search/` | Alpha-beta search, iterative deepening, transposition table |
| `nn/` | MLP neural network inference (128→32→3, WDL output) |
| `tablebase/` | DTM probing (`tb_probe.hpp`), CWDL compression (`compression.hpp`), material indexing |
| `web/src/wasm/` | Emscripten bindings (`bindings.cpp`) |

### Key Conventions

- **Board always has white to move.** After each move the board is flipped 180° via `flip()`.
- **Square indexing:** 0-31 internal (bit positions), 1-32 human notation. Convert: `human_sq - 1 = bit_index`.
- **Score encoding:** NN eval in [-10000, +10000]. `SCORE_DRAW = 10000` (proven draw range). `SCORE_TB_WIN = 29000`. `SCORE_MATE = 30000`. `to_undecided(nn_score)` shifts by ±10000.

## Build System

```bash
make all              # Build all native executables (into bin/)
make wasm             # Build WASM engine (into web/dist/)
make clean            # Clean native build
make wasm-clean       # Clean WASM build
```

Compiler: `g++ -std=c++20 -O3 -march=native -mbmi2 -mavx2`. WASM uses `em++` with `-msimd128 -pthread`.

### Executables

| Target | Purpose |
|--------|---------|
| `generate_training` | Self-play data generation (OpenMP, HDF5 output) |
| `match` | Engine vs engine tournament |
| `play` | Interactive CLI play |
| `perft` | Move generation correctness test |
| `test_search` / `test_nn` | Testing tools |

### Building individual targets

```bash
make bin/generate_training    # Needs HDF5 and OpenMP
make bin/match                # Needs OpenMP
make bin/play
```

## Training Pipeline

### Data Generation

```bash
bin/generate_training \
    --nodes 5000 --random-plies 10 --threads 16 \
    --positions 1000000 --output data/v0.h5 \
    --tb-path /home/alvaro/claude/damas-gp
```

### Model Training

```bash
python3 train_mlp.py data/v0.h5 --output model_001.bin
```

### Evaluation

```bash
bin/match model_002.bin model_001.bin --pairs 100 --nodes 10000 --threads 16
```
