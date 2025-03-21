import {
  AuditOutlined,
  BarChartOutlined,
  BookOutlined,
  FileOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { FC } from "react";
import "./Navigation.css";
import { usePathname } from "next/navigation";

const navItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px 0",
  gap: 10,
  color: "#FFF",
};

export const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li className={pathname === '/help' ? 'active' : ''}>
          <Link href="/help" style={navItemStyle}>
            <BookOutlined style={{ fontSize: 36 }} />
            <span>База знаний</span>
          </Link>
        </li>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href="/" style={navItemStyle}>
            <FileOutlined style={{ fontSize: 36 }} />
            <span>Заявки</span>
          </Link>
        </li>
        <li className={pathname === '/employees' ? 'active' : ''}>
          <Link href="/employees" style={navItemStyle}>
            <TeamOutlined style={{ fontSize: 36 }} />
            <span>Сотрудники</span>
          </Link>
        </li>
        <li className={pathname === '/clients' ? 'active' : ''}>
          <Link href="/clients" style={navItemStyle}>
            <AuditOutlined style={{ fontSize: 36 }} />
            <span>Клиенты</span>
          </Link>
        </li>
        <li className={pathname === '/actives' ? 'active' : ''}>
          <Link href="/actives" style={navItemStyle}>
            <BarChartOutlined style={{ fontSize: 36 }} />
            <span>Активы</span>
          </Link>
        </li>
        <li className={pathname === '/settings' ? 'active' : ''}>
          <Link href="/settings" style={navItemStyle}>
            <SettingOutlined style={{ fontSize: 36 }} />
            <span>Настройки</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
