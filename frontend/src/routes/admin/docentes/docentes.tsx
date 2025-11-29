import { useEffect } from "react";
import DocentePanel from "../../../web/app/Docente/Panel";

export default function Route() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <DocentePanel />;
}
