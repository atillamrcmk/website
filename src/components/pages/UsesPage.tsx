import { useEffect, useMemo, useState } from 'react';
import { getDefaultLanguage, getTranslations, type Language } from '@/i18n';

import ToolsHero from '@/components/sections/ToolsHero';
import WorkflowStepper, { type WorkflowStep } from '@/components/sections/WorkflowStepper';
import EngineeringStandards from '@/components/sections/EngineeringStandards';
import UseCases from '@/components/sections/UseCases';
import ToolsCategories, { type ToolCategory } from '@/components/sections/ToolsCategories';
import ToolsCTA from '@/components/sections/ToolsCTA';

export default function UsesPage() {
  // Keep SSR/initial HTML deterministic (TR) to avoid hydration mismatch.
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(getDefaultLanguage());
  }, []);

  const t = useMemo(() => getTranslations(lang), [lang]);
  const u = t.uses;

  const workflowSteps: WorkflowStep[] = useMemo(
    () => [
      {
        id: 'plan',
        title: u.howIbuild.steps.plan.title,
        description: u.howIbuild.steps.plan.description,
        tools: ['Figma', 'Notion', 'Linear'],
      },
      {
        id: 'build',
        title: u.howIbuild.steps.build.title,
        description: u.howIbuild.steps.build.description,
        tools: ['Flutter', 'Astro', 'TypeScript'],
      },
      {
        id: 'api',
        title: u.howIbuild.steps.api.title,
        description: u.howIbuild.steps.api.description,
        tools: ['Node.js', 'REST', 'Auth'],
      },
      {
        id: 'ai',
        title: u.howIbuild.steps.ai.title,
        description: u.howIbuild.steps.ai.description,
        tools: ['Python', 'OpenCV'],
      },
      {
        id: 'deploy',
        title: u.howIbuild.steps.deploy.title,
        description: u.howIbuild.steps.deploy.description,
        tools: ['VPS', 'Nginx', 'PM2', 'SSL'],
      },
      {
        id: 'quality',
        title: u.howIbuild.steps.quality.title,
        description: u.howIbuild.steps.quality.description,
        tools: ['Logging', 'Error handling', 'Performance'],
      },
    ],
    [u]
  );

  const standards = useMemo(
    () => [
      { title: u.standards.items.vcs.title, description: u.standards.items.vcs.description },
      { title: u.standards.items.clean.title, description: u.standards.items.clean.description },
      { title: u.standards.items.observability.title, description: u.standards.items.observability.description },
      { title: u.standards.items.security.title, description: u.standards.items.security.description },
      { title: u.standards.items.delivery.title, description: u.standards.items.delivery.description },
    ],
    [u]
  );

  const useCases = useMemo(
    () => [
      {
        title: u.useCases.cards.mobile.title,
        problem: u.useCases.cards.mobile.problem,
        approach: u.useCases.cards.mobile.approach,
        tools: ['Flutter', 'Firebase', 'Riverpod'],
      },
      {
        title: u.useCases.cards.backend.title,
        problem: u.useCases.cards.backend.problem,
        approach: u.useCases.cards.backend.approach,
        tools: ['Node.js', 'PostgreSQL', 'REST'],
      },
      {
        title: u.useCases.cards.ai.title,
        problem: u.useCases.cards.ai.problem,
        approach: u.useCases.cards.ai.approach,
        tools: ['Python', 'OpenCV'],
      },
    ],
    [u]
  );

  const categories: ToolCategory[] = useMemo(
    () => [
      {
        title: u.categories.development.title,
        why: u.categories.development.why,
        items: [
          { name: u.tools.editor, value: 'VS Code', role: u.roles.editor },
          { name: u.tools.terminal, value: 'Windows Terminal', role: u.roles.terminal },
          { name: u.tools.versionControl, value: 'Git', role: u.roles.versionControl },
          { name: u.tools.packageManager, value: 'npm / pnpm', role: u.roles.packageManager },
        ],
      },
      {
        title: u.categories.mobileDevelopment.title,
        why: u.categories.mobileDevelopment.why,
        items: [
          { name: u.tools.flutter, value: 'Flutter SDK', role: u.roles.flutter },
          { name: u.tools.android, value: 'Android Studio', role: u.roles.android },
          { name: u.tools.ios, value: 'Xcode', role: u.roles.ios },
          { name: u.tools.testing, value: 'Flutter Test, Jest', role: u.roles.testing },
        ],
      },
      {
        title: u.categories.design.title,
        why: u.categories.design.why,
        items: [
          { name: u.tools.uiux, value: 'Figma', role: u.roles.uiux },
          { name: u.tools.prototyping, value: 'Figma', role: u.roles.prototyping },
        ],
      },
      {
        title: u.categories.productivity.title,
        why: u.categories.productivity.why,
        items: [
          { name: u.tools.noteTaking, value: 'Notion', role: u.roles.noteTaking },
          { name: u.tools.projectManagement, value: 'Linear', role: u.roles.projectManagement },
          { name: u.tools.communication, value: 'Slack, Discord', role: u.roles.communication },
        ],
      },
      {
        title: u.categories.hardware.title,
        why: u.categories.hardware.why,
        items: [
          { name: u.hardware.devEnv, value: u.hardware.devEnvValue, role: u.hardware.devEnvRole },
          { name: u.hardware.mobileTest, value: u.hardware.mobileTestValue, role: u.hardware.mobileTestRole },
        ],
      },
    ],
    [u]
  );

  return (
    <div>
      <ToolsHero title={u.hero.title} subtitle={u.hero.subtitle} badge={u.hero.badge} />

      {/* Interactivity lives here; everything else stays mostly static */}
      <WorkflowStepper title={u.howIbuild.title} steps={workflowSteps} activeLabel={u.howIbuild.activeLabel} />

      <EngineeringStandards title={u.standards.title} items={standards} />

      <UseCases
        title={u.useCases.title}
        cards={useCases}
        labels={{ problem: u.useCases.labels.problem, approach: u.useCases.labels.approach }}
      />

      <ToolsCategories title={u.toolsList.title} categories={categories} ariaLabel={u.toolsList.ariaLabel} />

      <ToolsCTA
        title={u.finalCta.title}
        subtitle={u.finalCta.subtitle}
        primary={{ label: u.finalCta.primary, href: '/contact' }}
        secondary={{ label: u.finalCta.secondary, href: '/projects' }}
      />

      {/* Small fallback: keep old CTA text for continuity (hidden once mounted) */}
      {!mounted ? (
        <section className="section-padding">
          <div className="container-custom">
            <div className="card scroll-reveal p-6 text-center">
              <p className="text-base leading-relaxed text-light-muted">{u.cta.text}</p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}


