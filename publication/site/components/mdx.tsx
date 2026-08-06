import * as AccordionComponents from 'fumadocs-ui/components/accordion';
import * as FileComponents from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, ReactNode } from 'react';
import * as EngineeringComponents from '@/components/engineering';

function NativeImage({ ref: _ref, alt = '', ...props }: ComponentProps<'img'>) {
  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: MDX can supply Blob sources, and print output requires a native image element. */}
      <img {...props} alt={alt} />
    </>
  );
}

function ZoomableImage({ ref: _ref, src, alt = '', ...props }: ComponentProps<'img'>) {
  return typeof src === 'string' ? (
    <ImageZoom {...props} alt={alt} src={src} />
  ) : (
    <NativeImage {...props} alt={alt} src={src} />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...AccordionComponents,
    ...FileComponents,
    ...TabsComponents,
    ...EngineeringComponents,
    img: ZoomableImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

function PrintAccordion({ title, children }: { title?: ReactNode; children?: ReactNode }) {
  return (
    <section className="monad-print-disclosure">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function PrintContainer({ children }: { children?: ReactNode }) {
  return <div className="monad-print-disclosures">{children}</div>;
}

function PrintTab({ title, children }: { title?: ReactNode; children?: ReactNode }) {
  return (
    <section className="monad-print-tab">
      <h4>{title}</h4>
      {children}
    </section>
  );
}

export function getPrintMDXComponents(components?: MDXComponents) {
  return getMDXComponents({
    Accordion: PrintAccordion,
    Accordions: PrintContainer,
    Tab: PrintTab,
    Tabs: PrintContainer,
    img: NativeImage,
    ...components,
  });
}
