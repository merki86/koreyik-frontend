import Image from "next/image";
import styles from "./page.module.css";

async function getAnime(id) {
  const res = await fetch(`http://localhost:8080/api/anime/${id}`);
  return res.json();
}

export default async function Anime({ params }) {
	const anime = await getAnime(params.id);

	return (
		<div className={styles.page}>
			<Image
				className={styles.thumbnail}
				src={anime.ThumbnailURL}
				alt="Thumbnail"
				width={180}
				height={263}
				priority 
			/>

			<div className={styles.info}>
					<h2 className={styles.titleJp}>{anime.TitleJp}</h2>
					<p className={styles.titleKk}>{anime.TitleKk}</p>

					<div className={styles.details}>
						<p>Телехикая · {anime.Rating} · {anime.Episodes} бөлім · <span className={styles.completed}>{anime.Status}</span></p>
						<p><strong>Шығу шағы:</strong> {anime.StartedAiring} - {anime.FinishedAiring}</p>
						<p><strong>Жанры:</strong> {anime.Genres}</p>
						<p><strong>Тақырыбы:</strong> {anime.Themes}</p>
						<p><strong>Бөлім ұзындығы:</strong> {anime.Duration}</p>
						<p><strong>Студиясы:</strong> {anime.Studios}</p>
					</div>

					<button className={styles.watchButton}>Көру</button>
					<button className={styles.addButton}>Тізімімге қосу</button>
			</div>

			<div className={styles.rating}>
					<p className={styles.text}>Рейтиңі: <strong>7.7</strong></p>
					<div className={styles.stars}>
							<span className={styles.starFilled}>&#9733;</span>
							<span className={styles.starFilled}>&#9733;</span>
							<span className={styles.starFilled}>&#9733;</span>
							<span className={styles.starFilled}>&#9733;</span>
							<span className={styles.star}>&#9734;</span>
					</div>
					<p>Өте жақсы</p>
			</div>
		</div>
	);
}