"use client";

import {
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
} from "@/components/dashboard/sideBar";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarNavMain>
          <DashboardSidebarNavLink
            href="/app/settings"
            active={isActive("/app/settings")}
          >
            Meu perfil
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/settings/theme"
            active={isActive("/app/settings/theme")}
          >
            Temas
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/settings/billing"
            active={isActive("/app/settings/billing")}
          >
            Assinatura
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  );
}
