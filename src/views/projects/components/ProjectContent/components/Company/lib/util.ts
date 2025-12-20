export function getCompanyData(key: string) {
  if (key === "phosphorus") {
    return {
      name: "Phosphorus Cybersecurity",
      logo: "img/icon/phos.svg",
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
      logo: "img/icon/built.svg",
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
      logo: "img/icon/800.webp",
      headcount: 30,
      role: "Solution Architect",
      teamSize: 1,
      links: [{ title: "Homepage", url: "https://800poundgorillamedia.com/" }],
    };
  }
  if (key === "foxfuel") {
    return {
      name: "Foxfuel Creative",
      logo: "img/icon/foxfuel.svg",
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
