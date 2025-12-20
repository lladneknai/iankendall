import { useMemo } from "react";
import { ucFirst } from "@util/text";
import { MenuSubtextProps } from "@shared";

const MenuSubtext = ({ subtext, subtextShown }: MenuSubtextProps) => {
  const isHtml = useMemo(
    () => ["ampt", "react", "vite"].includes(subtext),
    [subtext, subtextShown]
  );
  const content: {
    ampt: JSX.Element;
    react: JSX.Element;
    vite: JSX.Element;
  } = useMemo(() => {
    return {
      ampt: (
        <>
          <p>
            Ampt helps teams build, scale, and manage JavaScript apps on AWS by
            automatically configuring and optimizing cloud environments. It was
            built in part by my friend Ben Miner, a hella good engineer.
          </p>
          <p>
            Ampt is a powerful cloud service that deploys applications in a
            serverless format leveraging AWS lambdas. Ampt handles deployments
            to any number of environments via CLI and web dashboard. It hosts
            this production site, as well as my staging and dev environments.
          </p>
        </>
      ),
      react: (
        <>
          <p>
            React is my bread and butter. It's the de-facto frontend library for
            JavaScript SPAs.
          </p>
          <p>
            It is most noteworthy for its rending efficiency, continuous
            evolution, and unopinionated nature.
          </p>
          <p>
            We've all seen a lot of gnarly React. I promise this site (and
            everything else I build) is <em>not</em> that.
          </p>
        </>
      ),
      vite: (
        <>
          <p>
            Vite is a lightweight build manager that has been gaining popularity
            for years. It is perfectly suited for lightweight SPAs such as this
            one.
          </p>
          <p>
            While I have extensive experience in Docker and other VMWare, Vite
            was the obvious choice for this site.
          </p>
        </>
      ),
    };
  }, [subtext]);

  return (
    <div className={`subtext ${subtextShown ? "open" : "closed"}`}>
      {subtext === "code" && (
        <>I&rsquo;m just here to see your code.&nbsp;&nbsp;Show me the goods.</>
      )}
      {subtext === "projects" && <>Show me what you&rsquo;ve built.</>}
      {subtext === "about" && (
        <>I want to learn more.&nbsp;&nbsp;What makes you tick?</>
      )}
      {subtext === "contact" && <>Let&rsquo;s get in touch.</>}
      {isHtml && (
        <div className="subtext-container">
          <div className="subtext-header">
            <img
              src={`/img/icon/${subtext}.svg`}
              alt={`${subtext} logo`}
              width="50"
            />
            <h2>{ucFirst(subtext)}</h2>
          </div>
          <div className="subtext-content">
            {content[subtext as keyof typeof content] || <></>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSubtext;
