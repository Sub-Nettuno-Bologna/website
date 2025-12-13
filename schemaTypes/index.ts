import { button } from "./type/button.schema";
import { portableText } from "./type/portableText.schema";
import { list } from "./type/list.schema";

import course from "./schema/course.schema";
import courseCategory from "./schema/course-category.schema";
import team from "./schema/team.schema";
import club from "./schema/club.schema";
import hero from "./schema/hero.schema";
import aboutus from "./schema/aboutus.schema";
import blog from "./schema/blog.schema";
import event from "./schema/event.schema";
import seo from "./schema/seo.schema";

export const schemaTypes = [
    // Utility Types
    portableText,
    button,
    list,

    // Schemas
    course,
    courseCategory,
    team,
    club,
    hero,
    aboutus,
    blog,
    event,
    seo
];
