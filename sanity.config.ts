import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { schemaTypes } from './schemaTypes'
import { structureTool } from 'sanity/structure'
import deskStructure from './sanity.structure';
import { codeInput } from '@sanity/code-input'
import { lucideIconPicker } from 'sanity-plugin-lucide-icon-picker'
import { media } from 'sanity-plugin-media';
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard';

export default defineConfig({
  name: 'subnettuno',
  title: 'SubNettuno',
  projectId: 'h3gj11wn',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    codeInput(),
    lucideIconPicker(),
    dashboardTool({
      widgets: [
        projectInfoWidget(),
        projectUsersWidget(),
      ],
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})



