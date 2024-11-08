import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reiniciar el error al enviar el formulario

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      // Maneja la respuesta del servidor, como guardar el token o redirigir
      const data = await response.json();
      console.log("Inicio de sesión exitoso", data);

      // Redirigir o manejar el estado del usuario
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button type="submit" className="btn-primary">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Login;
