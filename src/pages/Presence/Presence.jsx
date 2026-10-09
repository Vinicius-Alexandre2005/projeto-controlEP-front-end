import AppShell from "../../components/layout/AppShell";

export default function Presence() {
  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Presença</h1>
        <p className="page-header__subtitle">
          Página em construção — critérios de aceitação ainda serão definidos (registro de
          presença, histórico, justificativas, etc.).
        </p>
      </div>

      <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--color-text-secondary)" }}>
        Assim que os critérios de aceitação desta página forem definidos, essa tela ganha a
        listagem e as ações correspondentes — seguindo o mesmo padrão das outras páginas.
      </div>
    </AppShell>
  );
}
