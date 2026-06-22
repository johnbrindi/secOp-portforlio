const fs = require('fs');
const path = require('path');

const dir = 'app/actions';

const files = {
  'blog.ts': `import prisma from '@/lib/prisma';
export async function submitBlog(formData: FormData) {
  try {
    const data = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
      image_url: formData.get('image_url') as string,
      featured: formData.get('featured') === 'true',
    };
    const record = await prisma.posts.create({ data });
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}`,

  'certification.ts': `import prisma from '@/lib/prisma';
export async function submitCertification(formData: FormData) {
  try {
    const data = {
      title: formData.get('title') as string,
      issuer: formData.get('issuer') as string,
      date_issued: formData.get('date_issued') as string,
      description: formData.get('description') as string,
      link: formData.get('link') as string,
      image_url: formData.get('image_url') as string,
    };
    const record = await prisma.certifications.create({ data });
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}`,

  'profile.ts': `import prisma from '@/lib/prisma';
export async function submitProfile(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      bio: formData.get('bio') as string,
      image_url: formData.get('image_url') as string,
    };
    let profile = await prisma.profiles.findFirst();
    if (!profile) {
      profile = await prisma.profiles.create({ data });
    } else {
      profile = await prisma.profiles.update({ where: { id: profile.id }, data });
    }
    return { success: true, data: profile };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}`,

  'project.ts': `import prisma from '@/lib/prisma';
export async function submitProject(formData: FormData) {
  try {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image_url: formData.get('image_url') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      link: formData.get('link') as string,
    };
    const record = await prisma.projects.create({ data });
    return { success: true, data: record };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}`,

  'skill.ts': `import prisma from '@/lib/prisma';
export async function submitSkills(formData: FormData) {
  try {
    const skillsString = formData.get('skills') as string;
    const skillList = skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const records = skillList.map(skillName => ({
        name: skillName,
        category: 'Core Competency'
    }));
    if (records.length > 0) {
        await prisma.skills.createMany({ data: records });
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}`
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content);
  console.log('Migrated ' + name);
}
