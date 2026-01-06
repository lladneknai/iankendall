import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getCompanyData } from "./lib/util";

export default function Company({ company }: { company: string }) {
  const { headcount, links, name, logo, role, teamSize } =
    getCompanyData(company);

  return (
    <>
      <img alt={name} className="company-img" src={logo} />
      {/* <h4>Company</h4> */}
      {/* <p className="company">
      <img src={logo} />
      {name}
      </p> */}
      <ul className="company-info">
        <li>
          <div className="disc" />
          <strong>Role:</strong>
          {role}
        </li>
        <li>
          <div className="disc" />
          <strong>Team Size:</strong>
          {teamSize}
        </li>
        <li>
          <div className="disc" />
          <strong>Headcount:</strong>
          {headcount}
        </li>
        {links.map((link) => (
          <li key={link.title}>
            <div className="disc" />
            <Link className="link" to={link.url}>
              {link.title}
              <FontAwesomeIcon
                className="goto"
                icon={faArrowUpRightFromSquare}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
