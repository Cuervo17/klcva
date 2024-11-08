import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reiniciar el error al enviar el formulario

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error al registrarse");
      }

      // Maneja la respuesta del servidor, como redirigir o mostrar un mensaje de éxito
      const data = await response.json();
      console.log("Registro exitoso", data);

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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button type="submit" className="btn-primary">
        Registrarse
      </button>
    </form>
  );
};

export default Register;
