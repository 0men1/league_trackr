<script>
	import { handleSummmonerNameSubmit} from "./handle_search";
</script>

<svelte:head>
    <title>Search</title>
	<meta name="description" content="Use this search bar to search for your user" />
</svelte:head>


<div class='grid w-screen h-screen place-content-center items-center gap-4 p-20'>
    <div class="flex justify-center">
        <h1 class='text-3xl font-bold'>Search for the user:</h1>
    </div>


    <!-- <div class="flex w-fit gap-2 items-center ">

      <div id="dropdown" class="inline h-fit justify-center items-center w-fit">
            <button on:click={handleDropdown} id="dropdown-button" class="px-3 py-4 rounded-lg bg-slate-500 text-white hover">Region ↓ </button>
            <div id="menu" class=" p-2 flex flex-col border-2 border-black justify-center absolute bg-white hidden">
                <h1 on:keypress={handleChoiceClick} class="hover:bg-slate-200 hover:cursor-pointer w-full" >NA</h1>
                <h1 class="hover:bg-slate-200  hover:cursor-pointer w-full">EUW</h1>
                <h1 class="hover:bg-slate-200  hover:cursor-pointer w-full">EUNE</h1>
                <h1 class="hover:bg-slate-200 hover:cursor-pointer w-full">LAN</h1>
            </div>
        </div> -->
        
        <form class="flex gap-4 relative" on:submit|preventDefault={handleSummmonerNameSubmit}>
            <input id='user' class='px-4 py-4 rounded-lg' name='user_name' type='text' placeholder='Search User..'/>
            <button on:submit|preventDefault={handleSummmonerNameSubmit} id='searchbutton' type='submit' class='px-6 py-4 rounded-lg border-black border-2 text-white bg-black hover:cursor-pointer'>Search</button>
        </form>

    <!-- </div> -->
        
</div>
    
    
