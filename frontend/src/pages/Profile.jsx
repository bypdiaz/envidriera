import React, { useEffect, useState } from "react";


function Profile() {

    const [user, setUser] = useState(null);

    const [businesses, setBusinesses] = useState([]);

    /*useEffect(() => {
        const updateUser = () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    setUser(payload);
                    // 🔥 traer negocios
                    fetch("http://localhost:3000/api/businesses/", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setBusinesses(data.businesses);
                        })
                        .catch(err => {
                            console.error("Error cargando negocios");
                        });
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        updateUser();

        window.addEventListener("storage", updateUser);

        return () => {
            window.removeEventListener("storage", updateUser);
        };
    }, []); */

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser(payload);

            // 🔥 endpoint según rol
            const endpoint =
                payload.role === "ADMIN"
                    ? "http://localhost:3000/api/businesses/all"
                    : "http://localhost:3000/api/businesses/my";

            fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("DATA NEGOCIOS:", data);
                    setBusinesses(data.businesses || []);
                })
                .catch(() => {
                    console.error("Error cargando negocios");
                });

        } catch {
            setUser(null);
        }

    }, []);



    console.log("USER EN PROFILE:", user);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Seguro que querés eliminar este negocio?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await fetch(`http://localhost:3000/api/businesses/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 🔥 actualizar UI sin recargar
            setBusinesses(businesses.filter(b => b.id !== id));

        } catch (error) {
            alert("Error al eliminar");
        }
    };

    return (
        <div>

            {user ? (
                <div>
                    <h3>Datos del Usuario</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                    <p><strong>Plan:</strong> {user.plan}</p>
                </div>
            ) : (
                <p>No hay usuario logueado</p>
            )}

            {user && (
                <h3>
                    {user.role === "ADMIN" ? "Todos los negocios" : "Mis negocios"}
                </h3>
            )}

            {businesses.length === 0 ? (
                <p>No tenés negocios</p>
            ) : (
                businesses.map((b) => (
                    <div key={b.id}>
                        <p><strong>{b.name}</strong></p>
                        <p>{b.description}</p>
                        <p>Dueño: {b.userId}</p>

                        <button onClick={() => handleDelete(b.id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Profile;