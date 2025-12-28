import Carousel from "@components/Carousel";
import RevealOnScroll from "@components/RevealOnScroll";
import NavigateButton from "./NavigateButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

// Import ALL about section images at build time
const allImageModules = import.meta.glob(
  "/public/img/about/about-*-*.{jpg,gif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export default function AboutSection({
  content,
  figIcon,
  figLabel,
  index,
  isLast = false,
  reverse = false,
  wide = false,
}: any) {
  // Filter and sort images for this section at runtime
  const pattern = `about-${index}-`;
  const images = Object.keys(allImageModules)
    .filter((path) => path.includes(pattern))
    .sort((a, b) => {
      // Extract numbers for proper numeric sorting
      const regex = new RegExp(`about-${index}-(\\d+)`);
      const numA = parseInt(a.match(regex)?.[1] || "0");
      const numB = parseInt(b.match(regex)?.[1] || "0");
      return numA - numB;
    })
    .map((path) => path.replace("/public", ""));

  const sectionAttrs = `${reverse ? " reverse" : ""}${wide ? " wide" : ""}`;

  // Set height and width for carousel slides
  const slideHeight = wide
    ? "calc(min(45dvh, 75dvw))"
    : "calc(min(60dvh, 80dvw))";

  const slideWidth = wide
    ? "calc(min(78dvh, 80dvw))"
    : "calc(min(50dvh, 80dvw))";

  return (
    <div id={`AboutSection${index}`}>
      <RevealOnScroll
        className="section"
        distance="25vh"
        duration="750ms"
        threshold={0.3}
      >
        <section className={`about-section ${sectionAttrs}`}>
          <div className="section-content">
            <RevealOnScroll
              className="horizontal"
              distance={reverse ? "-25vw" : "25vw"}
              duration="750ms"
              threshold={0.5}
            >
              {content.header}
            </RevealOnScroll>
            <RevealOnScroll
              className="horizontal"
              distance={reverse ? "-25vw" : "25vw"}
              duration="750ms"
              threshold={0.7}
            >
              {content.content}
            </RevealOnScroll>
          </div>

          <Carousel
            arrows={false}
            caption={
              <>
                <FontAwesomeIcon icon={figIcon || faClipboard} />
                <span className="fig">Fig.0{index} |</span>
                {figLabel}
              </>
            }
            options={{ axis: "x", loop: true }}
            reverse={reverse}
            slideHeight={slideHeight}
            slideWidth={slideWidth}
          >
            {images.map((src, i) => (
              <div
                className="carousel-slide"
                key={`about_${index}_img_${i}`}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: wide ? "top left" : "center",
                }}
              />
            ))}
          </Carousel>

          <div className={`navigate-btn-abs-bottom${isLast ? " last" : ""}`}>
            {isLast ? (
              <NavigateButton
                direction="up"
                scrollTo="AboutHero"
                text="Back to top"
              />
            ) : (
              <NavigateButton
                direction="down"
                scrollTo={`AboutSection${index + 1}`}
                text="Continue"
              />
            )}
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
