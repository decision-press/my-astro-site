import { useState } from "react";

export default function TagFilter({ allTags, essays }) {
  const [activeTag, setActiveTag] = useState("all");

  const filteredEssays =
    activeTag === "all"
      ? essays
      : essays.filter((essay) =>
          (essay.data.tags ?? []).includes(activeTag)
        );

  return (
    <div>
      {/* Tag buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          style={{
            marginRight: "0.5rem",
            fontWeight: activeTag === "all" ? "bold" : "normal",
          }}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            style={{
              marginRight: "0.5rem",
              fontWeight: activeTag === tag ? "bold" : "normal",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Single list of essays */}
      <ul>
        {filteredEssays.map((essay) => (
          <li key={essay.slug}>
            <a href={`/essays/${essay.slug}/`}>
              {essay.data.title}
            </a>
            {" · "}
            {essay.data.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

