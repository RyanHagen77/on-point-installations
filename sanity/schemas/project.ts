import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'H1',
      description: 'Override the page H1. Defaults to title if blank.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(155).warning('Meta description should be 155 characters or fewer.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: '1 to 2 sentence summary shown on the project gallery index.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({ allowRelative: true }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: false },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: "Describe what's in the image for screen readers and search engines.",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'completedDate',
      title: 'Completed Date',
      description: 'When the project was completed. Used for sorting and display.',
      type: 'date',
    }),
    defineField({
      name: 'targetKeyword',
      title: 'Target Keyword',
      description: 'Editorial reference. Not rendered publicly.',
      type: 'string',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      description: 'E.g. Office Furniture Installation, Modular Workstations, Reconfiguration.',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'City or city and state where the project was completed.',
      type: 'string',
    }),
    defineField({
      name: 'internalLinks',
      title: 'Internal Links (notes)',
      description: 'Editorial reference for link targets. Not rendered publicly.',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: "Describe what's in the image. Helps screen readers and shows in search results.",
          validation: (Rule) => Rule.required().warning('Alt text is required for accessibility and SEO.'),
        }),
      ],
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      description: 'Additional project photos. Rendered with lightbox.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: "Describe what's in the image for screen readers and search engines.",
              validation: (Rule) => Rule.required().warning('Alt text is required for accessibility and SEO.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption displayed below the image.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedBlogPosts',
      title: 'Related Blog Posts',
      description: 'Optional references to related blog posts. Empty by default.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({
      name: 'wordCountTarget',
      title: 'Word Count Target',
      description: 'Editorial reference. Not rendered publicly.',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'featuredImage',
    },
  },
});
