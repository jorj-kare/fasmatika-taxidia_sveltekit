<script>
	import { fade } from 'svelte/transition';
</script>

<header transition:fade|local={{ duration: 600 }}>
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
		height: 100%;
		background-image: linear-gradient(rgba(32, 0, 82, 0.719), rgba(1, 17, 107, 0.65)),
			url('/images/backg.jpg');
		background-size: cover;
		background-position: 50% 16%;
	}

	h1 {
		align-self: top;
		margin-top: 5rem;
		text-align: center;
		font-size: 5.7rem;
		letter-spacing: 0.2rem;
		line-height: 1.4;
		font-weight: 700;
		@include break($media-xxLarge) {
			margin-inline: 17rem;
			font-size: 5rem;
		}
		@include break($media-xLarge) {
			margin-inline: 15rem;
		}

		@include break($media-large) {
			margin-inline: 10rem;
			font-size: 4.2rem;
			line-height: 1.3;
		}
		@include break($media-medium) {
			align-self: center;
			letter-spacing: 0.4rem;
		}
		@include break($media-xSmall) {
			position: relative;
			top: 3rem;
			align-self: center;
			letter-spacing: normal;
			font-size: 4rem;
		}
		span {
			-webkit-animation: text-flicker-out-glow 7s linear infinite both;
			animation: text-flicker-out-glow 7s linear infinite both;
		}
	}
	// Target vertical tablets

	p {
		display: inline-block;
		align-self: flex-end;
		margin-bottom: 6rem;
		padding: 2rem;
		width: 70%;
		border: 3px solid $color-white;
		border-radius: 15px;
		font-size: 2.4rem;
		font-weight: 400;
		line-height: 1.8;
		&:hover span {
			-webkit-animation: text-flicker-out-glow 5s linear infinite both;
			animation: text-flicker-out-glow 5s linear infinite both;
		}
		@include break($media-xLarge) {
			font-size: 2.3rem;
		}
		@include break($media-large) {
			width: 75%;
			font-size: 2.2rem;
			line-height: 1.6;
		}
		@include break($media-small) {
			width: 85%;
			border: none;
			background: #0303033d;
			font-size: 2.2rem;
		}
	}
</style>
