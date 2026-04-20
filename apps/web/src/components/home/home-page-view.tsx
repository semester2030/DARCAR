"use client";

import type { HomeBlock, HomePageDocument } from "@/lib/home-content";
import { HeroSection } from "./hero-section";
import { IntroArticleSection } from "./intro-article-section";
import { FeatureGridSection } from "./feature-grid-section";
import { FeatureSpotlightSection } from "./feature-spotlight-section";
import { StatsStripSection } from "./stats-strip-section";
import { TechShowcaseSection } from "./tech-showcase-section";
import { CtaBandSection } from "./cta-band-section";

function renderBlock(block: HomeBlock) {
  switch (block.type) {
    case "hero":
      return <HeroSection key={block.id} block={block} />;
    case "intro_article":
      return <IntroArticleSection key={block.id} block={block} />;
    case "feature_grid":
      return <FeatureGridSection key={block.id} block={block} />;
    case "feature_spotlight":
      return <FeatureSpotlightSection key={block.id} block={block} />;
    case "stats":
      return <StatsStripSection key={block.id} block={block} />;
    case "tech_showcase":
      return <TechShowcaseSection key={block.id} block={block} />;
    case "cta_band":
      return <CtaBandSection key={block.id} block={block} />;
  }
}

export function HomePageView({ document }: { document: HomePageDocument }) {
  return <div className="flex flex-col">{document.blocks.map(renderBlock)}</div>;
}
