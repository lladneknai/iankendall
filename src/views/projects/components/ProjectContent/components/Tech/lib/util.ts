import {
  faReact,
  faCss3,
  faNodeJs,
  faJs,
  faPython,
  faPhp,
  faAws,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import {
  mongoIcon,
  muiIcon,
  mysqlIcon,
  nestIcon,
  redisIcon,
  scssIcon,
  sqlIcon,
  tsIcon,
} from "./icons";

export function getTechIcon(key: string, stroke: string = "#ffefd5") {
  const iconMap: Record<string, any> = {
    react: faReact,
    node: faNodeJs,
    css: faCss3,
    js: faJs,
    python: faPython,
    php: faPhp,
    aws: faAws,
    figma: faFigma,
  };
  const customIconMap: Record<string, any> = {
    ts: tsIcon(stroke),
    sql: sqlIcon(stroke),
    mui: muiIcon(stroke),
    mysql: mysqlIcon(stroke),
    nest: nestIcon(stroke),
    mongo: mongoIcon(stroke),
    redis: redisIcon(stroke),
    scss: scssIcon(stroke),
  };
  if (iconMap[key]) {
    return {
      icon: iconMap[key],
      isFa: true,
    };
  }
  if (customIconMap[key]) {
    return {
      icon: customIconMap[key],
      isFa: false,
    };
  }
  return { icon: null, isFa: false };
}
