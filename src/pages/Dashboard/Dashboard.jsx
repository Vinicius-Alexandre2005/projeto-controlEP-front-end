import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { dashboardService } from "../../services/dashboardService";
import "./Dashboard.css";

const CARD_ICON_TONES = {
  primary: { bg: "var(--color-primary-soft)", color: "var(--color-primary)" },
  success: { bg: "var(--color-success-bg)", color: "var(--color-success-text)" },
  error: { bg: "var(--color-error-bg)", color: "var(--color-error-text)" },
  warning: { bg: "#fef3c7", color: "#b45309" },
};

function StatCard({ label, value, icon, tone = "primary" }) {
  const colors = CARD_ICON_TONES[tone];
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        <span
          className="stat-card__icon"
          style={{ backgroundColor: colors.bg, color: colors.color }}
        >
          {icon}
        </span>
      </div>
      <div className="stat-card__value">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    dashboardService.getSummary().then(setSummary);
  }, []);

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Painel Geral</h1>
        <p className="page-header__subtitle">
          Visão em tempo real de presença e equipamentos
          {summary ? ` — ${summary.date}` : ""}
        </p>
      </div>

      {summary && (
        <>
          <div className="stat-grid">
            <StatCard label="Funcionários ativos" value={summary.activeEmployees} icon="👥" />
            <StatCard label="Presentes" value={summary.present} icon="✓" tone="success" />
            <StatCard label="Ausentes" value={summary.absent} icon="✕" tone="error" />
            <StatCard label="Falta justificada" value={summary.justified} icon="📄" tone="warning" />
            <StatCard label="Não registrados" value={summary.unregistered} icon="👥" />
          </div>

          <div className="stat-grid stat-grid--secondary">
            <StatCard
              label="Equipamentos cadastrados"
              value={summary.equipmentRegistered}
              icon="🖥"
            />
            <StatCard label="Equipamentos em uso" value={summary.equipmentInUse} icon="🖥" />
            <StatCard
              label="Equipamentos disponíveis"
              value={summary.equipmentAvailable}
              icon="🖥"
              tone="success"
            />
          </div>
        </>
      )}
    </AppShell>
  );
}
