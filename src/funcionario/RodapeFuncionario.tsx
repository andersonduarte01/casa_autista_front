export default function Rodape() {
  return (
    <footer className="bg-primary text-light text-center py-3 mt-auto">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Desenvolvido por Anderson Duarte — Todos os direitos reservados.
        </small>
      </div>
    </footer>
  );
}
