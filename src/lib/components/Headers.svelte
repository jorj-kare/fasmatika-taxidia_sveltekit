<script>
	import { fade } from 'svelte/transition';
</script>

<header transition:fade={{ duration: 800 }}>
	<h1>
		ΗΜΕΡΟΛΟΓΙΑ ΦΑ<span>ΝΤΑ</span>ΣΜΑΤΙΚΩΝ ΤΑΞΙΔΙΩΝ
	</h1>

	<p>
		Ημερολόγια φανταστικά, διηγήσεις άχρονες για φασματικές περιπλανήσεις σε μέρη στατικά
		κ'απόμακρα. Αποπλανημένα φά<span>ντά</span>σματα καθώς καθρεφτίζονται σε γαλήνια, σκοτεινά νερά.
	</p>
</header>

<style lang="scss">
	header {
		display: grid;
		justify-content: center;
		justify-items: center;
		height: 100vh;
		background-image: linear-gradient(rgba(32, 0, 82, 0.719), rgba(1, 17, 107, 0.65)),
			url('/images/backg.jpg');
		background-size: cover;
		background-position: 50% 16%;
	}
	h1 {
		align-self: top;
		margin-top: 4rem;
		text-align: center;
		font-size: 4rem;
		font-weight: 700;

		span {
			-webkit-animation: text-flicker-out-glow 7s linear infinite both;
			animation: text-flicker-out-glow 7s linear infinite both;
		}
	}

	p {
		display: inline-block;
		align-self: flex-end;
		margin-bottom: 4rem;
		padding: 1.5rem;
		width: 80%;
		text-align: center;
		border: 3px solid $color-white;
		border-radius: 15px;
		font-size: 1.8rem;
		font-weight: 400;
		line-height: 3rem;
		&:hover span {
			-webkit-animation: text-flicker-out-glow 5s linear infinite both;
			animation: text-flicker-out-glow 5s linear infinite both;
		}
	}
</style>
