import { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Tabs from "../../components/common/Tabs";
import RolesTab from "./RolesTab";
import ShiftsTab from "./ShiftsTab";

const TABS = [
  { id: "roles", label: "Papéis e Permissões" },
  { id: "operation", label: "Operação" },
];

export default function Management() {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Gestão</h1>
        <p className="page-header__subtitle">
          Configure papéis, permissões e os turnos de operação da equipe.
        </p>
      </div>

      <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

      {activeTab === "roles" ? <RolesTab /> : <ShiftsTab />}
    </AppShell>
  );
}
