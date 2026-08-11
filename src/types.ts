/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  label: string;
  iconName: "music" | "hash" | "fileText" | "zap" | "layers" | "clock" | "flame" | "sliders" | "target" | "lock";
}

export interface PurchaseNotification {
  name: string;
  city: string;
  state: string;
  timeAgo: string;
}
