import Image from 'next/image';
import Link from 'next/link';
import type { PortableTextReactComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity-image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupImageBlocks(blocks: any[]): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i]._type === 'image') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const group: any[] = [];
      while (i < blocks.length && blocks[i]._type === 'image') {
        group.push(blocks[i]);
        i++;
      }
      if (group.length === 1) {
        result.push(group[0]);
      } else {
        result.push({ _type: 'imageGroup', _key: `group-${group[0]._key}`, images: group });
      }
    } else {
      result.push(blocks[i]);
      i++;
    }
  }
  return result;
}

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      const nativeW: number = value.assetDimensions?.width  ?? 1200;
      const nativeH: number = value.assetDimensions?.height ?? 800;
      return (
        <div className="not-prose my-8 max-w-3xl mx-auto">
          <Image
            src={urlFor(value).width(1536).url()}
            alt={value.alt ?? ''}
            width={nativeW}
            height={nativeH}
            sizes="(min-width: 768px) 768px, 100vw"
            priority={false}
            className="w-full h-auto rounded-lg"
          />
        </div>
      );
    },
    imageGroup: ({ value }) => {
      const count: number = value.images.length;
      const cols =
        count === 2 ? 'md:grid-cols-2' :
        count === 3 ? 'md:grid-cols-3' :
                      'md:grid-cols-2';
      return (
        <div className={`not-prose my-8 max-w-3xl mx-auto grid grid-cols-1 ${cols} gap-4`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {value.images.map((img: any) => (
            <Image
              key={img._key}
              src={urlFor(img).width(1024).height(768).fit('crop').url()}
              alt={img.alt ?? ''}
              width={1024}
              height={768}
              sizes="(min-width: 768px) 384px, 100vw"
              className="rounded-lg w-full h-auto"
            />
          ))}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? '';
      if (href.startsWith('/')) {
        return <Link href={href}>{children}</Link>;
      }
      return (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      );
    },
  },
};
