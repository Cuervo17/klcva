import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/auth/signin',  // Ruta a tu página de inicio de sesión
  },
});

export const config = {
  matcher: ['/protected/:path*'], // Protege todas las rutas dentro de /protected
};
