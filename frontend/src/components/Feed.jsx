import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const videoRefs = useRef([]);

  // 🔽 traer feed
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts/feed");
        setPosts(res.data);
      } catch (error) {
        console.error("Error cargando feed", error);
      }
    };

    fetchFeed();
  }, []);

  // 🔥 detectar video visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target;

          if (entry.isIntersecting) {
            iframe.style.opacity = "1";
          } else {
            iframe.style.opacity = "0.3";
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [posts]);

  return (
    <div className="feed-container">
      {posts.map((post, index) => (
        <div key={post.id} className="feed-item">
          <iframe
            ref={(el) => (videoRefs.current[index] = el)}
            src={post.embedUrl}
            loading="lazy"
            title="video"
            allowFullScreen
          />

          <div className="info">
            <h3>{post.Business?.name || post.business?.name}</h3>
            <p>{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;