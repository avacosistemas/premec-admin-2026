import { ActionDef } from './component-def/action-def';

export interface CustomPageComponent {
    /**
     * @param action
     */
    onAction(action: ActionDef): void;
}