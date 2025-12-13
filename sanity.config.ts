import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";
import { structureTool } from "sanity/structure";
import deskStructure from "./sanity.structure";
import { codeInput } from "@sanity/code-input";
import { lucideIconPicker } from "sanity-plugin-lucide-icon-picker";
import { media } from "sanity-plugin-media";
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from "@sanity/dashboard";

export default defineConfig({
  title: "SubNettuno",
  // TODO: temporary hardcoded values
  name: process.env.PUBLIC_SANITY_PROJECT_NAME || "subnettuno",
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "r56dtkaq",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    codeInput(),
    lucideIconPicker(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
