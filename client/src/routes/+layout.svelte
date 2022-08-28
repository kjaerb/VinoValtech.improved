<script>
	import '../app.css';
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<div
			class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
		>
			<div class="flex justify-start ">
				<h2 class="text-3xl"><span class="text-indigo-600">VinoValtech</span></h2>
			</div>
			<div class="-mr-2 -my-2 md:hidden">
				<button
					type="button"
					class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-expanded="false"
				>
					<span class="sr-only">Open menu</span>
					<!-- Heroicon name: outline/bars-3 -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<nav class="hidden md:flex space-x-10">
				<div class="relative">
					<!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->

					<!--
			  'Solutions' flyout menu, show/hide based on flyout menu state.
  
			  Entering: "transition ease-out duration-200"
				From: "opacity-0 translate-y-1"
				To: "opacity-100 translate-y-0"
			  Leaving: "transition ease-in duration-150"
				From: "opacity-100 translate-y-0"
				To: "opacity-0 translate-y-1"
			-->
				</div>
			</nav>
		</div>
	</div>

	<!--
	  Mobile menu, show/hide based on mobile menu state.
  
	  Entering: "duration-200 ease-out"
		From: "opacity-0 scale-95"
		To: "opacity-100 scale-100"
	  Leaving: "duration-100 ease-in"
		From: "opacity-100 scale-100"
		To: "opacity-0 scale-95"
	-->
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
	<slot />
</div>

<footer
	class="max-w-7xl mx-auto px-4 sm:px-6 p-4 bg-white rounded-lg shadow-md md:flex md:items-center md:justify-between md:p-6 "
>
	<span class="text-sm text-gray-500 sm:text-center "
		>© 2022 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights
		Reserved.
	</span>
	<ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500  sm:mt-0">
		<li>
			<a href="/" class="mr-4 hover:underline md:mr-6 ">About</a>
		</li>
		<li>
			<a href="/" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
		</li>
		<li>
			<a href="/" class="mr-4 hover:underline md:mr-6">Licensing</a>
		</li>
		<li>
			<a href="/" class="hover:underline">Contact</a>
		</li>
	</ul>
</footer>
