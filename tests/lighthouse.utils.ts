// lighthouse.utils.ts
import lighthouse from 'playwright-lighthouse';
import { Page } from '@playwright/test';
// ...rest of your code...

type Thresholds = {
  performance?: number;
  accessibility?: number;
  [key: string]: number | undefined;
};

type LighthouseOpts = {
  [key: string]: unknown;
};

export async function runLighthouseAudit(
  page: Page,
  thresholds: Thresholds = {},
  opts: LighthouseOpts = {}
) {
  return lighthouse(page, {
    thresholds: { performance: 80, accessibility: 90, ...thresholds },
    reports: { formats: { html: true, json: true }, directory: './lighthouse-reports', ...opts }
  });
}
