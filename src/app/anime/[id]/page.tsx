'use client'
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface AnimeData {
  ThumbnailURL: string;
  TitleJp: string;
  TitleKk: string;
  Rating: string;
  Episodes: number;
  Status: string;
  StartedAiring: string;
  FinishedAiring: string;
  Genres: string;
  Themes: string;
  Duration: string;
  Studios: string;
}

async function getAnime(id: number): Promise<AnimeData | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/anime/${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch anime data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return null;
  }
}

export default function Anime() {
  const params = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getAnime(Number(params.id));
        setAnime(data);
      } catch {
        setError('Аниме жүктеу кезінде қате болды');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="text-center py-8 text-blue-500">
        Жүктелуде...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="text-center py-8 text-red-500">
        Аниме табылмады немесе сервермен қосылмау болды
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start">
      <Image
        className="w-44 rounded-md"
        src={anime.ThumbnailURL}
        alt="Thumbnail"
        width={180}
        height={263}
        priority
      />
      
      <div className="info">
        <h2 className="titleJp">{anime.TitleJp}</h2>
        <p className="titleKk">{anime.TitleKk}</p>
        
        <div className="details">
          <p>Телехикая · {anime.Rating} · {anime.Episodes} бөлім · <span className="completed">{anime.Status}</span></p>
          <p><strong>Шығу шағы:</strong> {anime.StartedAiring} - {anime.FinishedAiring}</p>
          <p><strong>Жанры:</strong> {anime.Genres}</p>
          <p><strong>Тақырыбы:</strong> {anime.Themes}</p>
          <p><strong>Бөлім ұзындығы:</strong> {anime.Duration}</p>
          <p><strong>Студиясы:</strong> {anime.Studios}</p>
        </div>

        <button className="watchButton">Көру</button>
        <button className="addButton">Тізімімге қосу</button>
      </div>

      <div className="rating">
        <p className="text">Рейтиңі: <strong>7.7</strong></p>
        <div className="stars">
          <span className="starFilled">&#9733;</span>
          <span className="starFilled">&#9733;</span>
          <span className="starFilled">&#9733;</span>
          <span className="starFilled">&#9733;</span>
          <span className="star">&#9734;</span>
        </div>
        <p>Өте жақсы</p>
      </div>
    </div>
  );
}