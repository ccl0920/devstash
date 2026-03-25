import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@devstash.com' },
    update: {},
    create: {
      email: 'test@devstash.com',
      name: 'Test Developer',
      isPro: true,
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create system item types
  const snippetType = await prisma.itemType.upsert({
    where: { slug: 'snippet' },
    update: {},
    create: {
      name: 'Snippet',
      slug: 'snippet',
      icon: 'Code',
      color: '#3b82f6',
      isSystem: true,
    },
  });

  const promptType = await prisma.itemType.upsert({
    where: { slug: 'prompt' },
    update: {},
    create: {
      name: 'Prompt',
      slug: 'prompt',
      icon: 'Sparkles',
      color: '#8b5cf6',
      isSystem: true,
    },
  });

  const commandType = await prisma.itemType.upsert({
    where: { slug: 'command' },
    update: {},
    create: {
      name: 'Command',
      slug: 'command',
      icon: 'Terminal',
      color: '#f97316',
      isSystem: true,
    },
  });

  const noteType = await prisma.itemType.upsert({
    where: { slug: 'note' },
    update: {},
    create: {
      name: 'Note',
      slug: 'note',
      icon: 'StickyNote',
      color: '#fde047',
      isSystem: true,
    },
  });

  const linkType = await prisma.itemType.upsert({
    where: { slug: 'link' },
    update: {},
    create: {
      name: 'Link',
      slug: 'link',
      icon: 'Link',
      color: '#10b981',
      isSystem: true,
    },
  });

  console.log('✅ Created system item types');

  // Create collections
  const reactCollection = await prisma.collection.create({
    data: {
      name: 'React Snippets',
      description: 'Useful React components and hooks',
      userId: user.id,
    },
  });

  const aiCollection = await prisma.collection.create({
    data: {
      name: 'AI Prompts',
      description: 'Collection of effective AI prompts',
      userId: user.id,
    },
  });

  const cliCollection = await prisma.collection.create({
    data: {
      name: 'CLI Commands',
      description: 'Common terminal commands',
      userId: user.id,
    },
  });

  console.log('✅ Created collections');

  // Create tags
  const typescriptTag = await prisma.tag.upsert({
    where: { userId_name: { userId: user.id, name: 'typescript' } },
    update: {},
    create: {
      name: 'typescript',
      userId: user.id,
    },
  });

  const reactTag = await prisma.tag.upsert({
    where: { userId_name: { userId: user.id, name: 'react' } },
    update: {},
    create: {
      name: 'react',
      userId: user.id,
    },
  });

  const hooksTag = await prisma.tag.upsert({
    where: { userId_name: { userId: user.id, name: 'hooks' } },
    update: {},
    create: {
      name: 'hooks',
      userId: user.id,
    },
  });

  const productivityTag = await prisma.tag.upsert({
    where: { userId_name: { userId: user.id, name: 'productivity' } },
    update: {},
    create: {
      name: 'productivity',
      userId: user.id,
    },
  });

  console.log('✅ Created tags');

  // Create items
  const useDebounceItem = await prisma.item.create({
    data: {
      title: 'useDebounce Hook',
      description: 'Custom hook for debouncing values',
      content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
      contentType: 'text',
      language: 'typescript',
      isFavorite: true,
      isPinned: true,
      userId: user.id,
      typeId: snippetType.id,
      collections: {
        connect: { id: reactCollection.id },
      },
      tags: {
        connect: [
          { userId_name: { userId: user.id, name: 'typescript' } },
          { userId_name: { userId: user.id, name: 'react' } },
          { userId_name: { userId: user.id, name: 'hooks' } },
        ],
      },
    },
  });

  const gitUndoItem = await prisma.item.create({
    data: {
      title: 'Git Undo Last Commit',
      description: 'Undo the last git commit while keeping changes',
      content: 'git reset --soft HEAD~1',
      contentType: 'text',
      language: 'bash',
      isFavorite: true,
      userId: user.id,
      typeId: commandType.id,
      collections: {
        connect: { id: cliCollection.id },
      },
      tags: {
        connect: [{ userId_name: { userId: user.id, name: 'productivity' } }],
      },
    },
  });

  const codeReviewPrompt = await prisma.item.create({
    data: {
      title: 'Code Review Assistant',
      description: 'AI prompt for reviewing code changes',
      content: `You are an experienced software engineer. Review the following code for:
1. Potential bugs and edge cases
2. Performance issues
3. Code style and readability
4. Security concerns
5. Suggestions for improvement

Provide constructive feedback with specific examples.`,
      contentType: 'text',
      isFavorite: true,
      userId: user.id,
      typeId: promptType.id,
      collections: {
        connect: { id: aiCollection.id },
      },
      tags: {
        connect: [{ userId_name: { userId: user.id, name: 'productivity' } }],
      },
    },
  });

  const nextjsDocsItem = await prisma.item.create({
    data: {
      title: 'Next.js Documentation',
      description: 'Official Next.js docs and resources',
      url: 'https://nextjs.org/docs',
      contentType: 'url',
      userId: user.id,
      typeId: linkType.id,
      collections: {
        connect: { id: reactCollection.id },
      },
      tags: {
        connect: [
          { userId_name: { userId: user.id, name: 'react' } },
          { userId_name: { userId: user.id, name: 'typescript' } },
        ],
      },
    },
  });

  const meetingNotesItem = await prisma.item.create({
    data: {
      title: 'Team Standup Notes',
      description: 'Notes from daily standup meetings',
      content: `## Standup - March 25, 2026

### Completed
- Set up Prisma with Neon PostgreSQL
- Created database schema

### In Progress
- Building dashboard components
- Implementing authentication

### Blockers
- None`,
      contentType: 'text',
      userId: user.id,
      typeId: noteType.id,
      tags: {
        connect: [{ userId_name: { userId: user.id, name: 'productivity' } }],
      },
    },
  });

  console.log('✅ Created items');

  console.log('🎉 Seeding completed!');
  console.log(`   - 1 user`);
  console.log(`   - 5 item types`);
  console.log(`   - 3 collections`);
  console.log(`   - 4 tags`);
  console.log(`   - 5 items`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
