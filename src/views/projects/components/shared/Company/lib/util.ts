export function getCompanyData(key: string) {
  if (key === "phosphorus") {
    return {
      name: "Phosphorus",
      logo: "/img/logo/phos.svg",
      headcount: 75,
      role: "Senior UX Engineer",
      teamSize: 4,
      links: [
        { title: "Homepage", url: "https://phosphorus.io" },
        { title: "Wikipedia", url: "/" },
      ],
    };
  }
  if (key === "built") {
    return {
      name: "Built Technologies",
      logo: "/img/logo/built.svg",
      headcount: 250,
      role: "Software Engineer",
      teamSize: 12,
      links: [
        { title: "Homepage", url: "https://getbuilt.com" },
        { title: "Wikipedia", url: "/" },
      ],
    };
  }
  if (key === "800") {
    return {
      name: "800 Pound Gorilla Media",
      logo: "/img/logo/800.webp",
      headcount: 30,
      role: "Solution Architect",
      teamSize: 1,
      links: [{ title: "Homepage", url: "https://800poundgorillamedia.com/" }],
    };
  }
  if (key === "foxfuel") {
    return {
      name: "Foxfuel Creative",
      logo: "/img/logo/foxfuel.svg",
      headcount: 12,
      role: "Web Developer",
      teamSize: 2,
      links: [{ title: "Homepage", url: "https://foxfuelcreative.com" }],
    };
  }
  return {
    name: "UNKNOWN",
    logo: "",
    headcount: 0,
    role: "",
    teamSize: 0,
    links: [],
  };
}

// Return the keys
// Eventually this will be CMS'd
export function getCompanyKeys() {
  return ["phosphorus", "built", "800", "foxfuel"];
}
