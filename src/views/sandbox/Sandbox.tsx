import { lorem } from "@/util/text";

/**
 * SANDBOX ROUTE
 * -------------
 * - I like to keep a sandbox in projects to try out new ideas without messing with other pages
 * - Right here, you can see me testing the base styles of the page (header, paragraph spacing, etc).
 */
export default function Sandbox() {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Hero Header</h1>
          <h6>Hero paragraph telling you stuff.</h6>
        </div>
      </div>
      <div className="page-content">
        <h1>Heading Number 1</h1>
        <h2>Heading Number 2</h2>
        <h3>Heading Number 3</h3>
        <h4>Heading Number 4</h4>
        <h5>Heading Number 5</h5>
        <h6>Heading Number 6</h6>
        <p>{lorem()}</p>
        <p>{lorem()}</p>
        <p>{lorem()}</p>
        <h1>Heading Number 1</h1>
        <p>{lorem()}</p>
        <h2>Heading Number 2</h2>
        <p>{lorem()}</p>
        <h3>Heading Number 3</h3>
        <p>{lorem()}</p>
        <h4>Heading Number 4</h4>
        <p>{lorem()}</p>
        <h5>Heading Number 5</h5>
        <p>{lorem()}</p>
        <h6>Heading Number 6</h6>
        <p>{lorem()}</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <p>{lorem()}</p>
        <h1>Heading Number 1</h1>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    </div>
  );
}
