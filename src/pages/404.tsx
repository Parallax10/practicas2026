import Link from "next/link";
export default function Custom404() {
return (
<div style={{ textAlign: "center", padding: "50px" }}>
    <h1>404</h1>
    <p>Página no encontrada</p>
    <Link href="/catalogues">Volver a inicio</Link>
</div>
);
}
