import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Skeleton version for loading UX
 */
@Component({
  selector: 'contact-item-skeleton',
  standalone: true,
  template: `
    <div class="ssc-circle"></div>
    <div class="flex-1">
      <div class="w-28">
        <div class="ssc-head-line mb-2"></div>
      </div>
      <div class="w-48">
        <div class="ssc-line"></div>
      </div>
    </div>
  `,
  styleUrl: './contact-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactItemSkeleton {}
