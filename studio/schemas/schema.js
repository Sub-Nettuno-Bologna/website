// Document types
import corso from './documents/corso';
import event from './documents/event';
import { page } from './documents/page';
import person from './documents/person';
import siteSettings from './documents/siteSettings';

// Object types
import bioPortableText from './objects/bioPortableText';
import { figure } from './objects/figure';
import projectMember from './objects/projectMember';
import pagePortableText from './objects/pagePortableText';
import simplePortableText from './objects/simplePortableText';

// Then we give our schema to the builder and provide the result to Sanity
export default [
  bioPortableText,
  corso,
  event,
  figure,
  page,
  pagePortableText,
  person,
  projectMember,
  simplePortableText,
  siteSettings,
];
