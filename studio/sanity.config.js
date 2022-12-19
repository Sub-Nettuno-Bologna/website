import { defineConfig } from 'sanity';
import schemaTypes from './schemas/schema';
import { deskTool } from 'sanity/desk';
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard';
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify';
import {} from '@sanity/dashboard';
import { media } from 'sanity-plugin-media';
import deskStructure from './deskStructure';

export default defineConfig({
  root: true,
  name: 'subnettuno',
  projectId: '31d7d4ws',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'My Netlify deploys',
          sites: [
            {
              title: 'Sanity Studio',
              apiId: 'a069426b-4078-4739-bb84-93bf7ae69ffc',
              buildHookId: '61c8d4e89516345887ace730',
              name: 'subnettuno-sanity-studio',
            },
            {
              buildHookId: '61c99ccc375345182a0bcef9',
              title: 'Sito pubblico',
              name: 'blue-lagoon-505905',
              url: 'https://subnettuno.it',
              apiId: '2957c68e-a3eb-40f4-b127-32195e2837dd',
            },
          ],
        }),
        projectInfoWidget(),
        projectUsersWidget(),
      ],
    }),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId != 'settings'
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(
          ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)
        );
      }
      return prev;
    },
  },
});
