import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "./components/Layout";
import ClientesPage from "./pages/Clientes.page";
import ProductosPage from "./pages/Productos.page";
import VentasPage from "./pages/Ventas.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutPage>
        <ClientesPage />
      </LayoutPage>
    ),
  },
  {
    path: "/clientes",
    element: (
      <LayoutPage>
        <ClientesPage />
      </LayoutPage>
    ),
  },
  {
    path: "/productos",
    element: (
      <LayoutPage>
        <ProductosPage />
      </LayoutPage>
    ),
  },
  {
    path: "/ventas",
    element: (
      <LayoutPage>
        <VentasPage />
      </LayoutPage>
    ),
  },
]);

export default router;
