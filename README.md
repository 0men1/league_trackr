# how to use
You can use this site by clicking the link on the top right corner. Enter a summoner name and choose the region that user is in.

If the user is in a game:
  You will see 10 players show up on the screen with their summoner spells, opgg, ugg, and champion icons
  
If the user isnt in a game:
  You will see an alert that says so
  
If the user does not exist:
  You will see an alert that says the user does not exist in that region/anywhere.

# functions
1. You are able to set the player's summoner spells on cooldown once you click it. BEWARE: once you click it you cannot undo.
2. You are able to drag and drop the players and arrange them as you would like as RIOT does not provide me with the exact roles the player chose
3. You are able to check every player's opgg and ugg.

# how this was made
This was made entirely with svelte kit, html, tailwind css, js.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
