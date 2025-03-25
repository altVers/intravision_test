import { FC } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import bookSvg from "../../assets/img/bookSvg.svg"
import fileSvg from "../../assets/img/fileSvg.svg"
import peopleSvg from "../../assets/img/peopleSvg.svg"
import townSvg from "../../assets/img/townSvg.svg"
import monitorSvg from "../../assets/img/monitorSvg.svg"
import settingsSvg from "../../assets/img/settingSvg.svg"

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
    icon: <Image src={bookSvg} alt="иконка книги" width={30} height={30}/>,
  },
  {
    href: "/",
    label: "Заявки",
    icon: <Image src={fileSvg} alt="иконка книги" width={30} height={30}/>,
  },
  {
    href: "/employees",
    label: "Сотрудники",
    icon: <Image src={peopleSvg} alt="иконка книги" width={30} height={30}/>,
  },
  {
    href: "/clients",
    label: "Клиенты",
    icon: <Image src={townSvg} alt="иконка книги" width={30} height={30}/>,
  },
  {
    href: "/actives",
    label: "Активы",
    icon: <Image src={monitorSvg} alt="иконка книги" width={30} height={30}/>,
  },
  {
    href: "/settings",
    label: "Настройки",
    icon: <Image src={settingsSvg} alt="иконка книги" width={30} height={30}/>,
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
