function ProductCard({ product }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
          />
        )}

        <div style={styles.info}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "calc(100vh - 60px)", // 🔥 resta navbar
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    scrollSnapAlign: "start",
    backgroundColor: "#111"
  },
  /*card: {
    width: "350px",
    backgroundColor: "#1a1a1a",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "contain", // 🔥 NO deforma
    backgroundColor: "#000"
  },*/

  card: {
    width: "90%",
    maxWidth: "400px",
    margin: "20px auto",
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  content: {
    padding: "10px",
    color: "white"
  },
  
  info: {
    padding: "15px",
    color: "white"
  }
};

export default ProductCard;