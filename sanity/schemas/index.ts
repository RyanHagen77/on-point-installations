import type { SchemaTypeDefinition } from 'sanity';
import blogPost from './blogPost';
import project from './project';

export const schemaTypes: SchemaTypeDefinition[] = [blogPost, project];
