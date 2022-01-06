// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import category from './documents/category';
import person from './documents/person';
import page from './documents/page';
import siteSettings from './documents/siteSettings';

// Object types
import bioPortableText from './objects/bioPortableText';
import figure from './objects/figure';
import projectMember from './objects/projectMember';
import pagePortableText from './objects/pagePortableText';
import simplePortableText from './objects/simplePortableText';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    bioPortableText,
    figure,
    projectMember,
    pagePortableText,
    simplePortableText,
    // The following are document types which will appear
    // in the studio.
    category,
    person,
    page,
    siteSettings,
  ]),
});
