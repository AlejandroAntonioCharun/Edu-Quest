import { useEffect } from "react";
import Layout from "../../../web/app/Colegios/Componentes/Layout";
import ColegiosBackendResumen from "../../../web/app/Colegios/Paginas/resumen_backend";

export default function Route() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <ColegiosBackendResumen />
    </Layout>
  );
}
