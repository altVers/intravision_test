import { FC } from "react";
import { usePathname } from "next/navigation";

import {
  AuditOutlined,
  BarChartOutlined,
  BookOutlined,
  FileOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import Link from "next/link";

const navItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px 0",
  gap: 10,
  color: "#FFF",
};

const navItems = [
  {
    href: "/help",
    label: "База знаний",
    icon: <BookOutlined style={{ fontSize: 36 }} />,
  },
  {
    href: "/",
    label: "Заявки",
    icon: <FileOutlined style={{ fontSize: 36 }} />,
  },
  {
    href: "/employees",
    label: "Сотрудники",
    icon: <TeamOutlined style={{ fontSize: 36 }} />,
  },
  {
    href: "/clients",
    label: "Клиенты",
    icon: <AuditOutlined style={{ fontSize: 36 }} />,
  },
  {
    href: "/actives",
    label: "Активы",
    icon: <BarChartOutlined style={{ fontSize: 36 }} />,
  },
  {
    href: "/settings",
    label: "Настройки",
    icon: <SettingOutlined style={{ fontSize: 36 }} />,
  },
];

export const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            <Link href={item.href} style={navItemStyle}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
